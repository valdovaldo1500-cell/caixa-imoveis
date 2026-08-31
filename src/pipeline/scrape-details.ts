import * as cheerio from "cheerio";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, and, eq } from "drizzle-orm";
import { fetchDetailHtml, sleep } from "./caixa-detail-fetch";

export interface ScrapedDetails {
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  banheiros: number | null;
  areaTotalM2: number | null;
  areaPrivativaM2: number | null;
  matricula: string | null;
  comarca: string | null;
  fotoUrl: string | null;
}

/**
 * Fetches and parses the detail page for a property.
 * The page is ASP Classic with tables — we use cheerio to extract fields.
 *
 * NOTA (31/08/2026): `findValue()` abaixo procura o valor num `<td>`/`<th>`
 * vizinho do rótulo. A página de detalhe ATUAL da Caixa não usa tabela pra
 * nenhum desses campos — é `<span>Rótulo: <strong>valor</strong></span>` — e
 * por isso `matricula`/`comarca` nunca são preenchidos por este caminho (é o
 * bug por trás de matricula/comarca 0/5.161 no banco). O rastreador de
 * edital (`scrape-edital.ts`) faz a extração correta por regex e passa a ser
 * o escritor de fato dessas duas colunas — não fizemos esse fix aqui para
 * não mexer no caminho de quartos/vagas/tipoImovel, que é escopo de outra
 * tarefa (fonte provável real desses três: parse-descriptions, não scraping).
 */
export function scrapePropertyDetails(property: {
  caixaId: string;
  linkCaixa: string | null;
}): ScrapedDetails {
  const html = fetchDetailHtml(property);
  const $ = cheerio.load(html);

  // Helper: find a table cell value by its label text (case-insensitive, partial match)
  function findValue(label: string): string | null {
    let found: string | null = null;
    $("td, th").each((_, el) => {
      const text = $(el).text().trim();
      if (text.toLowerCase().includes(label.toLowerCase())) {
        // The value is typically in the next sibling td
        const next = $(el).next("td");
        if (next.length) {
          found = next.text().trim() || null;
          return false; // break each
        }
      }
    });
    return found;
  }

  // Helper: parse integer from a string like "3 quarto(s)"
  function parseIntFromText(text: string | null): number | null {
    if (!text) return null;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  // Helper: parse decimal from a string like "146,57 m²"
  function parseDecimalFromText(text: string | null): number | null {
    if (!text) return null;
    const match = text.match(/([\d.,]+)/);
    if (!match) return null;
    const normalized = match[1].replace(/\./g, "").replace(",", ".");
    const num = parseFloat(normalized);
    return isNaN(num) || num === 0 ? null : num;
  }

  // --- Extract fields ---

  // Tipo do imóvel
  const tipoRaw = findValue("Tipo") || findValue("tipo do imóvel") || findValue("tipo de imóvel");
  const tipoImovel = tipoRaw ? tipoRaw.split(/[,\n]/)[0].trim() || null : null;

  // Quartos
  const quartosRaw = findValue("Dormitório") || findValue("Quarto") || findValue("dormitório");
  const quartos = parseIntFromText(quartosRaw);

  // Vagas
  const vagasRaw = findValue("Vaga") || findValue("garagem") || findValue("Garagem");
  const vagas = parseIntFromText(vagasRaw);

  // Banheiros
  const banheirosRaw = findValue("Banheiro") || findValue("WC") || findValue("banheiro");
  const banheiros = parseIntFromText(banheirosRaw);

  // Área total
  const areaTotalRaw = findValue("Área Total") || findValue("área total");
  const areaTotalM2 = parseDecimalFromText(areaTotalRaw);

  // Área privativa
  const areaPrivRaw = findValue("Área Privativa") || findValue("área privativa");
  const areaPrivativaM2 = parseDecimalFromText(areaPrivRaw);

  // Matrícula
  const matriculaRaw = findValue("Matrícula") || findValue("matricula") || findValue("Matrícula");
  const matricula = matriculaRaw ? matriculaRaw.trim() || null : null;

  // Comarca
  const comarcaRaw = findValue("Comarca") || findValue("comarca");
  const comarca = comarcaRaw ? comarcaRaw.trim() || null : null;

  // Photo URL — pattern: https://venda-imoveis.caixa.gov.br/fotos/F{numero}{sequence}.jpg
  let fotoUrl: string | null = null;
  $("img").each((_, el) => {
    const src = $(el).attr("src") || "";
    if (src.includes("/fotos/F") && src.endsWith(".jpg")) {
      // Make absolute URL if relative
      if (src.startsWith("http")) {
        fotoUrl = src;
      } else {
        fotoUrl = `https://venda-imoveis.caixa.gov.br${src.startsWith("/") ? "" : "/"}${src}`;
      }
      return false; // take first photo only
    }
  });

  // Fallback: look for photo in background-image style or data-src attributes
  if (!fotoUrl) {
    $("[style]").each((_, el) => {
      const style = $(el).attr("style") || "";
      const match = style.match(/url\(['"]?(https?:\/\/venda-imoveis\.caixa\.gov\.br\/fotos\/[^'")\s]+)['"]?\)/i);
      if (match) {
        fotoUrl = match[1];
        return false;
      }
    });
  }

  return {
    tipoImovel,
    quartos,
    vagas,
    banheiros,
    areaTotalM2,
    areaPrivativaM2,
    matricula,
    comarca,
    fotoUrl,
  };
}

/**
 * Scrapes detail pages for properties that haven't been scraped yet.
 * Applies a 2-second delay between requests to avoid rate limiting.
 */
export async function scrapeNewProperties(limit = 20): Promise<{
  scraped: number;
  errors: string[];
}> {
  const result = { scraped: 0, errors: [] as string[] };

  // Fetch unscraped properties
  const pending = await db
    .select({
      id: properties.id,
      caixaId: properties.caixaId,
      linkCaixa: properties.linkCaixa,
    })
    .from(properties)
    .where(and(isNull(properties.detailScrapedAt), isNull(properties.removedAt)))
    .limit(limit);

  for (let i = 0; i < pending.length; i++) {
    const prop = pending[i];

    // Rate limiting: 2s delay between requests (skip before first)
    if (i > 0) {
      await sleep(2000);
    }

    try {
      const details = scrapePropertyDetails({
        caixaId: prop.caixaId,
        linkCaixa: prop.linkCaixa,
      });

      await db
        .update(properties)
        .set({
          tipoImovel: details.tipoImovel,
          quartos: details.quartos,
          vagas: details.vagas,
          banheiros: details.banheiros,
          areaTotalM2: details.areaTotalM2 != null ? String(details.areaTotalM2) : undefined,
          areaPrivativaM2: details.areaPrivativaM2 != null ? String(details.areaPrivativaM2) : undefined,
          matricula: details.matricula,
          comarca: details.comarca,
          fotoUrl: details.fotoUrl,
          detailScrapedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(properties.id, prop.id));

      result.scraped++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`${prop.caixaId}: ${msg}`);
    }
  }

  return result;
}

/**
 * Re-scrapes apartments with missing quartos data.
 * Only updates the `quartos` and `detailScrapedAt` fields — leaves all
 * other existing values untouched.
 */
export async function rescrapeForMissingQuartos(): Promise<{
  updated: number;
  errors: string[];
}> {
  const result = { updated: 0, errors: [] as string[] };

  const pending = await db
    .select({
      id: properties.id,
      caixaId: properties.caixaId,
      linkCaixa: properties.linkCaixa,
    })
    .from(properties)
    .where(
      and(
        isNull(properties.quartos),
        eq(properties.tipoImovel, "Apartamento"),
        isNull(properties.removedAt)
      )
    );

  for (let i = 0; i < pending.length; i++) {
    const prop = pending[i];

    if (i > 0) {
      await sleep(2000);
    }

    try {
      const details = scrapePropertyDetails({
        caixaId: prop.caixaId,
        linkCaixa: prop.linkCaixa,
      });

      await db
        .update(properties)
        .set({
          quartos: details.quartos,
          detailScrapedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(properties.id, prop.id));

      result.updated++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`${prop.caixaId}: ${msg}`);
    }
  }

  return result;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
