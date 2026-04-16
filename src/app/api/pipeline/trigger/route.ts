import { NextResponse, type NextRequest } from "next/server";
import { runPipeline } from "@/pipeline/run";
import { isValidState } from "@/lib/state";

let isRunning = false;

export async function POST(request: NextRequest) {
  if (isRunning) {
    return NextResponse.json(
      { error: "Pipeline já está executando" },
      { status: 409 }
    );
  }

  const ufParam = request.nextUrl.searchParams.get("uf") || "RS";
  const uf = ufParam.toUpperCase();
  if (!isValidState(uf.toLowerCase())) {
    return NextResponse.json({ error: `Invalid uf: ${ufParam}` }, { status: 400 });
  }

  isRunning = true;
  try {
    const result = await runPipeline(uf);
    return NextResponse.json({ uf, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  } finally {
    isRunning = false;
  }
}
