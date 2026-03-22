import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hiddenProperties } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db
      .select({ propertyId: hiddenProperties.propertyId })
      .from(hiddenProperties);

    return NextResponse.json({ ids: rows.map((r) => r.propertyId) });
  } catch (err) {
    console.error("GET /api/hidden error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
