import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { empireFlippersListings } from "@/data/empire-flippers-listings";
import { EXPERT_ASSESSMENTS } from "@/data/expert-assessments";

const ALLOWED_USER = "isilva";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const username = getUsernameFromRequest(request);
  if (username !== ALLOWED_USER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const listing = empireFlippersListings.find((l) => l.id === id);
  if (!listing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const assessment = EXPERT_ASSESSMENTS.find((a) => a.id === id) ?? null;

  return NextResponse.json({ listing, assessment });
}
