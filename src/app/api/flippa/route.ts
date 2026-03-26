import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { flippaListings } from "@/data/flippa-listings";
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
  const status = searchParams.get("status") ?? "active";
  const sort = searchParams.get("sort") ?? "overallScore";

  let listings: FlippaListing[] = [...flippaListings];

  // Filter by status (default: active only)
  if (status !== "all") {
    listings = listings.filter((l) => l.status === status);
  }

  // Filter by recommendation
  if (recommendation && recommendation !== "all") {
    listings = listings.filter((l) => l.recommendation === recommendation);
  }

  // Filter by category
  if (category && category !== "all") {
    listings = listings.filter((l) => l.category === category);
  }

  // Sort
  const sortableKeys: (keyof FlippaListing)[] = [
    "overallScore",
    "autonomyScore",
    "riskScore",
    "roiScore",
    "evergreenScore",
    "monthlyProfit",
    "monthlyRevenue",
    "price",
    "multiple",
  ];
  if (sortableKeys.includes(sort as keyof FlippaListing)) {
    const key = sort as keyof FlippaListing;
    listings = listings.sort((a, b) => {
      const av = (a[key] as number | null) ?? -Infinity;
      const bv = (b[key] as number | null) ?? -Infinity;
      return bv - av;
    });
  }

  return NextResponse.json({
    listings,
    total: listings.length,
    updatedAt: "2026-03-26",
  });
}
