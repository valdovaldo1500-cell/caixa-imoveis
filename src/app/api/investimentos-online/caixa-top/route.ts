import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const ALLOWED_USER = "isilva";

// BRL/USD exchange rate (Mar 2026)
const BRL_PER_USD = 5.80;

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
      rentBase: sql<string>`coalesce(${properties.marketValue}, ${properties.valorAvaliacao})`,
    })
    .from(properties)
    .where(sql`${properties.removedAt} is null and ${properties.score} is not null and ${properties.score} >= 70`)
    .orderBy(sql`${properties.score} desc`)
    .limit(10);

  const result = rows.map((r) => {
    const preco = Number(r.preco) || 0;
    const rentBase = Number(r.rentBase) || 0;
    const isPoa = r.cidade?.toUpperCase() === "PORTO ALEGRE";

    // Acquisition costs: ITBI (3% POA, 2% interior) + registro 1.5%
    const itbiRate = isPoa ? 0.03 : 0.02;
    const totalCapital = preco * (1 + itbiRate + 0.015);

    // Gross monthly rent: 0.55% of market/appraised value (conservative for RS)
    const grossRent = rentBase * 0.0055;

    // Net: vacancy 8.3% (× 0.917), admin fee 10% (× 0.90)
    const netAfterOpex = grossRent * 0.917 * 0.90;

    // Monthly costs: IPTU 0.5%/yr + maint 0.5%/yr of property market value
    const monthlyFixedCosts = (rentBase * 0.01) / 12;

    const netMonthly = Math.max(0, netAfterOpex - monthlyFixedCosts);
    const annualNetYield = totalCapital > 0 ? (netMonthly * 12) / totalCapital * 100 : 0;

    // Instant equity gain at purchase (bought below market)
    const equityGain = rentBase > 0 ? ((rentBase - preco) / rentBase) * 100 : 0;

    return {
      caixaId: r.caixaId,
      cidade: r.cidade,
      bairro: r.bairro,
      tipoImovel: r.tipoImovel,
      quartos: r.quartos,
      vagas: r.vagas,
      areaTotalM2: r.areaTotalM2 ? Number(r.areaTotalM2) : null,
      preco,
      precoUsd: Math.round(preco / BRL_PER_USD),
      valorAvaliacao: Number(r.valorAvaliacao) || null,
      marketValue: Number(r.marketValue) || null,
      desconto: Number(r.desconto) || 0,
      score: Number(r.score) || 0,
      aceitaFinanciamento: r.aceitaFinanciamento,
      modalidadeVenda: r.modalidadeVenda,
      linkCaixa: r.linkCaixa,
      grossMonthlyRentBrl: Math.round(grossRent),
      netMonthlyRentBrl: Math.round(netMonthly),
      netMonthlyRentUsd: Math.round(netMonthly / BRL_PER_USD),
      annualNetYieldPct: Math.round(annualNetYield * 10) / 10,
      equityGainAtPurchasePct: Math.round(equityGain * 10) / 10,
      totalCapitalBrl: Math.round(totalCapital),
      totalCapitalUsd: Math.round(totalCapital / BRL_PER_USD),
    };
  });

  return NextResponse.json({ properties: result, exchangeRate: { brlPerUsd: BRL_PER_USD } });
}
