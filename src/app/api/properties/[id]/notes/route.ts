import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { propertyNotes } from "@/lib/db/schema";
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
    return NextResponse.json({ note: null });
  }

  try {
    const [row] = await db
      .select({ note: propertyNotes.note })
      .from(propertyNotes)
      .where(and(eq(propertyNotes.propertyId, propertyId), eq(propertyNotes.username, username)))
      .limit(1);

    return NextResponse.json({ note: row?.note ?? null });
  } catch (err) {
    console.error("GET /api/properties/[id]/notes error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(
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

  let body: { note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const note = typeof body.note === "string" ? body.note : "";

  try {
    if (note.trim() === "") {
      // Delete the note record if empty
      await db
        .delete(propertyNotes)
        .where(and(eq(propertyNotes.propertyId, propertyId), eq(propertyNotes.username, username)));
      return NextResponse.json({ note: null });
    }

    // Check if note exists for this user+property
    const [existing] = await db
      .select({ id: propertyNotes.id })
      .from(propertyNotes)
      .where(and(eq(propertyNotes.propertyId, propertyId), eq(propertyNotes.username, username)))
      .limit(1);

    if (existing) {
      await db
        .update(propertyNotes)
        .set({ note, updatedAt: new Date() })
        .where(eq(propertyNotes.id, existing.id));
    } else {
      await db
        .insert(propertyNotes)
        .values({ propertyId, username, note });
    }

    return NextResponse.json({ note });
  } catch (err) {
    console.error("PUT /api/properties/[id]/notes error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
