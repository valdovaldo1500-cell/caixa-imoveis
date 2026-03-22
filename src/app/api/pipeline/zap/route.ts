import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importZapData, calculateZapMarketValues } from "@/pipeline/zap";

const ZAP_DATA_PATH = "/tmp/zap-data.json";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";

  try {
    const result: Record<string, unknown> = { action };

    if (action === "import" || action === "all") {
      console.log("Starting ZAP data import...");
      const importResult = await importZapData(ZAP_DATA_PATH);
      result.import = importResult;
      console.log("ZAP import done:", importResult);
    }

    if (action === "calculate" || action === "all") {
      console.log("Calculating ZAP market values...");
      const calcResult = await calculateZapMarketValues();
      result.calculate = calcResult;
      console.log("ZAP market value calculation done:", calcResult);
    }

    if (action !== "import" && action !== "calculate" && action !== "all") {
      return NextResponse.json(
        { error: `Unknown action '${action}'. Use: import, calculate, or all` },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("ZAP pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
