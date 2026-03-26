import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsernameFromRequest } from "@/lib/auth";
import { empireFlippersListings } from "@/data/empire-flippers-listings";
import { EXPERT_ASSESSMENTS } from "@/data/expert-assessments";
import dd92180 from "@/data/due-diligence-92180.json";
import dd92105 from "@/data/due-diligence-92105.json";
import dd89555 from "@/data/due-diligence-89555.json";
import dd92246 from "@/data/due-diligence-92246.json";

const ALLOWED_USER = "isilva";

const DUE_DILIGENCE: Record<string, unknown> = {
  "92180": dd92180,
  "92105": dd92105,
  "89555": dd89555,
  "92246": dd92246,
};

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
  const dueDiligence = DUE_DILIGENCE[id] ?? null;

  return NextResponse.json({ listing, assessment, dueDiligence });
}
