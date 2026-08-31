import {
  lerSeguranca,
  fraseFonte,
  fraseMunicipio,
  fraseAvisoPoucosDados,
  fraseOrigemBairro,
  type CrimeCampos,
} from "@/lib/seguranca";

/**
 * O bloco que diferencia o produto.
 *
 * Posição na página: logo abaixo do título e das características, no mesmo
 * lugar em que o Arremata.ai põe o score jurídico — é o ponto da página em
 * que o comprador já sabe o que é o imóvel e quer saber se vale a pena.
 * Nenhum dos 11 agregadores auditados em 28/08/2026 mostra dado de segurança.
 *
 * Regra que não pode ser quebrada: o número nunca aparece sozinho. Grão,
 * fonte e janela vão junto, sempre. Quando o dado é suprimido por poucos
 * eventos, mostramos a ausência — nunca um neutro fixo.
 *
 * Desde a entrada do grão bairro (31/08/2026), a nota pode ser do bairro ou
 * do município — `lerSeguranca` já resolve o grão exibido e o contexto
 * municipal (`s.municipio`) a partir dos campos `crime_*`/`crime_muni_*`.
 */
export function BlocoSeguranca({
  imovel,
  cidade,
  compacto = false,
}: {
  imovel: CrimeCampos;
  cidade: string;
  compacto?: boolean;
}) {
  const s = lerSeguranca(imovel);

  if (!s) {
    if (compacto) return null;
    return (
      <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-sm font-medium text-zinc-300">Segurança da região</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Dado insuficiente para {cidade}. A região teve poucos registros no
          período, e uma taxa calculada sobre poucos casos oscilaria demais para
          significar alguma coisa. Preferimos não mostrar um número a mostrar um
          número frágil.
        </p>
      </section>
    );
  }

  const grãoPalavra = s.graoCodigo === "bairro" ? "bairro" : "município";

  // No card, a fonte NÃO pode ficar só no atributo `title`: em toque não
  // existe hover, e a regra é que o número nunca apareça sozinho. Por isso o
  // compacto mostra o rótulo e o número visíveis, com a palavra do grão ao
  // lado — nunca só no `title`.
  if (compacto) {
    const detalhe =
      s.taxa != null
        ? `${s.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}/100 mil hab. · município`
        : `nota ${s.nota} · ${grãoPalavra}`;
    return (
      <span className="inline-flex flex-col items-end gap-0.5 text-right">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${s.cor}`}
        >
          {s.rotulo}
        </span>
        <span className="text-[10px] leading-tight text-zinc-500">{detalhe}</span>
      </span>
    );
  }

  const avisoPoucosDados = fraseAvisoPoucosDados(s);
  const avisoOrigemBairro = fraseOrigemBairro(s);
  const contextoMunicipal = fraseMunicipio(s);
  const rotuloRegiao = s.graoCodigo === "bairro" && s.bairroNome ? `Bairro ${tituloCaso(s.bairroNome)}` : cidade;

  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-sm font-medium text-zinc-300">Segurança da região</h2>

      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-base font-semibold ${s.cor}`}
        >
          {s.rotulo}
        </span>
        {s.graoCodigo === "bairro" && s.bairroNome && (
          <span className="text-sm font-medium text-zinc-300">Bairro {tituloCaso(s.bairroNome)}</span>
        )}
        {s.taxa != null ? (
          <span className="text-2xl font-semibold tabular-nums text-zinc-100">
            {s.taxa.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
            <span className="ml-1 text-sm font-normal text-zinc-400">
              mortes violentas por 100 mil habitantes/ano
            </span>
          </span>
        ) : (
          <span className="text-2xl font-semibold tabular-nums text-zinc-100">
            {s.nota}
            <span className="ml-1 text-sm font-normal text-zinc-400">nota de segurança (0 a 1000, quanto menor melhor)</span>
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-zinc-400">
        {rotuloRegiao} está {s.contexto}.
      </p>

      <p className="mt-3 border-t border-zinc-800 pt-3 text-xs leading-relaxed text-zinc-500">
        {fraseFonte(s)} A nota é {s.grao} — não do endereço.
      </p>

      {contextoMunicipal && <p className="mt-2 text-xs leading-relaxed text-zinc-500">{contextoMunicipal}</p>}

      {avisoPoucosDados && (
        <p className="mt-2 text-xs leading-relaxed text-amber-400/80">{avisoPoucosDados}</p>
      )}

      {avisoOrigemBairro && (
        <p className="mt-2 text-xs leading-relaxed text-zinc-600">{avisoOrigemBairro}</p>
      )}
    </section>
  );
}

const PREPOSICOES = new Set(["de", "da", "do", "das", "dos", "e"]);

/**
 * "TANCREDO NEVES" -> "Tancredo Neves". Duplicada de propósito (mesmo padrão
 * de `_lib/format.ts` e `_lib/helpers.ts`): este componente é compartilhado
 * pelas páginas de imóvel, cidade e home, que evoluem em paralelo por
 * agentes diferentes — importar de uma delas criaria acoplamento indevido.
 */
function tituloCaso(txt: string | null | undefined): string {
  if (!txt) return "";
  return txt
    .toLowerCase()
    .split(" ")
    .map((palavra, i) =>
      i > 0 && PREPOSICOES.has(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");
}
