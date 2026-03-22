import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, sql } from "drizzle-orm";

export interface ScoreBreakdown {
  discount: number;        // 0-100, weight 25%
  priceEfficiency: number; // 0-100, weight 20%
  financing: number;       // 0-100, weight 15%
  propertyType: number;    // 0-100, weight 10%
  areaValue: number;       // 0-100, weight 15%
  daysOnMarket: number;    // 0-100, weight 5%
  crimeSafety: number;     // 0-100, weight 10%
  total: number;           // weighted sum 0-100
}

// Extract numeric area from description strings like:
// "Casa, 0.00 de área total, 146.57 de área privativa, 285.20 de área do terreno"
export function parseAreaFromDescricao(descricao: string | null): number | null {
  if (!descricao) return null;

  // Try área privativa first
  const privativaMatch = descricao.match(/(\d+(?:[.,]\d+)?)\s*de\s*área\s*privativa/i);
  if (privativaMatch) {
    const val = parseFloat(privativaMatch[1].replace(",", "."));
    if (val > 0) return val;
  }

  // Fall back to área total
  const totalMatch = descricao.match(/(\d+(?:[.,]\d+)?)\s*de\s*área\s*total/i);
  if (totalMatch) {
    const val = parseFloat(totalMatch[1].replace(",", "."));
    if (val > 0) return val;
  }

  return null;
}

// Extract property type from first word of descricao (before comma)
function parsePropertyType(descricao: string | null, tipoImovel: string | null): string {
  if (tipoImovel) return tipoImovel.toLowerCase();
  if (!descricao) return "other";
  const firstWord = descricao.split(",")[0].trim().toLowerCase();
  return firstWord;
}

function scorePropertyType(type: string): number {
  const t = type.toLowerCase();
  if (t.includes("apartamento") || t === "ap") return 100;
  if (t.includes("casa")) return 75;
  if (t.includes("comercial") || t.includes("loja") || t.includes("sala")) return 50;
  if (t.includes("terreno") || t.includes("lote")) return 40;
  return 30;
}

interface CityStats {
  avgPrice: number;
  avgPricePerM2: number;
}

function scoreCrimeSafety(crimeRate: string | null): number {
  if (!crimeRate) return 50; // neutral when no data
  const rate = parseFloat(crimeRate);
  if (rate < 500) return 100;
  if (rate < 1000) return 80;
  if (rate < 2000) return 60;
  if (rate < 5000) return 40;
  if (rate < 10000) return 20;
  return 0;
}

export function computeScoreBreakdown(
  property: {
    desconto: string | null;
    preco: string | null;
    aceitaFinanciamento: boolean | null;
    descricao: string | null;
    tipoImovel: string | null;
    firstSeenAt: Date;
    areaTotalM2: string | null;
    areaPrivativaM2: string | null;
    crimeRate: string | null;
  },
  cityStats: CityStats
): ScoreBreakdown {
  // 1. Discount score (25%)
  const discountPct = parseFloat(property.desconto ?? "0") || 0;
  const discountScore = Math.min(100, (discountPct / 60) * 100);

  // 2. Price efficiency (20%)
  const preco = parseFloat(property.preco ?? "0") || 0;
  let priceEfficiencyScore = 50; // neutral default
  if (preco > 0 && cityStats.avgPrice > 0) {
    priceEfficiencyScore = Math.max(0, Math.min(100, (1 - preco / cityStats.avgPrice) * 100 + 50));
  }

  // 3. Financing (15%)
  const financingScore = property.aceitaFinanciamento ? 100 : 0;

  // 4. Property type (10%)
  const typeStr = parsePropertyType(property.descricao, property.tipoImovel);
  const propertyTypeScore = scorePropertyType(typeStr);

  // 5. Area value (15%)
  // Prefer DB columns (areaPrivativaM2 / areaTotalM2), fall back to parsing descricao
  let areaParsed: number | null = null;
  const areaPrivativaDb = parseFloat(property.areaPrivativaM2 ?? "0") || 0;
  const areaTotalDb = parseFloat(property.areaTotalM2 ?? "0") || 0;
  if (areaPrivativaDb > 0) {
    areaParsed = areaPrivativaDb;
  } else if (areaTotalDb > 0) {
    areaParsed = areaTotalDb;
  } else {
    areaParsed = parseAreaFromDescricao(property.descricao);
  }

  let areaValueScore = 50; // neutral when no area data
  if (areaParsed && areaParsed > 0 && preco > 0 && cityStats.avgPricePerM2 > 0) {
    const pricePerM2 = preco / areaParsed;
    areaValueScore = Math.max(0, Math.min(100, (1 - pricePerM2 / cityStats.avgPricePerM2) * 100 + 50));
  }

  // 6. Days on market (5%)
  const daysSinceFirstSeen = (Date.now() - property.firstSeenAt.getTime()) / (1000 * 60 * 60 * 24);
  const daysOnMarketScore = Math.min(100, (daysSinceFirstSeen / 90) * 100);

  // 7. Crime safety (10%)
  const crimeSafetyScore = scoreCrimeSafety(property.crimeRate);

  // Weighted total
  const total =
    discountScore * 0.25 +
    priceEfficiencyScore * 0.20 +
    financingScore * 0.15 +
    propertyTypeScore * 0.10 +
    areaValueScore * 0.15 +
    daysOnMarketScore * 0.05 +
    crimeSafetyScore * 0.10;

  return {
    discount: Math.round(discountScore * 100) / 100,
    priceEfficiency: Math.round(priceEfficiencyScore * 100) / 100,
    financing: financingScore,
    propertyType: propertyTypeScore,
    areaValue: Math.round(areaValueScore * 100) / 100,
    daysOnMarket: Math.round(daysOnMarketScore * 100) / 100,
    crimeSafety: crimeSafetyScore,
    total: Math.round(total * 100) / 100,
  };
}

export async function calculateScores(): Promise<{ scored: number; avgScore: number }> {
  // Fetch all active properties
  const rows = await db
    .select()
    .from(properties)
    .where(isNull(properties.removedAt));

  if (rows.length === 0) {
    return { scored: 0, avgScore: 0 };
  }

  // Compute city averages (avg price and avg price/m2)
  const cityMap = new Map<string, { prices: number[]; pricesPerM2: number[] }>();

  for (const row of rows) {
    const cidade = row.cidade;
    const preco = parseFloat(row.preco ?? "0") || 0;
    if (!cityMap.has(cidade)) {
      cityMap.set(cidade, { prices: [], pricesPerM2: [] });
    }
    const entry = cityMap.get(cidade)!;
    if (preco > 0) {
      entry.prices.push(preco);

      // Determine area for price/m2
      const areaPrivativaDb = parseFloat(row.areaPrivativaM2 ?? "0") || 0;
      const areaTotalDb = parseFloat(row.areaTotalM2 ?? "0") || 0;
      let area = areaPrivativaDb > 0 ? areaPrivativaDb : areaTotalDb > 0 ? areaTotalDb : null;
      if (!area) {
        area = parseAreaFromDescricao(row.descricao);
      }
      if (area && area > 0) {
        entry.pricesPerM2.push(preco / area);
      }
    }
  }

  const cityStats = new Map<string, CityStats>();
  for (const [cidade, data] of cityMap) {
    const avgPrice =
      data.prices.length > 0
        ? data.prices.reduce((a, b) => a + b, 0) / data.prices.length
        : 0;
    const avgPricePerM2 =
      data.pricesPerM2.length > 0
        ? data.pricesPerM2.reduce((a, b) => a + b, 0) / data.pricesPerM2.length
        : 0;
    cityStats.set(cidade, { avgPrice, avgPricePerM2 });
  }

  // Calculate and batch-update scores
  let totalScore = 0;
  const updates: Array<{ id: number; score: number; details: ScoreBreakdown }> = [];

  for (const row of rows) {
    const stats = cityStats.get(row.cidade) ?? { avgPrice: 0, avgPricePerM2: 0 };
    const breakdown = computeScoreBreakdown(
      {
        desconto: row.desconto,
        preco: row.preco,
        aceitaFinanciamento: row.aceitaFinanciamento,
        descricao: row.descricao,
        tipoImovel: row.tipoImovel,
        firstSeenAt: row.firstSeenAt,
        areaTotalM2: row.areaTotalM2,
        areaPrivativaM2: row.areaPrivativaM2,
        crimeRate: row.crimeRate,
      },
      stats
    );

    updates.push({ id: row.id, score: breakdown.total, details: breakdown });
    totalScore += breakdown.total;
  }

  // Update in batches of 500 using individual updates in a transaction
  const BATCH_SIZE = 500;
  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    await db.transaction(async (tx) => {
      for (const u of batch) {
        await tx
          .update(properties)
          .set({
            score: String(u.score),
            scoreDetails: u.details,
            updatedAt: new Date(),
          })
          .where(sql`${properties.id} = ${u.id}`);
      }
    });
  }

  const avgScore = updates.length > 0 ? Math.round((totalScore / updates.length) * 100) / 100 : 0;
  return { scored: updates.length, avgScore };
}
