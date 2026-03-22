import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hiddenProperties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUsernameFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);

  try {
    if (!username) {
      return NextResponse.json({ ids: [] });
    }

    const rows = await db
      .select({ propertyId: hiddenProperties.propertyId })
      .from(hiddenProperties)
      .where(eq(hiddenProperties.username, username));

    return NextResponse.json({ ids: rows.map((r) => r.propertyId) });
  } catch (err) {
    console.error("GET /api/hidden error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
