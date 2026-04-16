import { NextResponse, type NextRequest } from "next/server";
import { updateCrimeRates } from "@/pipeline/crime-rate";
import { isValidState } from "@/lib/state";

export async function POST(request: NextRequest) {
  try {
    const ufParam = request.nextUrl.searchParams.get("uf") || "RS";
    const uf = ufParam.toUpperCase();
    if (!isValidState(uf.toLowerCase())) {
      return NextResponse.json({ ok: false, error: `Invalid uf: ${ufParam}` }, { status: 400 });
    }
    const result = await updateCrimeRates(uf);
    return NextResponse.json({ ok: true, uf, ...result });
  } catch (err) {
    console.error("crime-rates pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
