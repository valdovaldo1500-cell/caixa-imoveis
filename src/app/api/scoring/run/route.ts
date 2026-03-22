import { NextResponse } from "next/server";
import { calculateScores } from "@/lib/scoring";

let isRunning = false;

export async function POST() {
  if (isRunning) {
    return NextResponse.json(
      { error: "Scoring já está executando" },
      { status: 409 }
    );
  }

  isRunning = true;
  try {
    const result = await calculateScores();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  } finally {
    isRunning = false;
  }
}
