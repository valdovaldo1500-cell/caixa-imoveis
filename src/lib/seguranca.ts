/**
 * Camada de segurança dos imóveis (O6).
 *
 * A nota vem de `app.score_nacional` (grão município) no banco de crime e é
 * gravada em `properties.crime_*` pelo job `scripts/caixa-crime-layer.sh`.
 *
 * DOIS CUIDADOS que já causaram erro aqui:
 *
 * 1. `crimeNota` é nota de RISCO: **quanto MAIOR, MAIS violento**. É o oposto
 *    da convenção de `scoring.ts`, onde nota alta é boa. Nunca reaproveite a
 *    nota crua como se fosse "segurança".
 *
 * 2. `crimeTaxa` é a única grandeza que pode ser escrita em português na tela:
 *    mortes violentas por 100 mil habitantes/ano, média da janela. A coluna
 *    `taxa_letal` da origem NÃO é isso (é peso por gravidade por 1.000
 *    endereços) e não pode ser rotulada como "por 100 mil habitantes".
 *
 * As faixas são quintis da distribuição nacional dos 3.615 municípios não
 * suprimidos (medido em 28/08/2026): p20=400, p40=460, mediana=489, p60=520,
 * p80=589.
 * Assim "alto" quer dizer alto em relação ao Brasil, não a um chute.
 */

export const FAIXAS_NACIONAIS = { p20: 400, p40: 460, mediana: 489, p60: 520, p80: 589 } as const;

export type NivelSeguranca = "baixo" | "moderado" | "medio" | "alto" | "muito_alto";

export type Seguranca = {
  nivel: NivelSeguranca;
  rotulo: string;
  /** Faixa percentil nacional, para a frase de contexto. */
  contexto: string;
  /** Classes Tailwind do badge. */
  cor: string;
  nota: number;
  taxa: number | null;
  grao: string;
  fonte: string;
  janela: string;
};

const NIVEIS: Record<NivelSeguranca, { rotulo: string; cor: string; contexto: string }> = {
  baixo: {
    rotulo: "Risco baixo",
    cor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    contexto: "entre os 20% de municípios menos violentos do país",
  },
  moderado: {
    rotulo: "Risco moderado",
    cor: "bg-lime-500/15 text-lime-300 border-lime-500/30",
    contexto: "abaixo da mediana nacional",
  },
  medio: {
    rotulo: "Risco médio",
    cor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    // A faixa 460-519 atravessa a mediana nacional (489, medido em
    // 28/08/2026), então NÃO pode afirmar um lado. Dizer "acima da mediana"
    // aqui seria falso para metade dos municípios da faixa.
    contexto: "na faixa central do país, perto da mediana nacional",
  },
  alto: {
    rotulo: "Risco alto",
    cor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    contexto: "entre os 40% mais violentos do país",
  },
  muito_alto: {
    rotulo: "Risco muito alto",
    cor: "bg-red-500/15 text-red-300 border-red-500/30",
    contexto: "entre os 20% de municípios mais violentos do país",
  },
};

function nivelDaNota(nota: number): NivelSeguranca {
  if (nota < FAIXAS_NACIONAIS.p20) return "baixo";
  if (nota < FAIXAS_NACIONAIS.p40) return "moderado";
  if (nota < FAIXAS_NACIONAIS.p60) return "medio";
  if (nota < FAIXAS_NACIONAIS.p80) return "alto";
  return "muito_alto";
}

const GRAOS: Record<string, string> = {
  municipio: "do município",
  bairro: "do bairro",
  ponto: "do endereço",
};

export type CrimeCampos = {
  crimeNota: number | null;
  crimeTaxa: string | number | null;
  crimeGrao: string | null;
  crimeFonte: string | null;
  crimeJanelaInicio: Date | string | null;
  crimeJanelaFim: Date | string | null;
  crimeSuprimido: boolean | null;
};

/**
 * Devolve `null` quando não há nota confiável — município suprimido por
 * poucos eventos, ou imóvel ainda sem casamento. A tela deve mostrar
 * "dado insuficiente", nunca um número inventado ou um neutro fixo.
 */
export function lerSeguranca(p: CrimeCampos): Seguranca | null {
  if (p.crimeNota == null || p.crimeSuprimido) return null;

  const nivel = nivelDaNota(p.crimeNota);
  const meta = NIVEIS[nivel];
  const taxa = p.crimeTaxa == null ? null : Number(p.crimeTaxa);

  return {
    nivel,
    rotulo: meta.rotulo,
    contexto: meta.contexto,
    cor: meta.cor,
    nota: p.crimeNota,
    taxa: Number.isFinite(taxa) ? taxa : null,
    grao: GRAOS[p.crimeGrao ?? "municipio"] ?? "do município",
    fonte: p.crimeFonte ?? "DATASUS/SIM",
    janela: janelaLegivel(p.crimeJanelaInicio, p.crimeJanelaFim),
  };
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
