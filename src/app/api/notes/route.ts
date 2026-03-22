import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertyNotes } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db
      .select({ propertyId: propertyNotes.propertyId, note: propertyNotes.note })
      .from(propertyNotes);

    const notes: Record<string, string> = {};
    for (const row of rows) {
      notes[String(row.propertyId)] = row.note;
    }

    return NextResponse.json({ notes });
  } catch (err) {
    console.error("GET /api/notes error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
