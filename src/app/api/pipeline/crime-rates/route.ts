import { NextResponse } from "next/server";
import { updateCrimeRates } from "@/pipeline/crime-rate";

export async function POST() {
  try {
    const result = await updateCrimeRates();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("crime-rates pipeline error:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
