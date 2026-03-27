import { db } from "@/lib/db";
import { itbiTransactions, properties } from "@/lib/db/schema";
import { eq, sql, isNull, and, gte, ilike } from "drizzle-orm";

// Normalize bairro: remove accents, articles (DE, DO, DA, DOS, DAS), trim
function normBairro(name: string): string {
  return name
    .toUpperCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(DE|DO|DA|DOS|DAS|E)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const ITBI_URLS: Record<number, string> = {
  2024: "https://dadosabertos.poa.br/dataset/dd8ee5be-06f4-4107-a3bf-5e15aebba6c1/resource/4947bed6-6be6-40e6-a120-42957e745da5/download/itbi-2024.csv",
  2025: "https://dadosabertos.poa.br/dataset/dd8ee5be-06f4-4107-a3bf-5e15aebba6c1/resource/e46f56f3-ac8a-4513-b155-5d3038a275b2/download/itbi-2025.csv",
  2026: "https://dadosabertos.poa.br/dataset/dd8ee5be-06f4-4107-a3bf-5e15aebba6c1/resource/8eba900c-8835-4ca2-8533-c4d4ca620d12/download/itbi-2026.csv",
};

const RESIDENTIAL_TYPES = new Set([
  "APARTAMENTO",
  "RESIDENCIA ISOLADA",
  "APARTAMENTO DE COBERTURA",
  "RESIDENCIA PADRONIZADA EM COND HORIZONTAL FECHADO",
  "RESIDENCIA NAO PADRONIZ EM CONDOM HORIZONTAL FECHADO",
  "RESIDENCIA CONDOM HORIZ ABERTO SEM AREA USO COMUM",
  "APART-HOTEL(FLAT)",
]);

// Map Caixa property types to ITBI types
const CAIXA_TO_ITBI_TYPES: Record<string, string[]> = {
  apartamento: [
    "APARTAMENTO", "APARTAMENTO DE COBERTURA", "APART-HOTEL(FLAT)",
    // Condominium residences are effectively apartments
    "RESIDENCIA PADRONIZADA EM COND HORIZONTAL FECHADO",
    "RESIDENCIA NAO PADRONIZ EM CONDOM HORIZONTAL FECHADO",
    "RESIDENCIA CONDOM HORIZ ABERTO SEM AREA USO COMUM",
    "RESIDENCIA PADRONIZADA COND HORIZ ABERTO C/ ÁREA USO COMUM",
    "RESIDENCIA NAO PADRONIZADA EM COND HORIZ ABERTO C/ ÁREA COMUM",
  ],
  casa: [
    "RESIDENCIA ISOLADA",
    "RESIDENCIA DE FRENTE COM INTERIORES",
    "RESIDENCIA DE INTERIOR",
  ],
  cobertura: ["APARTAMENTO DE COBERTURA", "APARTAMENTO"],
  flat: ["APART-HOTEL(FLAT)", "APARTAMENTO"],
  kitnet: ["APARTAMENTO"],
  studio: ["APARTAMENTO"],
};

function stripQuotes(value: string): string {
  return value.replace(/^'|'$/g, "").trim();
}

function parseISODate(value: string): Date | null {
  const stripped = stripQuotes(value).trim();
  if (!stripped) return null;
  const d = new Date(stripped);
  return isNaN(d.getTime()) ? null : d;
}

function parseDecimalITBI(value: string): number | null {
  const stripped = stripQuotes(value).replace(",", ".").trim();
  if (!stripped) return null;
  const num = parseFloat(stripped);
  return isNaN(num) ? null : num;
}

function parseIntITBI(value: string): number | null {
  const stripped = stripQuotes(value).trim();
  if (!stripped) return null;
  const num = parseInt(stripped, 10);
  return isNaN(num) ? null : num;
}

interface ITBIRow {
  dataEstimativa: Date | null;
  dataPagamento: Date | null;
  baseCalculo: number | null;
  percTransmitido: number | null;
  finalidadeConstrucao: string;
  logradouro: string;
  nEndereco: string;
  nUnidade: string;
  complemento: string;
  bairro: string;
  cep: string;
  areaTotalTerreno: number | null;
  areaConstrTotal: number | null;
  areaConstrPrivativa: number | null;
  anoConstrucao: number | null;
  matricula: string;
  zonaRegistro: string;
  situacao: string;
}

function parseITBICSV(csvText: string, year: number): ITBIRow[] {
  const lines = csvText.split("\n");
  if (lines.length < 2) return [];

  // First non-empty line is the header
  let headerIdx = 0;
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (lines[i].trim()) {
      headerIdx = i;
      break;
    }
  }

  const headers = lines[headerIdx]
    .split(";")
    .map((h) => stripQuotes(h).toLowerCase().trim());

  const findCol = (name: string): number =>
    headers.findIndex((h) => h === name || h.includes(name));

  const colDataEst = findCol("data_estimativa");
  const colDataPag = findCol("data_pagamento");
  const colBase = findCol("base_de_calculo");
  const colPerc = findCol("perc_transmitido");
  const colFinalidade = findCol("finalidade_construcao");
  const colLogradouro = findCol("logradouro");
  const colNEnd = findCol("n_endereco");
  const colNUnidade = findCol("n_unidade");
  const colCompl = findCol("complemento_endereco");
  const colBairro = findCol("bairro");
  const colCep = findCol("cep");
  const colAreaTerr = findCol("area_total_terreno");
  const colAreaConstrTotal = findCol("area_constr_total");
  const colAreaPriv = findCol("area_constr_privativa");
  const colAno = findCol("ano_construcao");
  const colMatricula = findCol("n_matricula_reg_imoveis");
  const colZona = findCol("n_zona_reg_imoveis");
  const colSituacao = findCol("situacao");

  const rows: ITBIRow[] = [];

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(";");

    const situacao = colSituacao >= 0 ? stripQuotes(cols[colSituacao] || "") : "";
    if (situacao.toUpperCase() === "CANCELADA") continue;

    const baseCalculo = colBase >= 0 ? parseDecimalITBI(cols[colBase] || "") : null;
    if (!baseCalculo || baseCalculo <= 0) continue;

    const areaConstrPrivativa =
      colAreaPriv >= 0 ? parseDecimalITBI(cols[colAreaPriv] || "") : null;
    if (!areaConstrPrivativa || areaConstrPrivativa <= 0) continue;

    const finalidade =
      colFinalidade >= 0 ? stripQuotes(cols[colFinalidade] || "").toUpperCase() : "";
    if (!RESIDENTIAL_TYPES.has(finalidade)) continue;

    rows.push({
      dataEstimativa: colDataEst >= 0 ? parseISODate(cols[colDataEst] || "") : null,
      dataPagamento: colDataPag >= 0 ? parseISODate(cols[colDataPag] || "") : null,
      baseCalculo,
      percTransmitido: colPerc >= 0 ? parseDecimalITBI(cols[colPerc] || "") : null,
      finalidadeConstrucao: finalidade,
      logradouro: colLogradouro >= 0 ? stripQuotes(cols[colLogradouro] || "") : "",
      nEndereco: colNEnd >= 0 ? stripQuotes(cols[colNEnd] || "") : "",
      nUnidade: colNUnidade >= 0 ? stripQuotes(cols[colNUnidade] || "") : "",
      complemento: colCompl >= 0 ? stripQuotes(cols[colCompl] || "") : "",
      bairro: colBairro >= 0 ? stripQuotes(cols[colBairro] || "").toUpperCase() : "",
      cep: colCep >= 0 ? stripQuotes(cols[colCep] || "") : "",
      areaTotalTerreno: colAreaTerr >= 0 ? parseDecimalITBI(cols[colAreaTerr] || "") : null,
      areaConstrTotal:
        colAreaConstrTotal >= 0 ? parseDecimalITBI(cols[colAreaConstrTotal] || "") : null,
      areaConstrPrivativa,
      anoConstrucao: colAno >= 0 ? parseIntITBI(cols[colAno] || "") : null,
      matricula: colMatricula >= 0 ? stripQuotes(cols[colMatricula] || "") : "",
      zonaRegistro: colZona >= 0 ? stripQuotes(cols[colZona] || "") : "",
      situacao,
    });
  }

  return rows;
}

export async function downloadAndImportITBI(
  years: number[] = [2024, 2025, 2026]
): Promise<{ imported: number; skipped: number; errors: string[] }> {
  let totalImported = 0;
  let totalSkipped = 0;
  const errors: string[] = [];

  for (const year of years) {
    const url = ITBI_URLS[year];
    if (!url) {
      errors.push(`No URL configured for year ${year}`);
      continue;
    }

    let csvText: string;
    try {
      console.log(`Downloading ITBI ${year}...`);
      const res = await fetch(url);
      if (!res.ok) {
        errors.push(`HTTP ${res.status} downloading ITBI ${year}`);
        continue;
      }
      csvText = await res.text();
    } catch (err) {
      errors.push(`Download error for ITBI ${year}: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    const rows = parseITBICSV(csvText, year);
    console.log(`Parsed ${rows.length} valid rows for ITBI ${year}`);

    for (const row of rows) {
      try {
        // Check for existing record by matricula + data_estimativa
        if (row.matricula && row.dataEstimativa) {
          const existing = await db
            .select({ id: itbiTransactions.id })
            .from(itbiTransactions)
            .where(
              and(
                eq(itbiTransactions.matricula, row.matricula),
                eq(itbiTransactions.dataEstimativa, row.dataEstimativa)
              )
            )
            .limit(1);

          if (existing.length > 0) {
            totalSkipped++;
            continue;
          }
        }

        await db.insert(itbiTransactions).values({
          dataEstimativa: row.dataEstimativa,
          dataPagamento: row.dataPagamento,
          baseCalculo: row.baseCalculo?.toString() ?? null,
          percTransmitido: row.percTransmitido?.toString() ?? null,
          finalidadeConstrucao: row.finalidadeConstrucao || null,
          logradouro: row.logradouro || null,
          nEndereco: row.nEndereco || null,
          nUnidade: row.nUnidade || null,
          complemento: row.complemento || null,
          bairro: row.bairro || null,
          cep: row.cep || null,
          areaTotalTerreno: row.areaTotalTerreno?.toString() ?? null,
          areaConstrTotal: row.areaConstrTotal?.toString() ?? null,
          areaConstrPrivativa: row.areaConstrPrivativa?.toString() ?? null,
          anoConstrucao: row.anoConstrucao,
          matricula: row.matricula || null,
          zonaRegistro: row.zonaRegistro || null,
          situacao: row.situacao || null,
          year,
        });
        totalImported++;
      } catch (err) {
        errors.push(
          `Insert error ITBI ${year}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  }

  return { imported: totalImported, skipped: totalSkipped, errors };
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function getItbiTypes(caixaType: string | null): string[] {
  if (!caixaType) return Array.from(RESIDENTIAL_TYPES);
  const lower = caixaType.toLowerCase();
  for (const [key, types] of Object.entries(CAIXA_TO_ITBI_TYPES)) {
    if (lower.includes(key)) return types;
  }
  return Array.from(RESIDENTIAL_TYPES);
}

export async function calculateMarketValues(): Promise<{
  updated: number;
  withComparables: number;
}> {
  // Get all active Porto Alegre properties
  const poaProperties = await db
    .select({
      id: properties.id,
      bairro: properties.bairro,
      tipoImovel: properties.tipoImovel,
      descricao: properties.descricao,
      areaPrivativaM2: properties.areaPrivativaM2,
      areaTotalM2: properties.areaTotalM2,
    })
    .from(properties)
    .where(
      and(
        isNull(properties.removedAt),
        ilike(properties.cidade, "PORTO ALEGRE")
      )
    );

  if (poaProperties.length === 0) {
    return { updated: 0, withComparables: 0 };
  }

  // 18 months ago cutoff (Tier 2) and 12 months (Tier 1)
  const cutoff18m = new Date();
  cutoff18m.setMonth(cutoff18m.getMonth() - 18);
  const cutoff12m = new Date();
  cutoff12m.setMonth(cutoff12m.getMonth() - 12);

  // Load all recent ITBI transactions for POA in one query (18m window covers both tiers)
  const allTx = await db
    .select({
      bairro: itbiTransactions.bairro,
      finalidadeConstrucao: itbiTransactions.finalidadeConstrucao,
      baseCalculo: itbiTransactions.baseCalculo,
      areaConstrPrivativa: itbiTransactions.areaConstrPrivativa,
      dataEstimativa: itbiTransactions.dataEstimativa,
      logradouro: itbiTransactions.logradouro,
      nEndereco: itbiTransactions.nEndereco,
      nUnidade: itbiTransactions.nUnidade,
      cep: itbiTransactions.cep,
      anoConstrucao: itbiTransactions.anoConstrucao,
    })
    .from(itbiTransactions)
    .where(
      and(
        gte(itbiTransactions.dataEstimativa, cutoff18m),
        sql`${itbiTransactions.baseCalculo}::numeric > 10000`,
        sql`${itbiTransactions.areaConstrPrivativa}::numeric > 0`
      )
    );

  // Group by normalized bairro for fast lookup
  type TxRow = (typeof allTx)[0];
  const txByBairro = new Map<string, TxRow[]>();
  for (const tx of allTx) {
    const bairroKey = normBairro(tx.bairro || "");
    if (!txByBairro.has(bairroKey)) txByBairro.set(bairroKey, []);
    txByBairro.get(bairroKey)!.push(tx);
  }

  let updated = 0;
  let withComparables = 0;
  const now = new Date();

  for (const prop of poaProperties) {
    const bairroKey = normBairro(prop.bairro || "");
    let bairroTx = txByBairro.get(bairroKey) || [];
    // Fuzzy fallback: try partial match if exact normalized match fails
    if (bairroTx.length === 0 && bairroKey.length > 3) {
      for (const [k, txs] of txByBairro) {
        if (k.includes(bairroKey) || bairroKey.includes(k)) {
          bairroTx = txs;
          break;
        }
      }
    }

    const itbiTypes = getItbiTypes(prop.tipoImovel || prop.descricao);
    // Tier 1 uses exact first type; Tier 2 uses all mapped types
    const exactItbiType = itbiTypes[0] ?? null;

    const propArea = prop.areaPrivativaM2
      ? parseFloat(prop.areaPrivativaM2)
      : prop.areaTotalM2
        ? parseFloat(prop.areaTotalM2)
        : null;

    // Tier 1 — "Imóveis muito similares": same bairro, exact type, area ±25%, last 12 months
    const tier1 = bairroTx.filter((tx) => {
      const txTipo = (tx.finalidadeConstrucao || "").toUpperCase();
      if (exactItbiType && txTipo !== exactItbiType) return false;

      if (tx.dataEstimativa && tx.dataEstimativa < cutoff12m) return false;

      if (propArea && tx.areaConstrPrivativa) {
        const txArea = parseFloat(tx.areaConstrPrivativa);
        if (txArea > 0) {
          const ratio = Math.abs(txArea - propArea) / propArea;
          if (ratio > 0.25) return false;
        }
      }

      return true;
    });

    // Tier 2 — "Imóveis no bairro": same bairro, type group, area ±50%, last 18 months
    const tier2 = bairroTx.filter((tx) => {
      const txTipo = (tx.finalidadeConstrucao || "").toUpperCase();
      if (!itbiTypes.includes(txTipo)) return false;

      if (propArea && tx.areaConstrPrivativa) {
        const txArea = parseFloat(tx.areaConstrPrivativa);
        if (txArea > 0) {
          const ratio = Math.abs(txArea - propArea) / propArea;
          if (ratio > 0.5) return false;
        }
      }

      return true;
    });

    // Tier 3 — "Todos no bairro": same bairro, no type filter, area ±50%
    const tier3 = bairroTx.filter((tx) => {
      if (propArea && tx.areaConstrPrivativa) {
        const txArea = parseFloat(tx.areaConstrPrivativa);
        if (txArea > 0) {
          const ratio = Math.abs(txArea - propArea) / propArea;
          if (ratio > 0.5) return false;
        }
      }
      return true;
    });

    // Decide which tier to use for the market value calculation
    const activeComparables = tier1.length >= 3 ? tier1 : tier2.length >= 3 ? tier2 : tier3;

    // Calculate median R$/m²
    const pricesPerM2 = activeComparables
      .map((tx) => {
        const base = parseFloat(tx.baseCalculo || "0");
        const area = parseFloat(tx.areaConstrPrivativa || "0");
        return area > 0 ? base / area : null;
      })
      .filter((v): v is number => v !== null && v > 0);

    const medianPricePerM2 = median(pricesPerM2);

    if (medianPricePerM2 === null || !propArea) {
      // Update with null market values but still count comparables
      await db
        .update(properties)
        .set({
          comparablesCount: activeComparables.length,
          comparablesTier1Count: tier1.length,
          comparablesTier2Count: tier2.length,
          marketValueUpdatedAt: now,
          updatedAt: now,
        })
        .where(eq(properties.id, prop.id));
      updated++;
      continue;
    }

    const marketValue = medianPricePerM2 * propArea;
    const marketRentValue = marketValue * 0.005;

    await db
      .update(properties)
      .set({
        marketValue: marketValue.toFixed(2),
        marketValuePerM2: medianPricePerM2.toFixed(2),
        marketRentValue: marketRentValue.toFixed(2),
        comparablesCount: activeComparables.length,
        comparablesTier1Count: tier1.length,
        comparablesTier2Count: tier2.length,
        marketValueUpdatedAt: now,
        updatedAt: now,
      })
      .where(eq(properties.id, prop.id));

    updated++;
    if (activeComparables.length > 0) withComparables++;
  }

  return { updated, withComparables };
}

export interface ComparableDetail {
  dataEstimativa: string | null;
  baseCalculo: number;
  finalidadeConstrucao: string;
  logradouro: string;
  nEndereco: string;
  nUnidade: string;
  bairro: string;
  cep: string;
  areaConstrPrivativa: number;
  precoM2: number;
  anoConstrucao: number | null;
  similarityScore: number; // 0-1, how close area is to target (1 = exact)
}

export interface TierResult {
  label: string;
  criteria: string;
  comparables: ComparableDetail[];
  medianPrecoM2: number | null;
  count: number;
}

function buildComparableDetail(
  tx: {
    dataEstimativa: Date | null;
    baseCalculo: string | null;
    finalidadeConstrucao: string | null;
    logradouro: string | null;
    nEndereco: string | null;
    nUnidade: string | null;
    bairro: string | null;
    cep: string | null;
    areaConstrPrivativa: string | null;
    anoConstrucao: number | null;
  },
  propArea: number | null
): ComparableDetail {
  const base = parseFloat(tx.baseCalculo || "0");
  const area = parseFloat(tx.areaConstrPrivativa || "0");
  const similarityScore =
    propArea && area > 0
      ? Math.max(0, 1 - Math.abs(area - propArea) / propArea)
      : 0;
  return {
    dataEstimativa: tx.dataEstimativa ? tx.dataEstimativa.toISOString().split("T")[0] : null,
    baseCalculo: base,
    finalidadeConstrucao: tx.finalidadeConstrucao || "",
    logradouro: tx.logradouro || "",
    nEndereco: tx.nEndereco || "",
    nUnidade: tx.nUnidade || "",
    bairro: tx.bairro || "",
    cep: tx.cep || "",
    areaConstrPrivativa: area,
    precoM2: area > 0 ? Math.round((base / area) * 100) / 100 : 0,
    anoConstrucao: tx.anoConstrucao,
    similarityScore: Math.round(similarityScore * 1000) / 1000,
  };
}

export async function getPropertyComparables(propertyId: number, months: number = 12): Promise<{
  property: {
    id: number;
    cidade: string;
    bairro: string | null;
    tipoImovel: string | null;
    areaPrivativaM2: number | null;
    preco: number | null;
    marketValue: number | null;
    marketValuePerM2: number | null;
  };
  tier1: TierResult;
  tier2: TierResult;
  methodology: {
    usedTier: 1 | 2;
    estimatedValue: number | null;
    estimatedRent: number | null;
    medianPrecoM2: number | null;
  };
} | null> {
  const [prop] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return null;

  const bairroKey = (prop.bairro || "").toUpperCase().trim();
  const itbiTypes = getItbiTypes(prop.tipoImovel || prop.descricao);
  const exactItbiType = itbiTypes[0] ?? null;
  const propArea = prop.areaPrivativaM2
    ? parseFloat(prop.areaPrivativaM2)
    : prop.areaTotalM2
      ? parseFloat(prop.areaTotalM2)
      : null;

  const tier1Months = months;
  const tier2Months = Math.round(months * 1.5);
  const cutoffTier2 = new Date();
  cutoffTier2.setMonth(cutoffTier2.getMonth() - tier2Months);
  const cutoffTier1 = new Date();
  cutoffTier1.setMonth(cutoffTier1.getMonth() - tier1Months);

  const allTx = await db
    .select()
    .from(itbiTransactions)
    .where(
      and(
        gte(itbiTransactions.dataEstimativa, cutoffTier2),
        sql`${itbiTransactions.baseCalculo}::numeric > 10000`,
        sql`${itbiTransactions.areaConstrPrivativa}::numeric > 0`,
        sql`upper(${itbiTransactions.bairro}) = ${bairroKey}`
      )
    );

  // Tier 1 — exact type, area ±25%, within requested months
  const tier1Tx = allTx.filter((tx) => {
    const txTipo = (tx.finalidadeConstrucao || "").toUpperCase();
    if (exactItbiType && txTipo !== exactItbiType) return false;
    if (tx.dataEstimativa && tx.dataEstimativa < cutoffTier1) return false;
    if (propArea && tx.areaConstrPrivativa) {
      const txArea = parseFloat(tx.areaConstrPrivativa);
      if (txArea > 0 && Math.abs(txArea - propArea) / propArea > 0.25) return false;
    }
    return true;
  });

  // Tier 2 — type group, area ±50%, last 18 months
  const tier2Tx = allTx.filter((tx) => {
    const txTipo = (tx.finalidadeConstrucao || "").toUpperCase();
    if (!itbiTypes.includes(txTipo)) return false;
    if (propArea && tx.areaConstrPrivativa) {
      const txArea = parseFloat(tx.areaConstrPrivativa);
      if (txArea > 0 && Math.abs(txArea - propArea) / propArea > 0.5) return false;
    }
    return true;
  });

  function buildAndSortDetails(txList: typeof allTx): ComparableDetail[] {
    return txList
      .map((tx) => buildComparableDetail(tx, propArea))
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }

  const tier1Details = buildAndSortDetails(tier1Tx);
  const tier2Details = buildAndSortDetails(tier2Tx);

  const tier1Prices = tier1Details.map((d) => d.precoM2).filter((v) => v > 0);
  const tier2Prices = tier2Details.map((d) => d.precoM2).filter((v) => v > 0);
  const tier1Median = median(tier1Prices);
  const tier2Median = median(tier2Prices);

  const usedTier: 1 | 2 = tier1Details.length >= 3 ? 1 : 2;
  const activeMedian = usedTier === 1 ? tier1Median : tier2Median;
  const estimatedValue = activeMedian && propArea ? activeMedian * propArea : null;
  const estimatedRent = estimatedValue ? estimatedValue * 0.005 : null;

  return {
    property: {
      id: prop.id,
      cidade: prop.cidade,
      bairro: prop.bairro,
      tipoImovel: prop.tipoImovel,
      areaPrivativaM2: propArea,
      preco: prop.preco ? parseFloat(prop.preco) : null,
      marketValue: prop.marketValue ? parseFloat(prop.marketValue) : null,
      marketValuePerM2: prop.marketValuePerM2 ? parseFloat(prop.marketValuePerM2) : null,
    },
    tier1: {
      label: "Imóveis muito similares",
      criteria: `mesmo bairro, mesmo tipo, área ±25%, últimos ${tier1Months} meses`,
      comparables: tier1Details,
      medianPrecoM2: tier1Median ? Math.round(tier1Median) : null,
      count: tier1Details.length,
    },
    tier2: {
      label: "Imóveis no bairro",
      criteria: `mesmo bairro, tipo similar, área ±50%, últimos ${tier2Months} meses`,
      comparables: tier2Details,
      medianPrecoM2: tier2Median ? Math.round(tier2Median) : null,
      count: tier2Details.length,
    },
    methodology: {
      usedTier,
      estimatedValue: estimatedValue ? Math.round(estimatedValue) : null,
      estimatedRent: estimatedRent ? Math.round(estimatedRent) : null,
      medianPrecoM2: activeMedian ? Math.round(activeMedian) : null,
    },
  };
}
