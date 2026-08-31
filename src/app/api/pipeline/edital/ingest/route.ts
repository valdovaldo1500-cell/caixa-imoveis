import { NextRequest, NextResponse } from "next/server";
import { and, eq, inArray, isNull, lt, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { garantirPaginaDeImovel } from "@/pipeline/caixa-detail-fetch";
import { extrairEdital, gravarEdital } from "@/pipeline/scrape-edital";

/**
 * Ingestão do rastreador de edital a partir de HTML buscado por NAVEGADOR.
 *
 * Por que existe (31/08/2026, medido): a página de detalhe da Caixa não é
 * alcançável por `curl` de lugar nenhum que a gente tenha — do servidor de
 * produção volta a página de erro do Azion, da máquina local volta o CAPTCHA
 * do Radware. Só o Chrome de verdade passa. Então quem busca é um script
 * local (`scripts/coletar-edital-browser.py`, via `chrome_session.py`) e quem
 * PARSEIA continua sendo o mesmo código de sempre (`extrairEdital`), aqui —
 * um parser só, sem cópia em Python que fosse divergir com o tempo.
 *
 * GET  ?limit=N  → lista quem falta coletar (id, caixaId, url).
 * POST {paginas:[{caixaId, html}]} → parseia e grava.
 *
 * Protegido por `Authorization: Bearer ${PIPELINE_TOKEN}`, igual às outras
 * rotas de operação. `src/proxy.ts` não faz essa checagem por nós.
 */

function autorizado(req: NextRequest): boolean {
  const token = process.env.PIPELINE_TOKEN;
  return Boolean(token) && req.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(1, Number(searchParams.get("limit") ?? 100)), 500);
  const staleDays = Math.max(1, Number(searchParams.get("staleDays") ?? 21));
  const cutoff = new Date(Date.now() - staleDays * 24 * 60 * 60 * 1000);

  const pendentes = await db
    .select({ id: properties.id, caixaId: properties.caixaId, linkCaixa: properties.linkCaixa })
    .from(properties)
    .where(
      and(
        isNull(properties.removedAt),
        or(isNull(properties.editalAtualizadoEm), lt(properties.editalAtualizadoEm, cutoff))
      )
    )
    .orderBy(sql`${properties.editalAtualizadoEm} asc nulls first, ${properties.id} asc`)
    .limit(limit);

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(properties)
    .where(
      and(
        isNull(properties.removedAt),
        or(isNull(properties.editalAtualizadoEm), lt(properties.editalAtualizadoEm, cutoff))
      )
    );

  return NextResponse.json({
    faltam: total,
    pendentes: pendentes.map((p) => ({
      caixaId: p.caixaId,
      url:
        p.linkCaixa?.trim() ||
        `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${p.caixaId}`,
    })),
  });
}

export async function POST(req: NextRequest) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { paginas?: { caixaId?: string; html?: string }[] } | null;
  const paginas = Array.isArray(body?.paginas) ? body.paginas : null;
  if (!paginas || paginas.length === 0) {
    return NextResponse.json({ error: "Corpo inválido — esperado {paginas:[{caixaId, html}]}" }, { status: 400 });
  }
  if (paginas.length > 50) {
    return NextResponse.json({ error: "No máximo 50 páginas por requisição" }, { status: 413 });
  }

  const ids = paginas.map((p) => String(p.caixaId ?? "")).filter(Boolean);
  const linhas = await db
    .select({ id: properties.id, caixaId: properties.caixaId })
    .from(properties)
    .where(inArray(properties.caixaId, ids));
  const idPorCaixaId = new Map(linhas.map((l) => [l.caixaId, l.id]));

  const resultado = { recebidas: paginas.length, comCampo: 0, semCampo: 0, rejeitadas: 0, desconhecidas: 0, erros: [] as string[] };

  for (const pagina of paginas) {
    const caixaId = String(pagina.caixaId ?? "");
    const propertyId = idPorCaixaId.get(caixaId);
    if (!propertyId) {
      resultado.desconhecidas++;
      continue;
    }
    try {
      // Mesma trava do coletor por servidor: página que não é ficha de imóvel
      // não vira "coletado" — senão o imóvel sai da fila sem nunca ter dado.
      garantirPaginaDeImovel(String(pagina.html ?? ""));
      const campos = extrairEdital(String(pagina.html));
      const temCampo = await gravarEdital(propertyId, campos);
      if (temCampo) resultado.comCampo++;
      else resultado.semCampo++;
    } catch (err) {
      resultado.rejeitadas++;
      const msg = err instanceof Error ? err.message : String(err);
      if (resultado.erros.length < 5) resultado.erros.push(`${caixaId}: ${msg}`);
      // NÃO marca edital_atualizado_em: se a página veio ruim, o problema é da
      // coleta, não do imóvel — ele tem de continuar na fila.
      await db
        .update(properties)
        .set({ editalErro: msg.slice(0, 200) })
        .where(eq(properties.id, propertyId));
    }
  }

  return NextResponse.json(resultado);
}
