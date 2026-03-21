import { NextResponse } from "next/server";
import { downloadCSV } from "@/pipeline/download-csv";
import { parseCSV } from "@/pipeline/parse-csv";

export async function GET() {
  const csvText = await downloadCSV();
  const lines = csvText.split("\n").filter((l) => l.trim());

  // Find header
  let headerIdx = -1;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const lower = lines[i].toLowerCase();
    const semicolons = (lines[i].match(/;/g) || []).length;
    if (semicolons >= 5 && lower.includes("cidade") && lower.includes("bairro")) {
      headerIdx = i;
      break;
    }
  }

  const parsed = parseCSV(csvText);

  return NextResponse.json({
    totalLines: lines.length,
    first5Lines: lines.slice(0, 5).map((l) => l.substring(0, 150)),
    headerIdx,
    headerLine: headerIdx >= 0 ? lines[headerIdx] : "NOT FOUND",
    parsedCount: parsed.length,
    firstParsed: parsed.slice(0, 2),
  });
}
