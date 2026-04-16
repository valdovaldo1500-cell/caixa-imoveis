import { readFileSync } from "fs";
import { db } from "@/lib/db";
import { zapListings } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

interface VivaRealListing {
  vrId: string;
  business: string;
  cidade: string;
  bairro: string;
  unitType: string;
  price: number;
  area: number;
  pricePerM2: number;
  bedrooms: number;
  parkingSpaces: number;
  listingUrl: string;
  condoFee: number;
  bairroSearch?: string;
}

/**
 * Import VivaReal listings into the shared zap_listings table with source="vivareal".
 *
 * Dedup strategy:
 * 1. Skip if a row with same zapId (stored in zapId column) + business already exists
 *    with source="vivareal" (exact ID match).
 * 2. Skip if a row from the same source already shares area+price+bairro (cross-source
 *    dedup to avoid counting the same physical listing twice when ZAP and VivaReal
 *    both carry it).
 */
export async function importVivaRealData(
  jsonPath: string,
  uf: string = "RS"
): Promise<{ imported: number; skipped: number; deduped: number; errors: string[] }> {
  const ufUpper = uf.toUpperCase();
  let raw: string;
  try {
    raw = readFileSync(jsonPath, "utf-8");
  } catch (err) {
    throw new Error(
      `Cannot read VivaReal data file at ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  let listings: VivaRealListing[];
  try {
    listings = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!Array.isArray(listings)) {
    throw new Error("VivaReal data file must contain a JSON array");
  }

  let imported = 0;
  let skipped = 0;
  let deduped = 0;
  const errors: string[] = [];

  for (const listing of listings) {
    try {
      // 1. Check if already exists by vrId (stored in zapId column) + business + source
      if (listing.vrId) {
        const existing = await db
          .select({ id: zapListings.id })
          .from(zapListings)
          .where(
            and(
              eq(zapListings.zapId, listing.vrId),
              eq(zapListings.business, listing.business),
              eq(zapListings.source, "vivareal")
            )
          )
          .limit(1);

        if (existing.length > 0) {
          skipped++;
          continue;
        }
      }

      // 2. Cross-source dedup: if ZAP already has same area+price+bairro, skip
      // (ZAP and VivaReal frequently carry identical listings)
      if (listing.price > 0 && listing.area > 0 && listing.bairro) {
        const bairroUpper = listing.bairro.toUpperCase();
        const priceStr = listing.price.toFixed(2);
        const areaStr = listing.area.toFixed(2);

        const duplicate = await db
          .select({ id: zapListings.id })
          .from(zapListings)
          .where(
            and(
              eq(zapListings.business, listing.business),
              sql`upper(${zapListings.bairro}) = ${bairroUpper}`,
              sql`${zapListings.price} = ${priceStr}`,
              sql`${zapListings.area} = ${areaStr}`
            )
          )
          .limit(1);

        if (duplicate.length > 0) {
          deduped++;
          continue;
        }
      }

      await db.insert(zapListings).values({
        zapId: listing.vrId || null,       // vrId stored in the zapId column
        business: listing.business,
        cidade: listing.cidade,
        bairro: listing.bairro || null,
        unitType: listing.unitType || null,
        price: listing.price.toFixed(2),
        area: listing.area.toFixed(2),
        pricePerM2: listing.pricePerM2.toFixed(2),
        bedrooms: listing.bedrooms || null,
        parkingSpaces: listing.parkingSpaces || null,
        listingUrl: listing.listingUrl || null,
        condoFee: listing.condoFee > 0 ? listing.condoFee.toFixed(2) : null,
        source: "vivareal",
      });

      imported++;
    } catch (err) {
      errors.push(
        `Insert error for vrId=${listing.vrId}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return { imported, skipped, deduped, errors };
}
