import { readFileSync } from "fs";
import { db } from "@/lib/db";
import { zapListings, properties } from "@/lib/db/schema";
import { eq, and, ilike, sql, isNull } from "drizzle-orm";

interface ZapListing {
  zapId: string;
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

export async function importZapData(
  jsonPath: string
): Promise<{ imported: number; skipped: number; errors: string[] }> {
  let raw: string;
  try {
    raw = readFileSync(jsonPath, "utf-8");
  } catch (err) {
    throw new Error(
      `Cannot read ZAP data file at ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  let listings: ZapListing[];
  try {
    listings = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${jsonPath}: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!Array.isArray(listings)) {
    throw new Error("ZAP data file must contain a JSON array");
  }

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const listing of listings) {
    try {
      // Check if already exists by zapId + business
      if (listing.zapId) {
        const existing = await db
          .select({ id: zapListings.id })
          .from(zapListings)
          .where(
            and(
              eq(zapListings.zapId, listing.zapId),
              eq(zapListings.business, listing.business)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          skipped++;
          continue;
        }
      }

      await db.insert(zapListings).values({
        zapId: listing.zapId || null,
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
      });

      imported++;
    } catch (err) {
      errors.push(
        `Insert error for zapId=${listing.zapId}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return { imported, skipped, errors };
}

// Map Caixa property types to ZAP unit types (Portuguese — matching DB values)
const CAIXA_TO_ZAP_TYPES: Record<string, string[]> = {
  apartamento: ["APARTAMENTO", "COBERTURA", "KITNET"],
  casa: ["CASA", "SOBRADO"],
  terreno: ["LOTE", "TERRENO"],
  lote: ["LOTE", "TERRENO"],
  comercial: ["SALA", "LOJA"],
  loja: ["LOJA", "SALA"],
};

// Commercial types to EXCLUDE from residential comparables
const COMMERCIAL_TYPES = new Set(["SALA", "LOJA", "LOTE", "TERRENO"]);

function getZapUnitTypes(tipoImovel: string | null, descricao: string | null): string[] | null {
  const src = (tipoImovel || descricao || "").toLowerCase();
  for (const [key, types] of Object.entries(CAIXA_TO_ZAP_TYPES)) {
    if (src.includes(key)) return types;
  }
  return null; // null means no type filter (use all)
}

export async function calculateZapMarketValues(): Promise<{ updated: number }> {
  // Fetch all active properties
  const allProperties = await db
    .select({
      id: properties.id,
      cidade: properties.cidade,
      bairro: properties.bairro,
      tipoImovel: properties.tipoImovel,
      descricao: properties.descricao,
      areaPrivativaM2: properties.areaPrivativaM2,
      areaTotalM2: properties.areaTotalM2,
    })
    .from(properties)
    .where(isNull(properties.removedAt));

  if (allProperties.length === 0) {
    return { updated: 0 };
  }

  // Load all ZAP SALE listings in memory, grouped by normalized cidade
  const allSaleListings = await db
    .select()
    .from(zapListings)
    .where(eq(zapListings.business, "SALE"));

  const allRentalListings = await db
    .select()
    .from(zapListings)
    .where(eq(zapListings.business, "RENTAL"));

  // Group by normalized cidade for fast lookup
  type ZapRow = (typeof allSaleListings)[0];
  const saleByCity = new Map<string, ZapRow[]>();
  for (const row of allSaleListings) {
    const key = normalizeCidade(row.cidade || "");
    if (!saleByCity.has(key)) saleByCity.set(key, []);
    saleByCity.get(key)!.push(row);
  }

  const rentalByCity = new Map<string, ZapRow[]>();
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

    const zapTypes = getZapUnitTypes(prop.tipoImovel, prop.descricao);
    const bairroKey = (prop.bairro || "").toUpperCase().trim();

    // Helper to filter ZAP listings for this property
    function filterListings(listings: ZapRow[]): ZapRow[] {
      return listings.filter((row) => {
        // Type filter
        if (zapTypes && row.unitType && !zapTypes.includes(row.unitType.toUpperCase())) {
          return false;
        }
        // Area filter: ±50% if we have area
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0) {
            const ratio = Math.abs(rowArea - propArea) / propArea;
            if (ratio > 0.5) return false;
          }
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

    let saleComparables = filterListings(bairroSaleListings);
    // Fall back to city-wide with type filter
    if (saleComparables.length < 3) {
      saleComparables = filterListings(citySaleListings);
    }
    // Last resort: city-wide without type filter (just area if available)
    if (saleComparables.length < 3) {
      saleComparables = citySaleListings.filter((row) => {
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0 && Math.abs(rowArea - propArea) / propArea > 0.5) return false;
        }
        return true;
      });
    }
    // Absolute fallback: all city listings (median R$/m² for the whole city)
    if (saleComparables.length < 3) {
      saleComparables = citySaleListings;
    }

    let rentalComparables = filterListings(bairroRentalListings);
    if (rentalComparables.length < 3) {
      rentalComparables = filterListings(cityRentalListings);
    }
    if (rentalComparables.length < 3) {
      rentalComparables = cityRentalListings;
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

    const zapMarketValue =
      medianSalePricePerM2 !== null && propArea ? medianSalePricePerM2 * propArea : null;

    await db
      .update(properties)
      .set({
        zapMarketValue: zapMarketValue !== null ? zapMarketValue.toFixed(2) : null,
        zapMarketValuePerM2: medianSalePricePerM2 !== null ? medianSalePricePerM2.toFixed(2) : null,
        zapRentValue: medianRent !== null ? medianRent.toFixed(2) : null,
        zapComparablesCount: saleComparables.length > 0 ? saleComparables.length : null,
        zapUpdatedAt: now,
        updatedAt: now,
      })
      .where(eq(properties.id, prop.id));

    updated++;
  }

  return { updated };
}

export interface ZapRentalComparable {
  zapId: string | null;
  bairro: string | null;
  unitType: string | null;
  price: number;
  area: number;
  pricePerM2: number;
  bedrooms: number | null;
  listingUrl: string | null;
}

export async function getZapRentalComparables(propertyId: number, _months: number = 12): Promise<{
  comparables: ZapRentalComparable[];
  medianRent: number;
  count: number;
}> {
  const [prop] = await db
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
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return { comparables: [], medianRent: 0, count: 0 };

  const cityKey = normalizeCidade(prop.cidade);
  const bairroKey = (prop.bairro || "").toUpperCase().trim();
  const propArea =
    prop.areaPrivativaM2 && parseFloat(prop.areaPrivativaM2) > 0
      ? parseFloat(prop.areaPrivativaM2)
      : prop.areaTotalM2 && parseFloat(prop.areaTotalM2) > 0
        ? parseFloat(prop.areaTotalM2)
        : null;
  const propQuartos = prop.quartos ?? null;
  const zapTypes = getZapUnitTypes(prop.tipoImovel, prop.descricao);

  type ZapRow = typeof zapListings.$inferSelect;

  const cityRental = await db
    .select()
    .from(zapListings)
    .where(
      and(
        eq(zapListings.business, "RENTAL"),
        sql`upper(${zapListings.cidade}) = ${cityKey}`
      )
    );

  function matchesStrict(r: ZapRow): boolean {
    // Type filter
    if (zapTypes && r.unitType && !zapTypes.includes(r.unitType.toUpperCase())) return false;
    // Area ±30%
    if (propArea && r.area) {
      const a = parseFloat(r.area);
      if (a > 0 && Math.abs(a - propArea) / propArea > 0.3) return false;
    }
    // Bedrooms ±1
    if (propQuartos !== null && r.bedrooms !== null) {
      if (Math.abs(r.bedrooms - propQuartos) > 1) return false;
    }
    // Bairro ilike match
    if (bairroKey && r.bairro) {
      if (!r.bairro.toUpperCase().includes(bairroKey) && !bairroKey.includes(r.bairro.toUpperCase())) return false;
    }
    return true;
  }

  function matchesFallback(r: ZapRow): boolean {
    // Same city, no bairro filter but MUST match type and area
    // Type is mandatory in fallback
    if (zapTypes && r.unitType && !zapTypes.includes(r.unitType.toUpperCase())) return false;
    if (!zapTypes && r.unitType) return false; // skip if we can't determine type
    // Area ±50% (relaxed from strict's ±30%)
    if (propArea && r.area) {
      const a = parseFloat(r.area);
      if (a > 0 && Math.abs(a - propArea) / propArea > 0.5) return false;
    }
    // If we have area, the listing must also have area
    if (propArea && (!r.area || parseFloat(r.area) <= 0)) return false;
    // Bedrooms ±1
    if (propQuartos !== null && r.bedrooms !== null) {
      if (Math.abs(r.bedrooms - propQuartos) > 1) return false;
    }
    return true;
  }

  let matched = cityRental.filter(matchesStrict);
  if (matched.length < 3) {
    // Fallback: same city, same type, relaxed area — but NOT random listings
    matched = cityRental.filter(matchesFallback);
  }
  // Never return more than 15
  matched = matched.slice(0, 15);

  const prices = matched.map((r) => parseFloat(r.price || "0")).filter((v) => v > 0);
  const med = median(prices) ?? 0;

  function toRentalComparable(r: ZapRow): ZapRentalComparable {
    return {
      zapId: r.zapId,
      bairro: r.bairro,
      unitType: r.unitType,
      price: parseFloat(r.price || "0"),
      area: parseFloat(r.area || "0"),
      pricePerM2: parseFloat(r.pricePerM2 || "0"),
      bedrooms: r.bedrooms,
      listingUrl: r.listingUrl,
    };
  }

  return {
    comparables: matched.slice(0, 10).map(toRentalComparable),
    medianRent: Math.round(med),
    count: matched.length,
  };
}

export interface ZapComparable {
  zapId: string | null;
  business: string | null;
  cidade: string | null;
  bairro: string | null;
  unitType: string | null;
  price: number;
  area: number;
  pricePerM2: number;
  bedrooms: number | null;
  parkingSpaces: number | null;
  listingUrl: string | null;
  condoFee: number | null;
}

export async function getZapComparables(propertyId: number, _months: number = 12): Promise<{
  saleComparables: ZapComparable[];
  rentalComparables: ZapComparable[];
  medianSalePricePerM2: number | null;
  medianRent: number | null;
  zapMarketValue: number | null;
  zapRentValue: number | null;
} | null> {
  const [prop] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return null;

  const cityKey = normalizeCidade(prop.cidade);
  const bairroKey = (prop.bairro || "").toUpperCase().trim();
  const propArea =
    prop.areaPrivativaM2 && parseFloat(prop.areaPrivativaM2) > 0
      ? parseFloat(prop.areaPrivativaM2)
      : prop.areaTotalM2 && parseFloat(prop.areaTotalM2) > 0
        ? parseFloat(prop.areaTotalM2)
        : null;

  const zapTypes = getZapUnitTypes(prop.tipoImovel, prop.descricao);

  function filterRows(rows: ZapRow[]): ZapRow[] {
    return rows.filter((r) => {
      if (zapTypes && r.unitType && !zapTypes.includes(r.unitType.toUpperCase())) return false;
      if (propArea && r.area) {
        const a = parseFloat(r.area);
        if (a > 0 && Math.abs(a - propArea) / propArea > 0.5) return false;
      }
      return true;
    });
  }

  type ZapRow = typeof zapListings.$inferSelect;

  // Query city sale + rental listings
  const [citySale, cityRental] = await Promise.all([
    db
      .select()
      .from(zapListings)
      .where(
        and(
          eq(zapListings.business, "SALE"),
          sql`upper(${zapListings.cidade}) = ${cityKey}`
        )
      ),
    db
      .select()
      .from(zapListings)
      .where(
        and(
          eq(zapListings.business, "RENTAL"),
          sql`upper(${zapListings.cidade}) = ${cityKey}`
        )
      ),
  ]);

  const bairroSale = bairroKey
    ? citySale.filter((r) => (r.bairro || "").toUpperCase().trim() === bairroKey)
    : [];
  const bairroRental = bairroKey
    ? cityRental.filter((r) => (r.bairro || "").toUpperCase().trim() === bairroKey)
    : [];

  let saleComps = filterRows(bairroSale);
  if (saleComps.length < 3) saleComps = filterRows(citySale);
  // Fallback: city-wide without type filter (area only)
  if (saleComps.length < 3) {
    saleComps = citySale.filter((r) => {
      if (propArea && r.area) {
        const a = parseFloat(r.area);
        if (a > 0 && Math.abs(a - propArea) / propArea > 0.5) return false;
      }
      return true;
    });
  }
  // Absolute fallback: all city sale listings
  if (saleComps.length < 3) saleComps = citySale;

  let rentalComps = filterRows(bairroRental);
  if (rentalComps.length < 3) rentalComps = filterRows(cityRental);
  if (rentalComps.length < 3) rentalComps = cityRental;

  const salePm2 = saleComps.map((r) => parseFloat(r.pricePerM2 || "0")).filter((v) => v > 0);
  const rentalPrices = rentalComps.map((r) => parseFloat(r.price || "0")).filter((v) => v > 0);

  const medianSalePricePerM2 = median(salePm2);
  const medianRent = median(rentalPrices);
  const zapMarketValue = medianSalePricePerM2 && propArea ? medianSalePricePerM2 * propArea : null;

  function toComparable(r: ZapRow): ZapComparable {
    return {
      zapId: r.zapId,
      business: r.business,
      cidade: r.cidade,
      bairro: r.bairro,
      unitType: r.unitType,
      price: parseFloat(r.price || "0"),
      area: parseFloat(r.area || "0"),
      pricePerM2: parseFloat(r.pricePerM2 || "0"),
      bedrooms: r.bedrooms,
      parkingSpaces: r.parkingSpaces,
      listingUrl: r.listingUrl,
      condoFee: r.condoFee ? parseFloat(r.condoFee) : null,
    };
  }

  return {
    saleComparables: saleComps.map(toComparable),
    rentalComparables: rentalComps.map(toComparable),
    medianSalePricePerM2: medianSalePricePerM2 ? Math.round(medianSalePricePerM2) : null,
    medianRent: medianRent ? Math.round(medianRent) : null,
    zapMarketValue: zapMarketValue ? Math.round(zapMarketValue) : null,
    zapRentValue: medianRent ? Math.round(medianRent) : null,
  };
}
