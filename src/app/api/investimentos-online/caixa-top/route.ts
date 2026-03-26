import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql, isNull, isNotNull } from "drizzle-orm";

export const dynamic = "force-dynamic";

const ALLOWED_USER = "isilva";

// BRL/USD exchange rate (Mar 2026)
const BRL_TO_USD = 1 / 5.80;

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rows = await db
    .select({
      caixaId: properties.caixaId,
      cidade: properties.cidade,
      bairro: properties.bairro,
      tipoImovel: properties.tipoImovel,
      quartos: properties.quartos,
      vagas: properties.vagas,
      areaTotalM2: properties.areaTotalM2,
      preco: properties.preco,
      valorAvaliacao: properties.valorAvaliacao,
      desconto: properties.desconto,
      score: properties.score,
      aceitaFinanciamento: properties.aceitaFinanciamento,
      modalidadeVenda: properties.modalidadeVenda,
      linkCaixa: properties.linkCaixa,
      marketValue: properties.marketValue,
      // Use market_value if available, else valor_avaliacao for rent estimation
      rentBase: sql<number>`coalesce(${properties.marketValue}, ${properties.valorAvaliacao})`,
    })
    .from(properties)
    .where(sql`${properties.removedAt} is null and ${properties.score} is not null and ${properties.score} >= 70`)
    .orderBy(sql`${properties.score} desc`)
    .limit(10);

  // Calculate rental yield for each property
  const result = rows.map((r) => {
    const preco = Number(r.preco) || 0;
    const rentBase = Number(r.rentBase) || 0;
    const isPoa = r.cidade?.toUpperCase() === "PORTO ALEGRE";

    // Acquisition costs: ITBI (3% POA, 2% interior) + registro 1.5%
    const itbiRate = isPoa ? 0.03 : 0.02;
    const acquisitionCosts = preco * (itbiRate + 0.015);
    const totalCapital = preco + acquisitionCosts;

    // Gross monthly rent: 0.55% of market/appraised value (conservative for RS)
    const grossRent = rentBase * 0.0055;

    // Net: vacancy 8.3% (× 0.917), admin fee 10% (× 0.90)
    const netAfterOpex = grossRent * 0.917 * 0.90;

    // Monthly costs: IPTU 0.5%/yr + maint 0.5%/yr of market value
    const monthlyFixedCosts = (rentBase * 0.01) / 12;

    const netMonthly = Math.max(0, netAfterOpex - monthlyFixedCosts);
    const annualNetYield = totalCapital > 0 ? (netMonthly * 12) / totalCapital * 100 : 0;

    // Equity gain: bought at discount vs market (unrealized, at purchase)
    const equityGain = rentBase > 0 ? ((rentBase - preco) / rentBase) * 100 : 0;

    return {
      caixaId: r.caixaId,
      cidade: r.cidade,
      bairro: r.bairro,
      tipoImovel: r.tipoImovel,
      quartos: r.quartos,
      vagas: r.vagas,
      areaTotalM2: r.areaTotalM2 ? Number(r.areaTotalM2) : null,
      preco: preco,
      precoUsd: Math.round(preco * BRL_TO_USD),
      valorAvaliacao: Number(r.valorAvaliacao) || null,
      marketValue: Number(r.marketValue) || null,
      desconto: Number(r.desconto) || 0,
      score: Number(r.score) || 0,
      aceitaFinanciamento: r.aceitaFinanciamento,
      modalidadeVenda: r.modalidadeVenda,
      linkCaixa: r.linkCaixa,
      // Rental estimates
      grossMonthlyRentBrl: Math.round(grossRent),
      netMonthlyRentBrl: Math.round(netMonthly),
      netMonthlyRentUsd: Math.round(netMonthly * BRL_TO_USD),
      annualNetYieldPct: Math.round(annualNetYieldPct10 * 10) / 10,
      equityGainAtPurchasePct: Math.round(equityGain * 10) / 10,
      totalCapitalBrl: Math.round(totalCapital),
      totalCapitalUsd: Math.round(totalCapital * BRL_TO_USD),
    };

    function annualNetYieldPct10() { return annualNetYield; }
  });

  return NextResponse.json({ properties: result, exchangeRate: { brlPerUsd: 5.80 } });
}
