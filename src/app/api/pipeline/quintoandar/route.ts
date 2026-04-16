import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importQAData, calculateQAMarketValues } from "@/pipeline/quintoandar";

const QA_DATA_PATH = "/tmp/qa-data.json";

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "all";
  const uf = request.nextUrl.searchParams.get("uf") || undefined;

  try {
    const result: Record<string, unknown> = { action, uf: uf ?? "all" };

    if (action === "import" || action === "all") {
      console.log(`Starting QuintoAndar data import (uf=${uf ?? "from JSON"})...`);
      const importResult = await importQAData(QA_DATA_PATH, uf);
      result.import = importResult;
    }

    if (action === "calculate" || action === "all") {
      console.log(`Calculating QuintoAndar market values (uf=${uf ?? "all"})...`);
      const calcResult = await calculateQAMarketValues(uf);
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
    console.error("QuintoAndar pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
