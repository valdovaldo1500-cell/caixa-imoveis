import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { and, isNull, isNotNull, gte, lte, ilike, SQL } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const modalidade = searchParams.get("modalidade");
  const descontoMin = searchParams.get("desconto_min");
  const descontoMax = searchParams.get("desconto_max");
  const precoMin = searchParams.get("preco_min");
  const precoMax = searchParams.get("preco_max");
  const tipo = searchParams.get("tipo");

  const conditions: SQL[] = [
    isNull(properties.removedAt),
    isNotNull(properties.lat),
  ];

  if (modalidade) {
    conditions.push(ilike(properties.modalidadeVenda, modalidade));
  }

  if (descontoMin) {
    const min = parseFloat(descontoMin);
    if (!isNaN(min)) {
      conditions.push(gte(properties.desconto, String(min)));
    }
  }

  if (descontoMax) {
    const max = parseFloat(descontoMax);
    if (!isNaN(max)) {
      conditions.push(lte(properties.desconto, String(max)));
    }
  }

  if (precoMin) {
    const min = parseFloat(precoMin);
    if (!isNaN(min)) {
      conditions.push(gte(properties.preco, String(min)));
    }
  }

  if (precoMax) {
    const max = parseFloat(precoMax);
    if (!isNaN(max)) {
      conditions.push(lte(properties.preco, String(max)));
    }
  }

  if (tipo) {
    conditions.push(
      ilike(properties.tipoImovel, `%${tipo}%`)
    );
  }

  const data = await db
    .select({
      id: properties.id,
      cidade: properties.cidade,
      bairro: properties.bairro,
      preco: properties.preco,
      desconto: properties.desconto,
      modalidadeVenda: properties.modalidadeVenda,
      linkCaixa: properties.linkCaixa,
      lat: properties.lat,
      lng: properties.lng,
    })
    .from(properties)
    .where(and(...conditions));

  return NextResponse.json({ data });
}
