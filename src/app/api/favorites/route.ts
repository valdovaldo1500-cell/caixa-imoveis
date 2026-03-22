import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { favorites, properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_request: NextRequest) {
  try {
    const rows = await db
      .select({
        id: favorites.id,
        propertyId: favorites.propertyId,
        notes: favorites.notes,
        createdAt: favorites.createdAt,
        cidade: properties.cidade,
        bairro: properties.bairro,
        preco: properties.preco,
        valorAvaliacao: properties.valorAvaliacao,
        desconto: properties.desconto,
        score: properties.score,
        marketValue: properties.marketValue,
        tipoImovel: properties.tipoImovel,
        linkCaixa: properties.linkCaixa,
        removedAt: properties.removedAt,
      })
      .from(favorites)
      .innerJoin(properties, eq(favorites.propertyId, properties.id))
      .orderBy(favorites.createdAt);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/favorites error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, notes } = body as { propertyId: number; notes?: string };

    if (!propertyId || isNaN(Number(propertyId))) {
      return NextResponse.json({ error: "propertyId required" }, { status: 400 });
    }

    // Check for duplicate
    const existing = await db
      .select({ id: favorites.id })
      .from(favorites)
      .where(eq(favorites.propertyId, Number(propertyId)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Property already in favorites", favoriteId: existing[0].id },
        { status: 409 }
      );
    }

    const [created] = await db
      .insert(favorites)
      .values({ propertyId: Number(propertyId), notes: notes ?? null })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/favorites error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
