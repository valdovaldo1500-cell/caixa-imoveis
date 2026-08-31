import sys, re
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

# id -> modalidade slug, read from the earlier sample_ids.txt structure
groups = {
    "leilao_sfi": [],
    "licitacao": [],
    "venda_direta": [],
    "venda_online": [],
}
current = None
with open('/tmp/o6-edital/sample_ids.txt') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        if line.startswith('==='):
            label = line.strip('= ').strip()
            current = {
                "Leilão SFI - Edital Único": "leilao_sfi",
                "Licitação Aberta": "licitacao",
                "Venda Direta Online": "venda_direta",
                "Venda Online": "venda_online",
            }[label]
            continue
        groups[current].append(line)

BASE = "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel="

with chrome_context("o6-edital") as (page, ctx):
    for mod, ids in groups.items():
        for cid in ids:
            out = f"/tmp/o6-edital-sample/{mod}_{cid}.html"
            try:
                resp = page.goto(BASE + cid, timeout=20000, wait_until="domcontentloaded")
                page.wait_for_timeout(600)
                html = page.content()
                with open(out, "w") as f:
                    f.write(html)
                print(mod, cid, "status", resp.status if resp else None, "len", len(html))
            except Exception as e:
                print(mod, cid, "ERROR", e)
