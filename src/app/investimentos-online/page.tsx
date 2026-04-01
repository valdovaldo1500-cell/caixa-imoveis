"use client";

import { useState } from "react";
import NavHeader from "@/components/NavHeader";
import { EXPERT_ASSESSMENTS } from "@/data/expert-assessments";
import { ChevronDown, ChevronRight } from "lucide-react";

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

const actionable = EXPERT_ASSESSMENTS.filter(
  (a) => a.verdictColor !== "red"
).sort(
  (a, b) => VERDICT_ORDER[a.verdictColor] - VERDICT_ORDER[b.verdictColor]
);

const avoided = EXPERT_ASSESSMENTS.filter((a) => a.verdictColor === "red");

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

function ActionableCard({ a }: { a: (typeof EXPERT_ASSESSMENTS)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Header row */}
      <button
        className="w-full text-left px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 items-start hover:bg-zinc-800/50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-white text-sm">{a.name}</span>
            {platformBadge(a.id)}
            {verdictBadge(a.verdictColor)}
          </div>
          <p className="text-zinc-400 text-xs line-clamp-2">
            {a.recommendation.slice(0, 120)}
            {a.recommendation.length > 120 ? "…" : ""}
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

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500 pt-1 border-t border-zinc-800">
            <span>Profit trend: {a.trendProfit}</span>
            <span>Traffic: {a.trendTraffic}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InvestimentosOnlinePage() {
  const [avoidOpen, setAvoidOpen] = useState(false);

  const actionableCount = actionable.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavHeader />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Online Business Acquisitions — Investment Dashboard
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            310+ listings analyzed across Empire Flippers, Flippa,
            BusinessesForSale.com &amp; RightBiz. Last updated: April 1, 2026.
          </p>
        </div>

        {/* KPI bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Listings Analyzed", value: "800+" },
            { label: "Deep Dived", value: "100+" },
            {
              label: "Actionable",
              value: String(actionableCount),
              highlight: true,
            },
            { label: "Platforms", value: "8 platforms" },
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
          Analysis by Claude Code. Reports at /flippa-acquisition/output/.
          Deal monitor running every 4 hours.
        </footer>
      </div>
    </div>
  );
}
