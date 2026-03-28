import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { flippaListings, FLIPPA_UPDATED_AT } from "@/data/flippa-listings";
import type { FlippaListing } from "@/data/flippa-listings";

const ALLOWED_USER = "isilva";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const recommendation = searchParams.get("recommendation");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "scores.overall";

  let listings: FlippaListing[] = [...flippaListings];

  // Filter by recommendation
  if (recommendation && recommendation !== "all") {
    listings = listings.filter(
      (l) => l.recommendation.toLowerCase() === recommendation.toLowerCase()
    );
  }

  // Filter by category (maps to 'type' field)
  if (category && category !== "all") {
    listings = listings.filter((l) => l.type === category);
  }

  // Sort
  type NumericKey = "avgMonthlyProfit" | "avgMonthlyRevenue" | "askingPrice" | "ageYears";
  const numericKeys: NumericKey[] = [
    "avgMonthlyProfit",
    "avgMonthlyRevenue",
    "askingPrice",
    "ageYears",
  ];

  if (sort === "scores.overall" || sort === "overallScore") {
    listings = listings.sort((a, b) => (b.scores.overall ?? -Infinity) - (a.scores.overall ?? -Infinity));
  } else if (sort === "scores.roi" || sort === "roiScore") {
    listings = listings.sort((a, b) => (b.scores.roi ?? -Infinity) - (a.scores.roi ?? -Infinity));
  } else if (sort === "scores.stability" || sort === "autonomyScore") {
    listings = listings.sort((a, b) => (b.scores.stability ?? -Infinity) - (a.scores.stability ?? -Infinity));
  } else if (sort === "scores.operatorIndependence" || sort === "riskScore") {
    listings = listings.sort((a, b) => (b.scores.operatorIndependence ?? -Infinity) - (a.scores.operatorIndependence ?? -Infinity));
  } else if (sort === "scores.growthPotential" || sort === "evergreenScore") {
    listings = listings.sort((a, b) => (b.scores.growthPotential ?? -Infinity) - (a.scores.growthPotential ?? -Infinity));
  } else if (numericKeys.includes(sort as NumericKey)) {
    const key = sort as NumericKey;
    listings = listings.sort((a, b) => {
      const av = (a[key] as number | null | undefined) ?? -Infinity;
      const bv = (b[key] as number | null | undefined) ?? -Infinity;
      return bv - av;
    });
  }

  return NextResponse.json({
    listings,
    total: listings.length,
    updatedAt: "2026-03-26",
  });
}
