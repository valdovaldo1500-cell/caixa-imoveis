"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MessageSquare, Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Recharts — no SSR
const LineChart = dynamic(
  () => import("recharts").then((m) => m.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: number;
  caixaId: string;
  uf: string;
  cidade: string;
  bairro: string | null;
  endereco: string | null;
  cep: string | null;
  preco: string | null;
  valorAvaliacao: string | null;
  desconto: string | null;
  aceitaFinanciamento: boolean;
  descricao: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  banheiros: number | null;
  areaTotalM2: string | null;
  areaPrivativaM2: string | null;
  matricula: string | null;
  comarca: string | null;
  lat: string | null;
  lng: string | null;
  score: string | null;
  scoreDetails: Record<string, unknown> | null;
  firstSeenAt: string;
  lastSeenAt: string;
  removedAt: string | null;
  fotoUrl: string | null;
  crimeRate: string | null;
  marketValue: string | null;
  marketValuePerM2: string | null;
  marketRentValue: string | null;
  comparablesCount: number | null;
  comparablesTier1Count: number | null;
  comparablesTier2Count: number | null;
  // ZAP + QuintoAndar market data
  zapMarketValue: string | null;
  zapMarketValuePerM2: string | null;
  zapRentValue: string | null;
  zapComparablesCount: number | null;
  qaMarketValue: string | null;
  qaRentValue: string | null;
  qaComparablesCount: number | null;
}

interface PriceHistoryEntry {
  preco: string | null;
  desconto: string | null;
  recordedAt: string;
}

interface ComparableDetail {
  dataEstimativa: string | null;
  baseCalculo: number;
  finalidadeConstrucao: string;
  logradouro: string;
  nEndereco: string;
  nUnidade: string;
  bairro: string;
  areaConstrPrivativa: number;
  precoM2: number;
  anoConstrucao: number | null;
  similarityScore: number;
}

interface TierResult {
  label: string;
  criteria: string;
  comparables: ComparableDetail[];
  medianPrecoM2: number | null;
  count: number;
}

interface ComparablesResult {
  property: {
    id: number;
    cidade: string;
    bairro: string | null;
    areaPrivativaM2: number | null;
    preco: number | null;
    marketValue: number | null;
    marketValuePerM2: number | null;
  };
  tier1: TierResult;
  tier2: TierResult;
  methodology: {
    usedTier: 1 | 2;
    estimatedValue: number | null;
    estimatedRent: number | null;
    medianPrecoM2: number | null;
  };
}

// ─── Investment analysis helpers ──────────────────────────────────────────────

function n(v: string | number | null | undefined): number {
  if (v === null || v === undefined || v === "") return 0;
  const result = Number(v);
  return isNaN(result) ? 0 : result;
}

function brl(v: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

function pctFmt(v: number): string {
  return `${v.toFixed(1)}%`;
}

function getTypeKey(tipo: string | null): "apt" | "casa" | "sala" | "terreno" {
  if (!tipo) return "casa";
  const t = tipo.toUpperCase();
  if (t.includes("APART") || t.includes("KITNET")) return "apt";
  if (t.includes("SALA") || t.includes("COMERCIAL") || t.includes("LOJA")) return "sala";
  if (t.includes("TERRENO") || t.includes("LOTE")) return "terreno";
  return "casa";
}

function getLiquidity(cidade: string): "alta" | "media" | "baixa" {
  const c = cidade.toUpperCase();
  if (c.includes("PORTO ALEGRE") || c.includes("CANOAS")) return "alta";
  if (c.includes("SAO LEOPOLDO") || c.includes("NOVO HAMBURGO") || c.includes("CACHOEIRINHA") || c.includes("SAPUCAIA")) return "media";
  return "baixa";
}

const MARKET_RENTS: Record<string, Record<string, { apt: number; casa: number; sala: number; terreno: number }>> = {
  CANOAS: {
    "RIO BRANCO": { apt: 1140, casa: 1800, sala: 1200, terreno: 0 },
    _default: { apt: 1400, casa: 2000, sala: 1500, terreno: 0 },
  },
  CACHOEIRINHA: {
    "VILA VISTA ALEGRE": { apt: 1730, casa: 2800, sala: 1200, terreno: 0 },
    _default: { apt: 1500, casa: 2500, sala: 1200, terreno: 0 },
  },
  CHARQUEADAS: { _default: { apt: 800, casa: 1200, sala: 800, terreno: 0 } },
  "NOVO HAMBURGO": {
    GUARANI: { apt: 2159, casa: 3827, sala: 1500, terreno: 0 },
    _default: { apt: 1962, casa: 3000, sala: 1500, terreno: 0 },
  },
  "PORTO ALEGRE": {
    "CENTRO HISTORICO": { apt: 1800, casa: 2500, sala: 2500, terreno: 0 },
    _default: { apt: 2500, casa: 3500, sala: 3000, terreno: 0 },
  },
  "SAO LEOPOLDO": {
    "SANTOS DUMONT": { apt: 1190, casa: 1700, sala: 1200, terreno: 0 },
    CENTRO: { apt: 1965, casa: 2263, sala: 1634, terreno: 0 },
    _default: { apt: 1500, casa: 2000, sala: 1400, terreno: 0 },
  },
  "SAPUCAIA DO SUL": {
    VARGAS: { apt: 1649, casa: 925, sala: 1000, terreno: 0 },
    _default: { apt: 1141, casa: 1200, sala: 1000, terreno: 0 },
  },
};

const MARKET_PRICES_M2: Record<string, Record<string, { apt: number; casa: number; sala: number; terreno: number }>> = {
  CANOAS: {
    "RIO BRANCO": { apt: 3914, casa: 3769, sala: 3500, terreno: 800 },
    _default: { apt: 4545, casa: 4000, sala: 4000, terreno: 900 },
  },
  CACHOEIRINHA: {
    "VILA VISTA ALEGRE": { apt: 4181, casa: 1800, sala: 2500, terreno: 800 },
    _default: { apt: 4000, casa: 2000, sala: 2500, terreno: 800 },
  },
  CHARQUEADAS: { _default: { apt: 2500, casa: 2150, sala: 2000, terreno: 500 } },
  "NOVO HAMBURGO": {
    GUARANI: { apt: 5627, casa: 4762, sala: 4000, terreno: 750 },
    _default: { apt: 3863, casa: 3500, sala: 3500, terreno: 700 },
  },
  "PORTO ALEGRE": {
    "CENTRO HISTORICO": { apt: 6154, casa: 5000, sala: 3614, terreno: 2000 },
    _default: { apt: 7000, casa: 5500, sala: 5000, terreno: 3000 },
  },
  "SAO LEOPOLDO": {
    "SANTOS DUMONT": { apt: 2887, casa: 3554, sala: 2500, terreno: 600 },
    CENTRO: { apt: 4696, casa: 3548, sala: 4612, terreno: 700 },
    _default: { apt: 3132, casa: 3000, sala: 3000, terreno: 600 },
  },
  "SAPUCAIA DO SUL": {
    VARGAS: { apt: 3782, casa: 4686, sala: 3000, terreno: 553 },
    _default: { apt: 3686, casa: 3500, sala: 3000, terreno: 500 },
  },
};

function getMarketRent(cidade: string, bairro: string | null, tipo: string | null): number {
  const c = cidade.toUpperCase();
  const b = (bairro || "").toUpperCase();
  const tk = getTypeKey(tipo);
  const cityData = MARKET_RENTS[c];
  if (!cityData) return 1000;
  const bairroData = cityData[b] || cityData._default;
  if (!bairroData) return 1000;
  return bairroData[tk];
}

function getMarketPriceM2(cidade: string, bairro: string | null, tipo: string | null): number {
  const c = cidade.toUpperCase();
  const b = (bairro || "").toUpperCase();
  const tk = getTypeKey(tipo);
  const cityData = MARKET_PRICES_M2[c];
  if (!cityData) return 3000;
  const bairroData = cityData[b] || cityData._default;
  if (!bairroData) return 3000;
  return bairroData[tk];
}

interface InvAnalysis {
  area: number;
  purchasePrice: number;
  appraisedValue: number;
  bestMarketValue: number;
  marketSource: string;
  totalComparables: number;
  monthlyRent: number;
  rentSource: string;
  renoLight: number;
  renoMedium: number;
  renoHeavy: number;
  txCostBuy: number;
  txCostSell: number;
  rentalYieldGross: number;
  paybackMonths: number;
  riskRating: string;
  riskFactors: string[];
  dataConfidence: string;
}

function analyzeProperty(prop: Property): InvAnalysis {
  const purchasePrice = n(prop.preco);
  const appraisedValue = n(prop.valorAvaliacao);
  const area = n(prop.areaPrivativaM2) || n(prop.areaTotalM2) || 50;

  const itbiVal = n(prop.marketValue);
  const zapVal = n(prop.zapMarketValue);
  const qaVal = n(prop.qaMarketValue);
  const itbiComps = (prop.comparablesTier1Count || 0) + (prop.comparablesTier2Count || 0);
  const zapComps = prop.zapComparablesCount || 0;
  const qaComps = prop.qaComparablesCount || 0;

  let bestMarketValue = 0;
  let marketSource = "";
  let totalComparables = 0;

  if (itbiVal > 0 && itbiComps >= 5) {
    bestMarketValue = itbiVal; marketSource = `ITBI (${itbiComps} transacoes)`; totalComparables = itbiComps;
  } else if (zapVal > 0 && zapComps >= 3) {
    bestMarketValue = zapVal; marketSource = `ZAP (${zapComps} anuncios)`; totalComparables = zapComps;
  } else if (qaVal > 0 && qaComps >= 3) {
    bestMarketValue = qaVal; marketSource = `QuintoAndar (${qaComps} anuncios)`; totalComparables = qaComps;
  } else {
    bestMarketValue = getMarketPriceM2(prop.cidade, prop.bairro, prop.tipoImovel) * area;
    marketSource = "Estimativa (benchmark)";
  }

  if (bestMarketValue > appraisedValue * 3 && appraisedValue > 0) {
    bestMarketValue = appraisedValue * 1.5;
    marketSource += " (ajustado)";
  }

  const zapRent = n(prop.zapRentValue);
  const qaRent = n(prop.qaRentValue);
  const itbiRent = n(prop.marketRentValue);
  let monthlyRent = 0;
  let rentSource = "";
  if (zapRent > 0) { monthlyRent = zapRent; rentSource = "ZAP"; }
  else if (qaRent > 0) { monthlyRent = qaRent; rentSource = "QuintoAndar"; }
  else if (itbiRent > 0) { monthlyRent = itbiRent; rentSource = "ITBI"; }
  else {
    // Use hardcoded table if available, otherwise estimate from area
    const tablRent = getMarketRent(prop.cidade, prop.bairro, prop.tipoImovel);
    if (tablRent !== 1000) {
      monthlyRent = tablRent;
      rentSource = "Estimativa (tabela)";
    } else if (area > 0) {
      // Rough RS estimate: R$15-20/m2 for apt, R$12-15/m2 for casa
      const typeK = getTypeKey(prop.tipoImovel);
      const rentPerM2 = typeK === "apt" ? 17 : typeK === "casa" ? 13 : typeK === "sala" ? 25 : 10;
      monthlyRent = Math.round(area * rentPerM2);
      rentSource = `Estimativa (R$${rentPerM2}/m²)`;
    } else {
      monthlyRent = 1000;
      rentSource = "Estimativa genérica";
    }
  }

  const renoLight = area * 700;
  const renoMedium = area * 1200;
  const renoHeavy = area * 1800;
  // POA ITBI = 3%, RS interior = 2%. Add ~1.5% for escritura+registro
  const itbiRate = prop.cidade.toUpperCase() === "PORTO ALEGRE" ? 0.03 : 0.02;
  const txCostBuy = purchasePrice * (itbiRate + 0.015);
  const txCostSell = bestMarketValue * 0.055;

  const totalInvestRental = purchasePrice + renoLight + txCostBuy;
  const annualRent = monthlyRent * 12;
  const rentalYieldGross = totalInvestRental > 0 ? (annualRent / totalInvestRental) * 100 : 0;
  const paybackMonths = monthlyRent > 0 ? Math.ceil(totalInvestRental / monthlyRent) : 999;

  const riskFactors: string[] = [];
  let riskScore = 0;
  const liq = getLiquidity(prop.cidade);
  if (liq === "baixa") { riskScore += 30; riskFactors.push("Mercado com baixa liquidez"); }
  else if (liq === "media") { riskScore += 10; riskFactors.push("Liquidez moderada"); }
  if (!prop.aceitaFinanciamento) { riskScore += 10; riskFactors.push("Sem financiamento (pagamento a vista)"); }
  if (totalComparables === 0) { riskScore += 20; riskFactors.push("Sem comparaveis (estimativa)"); }
  else if (totalComparables < 5) { riskScore += 10; riskFactors.push(`Poucos comparaveis (${totalComparables})`); }
  const crime = n(prop.crimeRate);
  if (crime > 7000) { riskScore += 15; riskFactors.push(`Criminalidade alta (${crime.toFixed(0)}/100k)`); }
  else if (crime > 5000) { riskScore += 5; riskFactors.push(`Criminalidade moderada (${crime.toFixed(0)}/100k)`); }
  if (area > 200) { riskScore += 10; riskFactors.push(`Area grande (${area.toFixed(0)}m²) — reforma cara`); }
  if (getTypeKey(prop.tipoImovel) === "terreno") { riskScore += 5; riskFactors.push("Terreno — sem renda imediata"); }
  const discountVsMarket = bestMarketValue > 0 ? ((bestMarketValue - purchasePrice) / bestMarketValue) * 100 : 0;
  if (discountVsMarket < 30) { riskScore += 15; riskFactors.push(`Desconto baixo vs mercado (${discountVsMarket.toFixed(0)}%)`); }

  let riskRating: string;
  if (riskScore <= 10) riskRating = "EXCELENTE";
  else if (riskScore <= 25) riskRating = "BOM";
  else if (riskScore <= 45) riskRating = "MODERADO";
  else if (riskScore <= 65) riskRating = "ARRISCADO";
  else riskRating = "ALTO RISCO";

  let dataConfidence: string;
  if (totalComparables >= 50) dataConfidence = "Alta";
  else if (totalComparables >= 10) dataConfidence = "Boa";
  else if (totalComparables >= 3) dataConfidence = "Moderada";
  else dataConfidence = "Baixa";

  return {
    area, purchasePrice, appraisedValue, bestMarketValue, marketSource, totalComparables,
    monthlyRent, rentSource, renoLight, renoMedium, renoHeavy, txCostBuy, txCostSell,
    rentalYieldGross, paybackMonths, riskRating, riskFactors, dataConfidence,
  };
}

function computeFlipScenariosWithLiquidity(inv: InvAnalysis, cidade: string, renoLevel: "light" | "medium" | "heavy", targetValue?: number) {
  const reno = renoLevel === "light" ? inv.renoLight : renoLevel === "medium" ? inv.renoMedium : inv.renoHeavy;
  const liq = getLiquidity(cidade);
  const baseMonths = liq === "alta" ? 8 : liq === "media" ? 14 : 24;
  const base = (targetValue && targetValue > 0) ? targetValue : inv.bestMarketValue;

  // Renovation months by level
  const renoMonths = renoLevel === "light" ? 1 : renoLevel === "medium" ? 2 : 4;

  // Holding cost during renovation: IPTU for renoMonths
  const iptuBase = inv.appraisedValue > 0 ? inv.appraisedValue : inv.purchasePrice;
  const iptuHoldingCost = (iptuBase * 0.005 / 12) * renoMonths;

  const totalInvest = inv.purchasePrice + reno + inv.txCostBuy + iptuHoldingCost;

  const make = (saleMult: number, extraMonths: number) => {
    const salePrice = base * saleMult;
    const profit = salePrice - totalInvest - salePrice * 0.055;
    const roi = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    const saleMonths = baseMonths + extraMonths;
    const months = renoMonths + saleMonths;
    // Annualized ROI: (1 + ROI)^(12/months) - 1
    const roiAnnual = months > 0 && roi > -100 ? (Math.pow(1 + roi / 100, 12 / months) - 1) * 100 : 0;
    return { totalInvest, salePrice, profit, roi, roiAnnual, months, renoMonths, saleMonths };
  };

  return { conservative: make(0.85, 4), moderate: make(0.95, 2), optimistic: make(1.0, 0), reno };
}

// ─── Score helpers ─────────────────────────────────────────────────────────────

function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "A+", color: "bg-green-900 text-green-300" };
  if (score >= 75) return { label: "A", color: "bg-green-900 text-green-300" };
  if (score >= 65) return { label: "B+", color: "bg-yellow-900 text-yellow-300" };
  if (score >= 55) return { label: "B", color: "bg-yellow-900 text-yellow-300" };
  if (score >= 40) return { label: "C", color: "bg-orange-900 text-orange-300" };
  return { label: "D", color: "bg-red-900 text-red-300" };
}

function getCrimeColor(rate: number) {
  if (rate < 1000) return "bg-green-900 text-green-300";
  if (rate < 5000) return "bg-yellow-900 text-yellow-300";
  return "bg-red-900 text-red-300";
}

// ─── Format helpers ────────────────────────────────────────────────────────────

function formatBRL(value: string | number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
}

// ─── Score factor labels ───────────────────────────────────────────────────────

const FACTOR_LABELS: Record<string, string> = {
  discount: "Desconto",
  priceEfficiency: "Eficiência de Preço",
  financing: "Financiamento",
  propertyType: "Tipo de Imóvel",
  areaValue: "Área/Valor",
  daysOnMarket: "Tempo no Mercado",
  crimeSafety: "Segurança",
};

interface ScoreDetail {
  score: number;
  weight: number;
  weighted: number;
  details?: string;
}

// ─── Score breakdown bar component ───────────────────────────────────────────

function ScoreBar({ label, detail }: { label: string; detail: ScoreDetail }) {
  const pct = Math.max(0, Math.min(100, detail.score));
  const barColor =
    pct >= 70
      ? "bg-green-500"
      : pct >= 40
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span className="font-mono">
          {pct.toFixed(0)}/100
          <span className="text-zinc-600 ml-1">(peso {(detail.weight * 100).toFixed(0)}%)</span>
        </span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {detail.details && (
        <p className="text-xs text-zinc-500">{detail.details}</p>
      )}
    </div>
  );
}

// ─── Comparable tier list component ──────────────────────────────────────────

function TierComparablesList({
  tier,
  isOpen,
  onToggle,
  propArea,
  usedTier,
  tierNumber,
}: {
  tier: TierResult;
  isOpen: boolean;
  onToggle: () => void;
  propArea: number | null;
  usedTier: 1 | 2;
  tierNumber: 1 | 2;
}) {
  const isActive = usedTier === tierNumber;

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium text-zinc-300 truncate">{tier.label}</span>
          {isActive && (
            <Badge className="bg-blue-900 text-blue-300 text-xs px-1.5 py-0 shrink-0">
              usado
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-2">
          {tier.medianPrecoM2 !== null && (
            <span className="text-xs font-mono text-zinc-400">
              med. R${tier.medianPrecoM2.toLocaleString("pt-BR")}/m²
            </span>
          )}
          <span className="text-xs text-zinc-500">
            {tier.count} imóvel{tier.count !== 1 ? "is" : ""}
          </span>
          <span className="text-zinc-600 text-xs">{isOpen ? "▲" : "▼"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-zinc-800 px-3 pb-3 pt-2 space-y-2">
          <p className="text-xs text-zinc-600 italic">{tier.criteria}</p>

          {tier.comparables.length === 0 ? (
            <p className="text-xs text-zinc-500">Nenhum comparável encontrado.</p>
          ) : (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {tier.comparables.slice(0, 25).map((c, i) => {
                const areaDiff =
                  propArea && c.areaConstrPrivativa > 0
                    ? ((c.areaConstrPrivativa - propArea) / propArea) * 100
                    : null;
                return (
                  <div
                    key={i}
                    className="flex justify-between text-xs text-zinc-400 py-1 border-b border-zinc-800/50 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="truncate block">
                        {c.logradouro
                          ? `${c.logradouro}${c.nEndereco ? ` ${c.nEndereco}` : ""}${c.nUnidade ? ` un.${c.nUnidade}` : ""}`
                          : c.bairro || "—"}
                      </span>
                      <span className="text-zinc-600">
                        {c.areaConstrPrivativa > 0
                          ? `${c.areaConstrPrivativa.toFixed(0)} m²`
                          : "—"}
                        {areaDiff !== null && (
                          <span
                            className={
                              Math.abs(areaDiff) < 10
                                ? "text-green-700 ml-1"
                                : "text-zinc-600 ml-1"
                            }
                          >
                            ({areaDiff > 0 ? "+" : ""}
                            {areaDiff.toFixed(0)}%)
                          </span>
                        )}
                        {c.dataEstimativa && (
                          <span className="ml-2">{formatDate(c.dataEstimativa)}</span>
                        )}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-zinc-300">
                        {formatBRL(c.baseCalculo)}
                      </span>
                      {c.precoM2 > 0 && (
                        <span className="block text-zinc-500">
                          R${Math.round(c.precoM2).toLocaleString("pt-BR")}/m²
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [history, setHistory] = useState<PriceHistoryEntry[]>([]);
  const [comparables, setComparables] = useState<ComparablesResult | null>(null);
  const hashComparaveis = typeof window !== "undefined" && window.location.hash === "#comparaveis";
  const [showTier1, setShowTier1] = useState(hashComparaveis);
  const [showTier2, setShowTier2] = useState(hashComparaveis);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [note, setNote] = useState<string>("");
  const [noteDraft, setNoteDraft] = useState<string>("");
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteLoaded, setNoteLoaded] = useState(false);
  const [renoLevel, setRenoLevel] = useState<"light" | "medium" | "heavy">("light");

  const fetchProperty = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/${id}`, { credentials: "include" });
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setProperty(data);

      // Fetch history, comparables, favorite status, and note in parallel
      const [histRes, compRes, favRes, noteRes, hideRes] = await Promise.all([
        fetch(`/api/properties/${id}/history`, { credentials: "include" }),
        fetch(`/api/properties/${id}/comparables`, { credentials: "include" }),
        fetch(`/api/properties/${id}/favorite`, { credentials: "include" }),
        fetch(`/api/properties/${id}/notes`, { credentials: "include" }),
        fetch(`/api/properties/${id}/hide`, { credentials: "include" }),
      ]);

      if (histRes.ok) {
        setHistory(await histRes.json());
      }
      if (compRes.ok) {
        setComparables(await compRes.json());
      }
      if (favRes.ok) {
        const favData = await favRes.json() as { favorited: boolean };
        setFavorited(favData.favorited);
      }
      if (hideRes.ok) {
        const hideData = await hideRes.json() as { hidden: boolean };
        setHidden(hideData.hidden);
      }
      if (noteRes.ok) {
        const noteData = await noteRes.json() as { note: string | null };
        const existingNote = noteData.note ?? "";
        setNote(existingNote);
        setNoteDraft(existingNote);
        setNoteLoaded(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const toggleFavorite = async () => {
    if (favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      const res = await fetch(`/api/properties/${id}/favorite`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        const json = await res.json() as { favorited: boolean };
        setFavorited(json.favorited);
      }
    } catch {
      // silently ignore
    } finally {
      setFavoriteLoading(false);
    }
  };

  const toggleHidden = async () => {
    try {
      const res = await fetch(`/api/properties/${id}/hide`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        const json = await res.json() as { hidden: boolean };
        setHidden(json.hidden);
      }
    } catch {}
  };

  const saveNote = async () => {
    if (noteSaving) return;
    setNoteSaving(true);
    try {
      const res = await fetch(`/api/properties/${id}/notes`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteDraft }),
      });
      if (res.ok) {
        const json = await res.json() as { note: string | null };
        const saved = json.note ?? "";
        setNote(saved);
        setNoteDraft(saved);
      }
    } catch {
      // silently ignore
    } finally {
      setNoteSaving(false);
    }
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-20 bg-zinc-800" />
          <Skeleton className="h-8 w-64 bg-zinc-800" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-48 w-full bg-zinc-800 rounded-xl" />
            <Skeleton className="h-32 w-full bg-zinc-800 rounded-xl" />
            <Skeleton className="h-24 w-full bg-zinc-800 rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-56 w-full bg-zinc-800 rounded-xl" />
            <Skeleton className="h-40 w-full bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 text-lg">Imóvel não encontrado.</p>
        <Link href="/imoveis" className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-sm">
          ← Voltar para lista
        </Link>
      </div>
    );
  }

  const score = property.score ? parseFloat(property.score) : null;
  const grade = score !== null ? getScoreGrade(score) : null;

  const title = [property.tipoImovel, property.bairro, property.cidade]
    .filter(Boolean)
    .join(" em ")
    || property.descricao
    || `Imóvel #${property.caixaId}`;

  // Build price history chart data
  const chartData = history.map((h) => ({
    date: formatDate(h.recordedAt),
    preco: h.preco ? Number(h.preco) : null,
  }));

  // Parse scoreDetails
  const scoreDetailsMap = property.scoreDetails as Record<string, ScoreDetail> | null;

  const crimeRate = property.crimeRate ? parseFloat(property.crimeRate) : null;

  // Derived property area for comparable similarity display
  const propArea = property.areaPrivativaM2
    ? parseFloat(property.areaPrivativaM2)
    : property.areaTotalM2
    ? parseFloat(property.areaTotalM2)
    : null;

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/imoveis" className="hover:text-zinc-200 transition-colors">
            ← Imóveis
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{property.caixaId}</span>
        </div>
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-2xl font-bold flex-1 min-w-0">{title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            {score !== null && grade && (
              <>
                <Badge className={grade.color + " text-lg px-3 py-1 font-bold"}>
                  {grade.label}
                </Badge>
                <span className="text-zinc-400 text-sm font-mono">
                  {score.toFixed(0)} pts
                </span>
              </>
            )}
            <button
              onClick={toggleFavorite}
              disabled={favoriteLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-sm transition-colors disabled:opacity-50 ${
                favorited
                  ? "border-yellow-600 bg-yellow-900/40 text-yellow-400 hover:bg-yellow-900/60"
                  : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
              }`}
              title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Star
                className="w-4 h-4"
                fill={favorited ? "currentColor" : "none"}
              />
              {favorited ? "Favoritado" : "Favoritar"}
            </button>
            <button
              onClick={toggleHidden}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-sm transition-colors ${
                hidden
                  ? "border-zinc-500 bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
              }`}
              title={hidden ? "Mostrar imóvel" : "Ocultar imóvel"}
            >
              {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {hidden ? "Oculto" : "Ocultar"}
            </button>
            {property.linkCaixa && (
              <a
                href={property.linkCaixa}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-blue-300 text-sm transition-colors"
              >
                Ver na Caixa ↗
              </a>
            )}
          </div>
        </div>
        {property.removedAt && (
          <Badge className="bg-red-900 text-red-300">
            Removido em {formatDate(property.removedAt)}
          </Badge>
        )}
      </header>

      {/* ── 2-column layout ────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Key metrics grid */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400">Dados do Imóvel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Preço Caixa</p>
                  <p className="text-lg font-bold text-zinc-100">{formatBRL(property.preco)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Valor Avaliação</p>
                  <p className="text-lg font-semibold text-zinc-300">{formatBRL(property.valorAvaliacao)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Desconto</p>
                  {property.desconto ? (
                    <Badge
                      className={
                        parseFloat(property.desconto) >= 40
                          ? "bg-green-900 text-green-300 text-base px-2 py-0.5"
                          : "bg-zinc-700 text-zinc-300 text-base px-2 py-0.5"
                      }
                    >
                      {parseFloat(property.desconto).toFixed(1)}%
                    </Badge>
                  ) : (
                    <span className="text-zinc-500">—</span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Área Privativa</p>
                  <p className="font-semibold text-zinc-200">
                    {property.areaPrivativaM2
                      ? `${parseFloat(property.areaPrivativaM2).toFixed(0)} m²`
                      : property.areaTotalM2
                      ? `${parseFloat(property.areaTotalM2).toFixed(0)} m² (total)`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Quartos</p>
                  <p className="font-semibold text-zinc-200">
                    {property.quartos ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Vagas</p>
                  <p className="font-semibold text-zinc-200">
                    {property.vagas ?? "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400">Localização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {property.endereco && (
                <div>
                  <span className="text-zinc-500">Endereço: </span>
                  <span className="text-zinc-200">{property.endereco}</span>
                </div>
              )}
              <div>
                <span className="text-zinc-500">Bairro: </span>
                <span className="text-zinc-200">{property.bairro || "—"}</span>
              </div>
              <div>
                <span className="text-zinc-500">Cidade: </span>
                <span className="text-zinc-200">
                  {property.cidade}
                  {property.uf ? ` — ${property.uf}` : ""}
                </span>
              </div>
              {property.cep && (
                <div>
                  <span className="text-zinc-500">CEP: </span>
                  <span className="text-zinc-200">{property.cep}</span>
                </div>
              )}
              {property.comarca && (
                <div>
                  <span className="text-zinc-500">Comarca: </span>
                  <span className="text-zinc-200">{property.comarca}</span>
                </div>
              )}
              {property.lat && property.lng && (
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href={`https://maps.google.com/?q=${property.lat},${property.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs"
                  >
                    Ver no Google Maps ↗
                  </a>
                  <a
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${property.lat},${property.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs"
                  >
                    Street View ↗
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sale info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400">Informações de Venda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {property.modalidadeVenda && (
                <div>
                  <span className="text-zinc-500">Modalidade: </span>
                  <span className="text-zinc-200">{property.modalidadeVenda}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Financiamento: </span>
                <Badge
                  className={
                    property.aceitaFinanciamento
                      ? "bg-green-900 text-green-300"
                      : "bg-zinc-700 text-zinc-400"
                  }
                >
                  {property.aceitaFinanciamento ? "Aceita" : "Não aceita"}
                </Badge>
              </div>
              <div>
                <span className="text-zinc-500">Adicionado ao site: </span>
                <span className="text-zinc-200">{formatDate(property.firstSeenAt)}</span>
                {(() => {
                  const days = Math.floor((Date.now() - new Date(property.firstSeenAt).getTime()) / 86400000);
                  return <span className={`ml-2 text-xs ${days <= 1 ? "text-green-400" : days <= 7 ? "text-blue-400" : "text-zinc-500"}`}>
                    ({days === 0 ? "hoje" : days === 1 ? "ontem" : `${days} dias`})
                  </span>;
                })()}
              </div>
              <div>
                <span className="text-zinc-500">Última atualização: </span>
                <span className="text-zinc-200">{formatDate(property.lastSeenAt)}</span>
              </div>
              {property.matricula && (
                <div>
                  <span className="text-zinc-500">Matrícula: </span>
                  <span className="text-zinc-200 font-mono text-xs">{property.matricula}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photo */}
          {property.fotoUrl && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">Foto</CardTitle>
              </CardHeader>
              <CardContent>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.fotoUrl}
                  alt={title}
                  className="w-full rounded-lg object-cover max-h-72"
                />
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {noteLoaded && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Notas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Textarea
                  className="bg-zinc-800 border-zinc-700 text-zinc-200 text-sm resize-none focus:border-zinc-500"
                  rows={4}
                  placeholder="Adicione suas observações sobre este imóvel..."
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={saveNote}
                    disabled={noteSaving || noteDraft === note}
                    className="px-3 py-1.5 text-sm bg-blue-700 hover:bg-blue-600 text-white rounded disabled:opacity-40 transition-colors"
                  >
                    {noteSaving ? "Salvando..." : "Salvar nota"}
                  </button>
                  {noteDraft !== note && (
                    <button
                      onClick={() => setNoteDraft(note)}
                      className="text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      Cancelar
                    </button>
                  )}
                  {note && noteDraft === note && (
                    <span className="text-xs text-zinc-600">Nota salva</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {property.descricao && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300 leading-relaxed">{property.descricao}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Score breakdown */}
          {scoreDetailsMap && Object.keys(scoreDetailsMap).length > 0 && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Análise de Score
                  {score !== null && (
                    <span className="ml-2 font-mono text-zinc-300">
                      Total: {score.toFixed(1)}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(scoreDetailsMap).map(([key, detail]) => {
                  if (typeof detail !== "object" || detail === null) return null;
                  const d = detail as ScoreDetail;
                  return (
                    <ScoreBar
                      key={key}
                      label={FACTOR_LABELS[key] || key}
                      detail={d}
                    />
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Market value */}
          {(property.marketValue || property.marketValuePerM2) && (
            <Card id="comparaveis" className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Valor de Mercado (ITBI)
                  <span className="text-xs text-zinc-600 ml-2">Fonte: Dados Abertos POA — ITBI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {property.marketValue && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Valor Estimado</p>
                      <p className="text-lg font-bold">
                        {property.preco && parseFloat(property.preco) < parseFloat(property.marketValue) ? (
                          <span className="text-green-400">{formatBRL(property.marketValue)}</span>
                        ) : (
                          <span className="text-zinc-200">{formatBRL(property.marketValue)}</span>
                        )}
                      </p>
                      {property.preco && property.marketValue && (
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {parseFloat(property.preco) < parseFloat(property.marketValue)
                            ? `${((1 - parseFloat(property.preco) / parseFloat(property.marketValue)) * 100).toFixed(1)}% abaixo do mercado`
                            : `${((parseFloat(property.preco) / parseFloat(property.marketValue) - 1) * 100).toFixed(1)}% acima do mercado`}
                        </p>
                      )}
                    </div>
                  )}
                  {property.marketValuePerM2 && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">R$/m² Mercado</p>
                      <p className="font-semibold text-zinc-200">
                        R$&nbsp;{Math.round(parseFloat(property.marketValuePerM2)).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  )}
                  {property.marketRentValue && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Aluguel Estimado</p>
                      <p className="font-semibold text-zinc-200">{formatBRL(property.marketRentValue)}/mês</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Comparáveis</p>
                    <p className="font-semibold text-zinc-200">
                      {property.comparablesTier1Count !== null && property.comparablesTier2Count !== null ? (
                        <>
                          <span className="text-blue-400">{property.comparablesTier1Count}</span>
                          <span className="text-zinc-500"> / </span>
                          <span>{property.comparablesTier2Count}</span>
                          <span className="text-zinc-600 text-xs ml-1">t1/t2</span>
                        </>
                      ) : property.comparablesCount !== null ? (
                        `${property.comparablesCount} transações`
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>
                </div>

                {/* Two-tier comparables section */}
                {comparables && (comparables.tier1.count > 0 || comparables.tier2.count > 0) && (
                  <div className="pt-2 border-t border-zinc-800 space-y-2">
                    <p className="text-xs text-zinc-500">
                      Base de cálculo: Tier {comparables.methodology.usedTier}
                      {comparables.methodology.usedTier === 1
                        ? " (imóveis muito similares)"
                        : " (imóveis no bairro — Tier 1 insuficiente)"}
                    </p>

                    <TierComparablesList
                      tier={comparables.tier1}
                      isOpen={showTier1}
                      onToggle={() => setShowTier1((v) => !v)}
                      propArea={propArea}
                      usedTier={comparables.methodology.usedTier}
                      tierNumber={1}
                    />

                    <TierComparablesList
                      tier={comparables.tier2}
                      isOpen={showTier2}
                      onToggle={() => setShowTier2((v) => !v)}
                      propArea={propArea}
                      usedTier={comparables.methodology.usedTier}
                      tierNumber={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* ── ZAP + QuintoAndar Market Values ──────────────────────────── */}
          {(property.zapMarketValue || property.qaMarketValue) && (() => {
            const itbiVal = n(property.marketValue);
            const zapVal = n(property.zapMarketValue);
            const qaVal = n(property.qaMarketValue);
            return (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-400">Valores de Mercado Comparados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {/* ITBI */}
                    <div className="bg-zinc-800/50 rounded p-2.5">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">ITBI</div>
                      {itbiVal > 0 ? (
                        <>
                          <div className="text-sm font-bold text-blue-400">{brl(itbiVal)}</div>
                          {property.marketValuePerM2 && <div className="text-[10px] text-zinc-500 mt-0.5">{brl(n(property.marketValuePerM2))}/m²</div>}
                          {property.marketRentValue && <div className="text-[10px] text-zinc-500">Aluguel: {brl(n(property.marketRentValue))}/mês</div>}
                          <div className="text-[10px] text-zinc-600">{(property.comparablesTier1Count || 0) + (property.comparablesTier2Count || 0)} comps</div>
                        </>
                      ) : <div className="text-xs text-zinc-600">—</div>}
                    </div>
                    {/* ZAP */}
                    <div className="bg-zinc-800/50 rounded p-2.5">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">ZAP Imóveis</div>
                      {zapVal > 0 ? (
                        <>
                          <div className="text-sm font-bold text-emerald-400">{brl(zapVal)}</div>
                          {property.zapMarketValuePerM2 && <div className="text-[10px] text-zinc-500 mt-0.5">{brl(n(property.zapMarketValuePerM2))}/m²</div>}
                          {property.zapRentValue && <div className="text-[10px] text-zinc-500">Aluguel: {brl(n(property.zapRentValue))}/mês</div>}
                          <div className="text-[10px] text-zinc-600">{property.zapComparablesCount || 0} comps</div>
                        </>
                      ) : <div className="text-xs text-zinc-600">—</div>}
                    </div>
                    {/* QuintoAndar */}
                    <div className="bg-zinc-800/50 rounded p-2.5">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">QuintoAndar</div>
                      {qaVal > 0 ? (
                        <>
                          <div className="text-sm font-bold text-violet-400">{brl(qaVal)}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">&nbsp;</div>
                          {property.qaRentValue && <div className="text-[10px] text-zinc-500">Aluguel: {brl(n(property.qaRentValue))}/mês</div>}
                          <div className="text-[10px] text-zinc-600">{property.qaComparablesCount || 0} comps</div>
                        </>
                      ) : <div className="text-xs text-zinc-600">—</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* ── Investment Analysis ────────────────────────────────────────── */}
          {(() => {
            const inv = analyzeProperty(property);
            if (inv.purchasePrice === 0) return null;
            const flip = computeFlipScenariosWithLiquidity(inv, property.cidade, renoLevel);
            const discountVsMarket = inv.bestMarketValue > 0 ? ((inv.bestMarketValue - inv.purchasePrice) / inv.bestMarketValue) * 100 : 0;
            const riskColors: Record<string, { bg: string; text: string }> = {
              EXCELENTE: { bg: "bg-green-900/60 border-green-500", text: "text-green-300" },
              BOM: { bg: "bg-emerald-900/60 border-emerald-500", text: "text-emerald-300" },
              MODERADO: { bg: "bg-yellow-900/60 border-yellow-500", text: "text-yellow-300" },
              ARRISCADO: { bg: "bg-orange-900/60 border-orange-500", text: "text-orange-300" },
              "ALTO RISCO": { bg: "bg-red-900/60 border-red-500", text: "text-red-300" },
            };
            const riskBadge = riskColors[inv.riskRating] ?? { bg: "bg-zinc-800 border-zinc-600", text: "text-zinc-300" };

            return (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-400">
                    Análise de Investimento
                    <span className="text-xs text-zinc-600 ml-2 font-normal">Fonte: {inv.marketSource}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Custo de reforma */}
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Custo de Reforma ({inv.area.toFixed(0)}m²)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-zinc-800/50 rounded p-2">
                        <div className="text-[10px] text-zinc-500">Leve (R$700/m²)</div>
                        <div className="text-sm font-bold text-green-400">{brl(inv.renoLight)}</div>
                        <div className="text-[10px] text-zinc-600">Pintura, piso, elét.</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded p-2">
                        <div className="text-[10px] text-zinc-500">Média (R$1.200/m²)</div>
                        <div className="text-sm font-bold text-yellow-400">{brl(inv.renoMedium)}</div>
                        <div className="text-[10px] text-zinc-600">+ banheiros, cozinha</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded p-2">
                        <div className="text-[10px] text-zinc-500">Pesada (R$1.800/m²)</div>
                        <div className="text-sm font-bold text-red-400">{brl(inv.renoHeavy)}</div>
                        <div className="text-[10px] text-zinc-600">Reforma completa</div>
                      </div>
                    </div>
                  </div>

                  {/* Flip scenarios */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Cenários de Flip — Mercado ({inv.marketSource.split(" (")[0]})
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-zinc-500 mr-1">Reforma:</span>
                        {(["light", "medium", "heavy"] as const).map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setRenoLevel(lvl)}
                            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                              renoLevel === lvl
                                ? "bg-zinc-700 text-white font-medium"
                                : "bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                            }`}
                          >
                            {lvl === "light" ? "Leve" : lvl === "medium" ? "Média" : "Pesada"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-[520px] w-full text-xs">
                        <thead>
                          <tr className="border-b border-zinc-700">
                            <th className="py-1.5 pr-3 text-left text-zinc-500 font-medium">Cenário</th>
                            <th className="py-1.5 px-2 text-right text-zinc-500 font-medium">Investimento</th>
                            <th className="py-1.5 px-2 text-right text-zinc-500 font-medium">Venda</th>
                            <th className="py-1.5 px-2 text-right text-zinc-500 font-medium">Lucro</th>
                            <th className="py-1.5 px-2 text-right text-zinc-500 font-medium">ROI</th>
                            <th className="py-1.5 px-2 text-right text-zinc-500 font-medium">ROI/ano</th>
                            <th className="py-1.5 pl-2 text-right text-zinc-500 font-medium">Prazo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "Conservador (−15%)", data: flip.conservative, accent: "text-emerald-400" },
                            { label: "Moderado (−5%)", data: flip.moderate, accent: "text-green-400" },
                            { label: "Otimista (mercado)", data: flip.optimistic, accent: "text-green-300" },
                          ].map(({ label, data, accent }) => (
                            <tr key={label} className="border-b border-zinc-800">
                              <td className="py-1.5 pr-3 text-zinc-400">{label}</td>
                              <td className="py-1.5 px-2 text-right">{brl(data.totalInvest)}</td>
                              <td className="py-1.5 px-2 text-right">{brl(data.salePrice)}</td>
                              <td className={`py-1.5 px-2 text-right font-semibold ${data.profit > 0 ? accent : "text-red-400"}`}>{brl(data.profit)}</td>
                              <td className={`py-1.5 px-2 text-right font-semibold ${data.roi > 0 ? accent : "text-red-400"}`}>{pctFmt(data.roi)}</td>
                              <td className={`py-1.5 px-2 text-right ${data.roiAnnual > 14.25 ? "text-green-400 font-semibold" : data.roiAnnual > 0 ? "text-zinc-300" : "text-red-400"}`}>{pctFmt(data.roiAnnual)}</td>
                              <td className="py-1.5 pl-2 text-right text-zinc-400">{data.renoMonths}+{data.saleMonths}m</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-1">
                      Inclui ITBI (2%), escritura/registro e corretagem (5,5%). Desconto vs mercado: {pctFmt(discountVsMarket)}.
                    </p>

                    {/* Flip sob valor de avaliação Caixa */}
                    {inv.appraisedValue > 0 && inv.appraisedValue !== inv.bestMarketValue && (() => {
                      const flipAval = computeFlipScenariosWithLiquidity(inv, property.cidade, renoLevel, inv.appraisedValue);
                      return (
                        <div className="mt-3 pt-3 border-t border-zinc-800/50">
                          <p className="text-[10px] text-zinc-500 mb-2">Sob valor de avaliação Caixa ({brl(inv.appraisedValue)})</p>
                          <div className="overflow-x-auto">
                            <table className="min-w-[520px] w-full text-xs">
                              <thead>
                                <tr className="border-b border-zinc-700">
                                  <th className="py-1 pr-3 text-left text-zinc-500 font-medium">Cenário</th>
                                  <th className="py-1 px-2 text-right text-zinc-500 font-medium">Investimento</th>
                                  <th className="py-1 px-2 text-right text-zinc-500 font-medium">Venda</th>
                                  <th className="py-1 px-2 text-right text-zinc-500 font-medium">Lucro</th>
                                  <th className="py-1 px-2 text-right text-zinc-500 font-medium">ROI</th>
                                  <th className="py-1 px-2 text-right text-zinc-500 font-medium">ROI/ano</th>
                                  <th className="py-1 pl-2 text-right text-zinc-500 font-medium">Prazo</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { label: "Conservador", data: flipAval.conservative, accent: "text-emerald-400" },
                                  { label: "Moderado", data: flipAval.moderate, accent: "text-green-400" },
                                  { label: "Otimista", data: flipAval.optimistic, accent: "text-green-300" },
                                ].map(({ label, data, accent }) => (
                                  <tr key={label} className="border-b border-zinc-800">
                                    <td className="py-1 pr-3 text-zinc-400">{label}</td>
                                    <td className="py-1 px-2 text-right">{brl(data.totalInvest)}</td>
                                    <td className="py-1 px-2 text-right">{brl(data.salePrice)}</td>
                                    <td className={`py-1 px-2 text-right font-semibold ${data.profit > 0 ? accent : "text-red-400"}`}>{brl(data.profit)}</td>
                                    <td className={`py-1 px-2 text-right font-semibold ${data.roi > 0 ? accent : "text-red-400"}`}>{pctFmt(data.roi)}</td>
                                    <td className={`py-1 px-2 text-right ${data.roiAnnual > 14.25 ? "text-green-400 font-semibold" : data.roiAnnual > 0 ? "text-zinc-300" : "text-red-400"}`}>{pctFmt(data.roiAnnual)}</td>
                                    <td className="py-1 pl-2 text-right text-zinc-400">{data.months}m</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Rental analysis */}
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Análise de Aluguel</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-zinc-800/50 rounded p-2.5">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Aluguel Mensal{inv.rentSource.includes("Estimativa") ? " ⚠" : ""}</div>
                        <div className={`text-base font-bold mt-0.5 ${inv.rentSource.includes("Estimativa") ? "text-orange-400" : "text-blue-400"}`}>{brl(inv.monthlyRent)}</div>
                        <div className={`text-[10px] ${inv.rentSource.includes("Estimativa") ? "text-orange-400/70" : "text-zinc-500"}`}>Fonte: {inv.rentSource}</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded p-2.5">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Yield Bruto Anual</div>
                        <div className={`text-base font-bold mt-0.5 ${inv.rentalYieldGross > 10 ? "text-green-400" : inv.rentalYieldGross > 7 ? "text-yellow-400" : "text-red-400"}`}>
                          {pctFmt(inv.rentalYieldGross)}
                        </div>
                        <div className="text-[10px] text-zinc-500">{brl(inv.monthlyRent * 12)}/ano</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded p-2.5">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Payback</div>
                        <div className="text-base font-bold text-zinc-300 mt-0.5">{inv.paybackMonths >= 999 ? "N/A" : `${inv.paybackMonths} meses`}</div>
                        <div className="text-[10px] text-zinc-500">{inv.paybackMonths >= 999 ? "Sem aluguel estimado" : `${(inv.paybackMonths / 12).toFixed(1)} anos`}</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded p-2.5">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Investimento Total</div>
                        <div className="text-base font-bold text-zinc-300 mt-0.5">{brl(inv.purchasePrice + inv.renoLight + inv.txCostBuy)}</div>
                        <div className="text-[10px] text-zinc-500">Compra + reforma leve + custos</div>
                      </div>
                    </div>
                    {/* Selic comparison */}
                    {/* IR note */}
                    {inv.monthlyRent > 0 && (
                      <div className="text-[10px] text-zinc-500 mt-1">
                        IR aluguel: {inv.monthlyRent <= 2428 ? <span className="text-green-500">Isento (abaixo de R$2.428/mês)</span> : <span className="text-yellow-500">Tributável ({inv.monthlyRent <= 3751 ? "7,5%" : inv.monthlyRent <= 4664 ? "15%" : "22,5%"} sobre excedente)</span>}
                      </div>
                    )}
                    {inv.rentalYieldGross > 0 && (() => {
                      const SELIC = 14.25;
                      const totalInvest = inv.purchasePrice + inv.renoLight + inv.txCostBuy;
                      const selicReturn = totalInvest * (SELIC / 100);
                      const rentReturn = inv.monthlyRent * 12;
                      const spread = inv.rentalYieldGross - SELIC;
                      return (
                        <div className={`rounded-lg p-2.5 mt-2 border ${spread >= 0 ? "bg-green-950/30 border-green-900/50" : spread >= -3 ? "bg-yellow-950/30 border-yellow-900/50" : "bg-red-950/30 border-red-900/50"}`}>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400">vs. Tesouro Selic ({SELIC}%)</span>
                            <span className={`font-bold ${spread >= 0 ? "text-green-400" : spread >= -3 ? "text-yellow-400" : "text-red-400"}`}>
                              {spread >= 0 ? "+" : ""}{spread.toFixed(1)} p.p.
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                            <span>Selic: {brl(selicReturn)}/ano</span>
                            <span>Aluguel: {brl(rentReturn)}/ano</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Risk assessment */}
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Avaliação de Risco</h4>
                    <div className="flex items-start gap-3">
                      <div className={`px-3 py-2 rounded-lg border ${riskBadge.bg} ${riskBadge.text} shrink-0`}>
                        <div className="text-base font-black">{inv.riskRating}</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-70">Conf: {inv.dataConfidence}</div>
                      </div>
                      <ul className="flex-1 space-y-1 pt-1">
                        {inv.riskFactors.map((f, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                            {f}
                          </li>
                        ))}
                        {inv.riskFactors.length === 0 && (
                          <li className="text-xs text-green-400">Sem fatores de risco significativos</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Crime rate */}
          {crimeRate !== null && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">Criminalidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Badge className={getCrimeColor(crimeRate) + " text-base px-3 py-1"}>
                    {Math.round(crimeRate).toLocaleString("pt-BR")}/100k hab.
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    {crimeRate < 1000
                      ? "Baixa criminalidade"
                      : crimeRate < 5000
                      ? "Criminalidade moderada"
                      : "Alta criminalidade"}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Price history chart */}
          {chartData.length > 1 && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Histórico de Preço ({chartData.length} registros)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#71717a", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          `R$${(v / 1000).toFixed(0)}k`
                        }
                        tick={{ fill: "#71717a", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={56}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#18181b",
                          border: "1px solid #3f3f46",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        labelStyle={{ color: "#a1a1aa" }}
                        formatter={(value) => [formatBRL(value as number), "Preço"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="preco"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ fill: "#22c55e", r: 3 }}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Show table below chart if few entries */}
                {chartData.length <= 10 && (
                  <div className="mt-3 space-y-1">
                    {history.map((h, i) => (
                      <div key={i} className="flex justify-between text-xs text-zinc-400">
                        <span>{formatDate(h.recordedAt)}</span>
                        <span className="font-mono">{formatBRL(h.preco)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Single price history entry (no chart needed) */}
          {chartData.length === 1 && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">Histórico de Preço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>{formatDate(history[0].recordedAt)}</span>
                  <span className="font-mono text-zinc-200">{formatBRL(history[0].preco)}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
