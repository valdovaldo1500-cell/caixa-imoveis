import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importVivaRealData } from "@/pipeline/vivareal";
import { calculateZapMarketValues } from "@/pipeline/zap";

const VIVAREAL_DATA_PATH = "/tmp/vivareal-data.json";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";

  try {
    const result: Record<string, unknown> = { action };

    if (action === "import" || action === "all") {
      console.log("Starting VivaReal data import...");
      const importResult = await importVivaRealData(VIVAREAL_DATA_PATH);
      result.import = importResult;
      console.log("VivaReal import done:", importResult);
    }

    if (action === "calculate" || action === "all") {
      // VivaReal listings are stored in zap_listings — the existing ZAP market value
      // calculation already queries all rows in that table, so calling it here
      // automatically incorporates the newly imported VivaReal data.
      console.log("Calculating market values (ZAP + VivaReal combined)...");
      const calcResult = await calculateZapMarketValues();
      result.calculate = calcResult;
      console.log("Market value calculation done:", calcResult);
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
