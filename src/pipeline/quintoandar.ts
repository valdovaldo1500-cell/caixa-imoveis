import { readFileSync } from "fs";
import { db } from "@/lib/db";
import { qaListings, properties } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

interface QAListing {
  qaId: string;
  business: string;
  cidade: string;
  bairro: string;
  unitType: string;
  price: number;
  area: number;
  pricePerM2: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  listingUrl: string;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

// Normalize city name for comparison: strip accents and uppercase
function normalizeCidade(name: string): string {
  return name
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Map Caixa property types to QA unit types (Portuguese)
const CAIXA_TO_QA_TYPES: Record<string, string[]> = {
  apartamento: ["APARTAMENTO", "COBERTURA", "KITNET"],
  casa: ["CASA", "SOBRADO"],
  terreno: ["LOTE", "TERRENO"],
  lote: ["LOTE", "TERRENO"],
  comercial: ["SALA", "LOJA"],
  loja: ["LOJA", "SALA"],
};

// Commercial types to EXCLUDE from residential comparables
const COMMERCIAL_TYPES = new Set(["SALA", "LOJA", "LOTE", "TERRENO"]);

function getQAUnitTypes(tipoImovel: string | null, descricao: string | null): string[] | null {
  const src = (tipoImovel || descricao || "").toLowerCase();
  for (const [key, types] of Object.entries(CAIXA_TO_QA_TYPES)) {
    if (src.includes(key)) return types;
  }
  return null; // null means no type filter (use all)
}

export async function importQAData(
  jsonPath: string
): Promise<{ imported: number; skipped: number; errors: string[] }> {
  let raw: string;
  try {
    raw = readFileSync(jsonPath, "utf-8");
  } catch (err) {
    throw new Error(
      `Cannot read QA data file at ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  let listings: QAListing[];
  try {
    listings = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!Array.isArray(listings)) {
    throw new Error("QA data file must contain a JSON array");
  }

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const listing of listings) {
    try {
      // Check if already exists by qaId + business
      if (listing.qaId) {
        const existing = await db
          .select({ id: qaListings.id })
          .from(qaListings)
          .where(
            and(
              eq(qaListings.qaId, listing.qaId),
              eq(qaListings.business, listing.business)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          skipped++;
          continue;
        }
      }

      await db.insert(qaListings).values({
        qaId: listing.qaId || null,
        business: listing.business,
        cidade: listing.cidade,
        bairro: listing.bairro || null,
        unitType: listing.unitType || null,
        price: listing.price.toFixed(2),
        area: listing.area.toFixed(2),
        pricePerM2: listing.pricePerM2.toFixed(2),
        bedrooms: listing.bedrooms || null,
        bathrooms: listing.bathrooms || null,
        parkingSpaces: listing.parkingSpaces || null,
        listingUrl: listing.listingUrl || null,
      });

      imported++;
    } catch (err) {
      errors.push(
        `Insert error for qaId=${listing.qaId}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return { imported, skipped, errors };
}

export async function calculateQAMarketValues(): Promise<{ updated: number }> {
  // Fetch all active properties
  const allProperties = await db
    .select({
      id: properties.id,
      cidade: properties.cidade,
      bairro: properties.bairro,
      tipoImovel: properties.tipoImovel,
      descricao: properties.descricao,
      quartos: properties.quartos,
      areaPrivativaM2: properties.areaPrivativaM2,
      areaTotalM2: properties.areaTotalM2,
    })
    .from(properties)
    .where(isNull(properties.removedAt));

  if (allProperties.length === 0) {
    return { updated: 0 };
  }

  // Load all QA SALE listings in memory, grouped by normalized cidade
  const allSaleListings = await db
    .select()
    .from(qaListings)
    .where(eq(qaListings.business, "SALE"));

  const allRentalListings = await db
    .select()
    .from(qaListings)
    .where(eq(qaListings.business, "RENTAL"));

  // Group by normalized cidade for fast lookup
  type QARow = (typeof allSaleListings)[0];
  const saleByCity = new Map<string, QARow[]>();
  for (const row of allSaleListings) {
    const key = normalizeCidade(row.cidade || "");
    if (!saleByCity.has(key)) saleByCity.set(key, []);
    saleByCity.get(key)!.push(row);
  }

  const rentalByCity = new Map<string, QARow[]>();
  for (const row of allRentalListings) {
    const key = normalizeCidade(row.cidade || "");
    if (!rentalByCity.has(key)) rentalByCity.set(key, []);
    rentalByCity.get(key)!.push(row);
  }

  let updated = 0;
  const now = new Date();

  for (const prop of allProperties) {
    const cityKey = normalizeCidade(prop.cidade);
    const propArea =
      prop.areaPrivativaM2 && parseFloat(prop.areaPrivativaM2) > 0
        ? parseFloat(prop.areaPrivativaM2)
        : prop.areaTotalM2 && parseFloat(prop.areaTotalM2) > 0
          ? parseFloat(prop.areaTotalM2)
          : null;

    const qaTypes = getQAUnitTypes(prop.tipoImovel, prop.descricao);
    const bairroKey = (prop.bairro || "").toUpperCase().trim();
    const propQuartos = prop.quartos;
    const isResidential = !qaTypes || !qaTypes.some(t => COMMERCIAL_TYPES.has(t));

    // Helper to filter QA listings for this property
    function filterListings(listings: QARow[], strict = false): QARow[] {
      return listings.filter((row) => {
        const rowType = (row.unitType || "").toUpperCase();
        // Always exclude commercial types for residential properties
        if (isResidential && COMMERCIAL_TYPES.has(rowType)) return false;
        // Exclude null-type listings
        if (!rowType) return false;
        // Type filter
        if (qaTypes && !qaTypes.includes(rowType)) return false;
        // Area filter: ±50% if we have area (±30% strict)
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0) {
            const ratio = Math.abs(rowArea - propArea) / propArea;
            if (ratio > (strict ? 0.3 : 0.5)) return false;
          }
        }
        // Bedrooms filter: ±1 (strict only)
        if (strict && propQuartos !== null && row.bedrooms !== null) {
          if (Math.abs(row.bedrooms - propQuartos) > 1) return false;
        }
        return true;
      });
    }

    // Try bairro match first (preferred), then city-wide fallback
    const citySaleListings = saleByCity.get(cityKey) || [];
    const cityRentalListings = rentalByCity.get(cityKey) || [];

    const bairroSaleListings = bairroKey
      ? citySaleListings.filter((r) => (r.bairro || "").toUpperCase().trim() === bairroKey)
      : [];
    const bairroRentalListings = bairroKey
      ? cityRentalListings.filter((r) => (r.bairro || "").toUpperCase().trim() === bairroKey)
      : [];

    // Step 1: bairro + type + area (strict with bedrooms)
    let saleComparables = filterListings(bairroSaleListings, true);
    // Step 2: bairro + type + area (relaxed)
    if (saleComparables.length < 3) saleComparables = filterListings(bairroSaleListings);
    // Step 3: city + type + area
    if (saleComparables.length < 3) saleComparables = filterListings(citySaleListings);
    // Step 4: city + residential only + area (no specific type, but exclude commercial)
    if (saleComparables.length < 3) {
      saleComparables = citySaleListings.filter((row) => {
        const rowType = (row.unitType || "").toUpperCase();
        if (isResidential && COMMERCIAL_TYPES.has(rowType)) return false;
        if (!rowType) return false;
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0 && Math.abs(rowArea - propArea) / propArea > 0.5) return false;
        }
        return true;
      });
    }
    // NO absolute fallback — never mix commercial with residential

    // Rental: same cascade
    let rentalComparables = filterListings(bairroRentalListings, true);
    if (rentalComparables.length < 3) rentalComparables = filterListings(bairroRentalListings);
    if (rentalComparables.length < 3) rentalComparables = filterListings(cityRentalListings);
    // Step 4: city residential only
    if (rentalComparables.length < 3) {
      rentalComparables = cityRentalListings.filter((row) => {
        const rowType = (row.unitType || "").toUpperCase();
        if (isResidential && COMMERCIAL_TYPES.has(rowType)) return false;
        if (!rowType) return false;
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0 && Math.abs(rowArea - propArea) / propArea > 0.5) return false;
        }
        return true;
      });
    }

    // Calculate median R$/m² from sale comparables
    const salePricesPerM2 = saleComparables
      .map((r) => {
        const pm2 = parseFloat(r.pricePerM2 || "0");
        return pm2 > 0 ? pm2 : null;
      })
      .filter((v): v is number => v !== null);

    const medianSalePricePerM2 = median(salePricesPerM2);

    // Calculate median rent from rental comparables
    const rentalPrices = rentalComparables
      .map((r) => parseFloat(r.price || "0"))
      .filter((v) => v > 0);

    const medianRent = median(rentalPrices);

    const qaMarketValue =
      medianSalePricePerM2 !== null && propArea ? medianSalePricePerM2 * propArea : null;

    await db
      .update(properties)
      .set({
        qaMarketValue: qaMarketValue !== null ? qaMarketValue.toFixed(2) : null,
        qaRentValue: medianRent !== null ? medianRent.toFixed(2) : null,
        qaComparablesCount: saleComparables.length > 0 ? saleComparables.length : null,
        qaUpdatedAt: now,
        updatedAt: now,
      })
      .where(eq(properties.id, prop.id));

    updated++;
  }

  return { updated };
}
