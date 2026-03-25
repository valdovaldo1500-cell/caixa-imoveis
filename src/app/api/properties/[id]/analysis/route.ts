import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// POST: return cached AI analysis (generation runs locally via caixa-ai-analysis.sh)
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const [prop] = await db
    .select({
      aiAnalysis: properties.aiAnalysis,
      aiAnalysisAt: properties.aiAnalysisAt,
    })
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (prop.aiAnalysis) {
    return NextResponse.json({ analysis: prop.aiAnalysis, generatedAt: prop.aiAnalysisAt, cached: true });
  }

  return NextResponse.json(
    { analysis: null, message: "Analise ainda nao gerada. Execute: ~/scripts/caixa-ai-analysis.sh " + id },
    { status: 202 }
  );
}

// GET: return cached analysis
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  if (isNaN(propertyId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const [prop] = await db
    .select({ aiAnalysis: properties.aiAnalysis, aiAnalysisAt: properties.aiAnalysisAt })
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ analysis: prop.aiAnalysis, generatedAt: prop.aiAnalysisAt });
}
