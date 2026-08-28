import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";

/**
 * Webhook de cobrança. Hoje só entende o payload do provedor `demo`
 * (ver `src/lib/assinatura.ts`) e protege com um segredo compartilhado
 * simples via header `x-webhook-secret` — NÃO é o esquema de assinatura de
 * nenhum gateway real:
 *   - PagBank manda um header de notificação que exige uma consulta de
 *     confirmação de volta à API deles (não dá pra confiar só no payload).
 *   - Mercado Pago assina com HMAC-SHA256 num header `x-signature`.
 * Antes de apontar um provedor de verdade para esta rota, trocar a
 * verificação abaixo pela do provedor escolhido.
 *
 * Formato esperado (demo):
 * { provedor, provedorEventoId, tipo, status, valor?, provedorAssinaturaId? }
 * tipo: "pagamento_confirmado" | "pagamento_falhou" | "cancelamento"
 */
export async function POST(request: Request) {
  const secretEsperado = process.env.WEBHOOK_ASSINATURA_SECRET;
  if (secretEsperado) {
    const recebido = request.headers.get("x-webhook-secret");
    if (recebido !== secretEsperado) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const provedor = String(body.provedor || "demo");
  const provedorEventoId = body.provedorEventoId ? String(body.provedorEventoId) : null;
  const tipo = String(body.tipo || "");
  const status = body.status ? String(body.status) : null;
  const valor = body.valor != null ? Number(body.valor) : null;
  const provedorAssinaturaId = body.provedorAssinaturaId ? String(body.provedorAssinaturaId) : null;

  // Idempotência: provedor pode reenviar o mesmo evento.
  if (provedorEventoId) {
    const [jaProcessado] = await db
      .select({ id: cobrancas.id })
      .from(cobrancas)
      .where(and(eq(cobrancas.provedor, provedor), eq(cobrancas.provedorEventoId, provedorEventoId)))
      .limit(1);
    if (jaProcessado) {
      return NextResponse.json({ success: true, ignorado: "evento já processado" });
    }
  }

  // Resolve o assinante pelo id da assinatura no provedor.
  let assinanteId: number | null = body.assinanteId ? Number(body.assinanteId) : null;
  if (!assinanteId && provedorAssinaturaId) {
    const [encontrado] = await db
      .select({ id: assinantes.id })
      .from(assinantes)
      .where(eq(assinantes.provedorAssinaturaId, provedorAssinaturaId))
      .limit(1);
    assinanteId = encontrado?.id ?? null;
  }

  await db.insert(cobrancas).values({
    assinanteId,
    provedor,
    provedorEventoId,
    tipo,
    valor: valor != null && Number.isFinite(valor) ? valor.toString() : null,
    status,
    payload: body,
  });

  if (assinanteId) {
    if (tipo === "pagamento_confirmado" && status === "pago") {
      const plano = body.plano === "anual" ? "anual" : "mensal";
      const dias = plano === "anual" ? 365 : 30;
      const validoAte = new Date(Date.now() + dias * 24 * 60 * 60 * 1000);
      await db
        .update(assinantes)
        .set({ status: "ativa", validoAte })
        .where(eq(assinantes.id, assinanteId));
    } else if (tipo === "pagamento_falhou") {
      await db.update(assinantes).set({ status: "inadimplente" }).where(eq(assinantes.id, assinanteId));
    } else if (tipo === "cancelamento") {
      await db
        .update(assinantes)
        .set({ status: "cancelada", canceladoEm: new Date() })
        .where(eq(assinantes.id, assinanteId));
    }
  }

  return NextResponse.json({ success: true });
}
