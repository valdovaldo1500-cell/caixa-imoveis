/**
 * Filtros da lista de cidade, por querystring — sem estado de cliente, sem
 * JavaScript. Um `<form method="get">` simples: o navegador monta a query
 * string e navega, o que funciona igual com ou sem JS e mantém a página
 * indexável. A ordem dos campos é a pedida na auditoria de concorrentes:
 * desconto → segurança → preço → tipo — segurança em segundo de propósito,
 * não escondida no fim do formulário.
 */

const OPCOES_DESCONTO = [30, 40, 50, 60, 70];

const OPCOES_PRECO = [
  { valor: 100000, rotulo: "até R$ 100 mil" },
  { valor: 200000, rotulo: "até R$ 200 mil" },
  { valor: 300000, rotulo: "até R$ 300 mil" },
  { valor: 500000, rotulo: "até R$ 500 mil" },
  { valor: 1000000, rotulo: "até R$ 1 milhão" },
];

const OPCOES_SEGURANCA = [
  { valor: "baixo", rotulo: "Só risco baixo" },
  { valor: "moderado", rotulo: "Até risco moderado" },
  { valor: "medio", rotulo: "Até risco médio" },
  { valor: "alto", rotulo: "Até risco alto" },
];

const CAMPO = "w-full rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none";
const ROTULO = "mb-1 block text-xs text-zinc-500";

export function Filtros({
  action,
  tipos,
  atual,
}: {
  action: string;
  tipos: string[];
  atual: { desconto?: string; seguranca?: string; precoMax?: string; tipo?: string; ordem?: string };
}) {
  return (
    <form
      method="get"
      action={action}
      className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <div>
        <label htmlFor="f-desconto" className={ROTULO}>
          Desconto mínimo
        </label>
        <select id="f-desconto" name="desconto" defaultValue={atual.desconto ?? ""} className={CAMPO}>
          <option value="">Qualquer desconto</option>
          {OPCOES_DESCONTO.map((d) => (
            <option key={d} value={d}>
              {d}% ou mais
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-seguranca" className={ROTULO}>
          Segurança
        </label>
        <select id="f-seguranca" name="seguranca" defaultValue={atual.seguranca ?? ""} className={CAMPO}>
          <option value="">Qualquer segurança</option>
          {OPCOES_SEGURANCA.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-preco" className={ROTULO}>
          Preço máximo
        </label>
        <select id="f-preco" name="precoMax" defaultValue={atual.precoMax ?? ""} className={CAMPO}>
          <option value="">Qualquer preço</option>
          {OPCOES_PRECO.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-tipo" className={ROTULO}>
          Tipo de imóvel
        </label>
        <select id="f-tipo" name="tipo" defaultValue={atual.tipo ?? ""} className={CAMPO}>
          <option value="">Qualquer tipo</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="f-ordem" className={ROTULO}>
            Ordenar por
          </label>
          <select id="f-ordem" name="ordem" defaultValue={atual.ordem ?? "desconto"} className={CAMPO}>
            <option value="desconto">Maior desconto</option>
            <option value="preco">Menor preço</option>
            <option value="risco">Menor risco</option>
          </select>
        </div>
        <button
          type="submit"
          className="h-8 shrink-0 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
