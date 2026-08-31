import Link from "next/link";
import type { Metadata } from "next";
import { formatBRL } from "../../leilao-imoveis/_lib/format";
import { getAtualizacao, getModalidades, getTotais } from "../_lib/queries";
import { Destaque, Guia, H2 } from "../_components/Guia";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  const totais = await getTotais();
  return {
    title: "Como funciona o leilão da Caixa: as 4 modalidades e o que muda em cada uma",
    description: `As quatro modalidades de venda da Caixa se comportam de formas opostas quanto a desconto, preço e financiamento. Comparação feita sobre os ${num(totais?.total ?? 0)} imóveis ativos hoje.`,
    alternates: { canonical: `${SITE_URL}/guias/como-funciona-leilao-caixa` },
  };
}

const num = (n: number) => n.toLocaleString("pt-BR");

function pct(parte: number, todo: number): string {
  if (!todo) return "0%";
  return `${Math.round((parte / todo) * 100)}%`;
}

export default async function GuiaModalidades() {
  const [modalidades, totais, atualizadoEm] = await Promise.all([getModalidades(), getTotais(), getAtualizacao()]);

  const total = totais?.total ?? 0;
  const sfi = modalidades.find((m) => m.modalidade.startsWith("Leilão SFI"));
  const direta = modalidades.find((m) => m.modalidade.startsWith("Venda Direta"));

  return (
    <Guia
      titulo="Como funciona o leilão da Caixa: as 4 modalidades e o que muda em cada uma"
      linhaFina={`A Caixa vende imóvel retomado por quatro caminhos diferentes, e a diferença entre eles decide se existe desconto, se dá para financiar e se há uma data de leilão para respeitar. A comparação abaixo é feita sobre os ${num(total)} imóveis ativos agora.`}
      atualizadoEm={atualizadoEm}
    >
      <p>
        Quem procura “leilão da Caixa” costuma imaginar uma coisa só: um pregão com data marcada, lance e martelo. Na
        prática o estoque da Caixa está repartido em quatro modalidades, e só parte dele é leilão de verdade. As outras
        são venda por proposta, que abre e fecha sem data pública.
      </p>

      <H2>O que o estoque de hoje mostra</H2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="py-2 pr-3 font-medium">Modalidade</th>
              <th className="py-2 pr-3 text-right font-medium">Imóveis</th>
              <th className="py-2 pr-3 text-right font-medium">Abaixo da avaliação</th>
              <th className="py-2 pr-3 text-right font-medium">Desconto mediano</th>
              <th className="py-2 pr-3 text-right font-medium">Preço mediano</th>
              <th className="py-2 text-right font-medium">Aceita financiamento</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {modalidades.map((m) => (
              <tr key={m.modalidade} className="border-b border-zinc-900">
                <td className="py-2 pr-3">{m.modalidade}</td>
                <td className="py-2 pr-3 text-right tabular-nums">{num(m.total)}</td>
                <td className="py-2 pr-3 text-right tabular-nums">
                  {num(m.comDesconto)} <span className="text-zinc-500">({pct(m.comDesconto, m.total)})</span>
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">
                  {m.descontoMediano != null ? `${m.descontoMediano.toFixed(0)}%` : "—"}
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">{formatBRL(m.precoMediano) ?? "—"}</td>
                <td className="py-2 text-right tabular-nums">
                  {num(m.aceitaFinanciamento)} <span className="text-zinc-500">({pct(m.aceitaFinanciamento, m.total)})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sfi && direta && (
        <Destaque>
          A leitura que inverte a expectativa de quase todo mundo: a modalidade que se chama leilão é a que tem menos
          desconto. No Leilão SFI, {num(sfi.comDesconto)} de {num(sfi.total)} imóveis saem abaixo da avaliação (
          {pct(sfi.comDesconto, sfi.total)}) e {num(sfi.acimaDaAvaliacao)} estão com preço <em>acima</em> dela. Na Venda
          Direta Online, que não é leilão, são {num(direta.comDesconto)} de {num(direta.total)} (
          {pct(direta.comDesconto, direta.total)}), com desconto mediano de {direta.descontoMediano?.toFixed(0)}%.
        </Destaque>
      )}

      <H2>Por que o Leilão SFI aparece sem desconto</H2>
      <p>
        Nessa modalidade o imóvel foi retomado por alienação fiduciária e o lance mínimo do primeiro leilão não é uma
        fração da avaliação: é a <strong>dívida</strong> do contrato, corrigida, mais encargos. Quando o financiamento
        estava perto do fim ou o imóvel desvalorizou, essa conta passa do valor de avaliação, e o resultado é um imóvel
        anunciado por mais do que vale na tabela da própria Caixa. É por isso que a nossa listagem esconde o selo de
        desconto quando ele é zero, em vez de mostrar “-0%”.
      </p>
      <p>
        O segundo leilão da mesma modalidade costuma cair para o valor de avaliação, e aí o desconto aparece. Quando a
        data existe, ela fica na ficha do imóvel.
      </p>

      <H2>Financiamento é a exceção, não a regra</H2>
      <p>
        Somando as quatro modalidades, {num(modalidades.reduce((s, m) => s + m.aceitaFinanciamento, 0))} dos {num(total)} imóveis
        ativos aceitam financiamento da Caixa. O resto é pagamento à vista, no prazo do edital. É o ponto que mais
        derruba comprador de primeira viagem: o desconto é real, mas o dinheiro precisa estar disponível.
      </p>

      <H2>O que conferir antes de dar lance</H2>
      <p>
        Em qualquer das quatro modalidades, três coisas mudam o preço final e não aparecem no anúncio: se há
        <strong> ocupante</strong> no imóvel (a desocupação corre por conta do comprador na maior parte dos editais), se
        há <strong>dívida de condomínio e IPTU</strong> em aberto, e o que diz a <strong>matrícula</strong>. As duas
        primeiras estão no edital; a terceira, no cartório de registro da comarca. Nas fichas em que já coletamos, o
        número da matrícula, a comarca e o link do edital ficam no fim da página.
      </p>

      <p className="pt-2">
        <Link href="/guias/onde-estao-os-descontos" className="text-zinc-100 underline underline-offset-4 hover:text-white">
          Onde estão os maiores descontos, cidade por cidade
        </Link>{" "}
        <span className="text-zinc-500">·</span>{" "}
        <Link href="/guias/seguranca-do-bairro" className="text-zinc-100 underline underline-offset-4 hover:text-white">
          Como ler a segurança do bairro antes de comprar
        </Link>
      </p>
    </Guia>
  );
}
