import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { flippaFavorites } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);

  try {
    if (!username) {
      return NextResponse.json({ favorites: [] });
    }

    const rows = await db
      .select({
        id: flippaFavorites.id,
        listingId: flippaFavorites.listingId,
        notes: flippaFavorites.notes,
        createdAt: flippaFavorites.createdAt,
      })
      .from(flippaFavorites)
      .where(eq(flippaFavorites.username, username))
      .orderBy(flippaFavorites.createdAt);

    return NextResponse.json({
      favorites: rows.map((r) => ({
        id: r.id,
        listingId: r.listingId,
        notes: r.notes ?? null,
        createdAt: r.createdAt ? r.createdAt.toISOString() : null,
      })),
    });
  } catch (err) {
    console.error("GET /api/flippa/favorites error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
