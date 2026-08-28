/**
 * Suporte da página pública do imóvel (O6). Fica em `_lib` (prefixo com
 * underscore) porque o Next.js ignora essa pasta para efeito de rota — não é
 * uma URL, é só código compartilhado entre `page.tsx` e `not-found.tsx`.
 */

import { cache } from "react";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";

export type Imovel = InferSelectModel<typeof properties>;

/**
 * `cache()` garante que `generateMetadata` e a página em si — que rodam na
 * mesma requisição — não disparem a mesma query duas vezes.
 */
export const buscarImovel = cache(async (caixaId: string): Promise<Imovel | null> => {
  const [linha] = await db
    .select()
    .from(properties)
    .where(eq(properties.caixaId, caixaId))
    .limit(1);
  return linha ?? null;
});

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

const SITE_URL_ENV = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

/**
 * Resolve um caminho para URL absoluta quando `NEXT_PUBLIC_SITE_URL` estiver
 * configurada no ambiente. O domínio final do agregador ainda não foi
 * decidido (ver PLAN.md) — até lá, devolve o caminho relativo em vez de
 * inventar um domínio. Um `<link rel="canonical">` relativo é resolvido pelo
 * navegador/crawler contra a própria página, então continua correto; só o
 * JSON-LD perde o host absoluto (schema.org recomenda URI absoluta) até a
 * env var ser configurada no deploy.
 */
export function urlAbsoluta(caminho: string): string {
  return SITE_URL_ENV ? `${SITE_URL_ENV}${caminho}` : caminho;
}
