import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

const PIPELINE_TOKEN = "caixa-pipeline-2026-rs-secret";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${PIPELINE_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalActive,
      totalWithScore,
      totalWithCrimeRate,
      totalWithMarketValue,
      totalGeolocated,
      totalITBI,
      duplicateCaixaIds,
      invalidDiscounts,
      invalidPrices,
      scoreRange,
      crimeRateRange,
      lastPipelineRun,
      geocodeBounds,
      poaProperties,
      avaliacaoVsPrecoCheck,
      scoreBreakdownCheck,
      marketValueNonPoa,
      marketValueComparables,
    ] = await Promise.all([
      // totalActive
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE removed_at IS NULL`
      ),
      // totalWithScore
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE score IS NOT NULL AND removed_at IS NULL`
      ),
      // totalWithCrimeRate
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE crime_rate IS NOT NULL AND removed_at IS NULL`
      ),
      // totalWithMarketValue
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE market_value IS NOT NULL AND removed_at IS NULL`
      ),
      // totalGeolocated
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE lat IS NOT NULL AND removed_at IS NULL`
      ),
      // totalITBI
      db.execute(sql`SELECT COUNT(*) AS count FROM itbi_transactions`),
      // duplicateCaixaIds
      db.execute(
        sql`SELECT caixa_id, COUNT(*) AS cnt FROM properties GROUP BY caixa_id HAVING COUNT(*) > 1`
      ),
      // invalidDiscounts
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE removed_at IS NULL AND (desconto::numeric < 0 OR desconto::numeric > 100)`
      ),
      // invalidPrices
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE removed_at IS NULL AND (preco::numeric <= 0 OR preco::numeric > 50000000)`
      ),
      // scoreRange
      db.execute(
        sql`SELECT MIN(score::numeric) AS min, MAX(score::numeric) AS max, ROUND(AVG(score::numeric),2) AS avg FROM properties WHERE score IS NOT NULL AND removed_at IS NULL`
      ),
      // crimeRateRange
      db.execute(
        sql`SELECT MIN(crime_rate::numeric) AS min, MAX(crime_rate::numeric) AS max, ROUND(AVG(crime_rate::numeric),2) AS avg FROM properties WHERE crime_rate IS NOT NULL AND removed_at IS NULL`
      ),
      // lastPipelineRun
      db.execute(
        sql`SELECT started_at, status, properties_total FROM pipeline_runs ORDER BY started_at DESC LIMIT 1`
      ),
      // geocodeBounds
      db.execute(
        sql`SELECT MIN(lat::numeric) AS min_lat, MAX(lat::numeric) AS max_lat, MIN(lng::numeric) AS min_lng, MAX(lng::numeric) AS max_lng FROM properties WHERE lat IS NOT NULL AND removed_at IS NULL`
      ),
      // poaProperties (avg lat/lng + crime rate sample)
      db.execute(
        sql`SELECT ROUND(AVG(lat::numeric)::numeric,6) AS avg_lat, ROUND(AVG(lng::numeric)::numeric,6) AS avg_lng, MIN(crime_rate::numeric) AS min_crime, MAX(crime_rate::numeric) AS max_crime FROM properties WHERE cidade = 'PORTO ALEGRE' AND removed_at IS NULL AND lat IS NOT NULL`
      ),
      // valorAvaliacao >= preco check (allow 5% tolerance)
      db.execute(
        sql`SELECT COUNT(*) AS total, SUM(CASE WHEN valor_avaliacao::numeric >= preco::numeric * 0.95 THEN 1 ELSE 0 END) AS compliant FROM properties WHERE removed_at IS NULL AND valor_avaliacao IS NOT NULL AND preco IS NOT NULL`
      ),
      // score_details weighted sum vs score (sample of 10)
      db.execute(
        sql`SELECT caixa_id, score::numeric AS score, score_details FROM properties WHERE score IS NOT NULL AND score_details IS NOT NULL AND removed_at IS NULL ORDER BY RANDOM() LIMIT 10`
      ),
      // marketValue only for POA check
      db.execute(
        sql`SELECT COUNT(*) AS count FROM properties WHERE market_value IS NOT NULL AND removed_at IS NULL AND cidade != 'PORTO ALEGRE'`
      ),
      // comparables consistency
      db.execute(
        sql`SELECT COUNT(*) AS total, SUM(CASE WHEN comparables_count IS NOT NULL AND comparables_count > 0 THEN 1 ELSE 0 END) AS with_comparables FROM properties WHERE market_value IS NOT NULL AND removed_at IS NULL`
      ),
    ]);

    // ITBI median R$/m² for POA
    let poaMedianPricePerM2: number | null = null;
    try {
      const itbiMedian = await db.execute(
        sql`SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY base_calculo::numeric / NULLIF(area_constr_privativa::numeric, 0)) AS median_per_m2 FROM itbi_transactions WHERE area_constr_privativa::numeric > 0 AND bairro IS NOT NULL`
      );
      const row = (itbiMedian as unknown as Array<{ median_per_m2: string | null }>)[0];
      poaMedianPricePerM2 = row?.median_per_m2 ? parseFloat(row.median_per_m2) : null;
    } catch {
      poaMedianPricePerM2 = null;
    }

    // Discount group averages for monotonicity check
    let discountGroups: Array<{ range: string; avg_score: number; count: number }> = [];
    try {
      const dg = await db.execute(
        sql`SELECT
          CASE
            WHEN desconto::numeric < 20 THEN '0-20'
            WHEN desconto::numeric < 40 THEN '20-40'
            WHEN desconto::numeric < 60 THEN '40-60'
            ELSE '60+'
          END AS range,
          ROUND(AVG(score::numeric),2) AS avg_score,
          COUNT(*) AS count
        FROM properties
        WHERE desconto IS NOT NULL AND score IS NOT NULL AND removed_at IS NULL
        GROUP BY range
        ORDER BY MIN(desconto::numeric)`
      );
      discountGroups = (dg as unknown as Array<{ range: string; avg_score: string; count: string }>).map((r) => ({
        range: r.range,
        avg_score: parseFloat(r.avg_score),
        count: parseInt(r.count),
      }));
    } catch {
      discountGroups = [];
    }

    // Price spikes (>50% change)
    let priceSpikes: Array<{ caixa_id: string; old_preco: string; new_preco: string }> = [];
    try {
      const ps = await db.execute(
        sql`SELECT p.caixa_id, ph.preco AS old_preco, p.preco AS new_preco
          FROM price_history ph
          JOIN properties p ON p.id = ph.property_id
          WHERE ph.recorded_at >= NOW() - INTERVAL '2 days'
            AND p.preco IS NOT NULL
            AND ph.preco IS NOT NULL
            AND ABS(p.preco::numeric - ph.preco::numeric) / NULLIF(ph.preco::numeric, 0) > 0.5
          LIMIT 20`
      );
      priceSpikes = ps as unknown as typeof priceSpikes;
    } catch {
      priceSpikes = [];
    }

    // Geocoding bounds check: RS range
    const geocodeBoundsRow = (geocodeBounds as unknown as Array<{
      min_lat: string | null;
      max_lat: string | null;
      min_lng: string | null;
      max_lng: string | null;
    }>)[0];

    const result = {
      totalActive: parseInt((totalActive as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      totalWithScore: parseInt((totalWithScore as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      totalWithCrimeRate: parseInt((totalWithCrimeRate as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      totalWithMarketValue: parseInt((totalWithMarketValue as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      totalGeolocated: parseInt((totalGeolocated as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      totalITBI: parseInt((totalITBI as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      duplicateCaixaIds: (duplicateCaixaIds as unknown as Array<{ caixa_id: string; cnt: string }>).map((r) => ({
        caixaId: r.caixa_id,
        count: parseInt(r.cnt),
      })),
      invalidDiscounts: parseInt((invalidDiscounts as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      invalidPrices: parseInt((invalidPrices as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      scoreRange: (() => {
        const r = (scoreRange as unknown as Array<{ min: string | null; max: string | null; avg: string | null }>)[0];
        return { min: r?.min ? parseFloat(r.min) : null, max: r?.max ? parseFloat(r.max) : null, avg: r?.avg ? parseFloat(r.avg) : null };
      })(),
      crimeRateRange: (() => {
        const r = (crimeRateRange as unknown as Array<{ min: string | null; max: string | null; avg: string | null }>)[0];
        return { min: r?.min ? parseFloat(r.min) : null, max: r?.max ? parseFloat(r.max) : null, avg: r?.avg ? parseFloat(r.avg) : null };
      })(),
      lastPipelineRun: (() => {
        const r = (lastPipelineRun as unknown as Array<{ started_at: string | null; status: string | null; properties_total: number | null }>)[0];
        return r ? { startedAt: r.started_at, status: r.status, propertiesTotal: r.properties_total } : null;
      })(),
      geocodeBounds: geocodeBoundsRow
        ? {
            minLat: geocodeBoundsRow.min_lat ? parseFloat(geocodeBoundsRow.min_lat) : null,
            maxLat: geocodeBoundsRow.max_lat ? parseFloat(geocodeBoundsRow.max_lat) : null,
            minLng: geocodeBoundsRow.min_lng ? parseFloat(geocodeBoundsRow.min_lng) : null,
            maxLng: geocodeBoundsRow.max_lng ? parseFloat(geocodeBoundsRow.max_lng) : null,
          }
        : null,
      poaStats: (() => {
        const r = (poaProperties as unknown as Array<{
          avg_lat: string | null;
          avg_lng: string | null;
          min_crime: string | null;
          max_crime: string | null;
        }>)[0];
        return r
          ? {
              avgLat: r.avg_lat ? parseFloat(r.avg_lat) : null,
              avgLng: r.avg_lng ? parseFloat(r.avg_lng) : null,
              minCrimeRate: r.min_crime ? parseFloat(r.min_crime) : null,
              maxCrimeRate: r.max_crime ? parseFloat(r.max_crime) : null,
            }
          : null;
      })(),
      avaliacaoVsPreco: (() => {
        const r = (avaliacaoVsPrecoCheck as unknown as Array<{ total: string; compliant: string }>)[0];
        const total = parseInt(r?.total ?? "0");
        const compliant = parseInt(r?.compliant ?? "0");
        return { total, compliant, pct: total > 0 ? Math.round((compliant / total) * 100) : null };
      })(),
      scoreDetailsSample: scoreBreakdownCheck as unknown as Array<{
        caixa_id: string;
        score: number;
        score_details: unknown;
      }>,
      marketValueNonPoa: parseInt((marketValueNonPoa as unknown as Array<{ count: string }>)[0]?.count ?? "0"),
      marketValueComparables: (() => {
        const r = (marketValueComparables as unknown as Array<{ total: string; with_comparables: string }>)[0];
        return {
          total: parseInt(r?.total ?? "0"),
          withComparables: parseInt(r?.with_comparables ?? "0"),
        };
      })(),
      poaMedianPricePerM2,
      discountGroups,
      priceSpikes,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[verify] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
