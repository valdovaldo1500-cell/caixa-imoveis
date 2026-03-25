import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, and, eq, sql, isNotNull } from "drizzle-orm";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "CaixaImoveisRS/1.0 (imoveis.crimebrasil.com.br)";

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
