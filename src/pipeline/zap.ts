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

/**
 * Remove price outliers — catches Caixa repossession resale ads.
 * Two-pass filter:
 * 1. IQR method: remove listings below Q1 - 1.5*IQR
 * 2. Median check: remove listings below 50% of the median R$/m²
 * Bank resellers (Mater Imóveis, Antonio Brasil, etc.) list Caixa properties
 * at 30-50% of market value, contaminating comparables.
 */
function removeOutliers<T>(listings: T[], getPricePerM2: (item: T) => number): T[] {
  if (listings.length < 4) return listings; // too few to detect outliers
  const prices = listings.map(getPricePerM2).filter((p) => p > 0).sort((a, b) => a - b);
  if (prices.length < 4) return listings;

  // IQR filter
  const q1 = prices[Math.floor(prices.length * 0.25)];
  const q3 = prices[Math.floor(prices.length * 0.75)];
  const iqr = q3 - q1;
  const iqrLowerBound = q1 - 1.5 * iqr;

  // Median-based filter: anything below 50% of median is suspicious
  const mid = Math.floor(prices.length / 2);
  const medianVal = prices.length % 2 === 0 ? (prices[mid - 1] + prices[mid]) / 2 : prices[mid];
  const medianLowerBound = medianVal * 0.5;

  // Use the more aggressive of the two bounds
  const lowerBound = Math.max(iqrLowerBound, medianLowerBound);

  return listings.filter((item) => getPricePerM2(item) >= lowerBound);
}

// Normalize a name for comparison: strip accents and uppercase
function normalizeName(name: string): string {
  return name
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Keep backward-compatible alias
function normalizeCidade(name: string): string {
  return normalizeName(name);
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

// APT group: all apartment-like residential types in ZAP
const APT_TYPES = new Set(["APARTAMENTO", "COBERTURA", "KITNET", "FLAT", "LOFT", "STUDIO"]);
// CASA group: house-like residential types in ZAP
const CASA_TYPES = new Set(["CASA", "SOBRADO", "CHALET"]);
// Commercial types — always EXCLUDED from residential comparables
const COMMERCIAL_TYPES = new Set(["SALA", "LOJA", "LOTE", "TERRENO", "GALPAO", "PREDIO", "PONTO COMERCIAL"]);

// Derive allowed ZAP unit types from a Caixa property's tipoImovel field.
// Returns an array of allowed ZAP unit_type values, or null if unknown (skip property).
function getZapUnitTypes(tipoImovel: string | null, _descricao: string | null): string[] | null {
  const src = normalizeName(tipoImovel || "");
  // APT group
  if (src === "APARTAMENTO" || src === "COBERTURA" || src === "KITNET" ||
      src === "FLAT" || src === "LOFT" || src === "STUDIO") {
    return Array.from(APT_TYPES);
  }
  // CASA group — includes Sobrado (which is a house variant)
  if (src === "CASA" || src === "SOBRADO" || src === "CHALET") {
    return Array.from(CASA_TYPES);
  }
  // Commercial / land types — we still record their mapping so scoring can use it,
  // but they are excluded from residential comparables at a higher level.
  if (src === "TERRENO" || src === "LOTE" || src === "GLEBA" ||
      src === "GLEBA URBANA" || src === "IMOVEL RURAL") {
    return ["LOTE", "TERRENO"];
  }
  if (src === "SALA" || src === "LOJA" || src === "COMERCIAL" ||
      src === "GALPAO" || src === "PREDIO" || src === "GALPAO" ||
      src === "PONTO COMERCIAL") {
    return ["SALA", "LOJA", "GALPAO", "PREDIO"];
  }
  // Unknown type — return null so caller can skip or handle gracefully
  return null;
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
      quartos: properties.quartos,
      preco: properties.preco,
      areaPrivativaM2: properties.areaPrivativaM2,
      areaTotalM2: properties.areaTotalM2,
      dataQualityFlag: properties.dataQualityFlag,
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

    // Skip ZAP calculation for properties with suspicious area — area is unreliable
    if (prop.dataQualityFlag === "suspicious_area") {
      continue;
    }

    const zapTypes = getZapUnitTypes(prop.tipoImovel, prop.descricao);
    // Skip if we can't determine the type — prevents cross-type contamination
    if (zapTypes === null) continue;

    // Normalize bairro: strip accents + uppercase so it matches ZAP listings which may have accents
    const bairroKey = normalizeName(prop.bairro || "");

    const propQuartos = prop.quartos;
    const isResidential = !zapTypes.some(t => COMMERCIAL_TYPES.has(t));

    // Helper to filter ZAP listings for this property
    function filterListings(listings: ZapRow[], strict = false): ZapRow[] {
      return listings.filter((row) => {
        const rowType = (row.unitType || "").toUpperCase();
        // Always exclude commercial types for residential properties
        if (isResidential && COMMERCIAL_TYPES.has(rowType)) return false;
        // Exclude null-type listings
        if (!rowType) return false;
        // Type filter
        if (zapTypes && !zapTypes.includes(rowType)) return false;
        // Area filter: ±50% if we have area
        if (propArea && row.area) {
          const rowArea = parseFloat(row.area);
          if (rowArea > 0) {
            const ratio = Math.abs(rowArea - propArea) / propArea;
            if (ratio > (strict ? 0.3 : 0.5)) return false;
          }
        }
        // Bedrooms filter: ±1
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
      ? citySaleListings.filter((r) => normalizeName(r.bairro || "") === bairroKey)
      : [];
    const bairroRentalListings = bairroKey
      ? cityRentalListings.filter((r) => normalizeName(r.bairro || "") === bairroKey)
      : [];

    // Step 1: bairro + type + area + bedrooms (strict)
    let saleComparables = filterListings(bairroSaleListings, true);
    // Step 2: bairro + type + area (relaxed, no bedrooms filter)
    if (saleComparables.length < 3) saleComparables = filterListings(bairroSaleListings);
    // NO city-wide fallback for sale — different bairro = different price
    // If no bairro match, no ZAP sale value (better no value than wrong value)

    // Remove outliers (Caixa repossession resale ads with artificially low prices)
    saleComparables = removeOutliers(saleComparables, (r) => parseFloat(r.pricePerM2 || "0"));

    // Rental: same — bairro only
    let rentalComparables = filterListings(bairroRentalListings, true);
    if (rentalComparables.length < 3) rentalComparables = filterListings(bairroRentalListings);

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
  // Normalize bairro: strip accents + uppercase to match ZAP listings which may have accents
  const bairroKey = normalizeName(prop.bairro || "");
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

  const isResProp = !zapTypes || !zapTypes.some(t => COMMERCIAL_TYPES.has(t));

  function matchesStrict(r: ZapRow): boolean {
    const rowType = (r.unitType || "").toUpperCase();
    // Exclude commercial for residential
    if (isResProp && COMMERCIAL_TYPES.has(rowType)) return false;
    if (!rowType) return false;
    // Type filter: must be in same type group
    if (zapTypes && !zapTypes.includes(rowType)) return false;
    // Area ±30%
    if (propArea && r.area) {
      const a = parseFloat(r.area);
      if (a > 0 && Math.abs(a - propArea) / propArea > 0.3) return false;
    }
    // Bedrooms ±1
    if (propQuartos !== null && r.bedrooms !== null) {
      if (Math.abs(r.bedrooms - propQuartos) > 1) return false;
    }
    // Bairro match (accent-normalized)
    if (bairroKey && r.bairro) {
      const rBairro = normalizeName(r.bairro);
      if (rBairro !== bairroKey) return false;
    }
    return true;
  }

  function matchesFallback(r: ZapRow): boolean {
    const rowType = (r.unitType || "").toUpperCase();
    // Exclude commercial for residential
    if (isResProp && COMMERCIAL_TYPES.has(rowType)) return false;
    if (!rowType) return false;
    // Type is mandatory in fallback — must be same group
    if (zapTypes && !zapTypes.includes(rowType)) return false;
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

  // Bairro-only — no city-wide fallback (different bairro = different rent)
  let matched = cityRental.filter(matchesStrict);
  if (matched.length < 3) {
    // Relaxed bairro match (same bairro accent-normalized, relaxed area/bedrooms)
    matched = cityRental.filter(matchesFallback).filter(r => {
      if (bairroKey && r.bairro) {
        return normalizeName(r.bairro) === bairroKey;
      }
      return false;
    });
  }
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
  // Normalize bairro: strip accents + uppercase to match ZAP listings which may have accents
  const bairroKey = normalizeName(prop.bairro || "");
  const propArea =
    prop.areaPrivativaM2 && parseFloat(prop.areaPrivativaM2) > 0
      ? parseFloat(prop.areaPrivativaM2)
      : prop.areaTotalM2 && parseFloat(prop.areaTotalM2) > 0
        ? parseFloat(prop.areaTotalM2)
        : null;

  const zapTypes = getZapUnitTypes(prop.tipoImovel, prop.descricao);
  const isResidentialProp = !zapTypes || !zapTypes.some(t => COMMERCIAL_TYPES.has(t));

  type ZapRow = typeof zapListings.$inferSelect;

  function filterRows(rows: ZapRow[]): ZapRow[] {
    return rows.filter((r) => {
      const rowType = (r.unitType || "").toUpperCase();
      // Exclude commercial for residential properties
      if (isResidentialProp && COMMERCIAL_TYPES.has(rowType)) return false;
      if (!rowType) return false;
      // Type filter: must be in same type group
      if (zapTypes && !zapTypes.includes(rowType)) return false;
      // Area filter
      if (propArea && r.area) {
        const a = parseFloat(r.area);
        if (a > 0 && Math.abs(a - propArea) / propArea > 0.5) return false;
      }
      return true;
    });
  }

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

  // Normalize bairro on ZAP side too (ZAP has accented bairros, properties may not)
  const bairroSale = bairroKey
    ? citySale.filter((r) => normalizeName(r.bairro || "") === bairroKey)
    : [];
  const bairroRental = bairroKey
    ? cityRental.filter((r) => normalizeName(r.bairro || "") === bairroKey)
    : [];

  // Bairro-only matching — no city-wide fallback (different bairro = different price)
  let saleComps = filterRows(bairroSale);
  // Remove outliers (Caixa repossession resale ads with artificially low prices)
  saleComps = removeOutliers(saleComps, (r) => parseFloat(r.pricePerM2 || "0"));

  let rentalComps = filterRows(bairroRental);

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
