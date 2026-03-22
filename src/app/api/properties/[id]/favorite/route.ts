import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  const username = getUsernameFromRequest(request);
  if (!username) {
    return NextResponse.json({ favorited: false });
  }

  try {
    const [existing] = await db
      .select({ id: favorites.id })
      .from(favorites)
      .where(and(eq(favorites.propertyId, propertyId), eq(favorites.username, username)))
      .limit(1);

    if (existing) {
      return NextResponse.json({ favorited: true, favoriteId: existing.id });
    }
    return NextResponse.json({ favorited: false });
  } catch (err) {
    console.error("GET /api/properties/[id]/favorite error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  const username = getUsernameFromRequest(request);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [existing] = await db
      .select({ id: favorites.id })
      .from(favorites)
      .where(and(eq(favorites.propertyId, propertyId), eq(favorites.username, username)))
      .limit(1);

    if (existing) {
      // Already favorited — remove it (toggle off)
      await db.delete(favorites).where(eq(favorites.id, existing.id));
      return NextResponse.json({ favorited: false });
    } else {
      // Not favorited — add it (toggle on)
      const [created] = await db
        .insert(favorites)
        .values({ propertyId, username })
        .returning();
      return NextResponse.json({ favorited: true, favoriteId: created.id });
    }
  } catch (err) {
    console.error("POST /api/properties/[id]/favorite error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
