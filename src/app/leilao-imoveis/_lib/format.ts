/**
 * Formatação compartilhada das páginas de lista do agregador (O6) — hub de
 * estado e lista de cidade.
 *
 * Duplica de propósito um subconjunto pequeno do que já existe em
 * `src/app/imovel/_lib/helpers.ts`: aquela pasta é escrita por outro agente
 * em paralelo (ficha do imóvel), e importar dali criaria acoplamento entre
 * duas áreas que precisam poder mudar independentemente na mesma sessão.
 */

export function formatBRL(valor: string | number | null | undefined): string | null {
  if (valor == null) return null;
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

const PREPOSICOES = new Set(["de", "da", "do", "das", "dos", "e"]);

/** "PORTO ALEGRE" -> "Porto Alegre". Os nomes de cidade vêm em caixa alta da fonte. */
export function tituloCaso(txt: string | null | undefined): string {
  if (!txt) return "";
  return txt
    .toLowerCase()
    .split(" ")
    .map((palavra, i) =>
      i > 0 && PREPOSICOES.has(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");
}

/** "44.3" -> "44" — só o número, sem sinal. Quem exibe decide o "-"/"%". */
export function descontoTexto(valor: string | number | null | undefined): string | null {
  if (valor == null) return null;
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return n.toFixed(0);
}

export function areaTexto(m2: string | number | null | undefined): string | null {
  if (m2 == null) return null;
  const n = Number(m2);
  if (!Number.isFinite(n) || n <= 0) return null;
  return `${n.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} m²`;
}
