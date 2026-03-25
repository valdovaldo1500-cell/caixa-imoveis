import { NextRequest, NextResponse } from "next/server";
import { geocodeProperties, regeocodeStacked } from "@/pipeline/geocode";

let isRunning = false;

export async function POST(req: NextRequest) {
  if (isRunning) {
    return NextResponse.json(
      { error: "Geocoding já está executando" },
      { status: 409 }
    );
  }

  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target");
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10)), 200) : 50;

  isRunning = true;
  try {
    if (target === "stacked") {
      const result = await regeocodeStacked(limit);
      return NextResponse.json(result);
    }

    const result = await geocodeProperties(limit);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  } finally {
    isRunning = false;
  }
}
