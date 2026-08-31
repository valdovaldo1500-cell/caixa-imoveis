/**
 * Suporte da página pública do imóvel (O6). Fica em `_lib` (prefixo com
 * underscore) porque o Next.js ignora essa pasta para efeito de rota — não é
 * uma URL, é só código compartilhado entre `page.tsx` e `not-found.tsx`.
 */

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { CACHE_TTL_LISTA } from "@/lib/cache";

export type Imovel = InferSelectModel<typeof properties>;

/**
 * Duas camadas de cache: `unstable_cache` persiste o resultado entre
 * requisições (TTL de 1h — ver `@/lib/cache.ts`), e `cache()` do React
 * garante que `generateMetadata` e a página em si — que rodam na mesma
 * requisição — não disparem a mesma leitura duas vezes.
 *
 * PEGADINHA: `linha` (o registro inteiro de `properties`) carrega várias
 * colunas `timestamp`/`date` (ex.: `createdAt`, `crimeJanelaInicio`) que,
 * depois de passar pelo `JSON.stringify`/`JSON.parse` do `unstable_cache`,
 * viram `string` em vez de `Date` num cache HIT. Hoje nenhum campo de data
 * do imóvel é usado com `.getFullYear()`/`.toISOString()` na página pública
 * (só `Boolean(imovel.removedAt)`, que funciona igual nos dois tipos) — se
 * algum código novo precisar de um desses campos como `Date`, trate a
 * pegadinha ali, não aqui.
 */
export const buscarImovel = cache(
  unstable_cache(
    async (caixaId: string): Promise<Imovel | null> => {
      const [linha] = await db
        .select()
        .from(properties)
        .where(eq(properties.caixaId, caixaId))
        .limit(1);
      return linha ?? null;
    },
    ["o6", "imovel", "buscar"],
    { revalidate: CACHE_TTL_LISTA }
  )
);

export function formatBRL(valor: string | number | null | undefined): string | null {
  if (valor == null) return null;
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

/** "2 quartos", "1 quarto" — nunca "1 quartos". */
export function plural(n: number, singular: string, pluralForma: string): string {
  return `${n.toLocaleString("pt-BR")} ${n === 1 ? singular : pluralForma}`;
}

const PREPOSICOES = new Set(["de", "da", "do", "das", "dos", "e"]);

/** "PORTO ALEGRE" -> "Porto Alegre". Os nomes vêm em caixa alta da fonte. */
export function tituloCaso(txt: string | null | undefined): string {
  if (!txt) return "";
  return txt
    .toLowerCase()
    .split(" ")
    .map((palavra, i) =>
      i > 0 && PREPOSICOES.has(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");
}

export const UF_NOMES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará",
  DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão",
  MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará",
  PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
  SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

export function nomeUf(uf: string): string {
  return UF_NOMES[uf?.toUpperCase()] ?? uf;
}

// O domínio do agregador é imoveis.crimebrasil.com.br — o mesmo que o
// sitemap e o robots.txt já usam por exigência de protocolo. Manter um
// fallback relativo aqui deixava as duas metades do site discordando: o
// sitemap anunciava URL absoluta e o canonical da ficha era relativo, e o
// JSON-LD saía sem host (schema.org pede URI absoluta). NEXT_PUBLIC_SITE_URL
// continua tendo precedência, para ambiente de teste.
const SITE_URL_ENV = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://imoveis.crimebrasil.com.br"
).replace(/\/+$/, "");
export function urlAbsoluta(caminho: string): string {
  return SITE_URL_ENV ? `${SITE_URL_ENV}${caminho}` : caminho;
}

/**
 * Serializa um objeto para injetar em `<script type="application/ld+json">`
 * via `dangerouslySetInnerHTML`. `JSON.stringify` puro NÃO escapa `<`, então
 * um campo vindo da fonte (ex.: `descricao`) contendo `</script>` fecharia a
 * tag antes da hora e o que viesse depois seria executado como HTML/script —
 * o vetor de XSS clássico de JSON-LD. Escapar para `<` neutraliza isso
 * sem alterar o JSON (é só uma forma diferente de representar o mesmo caractere).
 */
export function jsonLdSeguro(dado: unknown): string {
  return JSON.stringify(dado).replace(/</g, "\\u003c");
}

// --- Rastreador de edital (O6, requisito #7) ---------------------------

/**
 * `leilao1Data`/`leilao2Data`/`licitacaoData`/`propostaPrazo`/`editalPublicadoEm`
 * são `timestamp` do Postgres, sujeitos à MESMA pegadinha documentada acima
 * em `buscarImovel`: `Date` num cache MISS, `string` ISO num cache HIT.
 * Normaliza os dois formatos antes de qualquer comparação/format.
 */
export function paraData(v: Date | string | null | undefined): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * "14/10/2026 às 10h00". As colunas do coletor guardam o INSTANTE UTC real
 * (o valor já foi convertido de horário de Brasília na coleta — ver
 * `scrape-edital.ts`), então formatar em America/Sao_Paulo aqui devolve
 * exatamente a hora que a Caixa publicou.
 */
export function formatarDataHora(v: Date | string | null | undefined): string | null {
  const d = paraData(v);
  if (!d) return null;
  const dataStr = d.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const horaStr = d.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dataStr} às ${horaStr}`;
}

export function ehFuturo(v: Date | string | null | undefined): boolean {
  const d = paraData(v);
  return d != null && d.getTime() > Date.now();
}
