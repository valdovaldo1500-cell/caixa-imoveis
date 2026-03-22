import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { isNull, eq } from "drizzle-orm";
import { parseDescription } from "@/pipeline/parse-description";

export async function POST() {
  try {
    // Fetch properties where tipoImovel has not been set yet
    const pending = await db
      .select({
        id: properties.id,
        descricao: properties.descricao,
      })
      .from(properties)
      .where(isNull(properties.tipoImovel));

    let updated = 0;

    for (const prop of pending) {
      if (!prop.descricao) continue;

      const parsed = parseDescription(prop.descricao);

      // Only update if we extracted at least one meaningful field
      if (
        !parsed.tipoImovel &&
        parsed.quartos == null &&
        parsed.vagas == null &&
        parsed.areaTotalM2 == null &&
        parsed.areaPrivativaM2 == null
      ) {
        continue;
      }

      await db
        .update(properties)
        .set({
          tipoImovel: parsed.tipoImovel,
          quartos: parsed.quartos,
          vagas: parsed.vagas,
          areaTotalM2: parsed.areaTotalM2 != null ? String(parsed.areaTotalM2) : undefined,
          areaPrivativaM2: parsed.areaPrivativaM2 != null ? String(parsed.areaPrivativaM2) : undefined,
          updatedAt: new Date(),
        })
        .where(eq(properties.id, prop.id));

      updated++;
    }

    return NextResponse.json({ updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
