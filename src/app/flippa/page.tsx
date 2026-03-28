"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import {
  Star,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitCompare,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  flippaListings,
  FLIPPA_UPDATED_AT,
  FLIPPA_PIPELINE,
} from "@/data/flippa-listings";
import type { FlippaListing } from "@/data/flippa-listings";

// ─── Constants ────────────────────────────────────────────────────────────────

const REC_LABELS: Record<string, string> = {
  TOP_PICK: "TOP PICK",
  top_pick: "TOP PICK",
  STRONG: "Strong",
  strong: "Strong",
  CONSIDER: "Consider",
  consider: "Consider",
  AVOID: "Avoid",
  avoid: "Avoid",
};

const TYPE_COLORS: Record<string, string> = {
  saas: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  content: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  newsletter: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  marketplace: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  leadgen: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  service: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  app: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  other: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function fmtProfit(n: number): string {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function normalizeRec(r: string): string {
  return r.toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RecBadge({ rec }: { rec: string }) {
  const norm = normalizeRec(rec);
  const style =
    norm === "TOP_PICK"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : norm === "STRONG"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : norm === "CONSIDER"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${style}`}>
      {REC_LABELS[rec] ?? rec}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const cls = TYPE_COLORS[type] ?? TYPE_COLORS.other;
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${cls}`}>
      {type.toUpperCase()}
    </span>
  );
}

function DataLevelBadge({ level }: { level: string }) {
  const cls =
    level === "full_pnl"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : level === "stats"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : "bg-zinc-600/30 text-zinc-400 border-zinc-600/30";
  const label =
    level === "full_pnl" ? "Full P&L" : level === "stats" ? "Stats" : "Header";
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

function ScoreBar({
  value,
  label,
  small,
}: {
  value: number;
  label?: string;
  small?: boolean;
}) {
  const color =
    value >= 75
      ? "bg-emerald-500"
      : value >= 60
      ? "bg-blue-500"
      : value >= 45
      ? "bg-amber-500"
      : "bg-red-500";
  if (small) {
    return (
      <div className="flex items-center gap-1.5">
        {label && <span className="text-[10px] text-zinc-500 w-20 shrink-0">{label}</span>}
        <div className="flex-1 bg-zinc-700 rounded-full h-1">
          <div className={`${color} h-1 rounded-full`} style={{ width: `${value}%` }} />
        </div>
        <span className="text-[10px] text-zinc-500 w-5 text-right">{value}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-zinc-400 w-24 shrink-0">{label}</span>}
      <div className="flex-1 bg-zinc-700 rounded-full h-1.5">
        <div className={`${color} h-1.5 rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-zinc-400 w-7 text-right">{value}</span>
    </div>
  );
}

function PnLSparkline({ data }: { data: { month: string; profit: number }[] }) {
  if (!data || data.length < 2) return null;
  const pts = data.slice(-12);
  const profits = pts.map((p) => p.profit);
  const min = Math.min(...profits);
  const max = Math.max(...profits);
  const range = max - min || 1;
  const W = 80;
  const H = 24;
  const pad = 2;
  const points = pts
    .map((p, i) => {
      const x = pad + (i / (pts.length - 1)) * (W - pad * 2);
      const y = pad + ((1 - (p.profit - min) / range) * (H - pad * 2));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const last = profits[profits.length - 1];
  const first = profits[0];
  const trending = last >= first * 0.95;
  const strokeColor = trending ? "#10b981" : "#ef4444";

  return (
    <svg width={W} height={H} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Favorite card (in the favorites section) ─────────────────────────────────

interface FavoriteEntry {
  listingId: string;
  notes: string | null;
}

function FavoriteCard({
  listing,
  notes,
  onRemove,
  onNotesChange,
}: {
  listing: FlippaListing;
  notes: string | null;
  onRemove: () => void;
  onNotesChange: (notes: string) => void;
}) {
  const [localNotes, setLocalNotes] = useState(notes ?? "");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const roi =
    listing.avgMonthlyProfit && listing.askingPrice
      ? ((listing.avgMonthlyProfit * 12) / listing.askingPrice) * 100
      : null;

  function handleNotesChange(val: string) {
    setLocalNotes(val);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      onNotesChange(val);
    }, 800);
  }

  return (
    <div className="bg-zinc-800 border border-emerald-500/40 rounded-xl p-4 flex flex-col gap-3 w-72 shrink-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-zinc-500">#{listing.id}</span>
            <RecBadge rec={listing.recommendation} />
            <TypeBadge type={listing.type} />
          </div>
          <p className="text-sm font-semibold text-white leading-tight line-clamp-2">
            {listing.title}
          </p>
        </div>
        <a
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="bg-zinc-900 rounded-lg p-1.5">
          <div className="text-[10px] text-zinc-500">Price</div>
          <div className="text-xs font-bold text-white">{fmtPrice(listing.askingPrice)}</div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-1.5">
          <div className="text-[10px] text-zinc-500">Profit/mo</div>
          <div className="text-xs font-bold text-emerald-400">{fmtProfit(listing.avgMonthlyProfit)}</div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-1.5">
          <div className="text-[10px] text-zinc-500">ROI/yr</div>
          <div className="text-xs font-bold text-blue-400">{roi ? `${roi.toFixed(0)}%` : "—"}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500">Overall</span>
        <div className="flex-1 bg-zinc-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${listing.scores.overall >= 75 ? "bg-emerald-500" : listing.scores.overall >= 60 ? "bg-blue-500" : listing.scores.overall >= 45 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${listing.scores.overall}%` }}
          />
        </div>
        <span className="text-[10px] text-zinc-400 w-6 text-right">{listing.scores.overall}</span>
      </div>

      <textarea
        className="w-full text-xs bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none focus:border-emerald-500/50"
        rows={2}
        placeholder="Add notes..."
        value={localNotes}
        onChange={(e) => handleNotesChange(e.target.value)}
      />

      <button
        onClick={onRemove}
        className="text-[10px] text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-lg py-1 transition-colors"
      >
        Remove from favorites
      </button>
    </div>
  );
}

// ─── Listing Card ─────────────────────────────────────────────────────────────

function ListingCard({
  listing,
  isFavorited,
  isHidden,
  showDismissed,
  isComparing,
  onFavorite,
  onDismiss,
  onToggleCompare,
}: {
  listing: FlippaListing;
  isFavorited: boolean;
  isHidden: boolean;
  showDismissed: boolean;
  isComparing: boolean;
  onFavorite: () => void;
  onDismiss: () => void;
  onToggleCompare: () => void;
}) {
  const roi =
    listing.avgMonthlyProfit && listing.askingPrice
      ? ((listing.avgMonthlyProfit * 12) / listing.askingPrice) * 100
      : null;

  const sparklineData = listing.monthlyPL?.map((m) => ({
    month: m.month,
    profit: m.profit,
  }));

  const MAX_FLAGS = 2;

  if (isHidden && !showDismissed) return null;

  return (
    <div
      className={`relative bg-zinc-800 border rounded-xl flex flex-col gap-0 transition-all ${
        isFavorited ? "border-emerald-500/40" : "border-zinc-700"
      } ${isHidden ? "opacity-50" : ""}`}
    >
      {isHidden && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="text-xs font-black text-zinc-400 tracking-widest bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-600">
            DISMISSED
          </span>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-zinc-500">#{listing.id}</span>
            <TypeBadge type={listing.type} />
            <DataLevelBadge level={listing.dataLevel} />
            {isFavorited && (
              <span className="text-[10px] text-emerald-400">★</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="checkbox"
            checked={isComparing}
            onChange={onToggleCompare}
            className="w-3.5 h-3.5 accent-emerald-500 cursor-pointer"
            title="Compare"
          />
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Clickable body → detail page */}
      <Link href={`/flippa/${listing.id}`} className="flex flex-col gap-3 px-4 pb-3 group">
        <div>
          <RecBadge rec={listing.recommendation} />
          <p className="text-sm font-semibold text-white leading-tight line-clamp-2 mt-1 group-hover:text-emerald-300 transition-colors">
            {listing.title}
          </p>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-1 text-center">
          <div className="bg-zinc-900 rounded-lg p-1.5">
            <div className="text-[10px] text-zinc-500">Price</div>
            <div className="text-xs font-bold text-white">{fmtPrice(listing.askingPrice)}</div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-1.5">
            <div className="text-[10px] text-zinc-500">Profit/mo</div>
            <div className="text-xs font-bold text-emerald-400">{fmtProfit(listing.avgMonthlyProfit)}</div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-1.5">
            <div className="text-[10px] text-zinc-500">ROI/yr</div>
            <div className="text-xs font-bold text-blue-400">{roi ? `${roi.toFixed(0)}%` : "—"}</div>
          </div>
          <div className="bg-zinc-900 rounded-lg p-1.5">
            <div className="text-[10px] text-zinc-500">Age</div>
            <div className="text-xs font-bold text-zinc-300">{listing.ageYears.toFixed(1)}y</div>
          </div>
        </div>

        {/* Overall score bar */}
        <div>
          <ScoreBar value={listing.scores.overall} label="Overall" />
        </div>

        {/* Mini score bars */}
        <div className="space-y-0.5">
          <ScoreBar value={listing.scores.stability} label="Stability" small />
          <ScoreBar value={listing.scores.diversification} label="Diversif." small />
          <ScoreBar value={listing.scores.operatorIndependence} label="Op. Indep." small />
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length >= 2 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500">P&L Trend</span>
            <PnLSparkline data={sparklineData} />
          </div>
        )}

        {/* Flags */}
        {(listing.redFlags.length > 0 || listing.greenFlags.length > 0) && (
          <div className="space-y-1">
            {listing.redFlags.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                {listing.redFlags.slice(0, MAX_FLAGS).map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded-full truncate max-w-[120px]"
                  >
                    {f}
                  </span>
                ))}
                {listing.redFlags.length > MAX_FLAGS && (
                  <span className="text-[10px] text-red-400">
                    +{listing.redFlags.length - MAX_FLAGS}
                  </span>
                )}
              </div>
            )}
            {listing.greenFlags.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                {listing.greenFlags.slice(0, MAX_FLAGS).map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full truncate max-w-[120px]"
                  >
                    {f}
                  </span>
                ))}
                {listing.greenFlags.length > MAX_FLAGS && (
                  <span className="text-[10px] text-emerald-400">
                    +{listing.greenFlags.length - MAX_FLAGS}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </Link>

      {/* Action buttons */}
      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg border transition-colors ${
            isFavorited
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30"
              : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-emerald-400 hover:border-emerald-500/40"
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          {isFavorited ? "Favorited" : "Favorite"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg border transition-colors ${
            isHidden
              ? "bg-zinc-700/50 text-zinc-400 border-zinc-600 hover:text-white"
              : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-red-400 hover:border-red-500/40"
          }`}
        >
          {isHidden ? (
            <>
              <Eye className="w-3.5 h-3.5" /> Restore
            </>
          ) : (
            <>
              <ThumbsDown className="w-3.5 h-3.5" /> Dismiss
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────────

function ComparisonTable({ ids }: { ids: string[] }) {
  const selected = ids.map((id) => flippaListings.find((l) => l.id === id)).filter(Boolean) as FlippaListing[];
  if (selected.length < 2) return null;

  type Row = {
    label: string;
    getValue: (l: FlippaListing) => number | string;
    higherIsBetter?: boolean;
    format?: (v: number | string) => string;
  };

  const rows: Row[] = [
    { label: "Price", getValue: (l) => l.askingPrice, higherIsBetter: false, format: (v) => fmtPrice(v as number) },
    { label: "Profit/mo", getValue: (l) => l.avgMonthlyProfit, higherIsBetter: true, format: (v) => fmtProfit(v as number) },
    {
      label: "ROI/yr",
      getValue: (l) => l.askingPrice ? parseFloat(((l.avgMonthlyProfit * 12 / l.askingPrice) * 100).toFixed(1)) : 0,
      higherIsBetter: true,
      format: (v) => `${v}%`,
    },
    { label: "Stability", getValue: (l) => l.scores.stability, higherIsBetter: true },
    { label: "Diversification", getValue: (l) => l.scores.diversification, higherIsBetter: true },
    { label: "Op. Independence", getValue: (l) => l.scores.operatorIndependence, higherIsBetter: true },
    { label: "Growth Potential", getValue: (l) => l.scores.growthPotential, higherIsBetter: true },
    { label: "Overall Score", getValue: (l) => l.scores.overall, higherIsBetter: true },
    { label: "Tech Stack", getValue: (l) => l.techStack, higherIsBetter: undefined },
    { label: "Red Flags", getValue: (l) => l.redFlags.length, higherIsBetter: false },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left text-zinc-500 font-medium py-2 pr-4 w-36">Metric</th>
            {selected.map((l) => (
              <th key={l.id} className="text-left text-zinc-300 font-semibold py-2 px-3 bg-zinc-900 rounded-t-lg">
                <div className="font-mono text-zinc-500 text-[10px]">#{l.id}</div>
                <div className="truncate max-w-[140px]">{l.title}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const values = selected.map((l) => row.getValue(l));
            const numericValues = values.filter((v) => typeof v === "number") as number[];
            const best =
              row.higherIsBetter === true
                ? Math.max(...numericValues)
                : row.higherIsBetter === false
                ? Math.min(...numericValues)
                : null;

            return (
              <tr key={row.label} className="border-t border-zinc-700/50">
                <td className="py-2 pr-4 text-zinc-500">{row.label}</td>
                {selected.map((l, i) => {
                  const val = values[i];
                  const isBest = best !== null && val === best;
                  return (
                    <td
                      key={l.id}
                      className={`py-2 px-3 ${isBest ? "text-emerald-400 font-semibold" : "text-zinc-300"}`}
                    >
                      {row.format ? row.format(val) : typeof val === "number" ? val : val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type SortKey = "overall" | "stability" | "roi" | "price" | "profit";
type RecFilter = "ALL" | "TOP_PICK" | "STRONG" | "CONSIDER" | "AVOID";
type DataFilter = "ALL" | "full_pnl" | "stats";
type TypeFilter = "ALL" | "saas" | "content" | "service" | "marketplace" | "newsletter" | "other";

export default function FlippaPage() {
  // Favorites state: map of listingId → notes
  const [favorites, setFavorites] = useState<Map<string, string | null>>(new Map());
  // Hidden set
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [loadingInit, setLoadingInit] = useState(true);

  // Filters
  const [filterRec, setFilterRec] = useState<RecFilter>("ALL");
  const [filterData, setFilterData] = useState<DataFilter>("ALL");
  const [filterType, setFilterType] = useState<TypeFilter>("ALL");
  const [showDismissed, setShowDismissed] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("overall");

  // Comparison
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // Load favorites + hidden on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/flippa/favorites", { credentials: "include" })
        .then((r) => r.json())
        .catch(() => ({ favorites: [] })),
      fetch("/api/flippa/hidden", { credentials: "include" })
        .then((r) => r.json())
        .catch(() => ({ ids: [] })),
    ]).then(([favData, hidData]) => {
      const favMap = new Map<string, string | null>();
      (favData.favorites ?? []).forEach((f: { listingId: string; notes: string | null }) => {
        favMap.set(f.listingId, f.notes);
      });
      setFavorites(favMap);
      setHidden(new Set(hidData.ids ?? []));
      setLoadingInit(false);
    });
  }, []);

  // Optimistic favorite toggle
  const handleFavorite = useCallback(
    async (id: string) => {
      const wasFav = favorites.has(id);
      if (wasFav) {
        const next = new Map(favorites);
        next.delete(id);
        setFavorites(next);
      } else {
        const next = new Map(favorites);
        next.set(id, null);
        setFavorites(next);
      }
      try {
        await fetch(`/api/flippa/${id}/favorite`, {
          method: "POST",
          credentials: "include",
        });
      } catch {
        // revert on error
        if (wasFav) {
          setFavorites((prev) => {
            const next = new Map(prev);
            next.set(id, null);
            return next;
          });
        } else {
          setFavorites((prev) => {
            const next = new Map(prev);
            next.delete(id);
            return next;
          });
        }
      }
    },
    [favorites]
  );

  // Update notes for a favorited listing
  const handleNotesChange = useCallback(async (id: string, notes: string) => {
    setFavorites((prev) => {
      const next = new Map(prev);
      next.set(id, notes);
      return next;
    });
    try {
      await fetch(`/api/flippa/${id}/favorite`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
    } catch {
      // silent failure for notes
    }
  }, []);

  // Optimistic dismiss toggle
  const handleDismiss = useCallback(async (id: string) => {
    const wasHidden = hidden.has(id);
    if (wasHidden) {
      setHidden((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setHidden((prev) => new Set([...prev, id]));
    }
    try {
      await fetch(`/api/flippa/${id}/hide`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // revert
      if (wasHidden) {
        setHidden((prev) => new Set([...prev, id]));
      } else {
        setHidden((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }
  }, [hidden]);

  // Toggle compare
  const handleToggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }, []);

  // Counts for summary
  const counts = useMemo(() => {
    const c = { TOP_PICK: 0, STRONG: 0, CONSIDER: 0, AVOID: 0 };
    flippaListings.forEach((l) => {
      const norm = normalizeRec(l.recommendation);
      if (norm in c) c[norm as keyof typeof c]++;
    });
    return c;
  }, []);

  // Best listing for target indicator
  const bestOverall = useMemo(() => {
    return flippaListings.reduce((best, l) =>
      l.scores.overall > best.scores.overall ? l : best
    , flippaListings[0]);
  }, []);

  // Filtered + sorted listings
  const filtered = useMemo(() => {
    let list = [...flippaListings];

    if (filterRec !== "ALL") {
      list = list.filter((l) => normalizeRec(l.recommendation) === filterRec);
    }
    if (filterData !== "ALL") {
      list = list.filter((l) => l.dataLevel === filterData);
    }
    if (filterType !== "ALL") {
      const ft = filterType.toLowerCase();
      list = list.filter((l) => {
        if (ft === "other") return !["saas","content","newsletter","marketplace","service"].includes(l.type);
        return l.type === ft;
      });
    }

    list.sort((a, b) => {
      if (sortKey === "overall") return b.scores.overall - a.scores.overall;
      if (sortKey === "stability") return b.scores.stability - a.scores.stability;
      if (sortKey === "roi") return b.scores.roi - a.scores.roi;
      if (sortKey === "price") return a.askingPrice - b.askingPrice;
      if (sortKey === "profit") return b.avgMonthlyProfit - a.avgMonthlyProfit;
      return 0;
    });

    return list;
  }, [filterRec, filterData, filterType, sortKey]);

  // Favorited listings (ordered by original list)
  const favoritedListings = useMemo(() => {
    return flippaListings.filter((l) => favorites.has(l.id));
  }, [favorites]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <NavHeader />
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 py-6 space-y-8">

        {/* ── 1. Summary Banner ──────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">
                Flippa Acquisition Pipeline
              </h1>
              <p className="text-sm text-zinc-400">
                <span className="text-zinc-300">{FLIPPA_PIPELINE.harvested}</span> harvested →{" "}
                <span className="text-zinc-300">{FLIPPA_PIPELINE.sieved}</span> sieved →{" "}
                <span className="text-zinc-300">{FLIPPA_PIPELINE.deepDived}</span> deep-dived →{" "}
                <span className="text-emerald-400 font-semibold">{counts.TOP_PICK} shortlisted</span>
              </p>
              <p className="text-xs text-zinc-500 mt-1">Last updated: {FLIPPA_UPDATED_AT}</p>
            </div>

            {/* Target + best match */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="text-sm font-semibold text-zinc-300">
                Target:{" "}
                <span className="text-emerald-400">£4–6K/mo net profit</span>
              </div>
              {bestOverall && (
                <div className="text-xs text-zinc-500">
                  Best match: #{bestOverall.id} — score{" "}
                  <span className="text-emerald-400 font-semibold">{bestOverall.scores.overall}</span>
                  {" / "}
                  <span className="text-emerald-400">{fmtProfit(bestOverall.avgMonthlyProfit)}/mo</span>
                </div>
              )}
              {/* Progress toward target (simple bar) */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-zinc-600">Progress to target</span>
                <div className="w-32 bg-zinc-700 rounded-full h-1.5">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (bestOverall?.avgMonthlyProfit ?? 0) / 6000 * 100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-zinc-400">
                  {fmtProfit(bestOverall?.avgMonthlyProfit ?? 0)} / £6K
                </span>
              </div>
            </div>
          </div>

          {/* Tier counts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(
              [
                { key: "TOP_PICK", label: "Top Pick", color: "emerald" },
                { key: "STRONG", label: "Strong", color: "blue" },
                { key: "CONSIDER", label: "Consider", color: "amber" },
                { key: "AVOID", label: "Avoid", color: "red" },
              ] as const
            ).map(({ key, label, color }) => (
              <div
                key={key}
                className={`bg-zinc-800 rounded-lg p-3 border ${
                  color === "emerald"
                    ? "border-emerald-500/20"
                    : color === "blue"
                    ? "border-blue-500/20"
                    : color === "amber"
                    ? "border-amber-500/20"
                    : "border-red-500/20"
                }`}
              >
                <div className="text-xs text-zinc-500 mb-0.5">{label}</div>
                <div
                  className={`text-2xl font-bold ${
                    color === "emerald"
                      ? "text-emerald-400"
                      : color === "blue"
                      ? "text-blue-400"
                      : color === "amber"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {counts[key]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Favorites Section ───────────────────────────────────────── */}
        {!loadingInit && favoritedListings.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-400" />
              Your Favorites ({favoritedListings.length})
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {favoritedListings.map((l) => (
                <FavoriteCard
                  key={l.id}
                  listing={l}
                  notes={favorites.get(l.id) ?? null}
                  onRemove={() => handleFavorite(l.id)}
                  onNotesChange={(n) => handleNotesChange(l.id, n)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 3. Filter Bar ─────────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Recommendation filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Tier:</span>
              {(["ALL", "TOP_PICK", "STRONG", "CONSIDER", "AVOID"] as RecFilter[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRec(r)}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                    filterRec === r
                      ? "bg-zinc-700 text-white border-zinc-500"
                      : "text-zinc-500 border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {r === "ALL" ? "All" : REC_LABELS[r] ?? r}
                </button>
              ))}
            </div>

            {/* Data level */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Data:</span>
              {(["ALL", "full_pnl", "stats"] as DataFilter[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterData(d)}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                    filterData === d
                      ? "bg-zinc-700 text-white border-zinc-500"
                      : "text-zinc-500 border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {d === "ALL" ? "All" : d === "full_pnl" ? "Full P&L" : "Stats Only"}
                </button>
              ))}
            </div>

            {/* Type */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-zinc-500">Type:</span>
              {(["ALL", "saas", "content", "service", "marketplace", "newsletter", "other"] as TypeFilter[]).map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                      filterType === t
                        ? "bg-zinc-700 text-white border-zinc-500"
                        : "text-zinc-500 border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {t === "ALL" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center border-t border-zinc-700/50 pt-3">
            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Sort:</span>
              {(
                [
                  ["overall", "Overall Score"],
                  ["stability", "Stability"],
                  ["roi", "ROI Score"],
                  ["price", "Price ↑"],
                  ["profit", "Profit/mo"],
                ] as [SortKey, string][]
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setSortKey(k)}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                    sortKey === k
                      ? "bg-zinc-700 text-white border-zinc-500"
                      : "text-zinc-500 border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Show dismissed toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDismissed}
                onChange={(e) => setShowDismissed(e.target.checked)}
                className="w-3.5 h-3.5 accent-emerald-500"
              />
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                {showDismissed ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                Show dismissed ({hidden.size})
              </span>
            </label>

            <span className="text-xs text-zinc-600 ml-auto">
              {filtered.filter((l) => showDismissed || !hidden.has(l.id)).length} listings shown
            </span>
          </div>
        </section>

        {/* ── 4. Listings Grid ──────────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered
              .filter((l) => showDismissed || !hidden.has(l.id))
              .map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isFavorited={favorites.has(listing.id)}
                  isHidden={hidden.has(listing.id)}
                  showDismissed={showDismissed}
                  isComparing={compareIds.includes(listing.id)}
                  onFavorite={() => handleFavorite(listing.id)}
                  onDismiss={() => handleDismiss(listing.id)}
                  onToggleCompare={() => handleToggleCompare(listing.id)}
                />
              ))}
          </div>
          {filtered.filter((l) => showDismissed || !hidden.has(l.id)).length === 0 && (
            <div className="text-center text-zinc-600 text-sm py-16">
              No listings match the current filters.
            </div>
          )}
        </section>

        {/* ── 5. Comparison Tool ────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setCompareOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">
                Compare Tool
              </span>
              {compareIds.length > 0 && (
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  {compareIds.length} selected
                </span>
              )}
            </div>
            {compareOpen ? (
              <ChevronUp className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {compareOpen && (
            <div className="px-5 pb-5 space-y-4">
              <p className="text-xs text-zinc-500">
                Check the compare box on up to 3 listing cards to compare them here. Best value in each numeric row is highlighted green.
              </p>

              {compareIds.length < 2 ? (
                <p className="text-xs text-zinc-600 italic">
                  Select at least 2 listings using the checkboxes on the cards above.
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    {compareIds.map((id) => {
                      const l = flippaListings.find((x) => x.id === id);
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-1.5 text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1"
                        >
                          <span className="font-mono text-zinc-500">#{id}</span>
                          <span className="text-zinc-300 max-w-[120px] truncate">{l?.title}</span>
                          <button
                            onClick={() => handleToggleCompare(id)}
                            className="text-zinc-600 hover:text-red-400 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <ComparisonTable ids={compareIds} />
                </>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
