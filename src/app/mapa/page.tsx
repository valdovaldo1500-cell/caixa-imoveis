"use client";

import dynamic from "next/dynamic";
import NavHeader from "@/components/NavHeader";
import { useState, useEffect } from "react";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-zinc-400">
      Carregando mapa...
    </div>
  ),
});

interface MapProperty {
  id: number;
  cidade: string;
  bairro: string | null;
  preco: string | null;
  desconto: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  lat: string;
  lng: string;
}

export default function MapaPage() {
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/map", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setProperties(json.data || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavHeader />

      {/* Map subheader with status */}
      <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <h1 className="text-sm font-semibold text-zinc-300">Mapa de Imóveis</h1>
        {!loading && !error && (
          <span className="text-sm text-zinc-400">
            {properties.length} geolocalizados
          </span>
        )}
        {loading && (
          <span className="text-sm text-zinc-500">Carregando dados...</span>
        )}
        {error && (
          <span className="text-sm text-red-400">Erro: {error}</span>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-400 shrink-0">
        <span className="font-medium text-zinc-300">Desconto:</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 border border-black/40" />
          &ge;50%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 border border-black/40" />
          30–49%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 border border-black/40" />
          &lt;30%
        </span>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!loading && (
          <PropertyMap properties={properties} />
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            Carregando dados...
          </div>
        )}
      </div>
    </div>
  );
}
