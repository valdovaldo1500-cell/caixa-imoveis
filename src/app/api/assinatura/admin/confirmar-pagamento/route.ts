import { NextResponse, type NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import { PRECOS, type Plano } from "@/lib/assinatura";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Confirmação MANUAL de pagamento via PagBank Payment Link (provedor
 * `pagseguro_link` — ver `src/lib/pagamento/pagseguro-link.ts`). Mesmo
 * desenho do Crime Brasil (`/relatorio`): esse link hospedado no PagBank não
 * manda webhook pra essa conta, então o admin confere o pagamento no
 * histórico de pedidos do PagBank (minhaconta.pagseguro.uol.com.br), casa
 * pelo e-mail do comprador e confirma aqui. Ver
 * `GET /api/assinatura/admin/pendentes` pra listar quem está aguardando.
 *
 * Protegido pelo MESMO padrão de token dos outros endpoints de operação do
 * projeto (ver `src/app/api/assinatura/alertas/disparar/route.ts`):
 * `Authorization: Bearer ${PIPELINE_TOKEN}`. `src/proxy.ts` libera TODO
 * `/api/assinatura/*` sem checar sessão de operador — a checagem do token
 * é feita inteiramente aqui dentro, nunca herdada do proxy.
 *
 * Idempotência: mesmo padrão do webhook (`src/app/api/assinatura/webhook/route.ts`)
 * — SELECT antes do INSERT + catch de `23505` (violação de unique), com a
 * constraint `uniq_cobrancas_evento (provedor, provedor_evento_id)` como
 * backstop de banco contra corrida entre duas confirmações simultâneas. A
 * chave de idempotência é `assinantes.provedor_assinatura_id` (setado a
 * cada tentativa de checkout em `provedorPagSeguroLink.iniciarAssinatura`)
 * — confirmar a MESMA tentativa pendente duas vezes não credita duas vezes;
 * se o assinante tentar pagar de novo depois (nova tentativa = novo id),
 * uma confirmação seguinte credita normalmente.
 */
export async function POST(request: NextRequest) {
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const authHeader = request.headers.get("authorization");
  if (!PIPELINE_TOKEN || authHeader !== `Bearer ${PIPELINE_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const plano = body.plano as Plano | undefined;
  // Opcional — só para auditoria (não é chave de idempotência, ver acima).
  const provedorTransacaoId = body.provedorTransacaoId ? String(body.provedorTransacaoId).slice(0, 80) : null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  if (plano !== "mensal" && plano !== "anual") {
    return NextResponse.json({ error: "Plano inválido — use 'mensal' ou 'anual'" }, { status: 400 });
  }

  const [assinante] = await db
    .select({
      id: assinantes.id,
      plano: assinantes.plano,
      status: assinantes.status,
      provedor: assinantes.provedor,
      provedorAssinaturaId: assinantes.provedorAssinaturaId,
      validoAte: assinantes.validoAte,
    })
    .from(assinantes)
    .where(eq(assinantes.email, email))
    .limit(1);

  if (!assinante) {
    return NextResponse.json({ error: "Nenhum assinante com esse e-mail" }, { status: 404 });
  }
  if (assinante.provedor !== "pagseguro_link" || !assinante.provedorAssinaturaId) {
    return NextResponse.json(
      { error: "Assinante não tem um checkout pagseguro_link pendente para confirmar" },
      { status: 409 }
    );
  }
  if (assinante.plano !== plano) {
    return NextResponse.json(
      { error: `O plano pendente do assinante é '${assinante.plano}', não '${plano}' — confira antes de confirmar` },
      { status: 409 }
    );
  }

  const provedorEventoId = `${assinante.provedorAssinaturaId}_confirmado`;

  const [jaConfirmado] = await db
    .select({ id: cobrancas.id })
    .from(cobrancas)
    .where(and(eq(cobrancas.provedor, "pagseguro_link"), eq(cobrancas.provedorEventoId, provedorEventoId)))
    .limit(1);

  if (jaConfirmado) {
    return NextResponse.json({ success: true, ignorado: "pagamento já confirmado antes" });
  }

  const valorReais = PRECOS[plano].valor;
  try {
    await db.insert(cobrancas).values({
      assinanteId: assinante.id,
      provedor: "pagseguro_link",
      provedorEventoId,
      tipo: "pagamento_confirmado",
      valor: valorReais.toString(),
      status: "pago",
      payload: { plano, confirmadoManualmentePor: "admin", provedorTransacaoId },
    });
  } catch (err) {
    // 23505 = unique_violation — mesma proteção do índice `uniq_cobrancas_evento`,
    // pega numa corrida que o SELECT acima não viu a tempo.
    if ((err as { code?: string } | null)?.code === "23505") {
      return NextResponse.json({ success: true, ignorado: "pagamento já confirmado antes (corrida)" });
    }
    throw err;
  }

  // Renovação MANUAL: o assinante costuma pagar de novo ANTES de vencer.
  // Contar sempre a partir de agora queimaria os dias que ele já pagou —
  // por isso o novo período parte do que for MAIOR entre hoje e o
  // `validoAte` atual (o mesmo que um gateway recorrente faria sozinho).
  const dias = plano === "anual" ? 365 : 30;
  const base = assinante.validoAte && assinante.validoAte > new Date() ? assinante.validoAte : new Date();
  const validoAte = new Date(base.getTime() + dias * 24 * 60 * 60 * 1000);
  await db.update(assinantes).set({ status: "ativa", validoAte }).where(eq(assinantes.id, assinante.id));

  return NextResponse.json({ success: true, assinanteId: assinante.id, plano, validoAte });
}
