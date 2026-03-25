"use client";

import { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import type { EFListing } from "@/data/empire-flippers-listings";

const UPDATED_AT = "March 25, 2026 (23:10 update)";
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

function TopPickCard({ listing }: { listing: EFListing }) {
  const roi = annualRoi(listing.price, listing.monthlyProfit);
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

const EXPERT_ASSESSMENTS = [
  {
    id: "92105",
    name: "homemadegraceful.com",
    verdict: "STRONG BUY",
    verdictColor: "emerald",
    price: "$78,487",
    monthlyProfit: "$2,907",
    annualROI: "44%",
    trendProfit: "+44%",
    trendTraffic: "+206%",
    highlights: [
      "Fastest growing listing on the marketplace — profit up 44%, traffic up 206%",
      "100% profit margin — virtually zero operating costs",
      "Pinterest-driven traffic — diversified from Google algorithm risk",
      "Home/lifestyle niche is evergreen and AI can write all content",
      "Only 27x multiple — underpriced for a business growing this fast",
    ],
    risks: [
      "Only 18 months old — limited track record",
      "92% traffic from Pinterest — single platform dependency",
      "Requires 20hrs/week content creation (needs VA)",
      "Mediavine ad network has 50K sessions/month minimum requirement",
      "Registered in Vietnam — may complicate business transfer",
    ],
    recommendation: "Best growth opportunity on the marketplace. The 206% traffic growth is exceptional. Negotiate to $65-70K. Hire a VA (£400-500/mo) to handle content + Pinterest. AI writes all articles. Within 6 months this could be doing $4-5K/month if trends continue. Main risk is Pinterest algorithm dependency — mitigate by building email list and expanding to other social channels.",
    aiPlan: "Claude writes 3-5 blog posts per day on home decor, garden, lifestyle topics. VA creates Pinterest pins using Canva templates, schedules via Tailwind. Owner reviews analytics weekly (1hr). Total owner time: 2hrs/week.",
  },
  {
    id: "88055",
    name: "soberish.co",
    verdict: "BUY",
    verdictColor: "emerald",
    price: "$67,828",
    monthlyProfit: "$2,055",
    annualROI: "36%",
    trendProfit: "+15%",
    trendTraffic: "+21%",
    highlights: [
      "10-year-old blog (since 2016) — battle-tested through multiple Google updates",
      "GROWING 15% profit, 21% traffic — rare for an established site",
      "Diversified: display ads + affiliate + Amazon Associates (triple monetization)",
      "Balanced traffic: 40% organic search + 37% Pinterest + 20% direct",
      "Already has VA handling daily tasks — truly passive (4hrs/week owner)",
      "4,839 email subscribers + digital products included",
      "Health/wellness niche is evergreen and AI-friendly",
    ],
    risks: [
      "33x multiple is on the higher side for the profit level",
      "Sobriety niche is somewhat narrow — limited scaling potential",
      "Mediavine minimum traffic requirement could be a transfer issue",
      ".co domain (not .com) — slightly less authoritative",
    ],
    recommendation: "Best risk-adjusted investment. Growing AND established is the rarest combination. The existing VA means you can take over with minimal disruption. Offer $55-60K (20-25% below asking). The health/wellness content is perfect for AI writing. This is the safest pick for someone who wants reliable monthly cash flow with minimal effort.",
    aiPlan: "Existing VA continues daily operations. Claude writes new blog posts and updates old ones for SEO. VA manages Pinterest + email campaigns. Owner oversight: 2hrs/week checking analytics. Monetization can be expanded with digital courses written by AI.",
  },
  {
    id: "92295",
    name: "Alex Griffin YouTube",
    verdict: "SPECULATIVE BUY",
    verdictColor: "blue",
    price: "$95,209",
    monthlyProfit: "$5,289",
    annualROI: "66%",
    trendProfit: "NEW",
    trendTraffic: "1.7M views/mo",
    highlights: [
      "18x multiple = cheapest per-profit-dollar on the marketplace",
      "1.68M monthly views, 262K average views per video — massive engagement",
      "7:54 average watch time — exceptional for YouTube (high RPM)",
      "AI scripts already used — proven AI+VA workflow",
      "Full contractor team (editors, voiceover, thumbnails) willing to stay",
      "60.7K subs growing +4,346/month",
      "Clean copyright history despite commentary niche",
    ],
    risks: [
      "Only 16 months old — very limited track record",
      "72% Browse Features traffic — heavily algorithm-dependent",
      "100% YouTube AdSense — zero revenue diversification",
      "Family Guy commentary — niche could saturate or face copyright claims",
      "6hrs/week required — more than content sites",
      "Entertainment content is NOT evergreen — trends can shift quickly",
    ],
    recommendation: "Highest ROI potential but highest risk. At 18x you're getting $5.3K/month for $95K. The engagement metrics are genuinely impressive. BUT this is a bet on the YouTube algorithm continuing to favor this channel. Negotiate hard to $75-80K. If you buy, immediately diversify revenue: add sponsorships ($2-5K per video possible), affiliate links in descriptions, and expand to other animated shows. Don't put all your money here.",
    aiPlan: "Claude writes video scripts (already proven). Contractors handle editing, voiceover, thumbnails. Owner selects topics and does quality review (5-6hrs/week). Growth: expand to Simpsons, South Park, other animated shows for audience diversification.",
  },
  {
    id: "90449",
    name: "Quick Shift YouTube",
    verdict: "VALUE BUY",
    verdictColor: "blue",
    price: "$44,742",
    monthlyProfit: "$3,196",
    annualROI: "86%",
    trendProfit: "-5%",
    trendTraffic: "stable",
    highlights: [
      "14x multiple = absolute lowest on marketplace (86% annual ROI)",
      "4 years old — proven track record",
      "63K subscribers, 343 videos — substantial content library",
      "Team of 3 contractors with SOPs in place — turnkey operation",
      "Only $44K — affordable entry, leaves budget for other investments",
      "Automotive content has broad appeal",
    ],
    risks: [
      "Profit declining 5%, revenue declining 15% — negative trend",
      "Has received copyright strikes (won on appeal, but risky pattern)",
      "Car TV show commentary could face more copyright challenges",
      "58% Browse Features — algorithm-dependent",
      "Automotive entertainment niche may not be sustainable long-term",
    ],
    recommendation: "Best value play. At $44K this is almost disposable money relative to your budget. Even if it declines 20% you're still making $2,500/mo on a $44K investment. Buy at asking price (already cheap). Use it as a cash cow while you learn YouTube operations. Could pair with Alex Griffin for a 2-channel YouTube portfolio. The copyright strike history is the main concern — verify this thoroughly with the seller.",
    aiPlan: "Claude writes commentary scripts. Existing team of 3 (editor, scriptwriter, thumbnail) continues working via SOPs. Owner picks 1-2 topics per week. Total time: 4hrs/week. Revenue can be supplemented with affiliate links to car products.",
  },
  {
    id: "92391",
    name: "atlasandboots.com",
    verdict: "HOLD / NEGOTIATE",
    verdictColor: "amber",
    price: "$82,015",
    monthlyProfit: "$2,412",
    annualROI: "35%",
    trendProfit: "-6%",
    trendTraffic: "-28%",
    highlights: [
      "Award-winning travel blog established in 2014 (12 years old)",
      "Strong brand recognition and authority in outdoor travel niche",
      "Display advertising — passive income model",
      "34x multiple but profit is relatively stable (only -6%)",
      "Travel content is evergreen — people always travel",
    ],
    risks: [
      "Traffic declining 28% — concerning trend",
      "Profit only slightly down (-6%) suggesting RPM improvements offsetting traffic loss",
      "34x multiple is expensive for a declining business",
      "Google algorithm dependency for organic traffic",
      "AI-generated travel content may lack the personal touch that made this blog successful",
    ],
    recommendation: "Only worth it at a significant discount. The 28% traffic decline is a red flag. Offer $55-60K maximum (30% below asking). The brand has value and travel is evergreen, but you're buying a declining asset. If the seller won't negotiate significantly, walk away. There are better options. If purchased cheaply enough, AI can refresh old content and Pinterest can supplement declining Google traffic.",
    aiPlan: "Claude refreshes and expands existing travel content library. VA manages Pinterest and social media to diversify traffic sources away from Google. Owner oversight: 2hrs/week. Build email list aggressively to reduce platform dependency.",
  },
  {
    id: "90544",
    name: "Thrive Media YouTube",
    verdict: "SOLID BUY",
    verdictColor: "blue",
    price: "$93,608",
    monthlyProfit: "$3,900",
    annualROI: "50%",
    trendProfit: "stable",
    trendTraffic: "stable",
    highlights: [
      "3 YouTube channels — built-in diversification",
      "Only 1 hour/week owner involvement — most passive listing analyzed",
      "10,000+ video library — massive long-tail content moat",
      "85% profit margin",
      "YouTube Search traffic (not algorithm) — more stable than Browse",
      "Freelancer team manages everything — true absentee ownership",
      "Includes Spanish language channel — growth opportunity",
    ],
    risks: [
      "55-second average watch time — very short, low RPM potential",
      "Monthly views at 409K (main) — not spectacular for 36K subs",
      "Tech tutorial niche increasingly competed by AI tools (ChatGPT, Gemini)",
      "Last month profit ($3,428) slightly below average ($3,900)",
      "Registered in UAE — potential complications for UK/BR entities",
    ],
    recommendation: "Most passive option available. If you want to buy ONE business and barely think about it, this is it. The 1hr/week commitment is verified. The freelancer team does everything. Offer $80-85K. The risk is that AI tools (ChatGPT) may reduce demand for 'how to' tutorial videos over time, but the 10K video library provides a long-tail moat that's hard to replicate. The Spanish channel is an untapped growth lever — your Portuguese could help expand to a PT-BR channel too.",
    aiPlan: "Freelancers continue all video production autonomously. Claude can generate keyword research and content briefs. Owner reviews weekly analytics report (1hr/week). Growth: add Portuguese language channel leveraging existing content.",
  },
];

export default function InvestimentosOnlinePage() {
  const [listings, setListings] = useState<EFListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRec, setFilterRec] = useState<string>("all");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("for_sale");
  const [sortKey, setSortKey] = useState<SortKey>("overallScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/api/investimentos-online?status=all", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.listings) setListings(d.listings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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

  const topPicks = useMemo(
    () => listings.filter((l) => l.recommendation === "top_pick" && l.status !== "pending_sold"),
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

            {/* Top Picks */}
            {topPicks.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-400" />
                  Top Picks — AI+VA Manageable, Within Budget
                  <span className="text-xs text-zinc-500 font-normal">({topPicks.length} listings)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {topPicks.map((l) => (
                    <TopPickCard key={l.id} listing={l} />
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
                {EXPERT_ASSESSMENTS.map((a) => {
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
                            <span className="text-sm font-mono text-zinc-500">#{a.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${verdictBg}`}>{a.verdict}</span>
                          </div>
                          <h3 className="text-white font-semibold text-base leading-tight">{a.name}</h3>
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
                    className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-500"
                  >
                    <option value="for_sale">For Sale Only</option>
                    <option value="pending_sold">Pending Sold</option>
                    <option value="new_listing">New Listings</option>
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
                            <a
                              href={`https://app.empireflippers.com/listing/${l.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              {l.id}
                              <ExternalLink className="w-3 h-3 opacity-50" />
                            </a>
                            {isPending && (
                              <span className="text-zinc-600 block text-[10px]">pending</span>
                            )}
                          </td>
                          <td className="px-3 py-2 max-w-[140px]">
                            <div className="text-zinc-200 truncate" title={l.niche}>{l.niche}</div>
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
