import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPropertyComparables } from "@/pipeline/itbi";
import { getZapComparables } from "@/pipeline/zap";

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
    const [itbiResult, zapResult] = await Promise.all([
      getPropertyComparables(propertyId),
      getZapComparables(propertyId),
    ]);

    if (!itbiResult) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...itbiResult,
      zapListings: zapResult,
    });
  } catch (err) {
    console.error("Comparables route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
