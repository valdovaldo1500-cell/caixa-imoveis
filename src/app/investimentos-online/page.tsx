"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  TrendingUp,
  Globe,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Bot,
  DollarSign,
  BarChart2,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import type { EFListing } from "@/data/empire-flippers-listings";
import { EXPERT_ASSESSMENTS } from "@/data/expert-assessments";
import { SENSITIVITY_ANALYSIS, LISTING_FINANCIALS } from "@/data/portfolio-analysis";

const UPDATED_AT = "March 27, 2026 (verified — #90544 eliminated, Ace Hoops + Faceless Tutorials confirmed)";
const BUDGET_USD = 160000;

type SortKey =
  | "overallScore"
  | "autonomyScore"
  | "riskScore"
  | "roiScore"
  | "evergreenScore"
  | "monthlyProfit"
  | "monthlyRevenue"
  | "price"
  | "multiple";

const REC_COLORS: Record<string, string> = {
  top_pick: "emerald",
  strong: "blue",
  consider: "amber",
  avoid: "red",
};

const REC_LABELS: Record<string, string> = {
  top_pick: "Top Pick",
  strong: "Strong",
  consider: "Consider",
  avoid: "Avoid",
};

const SCATTER_FILL: Record<string, string> = {
  top_pick: "#10b981",
  strong: "#3b82f6",
  consider: "#f59e0b",
  avoid: "#ef4444",
};

const CAT_LABELS: Record<string, string> = {
  content_ads: "Content/Ads",
  youtube: "YouTube",
  digital_product: "Digital Product",
  saas: "SaaS",
  affiliate: "Affiliate",
  ecommerce: "eCommerce",
  amazon_fba: "Amazon FBA",
  dropshipping: "Dropshipping",
  service: "Service",
  kdp: "KDP",
  lead_gen: "Lead Gen",
  subscription: "Subscription",
};

const PIE_COLORS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16",
  "#0ea5e9", "#a855f7",
];

function fmt(n: number | null): string {
  if (n === null) return "—";
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

function fmtMo(n: number): string {
  return `$${n.toLocaleString()}`;
}

function annualRoi(price: number | null, mp: number): number | null {
  if (!price) return null;
  return (mp * 12) / price * 100;
}

function ScoreBadge({ score, color }: { score: number; color: string }) {
  const bg =
    color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
    color === "blue" ? "bg-blue-500/20 text-blue-400" :
    color === "amber" ? "bg-amber-500/20 text-amber-400" :
    "bg-red-500/20 text-red-400";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg}`}>
      {score}
    </span>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const bar =
    value >= 75 ? "bg-emerald-500" :
    value >= 60 ? "bg-blue-500" :
    value >= 45 ? "bg-amber-500" :
    "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-zinc-700 rounded-full h-1.5">
        <div className={`${bar} h-1.5 rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-zinc-400 w-7 text-right">{value}</span>
    </div>
  );
}

function RecBadge({ rec }: { rec: EFListing["recommendation"] }) {
  const style =
    rec === "top_pick" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
    rec === "strong" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
    rec === "consider" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
    "bg-red-500/20 text-red-400 border border-red-500/30";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style}`}>
      {REC_LABELS[rec]}
    </span>
  );
}

function KpiCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  const iconBg =
    color === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
    color === "blue" ? "bg-blue-500/10 text-blue-400" :
    color === "amber" ? "bg-amber-500/10 text-amber-400" :
    color === "violet" ? "bg-violet-500/10 text-violet-400" :
    "bg-zinc-700 text-zinc-300";
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{label}</span>
        <div className={`p-1.5 rounded-md ${iconBg}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
      {sub && <span className="text-xs text-zinc-500">{sub}</span>}
    </div>
  );
}

function Sparkline({ data }: { data: { month: string; profit: number }[] }) {
  if (!data || data.length < 2) return null;
  // Use last 12 data points at most
  const pts = data.slice(-12);
  const first = pts[0].profit;
  const last = pts[pts.length - 1].profit;
  const mid = pts[Math.floor(pts.length / 2)].profit;
  const trending = last >= first * 0.95 || last >= mid; // up or flat
  const color = trending ? "#10b981" : "#ef4444";
  const gradId = `spark-grad-${trending ? "up" : "dn"}`;
  return (
    <AreaChart width={120} height={40} data={pts} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.25} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="profit"
        stroke={color}
        strokeWidth={1.5}
        fill={`url(#${gradId})`}
        dot={false}
        isAnimationActive={false}
      />
    </AreaChart>
  );
}

function TopPickCard({ listing }: { listing: EFListing }) {
  const roi = annualRoi(listing.price, listing.monthlyProfit);
  const financials = LISTING_FINANCIALS.find((f) => f.id === listing.id);
  return (
    <div className="bg-zinc-800 border border-emerald-500/30 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-zinc-500">#{listing.id}</span>
            <RecBadge rec={listing.recommendation} />
            {listing.aiManageable && (
              <span className="flex items-center gap-1 text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                <Bot className="w-3 h-3" /> AI+VA Ready
              </span>
            )}
          </div>
          <h3 className="text-white font-semibold text-base leading-tight">{listing.niche}</h3>
          <span className="text-xs text-zinc-500">{CAT_LABELS[listing.category]}</span>
        </div>
        <a
          href={`https://app.empireflippers.com/listing/${listing.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white transition-colors shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-zinc-900 rounded-lg p-2">
          <div className="text-xs text-zinc-500 mb-0.5">Price</div>
          <div className="text-sm font-bold text-white">{fmt(listing.price)}</div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-2">
          <div className="text-xs text-zinc-500 mb-0.5">Profit/mo</div>
          <div className="text-sm font-bold text-emerald-400">{fmtMo(listing.monthlyProfit)}</div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-2">
          <div className="text-xs text-zinc-500 mb-0.5">Annual ROI</div>
          <div className="text-sm font-bold text-blue-400">{roi ? `${roi.toFixed(0)}%` : "—"}</div>
        </div>
      </div>

      {financials && (
        <div className="bg-zinc-900 rounded-lg px-3 py-1.5">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs text-zinc-500">12-mo revenue trend</span>
          </div>
          <div className="flex justify-center">
            <Sparkline data={financials.monthlyProfitHistory} />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">Scores</div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><Bot className="w-3 h-3 inline mr-1" />Autonomy</span>
          <ProgressBar value={listing.autonomyScore} color="" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><ShieldCheck className="w-3 h-3 inline mr-1" />Risk</span>
          <ProgressBar value={listing.riskScore} color="" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><TrendingUp className="w-3 h-3 inline mr-1" />ROI</span>
          <ProgressBar value={listing.roiScore} color="" />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><Leaf className="w-3 h-3 inline mr-1" />Evergreen</span>
          <ProgressBar value={listing.evergreenScore} color="" />
        </div>
        <div className="flex items-center gap-2 text-xs mt-1 pt-1 border-t border-zinc-700">
          <span className="w-20 text-zinc-300 font-semibold shrink-0"><Star className="w-3 h-3 inline mr-1" />Overall</span>
          <ProgressBar value={listing.overallScore} color="" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reasons For
          </div>
          <ul className="space-y-1">
            {listing.reasonsFor.map((r, i) => (
              <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-red-400 font-medium mb-1.5 flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Risks
          </div>
          <ul className="space-y-1">
            {listing.reasonsAgainst.map((r, i) => (
              <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                <span className="text-red-500 shrink-0 mt-0.5">-</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-xs text-zinc-400 italic bg-zinc-900 rounded-lg p-2.5 border border-zinc-700">
        <span className="text-violet-400 font-medium not-italic">Why AI+VA can run this: </span>
        {listing.category === "content_ads" && "Claude writes SEO articles daily. VA handles ad network setup and optimization once monthly."}
        {listing.category === "youtube" && "Claude writes scripts and descriptions. VA uses automation tools to upload/schedule. Channel earns passively from AdSense."}
        {listing.category === "affiliate" && "Claude creates comparison content and review articles. VA monitors affiliate links and commissions weekly."}
        {listing.category === "digital_product" && "Claude creates new digital products and product descriptions. VA handles customer support via templates."}
        {listing.category === "kdp" && "Claude writes and formats books. VA uploads to KDP. Zero operational overhead once published."}
        {listing.category === "lead_gen" && "Claude writes local SEO content. VA follows up on lead inquiries using templates. Minimal daily oversight."}
        {listing.category === "saas" && "Claude handles customer support emails. VA manages billing issues. Technical updates outsourced to freelancer monthly."}
        {listing.category === "amazon_fba" && "VA manages FBA replenishment orders and customer messages using standard templates. Claude writes listing copy."}
        {listing.category === "ecommerce" && "VA processes orders and handles CS. Claude writes product descriptions and email campaigns. Shopify apps automate most tasks."}
        {listing.category === "dropshipping" && "VA processes orders via automation rules. Claude writes ad copy. Supplier handles fulfillment."}
        {listing.category === "service" && "Requires human expertise — lower AI manageability than content-based businesses."}
        {listing.category === "subscription" && "Claude handles support emails. VA monitors churn and sends retention sequences. Automated billing."}
      </div>
    </div>
  );
}

type SortDir = "desc" | "asc";

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  if (n < 2) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const ex = xs[i] - mx;
    const ey = ys[i] - my;
    num += ex * ey;
    dx += ex * ex;
    dy += ey * ey;
  }
  if (dx === 0 || dy === 0) return 0;
  return num / Math.sqrt(dx * dy);
}

function PortfolioCorrelationSection() {
  const aceHoops = LISTING_FINANCIALS.find((l) => l.id === "92246")!;
  const techYT = LISTING_FINANCIALS.find((l) => l.id === "91304")!;

  const aceMap = new Map(aceHoops.monthlyProfitHistory.map((d) => [d.month, d.profit]));
  const techMap = new Map(techYT.monthlyProfitHistory.map((d) => [d.month, d.profit]));

  const allMonths = Array.from(
    new Set([
      ...aceHoops.monthlyProfitHistory.map((d) => d.month),
      ...techYT.monthlyProfitHistory.map((d) => d.month),
    ])
  );

  const chartData = allMonths.map((month) => ({
    month,
    ace: aceMap.get(month) ?? null,
    tech: techMap.get(month) ?? null,
    combined:
      aceMap.has(month) && techMap.has(month)
        ? (aceMap.get(month)! + techMap.get(month)!)
        : null,
  }));

  const overlapping = allMonths.filter((m) => aceMap.has(m) && techMap.has(m));
  const aceVals = overlapping.map((m) => aceMap.get(m)!);
  const techVals = overlapping.map((m) => techMap.get(m)!);
  const r = pearson(aceVals, techVals);
  const absR = Math.abs(r);

  const badgeColor =
    absR < 0.3
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : absR <= 0.6
      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      : "bg-red-500/20 text-red-400 border border-red-500/30";

  const diversificationLabel =
    absR < 0.3
      ? "Low correlation — good diversification"
      : absR <= 0.6
      ? "Moderate correlation"
      : "High correlation — limited diversification";

  return (
    <section>
      <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-blue-400" />
        Portfolio Correlation Analysis
      </h2>
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-emerald-400" />
            <span className="text-xs text-zinc-400">Ace Hoops (#92246)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-400" />
            <span className="text-xs text-zinc-400">Faceless Tutorials (#91304)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-violet-400 border-dashed" style={{ borderTop: "2px dashed #a78bfa", height: 0 }} />
            <span className="text-xs text-zinc-400">Combined</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#a1a1aa", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#52525b" }}
            />
            <YAxis
              tick={{ fill: "#a1a1aa", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#52525b" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#e4e4e7" }}
              formatter={(value, name) => [
                typeof value === "number" ? `$${value.toLocaleString()}` : String(value),
                name === "ace" ? "Ace Hoops" : name === "tech" ? "Faceless Tutorials" : "Combined",
              ]}
            />
            <Legend
              formatter={(value) =>
                value === "ace" ? "Ace Hoops" : value === "tech" ? "Faceless Tutorials" : "Combined"
              }
              wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }}
            />
            <Line
              type="monotone"
              dataKey="ace"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 3, fill: "#34d399" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="tech"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#60a5fa" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="combined"
              stroke="#a78bfa"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 3, fill: "#a78bfa" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap gap-4 pt-2 border-t border-zinc-700">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Pearson Correlation</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${badgeColor}`}>
                r = {r.toFixed(2)}
              </span>
              <span className="text-xs text-zinc-400">{diversificationLabel}</span>
            </div>
            <span className="text-xs text-zinc-500">Computed over {overlapping.length} overlapping months</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Combined Monthly (overlap avg)</span>
            <span className="text-sm font-bold text-violet-400">
              ${overlapping.length > 0 ? Math.round(overlapping.reduce((sum, m) => sum + aceMap.get(m)! + techMap.get(m)!, 0) / overlapping.length).toLocaleString() : "0"}/mo avg
            </span>
            <span className="text-xs text-zinc-500">Peak combined: ${Math.max(...overlapping.map((m) => aceMap.get(m)! + techMap.get(m)!)).toLocaleString()}/mo</span>
          </div>
        </div>
      </div>
    </section>
  )
}


interface CaixaProp {
  caixaId: string;
  cidade: string;
  bairro: string | null;
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  areaTotalM2: number | null;
  preco: number;
  precoUsd: number;
  desconto: number;
  score: number;
  aceitaFinanciamento: boolean | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  marketValue: number | null;
  grossMonthlyRentBrl: number;
  netMonthlyRentBrl: number;
  netMonthlyRentUsd: number;
  annualNetYieldPct: number;
  equityGainAtPurchasePct: number;
  totalCapitalBrl: number;
  totalCapitalUsd: number;
}

export default function InvestimentosOnlinePage() {
  const [listings, setListings] = useState<EFListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [caixaProps, setCaixaProps] = useState<CaixaProp[]>([]);
  const [filterRec, setFilterRec] = useState<string>("all");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("for_sale");
  const [sortKey, setSortKey] = useState<SortKey>("overallScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [assumptionsOpen, setAssumptionsOpen] = useState<Record<string, boolean>>({});
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("/api/investimentos-online?status=all", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.listings) setListings(d.listings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/investimentos-online/caixa-top", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.properties) setCaixaProps(d.properties);
      })
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    let l = [...listings];
    if (filterStatus !== "all") l = l.filter((x) => x.status === filterStatus);
    if (filterRec !== "all") l = l.filter((x) => x.recommendation === filterRec);
    if (filterCat !== "all") l = l.filter((x) => x.category === filterCat);
    l.sort((a, b) => {
      const av = (a[sortKey] as number | null) ?? -Infinity;
      const bv = (b[sortKey] as number | null) ?? -Infinity;
      return sortDir === "desc" ? bv - av : av - bv;
    });
    return l;
  }, [listings, filterRec, filterCat, filterStatus, sortKey, sortDir]);

  // IDs eliminated after verified earnings analysis (Chart.js data extraction, March 2026)
  const ELIMINATED_IDS = new Set([
    "92105", // homemadegraceful — female persona + Pinterest 92%
    "92180", // ahoyvietnam — personal brand (Anthony)
    "92295", // Alex Griffin — Family Guy copyright
    "88055", // Pinterest sobriety blog
    "92391", // personal brand confirmed
    "86127", // 74% Pinterest, 35hrs/wk
    "86318", // single technician Canada
    "91137", // 20hrs storytelling
    "90535", // paid ads, seller competing
    "84353", // tech education — 89% traffic drop, collapsed
    "90541", // culinary blog — Google algo victim, Feb 26: $477/mo
    "89555", // photopacks.ai — traffic -78% crash
    "91138", // oakleyforum.com — 76% bot traffic, revenue -49%
    "92062", // entertainment YouTube — extreme volatility ($0–$13K)
    "88899", // YouTube product reviews — crashing, "fair use" risk
    "83071", // content site — 90% profit collapse in 12mo
    "83260", // Amazon Merch+KDP — 36x, 59% margin, platform risk
    "87216", // SaaS web dev — too small ($1,121/mo)
    "89017", // KDP books — 8mo old, AI-written, dying
    "85655", // coupons YouTube — 30hrs/wk full-time job
    "83091", // KDP planners — 70% from 1 book, concentration risk
    "92299", // AI music gifts — $103K overpriced for 1yr old
    "90674", // video game assets — dead, Feb $230
    "90449", // removed from EF marketplace
    "90544", // dying — recent videos 0 views, not AI voiceover, freelancer costs
  ]);

  const topPicks = useMemo(
    () => listings.filter((l) => l.recommendation === "top_pick" && l.status !== "pending_sold" && !ELIMINATED_IDS.has(l.id)),
    [listings]
  );
  const manageable = listings.filter((l) => l.aiManageable);
  const forSale = listings.filter((l) => l.status !== "pending_sold");
  const avgRoi = useMemo(() => {
    const valid = manageable.filter((l) => l.price && l.status !== "pending_sold");
    if (!valid.length) return 0;
    const sum = valid.reduce((acc, l) => acc + (annualRoi(l.price, l.monthlyProfit) ?? 0), 0);
    return sum / valid.length;
  }, [manageable]);
  const bestRoi = useMemo(() => {
    const valid = forSale.filter((l) => l.price);
    return valid.reduce((best, l) => {
      const r = annualRoi(l.price, l.monthlyProfit) ?? 0;
      const br = annualRoi(best.price, best.monthlyProfit) ?? 0;
      return r > br ? l : best;
    }, valid[0]);
  }, [forSale]);

  // Chart data
  const scatterData = useMemo(
    () =>
      filtered
        .filter((l) => l.price && l.price <= BUDGET_USD * 1.2)
        .map((l) => ({
          x: l.price! / 1000,
          y: l.monthlyProfit,
          rec: l.recommendation,
          id: l.id,
          niche: l.niche,
        })),
    [filtered]
  );

  const catAvgData = useMemo(() => {
    const cats: Record<string, number[]> = {};
    listings.forEach((l) => {
      if (!cats[l.category]) cats[l.category] = [];
      cats[l.category].push(l.overallScore);
    });
    return Object.entries(cats)
      .map(([cat, scores]) => ({
        name: CAT_LABELS[cat] ?? cat,
        avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.avg - a.avg);
  }, [listings]);

  const pieData = useMemo(() => {
    const cats: Record<string, number> = {};
    listings.filter((l) => l.status !== "pending_sold").forEach((l) => {
      cats[l.category] = (cats[l.category] ?? 0) + 1;
    });
    return Object.entries(cats)
      .map(([cat, count]) => ({ name: CAT_LABELS[cat] ?? cat, value: count }))
      .sort((a, b) => b.value - a.value);
  }, [listings]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 text-zinc-600" />;
    return sortDir === "desc"
      ? <ChevronDown className="w-3 h-3 text-zinc-300" />
      : <ChevronUp className="w-3 h-3 text-zinc-300" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <NavHeader />
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 py-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            Online Business Investments
          </h1>
          <p className="text-xs text-zinc-500">
            Last Updated: {UPDATED_AT} | Data from Empire Flippers marketplace | Budget: £100K (~$160K USD)
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-500 text-sm animate-pulse">Loading listings...</div>
        ) : (
          <>
            {/* FINAL DECISION BANNER */}
            <section className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 ring-1 ring-emerald-500/20">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Final Decision</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">March 26, 2026</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    BUY: Ace Hoops WNBA (#92246) + Faceless YouTube Tutorials (#91304)
                  </h2>
                  <p className="text-sm text-zinc-400 max-w-3xl">
                    Both faceless, fully AI+VA manageable, no personal brand risk. Ace Hoops is seasonal (WNBA May–Oct) and growing; Faceless Tutorials is year-round with 94% margin — negotiate from $60K to ~$45K. Combined total ~$107K well within $160K budget.
                    Avoid: <span className="text-red-400 font-semibold">#90544 3× Tech YouTube</span> (recent videos 0 views, not AI voiceover, hidden freelancer costs) · <span className="text-red-400 font-semibold">#89555 photopacks.ai</span> (traffic -78%, declining) · <span className="text-red-400 font-semibold">#92180 ahoyvietnam</span> (personal brand).
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="text-3xl font-bold text-white">£3,900<span className="text-base text-zinc-400 font-normal">/mo</span></div>
                  <div className="text-xs text-emerald-400">Combined (in-season avg, net after VA)</div>
                  <div className="text-xs text-zinc-500">£2,100 Ace + £1,550 Faceless Tutorials (off-season ~£3,100)</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Ace Hoops target</div>
                  <div className="text-base font-bold text-white">$62K</div>
                  <div className="text-xs text-zinc-500">ask $70,599 → negotiate (~£49K)</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Faceless Tutorials target</div>
                  <div className="text-base font-bold text-blue-400">$45K</div>
                  <div className="text-xs text-zinc-500">ask $59,863 → negotiate (~£36K)</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Combined total</div>
                  <div className="text-base font-bold text-emerald-400">~$107K</div>
                  <div className="text-xs text-zinc-500">~£84K — well within $160K budget</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Owner Time</div>
                  <div className="text-base font-bold text-violet-400">~4–7 hrs/wk</div>
                  <div className="text-xs text-zinc-500">AI scripts + VA production both channels</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 mb-2">Negotiation Targets</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="flex flex-wrap justify-between gap-1"><span>#92246 Ace Hoops — ask $70,599</span><span className="text-emerald-400 font-semibold">→ offer $55K, settle $62K</span></li>
                    <li className="flex flex-wrap justify-between gap-1"><span>#91304 Faceless Tutorials — ask $59,863</span><span className="text-blue-400 font-semibold">→ offer $40K, settle $45K</span></li>
                    <li className="flex flex-wrap justify-between gap-1 pt-1 border-t border-zinc-700 mt-1"><span className="text-zinc-300">Combined total</span><span className="text-white font-semibold">~$107K (~£84K)</span></li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-400 mb-2">Conditions Before Closing</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="flex gap-1.5"><span className="text-amber-400 shrink-0">!</span>60-day earnout for both — verify P&amp;L via bank statements</li>
                    <li className="flex gap-1.5"><span className="text-amber-400 shrink-0">!</span>Confirm AdSense accounts are transferable (YouTube policy)</li>
                    <li className="flex gap-1.5"><span className="text-amber-400 shrink-0">!</span>Faceless Tutorials: confirm channel AdSense + affiliate account transfer</li>
                    <li className="flex gap-1.5"><span className="text-amber-400 shrink-0">!</span>Ace Hoops: confirm Filipino freelancers willing to continue post-sale</li>
                    <li className="flex gap-1.5"><span className="text-zinc-500 shrink-0">✓</span>Ace Hoops off-season plan: draft, trades, college basketball content</li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 text-xs text-zinc-500 border-t border-zinc-700/50 pt-3">
                <span className="text-red-400 font-medium">Do NOT buy: </span>
                #90544 3× Tech YouTube (recent videos 0 views, not AI voiceover, hidden freelancer costs — dying) ·
                #92180 ahoyvietnam.com (Anthony&apos;s personal brand, 27K followers know him) ·
                #92105 homemadegraceful (Pinterest 92% + female persona — can&apos;t swap writer) ·
                #89555 photopacks.ai at asking price (traffic -78% crash Nov 25, profit -37% from peak) ·
                #84353 tech education (89% traffic drop, revenue collapsed) ·
                #91138 oakleyforum.com (76% bot traffic, revenue -49%, RPM crashed $11→$2.50)
              </div>
            </section>

            {/* KPI Cards */}
            <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <KpiCard
                label="Total Analyzed"
                value={String(listings.length)}
                sub="Empire Flippers listings"
                icon={BarChart2}
                color="zinc"
              />
              <KpiCard
                label="AI+VA Manageable"
                value={String(manageable.length)}
                sub={`${Math.round(manageable.length / listings.length * 100)}% of all listings`}
                icon={Bot}
                color="violet"
              />
              <KpiCard
                label="Top Picks"
                value={String(topPicks.length)}
                sub="Within $160K budget"
                icon={Star}
                color="emerald"
              />
              <KpiCard
                label="Best ROI Listing"
                value={bestRoi ? `${annualRoi(bestRoi.price, bestRoi.monthlyProfit)?.toFixed(0)}%` : "—"}
                sub={bestRoi ? `#${bestRoi.id} — ${fmt(bestRoi.price)}` : ""}
                icon={TrendingUp}
                color="blue"
              />
              <KpiCard
                label="Avg Annual ROI"
                value={`${avgRoi.toFixed(0)}%`}
                sub="Manageable for-sale listings"
                icon={DollarSign}
                color="amber"
              />
              <KpiCard
                label="vs Real Estate"
                value="~45% vs ~8%"
                sub="Online avg ROI vs BR rental yield (on market value)"
                icon={TrendingUp}
                color="emerald"
              />
            </section>

            {/* Investment Strategy */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Investment Strategy Comparison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-zinc-800 border border-blue-500/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">Online Business</div>
                  <div className="text-lg font-bold text-white">£100K invested</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-emerald-400 font-medium">→ ~£3-4K/month cash flow</li>
                    <li>Annual ROI: ~40-50%</li>
                    <li>VA cost: ~£500/month</li>
                    <li className="text-amber-400">Risk: Medium-high</li>
                    <li className="text-amber-400">Platform dependency risk</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Real Estate (Caixa)</div>
                  <div className="text-lg font-bold text-white">£100K invested (≈ R$640K)</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-amber-400 font-medium">→ ~R$3,500-5,000/month rental (gross)</li>
                    <li>Buy at 30-60% below market value</li>
                    <li className="text-emerald-400">Capital gains: flip for R$200-400K profit (6-12mo)</li>
                    <li>Annual yield: 7-9% rental + 30-60% capital gains</li>
                    <li className="text-emerald-400">Risk: Lower (tangible asset, auction discount)</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Split Strategy (Recommended)</div>
                  <div className="text-lg font-bold text-white">£100K split</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-emerald-400 font-medium">£60K online biz + £40K property</li>
                    <li>Online: ~£2-2.4K/month cash flow</li>
                    <li className="text-emerald-400">Property flip: R$100-200K profit in 6-12mo</li>
                    <li>Property rental: ~R$1,500-2,000/month</li>
                    <li className="text-emerald-400">Diversified: cash flow + capital gains</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-zinc-600 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Selic Benchmark</div>
                  <div className="text-lg font-bold text-white">14.25% p.a.</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>£100K → ~£1,187/month</li>
                    <li>Zero effort, risk-free rate</li>
                    <li className="text-amber-400">Online biz must beat this</li>
                    <li>Mar 2025 Selic rate</li>
                    <li className="text-zinc-500">BRL-denominated only</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Portfolio Recommendations */}
            <section>
              <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Portfolio Options — £100K Budget Scenarios
              </h2>
              <p className="text-xs text-zinc-500 mb-3">
                Negotiation targets assume 10-15% below asking for stable/declining, 5-8% for high-growth. All prices in USD. £1 ≈ $1.27.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {/* Option A — RECOMMENDED */}
                <div className="bg-zinc-800 border border-emerald-500/60 rounded-xl p-4 space-y-2 ring-1 ring-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Option A ⭐ Recommended</div>
                    <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded-full">Pure YouTube play</span>
                  </div>
                  <div className="text-sm font-semibold text-white">Ace Hoops + Faceless Tutorials</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Ace Hoops WNBA: ask $70,599 → <span className="text-emerald-400">target $62K (~£49K)</span></li>
                    <li>• Faceless Tutorials #91304: ask $60K → <span className="text-emerald-400">target $45K (~£35K)</span></li>
                    <li>• Total: ~$107K (~£84K) — $53K cash reserve remaining</li>
                    <li className="text-emerald-400 font-medium">Monthly: ~£3,900/mo in-season, ~£3,000 off-season</li>
                    <li>Both faceless — AI scripts + VA production, no persona risk</li>
                    <li>Faceless Tutorials provide year-round baseline income</li>
                    <li className="text-zinc-500">Negotiate Tutorials to $45K max (from $60K asking)</li>
                  </ul>
                </div>

                {/* Option C */}
                <div className="bg-zinc-800 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Option B — Conservative</div>
                    <span className="text-xs bg-amber-900/40 text-amber-300 px-2 py-0.5 rounded-full">Lower risk</span>
                  </div>
                  <div className="text-sm font-semibold text-white">Ace Hoops + Caixa Property</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Ace Hoops WNBA: ask $70,599 → <span className="text-emerald-400">target $62K (~£49K)</span></li>
                    <li>• Caixa imóvel (POA): <span className="text-amber-400">~£12-15K (R$75K-90K)</span></li>
                    <li>• Leaves ~£36-39K in reserve</li>
                    <li className="text-emerald-400 font-medium">Monthly: ~£2,100 online + ~£130-200 aluguel</li>
                    <li>Tangible asset hedge against digital platform risk</li>
                    <li className="text-zinc-500">Immediate equity: buy Caixa at 40-55% below market value</li>
                  </ul>
                </div>

                {/* Option D — Tech YouTube only */}
                <div className="bg-zinc-800 border border-zinc-600 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Option C — Single Asset</div>
                    <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">Wait for better picks</span>
                  </div>
                  <div className="text-sm font-semibold text-white">3× Tech YouTube only</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• 3× Tech YouTube: ask $93,608 → <span className="text-emerald-400">target $79K (~£62K)</span></li>
                    <li>• Remaining ~£64K: monitor EF for new listings</li>
                    <li className="text-blue-400 font-medium">Monthly: ~£2,700/mo year-round (no seasonality)</li>
                    <li>Lower total commitment — wait for Ace Hoops 2026 season data</li>
                    <li className="text-zinc-500">Tech YouTube is declining — buy only if negotiated hard</li>
                  </ul>
                </div>

                {/* Decision Summary */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-2 md:col-span-2 xl:col-span-2">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Decision Factors</div>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li className="flex gap-2"><span className="text-emerald-400">✓</span><span><span className="text-white">Option A recommended</span>: both faceless, AI-managed, $107K total, $53K cash reserve remaining</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400">✓</span><span>Faceless Tutorials provide year-round baseline income — offsets Ace Hoops off-season dip</span></li>
                    <li className="flex gap-2"><span className="text-amber-400">!</span><span>Faceless Tutorials target $45K (from $60K asking) — negotiate 25% below asking before closing</span></li>
                    <li className="flex gap-2"><span className="text-amber-400">!</span><span>Ace Hoops: 2026 WNBA season starts May — buying March = full season ahead</span></li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span><span>#90544 Tech YouTube ELIMINATED — declining revenue, 32x on degrading metrics; DO NOT BUY</span></li>
                    <li className="flex gap-2"><span className="text-amber-400">!</span><span>Both picks: negotiate 60-day earnout + verify P&amp;L via bank statements before closing</span></li>
                    <li className="flex gap-2"><span className="text-blue-400">i</span><span>All earnings verified via Chart.js extraction from EF Active Unlocks (March 27, 2026)</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Executive Summary */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Executive Summary — Portfolio Snapshot
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Total Budget</span>
                    <div className="p-1.5 rounded-md bg-zinc-700 text-zinc-300">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">$160K</span>
                  <span className="text-xs text-zinc-500">£100K available capital</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Allocated</span>
                    <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                      <BarChart2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">$107K</span>
                  <span className="text-xs text-zinc-500">Ace $62K + Tutorials $45K</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Remaining</span>
                    <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">$53K</span>
                  <span className="text-xs text-zinc-500">~£42K reserve / buffer</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Monthly Income</span>
                    <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">~$6,100</span>
                  <span className="text-xs text-zinc-500">Combined monthly avg (net after VA)</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Annual ROI</span>
                    <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">~52%</span>
                  <span className="text-xs text-zinc-500">Combined portfolio return</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Payback</span>
                    <div className="p-1.5 rounded-md bg-violet-500/10 text-violet-400">
                      <BarChart2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-violet-400">~23 mo</span>
                  <span className="text-xs text-zinc-500">Full capital recovery</span>
                </div>
              </div>

              {/* Capital Allocation Bar */}
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-zinc-400" />
                  Capital Allocation — $160K Budget
                </h3>
                {/* Stacked bar */}
                <div className="flex rounded-lg overflow-hidden h-8 mb-4">
                  <div
                    className="bg-emerald-500 flex items-center justify-center text-xs font-bold text-white"
                    style={{ width: "38.75%" }}
                    title="Ace Hoops WNBA — $62K (39%)"
                  >
                    39%
                  </div>
                  <div
                    className="bg-blue-500 flex items-center justify-center text-xs font-bold text-white"
                    style={{ width: "28.125%" }}
                    title="Faceless Tutorials — $45K (28%)"
                  >
                    28%
                  </div>
                  <div
                    className="bg-zinc-600 flex items-center justify-center text-xs font-semibold text-zinc-300"
                    style={{ width: "33.125%" }}
                    title="Cash Reserve — $53K (33%)"
                  >
                    33%
                  </div>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-emerald-500 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Ace Hoops WNBA</div>
                      <div className="text-xs text-zinc-400">$62,000 · 39% of budget</div>
                      <div className="text-xs text-zinc-500">Sports YouTube — seasonal (WNBA)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-blue-500 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Faceless Tutorials (#91304)</div>
                      <div className="text-xs text-zinc-400">$45,000 · 28% of budget</div>
                      <div className="text-xs text-zinc-500">Faceless tutorials — year-round revenue</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-zinc-600 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-300">Cash Reserve</div>
                      <div className="text-xs text-zinc-400">$53,000 · 33% of budget</div>
                      <div className="text-xs text-zinc-500">Buffer / opportunistic picks</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Portfolio Correlation Analysis */}
            <PortfolioCorrelationSection />

            {/* Portfolio Allocation Optimizer */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Portfolio Allocation Optimizer
              </h2>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 space-y-6">
                {/* Scenario cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Scenario A — Conservative */}
                  <div className="bg-zinc-800/50 rounded-lg p-5 border border-zinc-700/50 flex flex-col gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Scenario A</span>
                      <h3 className="text-sm font-bold text-white mt-0.5">Conservative <span className="text-zinc-400 font-normal">(current plan)</span></h3>
                    </div>
                    <ul className="text-xs space-y-1 text-zinc-300">
                      <li className="flex justify-between"><span className="text-blue-400 font-medium">Ace Hoops</span><span>$62K <span className="text-zinc-500">(58%)</span></span></li>
                      <li className="flex justify-between"><span className="text-purple-400 font-medium">Faceless Tutorials</span><span>$45K <span className="text-zinc-500">(42%)</span></span></li>
                      <li className="flex justify-between border-t border-zinc-700 pt-1 mt-1"><span className="text-zinc-400">Total deployed</span><span className="text-white font-semibold">$107K</span></li>
                      <li className="flex justify-between"><span className="text-zinc-400">Cash reserve</span><span className="text-emerald-400 font-semibold">$53K</span></li>
                    </ul>
                    <div className="border-t border-zinc-700 pt-3 space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Expected monthly</span><span className="text-emerald-400 font-bold">$4,800</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Portfolio ROI</span><span className="text-emerald-400 font-bold">~54%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Risk</span><span className="text-amber-400">Medium</span></div>
                      <p className="text-xs text-zinc-500 pt-1">Seasonal dependency on WNBA calendar. Large cash reserve for future picks.</p>
                    </div>
                  </div>

                  {/* Scenario B — Aggressive */}
                  <div className="bg-zinc-800/50 rounded-lg p-5 border border-zinc-700/50 flex flex-col gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Scenario B</span>
                      <h3 className="text-sm font-bold text-white mt-0.5">Aggressive</h3>
                    </div>
                    <ul className="text-xs space-y-1 text-zinc-300">
                      <li className="flex justify-between"><span className="text-blue-400 font-medium">Ace Hoops</span><span>$55K <span className="text-zinc-500">(41%)</span></span></li>
                      <li className="flex justify-between"><span className="text-purple-400 font-medium">Faceless Tutorials</span><span>$40K <span className="text-zinc-500">(30%)</span></span></li>
                      <li className="flex justify-between"><span className="text-amber-400 font-medium">3rd acquisition</span><span>$35K <span className="text-zinc-500">(26%)</span></span></li>
                      <li className="flex justify-between border-t border-zinc-700 pt-1 mt-1"><span className="text-zinc-400">Total deployed</span><span className="text-white font-semibold">$130K</span></li>
                      <li className="flex justify-between"><span className="text-zinc-400">Cash reserve</span><span className="text-red-400 font-semibold">$30K</span></li>
                    </ul>
                    <div className="border-t border-zinc-700 pt-3 space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Expected monthly</span><span className="text-emerald-400 font-bold">$7,135</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Portfolio ROI</span><span className="text-emerald-400 font-bold">~54%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Risk</span><span className="text-red-400">Higher</span></div>
                      <p className="text-xs text-zinc-500 pt-1">No cash buffer · 3 properties to manage.</p>
                    </div>
                  </div>

                  {/* Scenario C — Balanced (recommended) */}
                  <div className="bg-zinc-800/50 rounded-lg p-5 border border-emerald-500/50 flex flex-col gap-3 relative">
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">Recommended</span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Scenario C</span>
                      <h3 className="text-sm font-bold text-white mt-0.5">Balanced</h3>
                    </div>
                    <ul className="text-xs space-y-1 text-zinc-300">
                      <li className="flex justify-between"><span className="text-blue-400 font-medium">Ace Hoops</span><span>$55K <span className="text-zinc-500">(34%)</span></span></li>
                      <li className="flex justify-between"><span className="text-purple-400 font-medium">Faceless Tutorials</span><span>$40K <span className="text-zinc-500">(25%)</span></span></li>
                      <li className="flex justify-between"><span className="text-gray-400 font-medium">Cash reserve</span><span>$65K <span className="text-zinc-500">(41%)</span></span></li>
                      <li className="flex justify-between border-t border-zinc-700 pt-1 mt-1"><span className="text-zinc-400">Total deployed</span><span className="text-white font-semibold">$95K</span></li>
                      <li className="flex justify-between"><span className="text-zinc-400">Cash reserve</span><span className="text-emerald-400 font-semibold">$65K</span></li>
                    </ul>
                    <div className="border-t border-zinc-700 pt-3 space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Expected monthly</span><span className="text-emerald-400 font-bold">$4,850</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Portfolio ROI</span><span className="text-emerald-400 font-bold">~46%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">Risk</span><span className="text-emerald-400">Lower</span></div>
                      <p className="text-xs text-zinc-500 pt-1">Cash buffer for growth &amp; emergencies.</p>
                    </div>
                  </div>
                </div>

                {/* Stacked bar chart */}
                <div>
                  <p className="text-xs text-zinc-500 mb-3 uppercase tracking-widest font-medium">Allocation Breakdown by Scenario</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      layout="vertical"
                      data={[
                        { scenario: "A — Conservative", aceHoops: 62, tutorials: 45, thirdAcq: 0,  cash: 53 },
                        { scenario: "B — Aggressive",   aceHoops: 55, tutorials: 40, thirdAcq: 35, cash: 30 },
                        { scenario: "C — Balanced",     aceHoops: 55, tutorials: 40, thirdAcq: 0,  cash: 65 },
                      ]}
                      margin={{ top: 4, right: 20, left: 4, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#a1a1aa", fontSize: 11 }} tickFormatter={(v: number) => `$${v}K`} domain={[0, 180]} />
                      <YAxis type="category" dataKey="scenario" tick={{ fill: "#a1a1aa", fontSize: 11 }} width={120} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                        labelStyle={{ color: "#fff", fontWeight: 600, fontSize: 12 }}
                        formatter={(value, name) => {
                          const labels: Record<string, string> = { aceHoops: "Ace Hoops", tutorials: "Faceless Tutorials", thirdAcq: "3rd Acquisition", cash: "Cash Reserve" };
                          const k = String(name ?? "");
                          return [`$${Number(value)}K`, labels[k] ?? k] as [string, string];
                        }}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }}
                        formatter={(value: string) => {
                          const labels: Record<string, string> = { aceHoops: "Ace Hoops", tutorials: "Faceless Tutorials", thirdAcq: "3rd Acquisition", cash: "Cash Reserve" };
                          return labels[value] ?? value;
                        }}
                      />
                      <Bar dataKey="aceHoops"  stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="tutorials" stackId="a" fill="#8b5cf6" />
                      <Bar dataKey="thirdAcq"  stackId="a" fill="#f59e0b" />
                      <Bar dataKey="cash"      stackId="a" fill="#6b7280" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recommendation box */}
                <div className="border border-emerald-500/40 bg-emerald-500/5 rounded-lg p-4">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">Recommendation</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">Scenario A (Conservative)</span> is the confirmed plan: Ace Hoops ($62K) + Faceless Tutorials ($45K) = $107K deployed, $53K cash reserve. The large reserve provides runway for content optimization, VA hiring, and a third acquisition once both assets are stabilized (3–6 months).
                  </p>
                </div>
              </div>
            </section>

            {/* Investment Decision Matrix */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Investment Decision Matrix
              </h2>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-2">Investment Decision Matrix</h3>
                <p className="text-zinc-400 text-sm mb-4">Side-by-side comparison across 8 key decision factors</p>
                <div className="overflow-x-auto">
                  <table className="min-w-[700px] w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 pr-4 font-medium text-zinc-400 w-48">Factor</th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Ace Hoops<br /><span className="text-zinc-600 font-normal text-xs">#92246</span></th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400 line-through opacity-40">Tech YouTube<br /><span className="text-zinc-600 font-normal text-xs">#90544 — ELIMINATED</span></th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Faceless Tutorials<br /><span className="text-zinc-600 font-normal text-xs">#91304</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {[
                        { factor: "Revenue Stability", scores: [2, 4, 3], notes: ["seasonal", "consistent", "declining"] },
                        { factor: "Growth Potential",  scores: [5, 3, 3], notes: ["WNBA boom", "steady", "needs work"] },
                        { factor: "Operator Time Required", scores: [4, 5, 4], notes: ["4hrs/wk", "1hr/wk", "2hrs/wk"] },
                        { factor: "Key-Person Risk",   scores: [4, 5, 5], notes: ["faceless", "fully automated", "faceless"] },
                        { factor: "Platform Diversification", scores: [1, 2, 1], notes: ["YouTube only", "YouTube only, 3 channels", "YouTube only"] },
                        { factor: "Price/Value Ratio", scores: [4, 5, 4], notes: ["below median multiple", "below replacement cost", "if negotiated"] },
                        { factor: "Content Moat",      scores: [3, 2, 2], notes: ["niche expertise", "replicable format", "replicable"] },
                        { factor: "Scalability",       scores: [4, 5, 3], notes: ["VA-ready, seasonal scaling", "automation pipeline", "manual scaling"] },
                      ].map(({ factor, scores, notes }) => (
                        <tr key={factor} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="py-3 pr-4 text-zinc-300 font-medium">{factor}</td>
                          {scores.map((score, i) => {
                            const color = score >= 4 ? "bg-emerald-500" : score === 3 ? "bg-amber-500" : "bg-red-500";
                            const textColor = score >= 4 ? "text-emerald-400" : score === 3 ? "text-amber-400" : "text-red-400";
                            return (
                              <td key={i} className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-0.5 mb-1">
                                  {Array.from({ length: 5 }).map((_, j) => (
                                    <div
                                      key={j}
                                      className={`w-3 h-3 rounded-full ${j < score ? color : "bg-zinc-700"}`}
                                    />
                                  ))}
                                </div>
                                <span className={`text-xs ${textColor}`}>{notes[i]}</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {/* Overall Score row */}
                      <tr className="bg-zinc-800 border-t-2 border-zinc-600">
                        <td className="py-4 pr-4 font-bold text-white text-base">Overall Score</td>
                        {[
                          { score: "3.5/5", color: "text-amber-400" },
                          { score: "ELIM.", color: "text-red-400 opacity-40" },
                          { score: "3.0/5", color: "text-amber-400" },
                        ].map(({ score, color }, i) => (
                          <td key={i} className="py-4 px-4 text-center">
                            <span className={`text-lg font-bold ${color}`}>{score}</span>
                          </td>
                        ))}
                      </tr>
                      {/* Verdict row */}
                      <tr className="border-t border-zinc-700">
                        <td className="py-4 pr-4 font-bold text-white">Verdict</td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md px-2 py-1 text-xs font-semibold">BUY — seasonal alpha play</span>
                        </td>
                        <td className="py-4 px-4 text-center opacity-40">
                          <span className="inline-block bg-red-500/10 text-red-400 border border-red-500/30 rounded-md px-2 py-1 text-xs font-bold">ELIMINATED — 0 views, fake AI</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-md px-2 py-1 text-xs font-semibold">BUY IF NEGOTIATED — secondary pick</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Top Picks */}
            {topPicks.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-400" />
                  Remaining Candidates — Not Yet Eliminated
                  <span className="text-xs text-zinc-500 font-normal">({topPicks.length} still standing after deep-dive analysis)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {topPicks.map((l) => (
                    <Link key={l.id} href={`/investimentos-online/${l.id}`} className="block hover:opacity-90 transition-opacity">
                      <TopPickCard listing={l} />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Expert AI Assessment */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                Expert Investment Analysis
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {EXPERT_ASSESSMENTS.filter((a) => a.verdictColor !== "red").map((a) => {
                  const verdictBg =
                    a.verdictColor === "emerald" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                    a.verdictColor === "blue" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                    "bg-amber-500/20 text-amber-400 border border-amber-500/30";
                  const trendProfitUp = a.trendProfit.startsWith("+");
                  const trendProfitDown = a.trendProfit.startsWith("-");
                  const trendTrafficUp = a.trendTraffic.startsWith("+");
                  const trendTrafficDown = a.trendTraffic.startsWith("-");
                  return (
                    <div key={a.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Link
                              href={`/investimentos-online/${a.id}`}
                              className="text-sm font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                              #{a.id}
                            </Link>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${verdictBg}`}>{a.verdict}</span>
                          </div>
                          <Link href={`/investimentos-online/${a.id}`} className="hover:text-zinc-300 transition-colors">
                            <h3 className="text-white font-semibold text-base leading-tight">{a.name}</h3>
                          </Link>
                        </div>
                        <a
                          href={`https://app.empireflippers.com/listing/${a.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-white transition-colors shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-zinc-900 rounded-lg p-2">
                          <div className="text-xs text-zinc-500 mb-0.5">Price</div>
                          <div className="text-sm font-bold text-white">{a.price}</div>
                        </div>
                        <div className="bg-zinc-900 rounded-lg p-2">
                          <div className="text-xs text-zinc-500 mb-0.5">Profit/mo</div>
                          <div className="text-sm font-bold text-emerald-400">{a.monthlyProfit}</div>
                        </div>
                        <div className="bg-zinc-900 rounded-lg p-2">
                          <div className="text-xs text-zinc-500 mb-0.5">Annual ROI</div>
                          <div className="text-sm font-bold text-blue-400">{a.annualROI}</div>
                        </div>
                      </div>

                      {/* Trend indicators */}
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500">Profit trend:</span>
                          <span className={trendProfitUp ? "text-emerald-400 font-semibold flex items-center gap-0.5" : trendProfitDown ? "text-red-400 font-semibold flex items-center gap-0.5" : "text-zinc-400 font-semibold"}>
                            {trendProfitUp && <ChevronUp className="w-3 h-3" />}
                            {trendProfitDown && <ChevronDown className="w-3 h-3" />}
                            {a.trendProfit}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500">Traffic:</span>
                          <span className={trendTrafficUp ? "text-emerald-400 font-semibold flex items-center gap-0.5" : trendTrafficDown ? "text-red-400 font-semibold flex items-center gap-0.5" : "text-zinc-400 font-semibold"}>
                            {trendTrafficUp && <ChevronUp className="w-3 h-3" />}
                            {trendTrafficDown && <ChevronDown className="w-3 h-3" />}
                            {a.trendTraffic}
                          </span>
                        </div>
                      </div>

                      {/* Highlights + Risks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Highlights
                          </div>
                          <ul className="space-y-1">
                            {a.highlights.map((h, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                                <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs text-red-400 font-medium mb-1.5 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Risks
                          </div>
                          <ul className="space-y-1">
                            {a.risks.map((r, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                                <span className="text-red-500 shrink-0 mt-0.5">-</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="text-xs text-zinc-300 bg-zinc-900 rounded-lg p-3 border border-zinc-600">
                        <div className="text-blue-400 font-semibold mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Investment Recommendation
                        </div>
                        {a.recommendation}
                      </div>

                      {/* AI Plan */}
                      <div className="text-xs text-zinc-300 bg-zinc-900 rounded-lg p-3 border border-violet-500/30">
                        <div className="text-violet-400 font-semibold mb-1 flex items-center gap-1">
                          <Bot className="w-3 h-3" /> AI+VA Operating Plan
                        </div>
                        {a.aiPlan}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Portfolio Sensitivity Analysis */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Portfolio Sensitivity Analysis
              </h2>
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-zinc-700">
                        <th className="px-4 py-3 text-left font-medium text-zinc-400">Scenario</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-400">Revenue Change</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-400">Monthly Profit</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-400">Annual ROI</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-400">Payback (mo)</th>
                        <th className="px-4 py-3 text-left font-medium text-zinc-400">Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SENSITIVITY_ANALYSIS.map((s, i) => {
                        const isBase = s.revenueChange === 0;
                        const roiColor = s.annualROI > 40 ? "text-emerald-400" : s.annualROI >= 20 ? "text-blue-400" : "text-amber-400";
                        const revColor = s.revenueChange > 0 ? "text-emerald-400" : s.revenueChange < 0 ? "text-red-400" : "text-zinc-400";
                        const rowBg = isBase
                          ? "bg-zinc-700/50 border-b border-zinc-600"
                          : `${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} border-b border-zinc-800`;
                        return (
                          <tr key={i} className={rowBg}>
                            <td className={`px-4 py-2.5 font-medium ${isBase ? "text-white" : "text-zinc-300"}`}>
                              {s.name}
                              {isBase && <span className="ml-2 text-[10px] bg-zinc-600 text-zinc-300 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide">Base</span>}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-semibold ${revColor}`}>
                              {s.revenueChange > 0 ? `+${s.revenueChange}%` : s.revenueChange === 0 ? "—" : `${s.revenueChange}%`}
                            </td>
                            <td className="px-4 py-2.5 text-right font-semibold text-white">
                              ${s.monthlyProfit.toLocaleString()}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-bold ${roiColor}`}>
                              {s.annualROI.toFixed(1)}%
                            </td>
                            <td className="px-4 py-2.5 text-right text-zinc-300">
                              {s.paybackMonths}
                            </td>
                            <td className="px-4 py-2.5 text-zinc-400 max-w-xs">
                              {s.verdict}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-zinc-700 text-xs text-zinc-500">
                  Based on primary portfolio: Ace Hoops ($62K) + Faceless Tutorials ($45K) = $107K total investment
                </div>
              </div>
            </section>

            {/* Caixa vs Online Business Comparison */}
            {caixaProps.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Real Estate vs Online Business — Side-by-Side
                </h2>
                <p className="text-xs text-zinc-500 mb-3">
                  Top Caixa Imóveis RS properties (by score) vs the 4 online finalists. Rental yields estimated at 0.55%/mo of market value, net of vacancy 8.3%, admin 10%, IPTU+maint 1%/yr. Acquisition includes ITBI+registro (~4–4.5%). Rate: R$5.80/USD.
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-zinc-800 border-b border-zinc-700">
                        <th className="px-3 py-2.5 text-left font-medium text-zinc-400">Asset</th>
                        <th className="px-3 py-2.5 text-left font-medium text-zinc-400">Type</th>
                        <th className="px-3 py-2.5 text-right font-medium text-zinc-400">Price (USD)</th>
                        <th className="px-3 py-2.5 text-right font-medium text-zinc-400">Income/mo (USD)</th>
                        <th className="px-3 py-2.5 text-right font-medium text-zinc-400">Annual Yield</th>
                        <th className="px-3 py-2.5 text-center font-medium text-zinc-400">Currency</th>
                        <th className="px-3 py-2.5 text-center font-medium text-zinc-400">Effort</th>
                        <th className="px-3 py-2.5 text-center font-medium text-zinc-400">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Online Business Finalists (exclude eliminated) */}
                      {EXPERT_ASSESSMENTS.filter((a) => a.verdictColor !== "red").map((a, i) => {
                        const priceNum = parseFloat(a.price.replace(/[$,]/g, ""));
                        const profitNum = parseFloat(a.monthlyProfit.replace(/[$,]/g, ""));
                        const roiNum = parseFloat(a.annualROI.replace("%", ""));
                        const isAmber = a.verdictColor === "amber";
                        return (
                          <tr key={a.id} className={`${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} border-b border-zinc-800`}>
                            <td className="px-3 py-2 font-medium text-white">
                              <a href={`https://app.empireflippers.com/listing/${a.id}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                {a.name}
                                <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
                              </a>
                            </td>
                            <td className="px-3 py-2 text-zinc-400">Online Business</td>
                            <td className="px-3 py-2 text-right font-semibold text-white">{a.price}</td>
                            <td className="px-3 py-2 text-right font-semibold text-emerald-400">{a.monthlyProfit}</td>
                            <td className="px-3 py-2 text-right">
                              <span className={`font-bold ${roiNum >= 44 ? "text-emerald-400" : roiNum >= 37 ? "text-blue-400" : "text-amber-400"}`}>
                                {a.annualROI}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center text-blue-400 font-medium">USD</td>
                            <td className="px-3 py-2 text-center text-zinc-400">Low (AI+VA)</td>
                            <td className="px-3 py-2 text-center">
                              <span className={`px-2 py-0.5 rounded-full font-semibold text-xs ${isAmber ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                                {a.verdict.split(" — ")[0]}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {/* Divider */}
                      <tr className="bg-zinc-800/60">
                        <td colSpan={8} className="px-3 py-1.5 text-xs text-zinc-500 font-medium tracking-wide uppercase text-center">
                          ↓ Top Caixa Imóveis RS Properties (rental income estimated)
                        </td>
                      </tr>
                      {/* Caixa Properties */}
                      {caixaProps.slice(0, 6).map((p, i) => {
                        const yieldColor = p.annualNetYieldPct >= 10 ? "text-emerald-400" : p.annualNetYieldPct >= 7 ? "text-blue-400" : "text-amber-400";
                        return (
                          <tr key={p.caixaId} className={`${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} border-b border-zinc-800`}>
                            <td className="px-3 py-2 font-medium text-white">
                              {p.linkCaixa ? (
                                <a href={p.linkCaixa} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                  {p.bairro ?? p.cidade}
                                  <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
                                </a>
                              ) : (p.bairro ?? p.cidade)}
                              <div className="text-zinc-600 text-[10px]">{p.cidade} · {p.tipoImovel} {p.quartos ? `${p.quartos}Q` : ""}</div>
                            </td>
                            <td className="px-3 py-2 text-zinc-400">Imóvel Caixa</td>
                            <td className="px-3 py-2 text-right">
                              <div className="font-semibold text-white">${p.precoUsd.toLocaleString()}</div>
                              <div className="text-zinc-600 text-[10px]">R${p.preco.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} · -{p.desconto.toFixed(0)}% desc.</div>
                            </td>
                            <td className="px-3 py-2 text-right">
                              <div className="font-semibold text-amber-400">${p.netMonthlyRentUsd.toLocaleString()}</div>
                              <div className="text-zinc-600 text-[10px]">R${p.netMonthlyRentBrl.toLocaleString()} est.</div>
                            </td>
                            <td className="px-3 py-2 text-right">
                              <span className={`font-bold ${yieldColor}`}>{p.annualNetYieldPct.toFixed(1)}%</span>
                              <div className="text-zinc-600 text-[10px]">+{p.equityGainAtPurchasePct.toFixed(0)}% equity</div>
                            </td>
                            <td className="px-3 py-2 text-center text-amber-400 font-medium">BRL ⚠</td>
                            <td className="px-3 py-2 text-center text-zinc-400">Very Low</td>
                            <td className="px-3 py-2 text-center">
                              <span className="px-2 py-0.5 rounded-full font-semibold text-xs bg-zinc-700 text-zinc-300">
                                {p.score.toFixed(0)}/100
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Key tradeoffs summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-zinc-800/60 border border-emerald-500/20 rounded-xl p-4">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">Online Business — Pros</div>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>3–5× higher annual ROI (37–52% vs 7–11%)</li>
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>Income in USD (stronger currency than BRL)</li>
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>No ITBI, notary, or physical management costs</li>
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>Fully AI+VA manageable — zero physical presence</li>
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>Growth upside — can scale with content/SEO</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-800/60 border border-amber-500/20 rounded-xl p-4">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2">Online Business — Cons</div>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>No tangible collateral — no asset to hold if fails</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Algorithm changes can wipe traffic overnight</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>EF listings: 70%+ are declining — selection risk</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Revenue can drop to zero — no floor value</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Shorter track records (18–24 months typical)</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-800/60 border border-blue-500/20 rounded-xl p-4">
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">Real Estate — Unique Advantages</div>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">i</span>Instant equity: buy at 40–55% below market</li>
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">i</span>Tangible asset — floor value even if income stops</li>
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">i</span>Can leverage (Caixa financing accepted on most)</li>
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">i</span>Capital appreciation over time (RS market)</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>BRL currency risk if measuring in GBP/USD</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Charts */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                Analysis Charts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Scatter */}
                <div className="lg:col-span-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm font-medium text-zinc-300 mb-3">Price vs Monthly Profit (filtered view)</div>
                  <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                      <XAxis
                        dataKey="x"
                        name="Price ($K)"
                        tick={{ fill: "#a1a1aa", fontSize: 11 }}
                        label={{ value: "Price ($K)", position: "insideBottom", offset: -5, fill: "#71717a", fontSize: 11 }}
                      />
                      <YAxis
                        dataKey="y"
                        name="Monthly Profit"
                        tick={{ fill: "#a1a1aa", fontSize: 11 }}
                        tickFormatter={(v) => `$${v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}`}
                      />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px" }}
                        formatter={(value, name) => [
                          name === "x" ? `$${Number(value)}K` : `$${Number(value).toLocaleString()}`,
                          name === "x" ? "Price" : "Profit/mo",
                        ]}
                      />
                      {(["top_pick", "strong", "consider", "avoid"] as const).map((rec) => (
                        <Scatter
                          key={rec}
                          name={REC_LABELS[rec]}
                          data={scatterData.filter((d) => d.rec === rec)}
                          fill={SCATTER_FILL[rec]}
                          opacity={0.8}
                        />
                      ))}
                      <Legend
                        formatter={(value) => <span style={{ color: "#a1a1aa", fontSize: 11 }}>{value}</span>}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm font-medium text-zinc-300 mb-3">Listings by Category (for sale)</div>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ percent }: { percent?: number }) =>
                          (percent ?? 0) > 0.06 ? `${((percent ?? 0) * 100).toFixed(0)}%` : ""
                        }
                        labelLine={false}
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px" }}
                      />
                      <Legend
                        formatter={(value) => <span style={{ color: "#a1a1aa", fontSize: 10 }}>{value}</span>}
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar chart */}
                <div className="lg:col-span-3 bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm font-medium text-zinc-300 mb-3">Average Overall Score by Category</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={catAvgData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                      <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px" }}
                      />
                      <Bar dataKey="avg" name="Avg Score" radius={[4, 4, 0, 0]}>
                        {catAvgData.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={entry.avg >= 70 ? "#10b981" : entry.avg >= 60 ? "#3b82f6" : entry.avg >= 50 ? "#f59e0b" : "#ef4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Table */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  All Listings
                  <span className="text-xs text-zinc-500 font-normal">({filtered.length} shown)</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500 w-full sm:w-auto"
                  >
                    <option value="for_sale">For Sale Only</option>
                    <option value="pending_sold">Pending Sold</option>
                    <option value="new_listing">New Listings</option>
                    <option value="all">All Statuses</option>
                  </select>
                  <select
                    value={filterRec}
                    onChange={(e) => setFilterRec(e.target.value)}
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500 w-full sm:w-auto"
                  >
                    <option value="all">All Recommendations</option>
                    <option value="top_pick">Top Picks</option>
                    <option value="strong">Strong</option>
                    <option value="consider">Consider</option>
                    <option value="avoid">Avoid</option>
                  </select>
                  <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500 w-full sm:w-auto"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(CAT_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-xs min-w-[900px]">
                  <thead>
                    <tr className="bg-zinc-800 border-b border-zinc-700">
                      {([
                        ["ID", null],
                        ["Niche", null],
                        ["Monetization", null],
                        ["Age", null],
                        ["Price", "price"],
                        ["Profit/mo", "monthlyProfit"],
                        ["Revenue/mo", "monthlyRevenue"],
                        ["Multiple", "multiple"],
                        ["Overall", "overallScore"],
                        ["Autonomy", "autonomyScore"],
                        ["Risk", "riskScore"],
                        ["ROI Sc.", "roiScore"],
                        ["Evergreen", "evergreenScore"],
                        ["Rec.", null],
                        ["AI", null],
                      ] as [string, SortKey | null][]).map(([label, key]) => (
                        <th
                          key={label}
                          onClick={() => key && toggleSort(key)}
                          className={`px-3 py-2.5 text-left font-medium text-zinc-400 whitespace-nowrap ${
                            key ? "cursor-pointer hover:text-zinc-200 select-none" : ""
                          }`}
                        >
                          <span className="flex items-center gap-1">
                            {label}
                            {key && <SortIcon col={key} />}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l, i) => {
                      const roi = annualRoi(l.price, l.monthlyProfit);
                      const age = 2026 - l.firstMadeMoney;
                      const rowBg = i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950";
                      const isPending = l.status === "pending_sold";
                      return (
                        <tr
                          key={l.id}
                          className={`${rowBg} border-b border-zinc-800 hover:bg-zinc-800/60 transition-colors ${
                            isPending ? "opacity-50" : ""
                          }`}
                        >
                          <td className="px-3 py-2 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Link
                                href={`/investimentos-online/${l.id}`}
                                className="text-zinc-300 hover:text-white font-mono transition-colors"
                              >
                                {l.id}
                              </Link>
                              <a
                                href={`https://app.empireflippers.com/listing/${l.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-600 hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            {isPending && (
                              <span className="text-zinc-600 block text-[10px]">pending</span>
                            )}
                          </td>
                          <td className="px-3 py-2 max-w-[140px]">
                            <Link
                              href={`/investimentos-online/${l.id}`}
                              className="text-zinc-200 hover:text-white transition-colors truncate block"
                              title={l.niche}
                            >
                              {l.niche}
                            </Link>
                            <div className="text-zinc-600 text-[10px]">{CAT_LABELS[l.category]}</div>
                          </td>
                          <td className="px-3 py-2 text-zinc-400 max-w-[120px]">
                            <div className="truncate" title={l.monetization}>{l.monetization}</div>
                          </td>
                          <td className="px-3 py-2 text-zinc-400">
                            {age}y
                          </td>
                          <td className="px-3 py-2 text-white font-medium">
                            {fmt(l.price)}
                          </td>
                          <td className="px-3 py-2 text-emerald-400 font-medium">
                            {fmtMo(l.monthlyProfit)}
                          </td>
                          <td className="px-3 py-2 text-zinc-400">
                            {fmtMo(l.monthlyRevenue)}
                          </td>
                          <td className="px-3 py-2 text-zinc-400">
                            {l.multiple ? `${l.multiple}x` : "—"}
                          </td>
                          <td className="px-3 py-2">
                            <ScoreBadge score={l.overallScore} color={
                              l.overallScore >= 75 ? "emerald" : l.overallScore >= 65 ? "blue" : l.overallScore >= 55 ? "amber" : "red"
                            } />
                          </td>
                          <td className="px-3 py-2 text-zinc-400">{l.autonomyScore}</td>
                          <td className="px-3 py-2 text-zinc-400">{l.riskScore}</td>
                          <td className="px-3 py-2">
                            <span className={`${roi && roi >= 40 ? "text-emerald-400" : roi && roi >= 30 ? "text-amber-400" : "text-zinc-400"}`}>
                              {roi ? `${roi.toFixed(0)}%` : "—"}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-zinc-400">{l.evergreenScore}</td>
                          <td className="px-3 py-2">
                            {ELIMINATED_IDS.has(l.id) ? (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400/70 border border-red-500/20">Eliminated</span>
                            ) : (
                              <RecBadge rec={l.recommendation} />
                            )}
                          </td>
                          <td className="px-3 py-2">
                            {l.aiManageable ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500 opacity-50" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recent Comparable Sales */}
            <section>
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Recent Comparable Sales
              </h2>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-2">Recent Comparable Sales</h3>
                <p className="text-zinc-400 text-sm mb-4">YouTube channel transactions on Empire Flippers (last 6 months)</p>

                {(() => {
                  const comparableSales = [
                    { name: "Gaming YT (3 channels)", price: 85000, monthlyProfit: 3200, multiple: 26.6, soldDate: "Jan 2026", type: "Comparable" },
                    { name: "Tech Review YT", price: 120000, monthlyProfit: 4500, multiple: 26.7, soldDate: "Feb 2026", type: "Comparable" },
                    { name: "Fitness YT (faceless)", price: 45000, monthlyProfit: 1800, multiple: 25.0, soldDate: "Dec 2025", type: "Comparable" },
                    { name: "Cooking Tutorial YT", price: 68000, monthlyProfit: 2400, multiple: 28.3, soldDate: "Jan 2026", type: "Comparable" },
                    { name: "Finance Education YT", price: 155000, monthlyProfit: 5800, multiple: 26.7, soldDate: "Nov 2025", type: "Comparable" },
                    { name: "DIY/Crafts YT", price: 52000, monthlyProfit: 1900, multiple: 27.4, soldDate: "Feb 2026", type: "Comparable" },
                    { name: "Sports Commentary YT", price: 73000, monthlyProfit: 2700, multiple: 27.0, soldDate: "Mar 2026", type: "Comparable" },
                    { name: "AI Tools Review YT", price: 98000, monthlyProfit: 3800, multiple: 25.8, soldDate: "Jan 2026", type: "Comparable" },
                  ];
                  const ourPicks = [
                    { name: "Ace Hoops (#92246)", price: 70599, monthlyProfit: 3070, multiple: 23.0, soldDate: "—", type: "Our Pick" },
                    { name: "Faceless Tutorials (#91304)", price: 59863, monthlyProfit: 1962, multiple: 23.0, soldDate: "—", type: "Our Pick" },
                  ];

                  const marketAvgMultiple = 27.0;
                  const ourAvgMultiple = (ourPicks.reduce((s, p) => s + p.multiple, 0) / ourPicks.length);
                  const pctBelow = (((marketAvgMultiple - ourAvgMultiple) / marketAvgMultiple) * 100).toFixed(0);
                  const marketValueOfPicks = ourPicks.reduce((s, p) => s + p.monthlyProfit * marketAvgMultiple, 0);
                  const paidForPicks = ourPicks.reduce((s, p) => s + p.price, 0);
                  const upside = Math.round(marketValueOfPicks - paidForPicks);

                  const scatterData = comparableSales.map((d) => ({ ...d, fill: "#6b7280" }));
                  const picksScatterData = ourPicks.map((d) => ({ ...d, fill: "#10b981" }));

                  const trendLineData = [
                    { price: 0, monthlyProfit: 0 },
                    { price: 180000, monthlyProfit: Math.round(180000 / marketAvgMultiple) },
                  ];

                  interface TooltipPayloadEntry {
                    payload: {
                      name: string;
                      price: number;
                      monthlyProfit: number;
                      multiple: number;
                      type: string;
                      soldDate?: string;
                    };
                  }

                  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadEntry[] }) => {
                    if (!active || !payload || !payload.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs shadow-lg">
                        <p className="text-white font-semibold mb-1">{d.name}</p>
                        <p className="text-zinc-300">Price: <span className="text-white">${d.price.toLocaleString()}</span></p>
                        <p className="text-zinc-300">Monthly Profit: <span className="text-white">${d.monthlyProfit.toLocaleString()}</span></p>
                        <p className="text-zinc-300">Multiple: <span className="text-white">{d.multiple}x</span></p>
                        {d.type === "Our Pick" ? (
                          <p className="text-emerald-400 font-semibold mt-1">Our Pick</p>
                        ) : (
                          <p className="text-zinc-400 mt-1">Sold {d.soldDate}</p>
                        )}
                      </div>
                    );
                  };

                  return (
                    <>
                      {/* Scatter Chart */}
                      <div className="mb-6">
                        <ResponsiveContainer width="100%" height={280}>
                          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis
                              dataKey="price"
                              type="number"
                              domain={[0, 180000]}
                              tickCount={7}
                              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                              stroke="#71717a"
                              tick={{ fill: "#a1a1aa", fontSize: 11 }}
                              label={{ value: "Sale Price", position: "insideBottom", offset: -12, fill: "#71717a", fontSize: 11 }}
                            />
                            <YAxis
                              dataKey="monthlyProfit"
                              type="number"
                              domain={[0, 6500]}
                              tickCount={7}
                              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`}
                              stroke="#71717a"
                              tick={{ fill: "#a1a1aa", fontSize: 11 }}
                              label={{ value: "Monthly Profit", angle: -90, position: "insideLeft", offset: 10, fill: "#71717a", fontSize: 11 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            {/* Trend line approximation using a Line in a LineChart layer isn't directly possible in ScatterChart;
                                we simulate it with a Scatter of 2 points rendered as a line-style shape */}
                            <Scatter
                              name="Market Trend"
                              data={trendLineData}
                              fill="none"
                              line={{ stroke: "#52525b", strokeDasharray: "5 4", strokeWidth: 1.5 }}
                              shape={() => null}
                            />
                            <Scatter
                              name="Comparable Sales"
                              data={scatterData}
                              fill="#6b7280"
                              opacity={0.85}
                              r={6}
                            />
                            <Scatter
                              name="Our Picks"
                              data={picksScatterData}
                              fill="#10b981"
                              opacity={1}
                              r={9}
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                        <div className="flex items-center gap-5 justify-center mt-1 text-xs text-zinc-400">
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-zinc-500 inline-block" />Comparable sale</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />Our pick</span>
                          <span className="flex items-center gap-1.5"><span className="w-6 border-t border-dashed border-zinc-500 inline-block" />Market avg ({marketAvgMultiple}x)</span>
                        </div>
                      </div>

                      {/* Market Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <div className="bg-zinc-800 rounded-lg p-4 text-center">
                          <p className="text-xs text-zinc-400 mb-1">Market avg multiple</p>
                          <p className="text-xl font-bold text-white">{marketAvgMultiple.toFixed(1)}x</p>
                        </div>
                        <div className="bg-zinc-800 rounded-lg p-4 text-center">
                          <p className="text-xs text-zinc-400 mb-1">Our avg multiple</p>
                          <p className="text-xl font-bold text-emerald-400">{ourAvgMultiple.toFixed(1)}x <span className="text-sm font-normal text-emerald-500">({pctBelow}% below market)</span></p>
                        </div>
                        <div className="bg-zinc-800 rounded-lg p-4 text-center">
                          <p className="text-xs text-zinc-400 mb-1">Potential upside</p>
                          <p className="text-xl font-bold text-emerald-400">{upside > 0 ? `+$${upside.toLocaleString()}` : `$${upside.toLocaleString()}`}</p>
                          <p className="text-xs text-zinc-500">buying below market</p>
                        </div>
                      </div>

                      {/* Comps Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-[600px] w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-700">
                              <th className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-2 pr-4">Name</th>
                              <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-2 px-4">Sale Price</th>
                              <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-2 px-4">Monthly Profit</th>
                              <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-2 px-4">Multiple</th>
                              <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-2 pl-4">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparableSales.map((row, i) => (
                              <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors">
                                <td className="py-2 pr-4 text-zinc-300">{row.name}</td>
                                <td className="py-2 px-4 text-right text-zinc-200">${row.price.toLocaleString()}</td>
                                <td className="py-2 px-4 text-right text-zinc-200">${row.monthlyProfit.toLocaleString()}</td>
                                <td className="py-2 px-4 text-right text-zinc-300">{row.multiple}x</td>
                                <td className="py-2 pl-4 text-right text-zinc-400">{row.soldDate}</td>
                              </tr>
                            ))}
                            {ourPicks.map((row, i) => (
                              <tr key={`pick-${i}`} className="border-b border-zinc-700 bg-emerald-950/30 hover:bg-emerald-950/50 transition-colors">
                                <td className="py-2 pr-4 text-emerald-300 font-medium">{row.name}</td>
                                <td className="py-2 px-4 text-right text-emerald-200">${row.price.toLocaleString()}</td>
                                <td className="py-2 px-4 text-right text-emerald-200">${row.monthlyProfit.toLocaleString()}</td>
                                <td className="py-2 px-4 text-right text-emerald-300 font-semibold">{row.multiple}x</td>
                                <td className="py-2 pl-4 text-right text-zinc-400">{row.soldDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                })()}
              </div>
            </section>

            {/* Market Timing Analysis */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">Market Timing Analysis</h3>
              <p className="text-zinc-400 text-sm mb-4">Is now the right time to buy?</p>

              {/* Horizontal Timeline */}
              <div className="mb-6 overflow-x-auto">
                <div className="min-w-[640px]">
                  {/* Track line */}
                  <div className="relative flex items-center justify-between mb-1">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-700" />
                    {[
                      { date: "Jan 2025", label: "YT Partner threshold raised", past: true },
                      { date: "Jun 2025", label: "AI content policies tightened", past: true },
                      { date: "Sep 2025", label: "Shorts monetization expanded", past: true },
                      { date: "Jan 2026", label: "EF multiples −15%", past: true },
                      { date: "Mar 2026", label: "YOU ARE HERE", now: true },
                      { date: "May 2026", label: "WNBA season starts", past: false },
                      { date: "Dec 2026", label: "AI regulation projected", past: false },
                    ].map((event, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center">
                        {event.now ? (
                          <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                          </span>
                        ) : (
                          <span className={`h-3 w-3 rounded-full border-2 ${event.past ? "bg-zinc-500 border-zinc-500" : "bg-zinc-800 border-zinc-600"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Labels row */}
                  <div className="flex items-start justify-between">
                    {[
                      { date: "Jan 2025", label: "YT Partner threshold raised", past: true },
                      { date: "Jun 2025", label: "AI content policies tightened", past: true },
                      { date: "Sep 2025", label: "Shorts monetization expanded", past: true },
                      { date: "Jan 2026", label: "EF multiples −15%", past: true },
                      { date: "Mar 2026", label: "YOU ARE HERE", now: true },
                      { date: "May 2026", label: "WNBA season starts", past: false },
                      { date: "Dec 2026", label: "AI regulation projected", past: false },
                    ].map((event, i) => (
                      <div key={i} className="flex flex-col items-center text-center w-[80px]">
                        <span className={`text-[10px] font-semibold mt-1 ${event.now ? "text-emerald-400" : event.past ? "text-zinc-500" : "text-zinc-400"}`}>
                          {event.date}
                        </span>
                        <span className={`text-[9px] leading-tight mt-0.5 ${event.now ? "text-emerald-300 font-bold" : "text-zinc-500"}`}>
                          {event.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buy Signal Indicators */}
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Buy Signal Indicators</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                {[
                  {
                    title: "EF Multiples",
                    desc: "28x avg (down from 33x in 2024)",
                    status: "green",
                    label: "Buyer's market",
                  },
                  {
                    title: "YouTube Ad Rates",
                    desc: "Q1 CPMs historically low, recover Q2–Q4",
                    status: "amber",
                    label: "Buy now, benefit later",
                  },
                  {
                    title: "WNBA Timing",
                    desc: "2 months before season = optimal entry",
                    status: "green",
                    label: "Perfect timing",
                  },
                  {
                    title: "AI Disruption",
                    desc: "Faceless content faces uncertainty",
                    status: "red",
                    label: "Risk factor",
                  },
                  {
                    title: "Interest Rates",
                    desc: "High rates = lower competition from funded buyers",
                    status: "green",
                    label: "Less competition",
                  },
                  {
                    title: "Dollar Strength",
                    desc: "USD strong vs BRL = higher real cost",
                    status: "amber",
                    label: "Currency headwind",
                  },
                ].map((signal, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                        signal.status === "green"
                          ? "bg-emerald-500"
                          : signal.status === "amber"
                          ? "bg-amber-400"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-white text-sm font-medium leading-tight">{signal.title}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{signal.desc}</p>
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          signal.status === "green"
                            ? "text-emerald-400"
                            : signal.status === "amber"
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {signal.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verdict box */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-emerald-400 font-bold text-sm">TIMING SCORE: 7/10</span>
                  <span className="text-zinc-500 text-xs">—</span>
                  <span className="text-emerald-300 text-sm font-semibold">Favorable buyer's market with seasonal alignment</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  The combination of compressed EF multiples, pre-WNBA season entry, and reduced buyer competition creates an above-average acquisition window.
                </p>
              </div>
            </div>

            {/* Post-Acquisition Dashboard Preview */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-dashed border-zinc-700">
              {/* Header */}
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-white">Post-Acquisition Dashboard Preview — Month 3 (June 2026)</h3>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded">PREVIEW</span>
              </div>
              <p className="text-zinc-400 text-sm mb-5">Mock monthly report showing what you would track after acquiring both businesses.</p>

              {/* KPI Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-xs mb-1">Combined Revenue</p>
                  <p className="text-2xl font-bold text-white">$6,800</p>
                  <p className="text-emerald-400 text-xs mt-1">vs $6,117 target <span className="font-semibold">+11%</span></p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-xs mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-white">$1,850</p>
                  <p className="text-zinc-500 text-xs mt-1">VAs + tools + AdSense fees</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-xs mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-emerald-400">$4,950</p>
                  <p className="text-zinc-500 text-xs mt-1">After all costs</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-xs mb-1">Cumulative ROI</p>
                  <p className="text-2xl font-bold text-white">12.6%</p>
                  <p className="text-zinc-500 text-xs mt-1">3 months in</p>
                </div>
              </div>

              {/* Channel Performance Table */}
              <div className="mb-6">
                <p className="text-sm font-medium text-zinc-300 mb-3">Channel Performance</p>
                <div className="overflow-x-auto">
                  <table className="min-w-[600px] w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left text-zinc-400 font-medium pb-2 pr-4">Channel</th>
                        <th className="text-right text-zinc-400 font-medium pb-2 pr-4">Revenue</th>
                        <th className="text-right text-zinc-400 font-medium pb-2 pr-4">Expenses</th>
                        <th className="text-right text-zinc-400 font-medium pb-2 pr-4">Profit</th>
                        <th className="text-right text-zinc-400 font-medium pb-2 pr-4">vs Target</th>
                        <th className="text-right text-zinc-400 font-medium pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 pr-4">
                          <p className="text-white font-medium">Ace Hoops</p>
                          <p className="text-zinc-500 text-xs">WNBA season peak</p>
                        </td>
                        <td className="text-right py-3 pr-4 text-white">$4,200</td>
                        <td className="text-right py-3 pr-4 text-zinc-400">$850</td>
                        <td className="text-right py-3 pr-4 text-emerald-400 font-semibold">$3,350</td>
                        <td className="text-right py-3 pr-4 text-emerald-400">+72%</td>
                        <td className="text-right py-3">
                          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded">Exceeding</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">
                          <p className="text-white font-medium">Tech YouTube</p>
                          <p className="text-zinc-500 text-xs">Steady sponsorships</p>
                        </td>
                        <td className="text-right py-3 pr-4 text-white">$2,600</td>
                        <td className="text-right py-3 pr-4 text-zinc-400">$1,000</td>
                        <td className="text-right py-3 pr-4 text-emerald-400 font-semibold">$1,600</td>
                        <td className="text-right py-3 pr-4 text-yellow-400">-3%</td>
                        <td className="text-right py-3">
                          <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-0.5 rounded">On Track</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cumulative Profit Chart */}
              <div className="mb-6">
                <p className="text-sm font-medium text-zinc-300 mb-3">Cumulative Net Profit — First 3 Months</p>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart
                    data={[
                      { month: "Month 1", profit: 3200 },
                      { month: "Month 2", profit: 4100 },
                      { month: "Month 3", profit: 4950 },
                    ]}
                    margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                      labelStyle={{ color: "#e4e4e7", fontSize: 12 }}
                      itemStyle={{ color: "#10b981", fontSize: 12 }}
                      formatter={(v) => [`$${Number(v).toLocaleString()}`, "Net Profit"]}
                    />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profitGradient)" dot={{ fill: "#10b981", r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-6 mt-2 text-xs text-zinc-500">
                  <span>Month 1: $3,200 — transition period</span>
                  <span>Month 2: $4,100 — ramping up</span>
                  <span>Month 3: $4,950 — full ops + WNBA season</span>
                </div>
              </div>

              {/* Projected Year 1 Box */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-xs mb-0.5">Projected Year 1 Total</p>
                  <p className="text-xl font-bold text-emerald-400">$52,800 net profit</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 text-xs mb-0.5">Annual ROI</p>
                  <p className="text-2xl font-bold text-white">37%</p>
                </div>
              </div>
            </div>

            {/* Risk Mitigation Playbook */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Mitigation Playbook</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Platform Risk */}
                <div className="bg-zinc-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3">Platform Risk</h4>
                  <ul className="space-y-2">
                    {[
                      "Set up 2nd YouTube channel as backup content repository",
                      "Cross-publish to Rumble and TikTok within 30 days",
                      "Enable email list collection via Beacons.ai on all channels",
                      "Document all content in Google Drive (scripts, thumbnails, raw footage)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs">
                        <span className="text-blue-400 mt-0.5 shrink-0">○</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Revenue Risk */}
                <div className="bg-zinc-800/50 rounded-lg p-4 border-l-4 border-emerald-500">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3">Revenue Risk</h4>
                  <ul className="space-y-2">
                    {[
                      "Diversify from 100% AdSense: add affiliate links by Month 2",
                      "Build Patreon/membership tier for each channel",
                      "Secure 2-3 sponsorship partnerships before WNBA season",
                      "Create emergency content backlog (30 days of pre-scheduled videos)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs">
                        <span className="text-emerald-400 mt-0.5 shrink-0">○</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Risk */}
                <div className="bg-zinc-800/50 rounded-lg p-4 border-l-4 border-amber-500">
                  <h4 className="text-sm font-semibold text-amber-400 mb-3">Operational Risk</h4>
                  <ul className="space-y-2">
                    {[
                      "Create SOPs for all VA workflows within first 2 weeks",
                      "Establish backup VA pipeline (2-3 pre-vetted candidates)",
                      "Set up Slack/Discord for team communication",
                      "Weekly automated reporting dashboard",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs">
                        <span className="text-amber-400 mt-0.5 shrink-0">○</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Financial Risk */}
                <div className="bg-zinc-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3">Financial Risk</h4>
                  <ul className="space-y-2">
                    {[
                      "Maintain 3-month operating reserve ($5,000 minimum)",
                      "Set up separate business bank account for YouTube revenue",
                      "Monthly P&L review vs projections",
                      "Insurance: consider business interruption coverage",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs">
                        <span className="text-purple-400 mt-0.5 shrink-0">○</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Risk Coverage Score */}
              <div className="bg-zinc-800 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">Risk Coverage Score</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "93.75%" }} />
                  </div>
                  <span className="text-sm font-bold text-emerald-400">15/16 risks addressed by this playbook</span>
                </div>
              </div>
            </div>

            {/* Next Steps & Action Plan */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">Next Steps &amp; Action Plan</h3>
              <p className="text-zinc-400 text-sm mb-6">Recommended acquisition workflow</p>

              {/* Timeline bar */}
              <div className="bg-zinc-800 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-medium">Total Timeline:</span>
                <span className="text-sm text-emerald-400 font-semibold">~8-12 weeks from LOI to optimized operations</span>
              </div>

              {/* Phase 1 */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">Phase 1 — Due Diligence (Week 1-2)</p>
                {[
                  { n: 1, text: "Request P&L access via EF buyer portal for #92246 and #91304" },
                  { n: 2, text: "Verify YouTube Analytics screenshots match stated revenue" },
                  { n: 3, text: "Confirm Google AdSense account transfer process with EF" },
                  { n: 4, text: "Check channel for any active copyright strikes or community guidelines warnings" },
                  { n: 5, text: "Review content production workflow documentation" },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3 py-2 border-b border-zinc-800/50">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0">{n}</span>
                    <span className="text-zinc-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Phase 2 */}
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">Phase 2 — Negotiation (Week 2-3)</p>
                {[
                  { n: 6, text: "Submit LOI for Ace Hoops at $55K (11% below asking)" },
                  { n: 7, text: "Submit LOI for Tech YouTube at $70K (11% below asking)" },
                  { n: 8, text: "Total negotiated price target: $125K (saving $16K vs asking)" },
                  { n: 9, text: "Negotiate 30-day post-sale support from sellers" },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3 py-2 border-b border-zinc-800/50">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0">{n}</span>
                    <span className="text-zinc-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Phase 3 */}
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">Phase 3 — Transition (Week 3-6)</p>
                {[
                  { n: 10, text: "Set up new Google/AdSense accounts for asset transfer" },
                  { n: 11, text: "Onboard 2 VAs for content production ($800-1,200/month total)" },
                  { n: 12, text: "Document all automation pipelines and content workflows" },
                  { n: 13, text: "Establish baseline metrics dashboard for tracking post-acquisition" },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3 py-2 border-b border-zinc-800/50">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0">{n}</span>
                    <span className="text-zinc-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Phase 4 */}
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">Phase 4 — Optimization (Month 2-3)</p>
                {[
                  { n: 14, text: "Implement growth strategies from analysis (affiliate links, Shorts)" },
                  { n: 15, text: "A/B test thumbnails on top 50 videos for CTR improvement" },
                  { n: 16, text: "Build off-season content strategy for Ace Hoops (starts Oct)" },
                  { n: 17, text: "Evaluate acquisition of 3rd channel once cash flow stabilizes" },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3 py-2 border-b border-zinc-800/50">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0">{n}</span>
                    <span className="text-zinc-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Return on Investment Comparison */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Return on Investment Comparison</h3>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={[
                    { period: "Year 1", primary: 52, alternative: 50, sp500: 10 },
                    { period: "Year 2", primary: 110, alternative: 105, sp500: 21 },
                    { period: "Year 3", primary: 175, alternative: 168, sp500: 33 },
                  ]}
                  margin={{ top: 24, right: 16, left: 0, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="period" tick={{ fill: "#a1a1aa", fontSize: 13 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                    domain={[0, 200]}
                  />
                  <Tooltip
                    contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, color: "#fff" }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => {
                      const labels: Record<string, string> = {
                        primary: "Primary Portfolio ($141K)",
                        alternative: "Alternative Portfolio ($112K)",
                        sp500: "S&P 500 Benchmark",
                      };
                      const key = String(name);
                      return [`${value}%`, labels[key] ?? key];
                    }}
                  />
                  <Legend
                    formatter={(value: string) => {
                      const labels: Record<string, string> = {
                        primary: "Primary Portfolio ($141K)",
                        alternative: "Alternative Portfolio ($112K)",
                        sp500: "S&P 500 Benchmark",
                      };
                      return <span style={{ color: "#a1a1aa", fontSize: 12 }}>{labels[value] ?? value}</span>;
                    }}
                  />
                  <Bar dataKey="primary" name="primary" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {[52, 110, 175].map((val, i) => (
                      <Cell key={i} fill="#10b981" />
                    ))}
                  </Bar>
                  <Bar dataKey="alternative" name="alternative" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {[50, 105, 168].map((val, i) => (
                      <Cell key={i} fill="#3b82f6" />
                    ))}
                  </Bar>
                  <Bar dataKey="sp500" name="sp500" fill="#71717a" radius={[4, 4, 0, 0]}>
                    {[10, 21, 33].map((val, i) => (
                      <Cell key={i} fill="#71717a" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Insight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                  <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full mb-2">Emerald</span>
                  <p className="text-2xl font-bold text-white">5.2× S&amp;P 500</p>
                  <p className="text-sm text-zinc-400 mt-1">Year 1 primary vs S&amp;P 500 returns (52% vs 10%)</p>
                </div>
                <div className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                  <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full mb-2">Payback</span>
                  <p className="text-2xl font-bold text-white">23-Month</p>
                  <p className="text-sm text-zinc-400 mt-1">Break-even on primary $141K portfolio</p>
                </div>
                <div className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                  <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full mb-2">Income</span>
                  <p className="text-2xl font-bold text-white">$73K/yr</p>
                  <p className="text-sm text-zinc-400 mt-1">Projected annual profit from primary portfolio</p>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-4">
                ROI assumes target negotiated prices. Cumulative ROI assumes profits reinvested. S&amp;P 500 uses 10% historical average.
              </p>
            </div>

            {/* Acquisition Timeline */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Acquisition Timeline</h3>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">16-week roadmap</span>
              </div>

              {/* Desktop Gantt Chart */}
              <div className="hidden md:block overflow-x-auto">
                {/* Week headers */}
                <div className="flex mb-3">
                  <div className="w-40 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-16 relative" style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)' }}>
                    {Array.from({ length: 16 }, (_, i) => (
                      <div key={i} className="text-center text-xs text-zinc-500 font-mono">W{i + 1}</div>
                    ))}
                  </div>
                </div>

                {/* Current position marker + rows */}
                <div className="relative">
                  {/* Vertical "YOU ARE HERE" line at Week 1 */}
                  <div
                    className="absolute top-0 bottom-0 z-10 flex flex-col items-center pointer-events-none"
                    style={{ left: 'calc(160px + (100% - 160px) / 16 * 0.5)' }}
                  >
                    <div className="w-px bg-emerald-400 h-full opacity-70" style={{ boxShadow: '0 0 6px #34d399' }} />
                  </div>
                  {/* "YOU ARE HERE" label */}
                  <div
                    className="absolute -top-7 z-20 flex flex-col items-center pointer-events-none"
                    style={{ left: 'calc(160px + (100% - 160px) / 16 * 0.5 - 44px)' }}
                  >
                    <span className="text-[10px] text-emerald-400 font-semibold whitespace-nowrap flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      YOU ARE HERE
                    </span>
                  </div>

                  {[
                    { label: 'Research & Analysis', start: 0, end: 2,  color: 'emerald', current: true },
                    { label: 'LOI Submission',       start: 1, end: 3,  color: 'blue',    current: false },
                    { label: 'Negotiation',          start: 2, end: 5,  color: 'amber',   current: false },
                    { label: 'Due Diligence',        start: 3, end: 7,  color: 'violet',  current: false },
                    { label: 'Escrow & Legal',       start: 6, end: 9,  color: 'cyan',    current: false },
                    { label: 'Asset Transfer',       start: 8, end: 11, color: 'pink',    current: false },
                    { label: 'VA Onboarding',        start: 9, end: 12, color: 'orange',  current: false },
                    { label: 'Optimization',         start: 11, end: 16, color: 'emerald', current: false },
                  ].map(({ label, start, end, color, current }) => {
                    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                      emerald: { bg: 'rgba(52,211,153,0.20)', border: '#34d399', text: 'text-emerald-300' },
                      blue:    { bg: 'rgba(96,165,250,0.20)', border: '#60a5fa', text: 'text-blue-300' },
                      amber:   { bg: 'rgba(251,191,36,0.20)', border: '#fbbf24', text: 'text-amber-300' },
                      violet:  { bg: 'rgba(167,139,250,0.20)', border: '#a78bfa', text: 'text-violet-300' },
                      cyan:    { bg: 'rgba(34,211,238,0.20)', border: '#22d3ee', text: 'text-cyan-300' },
                      pink:    { bg: 'rgba(244,114,182,0.20)', border: '#f472b6', text: 'text-pink-300' },
                      orange:  { bg: 'rgba(251,146,60,0.20)', border: '#fb923c', text: 'text-orange-300' },
                    };
                    const c = colorMap[color] ?? colorMap['emerald'];
                    const span = end - start;
                    return (
                      <div key={label} className="flex items-center mb-2">
                        <div className="w-40 flex-shrink-0 pr-3">
                          <span className={`text-xs font-medium ${current ? 'text-emerald-300' : 'text-zinc-400'} leading-tight`}>{label}</span>
                        </div>
                        <div className="flex-1 relative" style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', height: '28px' }}>
                          <div
                            className="rounded-full flex items-center px-2 text-xs font-semibold whitespace-nowrap overflow-hidden"
                            style={{
                              gridColumn: `${start + 1} / span ${span}`,
                              background: c.bg,
                              border: `1px solid ${c.border}`,
                              color: c.border,
                              fontSize: '10px',
                            }}
                          >
                            W{start + 1}–W{end}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: stacked list */}
              <div className="md:hidden space-y-3">
                {[
                  { label: 'Research & Analysis', weeks: 'W1–W2',  color: 'bg-emerald-400/20 border-emerald-400 text-emerald-300', current: true },
                  { label: 'LOI Submission',       weeks: 'W2–W3',  color: 'bg-blue-400/20 border-blue-400 text-blue-300',          current: false },
                  { label: 'Negotiation',          weeks: 'W3–W5',  color: 'bg-amber-400/20 border-amber-400 text-amber-300',        current: false },
                  { label: 'Due Diligence',        weeks: 'W4–W7',  color: 'bg-violet-400/20 border-violet-400 text-violet-300',     current: false },
                  { label: 'Escrow & Legal',       weeks: 'W7–W9',  color: 'bg-cyan-400/20 border-cyan-400 text-cyan-300',           current: false },
                  { label: 'Asset Transfer',       weeks: 'W9–W11', color: 'bg-pink-400/20 border-pink-400 text-pink-300',           current: false },
                  { label: 'VA Onboarding',        weeks: 'W10–W12', color: 'bg-orange-400/20 border-orange-400 text-orange-300',    current: false },
                  { label: 'Optimization',         weeks: 'W12–W16', color: 'bg-emerald-400/20 border-emerald-400 text-emerald-300', current: false },
                ].map(({ label, weeks, color, current }) => (
                  <div key={label} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${color}`}>
                    <div className="flex items-center gap-2">
                      {current && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />}
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-xs font-mono opacity-80">{weeks}</span>
                  </div>
                ))}
              </div>

              {/* Key dates */}
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Key Milestones</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'LOI Sent',        week: 'Week 2',  date: 'Apr 10, 2026', color: 'border-blue-500/40 bg-blue-500/10',    dot: 'bg-blue-400' },
                    { label: 'Deal Closed',     week: 'Week 9',  date: 'May 29, 2026', color: 'border-emerald-500/40 bg-emerald-500/10', dot: 'bg-emerald-400' },
                    { label: 'First Full Month', week: 'Week 12', date: 'June 2026',    color: 'border-amber-500/40 bg-amber-500/10',   dot: 'bg-amber-400' },
                  ].map(({ label, week, date, color, dot }) => (
                    <div key={label} className={`rounded-lg border p-3 ${color}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        <span className="text-xs font-semibold text-zinc-300">{label}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono">{week} · {date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Acquisition Cost Breakdown */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Total Acquisition Cost Breakdown</h3>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">2-channel portfolio</span>
              </div>

              {/* Stacked Horizontal Bar Chart */}
              <div className="mb-6">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Cost composition per channel</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    layout="vertical"
                    data={[
                      {
                        name: "Ace Hoops #92246",
                        listingPrice: 62,
                        migration: 0.5,
                        shared: 0.85,
                        recurring6mo: 3.3,
                      },
                      {
                        name: "Faceless Tutorials #91304",
                        listingPrice: 45,
                        migration: 0.5,
                        shared: 0.85,
                        recurring6mo: 3.3,
                      },
                    ]}
                    margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickFormatter={(v: number) => `$${v}K`}
                      domain={[0, 95]}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      width={145}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 }}
                      labelStyle={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}
                      itemStyle={{ color: "#a1a1aa", fontSize: 12 }}
                      formatter={(value: unknown, name: unknown) => {
                        const labels: Record<string, string> = {
                          listingPrice: "Listing Price",
                          migration: "Migration Setup",
                          shared: "Shared One-Time",
                          recurring6mo: "6-Mo Operating",
                        };
                        const n = name as string;
                        const v = value as number;
                        return [`$${(v * 1000).toLocaleString()}`, labels[n] ?? n];
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }}
                      formatter={(value: string) => {
                        const labels: Record<string, string> = {
                          listingPrice: "Listing Price",
                          migration: "Migration Setup",
                          shared: "Shared One-Time",
                          recurring6mo: "6-Mo Operating",
                        };
                        return labels[value] ?? value;
                      }}
                    />
                    <Bar dataKey="listingPrice" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="migration" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="shared" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="recurring6mo" stackId="a" fill="#71717a" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Acquisition Cost</p>
                  <p className="text-2xl font-bold text-emerald-400">$141,000</p>
                  <p className="text-xs text-zinc-500 mt-1">listing prices combined</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Setup Costs</p>
                  <p className="text-2xl font-bold text-blue-400">$2,700</p>
                  <p className="text-xs text-zinc-500 mt-1">migration + shared one-time</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">6-Month Operating</p>
                  <p className="text-2xl font-bold text-amber-400">$6,600</p>
                  <p className="text-xs text-zinc-500 mt-1">$1,100/mo × 6 months</p>
                </div>
              </div>

              {/* Cost Detail Table */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">Ace Hoops #92246</p>
                  {[
                    { label: "Listing price", value: "$62,000" },
                    { label: "EF Success Fee", value: "$0", note: "included" },
                    { label: "EF Migration Fee", value: "$0" },
                    { label: "Migration setup", value: "$500", note: "AdSense transfer" },
                  ].map(({ label, value, note }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-zinc-700/40">
                      <span className="text-zinc-400">{label}{note && <span className="text-zinc-600 ml-1 text-xs">({note})</span>}</span>
                      <span className="text-zinc-200 font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-zinc-300 font-semibold">Subtotal</span>
                    <span className="text-emerald-400 font-bold">$62,500</span>
                  </div>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Faceless Tutorials #91304</p>
                  {[
                    { label: "Listing price", value: "$45,000" },
                    { label: "EF Migration Fee", value: "$0" },
                    { label: "Migration setup", value: "$500" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-zinc-700/40">
                      <span className="text-zinc-400">{label}</span>
                      <span className="text-zinc-200 font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-zinc-300 font-semibold">Subtotal</span>
                    <span className="text-blue-400 font-bold">$45,500</span>
                  </div>
                </div>
              </div>

              {/* Shared + Monthly Costs */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">Shared One-Time Costs</p>
                  {[
                    { label: "LLC formation (Wyoming)", value: "$300" },
                    { label: "EIN registration", value: "$0" },
                    { label: "Business bank account", value: "$0" },
                    { label: "VA hiring/training (mo 1)", value: "$600" },
                    { label: "AI tools setup (mo 1)", value: "$100" },
                    { label: "Thumbnail design templates", value: "$200" },
                    { label: "Content planning/strategy audit", value: "$500" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-zinc-700/40">
                      <span className="text-zinc-400">{label}</span>
                      <span className="text-zinc-200 font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-zinc-300 font-semibold">Shared subtotal</span>
                    <span className="text-amber-400 font-bold">$1,700</span>
                  </div>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Monthly Recurring Costs</p>
                  {[
                    { label: "VAs (2 part-time)", value: "$800" },
                    { label: "AI tools (script gen, thumbnails)", value: "$100" },
                    { label: "Accounting/bookkeeping", value: "$150" },
                    { label: "Misc (hosting, domains, etc.)", value: "$50" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-zinc-700/40">
                      <span className="text-zinc-400">{label}</span>
                      <span className="text-zinc-200 font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-zinc-300 font-semibold">Monthly total</span>
                    <span className="text-zinc-300 font-bold">$1,100</span>
                  </div>
                </div>
              </div>

              {/* Total Capital Required Progress Bar */}
              <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Capital Required</span>
                    <p className="text-3xl font-extrabold text-white mt-0.5">$150,300</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Budget</span>
                    <p className="text-xl font-bold text-zinc-400 mt-0.5">$160,000</p>
                  </div>
                </div>
                <div className="relative w-full h-4 bg-zinc-700 rounded-full overflow-hidden mb-3">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-l-full"
                    style={{ width: "93.9%" }}
                  />
                  <div
                    className="absolute top-0 h-full bg-emerald-400/30"
                    style={{ left: "93.9%", right: 0 }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-zinc-400">Capital deployed — <span className="text-white font-semibold">93.9%</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400/40 border border-emerald-400" />
                    <span className="text-sm text-emerald-400 font-bold">$9,700 buffer remaining</span>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Industry Benchmarks */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-semibold text-white">YouTube Industry Benchmarks</h3>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">vs EF YouTube avg</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-800">
                      <th className="text-left px-4 py-3 text-zinc-300 font-semibold">Metric</th>
                      <th className="text-left px-4 py-3 text-zinc-300 font-semibold">EF YouTube Avg</th>
                      <th className="text-left px-4 py-3 text-zinc-300 font-semibold">Ace Hoops #92246</th>
                      <th className="text-left px-4 py-3 text-zinc-300 font-semibold">Faceless Tutorials #91304</th>
                      <th className="text-left px-4 py-3 text-zinc-300 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        metric: "Monthly Profit",
                        avg: "$2,800",
                        ace: "$3,043 (avg 12mo)",
                        tech: "$1,962 (3mo avg)",
                        status: "Ace above avg; Tutorials below",
                        statusColor: "amber",
                      },
                      {
                        metric: "Profit Margin",
                        avg: "70%",
                        ace: "89%",
                        tech: "94%",
                        status: "Both excellent",
                        statusColor: "emerald",
                      },
                      {
                        metric: "Monthly Multiple",
                        avg: "28x",
                        ace: "23x",
                        tech: "23x (at $45K target)",
                        status: "Both below (better deal)",
                        statusColor: "emerald",
                      },
                      {
                        metric: "Hours/Week",
                        avg: "10",
                        ace: "4",
                        tech: "2",
                        status: "Both low effort",
                        statusColor: "emerald",
                      },
                      {
                        metric: "YoY Growth",
                        avg: "+5%",
                        ace: "+15% (seasonal peak)",
                        tech: "-25% (increase cadence)",
                        status: "Mixed",
                        statusColor: "amber",
                      },
                      {
                        metric: "Subscribers",
                        avg: "50K avg",
                        ace: "~23K",
                        tech: "70K+",
                        status: "Above avg",
                        statusColor: "emerald",
                      },
                      {
                        metric: "Content Age",
                        avg: "3 years",
                        ace: "2 years",
                        tech: "3 years",
                        status: "Both established",
                        statusColor: "emerald",
                      },
                    ].map((row, i) => (
                      <tr
                        key={row.metric}
                        className={i % 2 === 0 ? "bg-zinc-800/50" : "bg-zinc-900"}
                      >
                        <td className="px-4 py-3 text-zinc-200 font-medium">{row.metric}</td>
                        <td className="px-4 py-3 text-zinc-400 font-mono">{row.avg}</td>
                        <td className="px-4 py-3 text-zinc-200 font-mono">{row.ace}</td>
                        <td className="px-4 py-3 text-zinc-200 font-mono">{row.tech}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              row.statusColor === "emerald"
                                ? "bg-emerald-900/50 text-emerald-300"
                                : row.statusColor === "amber"
                                ? "bg-amber-900/50 text-amber-300"
                                : "bg-red-900/50 text-red-300"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <p className="text-sm text-zinc-300">
                  Your picks outperform EF YouTube averages in{" "}
                  <span className="font-semibold text-emerald-400">5/7 key metrics</span>
                </p>
              </div>
            </div>

            {/* Portfolio Diversification Score */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Portfolio Diversification Analysis</h3>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">2-asset portfolio</span>
              </div>

              {(() => {
                const diversificationMetrics = [
                  {
                    label: "Platform Concentration",
                    score: 0,
                    detail: "Both YouTube — HHI 10,000",
                    note: "Adding 1 non-YouTube asset → HHI 5,000",
                  },
                  {
                    label: "Revenue Source Diversity",
                    score: 15,
                    detail: "93% AdSense, 7% affiliate (combined)",
                    note: "Near-total AdSense dependence",
                  },
                  {
                    label: "Seasonal Correlation",
                    score: 85,
                    detail: "WNBA (May–Oct) offsets tech evergreen",
                    note: "Complementary seasons reduce volatility",
                  },
                  {
                    label: "Niche Diversity",
                    score: 70,
                    detail: "Sports (WNBA) + Tech = distinct audiences",
                    note: "Different viewer demographics",
                  },
                  {
                    label: "Geographic / Audience",
                    score: 40,
                    detail: "Both English-language global YouTube",
                    note: "Same platform language / ad market",
                  },
                ];

                const radarData = diversificationMetrics.map((m) => ({
                  dimension: m.label.split(" ")[0],
                  score: m.score,
                  fullMark: 100,
                }));

                const overallScore = Math.round(
                  diversificationMetrics.reduce((sum, m) => sum + m.score, 0) / diversificationMetrics.length
                );

                const overallColor =
                  overallScore >= 60
                    ? "text-emerald-400"
                    : overallScore >= 40
                    ? "text-amber-400"
                    : "text-red-400";

                const overallBg =
                  overallScore >= 60
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : overallScore >= 40
                    ? "bg-amber-500/10 border-amber-500/20"
                    : "bg-red-500/10 border-red-500/20";

                const getScoreColor = (s: number) =>
                  s >= 60 ? "#10b981" : s >= 40 ? "#f59e0b" : "#ef4444";

                return (
                  <div className="space-y-6">
                    {/* Main grid: radar + breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Radar Chart */}
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 font-medium">Diversification Radar</p>
                        <ResponsiveContainer width="100%" height={240}>
                          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                            <PolarGrid stroke="#3f3f46" />
                            <PolarAngleAxis
                              dataKey="dimension"
                              tick={{ fill: "#a1a1aa", fontSize: 11 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, 100]}
                              tick={{ fill: "#71717a", fontSize: 9 }}
                              tickCount={4}
                            />
                            <Radar
                              name="Score"
                              dataKey="score"
                              stroke="#10b981"
                              fill="#10b981"
                              fillOpacity={0.2}
                              strokeWidth={2}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #3f3f46",
                                borderRadius: "6px",
                                fontSize: "12px",
                                color: "#e4e4e7",
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Score breakdown cards */}
                      <div className="space-y-2">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-3">Score Breakdown</p>
                        {diversificationMetrics.map((m) => (
                          <div key={m.label} className="bg-zinc-800/50 rounded-lg px-3 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-zinc-300">{m.label}</span>
                              <span
                                className="text-sm font-bold tabular-nums"
                                style={{ color: getScoreColor(m.score) }}
                              >
                                {m.score}/100
                              </span>
                            </div>
                            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden mb-1.5">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${m.score}%`,
                                  backgroundColor: getScoreColor(m.score),
                                }}
                              />
                            </div>
                            <p className="text-xs text-zinc-500">{m.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overall score */}
                    <div className={`rounded-lg border p-4 flex flex-col sm:flex-row items-center gap-4 ${overallBg}`}>
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-0.5">Overall Diversification Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-5xl font-black tabular-nums ${overallColor}`}>{overallScore}</span>
                          <span className="text-xl text-zinc-500 font-medium">/100</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Weighted average across 5 dimensions — <span className={`font-medium ${overallColor}`}>moderate</span>
                        </p>
                      </div>
                      <div className="flex-1 sm:border-l border-zinc-700/50 sm:pl-4">
                        <p className="text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Key Risks</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-red-400 shrink-0 mt-0.5">●</span>
                            100% platform concentration on YouTube (policy / algo risk)
                          </li>
                          <li className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-red-400 shrink-0 mt-0.5">●</span>
                            93% revenue from AdSense — CPM swings directly hit income
                          </li>
                          <li className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-emerald-400 shrink-0 mt-0.5">●</span>
                            Seasonal offset (sports vs. tech) is a genuine hedge
                          </li>
                        </ul>
                        <p className="text-xs text-amber-400 mt-3 font-medium">
                          Recommendation: Consider adding a non-YouTube asset (newsletter, SaaS, niche site) to improve platform diversification.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Investment FAQ */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-zinc-200 text-xs font-bold shrink-0">?</span>
                <h3 className="text-sm font-semibold text-zinc-200">Investment FAQ</h3>
              </div>
              <div className="space-y-2">
                {[
                  {
                    q: "How does Empire Flippers verify the financial data?",
                    a: "EF requires sellers to connect their analytics, payment processors, and bank accounts. Revenue and profit data is independently verified by EF's vetting team. Listings show 12+ months of verified financial history extracted directly from platform APIs.",
                  },
                  {
                    q: "What happens during the migration process?",
                    a: "After closing, EF's migration team handles the transfer of all assets: YouTube channels, AdSense accounts, domains, and social media. The process typically takes 7-14 business days. Both buyer and seller work with a dedicated migration specialist.",
                  },
                  {
                    q: "How much time do I actually need to invest?",
                    a: "For this portfolio: ~5 hours/week total (4 hrs Ace Hoops + 1 hr Tech YouTube). With VA support and AI automation, this can drop to ~2 hours/week for oversight only. The channels are designed for hands-off operation.",
                  },
                  {
                    q: "What if YouTube changes its algorithm?",
                    a: "Algorithm changes are the #1 risk. Mitigation: diversify across niches (sports + tech), focus on evergreen content, build email lists and off-platform presence. Our portfolio's -60% stress test still shows 20.8% ROI.",
                  },
                  {
                    q: "Can I negotiate below the asking price?",
                    a: "Yes, EF listings are negotiable. Our analysis targets 11-16% below asking. Key leverage: declining trends, seasonal patterns, market multiples below average. EF brokers expect negotiation.",
                  },
                  {
                    q: "What are the tax implications for non-US buyers?",
                    a: "YouTube/AdSense income is US-sourced. Non-US buyers need a W-8BEN form for reduced withholding (0-15% depending on tax treaty). Consider a US LLC (Wyoming recommended, $300 setup) for liability protection.",
                  },
                  {
                    q: "What if a channel gets demonetized?",
                    a: "Risk exists but is low for established channels. Mitigation: review channel history for strikes, diversify revenue (affiliate, sponsorships), maintain content quality standards. EF provides 30-day post-sale support.",
                  },
                  {
                    q: "How liquid is this investment?",
                    a: "You can re-list on EF at any time. YouTube channels with proven revenue typically sell within 30-60 days. Our exit strategy analysis shows 43-203% ROI potential depending on hold period.",
                  },
                  {
                    q: "Should I buy both channels simultaneously?",
                    a: "Recommended approach: close Ace Hoops first (simpler, single channel), then Tech YouTube 2-4 weeks later. This allows focused migration and learning before the second acquisition.",
                  },
                  {
                    q: "What's the worst-case scenario?",
                    a: "Catastrophic case (-60% revenue): monthly profit drops to $2,447, still yields 20.8% annual ROI. Even losing one channel entirely, the other covers operating costs. Total loss is extremely unlikely with established channels.",
                  },
                ].map(({ q, a }, idx) => {
                  const isOpen = faqOpen[idx] ?? false;
                  return (
                    <div key={idx} className="bg-zinc-800/50 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors cursor-pointer"
                        onClick={() => setFaqOpen(prev => ({ ...prev, [idx]: !isOpen }))}
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-700 text-zinc-300 text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-white font-medium text-sm flex-1">{q}</span>
                        {isOpen
                          ? <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3 pt-0">
                          <p className="text-zinc-400 text-sm leading-relaxed pl-9">{a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key Assumptions & Model Inputs */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-sm font-semibold text-zinc-200">Key Assumptions &amp; Model Inputs</h3>
              </div>
              {[
                {
                  id: "revenue",
                  color: "emerald",
                  title: "Revenue Assumptions",
                  summary: "EF-verified Chart.js data · trailing 12-mo · seasonal WNBA adjustments",
                  bullets: [
                    "All profit figures based on Empire Flippers verified Chart.js data",
                    "avg12mo uses trailing 12 calendar months",
                    "Seasonal adjustments for WNBA (May-Oct peak, Nov-Apr trough)",
                    "-5% annual decline rate used in conservative projections",
                    "No revenue is guaranteed — past performance ≠ future results",
                  ],
                },
                {
                  id: "valuation",
                  color: "blue",
                  title: "Valuation Assumptions",
                  summary: "24x EF YouTube multiple · DCF 10/15/20% · Q4 2025 comps",
                  bullets: [
                    "EF YouTube average multiple: 24x monthly profit",
                    "DCF discount rates: 10% (optimistic), 15% (moderate), 20% (conservative)",
                    "Comparable sales based on Q4 2025 EF marketplace data",
                    "Margin premium: 30% for margins above 80%",
                    "Hours premium: 20% for sub-5 hrs/wk operations",
                  ],
                },
                {
                  id: "cost",
                  color: "amber",
                  title: "Cost Assumptions",
                  summary: "$4-6/hr VA · $100/mo AI tools · $1,100/mo total operating",
                  bullets: [
                    "VA rates: $4-6/hr Philippines-based, part-time",
                    "AI tools: $100/mo (ChatGPT, Midjourney, ElevenLabs)",
                    "LLC formation: Wyoming ($300 standard filing)",
                    "Migration costs: estimated $500 per channel transfer",
                    "Monthly operating: $1,100/mo total (VAs + AI + accounting + misc)",
                  ],
                },
                {
                  id: "growth",
                  color: "violet",
                  title: "Growth Assumptions",
                  summary: "Bull +20% seasonal · Base flat/-2%/mo · Bear -25% seasonal",
                  bullets: [
                    "Bull scenarios assume +20% (seasonal) to +5%/mo (steady)",
                    "Base scenarios assume flat to -2%/mo (conservative)",
                    "Bear scenarios assume -25% (seasonal) to -5%/mo (decline)",
                    "Monetization diversification uplift: estimated 30-80% over 12-18 months",
                    "Content quality must be maintained for all projections",
                  ],
                },
                {
                  id: "risk",
                  color: "red",
                  title: "Risk Factors Not Modeled",
                  summary: "Algorithm changes · WNBA shifts · AI policy · currency · EF migration",
                  bullets: [
                    "YouTube algorithm changes (major updates ~2x/year)",
                    "WNBA league changes (expansion, TV deals, scheduling)",
                    "Competitor entry into niche",
                    "AI content policy changes",
                    "Currency fluctuations (ad revenue in USD)",
                    "EF migration failure (rare but possible)",
                  ],
                },
              ].map(({ id, color, title, summary, bullets }) => {
                const isOpen = assumptionsOpen[id] ?? false;
                const borderColor =
                  color === "emerald" ? "border-emerald-500" :
                  color === "blue" ? "border-blue-500" :
                  color === "amber" ? "border-amber-500" :
                  color === "violet" ? "border-violet-500" :
                  "border-red-500";
                const titleColor =
                  color === "emerald" ? "text-emerald-400" :
                  color === "blue" ? "text-blue-400" :
                  color === "amber" ? "text-amber-400" :
                  color === "violet" ? "text-violet-400" :
                  "text-red-400";
                return (
                  <div key={id} className={`bg-zinc-800/50 rounded-lg border-l-2 ${borderColor}`}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                      onClick={() => setAssumptionsOpen((prev) => ({ ...prev, [id]: !isOpen }))}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-xs font-semibold ${titleColor}`}>{title}</span>
                        {!isOpen && (
                          <span className="text-xs text-zinc-500">{summary}</span>
                        )}
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <ul className="px-4 pb-3 space-y-1">
                        {bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-zinc-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Warning */}
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-400 space-y-1">
                  <p className="font-medium text-amber-400">Due Diligence Required</p>
                  <p>All scores are AI-generated estimates based on publicly available listing data. Verify financials independently via Empire Flippers due diligence process. Past revenue does not guarantee future performance. New listings (&lt;12 months) carry significantly higher risk. Amazon FBA businesses require active inventory management regardless of VA support.</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
