import Link from "next/link";

/**
 * Paginação por link (`?p=N`), sem estado de cliente. `paramsAtuais` já vem
 * sem a chave `p` — cada link a define de novo (ou omite, na página 1).
 */
export function Paginacao({
  base,
  paramsAtuais,
  paginaAtual,
  totalPaginas,
}: {
  base: string;
  paramsAtuais: URLSearchParams;
  paginaAtual: number;
  totalPaginas: number;
}) {
  if (totalPaginas <= 1) return null;

  function hrefPara(pagina: number): string {
    const params = new URLSearchParams(paramsAtuais);
    if (pagina <= 1) params.delete("p");
    else params.set("p", String(pagina));
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }

  return (
    <nav className="mt-6 flex items-center justify-between gap-2 border-t border-zinc-800 pt-4 text-sm text-zinc-400" aria-label="Paginação">
      {paginaAtual > 1 ? (
        <Link href={hrefPara(paginaAtual - 1)} className="rounded-md border border-zinc-700 px-3 py-1.5 hover:bg-zinc-900">
          Anterior
        </Link>
      ) : (
        <span />
      )}
      <span>
        Página {paginaAtual} de {totalPaginas}
      </span>
      {paginaAtual < totalPaginas ? (
        <Link href={hrefPara(paginaAtual + 1)} className="rounded-md border border-zinc-700 px-3 py-1.5 hover:bg-zinc-900">
          Próxima
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
