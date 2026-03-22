"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, ExternalLink } from "lucide-react";

interface Favorite {
  id: number;
  propertyId: number;
  notes: string | null;
  createdAt: string | null;
  cidade: string;
  bairro: string | null;
  preco: string | null;
  valorAvaliacao: string | null;
  desconto: string | null;
  score: string | null;
  marketValue: string | null;
  tipoImovel: string | null;
  linkCaixa: string | null;
  removedAt: string | null;
}

function formatBRL(value: string | number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "A+", color: "bg-green-900 text-green-300" };
  if (score >= 75) return { label: "A", color: "bg-green-900 text-green-300" };
  if (score >= 65) return { label: "B+", color: "bg-yellow-900 text-yellow-300" };
  if (score >= 55) return { label: "B", color: "bg-yellow-900 text-yellow-300" };
  if (score >= 40) return { label: "C", color: "bg-orange-900 text-orange-300" };
  return { label: "D", color: "bg-red-900 text-red-300" };
}

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  // Map of favoriteId -> editing notes text
  const [editingNotes, setEditingNotes] = useState<Record<number, string>>({});
  // Set of favoriteIds currently being saved
  const [savingNotes, setSavingNotes] = useState<Set<number>>(new Set());

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/favorites", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFavorite = async (favoriteId: number) => {
    try {
      const res = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
      }
    } catch {
      // silently ignore
    }
  };

  const saveNotes = async (favoriteId: number) => {
    const notes = editingNotes[favoriteId] ?? "";
    setSavingNotes((prev) => new Set(prev).add(favoriteId));
    try {
      const res = await fetch(`/api/favorites/${favoriteId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notes || null }),
      });
      if (res.ok) {
        setFavorites((prev) =>
          prev.map((f) => (f.id === favoriteId ? { ...f, notes: notes || null } : f))
        );
        // Clear the editing state so it shows the saved value
        setEditingNotes((prev) => {
          const next = { ...prev };
          delete next[favoriteId];
          return next;
        });
      }
    } catch {
      // silently ignore
    } finally {
      setSavingNotes((prev) => {
        const next = new Set(prev);
        next.delete(favoriteId);
        return next;
      });
    }
  };

  const getNotesValue = (fav: Favorite) => {
    if (editingNotes[fav.id] !== undefined) return editingNotes[fav.id];
    return fav.notes ?? "";
  };

  const isEditingNotes = (fav: Favorite) => editingNotes[fav.id] !== undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
          <div>
            <h1 className="text-xl font-bold">Favoritos</h1>
            <p className="text-sm text-zinc-400">
              {loading ? "Carregando..." : `${favorites.length} imóvel${favorites.length !== 1 ? "is" : ""} favoritado${favorites.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Star className="w-12 h-12 text-zinc-700" />
            <p className="text-zinc-400 text-lg">Nenhum imóvel favoritado.</p>
            <p className="text-zinc-500 text-sm">
              Clique no <Star className="w-3.5 h-3.5 inline" /> na tabela para adicionar.
            </p>
            <Link
              href="/imoveis"
              className="mt-2 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 transition-colors"
            >
              Ver imóveis
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {favorites.map((fav) => {
              const score = fav.score ? parseFloat(fav.score) : null;
              const grade = score !== null ? getScoreGrade(score) : null;
              const notesVal = getNotesValue(fav);
              const isDirty = isEditingNotes(fav);
              const saving = savingNotes.has(fav.id);

              return (
                <div
                  key={fav.id}
                  className={`bg-zinc-900 border rounded-xl p-4 space-y-3 flex flex-col ${
                    fav.removedAt ? "border-red-900/60" : "border-zinc-800"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/imoveis/${fav.propertyId}`}
                        className="font-semibold text-zinc-100 hover:text-blue-400 transition-colors block truncate"
                      >
                        {fav.tipoImovel || "Imóvel"} — {fav.cidade}
                      </Link>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                        {fav.bairro ? `${fav.bairro}, ` : ""}{fav.cidade}
                      </p>
                      {fav.removedAt && (
                        <Badge className="mt-1 bg-red-900 text-red-300 text-xs">
                          Removido da Caixa
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {score !== null && grade && (
                        <Badge className={grade.color + " font-bold"}>
                          {grade.label}
                        </Badge>
                      )}
                      {fav.linkCaixa && (
                        <a
                          href={fav.linkCaixa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-zinc-500 hover:text-blue-400 transition-colors"
                          title="Ver na Caixa"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => removeFavorite(fav.id)}
                        className="p-1.5 rounded text-zinc-600 hover:text-red-400 transition-colors"
                        title="Remover dos favoritos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price row */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">Preço Caixa</p>
                      <p className="font-semibold text-zinc-100">{formatBRL(fav.preco)}</p>
                    </div>
                    {fav.marketValue && (
                      <div>
                        <p className="text-xs text-zinc-500 mb-0.5">Valor Mercado</p>
                        <p className={`font-semibold ${fav.preco && parseFloat(fav.preco) < parseFloat(fav.marketValue) ? "text-green-400" : "text-zinc-200"}`}>
                          {formatBRL(fav.marketValue)}
                        </p>
                      </div>
                    )}
                    {fav.desconto && (
                      <div>
                        <p className="text-xs text-zinc-500 mb-0.5">Desconto</p>
                        <Badge
                          className={
                            parseFloat(fav.desconto) >= 40
                              ? "bg-green-900 text-green-300"
                              : "bg-zinc-700 text-zinc-300"
                          }
                        >
                          {parseFloat(fav.desconto).toFixed(0)}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs text-zinc-500">Anotações</label>
                    <textarea
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-zinc-500 transition-colors"
                      rows={2}
                      placeholder="Adicionar anotação..."
                      value={notesVal}
                      onChange={(e) =>
                        setEditingNotes((prev) => ({ ...prev, [fav.id]: e.target.value }))
                      }
                    />
                    {isDirty && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNotes(fav.id)}
                          disabled={saving}
                          className="text-xs px-2.5 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 disabled:opacity-50 transition-colors"
                        >
                          {saving ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                          onClick={() =>
                            setEditingNotes((prev) => {
                              const next = { ...prev };
                              delete next[fav.id];
                              return next;
                            })
                          }
                          className="text-xs px-2.5 py-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer link */}
                  <Link
                    href={`/imoveis/${fav.propertyId}`}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
