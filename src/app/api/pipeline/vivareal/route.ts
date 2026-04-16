import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importVivaRealData } from "@/pipeline/vivareal";
import { calculateZapMarketValues } from "@/pipeline/zap";

const VIVAREAL_DATA_PATH = "/tmp/vivareal-data.json";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";
  const uf = request.nextUrl.searchParams.get("uf") || undefined;

  try {
    const result: Record<string, unknown> = { action, uf: uf ?? "all" };

    if (action === "import" || action === "all") {
      console.log(`Starting VivaReal data import (uf=${uf ?? "from JSON"})...`);
      const importResult = await importVivaRealData(VIVAREAL_DATA_PATH, uf);
      result.import = importResult;
    }

    if (action === "calculate" || action === "all") {
      console.log(`Calculating market values (ZAP + VivaReal, uf=${uf ?? "all"})...`);
      const calcResult = await calculateZapMarketValues(uf);
      result.calculate = calcResult;
    }

    if (action !== "import" && action !== "calculate" && action !== "all") {
      return NextResponse.json(
        { error: `Unknown action '${action}'. Use: import, calculate, or all` },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("VivaReal pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
