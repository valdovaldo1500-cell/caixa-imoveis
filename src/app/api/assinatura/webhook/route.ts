import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import { interpretarWebhookPagBank, validarAssinaturaWebhookPagBank } from "@/lib/pagamento/pagbank";

/**
 * Webhook de cobrança. Entende DOIS formatos de payload, cada um com seu
 * próprio esquema de autenticidade — nunca o mesmo segredo genérico pros
 * dois:
 *
 *  - `demo` (ver `src/lib/assinatura.ts`): payload
 *    `{ provedor, provedorEventoId, tipo, status, valor?, provedorAssinaturaId? }`,
 *    protegido por segredo compartilhado simples (`x-webhook-secret` ===
 *    `WEBHOOK_ASSINATURA_SECRET`) — suficiente pro demo, que nunca cobra de
 *    verdade.
 *  - `pagbank` (ver `src/lib/pagamento/pagbank.ts`): três formatos de
 *    payload diferentes do próprio PagBank (status de Checkout, de
 *    pedido/cobrança, ou evento `subscription.*`), normalizados por
 *    `interpretarWebhookPagBank`. Autenticidade validada com o esquema real
 *    do PagBank: `x-authenticity-token` = SHA256("{token da conta}-{corpo
 *    bruto}") — por isso lemos o corpo como texto (`request.text()`) ANTES
 *    de fazer `JSON.parse`, e usamos essa mesma string exata na validação
 *    (reformatar o JSON muda o hash).
 *
 * Idempotência: além do índice único parcial `uniq_cobrancas_evento`
 * (provedor, provedor_evento_id) no banco — que é o backstop contra corrida
 * entre duas notificações simultâneas — fazemos um SELECT antes do INSERT
 * (mesmo padrão dos dois ramos) para o caso comum (reenvio não-simultâneo,
 * que TODO provedor faz quando não recebe 200 rápido).
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const eventoPagBank = interpretarWebhookPagBank(body);
  if (eventoPagBank) {
    return processarWebhookPagBank(request, rawBody, body as Record<string, unknown>, eventoPagBank);
  }

  return processarWebhookDemo(request, body as Record<string, unknown>);
}

async function processarWebhookDemo(request: Request, body: Record<string, unknown>) {
  const secretEsperado = process.env.WEBHOOK_ASSINATURA_SECRET;
  if (secretEsperado) {
    const recebido = request.headers.get("x-webhook-secret");
    if (recebido !== secretEsperado) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Sem WEBHOOK_ASSINATURA_SECRET configurado, esta rota aceitaria
    // {assinanteId, tipo:"pagamento_confirmado", status:"pago"} de QUALQUER
    // origem sem autenticação — liberaria plano pago de graça (ou cancelaria
    // assinatura de terceiro) para qualquer assinanteId adivinhado. Recusa
    // fechado em produção em vez de degradar para "sem checagem".
    return NextResponse.json({ error: "Webhook não configurado" }, { status: 503 });
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

  if (!(await gravarCobrancaIdempotente({ assinanteId, provedor, provedorEventoId, tipo, valor, status, payload: body }))) {
    return NextResponse.json({ success: true, ignorado: "evento já processado (corrida)" });
  }

  if (assinanteId) {
    if (tipo === "pagamento_confirmado" && status === "pago") {
      const plano = body.plano === "anual" ? "anual" : "mensal";
      const dias = plano === "anual" ? 365 : 30;
      const validoAte = new Date(Date.now() + dias * 24 * 60 * 60 * 1000);
      await db.update(assinantes).set({ status: "ativa", validoAte }).where(eq(assinantes.id, assinanteId));
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

async function processarWebhookPagBank(
  request: Request,
  rawBody: string,
  body: Record<string, unknown>,
  evento: NonNullable<ReturnType<typeof interpretarWebhookPagBank>>
) {
  const header = request.headers.get("x-authenticity-token");
  if (!validarAssinaturaWebhookPagBank(rawBody, header)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Resolve o assinante: primeiro pelo `reference_id` que nós mesmos demos
  // ao criar o checkout (`o6-<assinanteId>-<plano>`); se o evento não trouxer
  // isso (ciclos seguintes de uma assinatura já reconciliada), pelo
  // `provedorAssinaturaId` já gravado em `assinantes` num evento anterior.
  let assinanteId = evento.assinanteIdReferenciado;
  if (!assinanteId && evento.provedorAssinaturaId) {
    const [encontrado] = await db
      .select({ id: assinantes.id })
      .from(assinantes)
      .where(eq(assinantes.provedorAssinaturaId, evento.provedorAssinaturaId))
      .limit(1);
    assinanteId = encontrado?.id ?? null;
  }

  const inserido = await gravarCobrancaIdempotente({
    assinanteId,
    provedor: "pagbank",
    provedorEventoId: evento.provedorEventoId,
    tipo: evento.tipo,
    valor: evento.valor,
    status: evento.statusBruto,
    payload: body,
  });
  if (!inserido) {
    return NextResponse.json({ success: true, ignorado: "evento já processado" });
  }

  if (assinanteId) {
    const [assinante] = await db
      .select({ plano: assinantes.plano, provedorAssinaturaId: assinantes.provedorAssinaturaId })
      .from(assinantes)
      .where(eq(assinantes.id, assinanteId))
      .limit(1);

    // Primeira vez que aprendemos o SUBS_id real (o checkout criou a
    // assinatura só depois do primeiro pagamento) — grava pra eventos
    // seguintes conseguirem resolver o assinante direto por
    // `provedorAssinaturaId`, sem depender do `reference_id`.
    if (
      evento.provedorAssinaturaId &&
      evento.provedorAssinaturaId.startsWith("SUBS_") &&
      assinante?.provedorAssinaturaId !== evento.provedorAssinaturaId
    ) {
      await db
        .update(assinantes)
        .set({ provedorAssinaturaId: evento.provedorAssinaturaId })
        .where(eq(assinantes.id, assinanteId));
    }

    const plano = evento.planoReferenciado || assinante?.plano || "mensal";
    if (evento.tipo === "pagamento_confirmado") {
      const dias = plano === "anual" ? 365 : 30;
      const validoAte = new Date(Date.now() + dias * 24 * 60 * 60 * 1000);
      await db.update(assinantes).set({ status: "ativa", validoAte }).where(eq(assinantes.id, assinanteId));
    } else if (evento.tipo === "pagamento_recusado") {
      await db.update(assinantes).set({ status: "inadimplente" }).where(eq(assinantes.id, assinanteId));
    } else if (evento.tipo === "assinatura_cancelada" || evento.tipo === "assinatura_expirada") {
      // Schema não tem estado "expirada" — trata como cancelamento (mesma
      // regra de `podeVer`: acesso até `validoAte`, sem renovação).
      await db
        .update(assinantes)
        .set({ status: "cancelada", canceladoEm: new Date() })
        .where(eq(assinantes.id, assinanteId));
    }
  }

  return NextResponse.json({ success: true });
}

type NovaCobranca = {
  assinanteId: number | null;
  provedor: string;
  provedorEventoId: string | null;
  tipo: string;
  valor: number | null;
  status: string | null;
  payload: unknown;
};

/**
 * Grava a cobrança de forma idempotente. Devolve `false` (e não grava nada)
 * se o evento já tiver sido processado — seja porque o SELECT prévio achou,
 * seja porque o INSERT esbarrou na constraint única `uniq_cobrancas_evento`
 * (corrida entre duas notificações simultâneas do mesmo evento).
 */
async function gravarCobrancaIdempotente(c: NovaCobranca): Promise<boolean> {
  if (c.provedorEventoId) {
    const [jaProcessado] = await db
      .select({ id: cobrancas.id })
      .from(cobrancas)
      .where(and(eq(cobrancas.provedor, c.provedor), eq(cobrancas.provedorEventoId, c.provedorEventoId)))
      .limit(1);
    if (jaProcessado) return false;
  }

  try {
    await db.insert(cobrancas).values({
      assinanteId: c.assinanteId,
      provedor: c.provedor,
      provedorEventoId: c.provedorEventoId,
      tipo: c.tipo,
      valor: c.valor != null && Number.isFinite(c.valor) ? c.valor.toString() : null,
      status: c.status,
      payload: c.payload,
    });
    return true;
  } catch (err) {
    // 23505 = unique_violation — a mesma proteção do índice parcial
    // `uniq_cobrancas_evento`, mas pego numa corrida que o SELECT acima não
    // viu a tempo.
    if ((err as { code?: string } | null)?.code === "23505") return false;
    throw err;
  }
}
