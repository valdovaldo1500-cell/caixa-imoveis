import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { cidadeUrl, imovelUrl, ufUrl } from "@/lib/slug";
import { VALID_STATES } from "@/lib/state";
import { CACHE_TTL_SITEMAP } from "@/lib/cache";
import { GUIAS } from "./guias/_lib/indice";

/**
 * Sitemap do agregador (O6).
 *
 * ~5.161 imóveis ativos + ~150 cidades + 2 hubs + home passam de 5.000 URLs,
 * então em vez de um `sitemap.ts` único usamos `generateSitemaps` — o Next
 * então serve cada seção em `/sitemap/<id>.xml` (não existe um índice
 * automático em `/sitemap.xml`; por isso `robots.ts` lista as três URLs
 * diretamente no campo `Sitemap:`, que aceita múltiplas linhas — é o próprio
 * formato de índice do protocolo).
 *
 * Partição por seção, não por contagem bruta: estrutura (home + hubs +
 * cidades) fica isolada dos imóveis, e os imóveis são partidos por UF —
 * GO e RS têm ciclo de vida de ingestão diferente (ver PLAN.md), então um
 * erro num pipeline não invalida o sitemap do outro estado.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

const ativo = isNull(properties.removedAt);

/**
 * O sitemap consulta o banco. Se ele for pré-renderizado no build, o build
 * passa a depender de o banco estar acessível de dentro do runner — e no
 * Coolify o build roda antes de o container entrar na rede do Postgres.
 * Um build que falha por isso derruba o deploy inteiro, e o sitemap não
 * ganha nada em ser estático: ele muda todo dia, junto com o estoque.
 * Por isso é gerado sob demanda (`force-dynamic`, nunca pré-renderizado), e o
 * cache de verdade fica nas funções `sitemapEstrutura`/`sitemapImoveis`
 * abaixo, via `unstable_cache` — 6h de TTL (`CACHE_TTL_SITEMAP`), maior que
 * o TTL das páginas porque o sitemap só serve crawler, não visita direta.
 */
export const dynamic = "force-dynamic";

export async function generateSitemaps() {
  return [{ id: "estrutura" }, { id: "imoveis-go" }, { id: "imoveis-rs" }];
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const sitemapId = await id;

  if (sitemapId === "imoveis-go" || sitemapId === "imoveis-rs") {
    const uf = sitemapId === "imoveis-go" ? "GO" : "RS";
    return sitemapImoveis(uf);
  }

  return sitemapEstrutura();
}

// PEGADINHA (ver `@/lib/cache.ts`): `unstable_cache` serializa o retorno com
// `JSON.stringify`/`JSON.parse`, então os `Date` de `lastModified` abaixo
// voltam como `string` (ISO) num cache HIT — e como `Date` de verdade só no
// MISS. Não quebra nada aqui: `MetadataRoute.Sitemap["lastModified"]` já
// aceita `string | Date`, e o serializador de sitemap do Next também aceita
// os dois formatos.
/**
 * `max(updated_at)` volta como STRING no formato do Postgres
 * ("2026-08-30 06:18:08.18") — o driver só converte para `Date` o que tem
 * tipo declarado na coluna, e um agregado em `sql<...>` não tem. Essa string
 * ia crua para o `<lastmod>`, que exige data W3C: em 31/08/2026 o Search
 * Console recusou 175 das 178 URLs de `estrutura.xml` por causa disso (as 3
 * que passaram eram as que usavam `new Date()`). Normaliza sempre.
 */
function dataValida(v: Date | string | null): Date {
  if (v instanceof Date) return v;
  if (typeof v === "string") {
    // "YYYY-MM-DD HH:MM:SS[.ms]" — sem T e sem fuso, o Date do JS aceita se
    // trocarmos o espaço por "T"; se ainda assim vier inválida, cai para agora.
    const d = new Date(v.includes("T") ? v : v.replace(" ", "T") + "Z");
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

const sitemapEstrutura = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    const entradas: MetadataRoute.Sitemap = [
      { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ];

    // Guias (requisito #6 do plano). Vêm do mesmo índice que o hub `/guias`
    // renderiza, então guia novo entra aqui sozinho.
    entradas.push({
      url: `${SITE_URL}/guias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const g of GUIAS) {
      entradas.push({
        url: `${SITE_URL}/guias/${g.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const uf of VALID_STATES) {
      entradas.push({
        url: `${SITE_URL}${ufUrl(uf)}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    const cidades = await db
      .select({
        uf: properties.uf,
        cidade: properties.cidade,
        atualizadoEm: sql<Date | null>`max(${properties.updatedAt})`,
      })
      .from(properties)
      .where(ativo)
      .groupBy(properties.uf, properties.cidade);

    for (const c of cidades) {
      entradas.push({
        url: `${SITE_URL}${cidadeUrl(c.uf, c.cidade)}`,
        lastModified: dataValida(c.atualizadoEm),
        changeFrequency: "daily",
        priority: 0.6,
      });
    }

    return entradas;
  },
  ["o6", "sitemap", "estrutura"],
  { revalidate: CACHE_TTL_SITEMAP }
);

const sitemapImoveis = unstable_cache(
  async (uf: string): Promise<MetadataRoute.Sitemap> => {
    const imoveis = await db
      .select({
        caixaId: properties.caixaId,
        uf: properties.uf,
        cidade: properties.cidade,
        tipoImovel: properties.tipoImovel,
        atualizadoEm: properties.updatedAt,
      })
      .from(properties)
      .where(and(ativo, eq(properties.uf, uf)));

    return imoveis.map((p) => ({
      url: `${SITE_URL}${imovelUrl(p)}`,
      lastModified: dataValida(p.atualizadoEm),
      changeFrequency: "daily" as const,
      priority: 0.5,
    }));
  },
  ["o6", "sitemap", "imoveis"],
  { revalidate: CACHE_TTL_SITEMAP }
);
