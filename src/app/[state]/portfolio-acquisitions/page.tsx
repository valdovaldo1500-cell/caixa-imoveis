"use client";

import { useState } from "react";
import { PORTFOLIO_ASSESSMENTS } from "@/data/portfolio-assessments";
import type { ExpertAssessment } from "@/data/portfolio-assessments";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";

// ── Portfolio Investment Calculator constants ──────────────────────────────
const PORTFOLIO_BUSINESSES = [
  { name: "Tradevipe", revenue: 4635, vaHrsWk: 15, cost: 90000, growth6mo: 0.20, status: "Video call pending" },
  { name: "Tire Reviews", revenue: 975, vaHrsWk: 15, cost: 14000, growth6mo: 0.10, status: "Bing WMT pending" },
  { name: "Pinch of Health", revenue: 950, vaHrsWk: 10, cost: 13400, growth6mo: 0.15, status: "Final offer sent" },
];
const VA_RATE_HR = 5;
const VA_HRS_WK = 40;
const USD_TO_GBP = 0.79;
const USD_TO_BRL = 5.70;
const STANDALONE_VA_COST = 390; // 15hrs/wk × $6/hr × 4.3 weeks

// Derived calculations
const VA_MONTHLY_TOTAL = VA_RATE_HR * VA_HRS_WK * 4.3; // ~$860/mo
const totalVaHrsWk = PORTFOLIO_BUSINESSES.reduce((s, b) => s + b.vaHrsWk, 0);

interface BusinessRow {
  name: string;
  revenue: number;
  vaHrsWk: number;
  vaCostMo: number;
  netProfitMo: number;
  netGBP: number;
  netBRL: number;
  cost: number;
  paybackMonths: number;
  annualROI: number;
  status: string;
}

function calcRows(businesses: typeof PORTFOLIO_BUSINESSES, sharedVa: boolean): BusinessRow[] {
  return businesses.map((b) => {
    const vaCostMo = sharedVa
      ? (b.vaHrsWk / totalVaHrsWk) * VA_MONTHLY_TOTAL
      : STANDALONE_VA_COST;
    const netProfitMo = b.revenue - vaCostMo;
    const netGBP = netProfitMo * USD_TO_GBP;
    const netBRL = netProfitMo * USD_TO_BRL;
    const paybackMonths = netProfitMo > 0 ? b.cost / netProfitMo : Infinity;
    const annualROI = netProfitMo > 0 ? ((netProfitMo * 12) / b.cost) * 100 : 0;
    return { name: b.name, revenue: b.revenue, vaHrsWk: b.vaHrsWk, vaCostMo, netProfitMo, netGBP, netBRL, cost: b.cost, paybackMonths, annualROI, status: b.status };
  });
}

function calcGrowthRows(businesses: typeof PORTFOLIO_BUSINESSES, sharedVa: boolean): BusinessRow[] {
  const grown = businesses.map((b) => ({ ...b, revenue: Math.round(b.revenue * (1 + b.growth6mo)) }));
  return calcRows(grown, sharedVa);
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function BusinessTable({ rows, title }: { rows: BusinessRow[]; title: string }) {
  const totRevenue = rows.reduce((s, r) => s + r.revenue, 0);
  const totVaCost = rows.reduce((s, r) => s + r.vaCostMo, 0);
  const totNet = rows.reduce((s, r) => s + r.netProfitMo, 0);
  const totCost = rows.reduce((s, r) => s + r.cost, 0);
  const totPayback = totNet > 0 ? totCost / totNet : Infinity;
  const totROI = totNet > 0 ? ((totNet * 12) / totCost) * 100 : 0;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-zinc-300 mb-2">{title}</h3>}
      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-700 text-zinc-400 uppercase tracking-wide">
              <th className="text-left px-3 py-2">Business</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Rev/mo</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">VA hrs/wk</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">VA Cost/mo</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Net/mo</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Net £</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Net R$</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Acquisition</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Payback</th>
              <th className="text-right px-3 py-2 whitespace-nowrap">Annual ROI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={`border-b border-zinc-800/60 ${i % 2 === 0 ? "" : "bg-zinc-800/20"}`}>
                <td className="px-3 py-2 font-medium text-white whitespace-nowrap">
                  {r.name}
                  <span className="ml-2 text-zinc-500 font-normal">{r.status}</span>
                </td>
                <td className="px-3 py-2 text-right text-zinc-300">${fmt(r.revenue)}</td>
                <td className="px-3 py-2 text-right text-zinc-400">{r.vaHrsWk}</td>
                <td className="px-3 py-2 text-right text-amber-400">${fmt(r.vaCostMo, 0)}</td>
                <td className={`px-3 py-2 text-right font-semibold ${r.netProfitMo >= 0 ? "text-emerald-400" : "text-red-400"}`}>${fmt(r.netProfitMo, 0)}</td>
                <td className="px-3 py-2 text-right text-zinc-300">£{fmt(r.netGBP, 0)}</td>
                <td className="px-3 py-2 text-right text-zinc-300">R${fmt(r.netBRL, 0)}</td>
                <td className="px-3 py-2 text-right text-zinc-300">${fmt(r.cost)}</td>
                <td className="px-3 py-2 text-right text-zinc-300">{isFinite(r.paybackMonths) ? `${fmt(r.paybackMonths, 1)} mo` : "∞"}</td>
                <td className={`px-3 py-2 text-right font-semibold ${r.annualROI >= 60 ? "text-emerald-400" : r.annualROI >= 30 ? "text-amber-400" : "text-red-400"}`}>{fmt(r.annualROI, 1)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-zinc-600 bg-zinc-800/40 font-semibold">
              <td className="px-3 py-2 text-zinc-200">TOTAL</td>
              <td className="px-3 py-2 text-right text-zinc-200">${fmt(totRevenue)}</td>
              <td className="px-3 py-2 text-right text-zinc-400">{rows.reduce((s, r) => s + r.vaHrsWk, 0)}</td>
              <td className="px-3 py-2 text-right text-amber-400">${fmt(totVaCost, 0)}</td>
              <td className="px-3 py-2 text-right text-emerald-400">${fmt(totNet, 0)}</td>
              <td className="px-3 py-2 text-right text-zinc-200">£{fmt(totNet * USD_TO_GBP, 0)}</td>
              <td className="px-3 py-2 text-right text-zinc-200">R${fmt(totNet * USD_TO_BRL, 0)}</td>
              <td className="px-3 py-2 text-right text-zinc-200">${fmt(totCost)}</td>
              <td className="px-3 py-2 text-right text-zinc-200">{isFinite(totPayback) ? `${fmt(totPayback, 1)} mo` : "∞"}</td>
              <td className="px-3 py-2 text-right text-emerald-400">{fmt(totROI, 1)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function PortfolioCalculator() {
  const [showGrowth, setShowGrowth] = useState(false);

  const sharedRows = calcRows(PORTFOLIO_BUSINESSES, true);
  const standaloneRows = calcRows(PORTFOLIO_BUSINESSES, false);
  const growthSharedRows = calcGrowthRows(PORTFOLIO_BUSINESSES, true);

  const totNetShared = sharedRows.reduce((s, r) => s + r.netProfitMo, 0);
  const totCost = PORTFOLIO_BUSINESSES.reduce((s, b) => s + b.cost, 0);
  const totPaybackShared = totNetShared > 0 ? totCost / totNetShared : Infinity;

  return (
    <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Portfolio Investment Calculator</h2>
          <p className="text-zinc-400 text-xs mt-1">3 active deals — shared VA model vs standalone VA cost</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-emerald-400 font-bold text-xl">${fmt(totNetShared, 0)}<span className="text-sm font-normal text-zinc-400">/mo net</span></div>
          <div className="text-zinc-400 text-xs">{fmt(totPaybackShared, 1)} mo portfolio payback</div>
        </div>
      </div>

      {/* Shared VA model */}
      <BusinessTable rows={sharedRows} title={`Shared VA model: 1 full-time BR freelancer @ ${VA_HRS_WK} hrs/wk × $${VA_RATE_HR}/hr = $${fmt(VA_MONTHLY_TOTAL, 0)}/mo shared across portfolio`} />

      {/* VA cost note */}
      <div className="rounded-lg bg-zinc-800/60 border border-zinc-700 px-4 py-3 space-y-1 text-xs text-zinc-400">
        <p className="text-zinc-300 font-medium">VA Cost Assumptions</p>
        <p>• Shared model: 1 full-time BR freelancer — {VA_HRS_WK} hrs/wk × ${VA_RATE_HR}/hr × 4.3 weeks = <span className="text-amber-400">${fmt(VA_MONTHLY_TOTAL, 0)}/mo</span> total, allocated proportionally by hours</p>
        <p>• Standalone model: each business independently hires a part-time VA — 15 hrs/wk × $6/hr × 4.3 = <span className="text-amber-400">${STANDALONE_VA_COST}/mo</span> per business (${STANDALONE_VA_COST * 3}/mo total)</p>
        <p>• Shared model saves <span className="text-emerald-400">${fmt(STANDALONE_VA_COST * PORTFOLIO_BUSINESSES.length - VA_MONTHLY_TOTAL, 0)}/mo</span> vs hiring separately</p>
        <p>• Exchange rates: $1 USD = £{USD_TO_GBP} GBP = R${USD_TO_BRL} BRL</p>
      </div>

      {/* Standalone comparison */}
      <BusinessTable rows={standaloneRows} title="Standalone VA model: $390/mo per business (15 hrs/wk × $6/hr)" />

      {/* Growth scenario toggle */}
      <div>
        <button
          className="flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
          onClick={() => setShowGrowth((v) => !v)}
        >
          {showGrowth ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          6-Month Growth Scenario (Tradevipe +20%, Tire Reviews +10%, Pinch of Health +15%)
        </button>

        {showGrowth && (
          <div className="mt-3 space-y-3">
            <BusinessTable rows={growthSharedRows} title="After 6-month growth — shared VA model" />
            <div className="rounded-lg bg-emerald-900/20 border border-emerald-700/40 px-4 py-3 text-xs space-y-1">
              <p className="text-emerald-300 font-semibold">Growth Impact</p>
              {growthSharedRows.map((r) => {
                const base = sharedRows.find((b) => b.name === r.name)!;
                const delta = r.netProfitMo - base.netProfitMo;
                return (
                  <p key={r.name} className="text-zinc-300">
                    {r.name}: ${fmt(base.netProfitMo, 0)} → <span className="text-emerald-400">${fmt(r.netProfitMo, 0)}/mo</span> (+${fmt(delta, 0)}/mo), payback{" "}
                    <span className="text-emerald-400">{fmt(r.paybackMonths, 1)} mo</span>, ROI{" "}
                    <span className="text-emerald-400">{fmt(r.annualROI, 1)}%</span>
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Sort order: emerald first, then blue, then amber, then red
const VERDICT_ORDER: Record<string, number> = {
  emerald: 0,
  blue: 1,
  amber: 2,
  red: 3,
};

const VERDICT_LABEL: Record<string, string> = {
  emerald: "STRONG BUY",
  blue: "CONDITIONAL",
  amber: "CONSIDER",
  red: "AVOID",
};

const actionable = PORTFOLIO_ASSESSMENTS.filter(
  (a) => a.verdictColor !== "red"
).sort(
  (a, b) => VERDICT_ORDER[a.verdictColor] - VERDICT_ORDER[b.verdictColor]
);

const avoided = PORTFOLIO_ASSESSMENTS.filter((a) => a.verdictColor === "red");

function platformBadge(id: string) {
  if (id.startsWith("DAL")) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
        Daltons
      </span>
    );
  }
  if (id.startsWith("ACQ")) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
        Acquire
      </span>
    );
  }
  if (id.startsWith("TS")) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
        Transferslot
      </span>
    );
  }
  if (id.startsWith("BFS")) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
        BFS
      </span>
    );
  }
  if (id.startsWith("F")) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
        Flippa
      </span>
    );
  }
  return (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
      EF
    </span>
  );
}

function listingUrl(a: { id: string; url?: string }): string | null {
  if (a.url) return a.url;
  if (a.id.startsWith("F")) return `https://flippa.com/${a.id.slice(1)}`;
  if (/^\d+$/.test(a.id)) return `https://app.empireflippers.com/listing/${a.id}`;
  return null;
}

function verdictBadge(color: string) {
  const styles: Record<string, string> = {
    emerald:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    blue: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    amber: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    red: "bg-red-500/20 text-red-300 border border-red-500/30",
  };
  return (
    <span
      className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${styles[color] ?? ""}`}
    >
      {VERDICT_LABEL[color] ?? color.toUpperCase()}
    </span>
  );
}

function ActionableCard({ a }: { a: ExpertAssessment }) {
  const [open, setOpen] = useState(false);

  const url = listingUrl(a);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Header row */}
      <div className="flex items-start">
        <button
          className="flex-1 text-left px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 items-start hover:bg-zinc-800/50 transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-white text-sm">{a.name}</span>
              {platformBadge(a.id)}
              {verdictBadge(a.verdictColor)}
            </div>
            <p className="text-zinc-400 text-xs line-clamp-2">
              {a.recommendation.slice(0, 200)}
              {a.recommendation.length > 200 ? "…" : ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 ml-auto">
            <div className="text-white font-semibold text-sm">{a.price}</div>
            <div className="text-zinc-400 text-xs">{a.monthlyProfit}/mo</div>
            <div className="text-zinc-500 text-xs">{a.annualROI} ROI</div>
          </div>
          <div className="flex items-center self-center pl-2 shrink-0">
            {open ? (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            )}
          </div>
        </button>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-3 self-center text-zinc-500 hover:text-blue-400 transition-colors"
            title="View listing"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-zinc-800 px-4 py-4 space-y-4 text-sm">
          <div>
            <p className="text-zinc-300">{a.recommendation}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                Highlights
              </h4>
              <ul className="space-y-1">
                {a.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-zinc-300 text-xs">
                    <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                Risks
              </h4>
              <ul className="space-y-1">
                {a.risks.map((r, i) => (
                  <li key={i} className="flex gap-2 text-zinc-300 text-xs">
                    <span className="text-red-400 mt-0.5 shrink-0">−</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {a.aiPlan && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">
                AI Operating Plan
              </h4>
              <p className="text-zinc-400 text-xs">{a.aiPlan}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1 border-t border-zinc-800">
            <span>Profit trend: {a.trendProfit}</span>
            <span>Traffic: {a.trendTraffic}</span>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Listing
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioAcquisitionsPage() {
  const [avoidOpen, setAvoidOpen] = useState(false);

  const actionableCount = actionable.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">


      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Portfolio Acquisitions — Small Deals
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Micro-acquisitions under $60K for portfolio building. Buy small, grow with AI.
            </p>
          </div>
          <a
            href="/investimentos-online"
            className="shrink-0 ml-4 px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold transition-colors"
          >
            ← Main Dashboard
          </a>
        </div>

        {/* Portfolio Investment Calculator */}
        <PortfolioCalculator />

        {/* KPI bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Target Budget", value: "$5-60K each" },
            { label: "Strategy", value: "3-4 small bets" },
            {
              label: "Growth",
              value: "AI + Claude Code",
              highlight: true,
            },
            { label: "Total Budget", value: "$150-200K" },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            >
              <div
                className={`text-xl font-bold ${highlight ? "text-emerald-400" : "text-white"}`}
              >
                {value}
              </div>
              <div className="text-zinc-400 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Actionable listings */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            Actionable Listings
            <span className="ml-2 text-sm font-normal text-zinc-400">
              ({actionableCount} listings — emerald, blue, amber verdicts)
            </span>
          </h2>
          <div className="space-y-2">
            {actionable.map((a) => (
              <ActionableCard key={a.id} a={a} />
            ))}
          </div>
        </section>

        {/* Avoided listings */}
        <section>
          <button
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50 transition-colors"
            onClick={() => setAvoidOpen((v) => !v)}
          >
            <span className="font-semibold text-zinc-300">
              {avoided.length} Listings Assessed as{" "}
              <span className="text-red-400">AVOID</span>
            </span>
            {avoidOpen ? (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {avoidOpen && (
            <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Platform
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Price
                    </th>
                    <th className="text-left px-4 py-2">Verdict</th>
                    <th className="text-left px-4 py-2 min-w-[240px]">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {avoided.map((a, i) => (
                    <tr
                      key={a.id}
                      className={`border-b border-zinc-800/50 ${i % 2 === 0 ? "" : "bg-zinc-800/20"}`}
                    >
                      <td className="px-4 py-2 text-white font-medium whitespace-nowrap">
                        {a.name}
                      </td>
                      <td className="px-4 py-2">{platformBadge(a.id)}</td>
                      <td className="px-4 py-2 text-zinc-300 whitespace-nowrap">
                        {a.price}
                      </td>
                      <td className="px-4 py-2">{verdictBadge(a.verdictColor)}</td>
                      <td className="px-4 py-2 text-zinc-400 text-xs">
                        {a.recommendation.slice(0, 80)}
                        {a.recommendation.length > 80 ? "…" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-zinc-600 text-xs border-t border-zinc-800 pt-4">
          Analysis by Claude Code. Micro-acquisition portfolio tracker.
        </footer>
      </div>
    </div>
  );
}
