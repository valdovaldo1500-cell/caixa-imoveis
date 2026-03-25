import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { empireFlippersListings } from "@/data/empire-flippers-listings";
import type { EFListing } from "@/data/empire-flippers-listings";

const ALLOWED_USER = "isilva";

export async function GET(request: NextRequest) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const recommendation = searchParams.get("recommendation");
  const category = searchParams.get("category");
  const status = searchParams.get("status") ?? "for_sale";
  const sort = searchParams.get("sort") ?? "overallScore";

  let listings: EFListing[] = [...empireFlippersListings];

  // Filter by status (default: for_sale only)
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
  const sortableKeys: (keyof EFListing)[] = [
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
  if (sortableKeys.includes(sort as keyof EFListing)) {
    const key = sort as keyof EFListing;
    listings = listings.sort((a, b) => {
      const av = (a[key] as number | null) ?? -Infinity;
      const bv = (b[key] as number | null) ?? -Infinity;
      return bv - av;
    });
  }

  return NextResponse.json({
    listings,
    total: listings.length,
    updatedAt: "2026-03-25",
  });
}
