export interface ParsedDescription {
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  areaTotalM2: number | null;
  areaPrivativaM2: number | null;
  areaTerreno: number | null;
}

/**
 * Parses property info from the descricao field.
 * Example: "Casa, 0.00 de área total, 146.57 de área privativa, 285.20 de área do terreno,
 *           3 qto(s), WC, 1 sala(s), cozinha, 1 vaga(s) de garagem."
 */
export function parseDescription(desc: string): ParsedDescription {
  if (!desc || !desc.trim()) {
    return {
      tipoImovel: null,
      quartos: null,
      vagas: null,
      areaTotalM2: null,
      areaPrivativaM2: null,
      areaTerreno: null,
    };
  }

  // Tipo: first word(s) before the first comma
  const tipoMatch = desc.match(/^([^,]+)/);
  const tipoImovel = tipoMatch ? tipoMatch[1].trim() || null : null;

  // Area total: number before "de área total"
  const areaTotalMatch = desc.match(/([\d]+(?:[.,]\d+)?)\s+de\s+área\s+total/i);
  const areaTotalM2 = areaTotalMatch ? parsePortugueseFloat(areaTotalMatch[1]) : null;

  // Area privativa: number before "de área privativa"
  const areaPrivMatch = desc.match(/([\d]+(?:[.,]\d+)?)\s+de\s+área\s+privativa/i);
  const areaPrivativaM2 = areaPrivMatch ? parsePortugueseFloat(areaPrivMatch[1]) : null;

  // Area terreno: number before "de área do terreno"
  const areaTerrenoMatch = desc.match(/([\d]+(?:[.,]\d+)?)\s+de\s+área\s+do\s+terreno/i);
  const areaTerreno = areaTerrenoMatch ? parsePortugueseFloat(areaTerrenoMatch[1]) : null;

  // Quartos: number before "qto"
  const quartosMatch = desc.match(/(\d+)\s+qto/i);
  const quartos = quartosMatch ? parseInt(quartosMatch[1], 10) : null;

  // Vagas: number before "vaga"
  const vagasMatch = desc.match(/(\d+)\s+vaga/i);
  const vagas = vagasMatch ? parseInt(vagasMatch[1], 10) : null;

  return {
    tipoImovel,
    quartos,
    vagas,
    areaTotalM2,
    areaPrivativaM2,
    areaTerreno,
  };
}

function parsePortugueseFloat(value: string): number | null {
  if (!value) return null;
  // Brazilian format uses comma as decimal separator sometimes, but the CSV uses dot
  const normalized = value.replace(",", ".");
  const num = parseFloat(normalized);
  return isNaN(num) || num === 0 ? null : num;
}
