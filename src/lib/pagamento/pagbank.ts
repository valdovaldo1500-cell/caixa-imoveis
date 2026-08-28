/**
 * Adaptador PagBank/PagSeguro — cobrança RECORRENTE de verdade para a
 * assinatura do agregador de leilão (O6).
 *
 * Duas superfícies de API do PagBank estão em jogo, com credenciais e hosts
 * DIFERENTES — misturar as duas é o erro mais fácil de cometer aqui:
 *
 *  1. Checkout PagBank (`api.pagseguro.com`) — a MESMA API que o Crime Brasil
 *     já usa para pagamento avulso hoje (ver `PAGSEGURO_*` em
 *     `crime-map-main/backend/main.py`), com o MESMO token de conta
 *     (`PAGSEGURO_API_TOKEN`). `POST /checkouts` aceita um objeto
 *     `recurrence_plan` INLINE (nome, intervalo, ciclos) — não existe um
 *     `plan.id` pré-cadastrado nesse fluxo, o plano nasce junto com o
 *     checkout. A resposta traz um link `rel: "PAY"`, que é a página
 *     hospedada do PagBank onde o assinante digita nome/CPF/cartão — o
 *     produto NUNCA vê nem guarda esse dado. É esse link que vira
 *     `checkoutUrl`. Usado aqui só para CRIAR a assinatura.
 *
 *  2. API de Pagamento Recorrente / "Assinaturas" (`api.assinaturas.pagseguro.com`)
 *     — um PRODUTO SEPARADO do PagBank, com painel de login próprio
 *     (https://assinaturas.pagbank.com.br/) e TOKEN PRÓPRIO — diferente do
 *     `PAGSEGURO_API_TOKEN` e diferente por ambiente (sandbox × produção).
 *     Ver https://developer.pagbank.com.br/reference/autenticacao-assinaturas.
 *     Essa API é quem expõe `PUT /subscriptions/{id}/cancel`, usada aqui em
 *     `cancelarAssinatura`, e quem dispara os webhooks de ciclo de vida da
 *     assinatura (`subscription.recurrence|canceled|expired|...`) — ver
 *     `interpretarWebhookPagBank` abaixo.
 *
 * IMPORTANTE — habilitação de conta, não só técnica: segundo a doc oficial
 * (autenticacao-assinaturas), usar a API de Pagamento Recorrente exige (a)
 * conta Pessoa Jurídica tipo Vendedor e (b) o dono logar em
 * assinaturas.pagbank.com.br (produção) ou assinaturas.sandbox.pagbank.com.br
 * (sandbox) e concluir o primeiro acesso, que "autoriza o Pagamento
 * Recorrente PagBank a gerar cobranças" — só depois disso existe o token de
 * `PAGSEGURO_ASSINATURAS_TOKEN`. Sem isso, `iniciarAssinatura` (que só usa o
 * token de Checkout já existente) pode funcionar, mas `cancelarAssinatura`
 * falha explicitamente (ver função abaixo) até essa habilitação existir.
 *
 * Variáveis de ambiente novas (nenhum valor cravado no código):
 *  - PAGSEGURO_API_TOKEN            (já existe, reaproveitado) — Bearer para
 *    `POST /checkouts` (criação da assinatura).
 *  - PAGSEGURO_ASSINATURAS_TOKEN    (NOVA) — Bearer para
 *    `api.assinaturas.pagseguro.com` (cancelamento). Sem isso,
 *    `cancelarAssinatura` recusa com erro explicando o que falta — nunca
 *    finge sucesso.
 *  - PAGSEGURO_API_BASE             (NOVA, opcional) — default
 *    `https://api.pagseguro.com`; trocar para
 *    `https://sandbox.api.pagseguro.com` em teste.
 *  - PAGSEGURO_ASSINATURAS_API_BASE (NOVA, opcional) — default
 *    `https://api.assinaturas.pagseguro.com`; sandbox:
 *    `https://sandbox.api.assinaturas.pagseguro.com`.
 *  - PAGSEGURO_RETURN_URL           (NOVA, opcional) — para onde o PagBank
 *    redireciona o assinante ao concluir/cancelar o pagamento na página
 *    hospedada. Default: `${NEXT_PUBLIC_SITE_URL}/conta`.
 *  - PAGSEGURO_PLANO_MENSAL_NOME / PAGSEGURO_PLANO_ANUAL_NOME (NOVAS,
 *    opcionais) — rótulo do plano mostrado no painel do PagBank (não existe
 *    id de plano pré-cadastrado nesse fluxo — ver ponto 1 acima — então o
 *    "mapeamento de plano" possível aqui é o nome/intervalo, via env, nunca
 *    hardcoded).
 *  - NEXT_PUBLIC_SITE_URL (já existe no projeto) — usada para montar a
 *    `notification_urls` do checkout (URL do nosso webhook).
 *
 * Validação de webhook: PagBank não assina com HMAC num header dedicado —
 * a autenticidade é `SHA256("{token da conta}-{corpo bruto exato}")`
 * comparado ao header `x-authenticity-token`
 * (https://developer.pagbank.com.br/reference/confirmar-autenticidade-da-notificacao).
 * Testamos contra os dois tokens conhecidos (Checkout e Assinaturas) porque
 * a doc não deixa 100% explícito qual token assina os eventos
 * `subscription.*` (eles saem de um host/serviço diferente do Checkout) —
 * ver aviso no relatório final sobre validar isso com um webhook real antes
 * de ligar em produção.
 */

import { createHash, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import {
  PRECOS,
  type ProvedorPagamento,
  type IniciarAssinaturaResultado,
} from "@/lib/assinatura";

const API_BASE = (process.env.PAGSEGURO_API_BASE || "https://api.pagseguro.com").replace(/\/+$/, "");
const ASSINATURAS_API_BASE = (
  process.env.PAGSEGURO_ASSINATURAS_API_BASE || "https://api.assinaturas.pagseguro.com"
).replace(/\/+$/, "");
const API_TOKEN = process.env.PAGSEGURO_API_TOKEN || "";
const ASSINATURAS_TOKEN = process.env.PAGSEGURO_ASSINATURAS_TOKEN || "";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");
const RETURN_URL = process.env.PAGSEGURO_RETURN_URL || `${SITE_URL}/conta`;
const NOME_PLANO_MENSAL = process.env.PAGSEGURO_PLANO_MENSAL_NOME || "Assinatura mensal — Agregador de leilões";
const NOME_PLANO_ANUAL = process.env.PAGSEGURO_PLANO_ANUAL_NOME || "Assinatura anual — Agregador de leilões";

/** Só existe conversão de reais → centavos NESTE lugar — o PagBank sempre espera centavos. */
function paraCentavos(valorReais: number): number {
  return Math.round(valorReais * 100);
}

/** `true` só quando há credencial mínima para o Checkout — condição de "carregar" o provedor real. */
export function pagbankConfigurado(): boolean {
  return API_TOKEN.length > 0;
}

function referenceIdAssinatura(assinanteId: number, plano: string): string {
  return `o6-${assinanteId}-${plano}`;
}

const REFERENCE_ID_RE = /^o6-(\d+)-(mensal|anual)$/;

/** Compara hex de tamanho variável com segurança (sem early-return por tamanho diferente = leak de timing). */
function hexEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length === 0 || bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * `x-authenticity-token` = SHA256("{token}-{corpo bruto}"). `rawBody` TEM
 * que ser a string exata recebida (sem re-serializar) — qualquer espaço a
 * mais já quebra o hash, conforme a doc do PagBank.
 */
export function validarAssinaturaWebhookPagBank(rawBody: string, header: string | null): boolean {
  if (!header) return false;
  const candidatos = [API_TOKEN, ASSINATURAS_TOKEN].filter((t) => t.length > 0);
  for (const token of candidatos) {
    const hash = createHash("sha256").update(`${token}-${rawBody}`).digest("hex");
    if (hexEquals(hash, header)) return true;
  }
  return false;
}

type PagBankLink = { rel?: string; href?: string };

// ---------------------------------------------------------------------------
// Interpretação de webhook — o PagBank manda 3 formatos diferentes para a
// MESMA `notification_urls`, dependendo de qual evento disparou:
//  (a) status do Checkout em si (hoje só existe o evento EXPIRED);
//  (b) status de uma cobrança/pedido (primeira cobrança, feita via Checkout);
//  (c) evento de ciclo de vida da assinatura recorrente (`event: "subscription.*"`,
//      dos ciclos seguintes em diante, e possivelmente também do primeiro).
// Normalizamos os três num formato único para o webhook route não precisar
// conhecer o formato de payload do provedor.
// ---------------------------------------------------------------------------

export type EventoPagBankNormalizado = {
  /** Chave usada em `cobrancas.provedor_evento_id` — único por evento real. */
  provedorEventoId: string;
  tipo:
    | "pagamento_confirmado"
    | "pagamento_recusado"
    | "assinatura_cancelada"
    | "assinatura_expirada"
    | "assinatura_atualizada"
    | "ignorar";
  /** Id da assinatura no PagBank (CHEC_... antes do 1º pagamento, SUBS_... depois). */
  provedorAssinaturaId: string | null;
  /** Extraído do `reference_id` que nós mesmos definimos ao criar o checkout. */
  assinanteIdReferenciado: number | null;
  planoReferenciado: "mensal" | "anual" | null;
  valor: number | null;
  statusBruto: string | null;
};

export function interpretarWebhookPagBank(body: unknown): EventoPagBankNormalizado | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  // (c) Evento de assinatura recorrente — `{event, resource, links}`.
  if (typeof b.event === "string" && b.event.startsWith("subscription.") && b.resource && typeof b.resource === "object") {
    const resource = b.resource as Record<string, unknown>;
    const subsId = typeof resource.id === "string" ? resource.id : null;
    const referenceId = typeof resource.reference_id === "string" ? resource.reference_id : null;
    const match = referenceId ? REFERENCE_ID_RE.exec(referenceId) : null;
    const amount = resource.amount as { value?: number } | undefined;
    // Não há, na doc pública, um id de fatura/cobrança distinto por ciclo —
    // usamos evento + assinatura + updated_at como chave de idempotência.
    // Ver aviso no relatório: validar contra webhook real antes de produção.
    const updatedAt = typeof resource.updated_at === "string" ? resource.updated_at : String(Date.now());
    const provedorEventoId = `${b.event}:${subsId ?? "sem-id"}:${updatedAt}`;
    const statusBruto = typeof resource.status === "string" ? resource.status : null;

    let tipo: EventoPagBankNormalizado["tipo"] = "ignorar";
    if (b.event === "subscription.recurrence") {
      const statusAlto = (statusBruto || "").toUpperCase();
      if (statusAlto.includes("PAID") || statusAlto.includes("ACTIVE")) tipo = "pagamento_confirmado";
      else if (statusAlto.includes("DECLINED") || statusAlto.includes("OVERDUE") || statusAlto.includes("FAIL") || statusAlto.includes("UNPAID")) {
        tipo = "pagamento_recusado";
      }
    } else if (b.event === "subscription.canceled") {
      tipo = "assinatura_cancelada";
    } else if (b.event === "subscription.expired") {
      tipo = "assinatura_expirada";
    } else if (b.event === "subscription.initial") {
      // Criação da assinatura em si — se já vier com status pago, trata como confirmação.
      tipo = (statusBruto || "").toUpperCase().includes("PAID") ? "pagamento_confirmado" : "assinatura_atualizada";
    } else {
      tipo = "assinatura_atualizada";
    }

    return {
      provedorEventoId,
      tipo,
      provedorAssinaturaId: subsId,
      assinanteIdReferenciado: match ? parseInt(match[1], 10) : null,
      planoReferenciado: match ? (match[2] as "mensal" | "anual") : null,
      valor: typeof amount?.value === "number" ? amount.value / 100 : null,
      statusBruto,
    };
  }

  // (b) Notificação de pedido/cobrança (primeira cobrança feita via Checkout).
  if (typeof b.id === "string" && b.id.startsWith("ORDE_") && Array.isArray(b.charges)) {
    const referenceId = typeof b.reference_id === "string" ? b.reference_id : null;
    const match = referenceId ? REFERENCE_ID_RE.exec(referenceId) : null;
    const charges = b.charges as Array<Record<string, unknown>>;
    const charge = charges.find((c) => typeof c.status === "string") ?? charges[0];
    const chargeId = typeof charge?.id === "string" ? charge.id : b.id;
    const status = typeof charge?.status === "string" ? charge.status : null;
    const amount = charge?.amount as { value?: number } | undefined;

    let tipo: EventoPagBankNormalizado["tipo"] = "ignorar";
    if (status === "PAID") tipo = "pagamento_confirmado";
    else if (status === "DECLINED") tipo = "pagamento_recusado";

    return {
      provedorEventoId: chargeId,
      tipo,
      // Ainda não temos o SUBS_id aqui — só fica conhecido quando o
      // primeiro ciclo confirma e a assinatura no PagBank passa a existir.
      provedorAssinaturaId: null,
      assinanteIdReferenciado: match ? parseInt(match[1], 10) : null,
      planoReferenciado: match ? (match[2] as "mensal" | "anual") : null,
      valor: typeof amount?.value === "number" ? amount.value / 100 : null,
      statusBruto: status,
    };
  }

  // (a) Notificação de status do Checkout (hoje, na prática, só EXPIRED).
  if (typeof b.id === "string" && b.id.startsWith("CHEC_")) {
    const status = typeof b.status === "string" ? b.status : null;
    return {
      provedorEventoId: `${b.id}:${status ?? "sem-status"}`,
      tipo: "ignorar",
      provedorAssinaturaId: b.id,
      assinanteIdReferenciado: null,
      planoReferenciado: null,
      valor: null,
      statusBruto: status,
    };
  }

  return null;
}

/**
 * Implementação real — Checkout PagBank com `recurrence_plan` inline.
 *
 * `iniciarAssinatura` cria o checkout e devolve a `checkoutUrl` (link
 * `rel: "PAY"`) de verdade, para redirecionar o assinante. `cancelarAssinatura`
 * chama o cancelamento na API de Assinaturas — exige `PAGSEGURO_ASSINATURAS_TOKEN`
 * (ver cabeçalho do arquivo).
 */
export const provedorPagBank: ProvedorPagamento = {
  nome: "pagbank",

  async iniciarAssinatura({ assinanteId, email, nome, plano }): Promise<IniciarAssinaturaResultado> {
    if (!pagbankConfigurado()) {
      return { ok: false, erro: "PagBank não configurado (PAGSEGURO_API_TOKEN ausente)." };
    }

    const referenceId = referenceIdAssinatura(assinanteId, plano);
    const valorReais = PRECOS[plano].valor;
    const corpo = {
      reference_id: referenceId,
      customer_modifiable: true,
      customer: { name: nome || undefined, email },
      items: [
        {
          reference_id: plano,
          name: plano === "anual" ? "Assinatura anual" : "Assinatura mensal",
          quantity: 1,
          unit_amount: paraCentavos(valorReais),
        },
      ],
      recurrence_plan: {
        name: plano === "anual" ? NOME_PLANO_ANUAL : NOME_PLANO_MENSAL,
        interval: { unit: plano === "anual" ? "YEAR" : "MONTH", length: 1 },
        // Sem `billing_cycles`: renova automaticamente até cancelar — é isso
        // que torna a cobrança recorrente de verdade, não uma venda avulsa.
      },
      notification_urls: [`${SITE_URL}/api/assinatura/webhook`],
      return_url: RETURN_URL,
    };

    let resposta: Response;
    try {
      resposta = await fetch(`${API_BASE}/checkouts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          "x-idempotency-key": referenceId,
        },
        body: JSON.stringify(corpo),
      });
    } catch (err) {
      return { ok: false, erro: `Falha de rede ao chamar o PagBank: ${err instanceof Error ? err.message : String(err)}` };
    }

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok || !dados?.id) {
      await db.insert(cobrancas).values({
        assinanteId,
        provedor: "pagbank",
        provedorEventoId: null,
        tipo: "assinatura_erro",
        status: "erro",
        valor: valorReais.toString(),
        payload: { httpStatus: resposta.status, resposta: dados, plano },
      });
      const descricaoErro = dados?.error_messages?.[0]?.description;
      return {
        ok: false,
        erro: descricaoErro || `PagBank recusou a criação do checkout (HTTP ${resposta.status}).`,
      };
    }

    const linkPagamento = (dados.links as PagBankLink[] | undefined)?.find((l) => l.rel === "PAY");

    await db
      .update(assinantes)
      .set({ plano, status: "pendente", provedor: "pagbank", provedorAssinaturaId: dados.id })
      .where(eq(assinantes.id, assinanteId));

    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pagbank",
      provedorEventoId: dados.id,
      tipo: "assinatura_iniciada",
      valor: valorReais.toString(),
      status: "pendente",
      payload: dados,
    });

    return { ok: true, provedorAssinaturaId: dados.id, checkoutUrl: linkPagamento?.href ?? null };
  },

  async cancelarAssinatura({ assinanteId, provedorAssinaturaId }) {
    if (!provedorAssinaturaId) {
      return { ok: false, erro: "Assinante não tem id de assinatura no PagBank — nada para cancelar." };
    }

    // Checkout criado mas o assinante nunca completou o pagamento na página
    // hospedada: ainda é um `CHEC_...`, não virou `SUBS_...`. Não existe
    // assinatura recorrente ativa no PagBank para cancelar.
    if (!provedorAssinaturaId.startsWith("SUBS_")) {
      await db.insert(cobrancas).values({
        assinanteId,
        provedor: "pagbank",
        provedorEventoId: `${provedorAssinaturaId}_cancel_sem_cobranca`,
        tipo: "cancelamento_solicitado",
        status: "recebido",
        payload: { nota: "checkout nunca virou assinatura paga no PagBank — nada a cancelar", provedorAssinaturaId },
      });
      return { ok: true };
    }

    if (!ASSINATURAS_TOKEN) {
      return {
        ok: false,
        erro:
          "PAGSEGURO_ASSINATURAS_TOKEN não configurado — a habilitação do Pagamento Recorrente em " +
          "assinaturas.pagbank.com.br provavelmente ainda não foi concluída pelo dono da conta (ver docs).",
      };
    }

    let resposta: Response;
    try {
      resposta = await fetch(`${ASSINATURAS_API_BASE}/subscriptions/${provedorAssinaturaId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${ASSINATURAS_TOKEN}`, "x-idempotency-key": `cancel-${provedorAssinaturaId}` },
      });
    } catch (err) {
      return { ok: false, erro: `Falha de rede ao chamar o PagBank: ${err instanceof Error ? err.message : String(err)}` };
    }

    if (!resposta.ok) {
      const corpoErro = await resposta.text().catch(() => "");
      await db.insert(cobrancas).values({
        assinanteId,
        provedor: "pagbank",
        provedorEventoId: `${provedorAssinaturaId}_cancel_erro_${Date.now()}`,
        tipo: "cancelamento_erro",
        status: "erro",
        payload: { httpStatus: resposta.status, corpo: corpoErro },
      });
      return { ok: false, erro: `PagBank recusou o cancelamento (HTTP ${resposta.status}).` };
    }

    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pagbank",
      provedorEventoId: `${provedorAssinaturaId}_cancel_${Date.now()}`,
      tipo: "cancelamento_solicitado",
      status: "recebido",
      payload: { provedorAssinaturaId },
    });

    return { ok: true };
  },
};
