/**
 * Consultas dos guias (O6, requisito #6 do PLANO_MESTRE §3 — "conteúdo").
 *
 * Regra do dono que manda aqui (`feedback_outreach_dado_recente_sempre`):
 * todo texto público abre com dado RECENTE, consultado na hora, com a janela
 * declarada. Por isso NENHUM número destes guias está escrito no texto — todos
 * saem daqui, do estoque vivo, e a página imprime a data da última atualização
 * ao lado. Um guia com número cravado envelhece calado; este não tem como.
 *
 * Mesmo par de caches das listas (ver `../../leilao-imoveis/_lib/queries.ts`):
 * `unstable_cache` para tirar carga do banco entre requisições e `cache()` do
 * React para deduplicar entre `generateMetadata` e a página.
 */

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { and, isNull, sql, gt, isNotNull, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { CACHE_TTL_LISTA } from "@/lib/cache";

const ativo = isNull(properties.removedAt);

/**
 * Data do estoque. É o que fecha a janela na frase de abertura de cada guia —
 * sem isso o leitor não sabe se está lendo o mercado de hoje ou de abril.
 *
 * `max()` volta como STRING do Postgres (agregado em `sql<>` não tem tipo
 * declarado no driver) — o mesmo defeito que derrubou 175 URLs do sitemap em
 * 31/08/2026. Normaliza aqui, uma vez.
 */
export const getAtualizacao = cache(
  unstable_cache(
    async (): Promise<Date> => {
      const [linha] = await db
        .select({ em: sql<Date | string | null>`max(${properties.updatedAt})` })
        .from(properties)
        .where(ativo);
      const v = linha?.em;
      if (v instanceof Date) return v;
      if (typeof v === "string") {
        const d = new Date(v.includes("T") ? v : v.replace(" ", "T") + "Z");
        if (!Number.isNaN(d.getTime())) return d;
      }
      return new Date();
    },
    ["o6", "guias", "atualizacao"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export type Modalidade = {
  modalidade: string;
  total: number;
  comDesconto: number;
  descontoMediano: number | null;
  precoMediano: number | null;
  aceitaFinanciamento: number;
  acimaDaAvaliacao: number;
  comDataDeLeilao: number;
};

/**
 * A tabela que sustenta o guia principal. A pergunta que o comprador faz no
 * Google é "leilão da Caixa", mas o estoque não é uma coisa só: as quatro
 * modalidades da Caixa se comportam de formas opostas quanto a desconto,
 * preço e financiamento, e é isso que o guia mostra em vez de afirmar.
 *
 * `desconto > 0` no filtro da mediana não é maquiagem: no Leilão SFI o lance
 * mínimo é a DÍVIDA do imóvel, que costuma passar da avaliação — incluir
 * esses zeros faria a mediana de desconto significar outra coisa em cada
 * modalidade. O guia mostra `comDesconto` e `acimaDaAvaliacao` do lado, que é
 * justamente o número que explica o zero.
 */
export const getModalidades = cache(
  unstable_cache(
    async (): Promise<Modalidade[]> => {
      const linhas = await db
        .select({
          modalidade: properties.modalidadeVenda,
          total: sql<number>`count(*)::int`,
          comDesconto: sql<number>`count(*) filter (where ${properties.desconto} > 0)::int`,
          descontoMediano: sql<
            string | null
          >`round((percentile_cont(0.5) within group (order by ${properties.desconto}::numeric) filter (where ${properties.desconto} > 0))::numeric, 1)`,
          precoMediano: sql<
            string | null
          >`round((percentile_cont(0.5) within group (order by ${properties.preco}::numeric))::numeric, 0)`,
          aceitaFinanciamento: sql<number>`count(*) filter (where ${properties.aceitaFinanciamento})::int`,
          acimaDaAvaliacao: sql<number>`count(*) filter (where ${properties.preco} > ${properties.valorAvaliacao})::int`,
          comDataDeLeilao: sql<number>`count(*) filter (where ${properties.leilao1Data} is not null)::int`,
        })
        .from(properties)
        .where(and(ativo, isNotNull(properties.modalidadeVenda)))
        .groupBy(properties.modalidadeVenda)
        .orderBy(sql`count(*) desc`);

      return linhas.map((l) => ({
        modalidade: l.modalidade ?? "—",
        total: l.total,
        comDesconto: l.comDesconto,
        descontoMediano: l.descontoMediano != null ? Number(l.descontoMediano) : null,
        precoMediano: l.precoMediano != null ? Number(l.precoMediano) : null,
        aceitaFinanciamento: l.aceitaFinanciamento,
        acimaDaAvaliacao: l.acimaDaAvaliacao,
        comDataDeLeilao: l.comDataDeLeilao,
      }));
    },
    ["o6", "guias", "modalidades"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export type CidadeDesconto = {
  cidade: string;
  uf: string;
  total: number;
  descontoMediano: number;
  precoMediano: number | null;
};

/**
 * Cidades ordenadas por desconto mediano. Piso de 10 imóveis de propósito:
 * uma cidade com 2 imóveis produz "desconto mediano de 78%" que não descreve
 * mercado nenhum — é o mesmo artefato de número pequeno que obrigou a
 * suavizar a taxa de bairro (ver `@/lib/seguranca`).
 */
export const getCidadesPorDesconto = cache(
  unstable_cache(
    async (limite: number): Promise<CidadeDesconto[]> => {
      const linhas = await db
        .select({
          cidade: properties.cidade,
          uf: properties.uf,
          total: sql<number>`count(*)::int`,
          descontoMediano: sql<string>`round((percentile_cont(0.5) within group (order by ${properties.desconto}::numeric))::numeric, 1)`,
          precoMediano: sql<
            string | null
          >`round((percentile_cont(0.5) within group (order by ${properties.preco}::numeric))::numeric, 0)`,
        })
        .from(properties)
        .where(and(ativo, gt(properties.desconto, "0")))
        .groupBy(properties.cidade, properties.uf)
        .having(sql`count(*) >= 10`)
        .orderBy(sql`3 desc`)
        .limit(limite);

      // `orderBy` por posição acima ordenaria pela coluna 3 (total). Reordena
      // aqui pelo desconto, que é o que o guia promete — mais claro do que
      // repetir a expressão inteira do percentil no ORDER BY.
      return linhas
        .map((l) => ({
          cidade: l.cidade,
          uf: l.uf,
          total: l.total,
          descontoMediano: Number(l.descontoMediano),
          precoMediano: l.precoMediano != null ? Number(l.precoMediano) : null,
        }))
        .sort((a, b) => b.descontoMediano - a.descontoMediano);
    },
    ["o6", "guias", "cidades-desconto"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export type BairroSeguranca = {
  bairro: string;
  total: number;
  taxa: number;
  percentil: number | null;
  precoMediano: number | null;
};

/**
 * Espalhamento da taxa de mortes violentas ENTRE bairros da mesma cidade.
 * É a prova do diferencial do produto: a média da cidade esconde uma
 * diferença de várias vezes entre um bairro e outro, e é essa diferença que
 * nenhum outro agregador mostra.
 *
 * Usa `crimeBairro` (o nome do bairro resolvido pela camada), não o `bairro`
 * do cadastro da Caixa — o cadastro traz loteamento e condomínio no campo, e
 * agrupar por ele misturaria dez grafias do mesmo bairro.
 */
export const getBairrosDaCidade = cache(
  unstable_cache(
    async (cidade: string, uf: string): Promise<BairroSeguranca[]> => {
      const linhas = await db
        .select({
          bairro: properties.crimeBairro,
          total: sql<number>`count(*)::int`,
          taxa: sql<string>`round(max(${properties.crimeTaxa})::numeric, 1)`,
          percentil: sql<number | null>`max(${properties.crimePercentil})::int`,
          precoMediano: sql<
            string | null
          >`round((percentile_cont(0.5) within group (order by ${properties.preco}::numeric))::numeric, 0)`,
        })
        .from(properties)
        .where(
          and(
            ativo,
            eq(properties.uf, uf),
            sql`upper(${properties.cidade}) = ${cidade.toUpperCase()}`,
            isNotNull(properties.crimeBairro),
            isNotNull(properties.crimeTaxa),
            // MESMA regra de esconder da ficha (`lerSeguranca`): some só o
            // bairro que é `suprimido` E `marcado` ao mesmo tempo, onde o
            // critério da origem é misto e a taxa sai distorcida. Esconder
            // todo bairro `marcado` apagaria justamente os CALMOS — foi o
            // defeito corrigido em 31/08/2026, não reintroduza.
            sql`not (coalesce(${properties.crimeSuprimido}, false) and coalesce(${properties.crimeMarcado}, false))`
          )
        )
        .groupBy(properties.crimeBairro)
        .orderBy(sql`max(${properties.crimeTaxa}) desc`);

      return linhas.map((l) => ({
        bairro: l.bairro ?? "—",
        total: l.total,
        taxa: Number(l.taxa),
        percentil: l.percentil,
        precoMediano: l.precoMediano != null ? Number(l.precoMediano) : null,
      }));
    },
    ["o6", "guias", "bairros-cidade"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

/** Totais do estoque, para a abertura dos guias. */
export const getTotais = cache(
  unstable_cache(
    async () => {
      const [linha] = await db
        .select({
          total: sql<number>`count(*)::int`,
          cidades: sql<number>`count(distinct (${properties.uf} || '/' || ${properties.cidade}))::int`,
          abaixoDaAvaliacao: sql<number>`count(*) filter (where ${properties.desconto} > 0)::int`,
          comSeguranca: sql<number>`count(*) filter (where ${properties.crimePercentil} is not null)::int`,
          comBairro: sql<number>`count(*) filter (where ${properties.crimeGrao} = 'bairro')::int`,
        })
        .from(properties)
        .where(ativo);
      return linha;
    },
    ["o6", "guias", "totais"],
    { revalidate: CACHE_TTL_LISTA }
  )
);
