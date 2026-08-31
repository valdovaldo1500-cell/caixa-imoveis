#!/usr/bin/env python3
"""
Rastreador de edital do O6 — a metade que BUSCA (a que parseia vive no app,
em `src/pipeline/scrape-edital.ts`).

Por que por navegador, e não por curl no servidor (medido em 31/08/2026):
a página de detalhe da Caixa não responde a `curl` de lugar nenhum que a
gente tenha. Do host de produção volta a página de erro do Azion (10.458
bytes, sem as palavras "Radware"/"Bot Manager", o que fazia a checagem
antiga aceitar lixo como sucesso); desta máquina volta o CAPTCHA do Radware.
Só o Chrome de verdade, com sessão aquecida na busca, passa.

Fluxo: pede a lista de pendentes ao app -> abre cada ficha no Chrome do VNC
-> manda o HTML cru de volta em lotes -> o app parseia e grava. Um parser
só, no servidor; aqui não tem regex nenhum de propósito.

Uso:
    python3 coletar-edital-browser.py [--max 300] [--lote 20]

PIPELINE_TOKEN vem do ambiente ou de ~/.config/crime-map/credentials-o6.env.
"""

import argparse
import json
import ssl
import os
import sys
import time
import urllib.error
import urllib.request

sys.path.insert(0, "/home/valdo/scripts")
from chrome_session import chrome_context  # noqa: E402

BASE = os.environ.get("O6_SITE", "https://imoveis.crimebrasil.com.br")
BUSCA_URL = "https://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp"
# Ritmo civilizado: são ~5.161 fichas e o site é do banco público, não nosso.
PAUSA_ENTRE_FICHAS_S = 1.5
PAUSA_APOS_CARREGAR_S = 1.2


def token() -> str:
    t = os.environ.get("PIPELINE_TOKEN", "").strip()
    if t:
        return t
    caminho = os.path.expanduser("~/.config/crime-map/credentials-o6.env")
    if os.path.exists(caminho):
        for linha in open(caminho):
            if linha.startswith("PIPELINE_TOKEN="):
                return linha.split("=", 1)[1].strip()
    raise SystemExit("PIPELINE_TOKEN ausente (env ou ~/.config/crime-map/credentials-o6.env)")


def api(caminho: str, metodo="GET", corpo=None, tok="", tentativas=4):
    """
    Chama a API do agregador, com repeticao em falha de REDE.

    Por que a repeticao existe: em 31/08/2026 um deploy reiniciou o container
    no meio de uma rodada e o urlopen morreu com "EOF occurred in violation of
    protocol" — a rodada inteira de 400 fichas foi perdida e a fila nao andou.
    O container fica fora do ar uns 15s a cada deploy, e o coletor roda por
    horas: cruzar com um deploy nao e excecao, e o esperado.

    So repete falha de REDE/5xx. Um 401 (token errado) ou 400 sobe na hora —
    insistir nesses so esconderia o defeito.
    """
    dados = json.dumps(corpo).encode() if corpo is not None else None
    for tentativa in range(1, tentativas + 1):
        req = urllib.request.Request(
            f"{BASE}{caminho}",
            data=dados,
            method=metodo,
            headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code < 500 or tentativa == tentativas:
                raise
            motivo = f"HTTP {e.code}"
        except (urllib.error.URLError, ssl.SSLError, OSError) as e:
            if tentativa == tentativas:
                raise
            motivo = type(e).__name__
        espera = 5 * (2 ** (tentativa - 1))  # 5s, 10s, 20s
        print(f"  rede falhou ({motivo}), tentativa {tentativa}/{tentativas} — aguardando {espera}s", flush=True)
        time.sleep(espera)
    raise SystemExit("inalcancavel")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--max", type=int, default=300, help="quantas fichas buscar nesta rodada")
    ap.add_argument("--lote", type=int, default=20, help="quantas fichas por POST de ingestão")
    args = ap.parse_args()

    tok = token()
    fila = api(f"/api/pipeline/edital/ingest?limit={args.max}", tok=tok)
    pendentes = fila["pendentes"]
    print(f"faltam {fila['faltam']} no total; buscando {len(pendentes)} agora", flush=True)
    if not pendentes:
        return 0

    total = {"comCampo": 0, "semCampo": 0, "rejeitadas": 0, "falhaNavegador": 0}
    lote: list[dict] = []

    def enviar():
        if not lote:
            return
        r = api("/api/pipeline/edital/ingest", "POST", {"paginas": lote}, tok)
        for k in ("comCampo", "semCampo", "rejeitadas"):
            total[k] += r.get(k, 0)
        if r.get("erros"):
            print("  rejeitadas:", "; ".join(r["erros"])[:300], flush=True)
        lote.clear()

    with chrome_context("o6-edital") as (page, _ctx):
        # Aquece a sessão: entrar direto na ficha, sem ter passado pela busca,
        # é o que mais dispara o bot manager.
        page.goto(BUSCA_URL, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(2000)

        for i, p in enumerate(pendentes, 1):
            try:
                page.goto(p["url"], wait_until="commit", timeout=40000)
                page.wait_for_timeout(int(PAUSA_APOS_CARREGAR_S * 1000))
                html = page.content()
                lote.append({"caixaId": p["caixaId"], "html": html})
            except Exception as e:  # noqa: BLE001 — qualquer falha aqui é "tenta de novo depois"
                total["falhaNavegador"] += 1
                print(f"  [{p['caixaId']}] falha no navegador: {str(e)[:120]}", flush=True)
                # Página/contexto podem ter morrido: reabre e segue.
                try:
                    page = _ctx.new_page()
                    page.goto(BUSCA_URL, wait_until="domcontentloaded", timeout=60000)
                except Exception:
                    print("  contexto do navegador perdido — encerrando a rodada", flush=True)
                    break

            if len(lote) >= args.lote:
                enviar()
                print(f"  {i}/{len(pendentes)} — {total}", flush=True)

            time.sleep(PAUSA_ENTRE_FICHAS_S)

        enviar()

    print(f"FIM {total}", flush=True)
    # Falha alta se quase nada passou: é sinal de bloqueio novo, e o pipeline
    # tem de gritar em vez de seguir achando que coletou.
    processadas = total["comCampo"] + total["semCampo"]
    if processadas == 0:
        print("ERRO: nenhuma ficha foi ingerida — provável bloqueio", flush=True)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
