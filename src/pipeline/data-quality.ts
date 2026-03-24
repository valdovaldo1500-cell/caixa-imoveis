import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { eq, isNull } from "drizzle-orm";

export type DataQualityFlag =
  | "suspicious_area"
  | "suspicious_price"
  | "suspicious_discount"
  | null;

/**
 * Determine the quality flag for a single property.
 * Returns the first matching flag, or null if all checks pass.
 */
export function computeDataQualityFlag(p: {
  tipoImovel: string | null;
  descricao: string | null;
  areaPrivativaM2: string | null;
  areaTotalM2: string | null;
  preco: string | null;
  desconto: string | null;
}): DataQualityFlag {
  const tipo = (p.tipoImovel || p.descricao || "").toLowerCase();
  const area =
    p.areaPrivativaM2 && parseFloat(p.areaPrivativaM2) > 0
      ? parseFloat(p.areaPrivativaM2)
      : p.areaTotalM2 && parseFloat(p.areaTotalM2) > 0
      ? parseFloat(p.areaTotalM2)
      : null;
  const preco = p.preco ? parseFloat(p.preco) : null;
  const desconto = p.desconto ? parseFloat(p.desconto) : null;

  // Suspicious discount: > 95%
  if (desconto !== null && desconto > 95) {
    return "suspicious_discount";
  }

  // Suspicious area: Apartamento > 250m²
  if (tipo.includes("apartamento") && area !== null && area > 250) {
    return "suspicious_area";
  }

  // Suspicious area: Casa > 1000m²
  if (tipo.includes("casa") && area !== null && area > 1000) {
    return "suspicious_area";
  }

  // Suspicious price: R$/m² < 100 (only when we have both price and area)
  if (preco !== null && preco > 0 && area !== null && area > 0) {
    const pricePerM2 = preco / area;
    if (pricePerM2 < 100) {
      return "suspicious_price";
    }
  }

  return null;
}

export interface DataQualityResult {
  checked: number;
  flagged: number;
  cleared: number;
}

/**
 * Run data quality checks on all active (non-removed) properties
 * and update their dataQualityFlag accordingly.
 */
export async function runDataQualityChecks(): Promise<DataQualityResult> {
  const allProperties = await db
    .select({
      id: properties.id,
      tipoImovel: properties.tipoImovel,
      descricao: properties.descricao,
      areaPrivativaM2: properties.areaPrivativaM2,
      areaTotalM2: properties.areaTotalM2,
      preco: properties.preco,
      desconto: properties.desconto,
      dataQualityFlag: properties.dataQualityFlag,
    })
    .from(properties)
    .where(isNull(properties.removedAt));

  let flagged = 0;
  let cleared = 0;

  for (const prop of allProperties) {
    const newFlag = computeDataQualityFlag(prop);
    const currentFlag = prop.dataQualityFlag ?? null;

    // Only write to DB when the flag changes
    if (newFlag !== currentFlag) {
      await db
        .update(properties)
        .set({ dataQualityFlag: newFlag })
        .where(eq(properties.id, prop.id));

      if (newFlag !== null) {
        flagged++;
      } else {
        cleared++;
      }
    } else if (newFlag !== null) {
      flagged++; // count already-flagged as flagged even if no update needed
    }
  }

  return { checked: allProperties.length, flagged, cleared };
}
