import { execFileSync } from "child_process";

/**
 * Fetch da página de detalhe de um imóvel na Caixa — compartilhado entre
 * `scrape-details.ts` (quartos/vagas/foto) e `scrape-edital.ts` (edital,
 * leilão, matrícula). Extraído de `scrapePropertyDetails` sem mudar
 * comportamento: mesmos headers, mesmo timeout, mesma detecção de bloqueio.
 */

export const DETAIL_BASE_URL =
  "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=";

export class DetailFetchBlockedError extends Error {}

export function detailUrlFor(property: { caixaId: string; linkCaixa: string | null }): string {
  return property.linkCaixa?.trim() ? property.linkCaixa.trim() : `${DETAIL_BASE_URL}${property.caixaId}`;
}

/**
 * Busca o HTML cru (latin1 — a página da Caixa não é UTF-8) da página de
 * detalhe. Lança `DetailFetchBlockedError` se o Radware Bot Manager bloqueou
 * a requisição — quem chama decide se isso conta para o limiar de aborto.
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

  const html = htmlBuffer.toString("latin1");

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
