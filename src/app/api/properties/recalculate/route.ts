import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPropertyComparables } from "@/pipeline/itbi";

export async function POST(request: NextRequest) {
  let body: { propertyIds?: unknown; months?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { propertyIds, months } = body;

  if (!Array.isArray(propertyIds) || propertyIds.length === 0) {
    return NextResponse.json({ error: "propertyIds must be a non-empty array" }, { status: 400 });
  }

  const monthsNum = typeof months === "number" && months > 0 ? Math.min(months, 60) : 12;

  // Limit to 100 IDs per call to avoid excessive load
  const ids = (propertyIds as unknown[])
    .filter((id): id is number => typeof id === "number" && Number.isInteger(id))
    .slice(0, 100);

  // Run all comparables lookups in parallel
  const results = await Promise.allSettled(
    ids.map((id) => getPropertyComparables(id, monthsNum))
  );

  const recalculated: Record<
    number,
    { marketValue: string | null; marketValuePerM2: string | null; comparablesCount: number }
  > = {};

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const result = results[i];
    if (result.status === "fulfilled" && result.value) {
      const data = result.value;
      const estimatedValue = data.methodology.estimatedValue;
      const medianPrecoM2 = data.methodology.medianPrecoM2;
      const count =
        data.tier1.count > 0 ? data.tier1.count : data.tier2.count;
      recalculated[id] = {
        marketValue: estimatedValue != null ? String(estimatedValue) : null,
        marketValuePerM2: medianPrecoM2 != null ? String(medianPrecoM2) : null,
        comparablesCount: count,
      };
    }
  }

  return NextResponse.json({ recalculated });
}
