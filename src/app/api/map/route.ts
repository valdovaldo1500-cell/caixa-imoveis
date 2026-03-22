import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, sql } from "drizzle-orm";

export async function GET() {
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
    .where(
      sql`${properties.removedAt} IS NULL AND ${properties.lat} IS NOT NULL`
    );

  return NextResponse.json({ data });
}
