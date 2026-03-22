import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { and, isNull, isNotNull, gte, lte, ilike, SQL } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const modalidade = searchParams.get("modalidade");
  const descontoMin = searchParams.get("desconto_min");
  const descontoMax = searchParams.get("desconto_max");

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
