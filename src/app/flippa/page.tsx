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
  BadgeCheck,
  Tag,
} from "lucide-react";
import type { FlippaListing } from "@/data/flippa-listings";
import { flippaExpertAssessments } from "@/data/flippa-expert-assessments";

const UPDATED_AT = "March 26, 2026";
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
  app: "App",
  newsletter: "Newsletter",
};

const PIE_COLORS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16",
  "#0ea5e9", "#a855f7", "#22d3ee", "#fb923c",
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

function ProgressBar({ value }: { value: number }) {
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

function RecBadge({ rec }: { rec: FlippaListing["recommendation"] }) {
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

function VerificationBadge({ status }: { status: FlippaListing["verificationStatus"] }) {
  const style =
    status === "verified" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
    status === "partial" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
    "bg-red-500/20 text-red-400 border border-red-500/30";
  const label =
    status === "verified" ? "Verified" :
    status === "partial" ? "Partial" :
    "Unverified";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${style}`}>
      <BadgeCheck className="w-3 h-3" />
      {label}
    </span>
  );
}

function ListingTypeBadge({ type }: { type: FlippaListing["listingType"] }) {
  const style =
    type === "buy_now" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
    type === "auction" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
    "bg-zinc-600/40 text-zinc-300 border border-zinc-600/40";
  const label =
    type === "buy_now" ? "Buy Now" :
    type === "auction" ? "Auction" :
    "Make Offer";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${style}`}>
      <Tag className="w-3 h-3" />
      {label}
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

function TopPickCard({ listing }: { listing: FlippaListing }) {
  const roi = annualRoi(listing.price ?? null, listing.monthlyProfit ?? 0);
  return (
    <div className="bg-zinc-800 border border-emerald-500/30 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-mono text-zinc-500">#{listing.id}</span>
            <RecBadge rec={listing.recommendation} />
            {listing.aiManageable && (
              <span className="flex items-center gap-1 text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                <Bot className="w-3 h-3" /> AI+VA Ready
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <VerificationBadge status={listing.verificationStatus} />
            {listing.verifiedPnL ? (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">P&amp;L Verified</span>
            ) : (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-zinc-700/50 text-zinc-500 border border-zinc-600/30">P&amp;L Unverified</span>
            )}
            <ListingTypeBadge type={listing.listingType} />
          </div>
          <h3 className="text-white font-semibold text-base leading-tight">{listing.niche}</h3>
          <span className="text-xs text-zinc-500">{CAT_LABELS[listing.category ?? ""] ?? listing.category}</span>
        </div>
        <a
          href={`https://flippa.com/${listing.id}`}
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
          <div className="text-sm font-bold text-white">{fmt(listing.price ?? null)}</div>
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

      <div className="space-y-1.5">
        <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">Scores</div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><Bot className="w-3 h-3 inline mr-1" />Autonomy</span>
          <ProgressBar value={listing.autonomyScore} />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><ShieldCheck className="w-3 h-3 inline mr-1" />Risk</span>
          <ProgressBar value={listing.riskScore} />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><TrendingUp className="w-3 h-3 inline mr-1" />ROI</span>
          <ProgressBar value={listing.roiScore} />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 text-zinc-400 shrink-0"><Leaf className="w-3 h-3 inline mr-1" />Evergreen</span>
          <ProgressBar value={listing.evergreenScore} />
        </div>
        <div className="flex items-center gap-2 text-xs mt-1 pt-1 border-t border-zinc-700">
          <span className="w-20 text-zinc-300 font-semibold shrink-0"><Star className="w-3 h-3 inline mr-1" />Overall</span>
          <ProgressBar value={listing.overallScore} />
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
        {listing.category === "app" && "Claude handles user support tickets. VA monitors reviews and app store listing. Updates handled by freelance developer as needed."}
        {listing.category === "newsletter" && "Claude writes weekly issues. VA manages subscriber list and sponsor outreach. Beehiiv/Substack automates delivery."}
      </div>

      <Link
        href={`/flippa/${listing.id}`}
        className="text-xs text-center text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg py-1.5 transition-colors"
      >
        View Full Analysis →
      </Link>
    </div>
  );
}

type SortDir = "desc" | "asc";

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

export default function FlippaPage() {
  const [listings, setListings] = useState<FlippaListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [caixaProps, setCaixaProps] = useState<CaixaProp[]>([]);
  const [filterRec, setFilterRec] = useState<string>("all");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [sortKey, setSortKey] = useState<SortKey>("overallScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/api/flippa?status=all", { credentials: "include" })
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
      const av = (a[sortKey as keyof FlippaListing] as number | null) ?? -Infinity;
      const bv = (b[sortKey as keyof FlippaListing] as number | null) ?? -Infinity;
      return sortDir === "desc" ? bv - av : av - bv;
    });
    return l;
  }, [listings, filterRec, filterCat, filterStatus, sortKey, sortDir]);

  const topPicks = useMemo(
    () => listings.filter((l) => l.recommendation === "top_pick" && l.status !== "sold"),
    [listings]
  );
  const verifiedTopPicks = topPicks.filter(l => l.verifiedPnL);
  const unverifiedTopPicks = topPicks.filter(l => !l.verifiedPnL);
  const manageable = listings.filter((l) => l.aiManageable);
  const activeListings = listings.filter((l) => l.status === "active" || l.status === "auction");
  const beatSelicCount = useMemo(() => {
    return activeListings.filter((l) => l.price && l.price <= BUDGET_USD && (annualRoi(l.price, l.monthlyProfit) ?? 0) > 14.25).length;
  }, [activeListings]);
  const avgRoi = useMemo(() => {
    const valid = manageable.filter((l) => l.price && l.price <= BUDGET_USD && (l.status === "active" || l.status === "auction"));
    if (!valid.length) return 0;
    const sum = valid.reduce((acc, l) => acc + (annualRoi(l.price, l.monthlyProfit) ?? 0), 0);
    return sum / valid.length;
  }, [manageable]);
  const bestRoi = useMemo(() => {
    const valid = activeListings.filter((l) => l.price && l.price <= BUDGET_USD);
    if (!valid.length) return null;
    return valid.reduce((best, l) => {
      const r = annualRoi(l.price, l.monthlyProfit) ?? 0;
      const br = annualRoi(best.price, best.monthlyProfit) ?? 0;
      return r > br ? l : best;
    }, valid[0]);
  }, [activeListings]);

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
    listings.filter((l) => l.status !== "sold").forEach((l) => {
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
            Flippa Marketplace Analysis
          </h1>
          <p className="text-xs text-zinc-500">
            Last Updated: {UPDATED_AT} | Data from Flippa.com marketplace | Budget: $160K USD
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
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Analysis Status</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">{listings.length} Listings Analyzed</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Flippa Deal Sourcing — {topPicks.length > 0 ? `${topPicks.length} Top Pick${topPicks.length > 1 ? "s" : ""} (${verifiedTopPicks.length} verified, ${unverifiedTopPicks.length} pending due diligence)` : "No Top Picks in Budget"}
                  </h2>
                  <p className="text-sm text-zinc-400 max-w-3xl">
                    {topPicks.length > 0
                      ? <>Screened {listings.length} active Flippa listings. Found <span className="text-emerald-400 font-semibold">{verifiedTopPicks.length} verified</span> and <span className="text-amber-400 font-semibold">{unverifiedTopPicks.length} unverified top picks</span> within $160K budget. Best ROI: <span className="text-emerald-400 font-semibold">{bestRoi ? `${annualRoi(bestRoi.price, bestRoi.monthlyProfit)?.toFixed(0)}%/yr` : "—"}</span> on #{bestRoi?.id}. Unverified picks need P&amp;L verification before closing — request Stripe/PayPal exports or bank statements.</>
                      : <>Screened {listings.length} Flippa listings. No listings met all top-pick criteria (score ≥75 + AI manageable + ≤$160K). <span className="text-amber-400 font-semibold">{listings.filter(l => l.recommendation === "strong").length} Strong picks</span> available as alternatives. Target: SaaS, Newsletter, Content/Ads with recurring revenue.</>
                    }
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="text-3xl font-bold text-white">$160K<span className="text-base text-zinc-400 font-normal"> budget</span></div>
                  <div className="text-xs text-emerald-400">Total acquisition budget (USD)</div>
                  <div className="text-xs text-zinc-500">Multiple assets possible if under $80K each</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Target ROI</div>
                  <div className="text-base font-bold text-white">&gt;35%/yr</div>
                  <div className="text-xs text-zinc-500">Minimum annual return threshold</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Preferred Multiple</div>
                  <div className="text-base font-bold text-blue-400">25–40×</div>
                  <div className="text-xs text-zinc-500">Monthly profit multiple range</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Verification Required</div>
                  <div className="text-base font-bold text-emerald-400">Verified / Partial</div>
                  <div className="text-xs text-zinc-500">No unverified financials</div>
                </div>
                <div className="bg-zinc-900/60 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-0.5">Owner Time Target</div>
                  <div className="text-base font-bold text-violet-400">&lt;10 hrs/wk</div>
                  <div className="text-xs text-zinc-500">AI scripts + VA handles operations</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 mb-2">Must-Have Criteria</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="flex gap-1.5"><span className="text-emerald-400 shrink-0">✓</span>Verified or partial financials (no unverified only)</li>
                    <li className="flex gap-1.5"><span className="text-emerald-400 shrink-0">✓</span>AI+VA manageable — no heavy personal brand dependency</li>
                    <li className="flex gap-1.5"><span className="text-emerald-400 shrink-0">✓</span>Business age &gt;12 months with stable revenue trend</li>
                    <li className="flex gap-1.5"><span className="text-emerald-400 shrink-0">✓</span>Price within $160K budget (single or combined)</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-400 mb-2">Red Flags to Avoid</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="flex gap-1.5"><span className="text-red-400 shrink-0">!</span>Declining revenue trend last 3 months</li>
                    <li className="flex gap-1.5"><span className="text-red-400 shrink-0">!</span>Single-platform dependency (e.g., &gt;80% one traffic source)</li>
                    <li className="flex gap-1.5"><span className="text-red-400 shrink-0">!</span>Personal brand or face-based channel</li>
                    <li className="flex gap-1.5"><span className="text-red-400 shrink-0">!</span>Overpriced multiple (&gt;45×) on declining metrics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* KPI Cards */}
            <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <KpiCard
                label="Total Analyzed"
                value={String(listings.length)}
                sub="Flippa listings"
                icon={BarChart2}
                color="zinc"
              />
              <KpiCard
                label="AI+VA Manageable"
                value={String(manageable.length)}
                sub={listings.length > 0 ? `${Math.round(manageable.length / listings.length * 100)}% of all listings` : "—"}
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
                label="Best ROI (≤$160K)"
                value={bestRoi ? `${annualRoi(bestRoi.price, bestRoi.monthlyProfit)?.toFixed(0)}%` : "—"}
                sub={bestRoi ? `#${bestRoi.id} — ${fmt(bestRoi.price)}` : "No in-budget listings"}
                icon={TrendingUp}
                color="blue"
              />
              <KpiCard
                label="Avg ROI (≤$160K)"
                value={avgRoi > 0 ? `${avgRoi.toFixed(0)}%` : "—"}
                sub="AI+VA manageable, in-budget"
                icon={DollarSign}
                color="amber"
              />
              <KpiCard
                label="Beat Selic (14.25%)"
                value={`${beatSelicCount} listings`}
                sub={`Of ≤$160K budget — avg ${avgRoi > 0 ? `${avgRoi.toFixed(0)}%` : "—"} ROI`}
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
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">Flippa Online Business</div>
                  <div className="text-lg font-bold text-white">$160K invested</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-emerald-400 font-medium">→ ~$4-7K/month cash flow (target)</li>
                    <li>Annual ROI: ~35-52%</li>
                    <li>VA cost: ~$500/month</li>
                    <li className="text-amber-400">Risk: Medium-high</li>
                    <li className="text-amber-400">Platform dependency risk</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Real Estate (Caixa)</div>
                  <div className="text-lg font-bold text-white">$160K invested (≈ R$928K)</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-amber-400 font-medium">→ ~R$5,000-8,000/month rental (gross)</li>
                    <li>Buy at 30-60% below market value</li>
                    <li className="text-emerald-400">Capital gains: flip for R$200-400K profit (6-12mo)</li>
                    <li>Annual yield: 7-9% rental + 30-60% capital gains</li>
                    <li className="text-emerald-400">Risk: Lower (tangible asset, auction discount)</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Split Strategy (Recommended)</div>
                  <div className="text-lg font-bold text-white">$160K split</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-emerald-400 font-medium">$100K online biz + $60K property</li>
                    <li>Online: ~$3-4K/month cash flow</li>
                    <li className="text-emerald-400">Property flip: R$150-300K profit in 6-12mo</li>
                    <li>Property rental: ~R$2,000-3,000/month</li>
                    <li className="text-emerald-400">Diversified: cash flow + capital gains</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 border border-zinc-600 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Selic Benchmark</div>
                  <div className="text-lg font-bold text-white">14.25% p.a.</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>$160K → ~$1,900/month</li>
                    <li>Zero effort, risk-free rate</li>
                    <li className="text-amber-400">Online biz must beat this by 2–3×</li>
                    <li>Mar 2025 Selic rate</li>
                    <li className="text-zinc-500">BRL-denominated only</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Portfolio Scenarios */}
            <section>
              <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Portfolio Options — $160K Budget Scenarios
              </h2>
              <p className="text-xs text-zinc-500 mb-3">
                Based on {listings.length} screened listings. Flippa allows direct seller contact for more aggressive negotiation than broker platforms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {/* Option A */}
                <div className="bg-zinc-800 border border-emerald-500/60 rounded-xl p-4 space-y-2 ring-1 ring-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Option A — Best Verified Pick</div>
                    <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded-full">Recommended</span>
                  </div>
                  <div className="text-sm font-semibold text-white">#11721372 — Food & Drink Marketplace ($124K)</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li className="text-emerald-400 font-medium">• Only listing with CV=10% — profit £6.2K–£8.9K every month</li>
                    <li>• Revenue growing +12% over 12 verified months</li>
                    <li>• 8yr old, 125+ vendors, 25K+ customers, 50% repeat rate</li>
                    <li>• 71.5% annual ROI at asking price — with verified data</li>
                    <li className="text-zinc-500">• Leaves ~$36K reserve from $160K budget</li>
                  </ul>
                </div>

                {/* Option B */}
                <div className="bg-zinc-800 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Option B — Split: Verified + Unverified</div>
                    <span className="text-xs bg-amber-900/40 text-amber-300 px-2 py-0.5 rounded-full">Diversified</span>
                  </div>
                  <div className="text-sm font-semibold text-white">#11721372 ($124K) + Small Unverified Pick</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Anchor: #11721372 Food Marketplace (verified, £7.4K/mo)</li>
                    <li>• Add: #12265554 KDP Account ($89K, growing +44%) — but ask for P&amp;L earnout</li>
                    <li className="text-amber-400 font-medium">Combined cost: $213K — over budget unless negotiate</li>
                    <li>• Negotiate #11721372 to $110K (8% discount) = $199K total</li>
                    <li className="text-zinc-500">• Only viable if seller accepts lower price</li>
                  </ul>
                </div>

                {/* Option C */}
                <div className="bg-zinc-800 border border-zinc-600 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Option C — Wait for Better Data</div>
                    <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">Patience play</span>
                  </div>
                  <div className="text-sm font-semibold text-white">Hold Cash, Watch 3 Listings</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Watch #12265554 KDP ($89K) — growing but volatile, wait 2 more months</li>
                    <li>• Watch #12300985 Exam Publishing ($120K) — needs 2 more months to confirm avg</li>
                    <li className="text-blue-400 font-medium">No unverified listing is worth buying at face value</li>
                    <li>• 46 listings have ZERO monthly P&L data — all are seller-claimed averages</li>
                    <li className="text-zinc-500">• Only 8 of 85 listings have real verified monthly data</li>
                  </ul>
                </div>

                {/* Decision Summary */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-2 md:col-span-2 xl:col-span-3">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Key Findings from Verified P&L Analysis</div>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li className="flex gap-2"><span className="text-emerald-400">✓</span><span><span className="text-white">#11721372 is the only true low-risk pick</span>: CV=10%, growing, no loss months, verified 12 months</span></li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span><span><span className="text-white">5 of 8 verified listings have declining revenue</span> — #12016298 (-71%), #12266888 (-58%), #12021962 (-44%), #12275568 (-39%), #12021962 (-44%)</span></li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span><span>#12225207 had a LOSS MONTH and a one-off spike inflating its "£5K/mo" claim — real business is £1-2K/mo</span></li>
                    <li className="flex gap-2"><span className="text-amber-400">!</span><span>46+ listings have NO monthly P&amp;L breakdown — only seller-claimed averages. Do not trust those numbers.</span></li>
                    <li className="flex gap-2"><span className="text-amber-400">!</span><span>Always request 12 months of verified bank statements or Stripe/PayPal exports before closing any deal</span></li>
                    <li className="flex gap-2"><span className="text-blue-400">i</span><span>Negotiate: Flippa direct sellers accept 10-20% below ask — especially for listings 90+ days on market</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Top Picks */}
            {topPicks.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-400" />
                  Top Picks
                  <span className="text-xs text-zinc-500 font-normal">({topPicks.length} candidates)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {topPicks.map((l) => (
                    <TopPickCard key={l.id} listing={l} />
                  ))}
                </div>
              </section>
            )}

            {/* Expert Analysis — only show if non-empty */}
            {flippaExpertAssessments.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  Expert Investment Analysis
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {flippaExpertAssessments.filter((a) => a.verdictColor !== "red").map((a) => {
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
                                href={`/flippa/${a.id}`}
                                className="text-sm font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                              >
                                #{a.id}
                              </Link>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${verdictBg}`}>{a.verdict}</span>
                            </div>
                            <Link href={`/flippa/${a.id}`} className="hover:text-zinc-300 transition-colors">
                              <h3 className="text-white font-semibold text-base leading-tight">{a.name}</h3>
                            </Link>
                          </div>
                          <a
                            href={`https://flippa.com/${a.id}`}
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
                        <div className="grid grid-cols-2 gap-3">
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
            )}

            {/* Caixa vs Online Business Comparison */}
            {caixaProps.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Real Estate vs Online Business — Side-by-Side
                </h2>
                <p className="text-xs text-zinc-500 mb-3">
                  Top Caixa Imóveis RS properties (by score) vs Flippa online business finalists. Rental yields estimated at 0.55%/mo of market value, net of vacancy 8.3%, admin 10%, IPTU+maint 1%/yr. Acquisition includes ITBI+registro (~4–4.5%). Rate: R$5.80/USD.
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
                      {/* Online Business Finalists */}
                      {flippaExpertAssessments.filter((a) => a.verdictColor !== "red").map((a, i) => {
                        const roiNum = parseFloat(a.annualROI.replace("%", ""));
                        const isAmber = a.verdictColor === "amber";
                        return (
                          <tr key={a.id} className={`${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} border-b border-zinc-800`}>
                            <td className="px-3 py-2 font-medium text-white">
                              <a href={`https://flippa.com/${a.id}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
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
                      <li className="flex gap-1.5"><span className="text-emerald-500 shrink-0">+</span>3–5× higher annual ROI (35–52% vs 7–11%)</li>
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
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Flippa verification varies — extra due diligence needed</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Revenue can drop to zero — no floor value</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">!</span>Shorter track records (12–24 months typical)</li>
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
                  <div className="text-sm font-medium text-zinc-300 mb-3">Listings by Category</div>
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

            {/* All Listings Table */}
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
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500"
                  >
                    <option value="active">Active Only</option>
                    <option value="auction">Auction</option>
                    <option value="under_offer">Under Offer</option>
                    <option value="sold">Sold</option>
                    <option value="all">All Statuses</option>
                  </select>
                  <select
                    value={filterRec}
                    onChange={(e) => setFilterRec(e.target.value)}
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500"
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
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(CAT_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-zinc-800 border-b border-zinc-700">
                      {([
                        ["ID", null],
                        ["Niche", null],
                        ["Monetization", null],
                        ["Age", null],
                        ["Verification", null],
                        ["Type", null],
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
                      const isSold = l.status === "sold";
                      return (
                        <tr
                          key={l.id}
                          className={`${rowBg} border-b border-zinc-800 hover:bg-zinc-800/60 transition-colors ${
                            isSold ? "opacity-50" : ""
                          }`}
                        >
                          <td className="px-3 py-2 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Link
                                href={`/flippa/${l.id}`}
                                className="text-zinc-300 hover:text-white font-mono transition-colors"
                              >
                                {l.id}
                              </Link>
                              <a
                                href={`https://flippa.com/${l.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-600 hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            {isSold && (
                              <span className="text-zinc-600 block text-[10px]">sold</span>
                            )}
                          </td>
                          <td className="px-3 py-2 max-w-[140px]">
                            <Link
                              href={`/flippa/${l.id}`}
                              className="text-zinc-200 hover:text-white transition-colors truncate block"
                              title={l.niche}
                            >
                              {l.niche}
                            </Link>
                            <div className="text-zinc-600 text-[10px]">{CAT_LABELS[l.category] ?? l.category}</div>
                          </td>
                          <td className="px-3 py-2 text-zinc-400 max-w-[120px]">
                            <div className="truncate" title={l.monetization}>{l.monetization}</div>
                          </td>
                          <td className="px-3 py-2 text-zinc-400">
                            {age}y
                          </td>
                          <td className="px-3 py-2">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                              l.verificationStatus === "verified" ? "bg-emerald-500/20 text-emerald-400" :
                              l.verificationStatus === "partial" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            }`}>
                              {l.verificationStatus === "verified" ? "Verified" :
                               l.verificationStatus === "partial" ? "Partial" : "Unverified"}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                              l.listingType === "buy_now" ? "bg-blue-500/20 text-blue-400" :
                              l.listingType === "auction" ? "bg-orange-500/20 text-orange-400" :
                              "bg-zinc-600/40 text-zinc-300"
                            }`}>
                              {l.listingType === "buy_now" ? "Buy Now" :
                               l.listingType === "auction" ? "Auction" : "Offer"}
                            </span>
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
                            <RecBadge rec={l.recommendation} />
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

            {/* Due Diligence Warning */}
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-400 space-y-1">
                  <p className="font-medium text-amber-400">Due Diligence Required</p>
                  <p>All scores are AI-generated estimates based on publicly available listing data from Flippa.com. Verify financials independently — request bank statements, Google Analytics access, and seller documentation before any offer. Flippa verification badges do not guarantee revenue accuracy. Past revenue does not guarantee future performance. New listings (&lt;12 months) carry significantly higher risk. Always negotiate a 30–60 day earnout clause. SaaS and app businesses may require technical handover — confirm with seller before closing.</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
