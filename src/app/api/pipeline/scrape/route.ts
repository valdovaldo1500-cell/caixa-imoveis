import { NextRequest, NextResponse } from "next/server";
import { scrapeNewProperties } from "@/pipeline/scrape-details";

let isRunning = false;

export async function POST(req: NextRequest) {
  if (isRunning) {
    return NextResponse.json(
      { error: "Scraping já está executando" },
      { status: 409 }
    );
  }

  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10)), 200) : 20;

  isRunning = true;
  try {
    const result = await scrapeNewProperties(limit);
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
