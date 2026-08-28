import type { MetadataRoute } from "next";
import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { cidadeUrl, imovelUrl, ufUrl } from "@/lib/slug";
import { VALID_STATES } from "@/lib/state";

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

async function sitemapEstrutura(): Promise<MetadataRoute.Sitemap> {
  const entradas: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  ];

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
      lastModified: c.atualizadoEm ?? new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    });
  }

  return entradas;
}

async function sitemapImoveis(uf: string): Promise<MetadataRoute.Sitemap> {
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
    lastModified: p.atualizadoEm ?? new Date(),
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));
}
