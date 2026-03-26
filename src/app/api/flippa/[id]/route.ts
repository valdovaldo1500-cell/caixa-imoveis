import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { flippaListings } from "@/data/flippa-listings";
import { flippaExpertAssessments } from "@/data/flippa-expert-assessments";

const ALLOWED_USER = "isilva";

const DUE_DILIGENCE: Record<string, unknown> = {};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const listing = flippaListings.find((l) => l.id === id);
  if (!listing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const assessment = flippaExpertAssessments.find((a) => a.id === id) ?? null;
  const dueDiligence = DUE_DILIGENCE[id] ?? null;

  return NextResponse.json({ listing, assessment, dueDiligence });
}
