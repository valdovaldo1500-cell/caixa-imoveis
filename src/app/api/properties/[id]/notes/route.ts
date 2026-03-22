import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { propertyNotes } from "@/lib/db/schema";
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
    const [row] = await db
      .select({ note: propertyNotes.note })
      .from(propertyNotes)
      .where(eq(propertyNotes.propertyId, propertyId))
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
      await db.delete(propertyNotes).where(eq(propertyNotes.propertyId, propertyId));
      return NextResponse.json({ note: null });
    }

    // Upsert
    await db
      .insert(propertyNotes)
      .values({ propertyId, note })
      .onConflictDoUpdate({
        target: propertyNotes.propertyId,
        set: { note, updatedAt: new Date() },
      });

    return NextResponse.json({ note });
  } catch (err) {
    console.error("PUT /api/properties/[id]/notes error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
