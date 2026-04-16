import { db } from "@/lib/db";
import { properties, priceHistory, pipelineRuns } from "@/lib/db/schema";
import { eq, sql, isNull, notInArray } from "drizzle-orm";
import { downloadCSV } from "./download-csv";
import { parseCSV } from "./parse-csv";
import { runDataQualityChecks } from "./data-quality";

export interface PipelineResult {
  total: number;
  new: number;
  updated: number;
  removed: number;
  priceChanges: number;
  errors: string[];
}

export async function runPipeline(uf: string = "RS"): Promise<PipelineResult> {
  const ufUpper = uf.toUpperCase();
  const startedAt = new Date();
  const result: PipelineResult = {
    total: 0,
    new: 0,
    updated: 0,
    removed: 0,
    priceChanges: 0,
    errors: [],
  };

  // Log the run
  const [run] = await db
    .insert(pipelineRuns)
    .values({ startedAt, status: "running" })
    .returning({ id: pipelineRuns.id });

  try {
    // 1. Download CSV
    const csvText = await downloadCSV(ufUpper);

    // 2. Parse
    const parsed = parseCSV(csvText, ufUpper);
    result.total = parsed.length;

    if (parsed.length === 0) {
      throw new Error("CSV parsed with 0 properties — aborting");
    }

    // 3. Upsert each property
    const seenIds: string[] = [];

    for (const p of parsed) {
      seenIds.push(p.caixaId);

      try {
        const existing = await db
          .select({
            id: properties.id,
            preco: properties.preco,
            desconto: properties.desconto,
          })
          .from(properties)
          .where(eq(properties.caixaId, p.caixaId))
          .limit(1);

        if (existing.length === 0) {
          // New property
          await db.insert(properties).values({
            caixaId: p.caixaId,
            uf: p.uf,
            cidade: p.cidade,
            bairro: p.bairro || null,
            endereco: p.endereco || null,
            descricao: p.descricao || null,
            preco: p.preco?.toString() ?? null,
            valorAvaliacao: p.valorAvaliacao?.toString() ?? null,
            desconto: p.desconto?.toString() ?? null,
            modalidadeVenda: p.modalidadeVenda || null,
            linkCaixa: p.linkCaixa || null,
            aceitaFinanciamento: p.aceitaFinanciamento,
          });
          result.new++;
        } else {
          // Update existing
          const row = existing[0];
          const oldPreco = row.preco ? parseFloat(row.preco) : null;
          const newPreco = p.preco;

          // Track price changes
          if (oldPreco !== null && newPreco !== null && oldPreco !== newPreco) {
            await db.insert(priceHistory).values({
              propertyId: row.id,
              preco: newPreco.toString(),
              desconto: p.desconto?.toString() ?? null,
            });
            result.priceChanges++;
          }

          // Only update fields that may change; always touch lastSeenAt
          const updateSet: Record<string, unknown> = {
            lastSeenAt: new Date(),
            removedAt: null, // Mark as active again if it was removed
          };

          // Check if any field actually changed before setting updatedAt
          const oldDesc = row.desconto ? parseFloat(row.desconto) : null;
          const newDesc = p.desconto;
          const dataChanged =
            oldPreco !== newPreco ||
            oldDesc !== newDesc ||
            row.preco !== (p.preco?.toString() ?? null);

          if (dataChanged) {
            updateSet.preco = p.preco?.toString() ?? null;
            updateSet.valorAvaliacao = p.valorAvaliacao?.toString() ?? null;
            updateSet.desconto = p.desconto?.toString() ?? null;
            updateSet.modalidadeVenda = p.modalidadeVenda || null;
            updateSet.linkCaixa = p.linkCaixa || null;
            updateSet.aceitaFinanciamento = p.aceitaFinanciamento;
            updateSet.updatedAt = new Date();
            result.updated++;
          }

          await db
            .update(properties)
            .set(updateSet)
            .where(eq(properties.caixaId, p.caixaId));
        }
      } catch (err) {
        result.errors.push(
          `Error upserting ${p.caixaId}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    // 4. Run data quality checks on all active properties
    try {
      await runDataQualityChecks();
    } catch (err) {
      result.errors.push(
        `Data quality check error: ${err instanceof Error ? err.message : String(err)}`
      );
    }

    // 5. Mark removals — properties not in today's CSV (scoped to current UF)
    if (seenIds.length > 0) {
      await db
        .update(properties)
        .set({ removedAt: new Date() })
        .where(
          sql`${properties.caixaId} NOT IN (${sql.join(
            seenIds.map((id) => sql`${id}`),
            sql`, `
          )}) AND ${properties.removedAt} IS NULL AND ${properties.uf} = ${ufUpper}`
        );
    }

    // Update run log
    await db
      .update(pipelineRuns)
      .set({
        completedAt: new Date(),
        status: "success",
        propertiesTotal: result.total,
        propertiesNew: result.new,
        propertiesRemoved: result.removed,
        priceChanges: result.priceChanges,
        errors: result.errors.length > 0 ? result.errors.join("\n") : null,
      })
      .where(eq(pipelineRuns.id, run.id));
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    result.errors.push(errMsg);

    await db
      .update(pipelineRuns)
      .set({
        completedAt: new Date(),
        status: "failed",
        errors: errMsg,
      })
      .where(eq(pipelineRuns.id, run.id));

    throw err;
  }

  return result;
}
