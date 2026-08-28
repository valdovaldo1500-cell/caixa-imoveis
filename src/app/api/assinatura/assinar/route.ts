import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes } from "@/lib/db/schema";
import { getAssinanteIdFromRequest, getProvedorPagamento, type Plano } from "@/lib/assinatura";

/**
 * Inicia uma assinatura. Provedor decidido por env
 * (`PAGAMENTO_PROVEDOR=pagbank|demo`, ver `src/lib/assinatura.ts`):
 *  - `demo` NUNCA cobra — só marca `assinantes.status = 'pendente'` e grava a
 *    intenção em `cobrancas`.
 *  - `pagbank` cria um checkout de verdade (`src/lib/pagamento/pagbank.ts`)
 *    e devolve a URL da página hospedada do PagBank pra redirecionar o
 *    assinante — é lá que o cartão é digitado, nunca no nosso servidor.
 */
export async function POST(request: Request) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const plano = body?.plano as Plano | undefined;
  if (plano !== "mensal" && plano !== "anual") {
    return NextResponse.json({ error: "Plano inválido — use 'mensal' ou 'anual'" }, { status: 400 });
  }

  const [assinante] = await db
    .select({ id: assinantes.id, email: assinantes.email, nome: assinantes.nome })
    .from(assinantes)
    .where(eq(assinantes.id, assinanteId))
    .limit(1);

  if (!assinante) {
    return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 });
  }

  const provedor = getProvedorPagamento();
  const resultado = await provedor.iniciarAssinatura({
    assinanteId: assinante.id,
    email: assinante.email,
    nome: assinante.nome,
    plano,
  });

  if (!resultado.ok) {
    return NextResponse.json({ error: resultado.erro }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    status: "pendente",
    checkoutUrl: resultado.checkoutUrl,
    aviso: "Provedor demo — nenhuma cobrança real foi processada.",
  });
}
