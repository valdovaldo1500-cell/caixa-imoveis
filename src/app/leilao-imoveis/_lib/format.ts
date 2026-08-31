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
  // Desconto 0 não é desconto: no "Leilão SFI - Edital Único" o lance mínimo
  // é a dívida e empata (ou passa) a avaliação. O selo "-0%" sujava o card.
  if (!Number.isFinite(n) || n <= 0) return null;
  return n.toFixed(0);
}

export function areaTexto(m2: string | number | null | undefined): string | null {
  if (m2 == null) return null;
  const n = Number(m2);
  if (!Number.isFinite(n) || n <= 0) return null;
  return `${n.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} m²`;
}

// --- Rastreador de edital (O6, requisito #7) ---------------------------

/** Mesma pegadinha de cache documentada em `imovel/_lib/helpers.ts`: `Date`
 * num cache MISS, `string` ISO num cache HIT de `unstable_cache`. */
export function paraData(v: Date | string | null | undefined): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Data mais próxima e ainda no futuro entre 1º/2º leilão, licitação e prazo
 * de proposta — a "urgência" da listagem. NUNCA retorna uma data passada:
 * se o leilão já ocorreu e o imóvel segue ativo, não inventamos contagem
 * regressiva pra ele (a Caixa provavelmente ainda não republicou o edital).
 */
export function proximaDataUrgencia(imovel: {
  leilao1Data?: Date | string | null;
  leilao2Data?: Date | string | null;
  licitacaoData?: Date | string | null;
  propostaPrazo?: Date | string | null;
}): { rotulo: string; valor: Date } | null {
  // O rótulo já carrega a preposição. O card montava `{rotulo} em {data}`, o que
  // dava "Proposta até em 31/08" — pego no hard check de 31/08/2026. Com a
  // preposição aqui, cada rótulo escolhe a sua e o card só concatena.
  const candidatas: { rotulo: string; valor: Date | null }[] = [
    { rotulo: "1º leilão em", valor: paraData(imovel.leilao1Data) },
    { rotulo: "2º leilão em", valor: paraData(imovel.leilao2Data) },
    { rotulo: "Licitação em", valor: paraData(imovel.licitacaoData) },
    { rotulo: "Proposta até", valor: paraData(imovel.propostaPrazo) },
  ];
  const futuras = candidatas.filter(
    (c): c is { rotulo: string; valor: Date } => c.valor != null && c.valor.getTime() > Date.now()
  );
  if (futuras.length === 0) return null;
  return futuras.reduce((menor, atual) => (atual.valor < menor.valor ? atual : menor));
}

/** "14/10" — sem ano, é sempre um evento próximo (o filtro já garante futuro). */
export function dataCurta(d: Date): string {
  return d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });
}
