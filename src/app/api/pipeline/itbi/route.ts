import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { downloadAndImportITBI, calculateMarketValues } from "@/pipeline/itbi";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";

  try {
    const result: Record<string, unknown> = { action };

    if (action === "import" || action === "all") {
      console.log("Starting ITBI import...");
      const importResult = await downloadAndImportITBI([2024, 2025, 2026]);
      result.import = importResult;
      console.log("ITBI import done:", importResult);
    }

    if (action === "calculate" || action === "all") {
      console.log("Calculating market values...");
      const calcResult = await calculateMarketValues();
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
    console.error("ITBI pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
