import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const BRIDGE_URL = "http://host.docker.internal:9876/analyze";
const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN || "caixa-pipeline-2026-rs-secret";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  if (isNaN(propertyId) || propertyId <= 0) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const force = request.nextUrl.searchParams.get("force") === "true";

  // Check cache
  const [prop] = await db
    .select({
      aiAnalysis: properties.aiAnalysis,
      aiAnalysisAt: properties.aiAnalysisAt,
      updatedAt: properties.updatedAt,
    })
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Return cached if fresh
  if (!force && prop.aiAnalysis && prop.aiAnalysisAt && prop.updatedAt && prop.aiAnalysisAt >= prop.updatedAt) {
    return NextResponse.json({ analysis: prop.aiAnalysis, cached: true });
  }

  // Call host-level bridge
  try {
    const bridgeRes = await fetch(BRIDGE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PIPELINE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId }),
      signal: AbortSignal.timeout(90000),
    });

    const data = await bridgeRes.json() as { analysis?: string; error?: string; busy?: boolean };

    if (data.busy) {
      return NextResponse.json({ analysis: null, message: "Analise em processamento. Tente novamente em 1 minuto." }, { status: 202 });
    }

    if (data.analysis) {
      // Bridge already saved to DB, just return
      return NextResponse.json({ analysis: data.analysis, cached: false });
    }

    return NextResponse.json({ error: data.error || "Bridge returned no analysis", analysis: null }, { status: 500 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("AI analysis bridge error:", msg);

    // Fallback: return cached even if stale
    if (prop.aiAnalysis) {
      return NextResponse.json({ analysis: prop.aiAnalysis, cached: true, stale: true });
    }

    return NextResponse.json({ error: "Servico de analise indisponivel", analysis: null }, { status: 503 });
  }
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
