import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importQAData, calculateQAMarketValues } from "@/pipeline/quintoandar";

const QA_DATA_PATH = "/tmp/qa-data.json";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";

  try {
    const result: Record<string, unknown> = { action };

    if (action === "import" || action === "all") {
      console.log("Starting QuintoAndar data import...");
      const importResult = await importQAData(QA_DATA_PATH);
      result.import = importResult;
      console.log("QA import done:", importResult);
    }

    if (action === "calculate" || action === "all") {
      console.log("Calculating QuintoAndar market values...");
      const calcResult = await calculateQAMarketValues();
      result.calculate = calcResult;
      console.log("QA market value calculation done:", calcResult);
    }

    if (action !== "import" && action !== "calculate" && action !== "all") {
      return NextResponse.json(
        { error: `Unknown action '${action}'. Use: import, calculate, or all` },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("QuintoAndar pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
