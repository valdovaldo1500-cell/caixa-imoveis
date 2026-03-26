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
} from "lucide-react";
import type { EFListing } from "@/data/empire-flippers-listings";
import type { ExpertAssessment } from "@/data/expert-assessments";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DetailData {
  listing: EFListing;
  assessment: ExpertAssessment | null;
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

function PlaceholderContent({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-24 rounded-lg border border-dashed border-zinc-600 bg-zinc-900/50">
      <span className="text-xs text-zinc-500 italic">{text}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestimentosOnlineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              {data.listing.description ? (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {data.listing.description}
                </p>
              ) : (
                <PlaceholderContent text="Business description — content coming soon" />
              )}
            </SectionCard>

            {/* ── Section 2: Financial Performance ──────────────────────── */}
            <SectionCard
              icon={BarChart2}
              title="Financial Performance"
              iconColor="text-emerald-400"
            >
              <div className="space-y-3">
                {/* Current numbers from listing data */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Monthly Revenue</div>
                    <div className="font-semibold text-white">
                      {fmtMo(data.listing.monthlyRevenue)}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Monthly Profit</div>
                    <div className="font-semibold text-emerald-400">
                      {fmtMo(data.listing.monthlyProfit)}
                    </div>
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <div className="text-xs text-zinc-500 mb-1">Profit Margin</div>
                    <div className="font-semibold text-blue-400">
                      {data.listing.monthlyRevenue > 0
                        ? `${Math.round(
                            (data.listing.monthlyProfit /
                              data.listing.monthlyRevenue) *
                              100
                          )}%`
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
                <PlaceholderContent text="P&L charts — content coming soon" />
              </div>
            </SectionCard>

            {/* ── Section 3: Traffic & Growth Analysis ──────────────────── */}
            <SectionCard
              icon={TrendingUp}
              title="Traffic & Growth Analysis"
              iconColor="text-violet-400"
            >
              <PlaceholderContent text="Traffic charts — content coming soon" />
            </SectionCard>

            {/* ── Section 4: Seller Due Diligence ───────────────────────── */}
            <SectionCard
              icon={ShieldCheck}
              title="Seller Due Diligence"
              iconColor="text-amber-400"
            >
              <PlaceholderContent text="Q&A findings — content coming soon" />
            </SectionCard>

            {/* ── Section 5: Operational Playbook ───────────────────────── */}
            <SectionCard
              icon={Target}
              title="Operational Playbook"
              iconColor="text-blue-400"
            >
              {data.assessment?.aiPlan ? (
                <div className="space-y-3">
                  <div className="bg-zinc-900 rounded-lg p-3 border border-violet-500/30">
                    <div className="text-xs text-violet-400 font-semibold mb-1 flex items-center gap-1">
                      <Bot className="w-3 h-3" /> AI+VA Operating Plan
                    </div>
                    <p className="text-sm text-zinc-300">{data.assessment.aiPlan}</p>
                  </div>
                  <PlaceholderContent text="Weekly schedule breakdown — content coming soon" />
                </div>
              ) : (
                <PlaceholderContent text="Weekly schedule — content coming soon" />
              )}
            </SectionCard>

            {/* ── Section 6: VA Requirements & Costs ────────────────────── */}
            <SectionCard
              icon={Users}
              title="VA Requirements & Costs"
              iconColor="text-emerald-400"
            >
              <PlaceholderContent text="VA breakdown — content coming soon" />
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
                      {data.assessment.risks.map((r, i) => (
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
              <PlaceholderContent text="Growth plan — content coming soon" />
            </SectionCard>

            {/* ── Section 9: Head-to-Head Comparison ────────────────────── */}
            <SectionCard
              icon={Swords}
              title="Head-to-Head Comparison"
              iconColor="text-blue-400"
            >
              <PlaceholderContent text="Comparison table — content coming soon" />
            </SectionCard>

            {/* ── Section 10: Investment Recommendation ─────────────────── */}
            <SectionCard
              icon={LineChart}
              title="Investment Recommendation"
              iconColor="text-emerald-400"
            >
              {data.assessment?.recommendation ? (
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
              ) : (
                <PlaceholderContent text="Final verdict — content coming soon" />
              )}
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
