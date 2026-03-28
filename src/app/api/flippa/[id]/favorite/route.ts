import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { flippaFavorites } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listingId = id;

  const username = getUsernameFromRequest(request);
  if (!username) {
    return NextResponse.json({ favorited: false, favoriteId: null, notes: null });
  }

  try {
    const [existing] = await db
      .select({ id: flippaFavorites.id, notes: flippaFavorites.notes })
      .from(flippaFavorites)
      .where(and(eq(flippaFavorites.listingId, listingId), eq(flippaFavorites.username, username)))
      .limit(1);

    if (existing) {
      return NextResponse.json({ favorited: true, favoriteId: existing.id, notes: existing.notes ?? null });
    }
    return NextResponse.json({ favorited: false, favoriteId: null, notes: null });
  } catch (err) {
    console.error("GET /api/flippa/[id]/favorite error:", err);
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
  const listingId = id;

  const username = getUsernameFromRequest(request);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let notes: string | undefined;
  try {
    const body = await request.json().catch(() => ({}));
    notes = (body as { notes?: string }).notes;
  } catch {
    // no body is fine
  }

  try {
    const [existing] = await db
      .select({ id: flippaFavorites.id })
      .from(flippaFavorites)
      .where(and(eq(flippaFavorites.listingId, listingId), eq(flippaFavorites.username, username)))
      .limit(1);

    if (existing) {
      // Already favorited — remove it (toggle off)
      await db.delete(flippaFavorites).where(eq(flippaFavorites.id, existing.id));
      return NextResponse.json({ favorited: false });
    } else {
      // Not favorited — add it (toggle on)
      const [created] = await db
        .insert(flippaFavorites)
        .values({ listingId, username, notes: notes ?? null })
        .returning();
      return NextResponse.json({ favorited: true, favoriteId: created.id });
    }
  } catch (err) {
    console.error("POST /api/flippa/[id]/favorite error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listingId = id;

  const username = getUsernameFromRequest(request);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { notes } = body as { notes: string };

    const [existing] = await db
      .select({ id: flippaFavorites.id })
      .from(flippaFavorites)
      .where(and(eq(flippaFavorites.listingId, listingId), eq(flippaFavorites.username, username)))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    const [updated] = await db
      .update(flippaFavorites)
      .set({ notes: notes ?? null })
      .where(eq(flippaFavorites.id, existing.id))
      .returning();

    return NextResponse.json({ favorited: true, favoriteId: updated.id, notes: updated.notes ?? null });
  } catch (err) {
    console.error("PATCH /api/flippa/[id]/favorite error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
