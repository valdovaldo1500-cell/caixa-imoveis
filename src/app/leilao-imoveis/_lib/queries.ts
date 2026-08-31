/**
 * Consultas das páginas de lista do agregador (O6) — hub de estado
 * (`[uf]/page.tsx`) e lista de cidade (`[uf]/[cidade]/page.tsx`).
 *
 * Duas camadas de cache por cima de cada consulta:
 *
 * 1. `unstable_cache` (Next) — cache PERSISTIDO entre requisições, com TTL
 *    de `CACHE_TTL_LISTA`. É o que tira carga do banco de verdade (ver
 *    `@/lib/cache.ts` para o porquê e a pegadinha de `Date` vs `string`).
 * 2. `cache()` do React — dedupe DENTRO da mesma requisição: `generateMetadata`
 *    e a página em si chamam a mesma consulta, e sem isso seria uma leitura
 *    de cache duplicada por chamada (barata, mas desnecessária).
 *
 * Fica em `_lib` (prefixo com underscore): o Next.js ignora essa pasta para
 * efeito de rota, não é uma URL.
 */

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { and, eq, isNull, lt, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";
import { TETO_PERCENTIL, type NivelSeguranca } from "@/lib/seguranca";
import { CACHE_TTL_LISTA } from "@/lib/cache";

export const UF_NOME: Record<string, string> = {
  GO: "Goiás",
  RS: "Rio Grande do Sul",
};

export const TAMANHO_PAGINA = 24;

const ativo = isNull(properties.removedAt);

// ---- Hub de estado --------------------------------------------------------

export const getResumoUf = cache(
  unstable_cache(
    async (uf: string) => {
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
    },
    ["o6", "queries", "resumo-uf"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export const getCidadesDoEstado = cache(
  unstable_cache(
    async (uf: string) => {
      return db
        .select({
          cidade: properties.cidade,
          total: sql<number>`count(*)::int`,
        })
        .from(properties)
        .where(and(ativo, eq(properties.uf, uf)))
        .groupBy(properties.cidade)
        .orderBy(sql`count(*) desc`);
    },
    ["o6", "queries", "cidades-do-estado"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

// ---- Lista de cidade --------------------------------------------------------

/**
 * O slug da URL é `slugify(cidade)`. Como a fonte não guarda o slug, resolve
 * por comparação contra as cidades ativas da UF (lista pequena — no máximo
 * ~100 linhas por estado hoje).
 */
export const resolverCidade = cache(
  unstable_cache(
    async (uf: string, slug: string): Promise<string | null> => {
      const cidades = await db
        .selectDistinct({ cidade: properties.cidade })
        .from(properties)
        .where(and(ativo, eq(properties.uf, uf)));
      return cidades.find((c) => slugify(c.cidade) === slug)?.cidade ?? null;
    },
    ["o6", "queries", "resolver-cidade"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export const getResumoCidade = cache(
  unstable_cache(
    async (uf: string, cidade: string) => {
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

      // Só precisa de UM imóvel da cidade — mas SÓ para os campos crime_muni_*
      // (contexto municipal, sempre igual para qualquer imóvel da cidade).
      // crime_nota/crime_grao NÃO servem mais de amostra aqui: com grão
      // bairro, dois imóveis da mesma cidade podem estar em bairros com
      // notas diferentes, e o parágrafo agregado da cidade não pode
      // representar a cidade inteira pela nota de UM bairro sorteado.
      // `lerSegurancaMunicipio` (@/lib/seguranca) lê os campos abaixo.
      const [amostraSeguranca] = await db
        .select({
          crimeMuniNota: properties.crimeMuniNota,
          crimeMuniTaxa: properties.crimeMuniTaxa,
          crimeMuniJanelaInicio: properties.crimeMuniJanelaInicio,
          crimeMuniJanelaFim: properties.crimeMuniJanelaFim,
          crimeMuniFonte: properties.crimeMuniFonte,
          // Fallback para linha ainda não reprocessada (crime_muni_* nulo).
          crimeNota: properties.crimeNota,
          crimeTaxa: properties.crimeTaxa,
          crimeGrao: properties.crimeGrao,
          crimeFonte: properties.crimeFonte,
          crimeJanelaInicio: properties.crimeJanelaInicio,
          crimeJanelaFim: properties.crimeJanelaFim,
          crimeSuprimido: properties.crimeSuprimido,
          crimeMarcado: properties.crimeMarcado,
        })
        .from(properties)
        .where(and(ativo, eq(properties.uf, uf), eq(properties.cidade, cidade)))
        .limit(1);

      return { resumo, bairros, seguranca: amostraSeguranca ?? null };
    },
    ["o6", "queries", "resumo-cidade"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export const getTiposDaCidade = cache(
  unstable_cache(
    async (uf: string, cidade: string): Promise<string[]> => {
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
    },
    ["o6", "queries", "tipos-da-cidade"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

// Teto cumulativo de PERCENTIL por nível (0-100, dentro do próprio grão —
// ver lib/seguranca.ts para o porquê de nunca filtrar por crimeNota cru).
// `muito_alto` não tem teto: aceita qualquer percentil.
const PERCENTIL_TETO = TETO_PERCENTIL;

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
  // Percentil, não nota: comparável entre bairro e município (ver lib/seguranca.ts).
  risco: sql`${properties.crimePercentil} asc nulls last`,
};

// Único call site é a página da cidade (não passa por `generateMetadata`),
// então basta `unstable_cache` — sem a camada extra de `cache()` do React.
// Chave inclui `filtros` inteiro (todos os campos de `FiltrosCidade` +
// `pagina`) porque `unstable_cache` serializa TODOS os argumentos da função
// encapsulada; qualquer filtro novo que a página passe a aceitar já entra
// na chave automaticamente, desde que continue vindo como argumento — nunca
// leia filtro de fora da função (ver pegadinha em `@/lib/cache.ts`).
export const getImoveisDaCidade = unstable_cache(
  async (uf: string, cidade: string, filtros: FiltrosCidade) => {
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
      const teto = PERCENTIL_TETO[filtros.segurancaMax];
      if (teto != null) condicoes.push(lt(properties.crimePercentil, teto));
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
        crimeMarcado: properties.crimeMarcado,
        crimePercentil: properties.crimePercentil,
        crimeBairro: properties.crimeBairro,
        crimeBairroOrigem: properties.crimeBairroOrigem,
        crimeOcorrencias: properties.crimeOcorrencias,
        crimeMuniNota: properties.crimeMuniNota,
        crimeMuniTaxa: properties.crimeMuniTaxa,
        crimeMuniJanelaInicio: properties.crimeMuniJanelaInicio,
        crimeMuniJanelaFim: properties.crimeMuniJanelaFim,
        crimeMuniFonte: properties.crimeMuniFonte,
      })
      .from(properties)
      .where(where)
      .orderBy(ORDENACOES[filtros.ordem])
      .limit(TAMANHO_PAGINA)
      .offset((pagina - 1) * TAMANHO_PAGINA);

    return { itens, total, totalPaginas: Math.max(1, Math.ceil(total / TAMANHO_PAGINA)) };
  },
  ["o6", "queries", "imoveis-da-cidade"],
  { revalidate: CACHE_TTL_LISTA }
);

export type ImovelCard = Awaited<ReturnType<typeof getImoveisDaCidade>>["itens"][number];
