import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const favoriteId = parseInt(id, 10);

  if (isNaN(favoriteId)) {
    return NextResponse.json({ error: "Invalid favorite ID" }, { status: 400 });
  }

  try {
    const deleted = await db
      .delete(favorites)
      .where(eq(favorites.id, favoriteId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/favorites/[id] error:", err);
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
  const favoriteId = parseInt(id, 10);

  if (isNaN(favoriteId)) {
    return NextResponse.json({ error: "Invalid favorite ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { notes } = body as { notes: string | null };

    const [updated] = await db
      .update(favorites)
      .set({ notes: notes ?? null })
      .where(eq(favorites.id, favoriteId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/favorites/[id] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
