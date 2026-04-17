import Link from "next/link";
import { MapPin, Building2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Imóveis Caixa — Selecione o Estado",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Imóveis Caixa</h1>
          <p className="text-zinc-400 text-sm">Dashboard de análise de imóveis retomados — selecione o estado</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/rs" className="group relative bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-xl p-6 transition-all hover:bg-zinc-800/80 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="bg-blue-600/20 rounded-lg p-2.5">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-blue-400">RS</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Rio Grande do Sul</h2>
              <p className="text-sm text-zinc-400 mt-1">Porto Alegre e interior — dados completos com scoring e comparáveis</p>
            </div>
            <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
              Acessar dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link href="/go" className="group relative bg-zinc-900 border border-zinc-800 hover:border-emerald-500 rounded-xl p-6 transition-all hover:bg-zinc-800/80 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="bg-emerald-600/20 rounded-lg p-2.5">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-emerald-400">GO</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Goiás</h2>
              <p className="text-sm text-zinc-400 mt-1">Goiânia e interior — 4706 imóveis com scoring e comparáveis ZAP/5ºAndar</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              Acessar dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-zinc-600">Acesso restrito — faça login para continuar</p>
      </div>
    </div>
  );
}
