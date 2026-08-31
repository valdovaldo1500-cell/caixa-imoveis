import { NextRequest, NextResponse } from "next/server";
import { coletarEditalBatch } from "@/pipeline/scrape-edital";

let isRunning = false;

/**
 * Rastreador de edital (O6, requisito #7). Chamado pelo pipeline diário
 * (`~/scripts/caixa-daily-pipeline.sh`) — incremental, ver `scrape-edital.ts`
 * para o critério de elegibilidade (`edital_atualizado_em`).
 *
 * ?limit=N (padrão 200, teto 500 — mesma ordem de grandeza do
 * /api/pipeline/scrape existente) e ?staleDays=N (padrão 21).
 */
export async function POST(req: NextRequest) {
  if (isRunning) {
    return NextResponse.json({ error: "Coleta de edital já está executando" }, { status: 409 });
  }

  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10)), 500) : 200;
  const staleDaysParam = searchParams.get("staleDays");
  const staleDays = staleDaysParam ? Math.max(1, parseInt(staleDaysParam, 10)) : 21;

  isRunning = true;
  try {
    const result = await coletarEditalBatch(limit, staleDays);
    // abortado conta como "error" pra o pipeline sinalizar no e-mail de
    // resumo (grep -qi '"error"' já existente no shell script), mas os
    // dados bons de quem já foi processado antes do aborto continuam salvos.
    if (result.abortado) {
      return NextResponse.json({ ...result, error: result.motivoAborto }, { status: 200 });
    }
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
