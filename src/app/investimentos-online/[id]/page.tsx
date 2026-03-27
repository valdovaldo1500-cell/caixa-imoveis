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
import { DUE_DILIGENCE_CHECKLIST, PORTFOLIO_SCENARIOS, NEGOTIATION_STRATEGIES, ACQUISITION_TIMELINE, POST_ACQUISITION_PLAN, LISTING_FINANCIALS } from "@/data/portfolio-analysis";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestimentosOnlineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ddChecked, setDdChecked] = useState<Set<string>>(new Set());

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
                          interval={0}
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
                <table className="w-full text-xs">
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
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-center min-w-[90px]">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Asking</p>
                          <p className="text-sm font-semibold text-zinc-300">{fmt(neg.askingPrice)}</p>
                        </div>
                        <span className="text-zinc-600 text-lg font-light">→</span>
                        <div className="bg-zinc-900 border border-emerald-500/30 rounded-lg px-3 py-2 text-center min-w-[90px]">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Opening Offer</p>
                          <p className="text-sm font-semibold text-emerald-400">{fmt(neg.openingOffer)}</p>
                        </div>
                        <span className="text-zinc-600 text-lg font-light">→</span>
                        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2 text-center min-w-[90px]">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Target Settle</p>
                          <p className="text-sm font-bold text-emerald-300">{fmt(neg.targetSettle)}</p>
                        </div>
                        <span className="text-zinc-600 text-lg font-light">→</span>
                        <div className="bg-zinc-900 border border-red-500/30 rounded-lg px-3 py-2 text-center min-w-[90px]">
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
              const doneCount = DUE_DILIGENCE_CHECKLIST.filter((i) => i.status === "done").length;
              const totalCount = DUE_DILIGENCE_CHECKLIST.filter((i) => i.status !== "not-applicable").length;
              return (
                <SectionCard icon={ShieldCheck} title="Due Diligence Checklist" iconColor="text-blue-400">
                  <div className="space-y-5">
                    {/* Progress summary */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 shrink-0">
                        <span className="text-emerald-400 font-semibold">{doneCount}</span> of{" "}
                        <span className="font-semibold text-zinc-300">{totalCount}</span> completed
                      </span>
                    </div>

                    {/* Items grouped by category */}
                    {categories.map((cat) => (
                      <div key={cat}>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{cat}</p>
                        <div className="space-y-2">
                          {DUE_DILIGENCE_CHECKLIST.filter((item) => item.category === cat).map((item, idx) => {
                            const statusIcon =
                              item.status === "done" ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : item.status === "pending" ? (
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
                              <div key={idx} className="bg-zinc-900 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  {statusIcon}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2 flex-wrap">
                                      <p className={`text-xs flex-1 ${item.status === "done" ? "text-zinc-400 line-through" : item.status === "not-applicable" ? "text-zinc-600" : "text-zinc-300"}`}>
                                        {item.item}
                                      </p>
                                      {priorityBadge}
                                    </div>
                                    {item.notes && (
                                      <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">{item.notes}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
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
