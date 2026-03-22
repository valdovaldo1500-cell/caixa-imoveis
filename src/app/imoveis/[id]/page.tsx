"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

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
}

interface PriceHistoryEntry {
  preco: string | null;
  desconto: string | null;
  recordedAt: string;
}

interface Comparable {
  id: number;
  baseCalculo: string | null;
  logradouro: string | null;
  bairro: string | null;
  areaConstrPrivativa: string | null;
  pricePerM2: number | null;
  dataEstimativa: string | null;
}

interface ComparablesResult {
  property: {
    id: number;
    cidade: string;
    bairro: string | null;
    areaPrivativaM2: string | null;
  };
  comparables: Comparable[];
  summary: {
    count: number;
    avgPricePerM2: number | null;
    medianPricePerM2: number | null;
    minPricePerM2: number | null;
    maxPricePerM2: number | null;
    estimatedMarketValue: number | null;
  };
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [history, setHistory] = useState<PriceHistoryEntry[]>([]);
  const [comparables, setComparables] = useState<ComparablesResult | null>(null);
  const [showComparables, setShowComparables] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

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

      // Fetch history and comparables in parallel
      const [histRes, compRes] = await Promise.all([
        fetch(`/api/properties/${id}/history`, { credentials: "include" }),
        fetch(`/api/properties/${id}/comparables`, { credentials: "include" }),
      ]);

      if (histRes.ok) {
        setHistory(await histRes.json());
      }
      if (compRes.ok) {
        setComparables(await compRes.json());
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
                <a
                  href={`https://maps.google.com/?q=${property.lat},${property.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs mt-1"
                >
                  Ver no Google Maps ↗
                </a>
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
                <span className="text-zinc-500">Primeira vez visto: </span>
                <span className="text-zinc-200">{formatDate(property.firstSeenAt)}</span>
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
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-400">Valor de Mercado (ITBI)</CardTitle>
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
                  {property.comparablesCount !== null && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Comparáveis</p>
                      <p className="font-semibold text-zinc-200">{property.comparablesCount} transações</p>
                    </div>
                  )}
                </div>

                {/* Comparables toggle */}
                {property.comparablesCount && property.comparablesCount > 0 && (
                  <div className="pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => setShowComparables((v) => !v)}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {showComparables
                        ? "Ocultar comparáveis"
                        : `Ver ${property.comparablesCount} comparável${property.comparablesCount !== 1 ? "is" : ""} →`}
                    </button>

                    {showComparables && comparables && (
                      <div className="mt-3 space-y-2">
                        {comparables.summary && (
                          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                            <span>Média R$/m²: <span className="text-zinc-200 font-mono">
                              {comparables.summary.avgPricePerM2
                                ? `R$ ${Math.round(comparables.summary.avgPricePerM2).toLocaleString("pt-BR")}`
                                : "—"}
                            </span></span>
                            <span>Mediana R$/m²: <span className="text-zinc-200 font-mono">
                              {comparables.summary.medianPricePerM2
                                ? `R$ ${Math.round(comparables.summary.medianPricePerM2).toLocaleString("pt-BR")}`
                                : "—"}
                            </span></span>
                          </div>
                        )}
                        <div className="space-y-1 max-h-64 overflow-y-auto">
                          {comparables.comparables.slice(0, 20).map((c, i) => (
                            <div
                              key={c.id || i}
                              className="flex justify-between text-xs text-zinc-400 py-1 border-b border-zinc-800/50"
                            >
                              <span className="flex-1 truncate pr-2">
                                {c.logradouro || c.bairro || "—"}
                                {c.areaConstrPrivativa
                                  ? ` · ${parseFloat(c.areaConstrPrivativa).toFixed(0)} m²`
                                  : ""}
                              </span>
                              <span className="font-mono text-zinc-300 shrink-0">
                                {c.baseCalculo ? formatBRL(c.baseCalculo) : "—"}
                                {c.pricePerM2
                                  ? ` · R$${Math.round(c.pricePerM2).toLocaleString("pt-BR")}/m²`
                                  : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
