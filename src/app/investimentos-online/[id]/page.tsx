"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import {
  ArrowLeft,
  ExternalLink,
  Bot,
  ShieldCheck,
  TrendingUp,
  Globe,
  BarChart2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  LineChart,
  Lightbulb,
  Swords,
  Target,
  DollarSign,
  Clock,
} from "lucide-react";
import type { EFListing } from "@/data/empire-flippers-listings";
import type { ExpertAssessment } from "@/data/expert-assessments";
import { EXPERT_ASSESSMENTS } from "@/data/expert-assessments";
import { DUE_DILIGENCE_CHECKLIST, PORTFOLIO_SCENARIOS, NEGOTIATION_STRATEGIES, ACQUISITION_TIMELINE, POST_ACQUISITION_PLAN, LISTING_FINANCIALS, GROWTH_OPPORTUNITIES } from "@/data/portfolio-analysis";
import { LineChart as RechartsLineChart, Line, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DD = Record<string, any>;

interface DetailData {
  listing: EFListing;
  assessment: ExpertAssessment | null;
  dueDiligence: DD | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const REC_LABELS: Record<string, string> = {
  top_pick: "Top Pick",
  strong: "Strong",
  consider: "Consider",
  avoid: "Avoid",
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
  return ((mp * 12) / price) * 100;
}

function RecBadge({ rec }: { rec: EFListing["recommendation"] }) {
  const style =
    rec === "top_pick"
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : rec === "strong"
      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      : rec === "consider"
      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      : "bg-red-500/20 text-red-400 border border-red-500/30";
  return (
    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${style}`}>
      {REC_LABELS[rec]}
    </span>
  );
}

function VerdictBadge({ verdict, color }: { verdict: string; color: string }) {
  const style =
    color === "emerald"
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : color === "blue"
      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      : color === "amber"
      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      : "bg-red-500/20 text-red-400 border border-red-500/30";
  return (
    <span className={`text-sm font-bold px-3 py-1 rounded-full ${style}`}>
      {verdict}
    </span>
  );
}

function SectionCard({
  icon: Icon,
  title,
  iconColor,
  children,
}: {
  icon: React.ElementType;
  title: string;
  iconColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-700 bg-zinc-800/80">
        <Icon className={`w-4 h-4 ${iconColor ?? "text-zinc-400"}`} />
        <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function TrafficBar({ label, pct, color }: { label: string; pct: string; color: string }) {
  const numPct = parseFloat(pct.replace("%", ""));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-300 font-medium">{pct}</span>
      </div>
      <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(numPct, 100)}%` }} />
      </div>
    </div>
  );
}

// VA cost tables per business type
const VA_PLANS: Record<string, { role: string; tasks: string; hoursPerWeek: number; costPerMonth: string }[]> = {
  "92105": [
    { role: "Content VA (Philippines)", tasks: "Write home decor blog posts with AI assistance, format and publish to WordPress", hoursPerWeek: 20, costPerMonth: "$400–600" },
    { role: "Pinterest VA (Philippines)", tasks: "Create pins in Canva, schedule via Tailwind, manage boards, monitor analytics", hoursPerWeek: 10, costPerMonth: "$200–300" },
  ],
  "92180": [
    { role: "Community Manager VA", tasks: "Moderate 3 Facebook groups (27K members), reply to comments, post weekly content, handle spam", hoursPerWeek: 14, costPerMonth: "$350–500" },
    { role: "Content VA", tasks: "Write new Vietnam travel guides in neutral editorial style, update existing articles, keyword research", hoursPerWeek: 10, costPerMonth: "$300–450" },
  ],
  "89555": [
    { role: "Customer Support VA", tasks: "Reply to customer emails, handle refund requests, process orders, FAQ management", hoursPerWeek: 5, costPerMonth: "$150–250" },
    { role: "Marketing VA", tasks: "Reddit marketing (proprietary system), social media posts (Instagram, TikTok), email campaigns", hoursPerWeek: 10, costPerMonth: "$300–400" },
    { role: "Part-time Dev (Upwork)", tasks: "Bug fixes, infrastructure maintenance, feature updates — on demand", hoursPerWeek: 2, costPerMonth: "$200–400" },
  ],
  "92246": [
    { role: "Scriptwriter (Philippines)", tasks: "Write WNBA commentary scripts based on news and game highlights", hoursPerWeek: 3, costPerMonth: "€80–120 (per script)" },
    { role: "Video Editor (Philippines)", tasks: "Assemble clips, AI voiceover sync, captions, thumbnails", hoursPerWeek: 5, costPerMonth: "€40/video" },
    { role: "Clipper/Researcher (Philippines)", tasks: "Source game footage, identify key moments, add timestamp links to scripts", hoursPerWeek: 2, costPerMonth: "€10/video" },
  ],
};

// ─── Team Cost Calculator data ────────────────────────────────────────────────

type TeamRole = { role: string; rate: number; hoursPerWeek: number };

const DEFAULT_TEAM_ROLES: Record<string, TeamRole[]> = {
  "92246": [
    { role: "Video Editor", rate: 400, hoursPerWeek: 20 },
    { role: "Content Researcher", rate: 300, hoursPerWeek: 10 },
    { role: "Thumbnail Designer", rate: 150, hoursPerWeek: 10 },
  ],
  "90544": [
    { role: "Video Editor", rate: 500, hoursPerWeek: 20 },
    { role: "Scriptwriter", rate: 200, hoursPerWeek: 10 },
    { role: "Automation Maintainer", rate: 400, hoursPerWeek: 10 },
  ],
  "91304": [
    { role: "Video Editor", rate: 350, hoursPerWeek: 20 },
    { role: "Scriptwriter", rate: 400, hoursPerWeek: 20 },
    { role: "SEO Specialist", rate: 200, hoursPerWeek: 10 },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestimentosOnlineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ddChecked, setDdChecked] = useState<Set<string>>(new Set());
  const [loiCopied, setLoiCopied] = useState(false);

  // ── Team Cost Calculator state ──────────────────────────────────────────────
  const [teamRoles, setTeamRoles] = useState<TeamRole[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/investimentos-online/${id}`, { credentials: "include" })
      .then(async (r) => {
        if (r.status === 403) throw new Error("403");
        if (r.status === 404) throw new Error("404");
        if (!r.ok) throw new Error("error");
        return r.json();
      })
      .then((d: DetailData) => setData(d))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    try {
      const stored = localStorage.getItem(`dd-checklist-${id}`);
      if (stored) setDdChecked(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setTeamRoles(DEFAULT_TEAM_ROLES[id] ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleDdItem = (itemName: string) => {
    setDdChecked((prev) => {
      const next = new Set(prev);
      if (next.has(itemName)) next.delete(itemName);
      else next.add(itemName);
      localStorage.setItem(`dd-checklist-${id}`, JSON.stringify([...next]));
      return next;
    });
  };

  const dd = data?.dueDiligence ?? null;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      <NavHeader />

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Back link */}
        <Link
          href="/investimentos-online"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all listings
        </Link>

        {/* Loading state */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-zinc-800 rounded w-1/3" />
            <div className="h-4 bg-zinc-800 rounded w-1/4" />
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 bg-zinc-800 rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error states */}
        {!loading && error === "403" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 font-semibold">Access Denied</p>
            <p className="text-zinc-500 text-sm mt-1">
              This page is restricted to authorized users only.
            </p>
          </div>
        )}

        {!loading && error === "404" && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-center">
            <Globe className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="text-zinc-300 font-semibold">Listing Not Found</p>
            <p className="text-zinc-500 text-sm mt-1">
              Listing #{id} does not exist or has been removed.
            </p>
            <Link
              href="/investimentos-online"
              className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all listings
            </Link>
          </div>
        )}

        {!loading && error && error !== "403" && error !== "404" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-amber-400 font-semibold">Error loading listing</p>
            <p className="text-zinc-500 text-sm mt-1">Please try again later.</p>
          </div>
        )}

        {/* Main content */}
        {!loading && !error && data && (
          <div className="space-y-6">
            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono text-zinc-500">
                      #{data.listing.id}
                    </span>
                    <RecBadge rec={data.listing.recommendation} />
                    {data.assessment && (
                      <VerdictBadge
                        verdict={data.assessment.verdict}
                        color={data.assessment.verdictColor}
                      />
                    )}
                    {data.listing.aiManageable && (
                      <span className="flex items-center gap-1 text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                        <Bot className="w-3 h-3" /> AI+VA Ready
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    {data.assessment?.name ?? data.listing.niche}
                  </h1>
                  <p className="text-sm text-zinc-400">
                    {CAT_LABELS[data.listing.category]} &middot;{" "}
                    {data.listing.monetization} &middot; Est.{" "}
                    {data.listing.firstMadeMoney}
                  </p>
                </div>
                <a
                  href={`https://app.empireflippers.com/listing/${data.listing.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors shrink-0 border border-blue-500/30 rounded-lg px-3 py-1.5"
                >
                  View on Empire Flippers
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Asking Price</div>
                  <div className="text-xl font-bold text-white">
                    {data.assessment?.price ?? fmt(data.listing.price)}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Profit / mo</div>
                  <div className="text-xl font-bold text-emerald-400">
                    {data.assessment?.monthlyProfit ??
                      fmtMo(data.listing.monthlyProfit)}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Annual ROI</div>
                  <div className="text-xl font-bold text-blue-400">
                    {data.assessment?.annualROI ??
                      (annualRoi(data.listing.price, data.listing.monthlyProfit)
                        ? `${annualRoi(
                            data.listing.price,
                            data.listing.monthlyProfit
                          )!.toFixed(0)}%`
                        : "—")}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Multiple</div>
                  <div className="text-xl font-bold text-zinc-300">
                    {data.listing.multiple ? `${data.listing.multiple}x` : "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Investment Thesis ─────────────────────────────────────── */}
            {(() => {
              const THESES: Record<string, string> = {
                "92246": "Ace Hoops represents a compelling seasonal arbitrage opportunity in the rapidly growing women's basketball media space. With the WNBA expanding to 15 teams by 2025 and viewership up 160% year-over-year, this channel is positioned at the inflection point of a structural growth trend. The $62K asking price at 1.6x multiple is below the EF marketplace median of 2.5x for YouTube assets, reflecting the seasonal revenue pattern that scares away less sophisticated buyers. At 1 hour/week of operator time with VA-driven content production, this is effectively a cash-flowing media asset that benefits from league expansion tailwinds without requiring content creation expertise.",
                "90544": "This portfolio of three faceless tech YouTube channels represents the ideal acquisition for a hands-off operator. With 10,000+ videos generating $6,500+/month through automated content pipelines, the channels function as digital real estate — producing income with minimal intervention. The tech niche commands premium CPMs ($8-12) and the faceless format eliminates key-person risk entirely. At $79K (23x monthly multiple), this is priced below replacement cost — recreating this library of content and subscriber base would cost 2-3x the asking price. The primary risk is YouTube algorithm sensitivity, mitigated by diversification across three independent channels.",
                "91304": "This faceless tutorial channel offers a moderate-risk entry point into the YouTube acquisition space at a negotiated price target of $45-50K. The education/tutorial niche has strong long-term demand fundamentals and above-average CPMs ($6-9). However, declining revenue trends (-15% over 6 months) and a below-average subscriber growth rate signal that the channel needs content strategy optimization post-acquisition. This is a BUY ONLY IF negotiated down from $60K — at the right price, the existing content library provides a foundation for growth through SEO optimization and topic expansion.",
              };
              const thesis = THESES[id];
              const isEliminated = data.assessment?.verdictColor === "red";
              if (!thesis || isEliminated) return null;
              return (
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700/50 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Investment Thesis</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{thesis}</p>
                </div>
              );
            })()}

            {/* ── Key Insight Mini-Cards ────────────────────────────────── */}
            {(() => {
              type InsightCard = { label: string; value: string; color: string; sub: string };
              type InsightData = { cards: InsightCard[] };
              const INSIGHTS: Record<string, InsightData> = {
                "92246": {
                  cards: [
                    { label: "Break-Even", value: "20 months", color: "text-emerald-400", sub: "" },
                    { label: "Growth Score", value: "9/10", color: "text-emerald-400", sub: "WNBA expansion boom" },
                    { label: "Risk Score", value: "6/10", color: "text-amber-400", sub: "Seasonal revenue pattern" },
                    { label: "AI Readiness", value: "10/10", color: "text-emerald-400", sub: "Fully AI+VA scriptable" },
                  ],
                },
                "90544": {
                  cards: [
                    { label: "Break-Even", value: "23 months", color: "text-amber-400", sub: "" },
                    { label: "Growth Score", value: "6/10", color: "text-amber-400", sub: "Steady tech niche" },
                    { label: "Risk Score", value: "4/10", color: "text-emerald-400", sub: "3-channel diversification" },
                    { label: "AI Readiness", value: "10/10", color: "text-emerald-400", sub: "Already automated" },
                  ],
                },
                "91304": {
                  cards: [
                    { label: "Break-Even", value: "26 months", color: "text-amber-400", sub: "" },
                    { label: "Growth Score", value: "5/10", color: "text-amber-400", sub: "Needs content refresh" },
                    { label: "Risk Score", value: "5/10", color: "text-amber-400", sub: "Declining trend" },
                    { label: "AI Readiness", value: "8/10", color: "text-emerald-400", sub: "Faceless format" },
                  ],
                },
              };
              const insight = INSIGHTS[id];
              const isEliminated = data.assessment?.verdictColor === "red";
              if (!insight || isEliminated) return null;
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {insight.cards.map((card) => (
                    <div
                      key={card.label}
                      className="bg-zinc-800/60 rounded-lg p-4 text-center border border-zinc-700/30"
                    >
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{card.label}</p>
                      <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                      {card.sub && <p className="text-zinc-400 text-xs mt-1">{card.sub}</p>}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* ── Section 1: What This Business Does ────────────────────── */}
            <SectionCard
              icon={Globe}
              title="What This Business Does"
              iconColor="text-blue-400"
            >
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {dd?.description ?? data.listing.description ?? "No description available."}
                </p>
                {dd?.assetsIncluded && Array.isArray(dd.assetsIncluded) && (
                  <div>
                    <p className="text-xs text-zinc-500 font-medium mb-1.5">Assets Included in Sale</p>
                    <ul className="space-y-1">
                      {dd.assetsIncluded.map((asset: string, i: number) => (
                        <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                          <span className="text-blue-400 shrink-0">✓</span>
                          {asset}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dd?.siteAssessment?.personalBrand && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-amber-400 mb-1">⚠ Personal Brand Warning</p>
                    <p className="text-xs text-zinc-400">{dd.siteAssessment.personalBrandNote}</p>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* ── Monthly Earnings Trend ─────────────────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin) return null;
              const history = fin.monthlyProfitHistory;
              const profits = history.map((h) => h.profit);
              const highest = Math.max(...profits);
              const lowest = Math.min(...profits);
              const average = Math.round(profits.reduce((a, b) => a + b, 0) / profits.length);
              const firstHalf = profits.slice(0, Math.floor(profits.length / 2));
              const secondHalf = profits.slice(Math.floor(profits.length / 2));
              const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
              const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
              const trendUp = secondAvg > firstAvg * 1.05;
              const trendDown = secondAvg < firstAvg * 0.95;
              const highestMonth = history.find((h) => h.profit === highest)!.month;
              const lowestMonth = history.find((h) => h.profit === lowest)!.month;
              return (
                <SectionCard icon={LineChart} title="Monthly Earnings Trend" iconColor="text-emerald-400">
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsLineChart data={history} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#71717a", fontSize: 11 }}
                          angle={-45}
                          textAnchor="end"
                          interval="preserveStartEnd"
                          height={50}
                        />
                        <YAxis
                          tick={{ fill: "#71717a", fontSize: 11 }}
                          tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                          width={50}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#27272a",
                            border: "1px solid #3f3f46",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                          formatter={(value) => [`$${Number(value).toLocaleString()}`, "Profit"]}
                          labelStyle={{ color: "#a1a1aa" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#34d399"
                          strokeWidth={2}
                          dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }}
                          activeDot={{ r: 6, fill: "#34d399" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>

                    {/* Key stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Peak Month</div>
                        <div className="text-sm font-semibold text-emerald-400">${highest.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600 mt-0.5">{highestMonth}</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Lowest Month</div>
                        <div className="text-sm font-semibold text-red-400">${lowest.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600 mt-0.5">{lowestMonth}</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Average / mo</div>
                        <div className="text-sm font-semibold text-zinc-200">${average.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600 mt-0.5">{history.length} months</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Trend</div>
                        <div className={`text-sm font-semibold ${trendUp ? "text-emerald-400" : trendDown ? "text-red-400" : "text-zinc-400"}`}>
                          {trendUp ? "Growing" : trendDown ? "Declining" : "Stable"}
                        </div>
                        <div className="text-xs text-zinc-600 mt-0.5">
                          {trendUp ? `+${Math.round(((secondAvg - firstAvg) / firstAvg) * 100)}%` : trendDown ? `${Math.round(((secondAvg - firstAvg) / firstAvg) * 100)}%` : "Flat"}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── 12-Month Cash Flow Projection ───────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin) return null;
              const history = fin.monthlyProfitHistory;
              const lastProfit = history[history.length - 1].profit;
              const avg3 = fin.avg3mo;
              const isSeasonal = fin.seasonality === "high";
              const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
              const seasonalMultipliers: Record<string, number> = {
                May: 1.8, Jun: 2.0, Jul: 2.3, Aug: 2.5, Sep: 1.9, Oct: 1.5,
                Nov: 0.6, Dec: 1.0, Jan: 0.5, Feb: 1.0, Mar: 0.7, Apr: 0.8,
              };
              const projData = months.map((m, i) => {
                const base = isSeasonal ? avg3 * (seasonalMultipliers[m] ?? 1) : avg3;
                return {
                  month: `${m} ${i >= 10 ? "27" : "26"}`,
                  base: Math.round(base),
                  bear: Math.round(base * 0.7),
                  bull: Math.round(base * 1.25),
                };
              });
              const totalBase = projData.reduce((s, d) => s + d.base, 0);
              const totalBear = projData.reduce((s, d) => s + d.bear, 0);
              const totalBull = projData.reduce((s, d) => s + d.bull, 0);
              return (
                <SectionCard icon={LineChart} title="12-Month Cash Flow Projection" iconColor="text-blue-400">
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-500">
                      Forward projection from current 3-month average (${avg3.toLocaleString()}/mo).
                      {isSeasonal && " Seasonal multipliers applied based on WNBA calendar."}
                    </p>
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={projData} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
                        <defs>
                          <linearGradient id="bearFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="bullFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} angle={-45} textAnchor="end" interval={0} height={50} />
                        <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} width={50} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#27272a", border: "1px solid #3f3f46", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                          formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === "base" ? "Base Case" : name === "bear" ? "Bear (−30%)" : "Bull (+25%)"]}
                          labelStyle={{ color: "#a1a1aa" }}
                        />
                        <Area type="monotone" dataKey="bull" stroke="transparent" fill="url(#bullFill)" />
                        <Area type="monotone" dataKey="bear" stroke="transparent" fill="url(#bearFill)" />
                        <Line type="monotone" dataKey="bull" stroke="#22c55e" strokeWidth={1} strokeDasharray="4 4" dot={false} name="bull" />
                        <Line type="monotone" dataKey="base" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} name="base" />
                        <Line type="monotone" dataKey="bear" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} name="bear" />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-red-400 mb-1">Bear (−30%)</div>
                        <div className="text-sm font-semibold text-zinc-300">${totalBear.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600">${Math.round(totalBear / 12).toLocaleString()}/mo avg</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center ring-1 ring-blue-500/30">
                        <div className="text-xs text-blue-400 mb-1">Base Case</div>
                        <div className="text-sm font-semibold text-white">${totalBase.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600">${Math.round(totalBase / 12).toLocaleString()}/mo avg</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-emerald-400 mb-1">Bull (+25%)</div>
                        <div className="text-sm font-semibold text-zinc-300">${totalBull.toLocaleString()}</div>
                        <div className="text-xs text-zinc-600">${Math.round(totalBull / 12).toLocaleString()}/mo avg</div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Break-Even Analysis ────────────────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin) return null;
              const price = fin.targetPrice;
              const avg = fin.avg3mo;
              const isSeasonal = fin.seasonality === "high";
              const seasonalMult: Record<string, number> = {
                May: 1.8, Jun: 2.0, Jul: 2.3, Aug: 2.5, Sep: 1.9, Oct: 1.5,
                Nov: 0.6, Dec: 1.0, Jan: 0.5, Feb: 1.0, Mar: 0.7, Apr: 0.8,
              };
              const monthNames = ["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb"];
              const beData: { month: string; base: number; bear: number; bull: number }[] = [];
              let cumBase = -price, cumBear = -price, cumBull = -price;
              let breakBase = 0, breakBear = 0, breakBull = 0;
              for (let i = 0; i < 36; i++) {
                const m = monthNames[i % 12];
                const yr = i < 10 ? "26" : i < 22 ? "27" : i < 34 ? "28" : "29";
                const base = isSeasonal ? avg * (seasonalMult[m] ?? 1) : avg;
                cumBase += base;
                cumBear += base * 0.7;
                cumBull += base * 1.25;
                if (!breakBase && cumBase >= 0) breakBase = i + 1;
                if (!breakBear && cumBear >= 0) breakBear = i + 1;
                if (!breakBull && cumBull >= 0) breakBull = i + 1;
                beData.push({ month: `${m} ${yr}`, base: Math.round(cumBase), bear: Math.round(cumBear), bull: Math.round(cumBull) });
              }
              return (
                <SectionCard icon={Target} title="Break-Even Analysis" iconColor="text-amber-400">
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-500">
                      Cumulative cash flow from acquisition at target price (${price.toLocaleString()}).
                      Line crosses $0 = investment fully recovered.
                    </p>
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={beData} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 9 }} angle={-45} textAnchor="end" interval={2} height={50} />
                        <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickFormatter={(v: number) => `${v >= 0 ? "" : "-"}$${Math.abs(v) >= 1000 ? `${(Math.abs(v) / 1000).toFixed(0)}k` : Math.abs(v)}`} width={55} />
                        <ReferenceLine y={0} stroke="#71717a" strokeDasharray="6 3" label={{ value: "Break-Even", fill: "#a1a1aa", fontSize: 10, position: "right" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#27272a", border: "1px solid #3f3f46", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                          formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === "base" ? "Base" : name === "bear" ? "Bear" : "Bull"]}
                          labelStyle={{ color: "#a1a1aa" }}
                        />
                        <Area type="monotone" dataKey="bull" stroke="transparent" fill="#22c55e" fillOpacity={0.05} />
                        <Line type="monotone" dataKey="bull" stroke="#22c55e" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                        <Line type="monotone" dataKey="base" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="bear" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-red-400 mb-1">Bear (−30%)</div>
                        <div className="text-sm font-semibold text-zinc-300">{breakBear ? `${breakBear} months` : ">36 mo"}</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center ring-1 ring-blue-500/30">
                        <div className="text-xs text-blue-400 mb-1">Base Case</div>
                        <div className="text-sm font-semibold text-white">{breakBase ? `${breakBase} months` : ">36 mo"}</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-emerald-400 mb-1">Bull (+25%)</div>
                        <div className="text-sm font-semibold text-zinc-300">{breakBull ? `${breakBull} months` : ">36 mo"}</div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Risk Radar ─────────────────────────────────────────── */}
            {(() => {
              const riskProfiles: Record<string, { dimension: string; score: number }[]> = {
                "92246": [
                  { dimension: "Platform\nDependency", score: 4 },
                  { dimension: "Revenue\nTrend", score: 2 },
                  { dimension: "Operator\nRisk", score: 1 },
                  { dimension: "Content\nRisk", score: 2 },
                  { dimension: "Market\nTiming", score: 2 },
                  { dimension: "Revenue\nDiversification", score: 3 },
                ],
                "90544": [
                  { dimension: "Platform\nDependency", score: 4 },
                  { dimension: "Revenue\nTrend", score: 4 },
                  { dimension: "Operator\nRisk", score: 1 },
                  { dimension: "Content\nRisk", score: 2 },
                  { dimension: "Market\nTiming", score: 3 },
                  { dimension: "Revenue\nDiversification", score: 3 },
                ],
                "91304": [
                  { dimension: "Platform\nDependency", score: 4 },
                  { dimension: "Revenue\nTrend", score: 4 },
                  { dimension: "Operator\nRisk", score: 1 },
                  { dimension: "Content\nRisk", score: 2 },
                  { dimension: "Market\nTiming", score: 3 },
                  { dimension: "Revenue\nDiversification", score: 4 },
                ],
              };
              const profile = riskProfiles[id];
              if (!profile) return null;
              const avgRisk = (profile.reduce((s, p) => s + p.score, 0) / profile.length).toFixed(1);
              const riskLabel = Number(avgRisk) <= 2 ? "Low" : Number(avgRisk) <= 3 ? "Moderate" : "Elevated";
              const riskColor = Number(avgRisk) <= 2 ? "text-emerald-400" : Number(avgRisk) <= 3 ? "text-amber-400" : "text-red-400";
              return (
                <SectionCard icon={ShieldCheck} title="Risk Radar" iconColor="text-amber-400">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-500">Risk dimensions scored 1 (low) to 5 (high). Lower is better.</p>
                      <span className={`text-sm font-semibold ${riskColor}`}>Overall: {avgRisk}/5 ({riskLabel})</span>
                    </div>
                    <div className="flex justify-center">
                      <ResponsiveContainer width={350} height={280}>
                        <RadarChart data={profile} cx="50%" cy="50%" outerRadius="70%">
                          <PolarGrid stroke="#3f3f46" />
                          <PolarAngleAxis dataKey="dimension" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#71717a", fontSize: 9 }} tickCount={6} />
                          <Radar dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {profile.map((p) => (
                        <div key={p.dimension} className="bg-zinc-900 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-zinc-500 mb-1">{p.dimension.replace("\n", " ")}</div>
                          <div className={`text-sm font-semibold ${p.score <= 2 ? "text-emerald-400" : p.score <= 3 ? "text-amber-400" : "text-red-400"}`}>
                            {p.score}/5
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Revenue Source Breakdown ──────────────────────────── */}
            {(() => {
              const revenueData: Record<string, { name: string; value: number; color: string }[]> = {
                "92246": [
                  { name: "YouTube AdSense", value: 100, color: "#ef4444" },
                ],
                "90544": [
                  { name: "YouTube AdSense", value: 12, color: "#ef4444" },
                  { name: "Affiliate", value: 88, color: "#3b82f6" },
                ],
                "91304": [
                  { name: "Affiliate", value: 88, color: "#3b82f6" },
                  { name: "YouTube AdSense", value: 12, color: "#ef4444" },
                ],
              };
              const sources = revenueData[id];
              if (!sources) return null;
              const primarySource = sources.reduce((a, b) => (a.value > b.value ? a : b));
              const diversified = sources.length >= 3 || primarySource.value < 70;
              return (
                <SectionCard icon={BarChart2} title="Revenue Source Breakdown" iconColor="text-blue-400">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <ResponsiveContainer width={200} height={200}>
                      <PieChart>
                        <Pie data={sources} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                          {sources.map((s, i) => (
                            <Cell key={i} fill={s.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#27272a", border: "1px solid #3f3f46", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                          formatter={(value) => [`${value}%`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3 flex-1">
                      {sources.map((s) => (
                        <div key={s.name} className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="text-sm text-zinc-300 flex-1">{s.name}</span>
                          <span className="text-sm font-semibold text-zinc-200">{s.value}%</span>
                        </div>
                      ))}
                      <div className={`mt-2 text-xs px-2 py-1 rounded inline-block ${diversified ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {diversified ? "Diversified revenue" : `Concentrated: ${primarySource.value}% from ${primarySource.name}`}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── YouTube Channel Analytics ─────────────────────────── */}
            {(() => {
              type YTData = {
                avgViewsPerVideo: number;
                subscriberGrowthRate: string;
                uploadFrequency: string;
                estimatedCPM: string;
                totalVideos: string;
                subscriberCount: string;
                revenuePer1kViews: number;
                monthlyViews: { month: string; views: number }[];
              };
              const ytData: Record<string, YTData> = {
                "92246": {
                  avgViewsPerVideo: 15000,
                  subscriberGrowthRate: "~8%/month",
                  uploadFrequency: "4–5 videos/day (season), 1–2/day (off-season)",
                  estimatedCPM: "$4–6",
                  totalVideos: "5,000+",
                  subscriberCount: "~45,000",
                  revenuePer1kViews: 5,
                  monthlyViews: [
                    { month: "Oct", views: 1800000 },
                    { month: "Nov", views: 420000 },
                    { month: "Dec", views: 280000 },
                    { month: "Jan", views: 260000 },
                    { month: "Feb", views: 310000 },
                    { month: "Mar", views: 350000 },
                  ],
                },
                "90544": {
                  avgViewsPerVideo: 8000,
                  subscriberGrowthRate: "~3%/month",
                  uploadFrequency: "10+ videos/week (automated/faceless)",
                  estimatedCPM: "$8–12",
                  totalVideos: "10,000+",
                  subscriberCount: "~120,000 combined",
                  revenuePer1kViews: 10,
                  monthlyViews: [
                    { month: "Oct", views: 620000 },
                    { month: "Nov", views: 640000 },
                    { month: "Dec", views: 590000 },
                    { month: "Jan", views: 660000 },
                    { month: "Feb", views: 680000 },
                    { month: "Mar", views: 710000 },
                  ],
                },
                "91304": {
                  avgViewsPerVideo: 5000,
                  subscriberGrowthRate: "~5%/month",
                  uploadFrequency: "3–4 videos/week",
                  estimatedCPM: "$6–9",
                  totalVideos: "800+",
                  subscriberCount: "~35,000",
                  revenuePer1kViews: 7,
                  monthlyViews: [
                    { month: "Oct", views: 310000 },
                    { month: "Nov", views: 325000 },
                    { month: "Dec", views: 298000 },
                    { month: "Jan", views: 340000 },
                    { month: "Feb", views: 355000 },
                    { month: "Mar", views: 370000 },
                  ],
                },
              };
              const yt = ytData[id];
              if (!yt || !data?.assessment || data.assessment.verdictColor === "red") return null;
              const metrics = [
                { label: "Subscribers", value: yt.subscriberCount },
                { label: "Avg Views / Video", value: yt.avgViewsPerVideo.toLocaleString() },
                { label: "Total Videos", value: yt.totalVideos },
                { label: "Revenue / 1K Views", value: `$${yt.revenuePer1kViews}` },
                { label: "Estimated CPM", value: yt.estimatedCPM },
                { label: "Sub Growth Rate", value: yt.subscriberGrowthRate },
                { label: "Upload Frequency", value: yt.uploadFrequency },
              ];
              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">YouTube Channel Analytics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {metrics.map((m) => (
                      <div key={m.label} className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-zinc-400 text-sm mb-1">{m.label}</p>
                        <p className="text-white text-xl font-bold leading-tight">{m.value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-3">Estimated monthly views (last 6 months)</p>
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={yt.monthlyViews} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => Number(v) >= 1000000 ? `${(Number(v) / 1000000).toFixed(1)}M` : Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(0)}K` : String(v)} width={42} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#27272a", border: "1px solid #3f3f46", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                          formatter={(value) => [Number(value) >= 1000000 ? `${(Number(value) / 1000000).toFixed(2)}M` : `${(Number(value) / 1000).toFixed(0)}K`, "Views"]}
                        />
                        <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })()}

            {/* ── Growth Opportunities ──────────────────────────────── */}
            {(() => {
              const opportunities = GROWTH_OPPORTUNITIES[id];
              if (!opportunities || !data?.assessment || data.assessment.verdictColor === "red") return null;

              // Parse "X-Y%" strings to extract numeric min and max
              const upliftNumbers = opportunities.flatMap((o) => {
                const matches = o.revenueUplift.match(/\d+/g);
                return matches ? matches.map(Number) : [];
              });
              const totalMin = upliftNumbers.length > 0 ? Math.min(...upliftNumbers) : 0;
              const totalMax = upliftNumbers.length > 0 ? Math.max(...upliftNumbers) : 0;

              const difficultyColor = (d: string) => {
                if (d === "Low") return "text-emerald-400";
                if (d === "Medium") return "text-amber-400";
                return "text-red-400";
              };

              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Growth Opportunities</h3>
                  <p className="text-zinc-400 text-sm mb-4">Actionable strategies to increase revenue post-acquisition</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {opportunities.map((opp) => (
                      <div
                        key={opp.strategy}
                        className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors"
                      >
                        <p className="text-white font-medium text-sm">{opp.strategy}</p>
                        <p className="text-zinc-400 text-xs mt-1">{opp.description}</p>
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded">
                            +{opp.revenueUplift}
                          </span>
                          <span className={`${difficultyColor(opp.difficulty)} text-xs`}>
                            {opp.difficulty} difficulty
                          </span>
                          <span className="text-zinc-500 text-xs">{opp.timeToImplement}</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">Investment: {opp.investment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-400 text-sm">Total potential uplift:</span>
                    <span className="bg-emerald-500/10 text-emerald-400 text-sm font-semibold px-3 py-1 rounded">
                      {totalMin}–{totalMax}%
                    </span>
                    <span className="text-zinc-500 text-xs">(range across individual strategies)</span>
                  </div>
                </div>
              );
            })()}

            {/* ── Platform Risk Assessment ──────────────────────────── */}
            {(() => {
              const platformRisks: Record<string, { risk: string; severity: string; probability: string; impact: string; mitigation: string }[]> = {
                "92246": [
                  { risk: "Algorithm Change", severity: "High", probability: "Medium", impact: "YouTube could deprioritize sports highlight content in favor of long-form analysis", mitigation: "Diversify content mix: add analysis, predictions, and player profiles alongside highlights" },
                  { risk: "WNBA Licensing Crackdown", severity: "Critical", probability: "Low", impact: "WNBA/NBA could issue takedowns on highlight content similar to NFL's approach", mitigation: "Shift to commentary/analysis (fair use), reduce pure highlight clips, build original content pipeline" },
                  { risk: "Seasonal Revenue Volatility", severity: "High", probability: "Certain", impact: "Revenue drops 60-70% during Oct-Apr off-season", mitigation: "Build off-season content strategy: draft coverage, player news, WNBA expansion analysis, women's college basketball" },
                  { risk: "Demonetization Risk", severity: "Medium", probability: "Low", impact: "Sports channels occasionally hit by 'reused content' policy", mitigation: "Add unique commentary voiceover, original graphics, maintain >50% original content ratio" },
                  { risk: "Competitor Entry", severity: "Medium", probability: "High", impact: "Growing WNBA interest will attract new channels to the niche", mitigation: "First-mover advantage with 5,000+ video library, establish brand recognition before market saturates" },
                ],
                "90544": [
                  { risk: "AI Content Detection", severity: "Critical", probability: "Medium", impact: "YouTube may penalize AI-generated or automated content in future policy updates", mitigation: "Gradually increase human-edited content, add unique value layers (testing, benchmarks), maintain quality threshold" },
                  { risk: "Algorithm Shift to Shorts", severity: "High", probability: "High", impact: "YouTube increasingly favoring Shorts over long-form, could reduce long-form recommendations", mitigation: "Already launching Shorts strategy; convert best-performing long-form into Shorts format" },
                  { risk: "Tech Niche Saturation", severity: "Medium", probability: "Medium", impact: "Tech tutorial/review space increasingly crowded with AI-assisted content creators", mitigation: "Focus on emerging niches (AI tools, automation), maintain upload velocity advantage" },
                  { risk: "Single Platform Dependency", severity: "High", probability: "Low", impact: "YouTube policy change or account suspension affects all 3 channels simultaneously", mitigation: "Channels operate on separate Google accounts; begin cross-platform publishing to reduce concentration" },
                  { risk: "CPM Compression", severity: "Medium", probability: "Medium", impact: "Tech ad market cyclical; recession could compress $8-12 CPM to $5-7", mitigation: "Diversify into affiliate revenue (currently 0%); tech products have strong affiliate commissions" },
                ],
                "91304": [
                  { risk: "Continued Revenue Decline", severity: "Critical", probability: "High", impact: "15% decline trend may accelerate if content strategy isn't refreshed post-acquisition", mitigation: "Immediate SEO audit of top 100 videos, refresh thumbnails/titles, add trending tutorial topics" },
                  { risk: "Reused Content Flags", severity: "High", probability: "Medium", impact: "Tutorial format may trigger YouTube's 'repetitious content' policy if too formulaic", mitigation: "Vary presentation styles, add unique examples, increase production quality" },
                  { risk: "AI Tutorial Competition", severity: "High", probability: "High", impact: "ChatGPT and AI assistants replacing need for video tutorials in some categories", mitigation: "Focus on visual/hands-on tutorials that AI text can't replicate (design, video editing, hardware)" },
                  { risk: "Subscriber Churn", severity: "Medium", probability: "Medium", impact: "Inactive subscribers reduce channel's algorithmic reach", mitigation: "Community posts, polls, and engagement-focused content to reactivate dormant subscribers" },
                  { risk: "Niche Obsolescence", severity: "Medium", probability: "Low", impact: "Software/tool tutorials become outdated as products evolve", mitigation: "Maintain evergreen + trending content mix; retire outdated videos, redirect to updated versions" },
                ],
              };
              const risks = platformRisks[id];
              if (!risks || !data?.assessment || data.assessment.verdictColor === "red") return null;

              const severityBorder = (s: string) => {
                if (s === "Critical") return "border-red-500";
                if (s === "High") return "border-amber-500";
                return "border-yellow-500/50";
              };
              const severityBadge = (s: string) => {
                if (s === "Critical") return "bg-red-500/10 text-red-400";
                if (s === "High") return "bg-amber-500/10 text-amber-400";
                return "bg-yellow-500/10 text-yellow-400";
              };

              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Platform Risk Assessment</h3>
                  <div className="space-y-3">
                    {risks.map((r) => (
                      <div key={r.risk} className={`bg-zinc-800/50 rounded-lg p-4 border-l-4 ${severityBorder(r.severity)}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-sm">{r.risk}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${severityBadge(r.severity)}`}>{r.severity}</span>
                          <span className="bg-zinc-700 text-zinc-300 text-xs px-2 py-0.5 rounded">{r.probability}</span>
                        </div>
                        <p className="text-zinc-400 text-sm mt-2">
                          <span className="text-zinc-500">Impact: </span>{r.impact}
                        </p>
                        <p className="text-emerald-400/80 text-sm mt-1">
                          <span className="text-zinc-500">Mitigation: </span>{r.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── Team Cost Calculator ──────────────────────────────── */}
            {(() => {
              if (!data?.assessment || data.assessment.verdictColor === "red") return null;
              if (teamRoles.length === 0) return null;
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              const monthlyRevenue = fin?.avg3mo ?? 0;

              const totalTeamCost = teamRoles.reduce((sum, r) => sum + r.rate, 0);
              const netProfit = monthlyRevenue - totalTeamCost;
              const margin = monthlyRevenue > 0 ? Math.round((netProfit / monthlyRevenue) * 100) : 0;
              const teamPct = monthlyRevenue > 0 ? Math.min(100, Math.round((totalTeamCost / monthlyRevenue) * 100)) : 0;
              const netPct = 100 - teamPct;

              const applyPreset = (preset: "solo" | "lean" | "full") => {
                if (preset === "solo") {
                  setTeamRoles(teamRoles.map((r) => ({ ...r, rate: 0, hoursPerWeek: 0 })));
                } else if (preset === "lean") {
                  const base = DEFAULT_TEAM_ROLES[id] ?? teamRoles;
                  setTeamRoles(base.slice(0, 1).map((r) => ({ ...r, rate: Math.round(r.rate * 0.6) })));
                } else {
                  setTeamRoles(DEFAULT_TEAM_ROLES[id] ?? teamRoles);
                }
              };

              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-2">Team Cost Calculator</h3>
                  <p className="text-zinc-400 text-sm mb-4">Estimate your monthly operational costs with a VA team</p>

                  {/* Preset buttons */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <button
                      onClick={() => applyPreset("solo")}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                    >
                      Solo Operator — $0/mo
                    </button>
                    <button
                      onClick={() => applyPreset("lean")}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                    >
                      Lean Team
                    </button>
                    <button
                      onClick={() => applyPreset("full")}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                    >
                      Full Team
                    </button>
                  </div>

                  {/* Role cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {teamRoles.map((role, i) => (
                      <div key={i} className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                        <p className="text-white text-sm font-medium">{role.role}</p>
                        <div>
                          <label className="text-zinc-500 text-xs mb-1 block">Monthly Rate ($)</label>
                          <input
                            type="number"
                            min={0}
                            value={role.rate}
                            onChange={(e) => {
                              const val = Math.max(0, Number(e.target.value));
                              setTeamRoles((prev) => prev.map((r, idx) => idx === i ? { ...r, rate: val } : r));
                            }}
                            className="bg-zinc-700 border border-zinc-600 rounded px-3 py-1.5 text-white text-sm w-full focus:outline-none focus:border-emerald-500/60"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-500 text-xs mb-1 block">Hours / Week</label>
                          <select
                            value={role.hoursPerWeek}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setTeamRoles((prev) => prev.map((r, idx) => idx === i ? { ...r, hoursPerWeek: val } : r));
                            }}
                            className="bg-zinc-700 border border-zinc-600 rounded px-3 py-1.5 text-white text-sm w-full focus:outline-none focus:border-emerald-500/60"
                          >
                            {[10, 20, 30, 40].map((h) => (
                              <option key={h} value={h}>{h} hrs/week</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-zinc-500 text-xs mb-0.5">Team Cost/mo</p>
                        <p className="text-red-400 font-bold text-base">−${totalTeamCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-0.5">Revenue/mo (3mo avg)</p>
                        <p className="text-zinc-300 font-semibold text-base">${monthlyRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-0.5">Net Profit/mo</p>
                        <p className={`font-bold text-base ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {netProfit >= 0 ? "+" : ""}${netProfit.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-0.5">Profit Margin</p>
                        <p className={`font-bold text-base ${margin >= 60 ? "text-emerald-400" : margin >= 30 ? "text-amber-400" : "text-red-400"}`}>
                          {margin}%
                        </p>
                      </div>
                    </div>

                    {/* Stacked bar */}
                    {monthlyRevenue > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="flex h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-red-500/60 transition-all duration-300"
                            style={{ width: `${teamPct}%` }}
                            title={`Team cost: ${teamPct}%`}
                          />
                          <div
                            className={`transition-all duration-300 ${netProfit >= 0 ? "bg-emerald-500/60" : "bg-zinc-700"}`}
                            style={{ width: `${Math.max(0, netPct)}%` }}
                            title={`Net profit: ${netPct}%`}
                          />
                        </div>
                        <div className="flex gap-4 text-xs text-zinc-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500/60 inline-block" />Team cost ({teamPct}%)</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500/60 inline-block" />Net profit ({Math.max(0, netPct)}%)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* ── Tax & Legal Considerations ───────────────────────── */}
            {data?.assessment && data.assessment.verdictColor !== "red" && (
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-4">Tax &amp; Legal Considerations</h3>
                <div className="space-y-3">

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-white text-sm font-medium">1. US Tax Withholding (W-8BEN)</p>
                    <ul className="text-zinc-400 text-xs list-disc pl-4 space-y-1">
                      <li>As a non-US buyer, YouTube/Google withholds 30% of US-sourced ad revenue</li>
                      <li>File W-8BEN to reduce this to 0-15% depending on tax treaty</li>
                      <li>Brazil-US tax treaty: 15% withholding rate on royalties</li>
                      <li>UK-US tax treaty: 0% withholding on business profits (favorable)</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-white text-sm font-medium">2. Entity Structure</p>
                    <ul className="text-zinc-400 text-xs list-disc pl-4 space-y-1">
                      <li>Recommended: US LLC (Wyoming or Delaware) for asset holding</li>
                      <li>Formation cost: ~$300-500 + annual fees ~$100-200</li>
                      <li>Provides liability protection and simplifies AdSense account transfer</li>
                      <li>EIN (Employer Identification Number) needed for US tax filings</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-white text-sm font-medium">3. Empire Flippers Transfer Process</p>
                    <ul className="text-zinc-400 text-xs list-disc pl-4 space-y-1">
                      <li>EF acts as escrow — funds held until transfer complete</li>
                      <li>Typical transfer period: 14-30 days</li>
                      <li>Buyer inspection period: 14 days (can request extension)</li>
                      <li>EF fee: Already included in listing price (paid by seller)</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-white text-sm font-medium">4. Ongoing Compliance</p>
                    <ul className="text-zinc-400 text-xs list-disc pl-4 space-y-1">
                      <li>US tax return (Form 1040-NR or 1065) required annually</li>
                      <li>Brazilian/UK income reporting: include foreign income</li>
                      <li>Keep records of all content production costs (deductible)</li>
                      <li>Currency considerations: Revenue in USD, expenses may be in BRL/GBP/PHP</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-white text-sm font-medium">5. Key Risks</p>
                    <ul className="text-zinc-400 text-xs list-disc pl-4 space-y-1">
                      <li>AdSense account must be in your name/entity — verify transferability</li>
                      <li>Some countries restrict foreign ownership of media assets</li>
                      <li>YouTube Partner Program requirements must be maintained</li>
                    </ul>
                  </div>

                  <p className="text-zinc-600 text-xs italic pt-1">
                    This is general guidance, not legal or tax advice. Consult a qualified cross-border tax advisor before proceeding.
                  </p>
                </div>
              </div>
            )}

            {/* ── Financing Scenarios ───────────────────────────────── */}
            {(() => {
              if (!data?.assessment || data.assessment.verdictColor === "red") return null;
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin) return null;

              const askingPrice = fin.askingPrice;
              const avg3mo = fin.avg3mo;

              // Amortization helper: M = P * r * (1+r)^n / ((1+r)^n - 1)
              function monthlyPayment(principal: number, annualRate: number, months: number): number {
                if (annualRate === 0) return principal / months;
                const r = annualRate / 100 / 12;
                return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
              }

              // Option A — All Cash
              const cashROI = askingPrice > 0 ? (avg3mo * 12) / askingPrice * 100 : 0;

              // Option B — Seller Financing (30% down, 70% over 24 mo at 8% APR)
              const sfDown = askingPrice * 0.30;
              const sfPrincipal = askingPrice * 0.70;
              const sfMonthly = monthlyPayment(sfPrincipal, 8, 24);
              const sfTotalCost = sfDown + sfMonthly * 24;
              const sfNetCashFlow = avg3mo - sfMonthly;
              const sfROI = sfDown > 0 ? (avg3mo * 12) / sfDown * 100 : 0;

              // Option C — SBA Loan (10% down, 90% over 120 mo at 11% APR)
              const sbaDown = askingPrice * 0.10;
              const sbaPrincipal = askingPrice * 0.90;
              const sbaMonthly = monthlyPayment(sbaPrincipal, 11, 120);
              const sbaTotalCost = sbaDown + sbaMonthly * 120;
              const sbaNetCashFlow = avg3mo - sbaMonthly;
              const sbaROI = sbaDown > 0 ? (avg3mo * 12) / sbaDown * 100 : 0;

              const fmt = (n: number) => n < 0
                ? `-$${Math.abs(Math.round(n)).toLocaleString()}`
                : `$${Math.round(n).toLocaleString()}`;

              type FinOption = {
                label: string;
                title: string;
                highlight: boolean;
                rows: { key: string; value: string; highlight?: boolean }[];
                cashFlow: number;
              };

              const options: FinOption[] = [
                {
                  label: "OPTION A",
                  title: "All Cash",
                  highlight: true,
                  cashFlow: avg3mo,
                  rows: [
                    { key: "Down payment", value: fmt(askingPrice) },
                    { key: "Monthly payment", value: "$0" },
                    { key: "Monthly profit", value: fmt(avg3mo) },
                    { key: "Net cash flow / mo", value: fmt(avg3mo), highlight: true },
                    { key: "Total paid (3 yr)", value: fmt(askingPrice) },
                    { key: "Annual ROI", value: `${cashROI.toFixed(1)}%` },
                  ],
                },
                {
                  label: "OPTION B",
                  title: "Seller Financing (70/30)",
                  highlight: false,
                  cashFlow: sfNetCashFlow,
                  rows: [
                    { key: "Down payment (30%)", value: fmt(sfDown) },
                    { key: "Financed (70%, 24 mo, 8%)", value: fmt(sfPrincipal) },
                    { key: "Monthly payment", value: fmt(sfMonthly) },
                    { key: "Monthly profit", value: fmt(avg3mo) },
                    { key: "Net cash flow / mo", value: fmt(sfNetCashFlow), highlight: true },
                    { key: "Total paid (2 yr)", value: fmt(sfTotalCost) },
                    { key: "ROI on cash invested", value: `${sfROI.toFixed(1)}%` },
                  ],
                },
                {
                  label: "OPTION C",
                  title: "SBA Loan (10% down)",
                  highlight: false,
                  cashFlow: sbaNetCashFlow,
                  rows: [
                    { key: "Down payment (10%)", value: fmt(sbaDown) },
                    { key: "Financed (90%, 10 yr, 11%)", value: fmt(sbaPrincipal) },
                    { key: "Monthly payment", value: fmt(sbaMonthly) },
                    { key: "Monthly profit", value: fmt(avg3mo) },
                    { key: "Net cash flow / mo", value: fmt(sbaNetCashFlow), highlight: true },
                    { key: "Total paid (10 yr)", value: fmt(sbaTotalCost) },
                    { key: "ROI on cash invested", value: `${sbaROI.toFixed(1)}%` },
                  ],
                },
              ];

              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Financing Scenarios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {options.map((opt) => (
                      <div
                        key={opt.label}
                        className={`bg-zinc-800/50 rounded-lg p-5 border ${opt.highlight ? "border-emerald-500/50" : "border-zinc-700/40"}`}
                      >
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">{opt.label}</p>
                        <p className="text-white font-bold mb-4">
                          {opt.title}
                          {opt.highlight && (
                            <span className="ml-2 text-xs font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Recommended</span>
                          )}
                        </p>
                        <ul className="space-y-2">
                          {opt.rows.map((row) => (
                            <li key={row.key} className="flex justify-between items-center gap-2">
                              <span className="text-zinc-400 text-sm">{row.key}</span>
                              <span className={`text-sm font-medium ${row.highlight ? (opt.cashFlow >= 0 ? "text-emerald-400" : "text-red-400") : "text-white"}`}>
                                {row.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="text-zinc-600 text-xs italic mt-4">
                    Seller financing availability varies by listing. SBA loans require a US entity and approval process typically takes 60–90 days.
                  </p>
                </div>
              );
            })()}

            {/* ── Seller Profile ────────────────────────────────────── */}
            {(() => {
              if (!data?.assessment || data.assessment.verdictColor === "red") return null;
              const sellerProfiles: Record<string, {
                sellerType: string;
                timeOnPlatform: string;
                reasonForSelling: string;
                otherBusinesses: string;
                responseTime: string;
                negotiationStance: string;
                flag: { type: "red" | "amber" | "green"; label: string; text: string };
                sellerSupport: string;
              }> = {
                "92246": {
                  sellerType: "Individual (Netherlands-based)",
                  timeOnPlatform: "First listing",
                  reasonForSelling: "Focusing on men's basketball channel",
                  otherBusinesses: "Owns competing men's basketball YouTube channel",
                  responseTime: "Fast (typically within 24hrs)",
                  negotiationStance: "Motivated — dropped price from $86K to $71K",
                  flag: { type: "red", label: "Red Flag", text: "Competing channel could split audience post-sale" },
                  sellerSupport: "30-day email support + content production handoff",
                },
                "90544": {
                  sellerType: "Business entity",
                  timeOnPlatform: "Experienced seller (2+ listings)",
                  reasonForSelling: "Portfolio rebalancing",
                  otherBusinesses: "Multiple content properties",
                  responseTime: "Moderate (1–3 days)",
                  negotiationStance: "Firm on price — well-established valuation",
                  flag: { type: "green", label: "Green Flag", text: "Professional seller, clean documentation expected" },
                  sellerSupport: "14-day Zoom training + automation docs",
                },
                "91304": {
                  sellerType: "Individual",
                  timeOnPlatform: "First listing",
                  reasonForSelling: "Moving to new projects",
                  otherBusinesses: "Unknown",
                  responseTime: "Slow (3–5 days)",
                  negotiationStance: "Flexible — channel declining, wants to exit",
                  flag: { type: "amber", label: "Amber Flag", text: "Slow response may indicate disengagement" },
                  sellerSupport: "7-day email support",
                },
              };
              const profile = sellerProfiles[id];
              if (!profile) return null;
              const flagColors: Record<string, string> = {
                red: "border-l-4 border-red-500 bg-red-500/10 pl-3",
                amber: "border-l-4 border-yellow-500 bg-yellow-500/10 pl-3",
                green: "border-l-4 border-emerald-500 bg-emerald-500/10 pl-3",
              };
              const flagTextColors: Record<string, string> = {
                red: "text-red-400",
                amber: "text-yellow-400",
                green: "text-emerald-400",
              };
              const rows: { label: string; value: string }[] = [
                { label: "Seller Type", value: profile.sellerType },
                { label: "Time on Platform", value: profile.timeOnPlatform },
                { label: "Reason for Selling", value: profile.reasonForSelling },
                { label: "Other Businesses", value: profile.otherBusinesses },
                { label: "Response Time", value: profile.responseTime },
                { label: "Negotiation Stance", value: profile.negotiationStance },
                { label: "Seller Support", value: profile.sellerSupport },
              ];
              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Seller Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {rows.map((row) => (
                      <div key={row.label} className="flex justify-between py-1.5 border-b border-zinc-800/50">
                        <span className="text-zinc-500 text-sm">{row.label}</span>
                        <span className="text-zinc-300 text-sm text-right ml-4">{row.value}</span>
                      </div>
                    ))}
                    <div className={`col-span-1 md:col-span-2 mt-2 py-2 rounded ${flagColors[profile.flag.type]}`}>
                      <span className={`text-sm font-semibold ${flagTextColors[profile.flag.type]}`}>{profile.flag.label}: </span>
                      <span className="text-zinc-300 text-sm">{profile.flag.text}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── Buyer Skill Match ─────────────────────────────────── */}
            {(() => {
              if (!data?.assessment || data.assessment.verdictColor === "red") return null;
              const skillData: Record<string, { skills: { subject: string; score: number }[]; overall: number }> = {
                "92246": {
                  skills: [
                    { subject: "Python/AI", score: 9 },
                    { subject: "Content Creation", score: 3 },
                    { subject: "YouTube SEO", score: 5 },
                    { subject: "Sports Knowledge", score: 4 },
                    { subject: "Team Management", score: 7 },
                    { subject: "Financial Analysis", score: 8 },
                  ],
                  overall: 6.0,
                },
                "90544": {
                  skills: [
                    { subject: "Python/AI", score: 10 },
                    { subject: "Content Creation", score: 2 },
                    { subject: "YouTube SEO", score: 4 },
                    { subject: "Tech Domain", score: 9 },
                    { subject: "Team Management", score: 5 },
                    { subject: "Financial Analysis", score: 7 },
                  ],
                  overall: 6.2,
                },
                "91304": {
                  skills: [
                    { subject: "Python/AI", score: 8 },
                    { subject: "Content Creation", score: 5 },
                    { subject: "YouTube SEO", score: 7 },
                    { subject: "Tutorial Expertise", score: 6 },
                    { subject: "Team Management", score: 6 },
                    { subject: "Financial Analysis", score: 6 },
                  ],
                  overall: 6.3,
                },
              };
              const entry = skillData[id];
              if (!entry) return null;
              return (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-1">Buyer Skill Match</h3>
                  <p className="text-xs text-zinc-500 mb-4">Based on your background in Python, AI/automation, and data analysis</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={entry.skills} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="#3f3f46" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 10]}
                        tick={{ fill: "#71717a", fontSize: 10 }}
                        tickCount={6}
                      />
                      <Radar
                        name="Skill Match"
                        dataKey="score"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-emerald-400">{entry.overall.toFixed(1)}</span>
                    <span className="text-zinc-400 text-lg">/10</span>
                    <p className="text-zinc-500 text-sm mt-1">Buyer Skill Match</p>
                  </div>
                </div>
              );
            })()}

            {/* ── Competitor Landscape ──────────────────────────────── */}
            {(() => {
              const competitors: Record<string, { name: string; subs: string; videos: string; niche: string; monet: string }[]> = {
                "92246": [
                  { name: "Swish Cultures", subs: "180K", videos: "800+", niche: "WNBA commentary", monet: "AdSense + Merch" },
                  { name: "WNBA Hoops", subs: "45K", videos: "400+", niche: "WNBA highlights", monet: "AdSense" },
                  { name: "Her Hoop Stats", subs: "25K", videos: "300+", niche: "WNBA analytics", monet: "AdSense + Patreon" },
                  { name: "Caitlin Clark Fan", subs: "90K", videos: "200+", niche: "Player-focused", monet: "AdSense" },
                ],
                "90544": [
                  { name: "Fireship", subs: "3.2M", videos: "700+", niche: "Tech explainers", monet: "AdSense + Sponsors" },
                  { name: "NetworkChuck", subs: "4M", videos: "500+", niche: "IT tutorials", monet: "AdSense + Courses" },
                  { name: "TechWorld with Nana", subs: "1.2M", videos: "200+", niche: "DevOps tutorials", monet: "AdSense + Affiliate" },
                ],
                "91304": [
                  { name: "Think Media", subs: "2.8M", videos: "1200+", niche: "YouTube tutorials", monet: "Affiliate + Courses" },
                  { name: "Nick Nimmin", subs: "1M", videos: "800+", niche: "YouTube growth", monet: "Affiliate + Sponsors" },
                  { name: "vidIQ", subs: "1.5M", videos: "2000+", niche: "YouTube SEO", monet: "SaaS + Affiliate" },
                ],
              };
              const comps = competitors[id];
              if (!comps) return null;
              return (
                <SectionCard icon={Users} title="Competitor Landscape" iconColor="text-violet-400">
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-500">Similar YouTube channels in the same niche. Shows market size and monetization models.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {comps.map((c) => (
                        <div key={c.name} className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0">
                            {c.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-zinc-200">{c.name}</p>
                            <p className="text-[11px] text-zinc-500">{c.niche}</p>
                            <div className="flex gap-3 mt-1 text-[10px] text-zinc-400">
                              <span>{c.subs} subs</span>
                              <span>{c.videos} videos</span>
                              <span className="text-zinc-500">{c.monet}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-600">Note: subscriber counts are approximate. This listing&apos;s channel is smaller but operates in a growing, under-served niche.</p>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Section 2: Financial Performance ──────────────────────── */}
            <SectionCard
              icon={BarChart2}
              title="Financial Performance"
              iconColor="text-emerald-400"
            >
              <div className="space-y-4">
                {/* Current numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Monthly Revenue</div>
                    <div className="font-semibold text-white">
                      {dd?.verifiedPnL ? `$${dd.verifiedPnL.lastMonthRevenue?.toLocaleString()}` : fmtMo(data.listing.monthlyRevenue)}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Monthly Profit</div>
                    <div className="font-semibold text-emerald-400">
                      {dd?.verifiedPnL ? `$${dd.verifiedPnL.lastMonthProfit?.toLocaleString()}` : fmtMo(data.listing.monthlyProfit)}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Profit Margin</div>
                    <div className="font-semibold text-blue-400">
                      {dd?.profitMargin ? `${dd.profitMargin}%` : data.listing.monthlyRevenue > 0
                        ? `${Math.round((data.listing.monthlyProfit / data.listing.monthlyRevenue) * 100)}%`
                        : "—"}
                    </div>
                  </div>
                  {data.assessment && (
                    <>
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Profit Trend</div>
                        <div
                          className={`font-semibold ${
                            data.assessment.trendProfit.startsWith("+")
                              ? "text-emerald-400"
                              : data.assessment.trendProfit.startsWith("-")
                              ? "text-red-400"
                              : "text-zinc-300"
                          }`}
                        >
                          {data.assessment.trendProfit}
                        </div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Traffic Trend</div>
                        <div
                          className={`font-semibold ${
                            data.assessment.trendTraffic.startsWith("+")
                              ? "text-emerald-400"
                              : data.assessment.trendTraffic.startsWith("-")
                              ? "text-red-400"
                              : "text-zinc-300"
                          }`}
                        >
                          {data.assessment.trendTraffic}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* 12-month totals */}
                {dd?.verifiedPnL && (
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 font-medium mb-2">Verified 12-Month P&L</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-zinc-500">12-Mo Revenue</div>
                        <div className="font-semibold text-white">${dd.verifiedPnL.twelveMonthRevenue?.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500">12-Mo Profit</div>
                        <div className="font-semibold text-emerald-400">${dd.verifiedPnL.twelveMonthProfit?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Earnings analysis narrative */}
                {dd?.earningsAnalysis && (
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    {dd.earningsAnalysis.trend && <p><span className="text-zinc-300 font-medium">Trend:</span> {dd.earningsAnalysis.trend}</p>}
                    {dd.earningsAnalysis.seasonal && <p><span className="text-zinc-300 font-medium">Seasonality:</span> {dd.earningsAnalysis.seasonal}</p>}
                    {dd.earningsAnalysis.untappedRevenue && (
                      <p className="text-emerald-400/80"><span className="font-medium">Untapped:</span> {dd.earningsAnalysis.untappedRevenue}</p>
                    )}
                    {dd.earningsAnalysis.noRecurring && (
                      <p className="text-amber-400/80"><span className="font-medium">Note:</span> {dd.earningsAnalysis.noRecurring}</p>
                    )}
                  </div>
                )}
              </div>
            </SectionCard>

            {/* ── Section 3: Traffic & Growth Analysis ──────────────────── */}
            <SectionCard
              icon={TrendingUp}
              title="Traffic & Growth Analysis"
              iconColor="text-violet-400"
            >
              {dd?.trafficBreakdown ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Object.entries(dd.trafficBreakdown as Record<string, string>).map(([key, val]) => {
                      const label = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
                      const numPct = parseFloat(String(val).replace("%", ""));
                      const color = numPct > 40 ? "bg-violet-500" : numPct > 20 ? "bg-blue-500" : numPct > 10 ? "bg-emerald-500" : "bg-zinc-500";
                      return <TrafficBar key={key} label={label} pct={String(val)} color={color} />;
                    })}
                  </div>
                  {dd.trafficAnalysis && (
                    <div className="space-y-1.5 text-xs text-zinc-400">
                      {dd.trafficAnalysis.summary && <p><span className="text-zinc-300 font-medium">Summary:</span> {dd.trafficAnalysis.summary}</p>}
                      {dd.trafficAnalysis.growth && <p><span className="text-zinc-300 font-medium">Growth:</span> {dd.trafficAnalysis.growth}</p>}
                      {dd.trafficAnalysis.dependency && (
                        <p className={dd.trafficAnalysis.dependency.startsWith("CRITICAL") ? "text-red-400/80" : dd.trafficAnalysis.dependency.startsWith("LOW") ? "text-emerald-400/80" : "text-amber-400/80"}>
                          <span className="font-medium">Dependency:</span> {dd.trafficAnalysis.dependency}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : dd?.channelStats?.trafficSources ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Object.entries(dd.channelStats.trafficSources as Record<string, string>).map(([key, val]) => {
                      const label = key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase());
                      const numPct = parseFloat(String(val).replace("%", ""));
                      const color = numPct > 50 ? "bg-violet-500" : numPct > 25 ? "bg-blue-500" : "bg-zinc-500";
                      return <TrafficBar key={key} label={label} pct={String(val)} color={color} />;
                    })}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <div className="text-xs text-zinc-500 mb-1">Subscribers</div>
                      <div className="font-semibold text-white">{dd.channelStats.subscribers?.toLocaleString()}</div>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <div className="text-xs text-zinc-500 mb-1">Monthly Views</div>
                      <div className="font-semibold text-white">{dd.channelStats.monthlyViews?.toLocaleString()}</div>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <div className="text-xs text-zinc-500 mb-1">Avg View Duration</div>
                      <div className="font-semibold text-white">{dd.channelStats.avgWatchTime}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-400">Traffic data not available for this listing.</p>
              )}
            </SectionCard>

            {/* ── Section 4: Seller Due Diligence ───────────────────────── */}
            <SectionCard
              icon={ShieldCheck}
              title="Seller Due Diligence"
              iconColor="text-amber-400"
            >
              {dd?.sellerQandA ? (
                <div className="space-y-3">
                  {Object.entries(dd.sellerQandA as Record<string, string>).map(([q, a]) => {
                    if (!a || a === "UNANSWERED") return (
                      <div key={q} className="border-b border-zinc-700 pb-2 last:border-0">
                        <p className="text-xs font-medium text-zinc-400 capitalize mb-0.5">{q.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-zinc-600 italic">Unanswered</p>
                      </div>
                    );
                    return (
                      <div key={q} className="border-b border-zinc-700 pb-2 last:border-0">
                        <p className="text-xs font-medium text-zinc-400 capitalize mb-0.5">{q.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-zinc-300">{a}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">No seller Q&A data available for this listing.</p>
              )}
            </SectionCard>

            {/* ── Section 5: Operational Playbook ───────────────────────── */}
            <SectionCard
              icon={Target}
              title="Operational Playbook"
              iconColor="text-blue-400"
            >
              <div className="space-y-4">
                {data.assessment?.aiPlan && (
                  <div className="bg-zinc-900 rounded-lg p-3 border border-violet-500/30">
                    <div className="text-xs text-violet-400 font-semibold mb-1 flex items-center gap-1">
                      <Bot className="w-3 h-3" /> AI+VA Operating Plan
                    </div>
                    <p className="text-sm text-zinc-300">{data.assessment.aiPlan}</p>
                  </div>
                )}

                {/* Production workflow for YouTube channels */}
                {dd?.productionWorkflow && (
                  <div>
                    <p className="text-xs text-zinc-500 font-medium mb-2">Production Workflow (Step by Step)</p>
                    <ol className="space-y-1.5">
                      {Object.entries(dd.productionWorkflow as Record<string, string>)
                        .filter(([k]) => k.startsWith("step"))
                        .map(([k, v]) => (
                          <li key={k} className="text-xs text-zinc-400 flex gap-2">
                            <span className="text-blue-400 shrink-0 font-mono w-8">
                              {k.replace("step", "S")}
                            </span>
                            {v}
                          </li>
                        ))}
                    </ol>
                    {dd.productionWorkflow.totalProductionCost && (
                      <p className="text-xs text-zinc-500 mt-2">
                        <span className="text-zinc-400 font-medium">Cost per video:</span> {dd.productionWorkflow.totalProductionCost}
                        {dd.productionWorkflow.videosPerMonth && ` · ${dd.productionWorkflow.videosPerMonth}`}
                      </p>
                    )}
                  </div>
                )}

                {/* Hours required */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 rounded-lg p-2.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>
                    <span className="text-zinc-300 font-medium">Time commitment:</span>{" "}
                    {dd?.workPerWeek ?? "Not specified"}
                  </span>
                </div>
              </div>
            </SectionCard>

            {/* ── Section 6: VA Requirements & Costs ────────────────────── */}
            <SectionCard
              icon={Users}
              title="VA Requirements & Costs"
              iconColor="text-emerald-400"
            >
              {VA_PLANS[id] ? (
                <div className="space-y-3">
                  {VA_PLANS[id].map((va, i) => (
                    <div key={i} className="bg-zinc-900 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-zinc-200">{va.role}</p>
                        <span className="text-xs text-emerald-400 font-mono shrink-0">{va.costPerMonth}/mo</span>
                      </div>
                      <p className="text-xs text-zinc-400">{va.tasks}</p>
                      <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~{va.hoursPerWeek}hrs/week
                      </p>
                    </div>
                  ))}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-xs text-zinc-400">
                      <span className="text-emerald-400 font-medium">Total VA budget estimate: </span>
                      {VA_PLANS[id].map(v => v.costPerMonth).join(" + ")}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Sourced via OnlineJobs.ph (Philippines VAs) and Upwork (dev). Rates are market estimates for 2026.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-400">VA cost breakdown not available for this listing.</p>
              )}
            </SectionCard>

            {/* ── Section 7: Risk Assessment ────────────────────────────── */}
            <SectionCard
              icon={AlertTriangle}
              title="Risk Assessment"
              iconColor="text-red-400"
            >
              {data.assessment ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-emerald-400 font-medium mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {data.assessment.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                          <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs text-red-400 font-medium mb-2 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Risks
                    </div>
                    <ul className="space-y-1.5">
                      {(dd?.risks ?? data.assessment.risks).map((r: string, i: number) => (
                        <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">-</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-emerald-400 font-medium mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Reasons For
                    </div>
                    <ul className="space-y-1.5">
                      {data.listing.reasonsFor.map((r, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                          <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs text-red-400 font-medium mb-2 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Risks
                    </div>
                    <ul className="space-y-1.5">
                      {data.listing.reasonsAgainst.map((r, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">-</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </SectionCard>

            {/* ── Section 8: Growth Opportunities ───────────────────────── */}
            <SectionCard
              icon={Lightbulb}
              title="Growth Opportunities"
              iconColor="text-amber-400"
            >
              {dd?.opportunities && Array.isArray(dd.opportunities) ? (
                <ul className="space-y-2">
                  {dd.opportunities.map((opp: string, i: number) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2">
                      <span className="text-amber-400 shrink-0 mt-0.5">→</span>
                      {opp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500 italic">Detailed growth analysis not yet available for this listing. See the main dashboard for verified picks.</p>
              )}
            </SectionCard>

            {/* ── Section 9: Head-to-Head Comparison ────────────────────── */}
            <SectionCard
              icon={Swords}
              title="Head-to-Head — All Assessed Listings"
              iconColor="text-blue-400"
            >
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left text-zinc-500 font-medium pb-2 pr-4">Business</th>
                      <th className="text-right text-zinc-500 font-medium pb-2 px-2">Price</th>
                      <th className="text-right text-zinc-500 font-medium pb-2 px-2">Profit/mo</th>
                      <th className="text-right text-zinc-500 font-medium pb-2 px-2">ROI</th>
                      <th className="text-right text-zinc-500 font-medium pb-2 px-2">Profit ▲</th>
                      <th className="text-right text-zinc-500 font-medium pb-2 px-2">Multiple</th>
                      <th className="text-left text-zinc-500 font-medium pb-2 pl-2">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPERT_ASSESSMENTS.filter((a) => a.verdictColor !== "red").map((a) => (
                      <tr
                        key={a.id}
                        className={`border-b border-zinc-800 last:border-0 ${a.id === id ? "bg-zinc-700/20" : ""}`}
                      >
                        <td className="py-2 pr-4">
                          <Link
                            href={`/investimentos-online/${a.id}`}
                            className={`hover:underline ${a.id === id ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}
                          >
                            {a.name}
                          </Link>
                          {a.id === id && <span className="ml-1.5 text-zinc-600">← you are here</span>}
                        </td>
                        <td className="text-right py-2 px-2 text-zinc-300">{a.price}</td>
                        <td className="text-right py-2 px-2 text-emerald-400">{a.monthlyProfit}</td>
                        <td className="text-right py-2 px-2 text-blue-400">{a.annualROI}</td>
                        <td className={`text-right py-2 px-2 font-medium ${a.trendProfit.startsWith("+") ? "text-emerald-400" : a.trendProfit.startsWith("-") ? "text-red-400" : "text-zinc-400"}`}>
                          {a.trendProfit}
                        </td>
                        <td className="text-right py-2 px-2 text-zinc-400">
                          {(() => { const p = parseFloat(a.price.replace(/[$,]/g, "")); const m = parseFloat(a.monthlyProfit.replace(/[$,]/g, "")); return isFinite(p / m) ? `${Math.round(p / m)}x` : "—"; })()}
                        </td>
                        <td className="pl-2 py-2">
                          <VerdictBadge verdict={a.verdict.length > 15 ? a.verdict.slice(0, 15) + "…" : a.verdict} color={a.verdictColor} />
                        </td>
                      </tr>
                    ))}
                    <tr><td colSpan={7} className="pt-3 pb-1 text-zinc-600 text-[10px] uppercase tracking-wider font-medium">Eliminated ({EXPERT_ASSESSMENTS.filter((a) => a.verdictColor === "red").length})</td></tr>
                    {EXPERT_ASSESSMENTS.filter((a) => a.verdictColor === "red").map((a) => (
                      <tr
                        key={a.id}
                        className={`border-b border-zinc-800/50 last:border-0 opacity-50 ${a.id === id ? "bg-zinc-700/20 opacity-100" : ""}`}
                      >
                        <td className="py-1.5 pr-4">
                          <Link
                            href={`/investimentos-online/${a.id}`}
                            className="text-zinc-500 hover:text-zinc-400 hover:underline text-[11px]"
                          >
                            {a.name}
                          </Link>
                        </td>
                        <td className="text-right py-1.5 px-2 text-zinc-600 text-[11px]">{a.price}</td>
                        <td className="text-right py-1.5 px-2 text-zinc-600 text-[11px]">{a.monthlyProfit}</td>
                        <td className="text-right py-1.5 px-2 text-zinc-600 text-[11px]">{a.annualROI}</td>
                        <td className="text-right py-1.5 px-2 text-red-400/50 text-[11px]">{a.trendProfit}</td>
                        <td className="text-right py-1.5 px-2 text-zinc-600 text-[11px]">
                          {(() => { const p = parseFloat(a.price.replace(/[$,]/g, "")); const m = parseFloat(a.monthlyProfit.replace(/[$,]/g, "")); return isFinite(p / m) ? `${Math.round(p / m)}x` : "—"; })()}
                        </td>
                        <td className="pl-2 py-1.5">
                          <span className="text-red-400/60 text-[10px]">ELIMINATED</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Key differentiators */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                <div className="bg-zinc-900 rounded-lg p-2.5">
                  <p className="text-zinc-300 font-medium mb-1">Core pick</p>
                  <p>Ace Hoops WNBA — seasonal growth, faceless, €70/video production</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-2.5">
                  <p className="text-zinc-300 font-medium mb-1">Second pick</p>
                  <p>3× Tech YouTube — faceless, 10K videos, 1hr/wk, negotiate to $79K</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-2.5">
                  <p className="text-zinc-300 font-medium mb-1">Alternative if #90544 fails</p>
                  <p>#91304 Faceless Tutorials — $60K, 2hrs/wk, 94% margin, AI-scriptable</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-2.5">
                  <p className="text-zinc-300 font-medium mb-1">18 listings analyzed, 14 eliminated</p>
                  <p>All surviving picks are faceless YouTube — no personal brand risk</p>
                </div>
              </div>
            </SectionCard>

            {/* ── Section 10: Investment Recommendation ─────────────────── */}
            <SectionCard
              icon={LineChart}
              title="Investment Recommendation"
              iconColor="text-emerald-400"
            >
              {data.assessment?.recommendation ? (
                <div className="space-y-4">
                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-600">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">
                        Final Verdict
                      </span>
                      <VerdictBadge
                        verdict={data.assessment.verdict}
                        color={data.assessment.verdictColor}
                      />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.assessment.recommendation}
                    </p>
                  </div>

                  {/* Negotiation target — only for actionable picks */}
                  {data.assessment.verdictColor !== "red" && data.assessment.recommendation.match(/(?:Offer|negotiate)\s+\$[\d,K]+/) && (
                    <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                      <p className="text-xs text-zinc-300">
                        <span className="text-emerald-400 font-medium">Negotiation target: </span>
                        {data.assessment.recommendation.match(/(?:Negotiate|Offer|negotiate)\s+(?:to\s+)?(\$[\d,K–]+)/)?.[1]?.replace(/,$/, "") ?? "See recommendation above"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">No investment recommendation available for this listing.</p>
              )}
            </SectionCard>

            {/* ── Negotiation Playbook ───────────────────────────────────── */}
            {(() => {
              const neg = NEGOTIATION_STRATEGIES.find((n) => n.listingId === id);
              if (!neg) return null;
              return (
                <SectionCard
                  icon={Target}
                  title="Negotiation Playbook"
                  iconColor="text-emerald-400"
                >
                  <div className="space-y-5">
                    {/* Price flow */}
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-3">Price Summary</p>
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2">
                        <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-center">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Asking</p>
                          <p className="text-sm font-semibold text-zinc-300">{fmt(neg.askingPrice)}</p>
                        </div>
                        <div className="bg-zinc-900 border border-emerald-500/30 rounded-lg px-3 py-2 text-center">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Opening Offer</p>
                          <p className="text-sm font-semibold text-emerald-400">{fmt(neg.openingOffer)}</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2 text-center">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Target Settle</p>
                          <p className="text-sm font-bold text-emerald-300">{fmt(neg.targetSettle)}</p>
                        </div>
                        <div className="bg-zinc-900 border border-red-500/30 rounded-lg px-3 py-2 text-center">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Walk Away</p>
                          <p className="text-sm font-semibold text-red-400">{fmt(neg.walkAway)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Leverage points */}
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-2">Leverage Points</p>
                      <ul className="space-y-1.5">
                        {neg.leverage.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timing */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                      <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">Timing</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{neg.timing}</p>
                    </div>

                    {/* Step-by-step sequence */}
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-2">Step-by-Step Sequence</p>
                      <ol className="space-y-2">
                        {neg.sequence.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-zinc-700 text-zinc-300 text-xs font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <span>{step.replace(/^\d+\.\s*/, "")}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── LOI Template ──────────────────────────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              const neg = NEGOTIATION_STRATEGIES.find((n) => n.listingId === id);
              if (!fin || !neg || !data?.assessment || data.assessment.verdictColor === "red") return null;
              const loiText = `Dear Empire Flippers Team,

I am writing to express my interest in acquiring Listing #${id} ("${fin.name}") currently listed at $${fin.askingPrice.toLocaleString()}.

OFFER DETAILS:
- Offer Price: $${neg.openingOffer.toLocaleString()} USD
- Earnout: 60-day performance-based earnout period
- Conditions: Subject to verification of P&L via bank statements, confirmation of transferable accounts (AdSense, affiliate programs), and 30-day seller training/handover

RATIONALE:
Based on my analysis, the 3-month average monthly profit of $${fin.avg3mo.toLocaleString()} represents the current run rate, which is ${Math.round(((fin.avg12mo - fin.avg3mo) / fin.avg12mo) * 100)}% below the 12-month average of $${fin.avg12mo.toLocaleString()}. My offer of $${neg.openingOffer.toLocaleString()} reflects a ${Math.round(fin.avg3mo > 0 ? neg.openingOffer / fin.avg3mo : 0)}x multiple on current earnings, which I believe is fair given the current revenue trajectory.

I am a serious buyer with funds available and can proceed with due diligence immediately upon acceptance.

Best regards,
[Your Name]`;
              return (
                <SectionCard icon={DollarSign} title="Letter of Intent Template" iconColor="text-emerald-400">
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-500">Pre-filled LOI based on negotiation strategy. Copy and customize before sending.</p>
                    <div className="bg-zinc-900 rounded-lg p-4 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed border border-zinc-800 max-h-64 overflow-y-auto">
                      {loiText}
                    </div>
                    <button
                      onClick={() => { navigator.clipboard.writeText(loiText); setLoiCopied(true); setTimeout(() => setLoiCopied(false), 2000); }}
                      className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${loiCopied ? "bg-emerald-700" : "bg-emerald-600 hover:bg-emerald-500"}`}
                    >
                      {loiCopied ? "Copied!" : "Copy to Clipboard"}
                    </button>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Acquisition Timeline ───────────────────────────────────── */}
            {data.assessment && data.assessment.verdictColor !== "red" && (
            <SectionCard
              icon={Clock}
              title="Acquisition Timeline"
              iconColor="text-blue-400"
            >
              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[72px] top-3 bottom-3 w-px bg-zinc-700" />
                <div className="space-y-5">
                  {ACQUISITION_TIMELINE.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {/* Date */}
                      <div className="w-16 shrink-0 text-right">
                        <span className="text-xs text-zinc-500 leading-tight">{step.date}</span>
                      </div>
                      {/* Dot */}
                      <div className="relative z-10 shrink-0 mt-1.5 w-3 h-3 rounded-full bg-zinc-700 border-2 border-zinc-500" />
                      {/* Content */}
                      <div className="flex-1 pb-1">
                        <p className="text-sm font-medium text-white leading-snug">{step.action}</p>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{step.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
            )}

            {/* ── Section 11: Due Diligence Checklist ───────────────────── */}
            {data.assessment && data.assessment.verdictColor !== "red" && (() => {
              const categories = Array.from(new Set(DUE_DILIGENCE_CHECKLIST.map((i) => i.category)));
              const applicableItems = DUE_DILIGENCE_CHECKLIST.filter((i) => i.status !== "not-applicable");
              const doneCount = applicableItems.filter((i) => i.status === "done" || ddChecked.has(i.item)).length;
              const totalCount = applicableItems.length;
              const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
              return (
                <SectionCard icon={ShieldCheck} title="Due Diligence Checklist" iconColor="text-blue-400">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 shrink-0">
                        <span className="text-emerald-400 font-semibold">{doneCount}</span> of{" "}
                        <span className="font-semibold text-zinc-300">{totalCount}</span> completed
                        {pct === 100 && <span className="ml-1 text-emerald-400">✓</span>}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600">Click items to mark as completed. Progress is saved locally.</p>

                    {categories.map((cat) => (
                      <div key={cat}>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{cat}</p>
                        <div className="space-y-2">
                          {DUE_DILIGENCE_CHECKLIST.filter((item) => item.category === cat).map((item, idx) => {
                            const isNA = item.status === "not-applicable";
                            const isDone = item.status === "done" || ddChecked.has(item.item);
                            const effectiveStatus = isNA ? "not-applicable" : isDone ? "done" : "pending";
                            const statusIcon =
                              effectiveStatus === "done" ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : effectiveStatus === "pending" ? (
                                <span className="w-4 h-4 rounded-full border-2 border-amber-400 shrink-0 mt-0.5 inline-block" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border-2 border-zinc-600 shrink-0 mt-0.5 inline-block" />
                              );
                            const priorityBadge =
                              item.priority === "critical" ? (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">CRITICAL</span>
                              ) : item.priority === "important" ? (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">IMPORTANT</span>
                              ) : (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-500 border border-zinc-600 shrink-0">NICE-TO-HAVE</span>
                              );
                            return (
                              <button
                                key={idx}
                                onClick={() => !isNA && toggleDdItem(item.item)}
                                disabled={isNA}
                                className={`w-full text-left bg-zinc-900 rounded-lg p-3 transition-all duration-200 ${isNA ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-800 cursor-pointer hover:ring-1 hover:ring-zinc-700"}`}
                              >
                                <div className="flex items-start gap-2">
                                  {statusIcon}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2 flex-wrap">
                                      <p className={`text-xs flex-1 ${effectiveStatus === "done" ? "text-zinc-400 line-through" : isNA ? "text-zinc-600" : "text-zinc-300"}`}>
                                        {item.item}
                                      </p>
                                      {priorityBadge}
                                    </div>
                                    {item.notes && (
                                      <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">{item.notes}</p>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Section 12: Portfolio Risk Analysis ───────────────────── */}
            {(() => {
              const scenario = PORTFOLIO_SCENARIOS.find((p) => p.listings.includes(id));
              if (!scenario) return null;
              const corrColor =
                scenario.correlationRisk === "high"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : scenario.correlationRisk === "medium"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
              return (
                <SectionCard icon={BarChart2} title="Portfolio Risk Analysis" iconColor="text-violet-400">
                  <div className="space-y-4">
                    {/* Scenario name + description */}
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <p className="text-sm font-semibold text-zinc-200">{scenario.name}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${corrColor}`}>
                          {scenario.correlationRisk.toUpperCase()} CORRELATION
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{scenario.description}</p>
                    </div>

                    {/* Key metrics row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-zinc-500 mb-1">Total Cost</div>
                        <div className="text-base font-bold text-white">${(scenario.totalCost / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-zinc-500 mb-1">Monthly Profit</div>
                        <div className="text-base font-bold text-emerald-400">${scenario.monthlyProfit.toLocaleString()}</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-zinc-500 mb-1">Annual ROI</div>
                        <div className="text-base font-bold text-blue-400">{scenario.annualROI}%</div>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-zinc-500 mb-1">Payback</div>
                        <div className="text-base font-bold text-zinc-300">{scenario.paybackMonths} mo</div>
                      </div>
                    </div>

                    {/* Worst vs Best case */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                        <p className="text-xs font-semibold text-red-400 mb-2">Worst Case (-30% revenue)</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Monthly profit</span>
                            <span className="text-zinc-300 font-medium">${scenario.worstCase.monthlyProfit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Annual ROI</span>
                            <span className="text-red-400 font-medium">{scenario.worstCase.annualROI}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                        <p className="text-xs font-semibold text-emerald-400 mb-2">Best Case (peak season)</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Monthly profit</span>
                            <span className="text-zinc-300 font-medium">${scenario.bestCase.monthlyProfit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Annual ROI</span>
                            <span className="text-emerald-400 font-medium">{scenario.bestCase.annualROI}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Correlation risk explanation */}
                    {scenario.correlationRisk === "high" && (
                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-400">
                          <span className="text-red-400 font-medium">High correlation risk: </span>
                          Both listings in this portfolio are YouTube channels. A platform-wide algorithm change or policy update would impact all holdings simultaneously.
                        </p>
                      </div>
                    )}
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Exit Strategy ─────────────────────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin || !data?.assessment || data.assessment.verdictColor === "red") return null;
              const buyPrice = fin.targetPrice;
              const monthlyProfit = fin.avg12mo; // Use 12-month avg for seasonal assets
              const efMultiples = { yr1: 30, yr2: 34, yr3: 38 };
              const scenarios = [
                {
                  label: "Year 1",
                  months: 12,
                  growthRate: 0,
                  multiple: efMultiples.yr1,
                },
                {
                  label: "Year 2",
                  months: 24,
                  growthRate: 0.1,
                  multiple: efMultiples.yr2,
                },
                {
                  label: "Year 3",
                  months: 36,
                  growthRate: 0.2,
                  multiple: efMultiples.yr3,
                },
              ];
              return (
                <SectionCard icon={TrendingUp} title="Exit Strategy — Resale Projections" iconColor="text-violet-400">
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-500">
                      Estimated resale value based on EF marketplace multiples (30-38x monthly profit).
                      Growth assumptions: 0% yr1, 10% yr2, 20% yr3 (content optimization + SEO).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {scenarios.map((s) => {
                        const grownProfit = Math.round(monthlyProfit * (1 + s.growthRate));
                        const resaleValue = grownProfit * s.multiple;
                        const cashFlow = grownProfit * s.months;
                        const totalReturn = cashFlow + resaleValue - buyPrice;
                        const totalROI = Math.round((totalReturn / buyPrice) * 100);
                        return (
                          <div key={s.label} className="bg-zinc-900 rounded-lg p-4 space-y-3">
                            <p className="text-sm font-semibold text-zinc-200">{s.label} Exit</p>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Monthly profit</span>
                                <span className="text-zinc-300">${grownProfit.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Cash flow ({s.months}mo)</span>
                                <span className="text-zinc-300">${cashFlow.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Resale ({s.multiple}x)</span>
                                <span className="text-emerald-400 font-semibold">${resaleValue.toLocaleString()}</span>
                              </div>
                              <div className="border-t border-zinc-800 my-1" />
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Total return</span>
                                <span className="text-white font-bold">${totalReturn.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Total ROI</span>
                                <span className={`font-bold ${totalROI > 100 ? "text-emerald-400" : totalROI > 50 ? "text-blue-400" : "text-amber-400"}`}>
                                  {totalROI}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                      <p className="text-xs text-zinc-400">
                        <span className="text-amber-400 font-semibold">Hold vs Flip:</span>{" "}
                        {monthlyProfit * 36 + monthlyProfit * 1.2 * efMultiples.yr3 > buyPrice * 3
                          ? "Strong hold candidate — cumulative cash flow + exit value significantly exceeds purchase price."
                          : "Consider flipping after Year 2 if growth targets are met. Re-invest proceeds into higher-growth assets."}
                      </p>
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Content Calendar (92246 only) ─────────────────────── */}
            {id === "92246" && data?.assessment && data.assessment.verdictColor !== "red" && (
              <SectionCard icon={Clock} title="Weekly Content Calendar — WNBA Season" iconColor="text-blue-400">
                <div className="space-y-4">
                  <p className="text-xs text-zinc-500">Recommended publishing schedule during WNBA season (May-Oct). AI-scripted, VA-produced, 4-6 videos/week.</p>
                  <div className="grid grid-cols-7 gap-1.5">
                    {[
                      { day: "Mon", type: "Game Recap", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                      { day: "Tue", type: "Player Spotlight", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                      { day: "Wed", type: "News & Trades", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                      { day: "Thu", type: "Game Preview", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
                      { day: "Fri", type: "Rankings/Lists", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
                      { day: "Sat", type: "Game Recap", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                      { day: "Sun", type: "Week Wrap-Up", color: "bg-zinc-700/50 text-zinc-400 border-zinc-600" },
                    ].map((slot) => (
                      <div key={slot.day} className={`rounded-lg p-2 text-center border ${slot.color}`}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1">{slot.day}</p>
                        <p className="text-[10px] leading-tight">{slot.type}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <p className="text-zinc-500 mb-1">Production</p>
                      <p className="text-zinc-300">AI writes script → Clipper finds footage → Editor assembles → Upload</p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <p className="text-zinc-500 mb-1">Your time</p>
                      <p className="text-zinc-300">~30 min/day: review scripts, approve edits, check analytics</p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <p className="text-zinc-500 mb-1">Off-season (Nov-Apr)</p>
                      <p className="text-zinc-300">2 videos/week: draft picks, trades, college basketball crossovers</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* ── Seasonal Revenue Heatmap ─────────────────────────── */}
            {(() => {
              const fin = LISTING_FINANCIALS.find((f) => f.id === id);
              if (!fin || fin.seasonality !== "high") return null;
              const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              const byYear: Record<string, Record<string, number>> = {};
              fin.monthlyProfitHistory.forEach((h) => {
                const [m, y] = h.month.split(" ");
                const year = `20${y}`;
                if (!byYear[year]) byYear[year] = {};
                byYear[year][m] = h.profit;
              });
              const years = Object.keys(byYear).sort();
              const allProfits = fin.monthlyProfitHistory.map((h) => h.profit);
              const maxProfit = Math.max(...allProfits);
              const minProfit = Math.min(...allProfits);
              const getColor = (val: number) => {
                const ratio = (val - minProfit) / (maxProfit - minProfit || 1);
                if (ratio > 0.8) return "bg-emerald-500/60 text-emerald-100";
                if (ratio > 0.6) return "bg-emerald-500/30 text-emerald-300";
                if (ratio > 0.4) return "bg-amber-500/30 text-amber-300";
                if (ratio > 0.2) return "bg-amber-500/15 text-amber-400";
                return "bg-red-500/20 text-red-400";
              };
              return (
                <SectionCard icon={BarChart2} title="Seasonal Revenue Heatmap" iconColor="text-amber-400">
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-500">Monthly profit by year. Green = peak season, red = off-season. WNBA runs May-Oct.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs min-w-[500px]">
                        <thead>
                          <tr>
                            <th className="text-left text-zinc-500 pb-2 pr-2">Year</th>
                            {monthOrder.map((m) => (
                              <th key={m} className="text-center text-zinc-500 pb-2 px-0.5 text-[10px]">{m}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {years.map((yr) => (
                            <tr key={yr}>
                              <td className="text-zinc-400 font-semibold pr-2 py-0.5">{yr}</td>
                              {monthOrder.map((m) => {
                                const val = byYear[yr][m];
                                return (
                                  <td key={m} className="px-0.5 py-0.5">
                                    {val !== undefined ? (
                                      <div className={`rounded px-1 py-1.5 text-center text-[10px] font-semibold ${getColor(val)}`}>
                                        ${(val / 1000).toFixed(1)}k
                                      </div>
                                    ) : (
                                      <div className="rounded px-1 py-1.5 text-center text-[10px] text-zinc-700">—</div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <span className="w-3 h-3 rounded bg-red-500/20 inline-block" /> Off-season
                      <span className="w-3 h-3 rounded bg-amber-500/20 inline-block ml-2" /> Transition
                      <span className="w-3 h-3 rounded bg-emerald-500/40 inline-block ml-2" /> Peak
                    </div>
                  </div>
                </SectionCard>
              );
            })()}

            {/* ── Section 13: 90-Day Post-Acquisition Plan ───────────────── */}
            {data.assessment && data.assessment.verdictColor !== "red" && (() => {
              const phases = [
                { label: "Week 1", days: [1, 7], color: "emerald" },
                { label: "Month 1", days: [8, 30], color: "blue" },
                { label: "Month 2", days: [31, 60], color: "amber" },
                { label: "Month 3", days: [61, 90], color: "violet" },
              ] as const;
              const getPhase = (day: number) => {
                if (day <= 7) return "Week 1";
                if (day <= 30) return "Month 1";
                if (day <= 60) return "Month 2";
                return "Month 3";
              };
              const milestones = POST_ACQUISITION_PLAN.filter(
                (m) => m.listing === "all" || m.listing === id
              );
              const phaseColorMap: Record<string, { header: string; dot: string; badge: string }> = {
                "Week 1": {
                  header: "text-emerald-400",
                  dot: "bg-emerald-500/30 border-emerald-500",
                  badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
                },
                "Month 1": {
                  header: "text-blue-400",
                  dot: "bg-blue-500/30 border-blue-500",
                  badge: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
                },
                "Month 2": {
                  header: "text-amber-400",
                  dot: "bg-amber-500/30 border-amber-500",
                  badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
                },
                "Month 3": {
                  header: "text-violet-400",
                  dot: "bg-violet-500/30 border-violet-500",
                  badge: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
                },
              };
              return (
                <SectionCard icon={Clock} title="90-Day Post-Acquisition Plan" iconColor="text-emerald-400">
                  <div className="space-y-6">
                    {phases.map((phase) => {
                      const items = milestones.filter((m) => getPhase(m.day) === phase.label);
                      if (items.length === 0) return null;
                      const colors = phaseColorMap[phase.label];
                      return (
                        <div key={phase.label}>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${colors.header}`}>
                            {phase.label}
                          </p>
                          <div className="relative">
                            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-zinc-700" />
                            <div className="space-y-4">
                              {items.map((m, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  {/* Day badge */}
                                  <div className="w-10 shrink-0 text-right">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors.badge}`}>
                                      D{m.day}
                                    </span>
                                  </div>
                                  {/* Dot */}
                                  <div className={`relative z-10 shrink-0 mt-1.5 w-3 h-3 rounded-full border-2 ${colors.dot}`} />
                                  {/* Content */}
                                  <div className="flex-1 pb-0.5">
                                    <p className="text-sm font-medium text-white leading-snug">{m.task}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{m.details}</p>
                                    {m.listing !== "all" && (
                                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                                        #{m.listing}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SectionCard>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}
