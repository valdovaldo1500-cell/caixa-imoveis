import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, sql } from "drizzle-orm";

interface MunicipioData {
  municipio: string;
  weight: number;
  latitude: number;
  longitude: number;
  population: number;
}

export async function updateCrimeRates(): Promise<{
  updated: number;
  citiesWithData: number;
}> {
  // Fetch all RS municipality crime data in one call
  const res = await fetch(
    "https://crimebrasil.com.br/api/heatmap/municipios?state=RS&ultimos_meses=12",
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    throw new Error(`Crime Brasil API error: ${res.status} ${res.statusText}`);
  }

  const municipios: MunicipioData[] = await res.json();

  // Build cidade → crime rate map (rate per 100k inhabitants)
  const rateMap = new Map<string, number>();
  for (const m of municipios) {
    if (m.population > 0) {
      const rate = (m.weight / m.population) * 100000;
      rateMap.set(m.municipio.toUpperCase(), rate);
    }
  }

  // Get all active properties
  const rows = await db
    .select({
      id: properties.id,
      cidade: properties.cidade,
    })
    .from(properties)
    .where(isNull(properties.removedAt));

  if (rows.length === 0) {
    return { updated: 0, citiesWithData: 0 };
  }

  // Group properties by cidade to batch updates
  const cityGroups = new Map<string, number[]>();
  for (const row of rows) {
    const cidade = row.cidade.toUpperCase();
    if (!cityGroups.has(cidade)) {
      cityGroups.set(cidade, []);
    }
    cityGroups.get(cidade)!.push(row.id);
  }

  let updated = 0;
  let citiesWithData = 0;
  const now = new Date();

  for (const [cidade, ids] of cityGroups) {
    const rate = rateMap.get(cidade);
    if (rate === undefined) continue;

    citiesWithData++;

    // Update all properties in this city
    const BATCH_SIZE = 500;
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batch = ids.slice(i, i + BATCH_SIZE);
      await db
        .update(properties)
        .set({
          crimeRate: String(Math.round(rate * 100) / 100),
          crimeRateUpdatedAt: now,
          updatedAt: now,
        })
        .where(sql`${properties.id} = ANY(${sql.raw(`ARRAY[${batch.join(",")}]::int[]`)})`);
      updated += batch.length;
    }
  }

  return { updated, citiesWithData };
}
