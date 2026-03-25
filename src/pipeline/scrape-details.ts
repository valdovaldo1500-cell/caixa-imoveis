import { execFileSync } from "child_process";
import * as cheerio from "cheerio";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, and, eq, isNotNull } from "drizzle-orm";

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

const DETAIL_BASE_URL =
  "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=";

/**
 * Fetches and parses the detail page for a property.
 * The page is ASP Classic with tables — we use cheerio to extract fields.
 */
export function scrapePropertyDetails(property: {
  caixaId: string;
  linkCaixa: string | null;
}): ScrapedDetails {
  const url = property.linkCaixa?.trim()
    ? property.linkCaixa.trim()
    : `${DETAIL_BASE_URL}${property.caixaId}`;

  const htmlBuffer = execFileSync(
    "curl",
    [
      "-s",
      "-L",
      "--max-time", "30",
      "-H", "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "-H", "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8",
      "-H", `Referer: https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp`,
      url,
    ],
    { timeout: 45000 }
  );

  const html = htmlBuffer.toString("latin1");

  // Detect bot block
  if (
    html.includes("Radware") ||
    html.includes("Bot Manager") ||
    html.includes("Access Denied") ||
    html.length < 500
  ) {
    throw new Error("Request blocked by Radware Bot Manager");
  }

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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
