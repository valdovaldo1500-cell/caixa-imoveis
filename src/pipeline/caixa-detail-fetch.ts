import { execFileSync } from "child_process";

/**
 * Fetch da página de detalhe de um imóvel na Caixa — compartilhado entre
 * `scrape-details.ts` (quartos/vagas/foto) e `scrape-edital.ts` (edital,
 * leilão, matrícula). Extraído de `scrapePropertyDetails` preservando headers,
 * timeout e detecção de bloqueio — a ÚNICA mudança de comportamento é a
 * decodificação (ver comentário em `fetchDetailHtml`), que não regride nada:
 * o parser antigo (`findValue`, baseado em `<td>`/`<th>`) já não casava com
 * o DOM atual (`<span>Rótulo: <strong>valor</strong></span>`) então nunca
 * dependeu do encoding pra extrair nada além de `fotoUrl` (uma URL, ASCII) e
 * das palavras-chave de bloqueio (também ASCII).
 */

export const DETAIL_BASE_URL =
  "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=";

export class DetailFetchBlockedError extends Error {}

export function detailUrlFor(property: { caixaId: string; linkCaixa: string | null }): string {
  return property.linkCaixa?.trim() ? property.linkCaixa.trim() : `${DETAIL_BASE_URL}${property.caixaId}`;
}

/**
 * Busca o HTML cru da página de detalhe. Lança `DetailFetchBlockedError` se
 * o Radware Bot Manager bloqueou a requisição — quem chama decide se isso
 * conta para o limiar de aborto.
 *
 * DECODE UTF-8 (31/08/2026): a página da Caixa declara `<meta
 * charset="utf-8">` e serve bytes UTF-8 de verdade (confirmado byte a byte:
 * "Leilão" = `4c 65 69 6c c3 a3 6f`, i.e. 0xC3 0xA3 = 'ã' em UTF-8 — como
 * latin1 seria dois caracteres soltos, "Ã" + "£"). O código anterior fazia
 * `.toString("latin1")`; não quebrava nada que já funcionava (ver comentário
 * no topo do arquivo) mas teria mojibaked qualquer valor acentuado que este
 * coletor viesse a extrair (nome de leiloeiro, comarca).
 */
export function fetchDetailHtml(property: { caixaId: string; linkCaixa: string | null }): string {
  const url = detailUrlFor(property);

  const htmlBuffer = execFileSync(
    "curl",
    [
      "-s",
      "-L",
      "--max-time", "30",
      "-H", "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "-H", "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8",
      "-H", "Referer: https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp",
      url,
    ],
    { timeout: 45000 }
  );

  const html = htmlBuffer.toString("utf8");

  if (
    html.includes("Radware") ||
    html.includes("Bot Manager") ||
    html.includes("Access Denied") ||
    html.length < 500
  ) {
    throw new DetailFetchBlockedError("Request blocked by Radware Bot Manager");
  }

  return html;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
