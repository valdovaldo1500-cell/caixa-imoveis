/**
 * Consultas das páginas de lista do agregador (O6) — hub de estado
 * (`[uf]/page.tsx`) e lista de cidade (`[uf]/[cidade]/page.tsx`).
 *
 * `cache()` do React garante que `generateMetadata` e a página em si — que
 * rodam na mesma requisição — não disparem a mesma query duas vezes.
 *
 * Fica em `_lib` (prefixo com underscore): o Next.js ignora essa pasta para
 * efeito de rota, não é uma URL.
 */

import { cache } from "react";
import { and, eq, isNull, lt, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";
import { FAIXAS_NACIONAIS, type NivelSeguranca } from "@/lib/seguranca";

export const UF_NOME: Record<string, string> = {
  GO: "Goiás",
  RS: "Rio Grande do Sul",
};

export const TAMANHO_PAGINA = 24;

const ativo = isNull(properties.removedAt);

// ---- Hub de estado --------------------------------------------------------

export const getResumoUf = cache(async (uf: string) => {
  const [linha] = await db
    .select({
      total: sql<number>`count(*)::int`,
      descontoMediano: sql<
        string | null
      >`round((percentile_cont(0.5) within group (order by ${properties.desconto}::numeric) filter (where ${properties.desconto} > 0))::numeric, 1)`,
      precoMin: sql<string | null>`min(${properties.preco}::numeric)`,
      precoMax: sql<string | null>`max(${properties.preco}::numeric)`,
    })
    .from(properties)
    .where(and(ativo, eq(properties.uf, uf)));
  return linha;
});

export const getCidadesDoEstado = cache(async (uf: string) => {
  return db
    .select({
      cidade: properties.cidade,
      total: sql<number>`count(*)::int`,
    })
    .from(properties)
    .where(and(ativo, eq(properties.uf, uf)))
    .groupBy(properties.cidade)
    .orderBy(sql`count(*) desc`);
});

// ---- Lista de cidade --------------------------------------------------------

/**
 * O slug da URL é `slugify(cidade)`. Como a fonte não guarda o slug, resolve
 * por comparação contra as cidades ativas da UF (lista pequena — no máximo
 * ~100 linhas por estado hoje).
 */
export const resolverCidade = cache(async (uf: string, slug: string): Promise<string | null> => {
  const cidades = await db
    .selectDistinct({ cidade: properties.cidade })
    .from(properties)
    .where(and(ativo, eq(properties.uf, uf)));
  return cidades.find((c) => slugify(c.cidade) === slug)?.cidade ?? null;
});

export const getResumoCidade = cache(async (uf: string, cidade: string) => {
  const [resumo] = await db
    .select({
      total: sql<number>`count(*)::int`,
      descontoMediano: sql<
        string | null
      >`round((percentile_cont(0.5) within group (order by ${properties.desconto}::numeric) filter (where ${properties.desconto} > 0))::numeric, 1)`,
      precoMin: sql<string | null>`min(${properties.preco}::numeric)`,
      precoMax: sql<string | null>`max(${properties.preco}::numeric)`,
    })
    .from(properties)
    .where(and(ativo, eq(properties.uf, uf), eq(properties.cidade, cidade)));

  const bairros = await db
    .select({
      bairro: properties.bairro,
      total: sql<number>`count(*)::int`,
    })
    .from(properties)
    .where(
      and(ativo, eq(properties.uf, uf), eq(properties.cidade, cidade), sql`${properties.bairro} is not null`)
    )
    .groupBy(properties.bairro)
    .orderBy(sql`count(*) desc`)
    .limit(3);

  // Só precisa de UM imóvel da cidade — a nota de segurança é por município,
  // então todo imóvel ativo da mesma cidade compartilha os mesmos campos.
  const [amostraSeguranca] = await db
    .select({
      crimeNota: properties.crimeNota,
      crimeTaxa: properties.crimeTaxa,
      crimeGrao: properties.crimeGrao,
      crimeFonte: properties.crimeFonte,
      crimeJanelaInicio: properties.crimeJanelaInicio,
      crimeJanelaFim: properties.crimeJanelaFim,
      crimeSuprimido: properties.crimeSuprimido,
    })
    .from(properties)
    .where(and(ativo, eq(properties.uf, uf), eq(properties.cidade, cidade)))
    .limit(1);

  return { resumo, bairros, seguranca: amostraSeguranca ?? null };
});

export const getTiposDaCidade = cache(async (uf: string, cidade: string): Promise<string[]> => {
  const linhas = await db
    .selectDistinct({ tipo: properties.tipoImovel })
    .from(properties)
    .where(
      and(ativo, eq(properties.uf, uf), eq(properties.cidade, cidade), sql`${properties.tipoImovel} is not null`)
    );
  return linhas
    .map((l) => l.tipo)
    .filter((t): t is string => Boolean(t))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
});

// Teto cumulativo de nota por nível. `crimeNota` é RISCO — quanto MAIOR, mais
// violento (ver lib/seguranca.ts) — então "até risco moderado" é "nota <
// p40", não ">=". `muito_alto` não tem teto: aceita qualquer nota.
const NOTA_TETO: Record<NivelSeguranca, number | null> = {
  baixo: FAIXAS_NACIONAIS.p20,
  moderado: FAIXAS_NACIONAIS.p40,
  medio: FAIXAS_NACIONAIS.p60,
  alto: FAIXAS_NACIONAIS.p80,
  muito_alto: null,
};

export type OrdemListagem = "desconto" | "preco" | "risco";

export type FiltrosCidade = {
  descontoMin?: number;
  precoMax?: number;
  tipo?: string;
  segurancaMax?: NivelSeguranca;
  ordem: OrdemListagem;
  pagina: number;
};

const ORDENACOES: Record<OrdemListagem, SQL> = {
  desconto: sql`${properties.desconto}::numeric desc nulls last`,
  preco: sql`${properties.preco}::numeric asc nulls last`,
  risco: sql`${properties.crimeNota} asc nulls last`,
};

export async function getImoveisDaCidade(uf: string, cidade: string, filtros: FiltrosCidade) {
  const condicoes = [ativo, eq(properties.uf, uf), eq(properties.cidade, cidade)];

  if (filtros.descontoMin) {
    condicoes.push(sql`${properties.desconto}::numeric >= ${filtros.descontoMin}`);
  }
  if (filtros.precoMax) {
    condicoes.push(sql`${properties.preco}::numeric <= ${filtros.precoMax}`);
  }
  if (filtros.tipo) {
    condicoes.push(eq(properties.tipoImovel, filtros.tipo));
  }
  if (filtros.segurancaMax) {
    const teto = NOTA_TETO[filtros.segurancaMax];
    if (teto != null) condicoes.push(lt(properties.crimeNota, teto));
  }

  const where = and(...condicoes);

  const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(properties).where(where);

  const pagina = Math.max(1, filtros.pagina);
  const itens = await db
    .select({
      id: properties.id,
      caixaId: properties.caixaId,
      uf: properties.uf,
      cidade: properties.cidade,
      bairro: properties.bairro,
      preco: properties.preco,
      valorAvaliacao: properties.valorAvaliacao,
      desconto: properties.desconto,
      modalidadeVenda: properties.modalidadeVenda,
      tipoImovel: properties.tipoImovel,
      areaTotalM2: properties.areaTotalM2,
      areaPrivativaM2: properties.areaPrivativaM2,
      fotoUrl: properties.fotoUrl,
      crimeNota: properties.crimeNota,
      crimeTaxa: properties.crimeTaxa,
      crimeGrao: properties.crimeGrao,
      crimeFonte: properties.crimeFonte,
      crimeJanelaInicio: properties.crimeJanelaInicio,
      crimeJanelaFim: properties.crimeJanelaFim,
      crimeSuprimido: properties.crimeSuprimido,
    })
    .from(properties)
    .where(where)
    .orderBy(ORDENACOES[filtros.ordem])
    .limit(TAMANHO_PAGINA)
    .offset((pagina - 1) * TAMANHO_PAGINA);

  return { itens, total, totalPaginas: Math.max(1, Math.ceil(total / TAMANHO_PAGINA)) };
}

export type ImovelCard = Awaited<ReturnType<typeof getImoveisDaCidade>>["itens"][number];
