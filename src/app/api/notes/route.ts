import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { propertyNotes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);

  try {
    if (!username) {
      return NextResponse.json({ notes: {} });
    }

    const rows = await db
      .select({ propertyId: propertyNotes.propertyId, note: propertyNotes.note })
      .from(propertyNotes)
      .where(eq(propertyNotes.username, username));

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
