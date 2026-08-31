import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Casca comum dos guias (O6). Fecha a janela do dado no rodapé de cada texto:
 * a regra do dono é que página pública abre com dado recente e declara a
 * data — como os números aqui saem todos do estoque vivo, a data do estoque
 * é a janela.
 */
export function Guia({
  titulo,
  linhaFina,
  atualizadoEm,
  children,
}: {
  titulo: string;
  linhaFina: string;
  atualizadoEm: Date;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Navegação estrutural" className="mb-4 flex items-center gap-1 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Início
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href="/guias" className="hover:text-zinc-300">
            Guias
          </Link>
        </nav>

        <h1 className="text-2xl font-semibold leading-tight text-zinc-100">{titulo}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{linhaFina}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-300">{children}</div>

        <footer className="mt-12 border-t border-zinc-900 pt-4 text-xs text-zinc-500">
          <p>
            Todos os números desta página saem do estoque de imóveis da Caixa que mantemos atualizado, consultados no
            momento em que a página é aberta. Última atualização do estoque:{" "}
            <time dateTime={atualizadoEm.toISOString()}>
              {atualizadoEm.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </time>
            .
          </p>
          <p className="mt-2">
            Fonte do estoque: lista pública de imóveis da Caixa Econômica Federal. Nada aqui é recomendação de compra —
            confira sempre o edital e a matrícula antes de dar lance.
          </p>
        </footer>
      </div>
    </div>
  );
}

/** Bloco de destaque para o número que carrega o argumento do trecho. */
export function Destaque({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-200">{children}</p>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-2 text-base font-medium text-zinc-100">{children}</h2>;
}
