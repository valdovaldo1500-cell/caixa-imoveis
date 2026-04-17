import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { favorites, properties } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

const ALLOWED_USER = "isilva";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ufParam = request.nextUrl.searchParams.get("uf")?.toUpperCase();

  try {
    const rows = await db
      .select({
        favoriteId: favorites.id,
        propertyId: properties.id,
        notes: favorites.notes,
        caixaId: properties.caixaId,
        cidade: properties.cidade,
        bairro: properties.bairro,
        endereco: properties.endereco,
        cep: properties.cep,
        preco: properties.preco,
        valorAvaliacao: properties.valorAvaliacao,
        desconto: properties.desconto,
        aceitaFinanciamento: properties.aceitaFinanciamento,
        descricao: properties.descricao,
        modalidadeVenda: properties.modalidadeVenda,
        tipoImovel: properties.tipoImovel,
        quartos: properties.quartos,
        vagas: properties.vagas,
        banheiros: properties.banheiros,
        areaTotalM2: properties.areaTotalM2,
        areaPrivativaM2: properties.areaPrivativaM2,
        lat: properties.lat,
        lng: properties.lng,
        score: properties.score,
        scoreDetails: properties.scoreDetails,
        fotoUrl: properties.fotoUrl,
        linkCaixa: properties.linkCaixa,
        crimeRate: properties.crimeRate,
        marketValue: properties.marketValue,
        marketValuePerM2: properties.marketValuePerM2,
        marketRentValue: properties.marketRentValue,
        comparablesCount: properties.comparablesCount,
        comparablesTier1Count: properties.comparablesTier1Count,
        comparablesTier2Count: properties.comparablesTier2Count,
        zapMarketValue: properties.zapMarketValue,
        zapMarketValuePerM2: properties.zapMarketValuePerM2,
        zapRentValue: properties.zapRentValue,
        zapComparablesCount: properties.zapComparablesCount,
        qaMarketValue: properties.qaMarketValue,
        qaRentValue: properties.qaRentValue,
        qaComparablesCount: properties.qaComparablesCount,
        dataQualityFlag: properties.dataQualityFlag,
        firstSeenAt: properties.firstSeenAt,
        lastSeenAt: properties.lastSeenAt,
        removedAt: properties.removedAt,
        uf: properties.uf,
      })
      .from(favorites)
      .innerJoin(properties, eq(favorites.propertyId, properties.id))
      .where(
        ufParam
          ? eq(favorites.username, ALLOWED_USER) && eq(properties.uf, ufParam) as never
          : eq(favorites.username, ALLOWED_USER)
      )
      .orderBy(desc(properties.score));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/investimentos error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
