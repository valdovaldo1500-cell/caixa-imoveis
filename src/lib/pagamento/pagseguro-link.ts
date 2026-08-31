/**
 * Adaptador `pagseguro_link` — PagBank Payment Links, PROVEDOR PADRÃO da
 * assinatura do agregador de leilão (O6) desde 31/08/2026.
 *
 * É a MESMA técnica que o Crime Brasil já usa em produção para o
 * `/relatorio` (ver `PAGSEGURO_LINK_EXPRESS` / `PAGSEGURO_LINK_STANDARD` em
 * `crime-map-main/backend/main.py`, seção "PagBank Payment Links"): cada
 * faixa de preço tem um link FIXO, criado manualmente no painel do lojista
 * PagBank (não existe API de criação de link — é um valor cravado no
 * cadastro do produto, lá no painel). O assinante clica, vai para o
 * checkout hospedado do PagBank (aceita PIX, cartão, Google Pay, Apple Pay,
 * saldo PagBank) e paga lá — o produto NUNCA vê nem guarda dado de cartão.
 *
 * Diferença do vizinho `pagbank.ts` (que fica FORA do caminho padrão — ver
 * o aviso no topo daquele arquivo): aqui não existe `recurrence_plan` nem
 * cobrança recorrente automática nenhuma. Cada link cobra o valor da faixa
 * UMA VEZ; a "assinatura" no nosso banco é renovada manualmente sempre que
 * o assinante paga de novo (mesma lógica de prazo de `validoAte` que o
 * `demo` e o `pagbank` já usam — só muda quem inicia a cobrança).
 *
 * Confirmação de pagamento é MANUAL, igual ao Crime Brasil: o PagBank não
 * manda webhook pra essa conta nesse fluxo de link. O admin confere o
 * pagamento no histórico de pedidos do PagBank
 * (https://minhaconta.pagseguro.uol.com.br/), casa pelo e-mail do
 * comprador, e confirma via `POST /api/assinatura/admin/confirmar-pagamento`
 * (ver aquele route.ts — é quem realmente atualiza `assinantes.status` e
 * `validoAte`, não este arquivo).
 *
 * Env vars (nenhum valor cravado no código):
 *  - PAGSEGURO_LINK_MENSAL — link fixo do plano mensal (R$ 49,90).
 *  - PAGSEGURO_LINK_ANUAL  — link fixo do plano anual (R$ 499).
 *
 * Falha alto, nunca calado: se a env da faixa pedida estiver vazia,
 * `iniciarAssinatura` devolve `{ ok: false, erro: "..." }` com uma mensagem
 * clara — nunca cai silenciosamente para o provedor demo. Essa ausência de
 * configuração É a trava de segurança agora (ver comentário em
 * `getProvedorPagamento()` em `src/lib/assinatura.ts`): sem os links
 * configurados, ninguém consegue nem começar um checkout de verdade.
 */

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes, cobrancas } from "@/lib/db/schema";
import { PRECOS, type ProvedorPagamento } from "@/lib/assinatura";

/**
 * Leitura LAZY da env, nunca no topo do módulo: este arquivo é importado em
 * cadeia por `assinatura.ts`, que por sua vez é importado por página que o
 * `next build` executa. Ler no topo congelaria o valor do BUILD (onde as
 * envs de link não existem) e o container serviria "link não configurado"
 * mesmo com a env setada no Coolify. Mesmo motivo pelo qual o segredo de
 * sessão em `assinatura.ts` virou lazy em 29/08/2026.
 */
function getLink(plano: "mensal" | "anual"): string {
  const bruto = plano === "mensal" ? process.env.PAGSEGURO_LINK_MENSAL : process.env.PAGSEGURO_LINK_ANUAL;
  return (bruto || "").trim();
}

/** `true` só quando AS DUAS faixas têm link configurado. Uso: diagnóstico/monitoramento — a checagem que de fato bloqueia uma faixa sem link é feita dentro de `iniciarAssinatura`, por faixa. */
export function pagseguroLinkConfigurado(): boolean {
  return getLink("mensal").length > 0 && getLink("anual").length > 0;
}

export const provedorPagSeguroLink: ProvedorPagamento = {
  nome: "pagseguro_link",

  async iniciarAssinatura({ assinanteId, plano }) {
    const link = getLink(plano);
    if (!link) {
      return {
        ok: false,
        erro:
          `Link de pagamento do plano ${plano} não configurado ` +
          `(env PAGSEGURO_LINK_${plano.toUpperCase()} ausente).`,
      };
    }

    // Id próprio por tentativa de checkout (não é id nenhum do PagBank — o
    // link não devolve nada pra gente nesse momento). É essa string que vira
    // `provedor_evento_id` da cobrança "iniciada" E `provedorAssinaturaId`
    // do assinante — a confirmação manual usa exatamente ESSE valor como
    // chave de idempotência (ver confirmar-pagamento/route.ts).
    const provedorAssinaturaId = `pslink_${assinanteId}_${plano}_${Date.now()}`;
    const valorReais = PRECOS[plano].valor;

    await db
      .update(assinantes)
      .set({ plano, status: "pendente", provedor: "pagseguro_link", provedorAssinaturaId })
      .where(eq(assinantes.id, assinanteId));

    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pagseguro_link",
      provedorEventoId: provedorAssinaturaId,
      tipo: "assinatura_iniciada",
      valor: valorReais.toString(),
      status: "pendente",
      payload: { plano, link, nota: "checkout via PagBank Payment Link — confirmação manual pelo admin" },
    });

    return { ok: true, provedorAssinaturaId, checkoutUrl: link };
  },

  async cancelarAssinatura({ assinanteId, provedorAssinaturaId }) {
    // Link de pagamento avulso não tem assinatura recorrente nenhuma no
    // PagBank pra cancelar — é o mesmo racional do ramo `CHEC_...` (checkout
    // que nunca virou assinatura) em `pagbank.ts`. Só registra a intenção;
    // `podeVer()` já respeita `validoAte`, então o acesso pago continua até
    // o fim do período já pago — cancelar só impede a próxima renovação
    // manual, não corta o que já foi pago.
    await db.insert(cobrancas).values({
      assinanteId,
      provedor: "pagseguro_link",
      provedorEventoId: provedorAssinaturaId
        ? `${provedorAssinaturaId}_cancel`
        : `pslink_cancel_${assinanteId}_${Date.now()}`,
      tipo: "cancelamento_solicitado",
      status: "recebido",
      payload: {
        nota:
          "pagseguro_link não tem cobrança recorrente automática no PagBank — nada a cancelar num gateway; " +
          "a renovação simplesmente não é oferecida de novo.",
      },
    });
    return { ok: true };
  },
};
