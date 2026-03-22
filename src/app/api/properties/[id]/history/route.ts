import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { priceHistory, properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    // Verify property exists
    const [property] = await db
      .select({ id: properties.id })
      .from(properties)
      .where(eq(properties.id, propertyId))
      .limit(1);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const history = await db
      .select({
        preco: priceHistory.preco,
        desconto: priceHistory.desconto,
        recordedAt: priceHistory.recordedAt,
      })
      .from(priceHistory)
      .where(eq(priceHistory.propertyId, propertyId))
      .orderBy(asc(priceHistory.recordedAt));

    return NextResponse.json(history);
  } catch (err) {
    console.error("Price history route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
