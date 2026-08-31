/**
 * Adaptador `pix` — cobrança por PIX copia-e-cola, PROVEDOR PADRÃO da
 * assinatura do agregador de leilão (O6) desde 31/08/2026.
 *
 * POR QUE ELE EXISTE (medido, não suposto — 31/08/2026): a conta PagBank do
 * Crime Brasil não tem NENHUM caminho de API para cobrar valor arbitrário.
 * Testado com o token de produção:
 *   - checkout clássico v2 → erro 11192 "Product has been disabled";
 *   - Orders API (api.pagseguro.com) → 403 Forbidden.
 * Sobra o link de preço fixo criado à mão no painel (`pagseguro-link.ts`), e
 * os links que já existem são de R$ 55,90 / R$ 98,50 (relatórios), não das
 * faixas daqui. Ou seja: com PagBank, ninguém consegue pagar enquanto o dono
 * não abrir o painel.
 *
 * O PIX resolve isso sem depender de painel, de API e de ninguém: o BR Code
 * (o "copia e cola") é gerado AQUI, offline, a partir da chave do recebedor —
 * é só um texto no formato EMV®QRCPS do Banco Central com um CRC no fim.
 * Nenhuma credencial, nenhuma chamada de rede, nenhum intermediário.
 *
 * É também exatamente o que o Crime Brasil já faz para vender relatório:
 * manda a chave PIX, o comprador paga, e a liberação é MANUAL depois de
 * conferir a entrada. A confirmação aqui usa a mesma rota de sempre —
 * `POST /api/assinatura/admin/confirmar-pagamento`.
 *
 * O QUE ELE NÃO FAZ: não aceita cartão, e não avisa a gente sozinho quando o
 * dinheiro cai (chave PIX comum não tem webhook — isso exigiria conta PSP com
 * API PIX). A conciliação é o dono olhando o extrato e casando pelo valor e
 * pelo identificador (`txid`), que aparece nos detalhes da transferência na
 * maioria dos bancos. Ver `GET /api/assinatura/admin/pendentes` — ela lista
 * quem está esperando, com valor, txid e data.
 *
 * Env (nenhum valor cravado no código):
 *  - PIX_CHAVE            — chave do recebedor (aleatória, CPF/CNPJ, e-mail…).
 *  - PIX_RECEBEDOR_NOME   — nome que aparece no app do pagador (≤ 25 chars).
 *  - PIX_RECEBEDOR_CIDADE — cidade do recebedor (≤ 15 chars).
 * Sem `PIX_CHAVE` o provedor recusa com mensagem clara — nunca cai calado
 * para o demo, nunca inventa uma chave.
 */

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import { PRECOS, type ProvedorPagamento } from "@/lib/assinatura";

/** Leitura lazy: no topo do módulo o valor congelaria no build, onde as envs não existem. */
function env(nome: string, padrao = ""): string {
  return (process.env[nome] || padrao).trim();
}

export function pixConfigurado(): boolean {
  return env("PIX_CHAVE").length > 0;
}

/**
 * Tira acento e qualquer caractere fora do ASCII imprimível: o BR Code é lido
 * por app de banco que ainda assume Latin-1 curto nos campos 59/60, e acento
 * ali é a causa clássica de "QR inválido".
 */
function ascii(texto: string, limite: number): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\u0020-\u007E]/g, "")
    .trim()
    .slice(0, limite);
}

/** Campo EMV: id + tamanho em 2 dígitos + valor. */
function campo(id: string, valor: string): string {
  return id + String(valor.length).padStart(2, "0") + valor;
}

/** CRC16/CCITT-FALSE (poly 0x1021, init 0xFFFF) — o fim obrigatório do BR Code. */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Monta o BR Code (payload do "copia e cola"). `txid` é o identificador que o
 * banco do recebedor mostra nos detalhes da transferência — é por ele que a
 * confirmação manual casa o pagamento com o assinante.
 */
export function montarBrCode({
  chave,
  valorReais,
  txid,
  nome,
  cidade,
}: {
  chave: string;
  valorReais: number;
  txid: string;
  nome: string;
  cidade: string;
}): string {
  const merchant = campo("00", "BR.GOV.BCB.PIX") + campo("01", chave);
  const semCrc =
    campo("00", "01") +
    // "12" = uso único: cada tentativa de checkout gera um txid novo.
    campo("01", "12") +
    campo("26", merchant) +
    campo("52", "0000") +
    campo("53", "986") +
    campo("54", valorReais.toFixed(2)) +
    campo("58", "BR") +
    campo("59", ascii(nome, 25) || "RECEBEDOR") +
    campo("60", ascii(cidade, 15) || "BRASIL") +
    campo("62", campo("05", txid)) +
    "6304";
  return semCrc + crc16(semCrc);
}

export const provedorPix: ProvedorPagamento = {
  nome: "pix",

  async iniciarAssinatura({ assinanteId, plano }) {
    const chave = env("PIX_CHAVE");
    if (!chave) {
      return {
        ok: false,
        erro: "Chave PIX não configurada (env PIX_CHAVE ausente) — nenhuma cobrança pode ser iniciada.",
      };
    }

    // txid: até 25 caracteres alfanuméricos, sem separador — é o que o banco
    // mostra no extrato. Prefixo O6 + id do assinante + base36 do relógio, o
    // bastante para nunca repetir e ainda dar para ler a olho.
    const txid = `O6${assinanteId}${Date.now().toString(36).toUpperCase()}`.slice(0, 25);
    const valorReais = PRECOS[plano].valor;
    const brcode = montarBrCode({
      chave,
      valorReais,
      txid,
      nome: env("PIX_RECEBEDOR_NOME", "CRIME BRASIL"),
      cidade: env("PIX_RECEBEDOR_CIDADE", "SAO PAULO"),
    });

    await db
      .update(assinantes)
      .set({ plano, status: "pendente", provedor: "pix", provedorAssinaturaId: txid })
      .where(eq(assinantes.id, assinanteId));

    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pix",
      provedorEventoId: txid,
      tipo: "assinatura_iniciada",
      valor: valorReais.toString(),
      status: "pendente",
      // O BR Code fica gravado de propósito: a página de pagamento relê ele em
      // vez de gerar outro, senão um F5 mudaria o txid e o pagamento chegaria
      // com um identificador que não é o que está pendente no banco.
      payload: { plano, brcode, nota: "PIX copia-e-cola — confirmação manual pelo admin" },
    });

    return { ok: true, provedorAssinaturaId: txid, checkoutUrl: `/conta/pagar?ref=${txid}` };
  },

  async cancelarAssinatura({ assinanteId, provedorAssinaturaId }) {
    // Não existe cobrança recorrente num PIX avulso — não há o que cancelar
    // em gateway nenhum. `podeVer()` respeita `validoAte`, então o acesso já
    // pago continua até o fim do período; cancelar só quer dizer que a próxima
    // renovação manual não vai ser oferecida.
    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pix",
      provedorEventoId: provedorAssinaturaId
        ? `${provedorAssinaturaId}_cancel`
        : `pix_cancel_${assinanteId}_${Date.now()}`,
      tipo: "cancelamento_solicitado",
      status: "recebido",
      payload: { nota: "PIX avulso não tem recorrência — nada a cancelar num gateway." },
    });
    return { ok: true };
  },
};
