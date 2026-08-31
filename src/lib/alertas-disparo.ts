/**
 * Disparo de alertas por e-mail (O6) — o único recurso pago do produto.
 *
 * Fluxo por alerta ativo cujo assinante ainda tem `podeVer(assinante,
 * "alertas")`:
 *   1. busca imóveis publicados desde o último envio (`ultimoEnvioEm`);
 *   2. aplica os filtros do alerta (uf/cidade/preço/desconto/tipo/
 *      crimeNotaMax);
 *   3. se houver pelo menos um imóvel novo, manda um e-mail (até
 *      MAX_IMOVEIS_POR_EMAIL, maior desconto primeiro) e só então avança
 *      `ultimoEnvioEm`.
 *
 * Primeiro envio (`ultimoEnvioEm` nulo): olha só as últimas 24h — nunca o
 * catálogo inteiro. Mandar o catálogo inteiro no primeiro alerta é o erro
 * clássico que queima o assinante logo de cara.
 *
 * Idempotência: `ultimoEnvioEm` só avança DEPOIS que `enviarParaAssinante`
 * retorna sem lançar. Se o envio falhar, o alerta fica exatamente como
 * estava e a mesma janela de imóveis é reavaliada na próxima chamada —
 * nenhum imóvel se perde por um erro transitório do provedor de e-mail.
 *
 * `src/lib/email.ts` não foi tocado: o `sendEmail` de lá manda sempre para
 * um endereço fixo de operador (`NOTIFICATION_EMAIL`), não para o
 * assinante. Aqui reaproveitamos o MESMO transporte (API HTTP do Resend,
 * mesma variável `RESEND_API_KEY`, sem dependência nova) só que
 * parametrizado pelo destinatário.
 */

import { and, desc, eq, gt, gte, ilike, isNotNull, isNull, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { alertas, assinantes, properties } from "@/lib/db/schema";
import { podeVer, type AssinanteSessao } from "@/lib/assinatura";
import { lerSeguranca, fraseFonte } from "@/lib/seguranca";
import { imovelUrl, cidadeUrl, ufUrl } from "@/lib/slug";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

const MAX_IMOVEIS_POR_EMAIL = 10;
const JANELA_PRIMEIRO_ENVIO_MS = 24 * 60 * 60 * 1000;

type ImovelAlerta = {
  caixaId: string;
  uf: string;
  cidade: string;
  bairro: string | null;
  tipoImovel: string | null;
  preco: string | null;
  valorAvaliacao: string | null;
  desconto: string | null;
  crimeNota: number | null;
  crimeTaxa: string | null;
  crimeGrao: string | null;
  crimeFonte: string | null;
  crimeJanelaInicio: string | null;
  crimeJanelaFim: string | null;
  crimeSuprimido: boolean | null;
  crimePercentil: number | null;
  crimeBairro: string | null;
  crimeBairroOrigem: string | null;
  crimeOcorrencias: number | null;
  crimeMuniNota: number | null;
  crimeMuniTaxa: string | null;
  crimeMuniJanelaInicio: string | null;
  crimeMuniJanelaFim: string | null;
  crimeMuniFonte: string | null;
};

export type DetalheDisparo = {
  alertaId: number;
  assinanteEmail: string;
  totalImoveisNovos: number;
  imoveisNoEmail: number;
  assunto: string | null;
  enviado: boolean;
  motivo?: string;
};

export type ErroDisparo = { alertaId: number; erro: string };

export type ResultadoDisparo = {
  dryRun: boolean;
  alertasAvaliados: number;
  alertasElegiveis: number;
  alertasComNovidade: number;
  emailsEnviados: number;
  imoveisNotificados: number;
  detalhes: DetalheDisparo[];
  erros: ErroDisparo[];
};

// ---------------------------------------------------------------------------
// Formatação pt-BR
// ---------------------------------------------------------------------------

function formatBRL(v: string | number | null, casas = 2): string {
  if (v == null) return "—";
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

function formatPct(v: string | null): string {
  if (v == null) return "—";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  return `${n.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

function tituloCase(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Transporte — mesma API do Resend usada em src/lib/email.ts, mas com
// destinatário dinâmico (o assinante, não o operador).
// ---------------------------------------------------------------------------

async function enviarParaAssinante(to: string, subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY não configurada");
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Alertas Imóveis Caixa <alerts@crimebrasil.com.br>",
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}

// ---------------------------------------------------------------------------
// Copy do e-mail
// ---------------------------------------------------------------------------

function localDoAlerta(uf: string | null, cidade: string | null): string {
  if (cidade) return `em ${tituloCase(cidade)}`;
  if (uf) return `no ${uf}`;
  return "";
}

function linkVerMais(uf: string | null, cidade: string | null): string {
  if (uf && cidade) return `${SITE_URL}${cidadeUrl(uf, cidade)}`;
  if (uf) return `${SITE_URL}${ufUrl(uf)}`;
  return `${SITE_URL}/leilao-imoveis`;
}

function montarEmail(params: {
  alertaNome: string | null;
  uf: string | null;
  cidade: string | null;
  imoveis: ImovelAlerta[];
  totalNovos: number;
}): { assunto: string; html: string } {
  const { alertaNome, uf, cidade, imoveis, totalNovos } = params;
  const exibidos = imoveis.slice(0, MAX_IMOVEIS_POR_EMAIL);
  const restantes = totalNovos - exibidos.length;

  const precos = imoveis
    .map((p) => (p.preco != null ? Number(p.preco) : null))
    .filter((n): n is number => n != null && Number.isFinite(n));
  const precoMin = precos.length ? Math.min(...precos) : null;

  const local = localDoAlerta(uf, cidade);
  const assunto = [
    `${totalNovos} imóve${totalNovos > 1 ? "is novos" : "l novo"}`,
    local,
    precoMin != null ? `a partir de ${formatBRL(precoMin, 0)}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cards = exibidos
    .map((p) => {
      const seg = lerSeguranca(p);
      const segHtml = seg
        ? `<div style="margin-top:6px;font-size:12px;color:#334155;"><strong>${seg.rotulo}</strong> — ${fraseFonte(seg)}</div>`
        : `<div style="margin-top:6px;font-size:12px;color:#94a3b8;">Sem dado de segurança disponível para este município.</div>`;
      const link = `${SITE_URL}${imovelUrl({
        uf: p.uf,
        cidade: p.cidade,
        tipoImovel: p.tipoImovel,
        caixaId: p.caixaId,
      })}`;
      return `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:12px;">
        <div style="font-size:14px;color:#0f172a;"><strong>${p.tipoImovel ?? "Imóvel"}</strong> — ${
          p.bairro ? `${tituloCase(p.bairro)}, ` : ""
        }${tituloCase(p.cidade)}/${p.uf}</div>
        <div style="font-size:13px;color:#1e293b;margin-top:4px;">Preço: <strong>${formatBRL(
          p.preco
        )}</strong> · Avaliação: ${formatBRL(p.valorAvaliacao)} · Desconto: <strong>${formatPct(
          p.desconto
        )}</strong></div>
        ${segHtml}
        <div style="margin-top:8px;"><a href="${link}" style="color:#2563eb;font-size:13px;">Ver imóvel →</a></div>
      </div>`;
    })
    .join("\n");

  const maisLink =
    restantes > 0
      ? `<p style="font-size:13px;color:#475569;">...e mais ${restantes} imóve${
          restantes > 1 ? "is" : "l"
        }. <a href="${linkVerMais(uf, cidade)}" style="color:#2563eb;">Ver todos</a></p>`
      : "";

  const html = `<div style="font-family:sans-serif;max-width:640px;">
  <h2 style="color:#0f172a;">${alertaNome ? `Alerta "${alertaNome}"` : "Seu alerta"}: ${assunto}</h2>
  ${cards}
  ${maisLink}
  <p style="font-size:11px;color:#94a3b8;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:12px;">
    Você recebe este e-mail porque tem um alerta ativo no plano pago do Imóveis Caixa.
    Gerencie ou cancele o alerta em <a href="${SITE_URL}/conta" style="color:#64748b;">${SITE_URL}/conta</a>.
  </p>
</div>`;

  return { assunto, html };
}

// ---------------------------------------------------------------------------
// Disparo
// ---------------------------------------------------------------------------

export async function dispararAlertas(opts: { dryRun: boolean }): Promise<ResultadoDisparo> {
  const { dryRun } = opts;

  const resultado: ResultadoDisparo = {
    dryRun,
    alertasAvaliados: 0,
    alertasElegiveis: 0,
    alertasComNovidade: 0,
    emailsEnviados: 0,
    imoveisNotificados: 0,
    detalhes: [],
    erros: [],
  };

  // Uma consulta para todos os alertas ativos + assinante (join) — evita
  // N+1 na parte "quem recebe". A parte "que imóveis mandar" ainda faz uma
  // consulta por alerta (aceitável: poucos assinantes hoje), mas nunca uma
  // consulta por imóvel dentro do loop de imóveis.
  const linhas = await db
    .select({
      alertaId: alertas.id,
      alertaNome: alertas.nome,
      uf: alertas.uf,
      cidade: alertas.cidade,
      precoMax: alertas.precoMax,
      descontoMin: alertas.descontoMin,
      tipoImovel: alertas.tipoImovel,
      crimeNotaMax: alertas.crimeNotaMax,
      ultimoEnvioEm: alertas.ultimoEnvioEm,
      assinanteId: assinantes.id,
      assinanteEmail: assinantes.email,
      assinanteNome: assinantes.nome,
      assinanteTelefone: assinantes.telefone,
      assinantePlano: assinantes.plano,
      assinanteStatus: assinantes.status,
      assinanteValidoAte: assinantes.validoAte,
      assinanteCriadoEm: assinantes.criadoEm,
    })
    .from(alertas)
    .innerJoin(assinantes, eq(alertas.assinanteId, assinantes.id))
    .where(eq(alertas.ativo, true));

  resultado.alertasAvaliados = linhas.length;

  for (const linha of linhas) {
    try {
      const assinante: AssinanteSessao = {
        id: linha.assinanteId,
        email: linha.assinanteEmail,
        nome: linha.assinanteNome,
        telefone: linha.assinanteTelefone,
        plano: linha.assinantePlano,
        status: linha.assinanteStatus,
        validoAte: linha.assinanteValidoAte,
        criadoEm: linha.assinanteCriadoEm,
      };

      // A regra de plano vive só em assinatura.ts — não reimplementada aqui.
      if (!podeVer(assinante, "alertas")) {
        continue;
      }
      resultado.alertasElegiveis++;

      // Primeiro envio: últimas 24h, nunca o catálogo inteiro.
      const desde = linha.ultimoEnvioEm ?? new Date(Date.now() - JANELA_PRIMEIRO_ENVIO_MS);

      const condicoes = [isNull(properties.removedAt), gt(properties.firstSeenAt, desde)];
      if (linha.uf) condicoes.push(eq(properties.uf, linha.uf));
      if (linha.cidade) condicoes.push(ilike(properties.cidade, linha.cidade));
      if (linha.tipoImovel) condicoes.push(ilike(properties.tipoImovel, linha.tipoImovel));
      if (linha.precoMax != null) condicoes.push(lte(properties.preco, linha.precoMax));
      if (linha.descontoMin != null) condicoes.push(gte(properties.desconto, linha.descontoMin));
      if (linha.crimeNotaMax != null) {
        // `crimeNotaMax` guarda um PERCENTIL (0-100), não a nota crua: as
        // réguas de bairro e de município são diferentes (ver
        // lib/seguranca.ts), então crimePercentil é a única grandeza
        // comparável entre os dois grãos para este filtro. Suprimido, ou
        // linha ainda sem percentil, NUNCA passa num teto de risco — não dá
        // para afirmar que está abaixo do teto sem o dado.
        condicoes.push(isNotNull(properties.crimePercentil));
        condicoes.push(sql`${properties.crimeSuprimido} IS NOT TRUE`);
        condicoes.push(lte(properties.crimePercentil, linha.crimeNotaMax));
      }

      const imoveis: ImovelAlerta[] = await db
        .select({
          caixaId: properties.caixaId,
          uf: properties.uf,
          cidade: properties.cidade,
          bairro: properties.bairro,
          tipoImovel: properties.tipoImovel,
          preco: properties.preco,
          valorAvaliacao: properties.valorAvaliacao,
          desconto: properties.desconto,
          crimeNota: properties.crimeNota,
          crimeTaxa: properties.crimeTaxa,
          crimeGrao: properties.crimeGrao,
          crimeFonte: properties.crimeFonte,
          crimeJanelaInicio: properties.crimeJanelaInicio,
          crimeJanelaFim: properties.crimeJanelaFim,
          crimeSuprimido: properties.crimeSuprimido,
          crimePercentil: properties.crimePercentil,
          crimeBairro: properties.crimeBairro,
          crimeBairroOrigem: properties.crimeBairroOrigem,
          crimeOcorrencias: properties.crimeOcorrencias,
          crimeMuniNota: properties.crimeMuniNota,
          crimeMuniTaxa: properties.crimeMuniTaxa,
          crimeMuniJanelaInicio: properties.crimeMuniJanelaInicio,
          crimeMuniJanelaFim: properties.crimeMuniJanelaFim,
          crimeMuniFonte: properties.crimeMuniFonte,
        })
        .from(properties)
        .where(and(...condicoes))
        .orderBy(desc(sql`COALESCE(${properties.desconto}::numeric, 0)`));

      if (imoveis.length === 0) {
        // Sem novidade: não manda e-mail, não mexe em ultimoEnvioEm.
        resultado.detalhes.push({
          alertaId: linha.alertaId,
          assinanteEmail: assinante.email,
          totalImoveisNovos: 0,
          imoveisNoEmail: 0,
          assunto: null,
          enviado: false,
          motivo: "sem imóveis novos desde o último envio",
        });
        continue;
      }

      resultado.alertasComNovidade++;
      resultado.imoveisNotificados += imoveis.length;

      const { assunto, html } = montarEmail({
        alertaNome: linha.alertaNome,
        uf: linha.uf,
        cidade: linha.cidade,
        imoveis,
        totalNovos: imoveis.length,
      });

      if (dryRun) {
        resultado.detalhes.push({
          alertaId: linha.alertaId,
          assinanteEmail: assinante.email,
          totalImoveisNovos: imoveis.length,
          imoveisNoEmail: Math.min(imoveis.length, MAX_IMOVEIS_POR_EMAIL),
          assunto,
          enviado: false,
          motivo: "dry_run — nada foi enviado",
        });
        continue;
      }

      await enviarParaAssinante(assinante.email, assunto, html);

      // Só avança ultimoEnvioEm DEPOIS do envio confirmado. Se
      // enviarParaAssinante lançar, este update nunca roda e a mesma
      // janela é reavaliada na próxima chamada — idempotência.
      await db
        .update(alertas)
        .set({ ultimoEnvioEm: new Date() })
        .where(eq(alertas.id, linha.alertaId));

      resultado.emailsEnviados++;
      resultado.detalhes.push({
        alertaId: linha.alertaId,
        assinanteEmail: assinante.email,
        totalImoveisNovos: imoveis.length,
        imoveisNoEmail: Math.min(imoveis.length, MAX_IMOVEIS_POR_EMAIL),
        assunto,
        enviado: true,
      });
    } catch (err) {
      // Um alerta com erro (e-mail inválido, Resend fora do ar, etc.) não
      // pode derrubar o lote inteiro.
      resultado.erros.push({
        alertaId: linha.alertaId,
        erro: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return resultado;
}
