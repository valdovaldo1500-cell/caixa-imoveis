import { NextResponse, type NextRequest } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import { PRECOS } from "@/lib/assinatura";

/**
 * Lista quem está com pagamento `pagseguro_link` pendente de confirmação —
 * ferramenta de OPERAÇÃO, sem UI: roda via `curl` enquanto o admin confere o
 * histórico de pedidos no painel do PagBank. Dar baixa em
 * `POST /api/assinatura/admin/confirmar-pagamento`.
 *
 * `solicitadoEm` vem da cobrança "assinatura_iniciada" ligada à tentativa de
 * checkout ATUAL do assinante (join por `provedor_evento_id` ==
 * `assinantes.provedor_assinatura_id`) — é a data em que ele clicou em
 * "Assinar", não a data de criação da conta.
 *
 * Mesmo padrão de token dos outros endpoints de operação do projeto (ver
 * `src/app/api/assinatura/alertas/disparar/route.ts`):
 * `Authorization: Bearer ${PIPELINE_TOKEN}`. `src/proxy.ts` libera TODO
 * `/api/assinatura/*` sem checar sessão de operador — a checagem do token é
 * feita inteiramente aqui dentro.
 */
export async function GET(request: NextRequest) {
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const authHeader = request.headers.get("authorization");
  if (!PIPELINE_TOKEN || authHeader !== `Bearer ${PIPELINE_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const linhas = await db
    .select({
      email: assinantes.email,
      nome: assinantes.nome,
      plano: assinantes.plano,
      solicitadoEm: cobrancas.criadoEm,
    })
    .from(assinantes)
    .innerJoin(
      cobrancas,
      and(
        eq(cobrancas.assinanteId, assinantes.id),
        eq(cobrancas.provedor, "pagseguro_link"),
        eq(cobrancas.provedorEventoId, assinantes.provedorAssinaturaId)
      )
    )
    .where(and(eq(assinantes.status, "pendente"), eq(assinantes.provedor, "pagseguro_link")))
    .orderBy(desc(cobrancas.criadoEm));

  const pendentes = linhas.map((l) => ({
    email: l.email,
    nome: l.nome,
    plano: l.plano,
    valor: l.plano === "anual" ? PRECOS.anual.valor : PRECOS.mensal.valor,
    solicitadoEm: l.solicitadoEm,
  }));

  return NextResponse.json({ total: pendentes.length, pendentes });
}
