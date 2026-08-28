/**
 * Assinatura pública do agregador de leilão (O6).
 *
 * `src/lib/auth.ts` é a sessão da EQUIPE INTERNA (tabela `users`, cookie
 * `imoveis_session`) — não é reaproveitada aqui de propósito: o assinante é
 * outro público, com outra tabela (`assinantes`) e outro cookie
 * (`assinante_session`). Mesma técnica de assinatura HMAC de `auth.ts`
 * (timestamp:payload:assinatura, `timingSafeEqual`), payload diferente
 * (id numérico do assinante, não username) e segredo próprio — para que um
 * cookie de um sistema nunca seja aceito pelo outro por engano.
 */

import { createHmac, timingSafeEqual, randomBytes, scrypt as scryptCb } from "crypto";
import { promisify } from "util";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";

const scrypt = promisify(scryptCb);

// ---------------------------------------------------------------------------
// Senha — scrypt com salt aleatório por conta.
//
// `auth.ts` usa SHA-256 puro sem salt (aceitável para 3 contas internas
// fixas). Aqui é cadastro público — qualquer pessoa pode criar conta — então
// o hash é salgado. Formato armazenado: "salt_hex:hash_hex".
// ---------------------------------------------------------------------------

export async function hashSenha(senha: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(senha, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verificarSenha(senha: string, hashArmazenado: string | null): Promise<boolean> {
  if (!hashArmazenado) return false;
  const [salt, hashHex] = hashArmazenado.split(":");
  if (!salt || !hashHex) return false;
  const derived = (await scrypt(senha, salt, 64)) as Buffer;
  const expected = Buffer.from(hashHex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

// ---------------------------------------------------------------------------
// Sessão do assinante — cookie próprio, nunca o `imoveis_session` interno.
// ---------------------------------------------------------------------------

// Lazy de propósito (não é `const` avaliado no import): o build do Coolify
// roda `next build` com NODE_ENV=production e SEM as env vars de runtime
// (só NEXT_PUBLIC_HCAPTCHA_SITE_KEY vira ARG do Dockerfile — ver Dockerfile).
// Um throw em NODE_ENV==="production" avaliado no topo do módulo derrubaria
// o build. Aqui só executa quando uma sessão é de fato assinada/verificada
// (nunca em build-time, já que este módulo só roda dentro de rotas
// force-dynamic/route handlers). Falha alto em produção sem segredo
// configurado em vez de assinar com uma string hardcoded e pública no repo
// (sessão forjável por qualquer um que leia o código-fonte).
function segredoSessaoAssinante(): string {
  const segredo = process.env.ASSINATURA_SESSION_SECRET || process.env.SESSION_SECRET;
  if (segredo) return segredo;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ASSINATURA_SESSION_SECRET (ou SESSION_SECRET) não configurado em produção — recusando assinar/verificar sessão de assinante."
    );
  }
  return "change-me-in-dev-assinatura";
}

const ASSINANTE_MAX_AGE = 2592000; // 30 dias — sessão de consumidor, não de operador

export const COOKIE_ASSINANTE = "assinante_session";
export const COOKIE_ASSINANTE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: ASSINANTE_MAX_AGE,
  path: "/",
};

export function assinarSessaoAssinante(assinanteId: number): string {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const payload = `${timestamp}:${assinanteId}`;
  const signature = createHmac("sha256", segredoSessaoAssinante()).update(payload).digest("hex");
  return `${payload}:${signature}`;
}

export function verificarSessaoAssinante(token: string): { valid: boolean; assinanteId?: number } {
  const firstColon = token.indexOf(":");
  if (firstColon === -1) return { valid: false };
  const lastColon = token.lastIndexOf(":");
  if (lastColon === firstColon) return { valid: false };

  const timestamp = token.slice(0, firstColon);
  const idStr = token.slice(firstColon + 1, lastColon);
  const signature = token.slice(lastColon + 1);
  if (!timestamp || !idStr || !signature) return { valid: false };

  const ts = parseInt(timestamp, 10);
  const assinanteId = parseInt(idStr, 10);
  if (isNaN(ts) || isNaN(assinanteId)) return { valid: false };

  if (Date.now() / 1000 - ts > ASSINANTE_MAX_AGE) return { valid: false };

  const payload = `${timestamp}:${idStr}`;
  const expected = createHmac("sha256", segredoSessaoAssinante()).update(payload).digest("hex");

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return { valid: false };
    return timingSafeEqual(sigBuf, expBuf) ? { valid: true, assinanteId } : { valid: false };
  } catch {
    return { valid: false };
  }
}

/** Para uso em route handlers (Request/NextRequest), fora de Server Components. */
export function getAssinanteIdFromRequest(request: NextRequest | Request): number | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_ASSINANTE}=([^;]+)`));
  if (!match) return null;
  const result = verificarSessaoAssinante(decodeURIComponent(match[1]));
  return result.valid ? result.assinanteId ?? null : null;
}

export type AssinanteSessao = {
  id: number;
  email: string;
  nome: string | null;
  telefone: string | null;
  plano: string;
  status: string;
  validoAte: Date | null;
  criadoEm: Date;
};

/** Lê o assinante logado a partir da sessão — uso em Server Components. */
export async function getAssinante(): Promise<AssinanteSessao | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_ASSINANTE)?.value;
  if (!token) return null;

  const result = verificarSessaoAssinante(token);
  if (!result.valid || !result.assinanteId) return null;

  const [row] = await db
    .select({
      id: assinantes.id,
      email: assinantes.email,
      nome: assinantes.nome,
      telefone: assinantes.telefone,
      plano: assinantes.plano,
      status: assinantes.status,
      validoAte: assinantes.validoAte,
      criadoEm: assinantes.criadoEm,
    })
    .from(assinantes)
    .where(eq(assinantes.id, result.assinanteId))
    .limit(1);

  return row ?? null;
}

// ---------------------------------------------------------------------------
// A parede — regra num lugar só. Nunca 404, nunca redirect: quem chama decide
// o que mostrar quando `podeVer` volta falso (o convite, no padrão Arremata).
// ---------------------------------------------------------------------------

export type RecursoPago = "alertas" | "filtro_seguranca" | "historico_preco";

const PLANOS_PAGOS = new Set(["mensal", "anual"]);

// Hoje os três recursos pagos liberam juntos (mesma regra de plano/status).
// O parâmetro fica explícito porque é bem provável que um recurso solte
// antes do outro (ex.: filtro_seguranca no plano grátis como isca) — nesse
// dia, a diferença entra aqui, num lugar só, sem caçar chamada por chamada.
const RECURSOS_PAGOS: Record<RecursoPago, true> = {
  alertas: true,
  filtro_seguranca: true,
  historico_preco: true,
};

export function podeVer(assinante: AssinanteSessao | null, recurso: RecursoPago): boolean {
  if (!RECURSOS_PAGOS[recurso]) return false;
  if (!assinante) return false;
  if (!PLANOS_PAGOS.has(assinante.plano)) return false;

  // "ativa" sempre libera. "cancelada" continua liberando até o fim do
  // período já pago (sem renovação automática) — é o padrão de qualquer
  // assinatura: cancelar não devolve o que já foi pago.
  if (assinante.status === "ativa") return true;
  if (assinante.status === "cancelada" && assinante.validoAte && assinante.validoAte > new Date()) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Preços — fonte única, usada por /planos e pelo adaptador de cobrança.
// Faixa provada de mercado (Arremata.ai R$39,17 · LeilôAI R$59,90 · Mapa do
// Leilão R$74,90); ficamos no meio.
// ---------------------------------------------------------------------------

export const PRECOS = {
  mensal: { valor: 49.9, rotulo: "R$ 49,90/mês" },
  anual: { valor: 499, rotulo: "R$ 499/ano", equivalenteMensal: "R$ 41,58/mês" },
} as const;

// ---------------------------------------------------------------------------
// Adaptador de provedor de cobrança.
//
// Implementação real: PagBank/PagSeguro, via `src/lib/pagamento/pagbank.ts`
// (Checkout PagBank com `recurrence_plan` — ver o cabeçalho daquele arquivo
// para a arquitetura completa, os dois hosts/tokens envolvidos e o que falta
// habilitar no painel do PagBank).
//
// A implementação `demo` abaixo continua existindo e é o PADRÃO — nunca
// cobra: registra a intenção em `cobrancas` e deixa o assinante em
// `pendente`. Trocar para o provedor real é uma decisão explícita do dono via
// env (`PAGAMENTO_PROVEDOR=pagbank`), nunca um efeito colateral de deploy —
// ver `getProvedorPagamento()` no fim do arquivo.
// ---------------------------------------------------------------------------

export type Plano = "mensal" | "anual";

export type IniciarAssinaturaInput = {
  assinanteId: number;
  email: string;
  nome: string | null;
  plano: Plano;
};

export type IniciarAssinaturaResultado =
  | { ok: true; provedorAssinaturaId: string; checkoutUrl: string | null }
  | { ok: false; erro: string };

export type CancelarAssinaturaInput = {
  assinanteId: number;
  provedorAssinaturaId: string | null;
};

export interface ProvedorPagamento {
  nome: string;
  iniciarAssinatura(input: IniciarAssinaturaInput): Promise<IniciarAssinaturaResultado>;
  cancelarAssinatura(input: CancelarAssinaturaInput): Promise<{ ok: boolean; erro?: string }>;
}

/**
 * Implementação demo — não fala com nenhum gateway. Só grava a intenção.
 * Continua existindo como PADRÃO (ver `getProvedorPagamento`), para que o
 * comportamento em produção nunca mude sozinho por causa de um deploy.
 */
export const provedorDemo: ProvedorPagamento = {
  nome: "demo",

  async iniciarAssinatura({ assinanteId, plano }) {
    const provedorAssinaturaId = `demo_${assinanteId}_${Date.now()}`;

    await db
      .update(assinantes)
      .set({
        plano,
        status: "pendente",
        provedor: "demo",
        provedorAssinaturaId,
      })
      .where(eq(assinantes.id, assinanteId));

    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "demo",
      provedorEventoId: provedorAssinaturaId,
      tipo: "assinatura_iniciada",
      valor: PRECOS[plano].valor.toString(),
      status: "pendente",
      payload: { plano, nota: "provedor demo — nenhuma cobrança real ocorreu" },
    });

    // Sem gateway real ainda: não há checkout para redirecionar.
    return { ok: true, provedorAssinaturaId, checkoutUrl: null };
  },

  async cancelarAssinatura({ assinanteId, provedorAssinaturaId }) {
    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "demo",
      provedorEventoId: provedorAssinaturaId ?? `demo_cancel_${assinanteId}_${Date.now()}`,
      tipo: "cancelamento_solicitado",
      status: "recebido",
      payload: { nota: "provedor demo — nenhum cancelamento real foi enviado a um gateway" },
    });
    return { ok: true };
  },
};

export function getProvedorPagamento(): ProvedorPagamento {
  // Quando o provedor real existir, trocar aqui por
  // `process.env.PROVEDOR_PAGAMENTO === "pagbank" ? provedorPagBank : ...`.
  return provedorDemo;
}
