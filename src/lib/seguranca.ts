/**
 * Camada de segurança dos imóveis (O6).
 *
 * A nota vem de `app.score_nacional` (grão bairro OU município) no banco de
 * crime e é gravada em `properties.crime_*` pelo job de dados. Desde a
 * entrada do grão bairro (31/08/2026, RS ~815 de 953 imóveis), `crimeNota`/
 * `crimeGrao`/`crimeFonte`/`crimeJanela*`/`crimeOcorrencias`/`crimePercentil`
 * descrevem sempre O GRÃO EXIBIDO (bairro quando resolvido, senão
 * município); as colunas `crimeMuni*` guardam SEMPRE o contexto municipal,
 * mesmo quando a nota exibida é a do bairro.
 *
 * TRÊS CUIDADOS que já causaram erro aqui:
 *
 * 1. `crimeNota` é nota de RISCO: **quanto MAIOR, MAIS violento**. É o oposto
 *    da convenção de `scoring.ts`, onde nota alta é boa. Nunca reaproveite a
 *    nota crua como se fosse "segurança".
 *
 * 2. `crimeTaxa` é a única grandeza que pode ser escrita em português na tela
 *    como "mortes violentas por 100 mil habitantes/ano" — e ela SÓ existe no
 *    grão MUNICÍPIO (`crimeMuniTaxa` é o equivalente sempre-municipal). No
 *    grão bairro `crimeTaxa` é NULL de propósito: a `taxa_letal` de bairro
 *    tem denominador de endereços, não de habitantes, e rotulá-la "por 100
 *    mil habitantes" seria falso.
 *
 * 3. As RÉGUAS de bairro e de município são DIFERENTES — não dá para
 *    comparar `crimeNota` cru entre os dois grãos. Medido em 31/08/2026
 *    sobre notas não suprimidas:
 *      município (n=3.615): p20=400 p40=460 mediana=489 p60=520 p80=589
 *      bairro    (n=10.748): p20=374 p40=435 mediana=454 p60=469 p80=497
 *    Uma nota 497 é "médio" na régua municipal e "entre os 20% piores" na de
 *    bairro. Por isso o nível vem de `crimePercentil` (0-100, percentil
 *    nacional DENTRO do próprio grão) — a única grandeza comparável entre
 *    bairro e município. Filtro e ordenação de risco usam SEMPRE
 *    `crimePercentil`, nunca `crimeNota`. As faixas de nota abaixo só
 *    existem como QUEDA DE BRAÇO para linhas antigas ainda sem percentil.
 */

export const FAIXAS_MUNICIPIO = { p20: 400, p40: 460, mediana: 489, p60: 520, p80: 589 } as const;
export const FAIXAS_BAIRRO = { p20: 374, p40: 435, mediana: 454, p60: 469, p80: 497 } as const;

export type NivelSeguranca = "baixo" | "moderado" | "medio" | "alto" | "muito_alto";

/** Teto de percentil (0-100) por nível — é o que filtro e ordenação usam. `null` = sem teto. */
export const TETO_PERCENTIL: Record<NivelSeguranca, number | null> = {
  baixo: 20,
  moderado: 40,
  medio: 60,
  alto: 80,
  muito_alto: null,
};

export type Seguranca = {
  nivel: NivelSeguranca;
  rotulo: string;
  /** Faixa percentil nacional, para a frase de contexto — já no vocabulário do grão. */
  contexto: string;
  /** Classes Tailwind do badge. */
  cor: string;
  nota: number;
  /** Percentil nacional (0-100) dentro do próprio grão. Pode ser `null` em linha ainda não reprocessada. */
  percentil: number | null;
  /** "municipio" | "bairro" | "ponto" — código cru do grão, para lógica condicional na tela. */
  graoCodigo: string;
  /** Mortes violentas/100 mil hab./ano. Só existe no grão município — NULL no grão bairro. */
  taxa: number | null;
  grao: string;
  fonte: string;
  janela: string;
  /** Nome do bairro que gerou a nota (pode ser `null` no grão município). */
  bairroNome: string | null;
  bairroOrigem: "nome" | "coordenada" | null;
  /** Ocorrências na janela, no grão exibido. */
  ocorrencias: number | null;
  /** `true` quando `ocorrencias < 20` — base pequena, tela mostra ressalva. */
  poucosDados: boolean;
  /** Contexto municipal sempre presente (mesmo quando o grão exibido é bairro), se houver dado. */
  municipio: { taxa: number; janela: string; fonte: string } | null;
};

const NIVEIS: Record<NivelSeguranca, { rotulo: string; cor: string; contexto: (substantivo: string) => string }> = {
  baixo: {
    rotulo: "Risco baixo",
    cor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    contexto: (s) => `entre os 20% de ${s} menos violentos do país`,
  },
  moderado: {
    rotulo: "Risco moderado",
    cor: "bg-lime-500/15 text-lime-300 border-lime-500/30",
    contexto: () => "abaixo da mediana nacional",
  },
  medio: {
    rotulo: "Risco médio",
    cor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    // A faixa central atravessa a mediana nacional em qualquer um dos dois
    // grãos, então NÃO pode afirmar um lado — "acima da mediana" seria falso
    // para metade dos casos da faixa.
    contexto: () => "na faixa central do país, perto da mediana nacional",
  },
  alto: {
    rotulo: "Risco alto",
    cor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    contexto: () => "entre os 40% mais violentos do país",
  },
  muito_alto: {
    rotulo: "Risco muito alto",
    cor: "bg-red-500/15 text-red-300 border-red-500/30",
    contexto: (s) => `entre os 20% de ${s} mais violentos do país`,
  },
};

const GRAOS: Record<string, string> = {
  municipio: "do município",
  bairro: "do bairro",
  ponto: "do endereço",
};

const SUBSTANTIVO_PLURAL: Record<string, string> = {
  municipio: "municípios",
  bairro: "bairros",
  ponto: "endereços",
};

/** Nível a partir do percentil nacional (0-100) — a régua preferida, comparável entre grãos. */
function nivelDoPercentil(percentil: number): NivelSeguranca {
  if (percentil < 20) return "baixo";
  if (percentil < 40) return "moderado";
  if (percentil < 60) return "medio";
  if (percentil < 80) return "alto";
  return "muito_alto";
}

/**
 * Fallback para linha ainda sem `crimePercentil` (job antigo, não
 * reprocessado): usa a régua de NOTA do próprio grão, para não quebrar nem
 * misturar a régua errada.
 */
function nivelDaNota(nota: number, grao: string): NivelSeguranca {
  const faixas = grao === "bairro" ? FAIXAS_BAIRRO : FAIXAS_MUNICIPIO;
  if (nota < faixas.p20) return "baixo";
  if (nota < faixas.p40) return "moderado";
  if (nota < faixas.p60) return "medio";
  if (nota < faixas.p80) return "alto";
  return "muito_alto";
}

export type CrimeCampos = {
  crimeNota: number | null;
  crimeTaxa: string | number | null;
  crimeGrao: string | null;
  crimeFonte: string | null;
  crimeJanelaInicio: Date | string | null;
  crimeJanelaFim: Date | string | null;
  crimeSuprimido: boolean | null;
  crimePercentil?: number | null;
  crimeBairro?: string | null;
  crimeBairroOrigem?: string | null;
  crimeOcorrencias?: number | null;
  crimeMuniNota?: number | null;
  crimeMuniTaxa?: string | number | null;
  crimeMuniJanelaInicio?: Date | string | null;
  crimeMuniJanelaFim?: Date | string | null;
  crimeMuniFonte?: string | null;
};

const OCORRENCIAS_MINIMAS = 20;

/**
 * Devolve `null` quando não há nota confiável — grão suprimido por poucos
 * eventos, ou imóvel ainda sem casamento. A tela deve mostrar "dado
 * insuficiente", nunca um número inventado ou um neutro fixo.
 */
export function lerSeguranca(p: CrimeCampos): Seguranca | null {
  if (p.crimeNota == null || p.crimeSuprimido) return null;

  const grao = p.crimeGrao ?? "municipio";
  const percentil = p.crimePercentil ?? null;
  const nivel = percentil != null ? nivelDoPercentil(percentil) : nivelDaNota(p.crimeNota, grao);
  const meta = NIVEIS[nivel];
  const taxa = p.crimeTaxa == null ? null : Number(p.crimeTaxa);
  const ocorrencias = p.crimeOcorrencias ?? null;

  const muniTaxa = p.crimeMuniTaxa == null ? null : Number(p.crimeMuniTaxa);
  const municipio =
    grao === "bairro" && muniTaxa != null && Number.isFinite(muniTaxa)
      ? {
          taxa: muniTaxa,
          janela: janelaLegivel(p.crimeMuniJanelaInicio ?? null, p.crimeMuniJanelaFim ?? null),
          fonte: p.crimeMuniFonte ?? "DATASUS/SIM",
        }
      : null;

  return {
    nivel,
    rotulo: meta.rotulo,
    contexto: meta.contexto(SUBSTANTIVO_PLURAL[grao] ?? "municípios"),
    cor: meta.cor,
    nota: p.crimeNota,
    percentil,
    graoCodigo: grao,
    taxa: Number.isFinite(taxa) ? taxa : null,
    grao: GRAOS[grao] ?? "do município",
    fonte: p.crimeFonte ?? "DATASUS/SIM",
    janela: janelaLegivel(p.crimeJanelaInicio, p.crimeJanelaFim),
    bairroNome: p.crimeBairro ?? null,
    bairroOrigem: p.crimeBairroOrigem === "nome" || p.crimeBairroOrigem === "coordenada" ? p.crimeBairroOrigem : null,
    ocorrencias,
    poucosDados: ocorrencias != null && ocorrencias < OCORRENCIAS_MINIMAS,
    municipio,
  };
}

export type CamposMunicipio = {
  crimeMuniNota?: number | null;
  crimeMuniTaxa?: string | number | null;
  crimeMuniJanelaInicio?: Date | string | null;
  crimeMuniJanelaFim?: Date | string | null;
  crimeMuniFonte?: string | null;
  // Fallback para linha ainda não reprocessada (crime_muni_* nulo): quando o
  // grão exibido daquela linha já era município, as colunas antigas SÃO o
  // contexto municipal.
  crimeNota?: number | null;
  crimeTaxa?: string | number | null;
  crimeGrao?: string | null;
  crimeFonte?: string | null;
  crimeJanelaInicio?: Date | string | null;
  crimeJanelaFim?: Date | string | null;
  crimeSuprimido?: boolean | null;
};

/**
 * Leitura SEMPRE municipal — para os agregados de cidade (parágrafo de SEO
 * da lista, `generateMetadata`), onde a nota de UM imóvel amostrado não pode
 * mais representar a cidade inteira: com grão bairro, dois imóveis na mesma
 * cidade têm notas diferentes. As colunas `crime_muni_*` valem para
 * qualquer imóvel da cidade, então aqui a régua é sempre `FAIXAS_MUNICIPIO`
 * direto sobre `crimeMuniNota` — nunca precisa de percentil.
 */
export function lerSegurancaMunicipio(p: CamposMunicipio): Seguranca | null {
  if (p.crimeMuniNota != null) {
    const nivel = nivelDaNota(p.crimeMuniNota, "municipio");
    const meta = NIVEIS[nivel];
    const taxa = p.crimeMuniTaxa == null ? null : Number(p.crimeMuniTaxa);
    return {
      nivel,
      rotulo: meta.rotulo,
      contexto: meta.contexto("municípios"),
      cor: meta.cor,
      nota: p.crimeMuniNota,
      percentil: null,
      graoCodigo: "municipio",
      taxa: Number.isFinite(taxa) ? taxa : null,
      grao: GRAOS.municipio,
      fonte: p.crimeMuniFonte ?? "DATASUS/SIM",
      janela: janelaLegivel(p.crimeMuniJanelaInicio ?? null, p.crimeMuniJanelaFim ?? null),
      bairroNome: null,
      bairroOrigem: null,
      ocorrencias: null,
      poucosDados: false,
      municipio: null,
    };
  }

  // Linha ainda não reprocessada: se o grão exibido já era município, as
  // colunas antigas valem como contexto municipal.
  if ((p.crimeGrao ?? "municipio") === "municipio") {
    return lerSeguranca({
      crimeNota: p.crimeNota ?? null,
      crimeTaxa: p.crimeTaxa ?? null,
      crimeGrao: p.crimeGrao ?? "municipio",
      crimeFonte: p.crimeFonte ?? null,
      crimeJanelaInicio: p.crimeJanelaInicio ?? null,
      crimeJanelaFim: p.crimeJanelaFim ?? null,
      crimeSuprimido: p.crimeSuprimido ?? null,
    });
  }

  return null;
}

function ano(d: Date | string | null): string | null {
  if (!d) return null;
  const s = typeof d === "string" ? d : d.toISOString();
  return s.slice(0, 4);
}

function janelaLegivel(ini: Date | string | null, fim: Date | string | null): string {
  const a = ano(ini);
  const b = ano(fim);
  if (a && b) return a === b ? a : `${a} a ${b}`;
  return b ?? a ?? "";
}

/** A frase de fonte que vai embaixo do número. Sempre exibida junto. */
export function fraseFonte(s: Seguranca): string {
  const taxa = s.taxa == null ? null : s.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  const base = `Média ${s.grao}, ${s.janela}. Fonte: ${s.fonte}.`;
  return taxa ? `${taxa} mortes violentas por 100 mil habitantes ao ano. ${base}` : base;
}

/**
 * Linha de contexto municipal — só existe quando o grão exibido é bairro
 * (no grão município ela seria repetir a mesma informação da frase acima).
 */
export function fraseMunicipio(s: Seguranca): string | null {
  if (!s.municipio) return null;
  const taxa = s.municipio.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return `No município: ${taxa} mortes violentas por 100 mil habitantes ao ano (${s.municipio.janela}). Fonte: ${s.municipio.fonte}.`;
}

/** Ressalva de base pequena — nunca esconde a nota, só avisa que ela pode oscilar mais. */
export function fraseAvisoPoucosDados(s: Seguranca): string | null {
  if (!s.poucosDados) return null;
  return s.graoCodigo === "bairro"
    ? "Poucas ocorrências no período para este bairro — o número tende a ser mais estável no município."
    : "Poucas ocorrências no período para este município — o número tende a oscilar mais quanto menor a base.";
}

/**
 * Nota curta para quando o bairro foi resolvido por coordenada (ponto no
 * polígono do IBGE), não por casamento de nome — casos como "LOT RURAL
 * ELDORADO" (Caixa) virando "Centro", ou "TANCREDO NEVES" em Ijuí virando o
 * bairro homônimo.
 */
export function fraseOrigemBairro(s: Seguranca): string | null {
  if (s.graoCodigo !== "bairro" || s.bairroOrigem !== "coordenada") return null;
  return "O bairro foi identificado pela localização do imóvel no mapa: o cadastro da Caixa traz o nome do loteamento, não o bairro oficial.";
}
