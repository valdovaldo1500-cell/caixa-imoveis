import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql, isNull } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Top 15 cities by count with avg discount and avg price
    const byCity = await db
      .select({
        cidade: properties.cidade,
        count: sql<number>`count(*)::int`,
        avgDiscount: sql<number>`round(avg(${properties.desconto})::numeric, 1)::float`,
        avgPrice: sql<number>`round(avg(${properties.preco})::numeric, 0)::float`,
      })
      .from(properties)
      .where(isNull(properties.removedAt))
      .groupBy(properties.cidade)
      .orderBy(sql`count(*) desc`)
      .limit(15);

    // By type: extract first word from descricao (before comma), fallback to tipoImovel
    const byType = await db
      .select({
        tipo: sql<string>`
          coalesce(
            nullif(trim(${properties.tipoImovel}), ''),
            split_part(${properties.descricao}, ',', 1),
            'N/D'
          )
        `,
        count: sql<number>`count(*)::int`,
      })
      .from(properties)
      .where(isNull(properties.removedAt))
      .groupBy(
        sql`coalesce(
          nullif(trim(${properties.tipoImovel}), ''),
          split_part(${properties.descricao}, ',', 1),
          'N/D'
        )`
      )
      .orderBy(sql`count(*) desc`);

    // Discount distribution in 10% buckets
    const byDiscount = await db
      .select({
        range: sql<string>`
          CASE
            WHEN ${properties.desconto} IS NULL THEN 'N/D'
            WHEN ${properties.desconto} < 10 THEN '0-10%'
            WHEN ${properties.desconto} < 20 THEN '10-20%'
            WHEN ${properties.desconto} < 30 THEN '20-30%'
            WHEN ${properties.desconto} < 40 THEN '30-40%'
            WHEN ${properties.desconto} < 50 THEN '40-50%'
            WHEN ${properties.desconto} < 60 THEN '50-60%'
            WHEN ${properties.desconto} < 70 THEN '60-70%'
            WHEN ${properties.desconto} < 80 THEN '70-80%'
            WHEN ${properties.desconto} < 90 THEN '80-90%'
            ELSE '90-100%'
          END
        `,
        count: sql<number>`count(*)::int`,
      })
      .from(properties)
      .where(isNull(properties.removedAt))
      .groupBy(
        sql`CASE
          WHEN ${properties.desconto} IS NULL THEN 'N/D'
          WHEN ${properties.desconto} < 10 THEN '0-10%'
          WHEN ${properties.desconto} < 20 THEN '10-20%'
          WHEN ${properties.desconto} < 30 THEN '20-30%'
          WHEN ${properties.desconto} < 40 THEN '30-40%'
          WHEN ${properties.desconto} < 50 THEN '40-50%'
          WHEN ${properties.desconto} < 60 THEN '50-60%'
          WHEN ${properties.desconto} < 70 THEN '60-70%'
          WHEN ${properties.desconto} < 80 THEN '70-80%'
          WHEN ${properties.desconto} < 90 THEN '80-90%'
          ELSE '90-100%'
        END`
      )
      .orderBy(
        sql`CASE
          WHEN ${properties.desconto} IS NULL THEN 99
          WHEN ${properties.desconto} < 10 THEN 0
          WHEN ${properties.desconto} < 20 THEN 1
          WHEN ${properties.desconto} < 30 THEN 2
          WHEN ${properties.desconto} < 40 THEN 3
          WHEN ${properties.desconto} < 50 THEN 4
          WHEN ${properties.desconto} < 60 THEN 5
          WHEN ${properties.desconto} < 70 THEN 6
          WHEN ${properties.desconto} < 80 THEN 7
          WHEN ${properties.desconto} < 90 THEN 8
          ELSE 9
        END`
      );

    // By modalidade de venda
    const byModalidade = await db
      .select({
        modalidade: sql<string>`coalesce(nullif(trim(${properties.modalidadeVenda}), ''), 'N/D')`,
        count: sql<number>`count(*)::int`,
      })
      .from(properties)
      .where(isNull(properties.removedAt))
      .groupBy(sql`coalesce(nullif(trim(${properties.modalidadeVenda}), ''), 'N/D')`)
      .orderBy(sql`count(*) desc`);

    // Price distribution
    const priceDistribution = await db
      .select({
        range: sql<string>`
          CASE
            WHEN ${properties.preco} IS NULL THEN 'N/D'
            WHEN ${properties.preco} < 50000 THEN '0-50k'
            WHEN ${properties.preco} < 100000 THEN '50k-100k'
            WHEN ${properties.preco} < 200000 THEN '100k-200k'
            WHEN ${properties.preco} < 500000 THEN '200k-500k'
            WHEN ${properties.preco} < 1000000 THEN '500k-1M'
            ELSE '1M+'
          END
        `,
        count: sql<number>`count(*)::int`,
      })
      .from(properties)
      .where(isNull(properties.removedAt))
      .groupBy(
        sql`CASE
          WHEN ${properties.preco} IS NULL THEN 'N/D'
          WHEN ${properties.preco} < 50000 THEN '0-50k'
          WHEN ${properties.preco} < 100000 THEN '50k-100k'
          WHEN ${properties.preco} < 200000 THEN '100k-200k'
          WHEN ${properties.preco} < 500000 THEN '200k-500k'
          WHEN ${properties.preco} < 1000000 THEN '500k-1M'
          ELSE '1M+'
        END`
      )
      .orderBy(
        sql`CASE
          WHEN ${properties.preco} IS NULL THEN 99
          WHEN ${properties.preco} < 50000 THEN 0
          WHEN ${properties.preco} < 100000 THEN 1
          WHEN ${properties.preco} < 200000 THEN 2
          WHEN ${properties.preco} < 500000 THEN 3
          WHEN ${properties.preco} < 1000000 THEN 4
          ELSE 5
        END`
      );

    return NextResponse.json({
      byCity,
      byType,
      byDiscount,
      byModalidade,
      priceDistribution,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
