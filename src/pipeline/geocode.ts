import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, and, eq, sql, isNotNull } from "drizzle-orm";
import { STATE_META } from "@/lib/state";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "CaixaImoveisBR/1.0 (imoveis.crimebrasil.com.br)";

function stateFullName(uf: string): string {
  return STATE_META[uf.toUpperCase()]?.nome || uf.toUpperCase();
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

async function nominatimSearch(query: string): Promise<NominatimResult | null> {
  const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    throw new Error(`Nominatim HTTP ${res.status} for query: ${query}`);
  }

  const data: NominatimResult[] = await res.json();
  return data.length > 0 ? data[0] : null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Cleans a raw address string by removing apartment/unit info,
 * normalising house number prefixes, stripping parenthetical content,
 * and collapsing excess whitespace.
 */
export function cleanAddress(raw: string): string {
  let s = raw;

  // Remove parenthetical content: (...)
  s = s.replace(/\([^)]*\)/g, " ");

  // Strip apartment / unit tokens followed by alphanumeric identifiers.
  // Handles: Apto, Apt., Apt, AP, BL, BLOCO, PREDIO, PRED, CASA, LOTE, LT
  s = s.replace(
    /\b(APTO?\.?|AP|BL|BLOCO|PREDIO|PRED|CASA|LOTE|LT)\s*[\w-]+/gi,
    " "
  );

  // Strip "N." / "N " / "Nº" prefix from house numbers (e.g. "N. 123" → "123")
  s = s.replace(/\bN[º.]?\s*(\d)/gi, "$1");

  // Remove trailing "SN" (sem número) — standalone word
  s = s.replace(/\bSN\b/gi, " ");

  // Collapse whitespace and trim
  s = s.replace(/\s{2,}/g, " ").trim();

  // Remove trailing comma/semicolons left by the stripping above
  s = s.replace(/[,;]+$/, "").trim();

  return s;
}

/**
 * Searches Nominatim using structured query parameters
 * (street, city, state, country) for more precise results.
 */
async function nominatimStructuredSearch(
  street: string,
  city: string,
  state: string
): Promise<NominatimResult | null> {
  const params = new URLSearchParams({
    format: "json",
    limit: "1",
    street,
    city,
    state,
    country: "Brazil",
  });

  const url = `${NOMINATIM_URL}?${params.toString()}`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    throw new Error(
      `Nominatim HTTP ${res.status} for structured search: ${street}, ${city}`
    );
  }

  const data: NominatimResult[] = await res.json();
  return data.length > 0 ? data[0] : null;
}

/**
 * Re-geocodes properties that share their exact lat/lng with 3 or more
 * other properties — a sign they were pinned to a bairro/city centroid
 * rather than their real address.
 *
 * Strategy:
 *   1. Try Nominatim structured search with cleaned address.
 *   2. Fall back to free-text search with cleaned address + city + RS, Brasil.
 *   3. Only write if the new result differs from the current coordinates.
 */
export async function regeocodeStacked(limit = 100): Promise<{
  regeocoded: number;
  unchanged: number;
  errors: string[];
}> {
  const result = { regeocoded: 0, unchanged: 0, errors: [] as string[] };

  // Find properties whose exact lat/lng is shared with 3+ other properties
  const stacked = await db
    .select({
      id: properties.id,
      caixaId: properties.caixaId,
      endereco: properties.endereco,
      bairro: properties.bairro,
      cidade: properties.cidade,
      uf: properties.uf,
      lat: properties.lat,
      lng: properties.lng,
    })
    .from(properties)
    .where(
      and(
        isNotNull(properties.lat),
        isNotNull(properties.lng),
        isNull(properties.removedAt),
        sql`(
          SELECT COUNT(*) FROM properties p2
          WHERE p2.lat = ${properties.lat}
            AND p2.lng = ${properties.lng}
            AND p2.removed_at IS NULL
        ) >= 3`
      )
    )
    .limit(limit);

  console.log(`[regeocodeStacked] Found ${stacked.length} candidate properties`);

  for (let i = 0; i < stacked.length; i++) {
    const prop = stacked[i];

    if (i > 0) {
      await sleep(1100);
    }

    const rawEndereco = prop.endereco?.trim() || "";
    const cidade = prop.cidade?.trim() || "";
    const cleanedStreet = rawEndereco ? cleanAddress(rawEndereco) : "";

    let hit: NominatimResult | null = null;

    // Attempt 1: structured search (requires a street value)
    if (cleanedStreet) {
      try {
        console.log(
          `[regeocodeStacked] [${prop.caixaId}] Structured: "${cleanedStreet}", "${cidade}"`
        );
        hit = await nominatimStructuredSearch(cleanedStreet, cidade, stateFullName(prop.uf));
        if (!hit) {
          console.log(`[regeocodeStacked] [${prop.caixaId}] Structured returned no result`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[regeocodeStacked] [${prop.caixaId}] Structured error: ${msg}`);
      }

      // Brief pause between structured and free-text attempts
      if (!hit) {
        await sleep(1100);
      }
    }

    // Attempt 2: free-text fallback with cleaned address
    if (!hit && cleanedStreet) {
      try {
        const query = `${cleanedStreet}, ${cidade}, RS, Brasil`;
        console.log(`[regeocodeStacked] [${prop.caixaId}] Free-text: "${query}"`);
        hit = await nominatimSearch(query);
        if (!hit) {
          console.log(`[regeocodeStacked] [${prop.caixaId}] Free-text returned no result`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[regeocodeStacked] [${prop.caixaId}] Free-text error: ${msg}`);
        result.errors.push(`${prop.caixaId}: ${msg}`);
        continue;
      }
    }

    if (!hit) {
      result.unchanged++;
      continue;
    }

    // Only update if the result is genuinely different
    const currentLat = prop.lat ? parseFloat(String(prop.lat)) : null;
    const currentLng = prop.lng ? parseFloat(String(prop.lng)) : null;
    const newLat = parseFloat(hit.lat);
    const newLng = parseFloat(hit.lon);

    const TOLERANCE = 0.00001; // ~1 metre
    const isSame =
      currentLat !== null &&
      currentLng !== null &&
      Math.abs(newLat - currentLat) < TOLERANCE &&
      Math.abs(newLng - currentLng) < TOLERANCE;

    if (isSame) {
      console.log(
        `[regeocodeStacked] [${prop.caixaId}] New coords identical to current — skipping`
      );
      result.unchanged++;
      continue;
    }

    console.log(
      `[regeocodeStacked] [${prop.caixaId}] Updating ${currentLat},${currentLng} → ${newLat},${newLng} (${hit.display_name})`
    );

    await db
      .update(properties)
      .set({
        lat: hit.lat,
        lng: hit.lon,
        geocodedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(properties.id, prop.id));

    result.regeocoded++;
  }

  console.log(
    `[regeocodeStacked] Done — regeocoded: ${result.regeocoded}, unchanged: ${result.unchanged}, errors: ${result.errors.length}`
  );

  return result;
}

export async function geocodeProperties(limit = 50): Promise<{
  geocoded: number;
  failed: number;
  errors: string[];
}> {
  const result = { geocoded: 0, failed: 0, errors: [] as string[] };

  const pending = await db
    .select({
      id: properties.id,
      caixaId: properties.caixaId,
      endereco: properties.endereco,
      bairro: properties.bairro,
      cidade: properties.cidade,
    })
    .from(properties)
    .where(and(isNull(properties.lat), isNull(properties.removedAt)))
    .limit(limit);

  console.log(`[geocode] Found ${pending.length} properties to geocode`);

  for (let i = 0; i < pending.length; i++) {
    const prop = pending[i];

    // Rate limit: 1 request per second (Nominatim policy)
    if (i > 0) {
      await sleep(1100);
    }

    const parts = {
      endereco: prop.endereco?.trim() || null,
      bairro: prop.bairro?.trim() || null,
      cidade: prop.cidade?.trim() || "",
    };

    // Build query candidates from most specific to least specific
    const queries: string[] = [];

    if (parts.endereco && parts.bairro) {
      queries.push(`${parts.endereco}, ${parts.bairro}, ${parts.cidade}, RS, Brasil`);
    } else if (parts.endereco) {
      queries.push(`${parts.endereco}, ${parts.cidade}, RS, Brasil`);
    }

    if (parts.bairro) {
      queries.push(`${parts.bairro}, ${parts.cidade}, RS, Brasil`);
    }

    queries.push(`${parts.cidade}, RS, Brasil`);

    let geocoded = false;

    for (const query of queries) {
      try {
        console.log(`[geocode] [${prop.caixaId}] Trying: ${query}`);
        const hit = await nominatimSearch(query);

        if (hit) {
          console.log(
            `[geocode] [${prop.caixaId}] Found: ${hit.lat}, ${hit.lon} (${hit.display_name})`
          );

          await db
            .update(properties)
            .set({
              lat: hit.lat,
              lng: hit.lon,
              geocodedAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(properties.id, prop.id));

          result.geocoded++;
          geocoded = true;
          break;
        }

        console.log(`[geocode] [${prop.caixaId}] No result for: ${query}`);

        // Rate limit between fallback attempts too
        await sleep(1100);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[geocode] [${prop.caixaId}] Error: ${msg}`);
        result.errors.push(`${prop.caixaId}: ${msg}`);
        break;
      }
    }

    if (!geocoded && !result.errors.some((e) => e.startsWith(prop.caixaId))) {
      console.warn(`[geocode] [${prop.caixaId}] All queries exhausted, no result`);
      result.failed++;
    }
  }

  console.log(
    `[geocode] Done — geocoded: ${result.geocoded}, failed: ${result.failed}, errors: ${result.errors.length}`
  );

  return result;
}
