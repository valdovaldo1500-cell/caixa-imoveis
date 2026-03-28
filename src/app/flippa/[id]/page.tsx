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
import type { FlippaListing } from "@/data/flippa-listings";
import type { FlippaExpertAssessment } from "@/data/flippa-expert-assessments";
import { flippaExpertAssessments } from "@/data/flippa-expert-assessments";
import { flippaListings, ELIMINATED_IDS } from "@/data/flippa-listings";

// ─── Types ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DD = Record<string, any>;

interface DetailData {
  listing: FlippaListing;
  assessment: FlippaExpertAssessment | null;
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
  app: "App",
  newsletter: "Newsletter",
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

function RecBadge({ rec }: { rec: FlippaListing["recommendation"] }) {
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

// ─── VA Plans (keyed by Flippa listing ID) ────────────────────────────────────
const VA_PLANS: Record<string, { role: string; tasks: string; hoursPerWeek: number; costPerMonth: string }[]> = {
  // Add Flippa-specific VA plans here as listings are added
  // Example structure (placeholder):
  // "12345678": [
  //   { role: "Content VA (Philippines)", tasks: "Write and publish blog posts with AI assistance", hoursPerWeek: 20, costPerMonth: "$400–600" },
  // ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FlippaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/flippa/${id}`, { credentials: "include" })
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
          href="/flippa"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all Flippa listings
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
              href="/flippa"
              className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all Flippa listings
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
                    {/* listingType badge */}
                    {data.listing.listingType === "buy_now" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Buy Now
                      </span>
                    )}
                    {data.listing.listingType === "auction" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Auction
                      </span>
                    )}
                    {data.listing.listingType === "offer" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Make Offer
                      </span>
                    )}
                    {/* verificationStatus badge */}
                    {data.listing.verificationStatus === "verified" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Verified ✓
                      </span>
                    )}
                    {data.listing.verificationStatus === "partial" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        Partial
                      </span>
                    )}
                    {data.listing.verificationStatus === "unverified" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        Unverified
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    {data.assessment?.name ?? data.listing.title}
                  </h1>
                  <p className="text-sm text-zinc-400">
                    {CAT_LABELS[data.listing.category ?? ""] ?? data.listing.niche} &middot;{" "}
                    {data.listing.monetization} &middot; Est.{" "}
                    {data.listing.firstMadeMoney}
                  </p>
                </div>
                <a
                  href={`https://flippa.com/${data.listing.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors shrink-0 border border-blue-500/30 rounded-lg px-3 py-1.5"
                >
                  View on Flippa
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* KPI row — 5 metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Asking Price</div>
                  <div className="text-xl font-bold text-white">
                    {data.assessment?.price ?? fmt(data.listing.price ?? null)}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Net Profit / mo</div>
                  <div className="text-xl font-bold text-emerald-400">
                    {data.assessment?.monthlyProfit ??
                      fmtMo(data.listing.monthlyProfit ?? 0)}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">Annual ROI</div>
                  <div className="text-xl font-bold text-blue-400">
                    {data.assessment?.annualROI ??
                      (annualRoi(data.listing.price ?? null, data.listing.monthlyProfit ?? 0)
                        ? `${annualRoi(
                            data.listing.price ?? null,
                            data.listing.monthlyProfit ?? 0
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
                <div className="bg-zinc-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" /> Offers
                  </div>
                  <div className="text-xl font-bold text-amber-400">
                    {(data.listing.offersCount ?? 0) > 0
                      ? `${data.listing.offersCount} Offer${data.listing.offersCount === 1 ? "" : "s"}`
                      : "No Offers"}
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Type</div>
                    <div className="text-zinc-300 font-medium">{CAT_LABELS[data.listing.category ?? ""] ?? data.listing.category}</div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Industry</div>
                    <div className="text-zinc-300 font-medium">{data.listing.niche}</div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Monetization</div>
                    <div className="text-zinc-300 font-medium">{data.listing.monetization}</div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Business Age</div>
                    <div className="text-zinc-300 font-medium">
                      {data.listing.businessAge} yr{data.listing.businessAge !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
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

            {/* ── Section 2: Financial Performance ──────────────────────── */}
            <SectionCard
              icon={BarChart2}
              title="Financial Performance"
              iconColor="text-emerald-400"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Monthly Revenue</div>
                    <div className="font-semibold text-white">
                      {dd?.verifiedPnL ? `$${dd.verifiedPnL.lastMonthRevenue?.toLocaleString()}` : fmtMo(data.listing.monthlyRevenue ?? 0)}
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

                {/* Verified 12-month P&L */}
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
                      {dd.trafficAnalysis.primarySource && (
                        <p><span className="text-zinc-300 font-medium">Primary Source:</span> {dd.trafficAnalysis.primarySource}</p>
                      )}
                      {dd.trafficAnalysis.summary && <p><span className="text-zinc-300 font-medium">Summary:</span> {dd.trafficAnalysis.summary}</p>}
                      {dd.trafficAnalysis.growth && <p><span className="text-zinc-300 font-medium">Growth:</span> {dd.trafficAnalysis.growth}</p>}
                      {dd.trafficAnalysis.dependency && (
                        <p className={dd.trafficAnalysis.dependency.startsWith("CRITICAL") ? "text-red-400/80" : dd.trafficAnalysis.dependency.startsWith("LOW") ? "text-emerald-400/80" : "text-amber-400/80"}>
                          <span className="font-medium">Dependency Warning:</span> {dd.trafficAnalysis.dependency}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">Traffic data not available for this listing.</p>
              )}
            </SectionCard>

            {/* ── Section 4: Site/Product Assessment ────────────────────── */}
            <SectionCard
              icon={ShieldCheck}
              title="Site / Product Assessment"
              iconColor="text-amber-400"
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Platform</div>
                    <div className="text-zinc-300 font-medium">{dd?.platform ?? data.listing.monetization}</div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Verification</div>
                    <div className={`font-medium ${
                      data.listing.verificationStatus === "verified"
                        ? "text-emerald-400"
                        : data.listing.verificationStatus === "partial"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}>
                      {data.listing.verificationStatus === "verified"
                        ? "Verified ✓"
                        : data.listing.verificationStatus === "partial"
                        ? "Partial"
                        : "Unverified"}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-2.5">
                    <div className="text-zinc-500 mb-0.5">Listing Type</div>
                    <div className="text-zinc-300 font-medium">
                      {data.listing.listingType === "buy_now"
                        ? "Buy Now"
                        : data.listing.listingType === "auction"
                        ? "Auction"
                        : "Make Offer"}
                    </div>
                  </div>
                </div>
                {dd?.siteAssessment?.confidential && (
                  <div className="bg-zinc-700/30 border border-zinc-600/50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-zinc-400 mb-1">Confidential Listing</p>
                    <p className="text-xs text-zinc-500">Full details shared under NDA after initial contact with seller.</p>
                  </div>
                )}
                {dd?.siteAssessment?.notes && (
                  <p className="text-xs text-zinc-400">{dd.siteAssessment.notes}</p>
                )}
              </div>
            </SectionCard>

            {/* ── Section 5: Seller Due Diligence ───────────────────────── */}
            <SectionCard
              icon={Users}
              title="Seller Due Diligence"
              iconColor="text-blue-400"
            >
              <div className="space-y-3">
                {dd?.sellerQandA ? (
                  Object.entries(dd.sellerQandA as Record<string, string>).map(([q, a]) => {
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
                  })
                ) : (
                  <>
                    {dd?.whySelling && (
                      <div className="border-b border-zinc-700 pb-2">
                        <p className="text-xs font-medium text-zinc-400 mb-0.5">Why Selling</p>
                        <p className="text-xs text-zinc-300">{dd.whySelling}</p>
                      </div>
                    )}
                    {dd?.training && (
                      <div className="border-b border-zinc-700 pb-2">
                        <p className="text-xs font-medium text-zinc-400 mb-0.5">Training / Transition</p>
                        <p className="text-xs text-zinc-300">{dd.training}</p>
                      </div>
                    )}
                    {dd?.employees && (
                      <div className="border-b border-zinc-700 pb-2 last:border-0">
                        <p className="text-xs font-medium text-zinc-400 mb-0.5">Employees / Contractors</p>
                        <p className="text-xs text-zinc-300">{dd.employees}</p>
                      </div>
                    )}
                    {!dd?.whySelling && !dd?.training && !dd?.employees && (
                      <p className="text-sm text-zinc-400">No seller Q&A data available for this listing.</p>
                    )}
                  </>
                )}
              </div>
            </SectionCard>

            {/* ── Section 6: Operational Playbook ───────────────────────── */}
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

                {/* Production workflow */}
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
                        <span className="text-zinc-400 font-medium">Cost per run:</span> {dd.productionWorkflow.totalProductionCost}
                        {dd.productionWorkflow.unitsPerMonth && ` · ${dd.productionWorkflow.unitsPerMonth}`}
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

                {/* VA breakdown if available */}
                {VA_PLANS[id] && (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500 font-medium">VA Requirements & Cost Breakdown</p>
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
                        {VA_PLANS[id].map((v) => v.costPerMonth).join(" + ")}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Sourced via OnlineJobs.ph (Philippines VAs) and Upwork (dev). Rates are market estimates for 2026.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* ── Section 7: Risk Assessment ────────────────────────────── */}
            <SectionCard
              icon={AlertTriangle}
              title="Risk Assessment"
              iconColor="text-red-400"
            >
              <div className="space-y-4">
                {data.listing.verificationStatus === "unverified" && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-400 mb-1">⚠ Unverified Financials</p>
                    <p className="text-xs text-zinc-400">
                      This listing has not been verified by Flippa. Financial figures are seller-reported only. Apply extra skepticism and request full documentation before proceeding.
                    </p>
                  </div>
                )}
                {data.listing.offersCount >= 3 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-amber-400 mb-1">High Demand Signal</p>
                    <p className="text-xs text-zinc-400">
                      {data.listing.offersCount} offers received — this listing is attracting competition. Negotiate quickly or risk being outbid.
                    </p>
                  </div>
                )}
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
              </div>
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
              ) : data.listing.reasonsFor.length > 0 ? (
                <ul className="space-y-2">
                  {data.listing.reasonsFor.map((r, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2">
                      <span className="text-amber-400 shrink-0 mt-0.5">→</span>
                      {r}
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
              title="Head-to-Head — All Assessed Flippa Listings"
              iconColor="text-blue-400"
            >
              {flippaExpertAssessments.length > 0 ? (
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
                      {flippaExpertAssessments.filter((a) => a.verdictColor !== "red").map((a) => (
                        <tr
                          key={a.id}
                          className={`border-b border-zinc-800 last:border-0 ${a.id === id ? "bg-zinc-700/20" : ""}`}
                        >
                          <td className="py-2 pr-4">
                            <Link
                              href={`/flippa/${a.id}`}
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
                            {(() => {
                              const p = parseFloat(a.price.replace(/[$,]/g, ""));
                              const mp = parseFloat(a.monthlyProfit.replace(/[$,]/g, ""));
                              return isNaN(p) || isNaN(mp) || mp === 0 ? "—" : `${Math.round(p / mp)}x`;
                            })()}
                          </td>
                          <td className="pl-2 py-2">
                            <VerdictBadge verdict={a.verdict.length > 15 ? a.verdict.slice(0, 15) + "…" : a.verdict} color={a.verdictColor} />
                          </td>
                        </tr>
                      ))}
                      {flippaExpertAssessments.filter((a) => a.verdictColor === "red").length > 0 && (
                        <>
                          <tr>
                            <td colSpan={7} className="pt-3 pb-1 text-zinc-600 text-[10px] uppercase tracking-wider font-medium">
                              Eliminated ({flippaExpertAssessments.filter((a) => a.verdictColor === "red").length})
                            </td>
                          </tr>
                          {flippaExpertAssessments.filter((a) => a.verdictColor === "red").map((a) => (
                            <tr
                              key={a.id}
                              className={`border-b border-zinc-800/50 last:border-0 opacity-50 ${a.id === id ? "bg-zinc-700/20 opacity-100" : ""}`}
                            >
                              <td className="py-1.5 pr-4">
                                <Link
                                  href={`/flippa/${a.id}`}
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
                                {(() => {
                                  const p = parseFloat(a.price.replace(/[$,]/g, ""));
                                  const mp = parseFloat(a.monthlyProfit.replace(/[$,]/g, ""));
                                  return isNaN(p) || isNaN(mp) || mp === 0 ? "—" : `${Math.round(p / mp)}x`;
                                })()}
                              </td>
                              <td className="pl-2 py-1.5">
                                <span className="text-red-400/60 text-[10px]">ELIMINATED</span>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-500 italic">No expert assessments available yet. Head-to-head comparison will appear as listings are analyzed.</p>
                  {/* Fallback: show top picks from raw listings */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left text-zinc-500 font-medium pb-2 pr-4">Business</th>
                          <th className="text-right text-zinc-500 font-medium pb-2 px-2">Price</th>
                          <th className="text-right text-zinc-500 font-medium pb-2 px-2">Profit/mo</th>
                          <th className="text-right text-zinc-500 font-medium pb-2 px-2">ROI</th>
                          <th className="text-right text-zinc-500 font-medium pb-2 px-2">Multiple</th>
                          <th className="text-left text-zinc-500 font-medium pb-2 pl-2">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flippaListings
                          .filter((l) => !ELIMINATED_IDS.has(l.id) && l.recommendation !== "avoid")
                          .sort((a, b) => b.overallScore - a.overallScore)
                          .map((l) => (
                            <tr
                              key={l.id}
                              className={`border-b border-zinc-800 last:border-0 ${l.id === id ? "bg-zinc-700/20" : ""}`}
                            >
                              <td className="py-2 pr-4">
                                <Link
                                  href={`/flippa/${l.id}`}
                                  className={`hover:underline ${l.id === id ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}
                                >
                                  {l.title}
                                </Link>
                                {l.id === id && <span className="ml-1.5 text-zinc-600">← you are here</span>}
                              </td>
                              <td className="text-right py-2 px-2 text-zinc-300">{fmt(l.price)}</td>
                              <td className="text-right py-2 px-2 text-emerald-400">{fmtMo(l.monthlyProfit)}</td>
                              <td className="text-right py-2 px-2 text-blue-400">
                                {annualRoi(l.price, l.monthlyProfit)?.toFixed(0) ?? "—"}%
                              </td>
                              <td className="text-right py-2 px-2 text-zinc-400">
                                {l.multiple ? `${l.multiple}x` : "—"}
                              </td>
                              <td className="pl-2 py-2">
                                <RecBadge rec={l.recommendation} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

                  {/* Negotiation target */}
                  {data.assessment.verdictColor !== "red" && data.assessment.recommendation.match(/(?:Offer|negotiate)\s+\$[\d,K]+/) && (
                    <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                      <p className="text-xs text-zinc-300">
                        <span className="text-emerald-400 font-medium">Negotiation target: </span>
                        {data.assessment.recommendation.match(/(?:Negotiate|Offer|negotiate)\s+(?:to\s+)?(\$[\d,K–]+)/)?.[1]?.replace(/,$/, "") ?? "See recommendation above"}
                      </p>
                    </div>
                  )}

                  {/* Conditions before closing */}
                  {dd?.conditionsBeforeClosing && Array.isArray(dd.conditionsBeforeClosing) && (
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                      <p className="text-xs text-amber-400 font-semibold mb-2">Conditions Before Closing</p>
                      <ul className="space-y-1">
                        {dd.conditionsBeforeClosing.map((c: string, i: number) => (
                          <li key={i} className="text-xs text-zinc-400 flex gap-1.5">
                            <span className="text-amber-400 shrink-0">□</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <RecBadge rec={data.listing.recommendation} />
                    <span className="text-sm text-zinc-400">based on scoring model</span>
                  </div>
                  <p className="text-sm text-zinc-400">No detailed investment recommendation available yet for this listing.</p>
                </div>
              )}
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
