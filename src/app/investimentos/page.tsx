"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Property {
  favoriteId: number;
  propertyId: number;
  caixaId: string;
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
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  banheiros: number | null;
  areaTotalM2: string | null;
  areaPrivativaM2: string | null;
  lat: string | null;
  lng: string | null;
  score: string | null;
  scoreDetails: Record<string, number> | null;
  fotoUrl: string | null;
  linkCaixa: string | null;
  crimeRate: string | null;
  marketValue: string | null;
  marketValuePerM2: string | null;
  marketRentValue: string | null;
  comparablesCount: number | null;
  comparablesTier1Count: number | null;
  comparablesTier2Count: number | null;
  zapMarketValue: string | null;
  zapMarketValuePerM2: string | null;
  zapRentValue: string | null;
  zapComparablesCount: number | null;
  qaMarketValue: string | null;
  qaRentValue: string | null;
  qaComparablesCount: number | null;
  dataQualityFlag: string | null;
  firstSeenAt: string | null;
  lastSeenAt: string | null;
  removedAt: string | null;
  notes: string | null;
}

interface Analysis {
  prop: Property;
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
  // Flip scenarios
  flipConservative: { totalInvest: number; salePrice: number; profit: number; roi: number; months: number };
  flipModerate: { totalInvest: number; salePrice: number; profit: number; roi: number; months: number };
  flipOptimistic: { totalInvest: number; salePrice: number; profit: number; roi: number; months: number };
  // Rental
  rentalYieldGross: number;
  paybackMonths: number;
  // Risk
  riskRating: string;
  riskColor: string;
  riskFactors: string[];
  dataConfidence: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function n(v: string | number | null | undefined): number {
  if (v === null || v === undefined || v === "") return 0;
  const result = Number(v);
  return isNaN(result) ? 0 : result;
}

function brl(v: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

function pct(v: number): string {
  return `${v.toFixed(1)}%`;
}

function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "A+", color: "bg-green-600" };
  if (score >= 75) return { label: "A", color: "bg-green-600" };
  if (score >= 65) return { label: "B+", color: "bg-yellow-600" };
  if (score >= 55) return { label: "B", color: "bg-yellow-600" };
  if (score >= 40) return { label: "C", color: "bg-orange-600" };
  return { label: "D", color: "bg-red-600" };
}

function getRiskBadge(rating: string): { bg: string; text: string } {
  switch (rating) {
    case "EXCELENTE": return { bg: "bg-green-900/60 border-green-500", text: "text-green-300" };
    case "BOM": return { bg: "bg-emerald-900/60 border-emerald-500", text: "text-emerald-300" };
    case "MODERADO": return { bg: "bg-yellow-900/60 border-yellow-500", text: "text-yellow-300" };
    case "ARRISCADO": return { bg: "bg-orange-900/60 border-orange-500", text: "text-orange-300" };
    case "ALTO RISCO": return { bg: "bg-red-900/60 border-red-500", text: "text-red-300" };
    default: return { bg: "bg-zinc-800 border-zinc-600", text: "text-zinc-300" };
  }
}

// ─── Market data benchmarks (from research) ─────────────────────────────────

const MARKET_RENTS: Record<string, Record<string, { apt: number; casa: number; sala: number; terreno: number }>> = {
  CANOAS: {
    "RIO BRANCO": { apt: 1140, casa: 1800, sala: 1200, terreno: 0 },
    _default: { apt: 1400, casa: 2000, sala: 1500, terreno: 0 },
  },
  CACHOEIRINHA: {
    "VILA VISTA ALEGRE": { apt: 1730, casa: 2800, sala: 1200, terreno: 0 },
    _default: { apt: 1500, casa: 2500, sala: 1200, terreno: 0 },
  },
  CHARQUEADAS: {
    _default: { apt: 800, casa: 1200, sala: 800, terreno: 0 },
  },
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
  CHARQUEADAS: {
    _default: { apt: 2500, casa: 2150, sala: 2000, terreno: 500 },
  },
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

function getTypeKey(tipo: string | null): "apt" | "casa" | "sala" | "terreno" {
  if (!tipo) return "casa";
  const t = tipo.toUpperCase();
  if (t.includes("APART") || t.includes("KITNET")) return "apt";
  if (t.includes("SALA") || t.includes("COMERCIAL") || t.includes("LOJA")) return "sala";
  if (t.includes("TERRENO") || t.includes("LOTE")) return "terreno";
  return "casa";
}

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

function getLiquidity(cidade: string): "alta" | "media" | "baixa" {
  const c = cidade.toUpperCase();
  if (c.includes("PORTO ALEGRE") || c.includes("CANOAS")) return "alta";
  if (c.includes("SAO LEOPOLDO") || c.includes("NOVO HAMBURGO") || c.includes("CACHOEIRINHA") || c.includes("SAPUCAIA")) return "media";
  return "baixa";
}

// ─── Analysis engine ─────────────────────────────────────────────────────────

function analyze(prop: Property): Analysis {
  const purchasePrice = n(prop.preco);
  const appraisedValue = n(prop.valorAvaliacao);
  const area = n(prop.areaPrivativaM2) || n(prop.areaTotalM2) || 50;
  const typeKey = getTypeKey(prop.tipoImovel);

  // Best market value: prefer ITBI (real transactions), then ZAP, then QA, then benchmark
  let bestMarketValue = 0;
  let marketSource = "";
  let totalComparables = 0;

  const itbiVal = n(prop.marketValue);
  const zapVal = n(prop.zapMarketValue);
  const qaVal = n(prop.qaMarketValue);
  const itbiComps = (prop.comparablesTier1Count || 0) + (prop.comparablesTier2Count || 0);
  const zapComps = prop.zapComparablesCount || 0;
  const qaComps = prop.qaComparablesCount || 0;

  if (itbiVal > 0 && itbiComps >= 5) {
    bestMarketValue = itbiVal;
    marketSource = `ITBI (${itbiComps} transacoes reais)`;
    totalComparables = itbiComps;
  } else if (zapVal > 0 && zapComps >= 3) {
    bestMarketValue = zapVal;
    marketSource = `ZAP (${zapComps} anuncios)`;
    totalComparables = zapComps;
  } else if (qaVal > 0 && qaComps >= 3) {
    bestMarketValue = qaVal;
    marketSource = `QuintoAndar (${qaComps} anuncios)`;
    totalComparables = qaComps;
  } else {
    // Fallback to benchmark
    const m2price = getMarketPriceM2(prop.cidade, prop.bairro, prop.tipoImovel);
    bestMarketValue = m2price * area;
    marketSource = "Estimativa de mercado (benchmark)";
    totalComparables = 0;
  }

  // If we also have secondary sources, pick the highest confidence
  // but cap market value at a reasonable multiple of appraised value
  if (bestMarketValue > appraisedValue * 3 && appraisedValue > 0) {
    bestMarketValue = appraisedValue * 1.5; // likely data issue
    marketSource += " (ajustado)";
  }

  // Rent: prefer ZAP rent, then QA rent, then ITBI rent, then benchmark
  let monthlyRent = 0;
  let rentSource = "";
  const zapRent = n(prop.zapRentValue);
  const qaRent = n(prop.qaRentValue);
  const itbiRent = n(prop.marketRentValue);

  if (zapRent > 0) { monthlyRent = zapRent; rentSource = "ZAP"; }
  else if (qaRent > 0) { monthlyRent = qaRent; rentSource = "QuintoAndar"; }
  else if (itbiRent > 0) { monthlyRent = itbiRent; rentSource = "ITBI"; }
  else {
    const tablRent = getMarketRent(prop.cidade, prop.bairro, prop.tipoImovel);
    if (tablRent !== 1000) {
      monthlyRent = tablRent;
      rentSource = "Estimativa (tabela)";
    } else if (area > 0) {
      const typeK = getTypeKey(prop.tipoImovel);
      const rentPerM2 = typeK === "apt" ? 17 : typeK === "casa" ? 13 : typeK === "sala" ? 25 : 10;
      monthlyRent = Math.round(area * rentPerM2);
      rentSource = `Estimativa (R$${rentPerM2}/m²)`;
    } else {
      monthlyRent = 1000;
      rentSource = "Estimativa generica";
    }
  }

  // Renovation costs (per m2, CUB/RS Feb 2026 derived)
  const renoLight = area * 700;
  const renoMedium = area * 1200;
  const renoHeavy = area * 1800;

  // Transaction costs — POA ITBI = 3%, RS interior = 2%. Add ~1.5% for escritura+registro
  const itbiRate = prop.cidade.toUpperCase() === "PORTO ALEGRE" ? 0.03 : 0.02;
  const txCostBuy = purchasePrice * (itbiRate + 0.015);
  const txCostSell = bestMarketValue * 0.055; // Corretagem 5.5%

  // Flip scenarios
  const flipMonthsBase = getLiquidity(prop.cidade) === "alta" ? 8 : getLiquidity(prop.cidade) === "media" ? 14 : 24;

  const flipConservative = (() => {
    const reno = renoLight;
    const totalInvest = purchasePrice + reno + txCostBuy;
    const salePrice = bestMarketValue * 0.85; // sell 15% below market
    const profit = salePrice - totalInvest - (salePrice * 0.055);
    const roi = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    return { totalInvest, salePrice, profit, roi, months: flipMonthsBase + 4 };
  })();

  const flipModerate = (() => {
    const reno = renoLight;
    const totalInvest = purchasePrice + reno + txCostBuy;
    const salePrice = bestMarketValue * 0.95; // sell 5% below market
    const profit = salePrice - totalInvest - (salePrice * 0.055);
    const roi = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    return { totalInvest, salePrice, profit, roi, months: flipMonthsBase + 2 };
  })();

  const flipOptimistic = (() => {
    const reno = renoLight;
    const totalInvest = purchasePrice + reno + txCostBuy;
    const salePrice = bestMarketValue; // sell at market
    const profit = salePrice - totalInvest - (salePrice * 0.055);
    const roi = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    return { totalInvest, salePrice, profit, roi, months: flipMonthsBase };
  })();

  // Rental yield
  const totalInvestRental = purchasePrice + renoLight + txCostBuy;
  const annualRent = monthlyRent * 12;
  const rentalYieldGross = totalInvestRental > 0 ? (annualRent / totalInvestRental) * 100 : 0;
  const paybackMonths = monthlyRent > 0 ? Math.ceil(totalInvestRental / monthlyRent) : 999;

  // Risk assessment
  const riskFactors: string[] = [];
  let riskScore = 0;

  // Liquidity
  const liq = getLiquidity(prop.cidade);
  if (liq === "baixa") { riskScore += 30; riskFactors.push("Mercado com baixa liquidez"); }
  else if (liq === "media") { riskScore += 10; riskFactors.push("Liquidez moderada"); }

  // Financing
  if (!prop.aceitaFinanciamento) { riskScore += 10; riskFactors.push("Sem financiamento (pagamento a vista)"); }

  // Data confidence
  if (totalComparables === 0) { riskScore += 20; riskFactors.push("Sem comparaveis (estimativa)"); }
  else if (totalComparables < 5) { riskScore += 10; riskFactors.push(`Poucos comparaveis (${totalComparables})`); }

  // Crime
  const crime = n(prop.crimeRate);
  if (crime > 7000) { riskScore += 15; riskFactors.push(`Criminalidade alta (${crime.toFixed(0)}/100k)`); }
  else if (crime > 5000) { riskScore += 5; riskFactors.push(`Criminalidade moderada (${crime.toFixed(0)}/100k)`); }

  // Renovation scope
  if (area > 200) { riskScore += 10; riskFactors.push(`Area grande (${area.toFixed(0)}m2) — reforma cara`); }

  // Property type
  if (typeKey === "terreno") { riskScore += 5; riskFactors.push("Terreno — sem renda imediata"); }

  // Discount vs market
  const discountVsMarket = bestMarketValue > 0 ? ((bestMarketValue - purchasePrice) / bestMarketValue) * 100 : 0;
  if (discountVsMarket < 30) { riskScore += 15; riskFactors.push(`Desconto baixo vs mercado (${discountVsMarket.toFixed(0)}%)`); }

  let riskRating: string;
  let riskColor: string;
  if (riskScore <= 10) { riskRating = "EXCELENTE"; riskColor = "green"; }
  else if (riskScore <= 25) { riskRating = "BOM"; riskColor = "emerald"; }
  else if (riskScore <= 45) { riskRating = "MODERADO"; riskColor = "yellow"; }
  else if (riskScore <= 65) { riskRating = "ARRISCADO"; riskColor = "orange"; }
  else { riskRating = "ALTO RISCO"; riskColor = "red"; }

  // Data confidence
  let dataConfidence: string;
  if (totalComparables >= 50) dataConfidence = "Alta";
  else if (totalComparables >= 10) dataConfidence = "Boa";
  else if (totalComparables >= 3) dataConfidence = "Moderada";
  else dataConfidence = "Baixa";

  return {
    prop,
    area,
    purchasePrice,
    appraisedValue,
    bestMarketValue,
    marketSource,
    totalComparables,
    monthlyRent,
    rentSource,
    renoLight,
    renoMedium,
    renoHeavy,
    txCostBuy,
    txCostSell,
    flipConservative,
    flipModerate,
    flipOptimistic,
    rentalYieldGross,
    paybackMonths,
    riskRating,
    riskColor,
    riskFactors,
    dataConfidence,
  };
}

// ─── Components ──────────────────────────────────────────────────────────────

function ScenarioRow({ label, data, accent }: { label: string; data: Analysis["flipConservative"]; accent: string }) {
  return (
    <tr className="border-b border-zinc-800">
      <td className="py-2 pr-3 text-sm text-zinc-400">{label}</td>
      <td className="py-2 px-3 text-sm text-right">{brl(data.totalInvest)}</td>
      <td className="py-2 px-3 text-sm text-right">{brl(data.salePrice)}</td>
      <td className={`py-2 px-3 text-sm text-right font-semibold ${data.profit > 0 ? accent : "text-red-400"}`}>
        {brl(data.profit)}
      </td>
      <td className={`py-2 px-3 text-sm text-right font-semibold ${data.roi > 0 ? accent : "text-red-400"}`}>
        {pct(data.roi)}
      </td>
      <td className="py-2 pl-3 text-sm text-right text-zinc-400">{data.months} meses</td>
    </tr>
  );
}

function generateSummary(a: Analysis): string {
  const p = a.prop;
  const typeKey = getTypeKey(p.tipoImovel);
  const liq = getLiquidity(p.cidade);
  const discountVsMarket = a.bestMarketValue > 0 ? ((a.bestMarketValue - a.purchasePrice) / a.bestMarketValue) * 100 : 0;

  let summary = "";

  // Opening assessment
  if (a.flipModerate.roi > 80) {
    summary += `Oportunidade excepcional. `;
  } else if (a.flipModerate.roi > 40) {
    summary += `Bom potencial de valorizacao. `;
  } else if (a.flipModerate.roi > 15) {
    summary += `Retorno moderado. `;
  } else if (a.flipModerate.roi > 0) {
    summary += `Margem apertada. `;
  } else {
    summary += `Investimento arriscado — ROI negativo no cenario moderado. `;
  }

  // Property specifics
  summary += `${p.tipoImovel || "Imovel"} de ${a.area.toFixed(0)}m² em ${p.cidade}/${p.bairro || "—"}, `;
  summary += `comprando a ${brl(a.purchasePrice)} (${pct(discountVsMarket)} abaixo do mercado). `;

  // Best strategy
  if (a.rentalYieldGross > 12 && a.flipModerate.roi > 30) {
    summary += `Dupla estrategia viavel: alugar a ${brl(a.monthlyRent)}/mes (yield ${pct(a.rentalYieldGross)}) enquanto valoriza, ou flip com lucro de ${brl(a.flipModerate.profit)}. `;
  } else if (a.rentalYieldGross > 10) {
    summary += `Melhor como renda passiva — yield de ${pct(a.rentalYieldGross)} com aluguel de ${brl(a.monthlyRent)}/mes, payback em ${(a.paybackMonths / 12).toFixed(1)} anos. `;
  } else if (a.flipModerate.roi > 30) {
    summary += `Melhor para flip — lucro estimado de ${brl(a.flipModerate.profit)} em ~${a.flipModerate.months} meses. `;
  } else if (typeKey === "terreno") {
    summary += `Terreno sem receita imediata — lucro depende de revenda ou construcao. `;
  } else {
    summary += `Margens baixas em ambos cenarios (flip e aluguel). `;
  }

  // Risk warnings
  if (!p.aceitaFinanciamento) {
    summary += `Exige pagamento a vista. `;
  }
  if (liq === "baixa") {
    summary += `Mercado muito iliquido — revenda pode levar 24+ meses. `;
  }
  if (a.totalComparables === 0) {
    summary += `Sem dados de comparaveis — estimativa de mercado tem baixa confianca. `;
  }
  if (n(p.crimeRate) > 7000) {
    summary += `Zona com criminalidade alta, pode dificultar aluguel/venda. `;
  }
  if (a.area > 200) {
    summary += `Area grande implica custo de reforma elevado (${brl(a.renoLight)}-${brl(a.renoHeavy)}). `;
  }

  // Data confidence
  if (a.totalComparables >= 50) {
    summary += `Alta confianca nos dados (${a.totalComparables} comparaveis).`;
  } else if (a.totalComparables >= 10) {
    summary += `Boa base de dados (${a.totalComparables} comparaveis).`;
  } else if (a.totalComparables > 0) {
    summary += `Poucos comparaveis (${a.totalComparables}) — valores podem variar.`;
  }

  return summary;
}

function computeFlipScenarios(a: Analysis, renoLevel: "light" | "medium" | "heavy", targetValue?: number) {
  const reno = renoLevel === "light" ? a.renoLight : renoLevel === "medium" ? a.renoMedium : a.renoHeavy;
  const totalInvest = a.purchasePrice + reno + a.txCostBuy;
  const liq = getLiquidity(a.prop.cidade);
  const baseMonths = liq === "alta" ? 8 : liq === "media" ? 14 : 24;
  const base = (targetValue && targetValue > 0) ? targetValue : a.bestMarketValue;

  const make = (saleMult: number, extraMonths: number) => {
    const salePrice = base * saleMult;
    const profit = salePrice - totalInvest - (salePrice * 0.055);
    const roi = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    const months = baseMonths + extraMonths;
    const roiAnnual = months > 0 && roi > -100 ? (Math.pow(1 + roi / 100, 12 / months) - 1) * 100 : 0;
    return { totalInvest, salePrice, profit, roi, roiAnnual, months };
  };

  return {
    conservative: make(0.85, 4),
    moderate: make(0.95, 2),
    optimistic: make(1.0, 0),
    reno,
    totalInvestRental: totalInvest,
  };
}

const RENO_LABELS: Record<string, string> = { light: "Leve (R$700/m²)", medium: "Media (R$1.200/m²)", heavy: "Pesada (R$1.800/m²)" };

function PropertyCard({ a, rank, onRemove }: { a: Analysis; rank: number; onRemove: (favoriteId: number, propertyId: number) => void }) {
  const [expanded, setExpanded] = useState(rank <= 3);
  const [popup, setPopup] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const [renoLevel, setRenoLevel] = useState<"light" | "medium" | "heavy">("light");
  const p = a.prop;
  const scoreGrade = p.score ? getScoreGrade(Number(p.score)) : null;
  const riskBadge = getRiskBadge(a.riskRating);
  const discountVsMarket = a.bestMarketValue > 0 ? ((a.bestMarketValue - a.purchasePrice) / a.bestMarketValue) * 100 : 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Popups */}
      {popup === "rent" && <RentDetailPopup a={a} onClose={() => setPopup(null)} />}
      {popup === "yield" && <YieldDetailPopup a={a} onClose={() => setPopup(null)} />}
      {popup === "invest" && <InvestmentDetailPopup a={a} onClose={() => setPopup(null)} />}
      {popup === "itbi" && <MarketValuePopup a={a} onClose={() => setPopup(null)} source="itbi" />}
      {popup === "zap" && <MarketValuePopup a={a} onClose={() => setPopup(null)} source="zap" />}
      {popup === "qa" && <MarketValuePopup a={a} onClose={() => setPopup(null)} source="qa" />}

      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors text-left"
      >
        {/* Rank */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-300">
          {rank}
        </div>

        {/* Photo */}
        {p.fotoUrl && (
          <img
            src={p.fotoUrl}
            alt=""
            className="w-16 h-12 object-cover rounded flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-medium text-sm truncate">
              {p.cidade} — {p.bairro || "—"}
            </span>
            {scoreGrade && (
              <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${scoreGrade.color} text-white`}>
                {scoreGrade.label}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${riskBadge.bg} ${riskBadge.text}`}>
              {a.riskRating}
            </span>
            {p.aceitaFinanciamento && (
              <span className="px-1.5 py-0.5 rounded text-xs bg-blue-900/60 text-blue-300 border border-blue-500">
                Financia
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 truncate mt-0.5">
            {p.tipoImovel} &middot; {p.endereco} &middot; {a.area.toFixed(0)}m²
            {p.quartos ? ` &middot; ${p.quartos}q` : ""}
            {p.vagas ? ` &middot; ${p.vagas}v` : ""}
          </p>
        </div>

        {/* Price summary */}
        <div className="flex-shrink-0 text-right hidden sm:block">
          <div className="text-sm font-bold text-emerald-400">{brl(a.purchasePrice)}</div>
          <div className="text-xs text-zinc-500">Mercado: {brl(a.bestMarketValue)}</div>
        </div>

        {/* Metrics badges */}
        <div className="flex-shrink-0 text-right hidden sm:flex items-center gap-3">
          <div>
            <div className={`text-sm font-bold ${a.rentalYieldGross > 10 ? "text-blue-400" : a.rentalYieldGross > 7 ? "text-blue-300" : "text-zinc-400"}`}>
              {pct(a.rentalYieldGross)}
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Yield</div>
          </div>
          {a.appraisedValue > 0 && (() => {
            const roiAval = computeFlipScenarios(a, "light", a.appraisedValue).moderate.roi;
            return (
              <div>
                <div className={`text-sm font-bold ${roiAval > 20 ? "text-amber-400" : roiAval > 0 ? "text-amber-300" : "text-red-400"}`}>
                  {pct(roiAval)}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">ROI Aval.</div>
              </div>
            );
          })()}
        </div>

        {/* ROI badge */}
        <div className="flex-shrink-0 text-right">
          <div className={`text-lg font-black ${a.flipModerate.roi > 50 ? "text-green-400" : a.flipModerate.roi > 20 ? "text-yellow-400" : "text-red-400"}`}>
            {pct(a.flipModerate.roi)}
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">ROI flip</div>
        </div>

        {/* Chevron */}
        <svg className={`w-5 h-5 text-zinc-500 transition-transform flex-shrink-0 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-zinc-800 p-4 space-y-5">
          {/* ── AI Summary ── */}
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-xs text-zinc-300 leading-relaxed">{generateSummary(a)}</p>
          </div>

          {/* Mobile price */}
          <div className="sm:hidden flex justify-between items-center">
            <span className="text-sm text-zinc-400">Preco Caixa</span>
            <span className="text-sm font-bold text-emerald-400">{brl(a.purchasePrice)}</span>
          </div>

          {/* ── Valuation comparison ── */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Comparativo de Valores</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ValueBox label="Preco Caixa" value={brl(a.purchasePrice)} sub={`${brl(a.purchasePrice / a.area)}/m²`} color="text-emerald-400" />
              <ValueBox label="Avaliacao Caixa" value={brl(a.appraisedValue)} sub={`Desc. ${pct(n(p.desconto))}`} color="text-zinc-300" />
              <ValueBox label={`Mercado (${a.marketSource.split(" (")[0]})`} value={brl(a.bestMarketValue)} sub={`${brl(a.bestMarketValue / a.area)}/m² · ${a.totalComparables} comps`} color="text-blue-400" onClick={() => setPopup(a.marketSource.startsWith("ITBI") ? "itbi" : a.marketSource.startsWith("ZAP") ? "zap" : a.marketSource.startsWith("Quinto") ? "qa" : null)} />
              <ValueBox label="Desconto vs Mercado" value={pct(discountVsMarket)} sub={`Economia: ${brl(a.bestMarketValue - a.purchasePrice)}`} color={discountVsMarket > 40 ? "text-green-400" : discountVsMarket > 25 ? "text-yellow-400" : "text-red-400"} />
            </div>
          </div>

          {/* ── Market sources breakdown ── */}
          {(n(p.marketValue) > 0 || n(p.zapMarketValue) > 0 || n(p.qaMarketValue) > 0) && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Fontes de Mercado <span className="text-zinc-600 normal-case font-normal">(clique para ver comparaveis)</span></h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {n(p.marketValue) > 0 && (
                  <div className="bg-zinc-800/50 rounded p-2 cursor-pointer hover:bg-zinc-700/50 hover:ring-1 hover:ring-zinc-600 transition-all" onClick={() => setPopup("itbi")}>
                    <div className="text-xs text-zinc-500">ITBI (transacoes reais)</div>
                    <div className="text-sm font-medium text-white underline decoration-dotted underline-offset-2">{brl(n(p.marketValue))}</div>
                    <div className="text-xs text-zinc-500">{n(p.marketValuePerM2) > 0 ? `${brl(n(p.marketValuePerM2))}/m²` : ""} &middot; {(p.comparablesTier1Count || 0) + (p.comparablesTier2Count || 0)} comps</div>
                  </div>
                )}
                {n(p.zapMarketValue) > 0 && (
                  <div className="bg-zinc-800/50 rounded p-2 cursor-pointer hover:bg-zinc-700/50 hover:ring-1 hover:ring-zinc-600 transition-all" onClick={() => setPopup("zap")}>
                    <div className="text-xs text-zinc-500">ZAP Imoveis</div>
                    <div className="text-sm font-medium text-white underline decoration-dotted underline-offset-2">{brl(n(p.zapMarketValue))}</div>
                    <div className="text-xs text-zinc-500">{n(p.zapMarketValuePerM2) > 0 ? `${brl(n(p.zapMarketValuePerM2))}/m²` : ""} &middot; {p.zapComparablesCount || 0} comps</div>
                  </div>
                )}
                {n(p.qaMarketValue) > 0 && (
                  <div className="bg-zinc-800/50 rounded p-2 cursor-pointer hover:bg-zinc-700/50 hover:ring-1 hover:ring-zinc-600 transition-all" onClick={() => setPopup("qa")}>
                    <div className="text-xs text-zinc-500">QuintoAndar</div>
                    <div className="text-sm font-medium text-white underline decoration-dotted underline-offset-2">{brl(n(p.qaMarketValue))}</div>
                    <div className="text-xs text-zinc-500">{p.qaComparablesCount || 0} comps</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Renovation estimates ── */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Custo de Reforma ({a.area.toFixed(0)}m²)</h4>
            <div className="grid grid-cols-3 gap-3">
              <ValueBox label="Leve (R$700/m²)" value={brl(a.renoLight)} sub="Pintura, piso, eletrica" color="text-green-400" />
              <ValueBox label="Media (R$1.200/m²)" value={brl(a.renoMedium)} sub="+ banheiros, cozinha" color="text-yellow-400" />
              <ValueBox label="Pesada (R$1.800/m²)" value={brl(a.renoHeavy)} sub="Reforma completa" color="text-red-400" />
            </div>
          </div>

          {/* ── Flip analysis ── */}
          {(() => {
            const flip = computeFlipScenarios(a, renoLevel);
            return (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cenarios de Flip (Revenda)</h4>
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
                        {lvl === "light" ? "Leve" : lvl === "medium" ? "Media" : "Pesada"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="min-w-[600px] w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="py-2 pr-3 text-left text-xs text-zinc-500 font-medium whitespace-nowrap">Cenario</th>
                        <th className="py-2 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Investimento</th>
                        <th className="py-2 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Venda</th>
                        <th className="py-2 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Lucro</th>
                        <th className="py-2 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">ROI</th>
                        <th className="py-2 pl-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Prazo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ScenarioRow label="Conservador" data={flip.conservative} accent="text-emerald-400" />
                      <ScenarioRow label="Moderado" data={flip.moderate} accent="text-green-400" />
                      <ScenarioRow label="Otimista" data={flip.optimistic} accent="text-green-300" />
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-zinc-600 mt-1">
                  * Reforma {RENO_LABELS[renoLevel]}. Conservador: venda 15% abaixo do mercado. Moderado: venda 5% abaixo. Otimista: venda ao preco de mercado. Todos incluem ITBI (2%), escritura, registro e corretagem (5,5%).
                </p>

                {/* Sub-table: flip based on Caixa appraised value */}
                {a.appraisedValue > 0 && a.appraisedValue !== a.bestMarketValue && (() => {
                  const flipAval = computeFlipScenarios(a, renoLevel, a.appraisedValue);
                  return (
                    <div className="mt-3 pt-3 border-t border-zinc-800/50">
                      <p className="text-[10px] text-zinc-500 mb-1.5">Sob valor de avaliacao Caixa ({brl(a.appraisedValue)})</p>
                      <div className="overflow-x-auto -mx-4 px-4">
                        <table className="min-w-[600px] w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-700">
                              <th className="py-1.5 pr-3 text-left text-xs text-zinc-500 font-medium whitespace-nowrap">Cenario</th>
                              <th className="py-1.5 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Investimento</th>
                              <th className="py-1.5 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Venda</th>
                              <th className="py-1.5 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Lucro</th>
                              <th className="py-1.5 px-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">ROI</th>
                              <th className="py-1.5 pl-3 text-right text-xs text-zinc-500 font-medium whitespace-nowrap">Prazo</th>
                            </tr>
                          </thead>
                          <tbody>
                            <ScenarioRow label="Conservador" data={flipAval.conservative} accent="text-emerald-400" />
                            <ScenarioRow label="Moderado" data={flipAval.moderate} accent="text-green-400" />
                            <ScenarioRow label="Otimista" data={flipAval.optimistic} accent="text-green-300" />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })()}

          {/* ── Rental analysis ── */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Analise de Aluguel <span className="text-zinc-600 normal-case font-normal">(clique para detalhes)</span></h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ValueBox label="Aluguel Mensal" value={brl(a.monthlyRent)} sub={`Fonte: ${a.rentSource}`} color="text-blue-400" onClick={() => setPopup("rent")} />
              <ValueBox label="Yield Bruto Anual" value={pct(a.rentalYieldGross)} sub={`${brl(a.monthlyRent * 12)}/ano`} color={a.rentalYieldGross > 10 ? "text-green-400" : a.rentalYieldGross > 7 ? "text-yellow-400" : "text-red-400"} onClick={() => setPopup("yield")} />
              <ValueBox label="Payback" value={a.paybackMonths >= 999 ? "N/A" : `${a.paybackMonths} meses`} sub={a.paybackMonths >= 999 ? "Sem aluguel estimado" : `${(a.paybackMonths / 12).toFixed(1)} anos`} color="text-zinc-300" onClick={() => setPopup("yield")} />
              <ValueBox label="Investimento Total" value={brl(a.purchasePrice + a.renoLight + a.txCostBuy)} sub="Compra + reforma leve + custos" color="text-zinc-300" onClick={() => setPopup("invest")} />
            </div>
          </div>

          {/* ── Risk assessment ── */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Avaliacao de Risco</h4>
            <div className="flex items-start gap-4">
              <div className={`px-4 py-2 rounded-lg border ${riskBadge.bg} ${riskBadge.text}`}>
                <div className="text-lg font-black">{a.riskRating}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-70">Confianca: {a.dataConfidence}</div>
              </div>
              <ul className="flex-1 space-y-1">
                {a.riskFactors.map((f, i) => (
                  <li key={i} className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Transaction costs ── */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Custos de Transacao</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ValueBox label="ITBI (2%)" value={brl(a.purchasePrice * 0.02)} sub="Imposto de transmissao" color="text-zinc-300" />
              <ValueBox label="Escritura + Registro" value={brl(a.purchasePrice * 0.02)} sub="~2% (cartorio)" color="text-zinc-300" />
              <ValueBox label="Corretagem (venda)" value={brl(a.txCostSell)} sub="5,5% do preco de venda" color="text-zinc-300" />
              <ValueBox label="Total Custos" value={brl(a.txCostBuy + a.txCostSell)} sub="Compra + venda" color="text-orange-400" />
            </div>
          </div>

          {/* ── Links ── */}
          <div className="flex gap-3 flex-wrap items-center">
            <button
              onClick={() => {
                if (removing) return;
                if (!confirm("Remover este imovel dos favoritos?")) return;
                setRemoving(true);
                onRemove(p.favoriteId, p.propertyId);
              }}
              disabled={removing}
              className="text-xs px-3 py-1.5 rounded bg-red-900/40 text-red-400 hover:bg-red-900/70 border border-red-800/50 transition-colors disabled:opacity-50"
            >
              {removing ? "Removendo..." : "Remover dos favoritos"}
            </button>
            <Link
              href={`/imoveis/${p.propertyId}`}
              className="text-xs px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              Ver detalhes no app
            </Link>
            {p.linkCaixa && (
              <a
                href={p.linkCaixa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Ver no site da Caixa
              </a>
            )}
            {p.lat && p.lng && (
              <a
                href={`https://www.google.com/maps/@${p.lat},${p.lng},17z`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Google Maps
              </a>
            )}
            {p.lat && p.lng && (
              <a
                href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${p.lat},${p.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Street View
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ValueBox({ label, value, sub, color, onClick }: { label: string; value: string; sub: string; color: string; onClick?: () => void }) {
  return (
    <div
      className={`bg-zinc-800/50 rounded p-2.5 ${onClick ? "cursor-pointer hover:bg-zinc-700/50 hover:ring-1 hover:ring-zinc-600 transition-all" : ""}`}
      onClick={onClick}
    >
      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</div>
      <div className={`text-base font-bold ${color} mt-0.5 ${onClick ? "underline decoration-dotted underline-offset-2" : ""}`}>{value}</div>
      <div className="text-[10px] text-zinc-500 mt-0.5">{sub}</div>
    </div>
  );
}

// ─── Popups ──────────────────────────────────────────────────────────────────

interface PopupProps { onClose: () => void; children: React.ReactNode; title: string; width?: string }

function Popup({ onClose, children, title, width = "w-[420px]" }: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div ref={ref} className={`${width} max-h-[80vh] overflow-auto bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl p-4`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-zinc-200">{title}</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-lg leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function RentDetailPopup({ a, onClose }: { a: Analysis; onClose: () => void }) {
  type RentalRow = { bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null; source: string };
  const [allRentals, setAllRentals] = useState<RentalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${a.prop.propertyId}/comparables?months=12`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const zap = (d.zapRentals?.comparables || []).map((r: Omit<RentalRow, "source">) => ({ ...r, source: "ZAP" }));
        const qa = (d.qaRentals?.comparables || []).map((r: Omit<RentalRow, "source">) => ({ ...r, source: "5ºAndar" }));
        setAllRentals([...zap, ...qa].sort((a, b) => a.price - b.price));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [a.prop.propertyId]);

  return (
    <Popup onClose={onClose} title="Alugueis Comparaveis (ZAP + 5ºAndar)" width="w-[560px]">
      <div className="text-xs space-y-3">
        <div className="bg-zinc-800 rounded p-2.5 space-y-1">
          <div className="flex justify-between text-zinc-400"><span>Aluguel mensal estimado</span><span className="text-green-400 font-semibold text-sm">{brl(a.monthlyRent)}/mes</span></div>
          <div className="flex justify-between text-zinc-400"><span>Fonte</span><span className="text-zinc-200">{a.rentSource}</span></div>
          <div className="flex justify-between text-zinc-400"><span>Aluguel anual</span><span className="text-zinc-200">{brl(a.monthlyRent * 12)}</span></div>
          <div className="flex justify-between text-zinc-400"><span>Yield bruto sobre investimento</span><span className={`font-semibold ${a.rentalYieldGross > 10 ? "text-green-400" : a.rentalYieldGross > 7 ? "text-yellow-400" : "text-red-400"}`}>{pct(a.rentalYieldGross)} a.a.</span></div>
        </div>

        {loading ? (
          <p className="text-zinc-500">Carregando comparaveis...</p>
        ) : allRentals.length > 0 ? (
          <>
            <p className="text-zinc-500">{allRentals.length} alugueis no mesmo bairro ({a.prop.bairro}):</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-1 pr-2">Fonte</th>
                  <th className="text-left py-1 pr-2">Tipo</th>
                  <th className="text-right py-1 pr-2">Aluguel</th>
                  <th className="text-right py-1 pr-2">Area</th>
                  <th className="text-right py-1 pr-2">Qtos</th>
                  <th className="text-right py-1">Link</th>
                </tr>
              </thead>
              <tbody>
                {allRentals.map((r, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className={`py-1 pr-2 text-xs font-medium ${r.source === "ZAP" ? "text-orange-400" : "text-purple-400"}`}>{r.source}</td>
                    <td className="py-1 pr-2 text-zinc-400 max-w-[80px] truncate">{r.unitType || "—"}</td>
                    <td className="py-1 pr-2 text-right text-green-400 font-medium">{brl(r.price)}</td>
                    <td className="py-1 pr-2 text-right text-zinc-400">{r.area > 0 ? `${Math.round(r.area)}m²` : "—"}</td>
                    <td className="py-1 pr-2 text-right text-zinc-400">{r.bedrooms ?? "—"}</td>
                    <td className="py-1 text-right">
                      {r.listingUrl ? <a href={r.listingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ver</a> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-zinc-500">Sem alugueis comparaveis. Valor estimado via benchmark do bairro ({a.prop.cidade} — {a.prop.bairro}).</p>
        )}
      </div>
    </Popup>
  );
}

function YieldDetailPopup({ a, onClose }: { a: Analysis; onClose: () => void }) {
  const preco = a.purchasePrice;
  const aluguelMensal = a.monthlyRent;
  const valorAvaliacao = a.appraisedValue;

  const itbiCost = preco * 0.02;
  const escrituraCost = preco * 0.01;
  const registroCost = preco * 0.01;
  const totalAcquisition = preco + a.renoLight + itbiCost + escrituraCost + registroCost;

  const aluguelAnual = aluguelMensal * 12;
  const vacancyCost = aluguelAnual * 0.08;
  const adminCost = aluguelAnual * 0.10;
  const manutencaoCost = preco * 0.01;
  const iptuBase = valorAvaliacao > 0 ? valorAvaliacao : preco;
  const iptuCost = iptuBase * 0.006;
  const totalCostAnual = vacancyCost + adminCost + manutencaoCost + iptuCost;
  const receitaLiquida = aluguelAnual - totalCostAnual;

  const yieldBruto = (aluguelAnual / totalAcquisition) * 100;
  const yieldLiquido = (receitaLiquida / totalAcquisition) * 100;
  const paybackBruto = Math.ceil(totalAcquisition / aluguelMensal);
  const paybackLiquido = receitaLiquida > 0 ? Math.ceil(totalAcquisition / (receitaLiquida / 12)) : 999;

  const yieldColor = (y: number) => y >= 8 ? "text-green-400" : y >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <Popup onClose={onClose} title="Analise Completa de Yield">
      <div className="text-xs space-y-3">
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Custo de Aquisicao</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Preco Caixa</span><span className="text-zinc-200">{brl(preco)}</span></div>
            <div className="flex justify-between"><span>Reforma leve ({a.area.toFixed(0)}m² x R$700)</span><span>{brl(a.renoLight)}</span></div>
            <div className="flex justify-between"><span>ITBI (2%)</span><span>{brl(itbiCost)}</span></div>
            <div className="flex justify-between"><span>Escritura (~1%)</span><span>{brl(escrituraCost)}</span></div>
            <div className="flex justify-between"><span>Registro (~1%)</span><span>{brl(registroCost)}</span></div>
            <div className="flex justify-between border-t border-zinc-800 pt-0.5 font-medium text-zinc-200"><span>Total Investido</span><span>{brl(totalAcquisition)}</span></div>
          </div>
        </div>

        <div>
          <p className="text-zinc-500 font-semibold mb-1">Receita Anual</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Aluguel mensal ({a.rentSource})</span><span className="text-green-400">{brl(aluguelMensal)}/mes</span></div>
            <div className="flex justify-between font-medium text-zinc-200"><span>Receita bruta anual</span><span>{brl(aluguelAnual)}</span></div>
          </div>
        </div>

        <div>
          <p className="text-zinc-500 font-semibold mb-1">Custos Anuais</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Vacancia (8% — ~1 mes/ano)</span><span>- {brl(vacancyCost)}</span></div>
            <div className="flex justify-between"><span>Administracao (10%)</span><span>- {brl(adminCost)}</span></div>
            <div className="flex justify-between"><span>Manutencao (1% preco)</span><span>- {brl(manutencaoCost)}</span></div>
            <div className="flex justify-between"><span>IPTU (~0,6% {valorAvaliacao > 0 ? "avaliacao" : "preco"})</span><span>- {brl(iptuCost)}</span></div>
            <div className="flex justify-between border-t border-zinc-800 pt-0.5"><span className="font-medium text-zinc-200">Receita liquida anual</span><span className={`font-medium ${receitaLiquida > 0 ? "text-green-400" : "text-red-400"}`}>{brl(receitaLiquida)}</span></div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded p-2.5 space-y-1">
          <div className="flex justify-between"><span className="text-zinc-400">Yield bruto anual</span><span className={`font-semibold ${yieldColor(yieldBruto)}`}>{yieldBruto.toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Yield liquido anual</span><span className={`font-semibold ${yieldColor(yieldLiquido)}`}>{yieldLiquido.toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Payback bruto</span><span className="text-zinc-200">{paybackBruto} meses ({(paybackBruto / 12).toFixed(1)} anos)</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Payback liquido</span><span className="text-zinc-200">{paybackLiquido} meses ({(paybackLiquido / 12).toFixed(1)} anos)</span></div>
        </div>
      </div>
    </Popup>
  );
}

function InvestmentDetailPopup({ a, onClose }: { a: Analysis; onClose: () => void }) {
  return (
    <Popup onClose={onClose} title="Composicao do Investimento Total">
      <div className="text-xs space-y-3">
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Cenario: Reforma Leve</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Preco Caixa</span><span className="text-zinc-200">{brl(a.purchasePrice)}</span></div>
            <div className="flex justify-between"><span>Reforma leve ({a.area.toFixed(0)}m² x R$700/m²)</span><span>{brl(a.renoLight)}</span></div>
            <div className="flex justify-between"><span>ITBI (2%)</span><span>{brl(a.purchasePrice * 0.02)}</span></div>
            <div className="flex justify-between"><span>Escritura (~1%)</span><span>{brl(a.purchasePrice * 0.01)}</span></div>
            <div className="flex justify-between"><span>Registro (~1%)</span><span>{brl(a.purchasePrice * 0.01)}</span></div>
            <div className="flex justify-between border-t border-zinc-800 pt-1 font-medium text-white text-sm"><span>Total</span><span>{brl(a.purchasePrice + a.renoLight + a.txCostBuy)}</span></div>
          </div>
        </div>
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Outros Cenarios</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Com reforma media</span><span className="text-zinc-200">{brl(a.purchasePrice + a.renoMedium + a.txCostBuy)}</span></div>
            <div className="flex justify-between"><span>Com reforma pesada</span><span className="text-zinc-200">{brl(a.purchasePrice + a.renoHeavy + a.txCostBuy)}</span></div>
            <div className="flex justify-between"><span>Sem reforma</span><span className="text-zinc-200">{brl(a.purchasePrice + a.txCostBuy)}</span></div>
          </div>
        </div>
      </div>
    </Popup>
  );
}

function MarketValuePopup({ a, onClose, source }: { a: Analysis; onClose: () => void; source: "itbi" | "zap" | "qa" }) {
  const [comps, setComps] = useState<{
    tier1?: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; count: number };
    tier2?: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; count: number };
    zapListings?: { saleComparables: Array<{ bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null }> };
    qaListings?: { saleComparables: Array<{ bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null }> };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${a.prop.propertyId}/comparables?months=12`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setComps(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [a.prop.propertyId]);

  const usedTier1 = (comps?.tier1?.count || 0) > 0;
  const titles: Record<string, string> = {
    itbi: usedTier1 ? "Transacoes ITBI Reais (ultimos 12 meses)" : "Transacoes ITBI Reais (ultimos 18 meses)",
    zap: "Anuncios ZAP Imoveis",
    qa: "Anuncios QuintoAndar",
  };

  const itbiComps = comps ? (usedTier1 ? comps.tier1!.comparables : comps.tier2?.comparables || []) : [];
  const zapComps = comps?.zapListings?.saleComparables || [];
  const qaComps = comps?.qaListings?.saleComparables || [];

  return (
    <Popup onClose={onClose} title={titles[source]} width="w-[540px]">
      <div className="text-xs">
        {loading ? (
          <p className="text-zinc-500">Carregando comparaveis...</p>
        ) : source === "itbi" ? (
          itbiComps.length === 0 ? <p className="text-zinc-500">Sem transacoes ITBI</p> : (
            <>
              <p className="text-zinc-500 mb-2">{itbiComps.length} transacoes reais em POA</p>
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-1 pr-2">Endereco</th>
                    <th className="text-left py-1 pr-2">Tipo</th>
                    <th className="text-right py-1 pr-2">Valor</th>
                    <th className="text-right py-1 pr-2">Area</th>
                    <th className="text-right py-1">R$/m²</th>
                  </tr>
                </thead>
                <tbody>
                  {itbiComps.map((c, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="py-1 pr-2 text-zinc-300 max-w-[180px] truncate" title={`${c.logradouro}, ${c.nEndereco} — ${c.bairro} (${c.dataEstimativa?.slice(0, 10)})`}>
                        {c.logradouro}, {c.nEndereco} <span className="text-zinc-600">{c.dataEstimativa?.slice(0, 10)}</span>
                      </td>
                      <td className="py-1 pr-2 text-zinc-400 max-w-[80px] truncate">{c.finalidadeConstrucao || "—"}</td>
                      <td className="py-1 pr-2 text-right text-zinc-300">{brl(c.baseCalculo)}</td>
                      <td className="py-1 pr-2 text-right text-zinc-400">{c.areaConstrPrivativa}m²</td>
                      <td className="py-1 text-right text-zinc-300 font-medium">R$ {Math.round(c.precoM2).toLocaleString("pt-BR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {itbiComps.length > 0 && <p className="text-zinc-500 mt-2">{itbiComps.length} transacoes no mesmo bairro</p>}
            </>
          )
        ) : (
          (() => {
            const listings = source === "qa" ? qaComps : zapComps;
            const label = source === "qa" ? "QuintoAndar" : "ZAP";
            const hasPrecomputed = source === "qa" ? n(a.prop.qaMarketValue) > 0 : n(a.prop.zapMarketValue) > 0;
            return listings.length === 0 ? (
              hasPrecomputed ? (
                <div className="space-y-2">
                  <div className="bg-zinc-800 rounded p-2.5 space-y-1 text-xs text-zinc-400">
                    <div className="flex justify-between"><span>Valor estimado ({label})</span><span className="text-zinc-200 font-medium">{brl(source === "qa" ? n(a.prop.qaMarketValue) : n(a.prop.zapMarketValue))}</span></div>
                    <div className="flex justify-between"><span>Comparaveis usados</span><span className="text-zinc-200">{source === "qa" ? a.prop.qaComparablesCount : a.prop.zapComparablesCount}</span></div>
                    {source === "qa" && n(a.prop.qaRentValue) > 0 && (
                      <div className="flex justify-between"><span>Aluguel estimado</span><span className="text-green-400">{brl(n(a.prop.qaRentValue))}/mes</span></div>
                    )}
                    {source === "zap" && n(a.prop.zapMarketValuePerM2) > 0 && (
                      <div className="flex justify-between"><span>Preco/m²</span><span className="text-zinc-200">{brl(n(a.prop.zapMarketValuePerM2))}</span></div>
                    )}
                  </div>
                  <p className="text-zinc-500 text-[10px]">Valores calculados durante o pipeline. Listagens individuais indisponiveis para visualizacao (possivel diferenca de acentuacao no bairro).</p>
                </div>
              ) : <p className="text-zinc-500">Sem anuncios {label}</p>
            ) : (
              <>
                <p className="text-zinc-500 mb-2">{listings.length} anuncios {label}</p>
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-1 pr-2">Bairro</th>
                      <th className="text-left py-1 pr-2">Tipo</th>
                      <th className="text-right py-1 pr-2">Preco</th>
                      <th className="text-right py-1 pr-2">Area</th>
                      <th className="text-right py-1 pr-2">R$/m²</th>
                      <th className="text-right py-1">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.slice(0, 20).map((c, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-1 pr-2 text-zinc-300 max-w-[100px] truncate">{c.bairro || "—"}</td>
                        <td className="py-1 pr-2 text-zinc-400 max-w-[80px] truncate">{c.unitType || "—"}</td>
                        <td className="py-1 pr-2 text-right text-zinc-300">{brl(c.price)}</td>
                        <td className="py-1 pr-2 text-right text-zinc-400">{c.area > 0 ? `${Math.round(c.area)}m²` : "—"}</td>
                        <td className="py-1 pr-2 text-right text-zinc-300 font-medium">R$ {Math.round(c.pricePerM2).toLocaleString("pt-BR")}</td>
                        <td className="py-1 text-right">
                          {c.listingUrl ? <a href={c.listingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ver</a> : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            );
          })()
        )}
      </div>
    </Popup>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function InvestimentosPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"roi" | "roi_aval" | "rental" | "profit" | "profit_aval" | "price" | "risk">("roi");

  const handleRemove = useCallback((favoriteId: number, propertyId: number) => {
    fetch(`/api/favorites/${favoriteId}`, { method: "DELETE", credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao remover");
        setAnalyses((prev) => prev.filter((a) => a.prop.propertyId !== propertyId));
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    fetch("/api/investimentos", { credentials: "include" })
      .then((r) => {
        if (r.status === 403) throw new Error("Acesso restrito.");
        if (!r.ok) throw new Error("Erro ao carregar dados");
        return r.json();
      })
      .then((data: Property[]) => {
        const results = data.map(analyze);
        setAnalyses(results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...analyses].sort((a, b) => {
    switch (sortBy) {
      case "roi": return b.flipModerate.roi - a.flipModerate.roi;
      case "rental": return b.rentalYieldGross - a.rentalYieldGross;
      case "profit": return b.flipModerate.profit - a.flipModerate.profit;
      case "profit_aval": {
        const profitA = computeFlipScenarios(a, "light", a.appraisedValue).moderate.profit;
        const profitB = computeFlipScenarios(b, "light", b.appraisedValue).moderate.profit;
        return profitB - profitA;
      }
      case "roi_aval": {
        const roiA = computeFlipScenarios(a, "light", a.appraisedValue).moderate.roi;
        const roiB = computeFlipScenarios(b, "light", b.appraisedValue).moderate.roi;
        return roiB - roiA;
      }
      case "price": return a.purchasePrice - b.purchasePrice;
      case "risk": {
        const riskOrder: Record<string, number> = { "EXCELENTE": 0, "BOM": 1, "MODERADO": 2, "ARRISCADO": 3, "ALTO RISCO": 4 };
        return (riskOrder[a.riskRating] ?? 5) - (riskOrder[b.riskRating] ?? 5);
      }
      default: return 0;
    }
  });

  // Portfolio summary
  const totalCapital = analyses.reduce((s, a) => s + a.purchasePrice + a.renoLight + a.txCostBuy, 0);
  const totalProfit = analyses.reduce((s, a) => s + a.flipModerate.profit, 0);
  const avgRoi = analyses.length > 0 ? analyses.reduce((s, a) => s + a.flipModerate.roi, 0) / analyses.length : 0;
  const avgYield = analyses.length > 0 ? analyses.reduce((s, a) => s + a.rentalYieldGross, 0) / analyses.length : 0;
  const totalMonthlyRent = analyses.reduce((s, a) => s + a.monthlyRent, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavHeader />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold">Analise de Investimento</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {analyses.length} imoveis selecionados &middot; Dados de mercado: ZAP, QuintoAndar, ITBI POA &middot; CUB/RS Fev 2026
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-zinc-600 border-t-white rounded-full" />
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300 text-sm">{error}</div>
        )}

        {!loading && !error && analyses.length > 0 && (
          <>
            {/* Portfolio summary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Resumo do Portfolio</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <ValueBox label="Capital Necessario" value={brl(totalCapital)} sub="Compra + reforma leve + custos" color="text-white" />
                <ValueBox label="Lucro Total (flip)" value={brl(totalProfit)} sub="Cenario moderado" color={totalProfit > 0 ? "text-green-400" : "text-red-400"} />
                <ValueBox label="ROI Medio" value={pct(avgRoi)} sub="Cenario moderado" color={avgRoi > 30 ? "text-green-400" : "text-yellow-400"} />
                <ValueBox label="Yield Medio" value={pct(avgYield)} sub="Aluguel bruto anual" color={avgYield > 8 ? "text-green-400" : "text-yellow-400"} />
                <ValueBox label="Renda Mensal" value={brl(totalMonthlyRent)} sub={`${brl(totalMonthlyRent * 12)}/ano`} color="text-blue-400" />
              </div>
            </div>

            {/* Top picks */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Recomendacoes — Comprar Primeiro</h2>
              <div className="space-y-2">
                {[...analyses]
                  .sort((a, b) => {
                    // Weight: ROI 40%, data confidence 30%, risk 30%
                    const scoreA = a.flipModerate.roi * 0.4 + a.totalComparables * 0.3 + (100 - ["EXCELENTE","BOM","MODERADO","ARRISCADO","ALTO RISCO"].indexOf(a.riskRating) * 25) * 0.3;
                    const scoreB = b.flipModerate.roi * 0.4 + b.totalComparables * 0.3 + (100 - ["EXCELENTE","BOM","MODERADO","ARRISCADO","ALTO RISCO"].indexOf(b.riskRating) * 25) * 0.3;
                    return scoreB - scoreA;
                  })
                  .slice(0, 3)
                  .map((a, i) => {
                    const badge = getRiskBadge(a.riskRating);
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-green-900 text-green-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-white font-medium">
                          #{a.prop.propertyId} {a.prop.cidade} — {a.prop.bairro}
                        </span>
                        <span className="text-zinc-500">{a.prop.tipoImovel}</span>
                        <span className="text-emerald-400 font-semibold">{brl(a.purchasePrice)}</span>
                        <span className="text-green-400">ROI {pct(a.flipModerate.roi)}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${badge.bg} ${badge.text}`}>{a.riskRating}</span>
                        <span className="text-zinc-500 text-xs">({a.totalComparables} comps)</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Sort controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-zinc-500">Ordenar por:</span>
              {([
                ["roi", "Maior ROI"],
                ["roi_aval", "Maior ROI Caixa"],
                ["profit", "Maior Lucro"],
                ["profit_aval", "Maior Lucro Aval. Caixa"],
                ["rental", "Maior Yield"],
                ["price", "Menor Preco"],
                ["risk", "Menor Risco"],
              ] as [string, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as typeof sortBy)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    sortBy === key
                      ? "bg-zinc-700 text-white font-medium"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Property cards */}
            <div className="space-y-3">
              {sorted.map((a, i) => (
                <PropertyCard key={a.prop.propertyId} a={a} rank={i + 1} onRemove={handleRemove} />
              ))}
            </div>

            {/* Methodology note */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-500 space-y-1">
              <h4 className="font-semibold text-zinc-400">Metodologia</h4>
              <p><strong>Valor de mercado:</strong> Prioridade: ITBI (transacoes reais POA) &gt; ZAP Imoveis &gt; QuintoAndar &gt; Benchmark do bairro. Valores ITBI sao os mais confiaveis pois refletem precos reais pagos.</p>
              <p><strong>Reforma:</strong> Baseado no CUB/RS (Sinduscon-RS, Fev 2026). Leve: R$700/m², Media: R$1.200/m², Pesada: R$1.800/m². Pos-enchente 2024 pode haver premium de 10-15%.</p>
              <p><strong>Custos:</strong> ITBI 2% + escritura/registro ~2% na compra. Corretagem 5,5% na venda. IR sobre ganho de capital (15%) nao incluido (isento se reinvestir em 180 dias).</p>
              <p><strong>Prazos:</strong> Liquidez alta (POA, Canoas): 8-12 meses. Media (SL, NH, Sapucaia): 14-16 meses. Baixa (Charqueadas): 24+ meses. Inclui compra (2-3 meses) + reforma + venda.</p>
              <p><strong>Riscos nao modelados:</strong> Ocupacao do imovel (pode adicionar 6-24 meses de desocupacao judicial), estado real da construcao, dividas condominiais, IPTU atrasado.</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
