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
 * 2. `crimeTaxa` é "mortes violentas por 100 mil habitantes/ano" e existe nos
 *    DOIS grãos, mas não vem da mesma conta. No município é a taxa do IBGE/
 *    DATASUS direto. No bairro é calculada sobre a população do Censo 2022 e
 *    SUAVIZADA por credibilidade: a divisão crua produz 724 por 100 mil num
 *    bairro de 276 moradores com 2 mortes — artefato de número pequeno, não
 *    taxa. Por isso a tela chama o número de bairro de ESTIMATIVA. Fica
 *    `null` quando o bairro não tem população no Censo (cerca de 30% dos
 *    bairros do RS); aí a tela cai em `crimeMuniTaxa` como contexto.
 *    O que NUNCA pode virar "por 100 mil habitantes" é a `taxa_letal` de
 *    bairro da origem: aquela tem denominador de ENDEREÇOS.
 *
 * 3. O NÍVEL (o selo colorido) descreve a TAXA que aparece do lado dele, e
 *    nada mais. `crimePercentil` é o percentil dessa taxa na distribuição
 *    nacional de mortes por 100 mil habitantes/ano — 5.570 municípios,
 *    medida em 31/08/2026: p20=5,3 p40=11,0 mediana=14,4 p60=18,3 p80=29,8.
 *    Uma medida, uma régua, nos dois grãos.
 *
 *    NÃO volte a tirar o nível de `crimeNota`. Foi assim na primeira versão
 *    e o resultado apareceu no primeiro print de borda: `nota_letal` não
 *    mede morte por habitante (correlação 0,338 no bairro do RS), então o
 *    selo contradizia o número que rotulava — 209 de 653 imóveis com selo
 *    "alto"/"muito alto" e taxa ABAIXO da do próprio município. Morro
 *    Santana, em Porto Alegre, saía no percentil 99 com 11,3 contra 22,0 da
 *    cidade.
 *
 *    Efeito colateral bom: como a taxa está na mesma unidade nos dois grãos,
 *    isto também dissolveu o problema das réguas de NOTA serem diferentes
 *    entre bairro (mediana 454) e município (mediana 489).
 *
 *    Filtro e ordenação de risco usam SEMPRE `crimePercentil`.
 */

/**
 * Quintis nacionais de mortes violentas por 100 mil habitantes/ano, sobre os
 * 5.570 municípios de `app.ancora_letal` (medido 31/08/2026). É a régua do
 * produto — vale para a taxa do município E para a estimativa do bairro,
 * porque as duas estão na mesma unidade.
 */
export const FAIXAS_TAXA = { p20: 5.3, p40: 11.0, mediana: 14.4, p60: 18.3, p80: 29.8 } as const;

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
  /** Mortes violentas/100 mil hab./ano — o número que a tela exibe. Nunca nulo. */
  taxa: number;
  /** `true` quando conhecemos o bairro mas a taxa exibida é a do município. */
  taxaEDoMunicipio: boolean;
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

/**
 * `contexto` recebe `true` quando o número classificado é de um BAIRRO.
 *
 * A régua é sempre a distribuição dos 5.570 municípios, mas a frase muda de
 * forma: "Bairro Navegantes está entre os 20% de municípios mais violentos"
 * é confuso — o bairro não é um município. Na forma comparativa ("tem taxa
 * acima da de 80% dos municípios") a mesma verdade lê direito nos dois casos,
 * e continua explícito de que universo a comparação sai.
 */
const NIVEIS: Record<NivelSeguranca, { rotulo: string; cor: string; contexto: (bairro: boolean) => string }> = {
  baixo: {
    rotulo: "Risco baixo",
    cor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    contexto: (b) =>
      b ? "com taxa abaixo da de 80% dos municípios do país" : "entre os 20% de municípios menos violentos do país",
  },
  moderado: {
    rotulo: "Risco moderado",
    cor: "bg-lime-500/15 text-lime-300 border-lime-500/30",
    contexto: () => "abaixo da mediana nacional",
  },
  medio: {
    rotulo: "Risco médio",
    cor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    // A faixa central atravessa a mediana nacional, então NÃO pode afirmar um
    // lado — "acima da mediana" seria falso para metade dos casos da faixa.
    contexto: () => "na faixa central do país, perto da mediana nacional",
  },
  alto: {
    rotulo: "Risco alto",
    cor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    contexto: (b) =>
      b ? "com taxa acima da de 60% dos municípios do país" : "entre os 40% mais violentos do país",
  },
  muito_alto: {
    rotulo: "Risco muito alto",
    cor: "bg-red-500/15 text-red-300 border-red-500/30",
    contexto: (b) =>
      b ? "com taxa acima da de 80% dos municípios do país" : "entre os 20% de municípios mais violentos do país",
  },
};

const GRAOS: Record<string, string> = {
  municipio: "do município",
  bairro: "do bairro",
  ponto: "do endereço",
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
 * reprocessado): classifica a própria taxa nas faixas nacionais. Mesma
 * medida do caminho principal, só sem o percentil exato.
 */
function nivelDaTaxa(taxa: number): NivelSeguranca {
  if (taxa < FAIXAS_TAXA.p20) return "baixo";
  if (taxa < FAIXAS_TAXA.p40) return "moderado";
  if (taxa < FAIXAS_TAXA.p60) return "medio";
  if (taxa < FAIXAS_TAXA.p80) return "alto";
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
  crimeMarcado?: boolean | null;
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
 * Devolve `null` quando não há nota que valha a pena mostrar, ou quando o
 * imóvel ainda não casou com nenhum grão. A tela mostra "dado insuficiente",
 * nunca um número inventado ou um neutro fixo.
 *
 * QUANDO ESCONDER — decisão do dono em 31/08/2026, não mexa sem falar com
 * ele. Na origem, `suprimido` marca 1 a 9 ocorrências na janela e `marcado`
 * marca 10 a 19. Poucas ocorrências quase sempre quer dizer LUGAR CALMO, e
 * esconder isso é esconder notícia boa: há bairro suprimido com 40 mil
 * endereços e nenhum homicídio. Então a nota aparece, com a ressalva de
 * `fraseAvisoPoucosDados`.
 *
 * O único caso escondido é `suprimido E marcado` ao mesmo tempo (21 bairros
 * no RS): ali o critério da origem é misto e o número sai distorcido —
 * são Centros onde a ocorrência é de quem não mora no bairro, e o
 * denominador é residencial. Ex.: Costa e Silva, em Porto Alegre, daria
 * taxa 75,2. Esses caem de volta para o município.
 */
export function lerSeguranca(p: CrimeCampos): Seguranca | null {
  if (p.crimeNota == null) return null;
  if (p.crimeSuprimido && p.crimeMarcado) return null;

  const grao = p.crimeGrao ?? "municipio";
  const percentil = p.crimePercentil ?? null;
  const taxaPropria = p.crimeTaxa == null ? null : Number(p.crimeTaxa);
  const muniTaxaBruta = p.crimeMuniTaxa == null ? null : Number(p.crimeMuniTaxa);

  // O NÚMERO EXIBIDO. Quando o bairro não tem população no Censo não existe
  // taxa própria, e o card mostra a do município — é isso que o selo
  // classifica, senão ele voltaria a rotular um número que não está na tela.
  const taxa = Number.isFinite(taxaPropria as number)
    ? (taxaPropria as number)
    : Number.isFinite(muniTaxaBruta as number)
      ? (muniTaxaBruta as number)
      : null;
  if (taxa == null) return null;

  const nivel = percentil != null ? nivelDoPercentil(percentil) : nivelDaTaxa(taxa);
  const meta = NIVEIS[nivel];
  const ocorrencias = p.crimeOcorrencias ?? null;
  /** `true` quando o número exibido é o do município, apesar de sabermos o bairro. */
  const taxaEDoMunicipio = !Number.isFinite(taxaPropria as number);

  // A linha de comparação municipal só faz sentido quando o número principal
  // é o do bairro; se o principal JÁ é o do município, repetir seria ruído.
  const municipio =
    grao === "bairro" && !taxaEDoMunicipio && Number.isFinite(muniTaxaBruta as number)
      ? {
          taxa: muniTaxaBruta as number,
          janela: janelaLegivel(p.crimeMuniJanelaInicio ?? null, p.crimeMuniJanelaFim ?? null),
          fonte: p.crimeMuniFonte ?? "DATASUS/SIM",
        }
      : null;

  return {
    nivel,
    rotulo: meta.rotulo,
    // Dizer "entre os 20% de bairros mais violentos" seria falso: bairro
    // nenhum entrou na régua, que é feita de municípios.
    contexto: meta.contexto(grao === "bairro" && !taxaEDoMunicipio),
    cor: meta.cor,
    nota: p.crimeNota,
    percentil,
    graoCodigo: grao,
    taxa,
    taxaEDoMunicipio,
    grao: GRAOS[taxaEDoMunicipio ? "municipio" : grao] ?? "do município",
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
  const muniTaxa = p.crimeMuniTaxa == null ? null : Number(p.crimeMuniTaxa);
  if (p.crimeMuniNota != null && muniTaxa != null && Number.isFinite(muniTaxa)) {
    const nivel = nivelDaTaxa(muniTaxa);
    const meta = NIVEIS[nivel];
    return {
      nivel,
      rotulo: meta.rotulo,
      contexto: meta.contexto(false),
      cor: meta.cor,
      nota: p.crimeMuniNota,
      percentil: null,
      graoCodigo: "municipio",
      taxa: muniTaxa,
      taxaEDoMunicipio: false,
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

/**
 * A frase de fonte que vai embaixo do número. Sempre exibida junto.
 *
 * No grão bairro a taxa é ESTIMATIVA e a palavra tem de aparecer: o número
 * é suavizado em direção à taxa do município conforme o porte do bairro,
 * senão dois homicídios num bairro de 276 moradores virariam 724 por 100
 * mil. Chamar isso de "taxa do bairro" sem mais nada prometeria uma
 * precisão que o dado de um ano não tem.
 */
export function fraseFonte(s: Seguranca): string {
  const taxa = s.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  if (s.graoCodigo === "bairro" && !s.taxaEDoMunicipio) {
    return `${taxa} mortes violentas por 100 mil habitantes ao ano — estimativa do bairro, ajustada pelo porte da população. Média do bairro, ${s.janela}. Fonte: ${s.fonte}.`;
  }
  return `${taxa} mortes violentas por 100 mil habitantes ao ano. Média do município, ${s.janela}. Fonte: ${s.fonte}.`;
}

/**
 * Linha de contexto municipal — só existe quando o grão exibido é bairro
 * (no grão município ela seria repetir a mesma informação da frase acima).
 */
export function fraseMunicipio(s: Seguranca): string | null {
  if (!s.municipio) return null;
  const taxa = s.municipio.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  // Serve para as duas situações: como comparação, quando o bairro tem
  // estimativa própria (é o que mostra que o bairro difere da cidade), e
  // como o único número disponível, quando o bairro ficou sem população no
  // Censo e `s.taxa` veio nulo.
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
