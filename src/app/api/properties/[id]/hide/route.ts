import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hiddenProperties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
    const [existing] = await db
      .select({ id: hiddenProperties.id })
      .from(hiddenProperties)
      .where(eq(hiddenProperties.propertyId, propertyId))
      .limit(1);

    return NextResponse.json({ hidden: !!existing });
  } catch (err) {
    console.error("GET /api/properties/[id]/hide error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const [existing] = await db
      .select({ id: hiddenProperties.id })
      .from(hiddenProperties)
      .where(eq(hiddenProperties.propertyId, propertyId))
      .limit(1);

    if (existing) {
      // Already hidden — unhide (toggle off)
      await db.delete(hiddenProperties).where(eq(hiddenProperties.id, existing.id));
      return NextResponse.json({ hidden: false });
    } else {
      // Not hidden — hide (toggle on)
      await db.insert(hiddenProperties).values({ propertyId }).returning();
      return NextResponse.json({ hidden: true });
    }
  } catch (err) {
    console.error("POST /api/properties/[id]/hide error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
