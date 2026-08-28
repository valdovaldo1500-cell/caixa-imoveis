import { NextResponse, type NextRequest } from "next/server";
import { dispararAlertas } from "@/lib/alertas-disparo";

/**
 * Disparo dos alertas por e-mail (O6).
 *
 * Acionado pelo mesmo mecanismo dos outros endpoints de pipeline: header
 * `Authorization: Bearer ${PIPELINE_TOKEN}`. A diferença é que `src/proxy.ts`
 * libera TODO `/api/assinatura/*` sem checar token (é onde vive o cadastro
 * público) — então a validação do token acontece aqui dentro, e não é
 * herdada do proxy.
 *
 * `?dry_run=1` calcula tudo e não manda nenhum e-mail nem grava
 * `ultimoEnvioEm` — serve para conferir antes de ligar de verdade.
 */
export async function POST(request: NextRequest) {
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const authHeader = request.headers.get("authorization");
  if (!PIPELINE_TOKEN || authHeader !== `Bearer ${PIPELINE_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get("dry_run") === "1";

  try {
    const resultado = await dispararAlertas({ dryRun });
    return NextResponse.json(resultado);
  } catch (err) {
    console.error("[alertas/disparar] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
