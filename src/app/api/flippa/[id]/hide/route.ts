import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { flippaHidden } from "@/lib/db/schema";
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
    return NextResponse.json({ hidden: false });
  }

  try {
    const [existing] = await db
      .select({ id: flippaHidden.id })
      .from(flippaHidden)
      .where(and(eq(flippaHidden.listingId, listingId), eq(flippaHidden.username, username)))
      .limit(1);

    return NextResponse.json({ hidden: !!existing });
  } catch (err) {
    console.error("GET /api/flippa/[id]/hide error:", err);
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

  try {
    const [existing] = await db
      .select({ id: flippaHidden.id })
      .from(flippaHidden)
      .where(and(eq(flippaHidden.listingId, listingId), eq(flippaHidden.username, username)))
      .limit(1);

    if (existing) {
      // Already hidden — unhide (toggle off)
      await db.delete(flippaHidden).where(eq(flippaHidden.id, existing.id));
      return NextResponse.json({ hidden: false });
    } else {
      // Not hidden — hide (toggle on)
      await db.insert(flippaHidden).values({ listingId, username }).returning();
      return NextResponse.json({ hidden: true });
    }
  } catch (err) {
    console.error("POST /api/flippa/[id]/hide error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
