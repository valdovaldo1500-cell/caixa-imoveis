import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { GUIAS } from "./_lib/indice";
import { getAtualizacao, getTotais } from "./_lib/queries";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Guias sobre imóveis de leilão da Caixa",
  description:
    "Como funcionam as modalidades de venda da Caixa, onde estão os descontos reais e como ler a segurança do bairro antes de dar lance. Todos com números do estoque de hoje.",
  alternates: { canonical: `${SITE_URL}/guias` },
};

export default async function GuiasPage() {
  const [totais, atualizadoEm] = await Promise.all([getTotais(), getAtualizacao()]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Navegação estrutural" className="mb-4 flex items-center gap-1 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Início
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-400">Guias</span>
        </nav>

        <h1 className="text-2xl font-semibold text-zinc-100">Guias sobre imóveis de leilão da Caixa</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Textos curtos que respondem o que muda o preço final de um imóvel retomado. Nenhum número está escrito no
          texto: todos saem do estoque de {totais?.total ?? 0} imóveis que mantemos atualizado, recalculados quando você
          abre a página.
        </p>

        <ul className="mt-8 space-y-3">
          {GUIAS.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guias/${g.slug}`}
                className="block rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition hover:border-zinc-700"
              >
                <span className="text-sm font-medium text-zinc-100">{g.titulo}</span>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{g.resumo}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-zinc-500">
          Última atualização do estoque:{" "}
          <time dateTime={atualizadoEm.toISOString()}>
            {atualizadoEm.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </time>
          .
        </p>
      </div>
    </div>
  );
}
