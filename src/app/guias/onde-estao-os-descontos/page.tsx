import Link from "next/link";
import type { Metadata } from "next";
import { cidadeUrl } from "@/lib/slug";
import { formatBRL, tituloCaso } from "../../leilao-imoveis/_lib/format";
import { UF_NOME } from "../../leilao-imoveis/_lib/queries";
import { getAtualizacao, getCidadesPorDesconto, getTotais } from "../_lib/queries";
import { Destaque, Guia, H2 } from "../_components/Guia";

export const dynamic = "force-dynamic";

const num = (n: number) => n.toLocaleString("pt-BR");

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  const totais = await getTotais();
  return {
    title: "Onde estão os maiores descontos nos imóveis da Caixa",
    description: `Cidades ordenadas pelo desconto mediano sobre o valor de avaliação, sobre os ${num(totais?.abaixoDaAvaliacao ?? 0)} imóveis que hoje saem abaixo da avaliação.`,
    alternates: { canonical: `${SITE_URL}/guias/onde-estao-os-descontos` },
  };
}

export default async function GuiaDescontos() {
  const [cidades, totais, atualizadoEm] = await Promise.all([
    getCidadesPorDesconto(20),
    getTotais(),
    getAtualizacao(),
  ]);

  const total = totais?.total ?? 0;
  const abaixo = totais?.abaixoDaAvaliacao ?? 0;

  // A distância entre o topo e o fim da lista é DERIVADA, nunca afirmada: com
  // o estoque mudando todo dia, uma frase cravada ("passa de duas vezes")
  // vira mentira sozinha na primeira reimportação.
  const espalhamento =
    cidades.length >= 2
      ? `${cidades[0].descontoMediano.toFixed(0)}% na primeira contra ${cidades[cidades.length - 1].descontoMediano.toFixed(0)}% na última desta lista.`
      : null;

  return (
    <Guia
      titulo="Onde estão os maiores descontos nos imóveis da Caixa"
      linhaFina={`Dos ${num(total)} imóveis ativos, ${num(abaixo)} saem abaixo do valor de avaliação. O desconto não está distribuído por igual${espalhamento ? `: ${espalhamento}` : "."}`}
      atualizadoEm={atualizadoEm}
    >
      <p>
        A lista traz as cidades com pelo menos dez imóveis com desconto, ordenadas pelo desconto mediano. O piso de dez
        é proposital: uma cidade com dois imóveis produz um “desconto mediano de 78%” que não descreve mercado nenhum,
        só o acaso de duas fichas.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="py-2 pr-3 font-medium">Cidade</th>
              <th className="py-2 pr-3 text-right font-medium">Imóveis com desconto</th>
              <th className="py-2 pr-3 text-right font-medium">Desconto mediano</th>
              <th className="py-2 text-right font-medium">Preço mediano</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {cidades.map((c) => (
              <tr key={`${c.uf}-${c.cidade}`} className="border-b border-zinc-900">
                <td className="py-2 pr-3">
                  <Link href={cidadeUrl(c.uf, c.cidade)} className="underline underline-offset-4 hover:text-white">
                    {tituloCaso(c.cidade)}
                  </Link>
                  <span className="text-zinc-500"> · {UF_NOME[c.uf] ?? c.uf}</span>
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">{num(c.total)}</td>
                <td className="py-2 pr-3 text-right tabular-nums">{c.descontoMediano.toFixed(0)}%</td>
                <td className="py-2 text-right tabular-nums">{formatBRL(c.precoMediano) ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>O desconto é sobre a avaliação, não sobre o mercado</H2>
      <p>
        O percentual que aparece em qualquer agregador, aqui inclusive, compara o preço pedido com o{" "}
        <strong>valor de avaliação da própria Caixa</strong>. É um número honesto e é o único disponível para todo o
        estoque, mas não é o preço de mercado do imóvel. A avaliação é feita por engenheiro credenciado, muitas vezes
        meses antes, e em cidade de mercado fraco ela fica acima do que o imóvel realmente venderia.
      </p>
      <Destaque>
        A leitura prática: um desconto de 50% em cidade com liquidez baixa pode ser um imóvel no preço, enquanto 25% em
        bairro disputado é uma barganha. Antes de comparar cidades pelo percentual, olhe o preço mediano da coluna ao
        lado — ele diz em que faixa o estoque daquela cidade realmente está.
      </Destaque>

      <H2>O que come o desconto depois</H2>
      <p>
        Três custos não entram na conta do percentual e mudam o resultado: a desocupação, quando o imóvel está
        ocupado e o edital passa essa responsabilidade ao comprador; as dívidas de condomínio e IPTU anteriores à
        arrematação, que em parte dos editais também vão para o comprador; e a reforma, que num imóvel retomado
        raramente é cosmética. Some os três antes de decidir se o desconto compensa.
      </p>

      <p className="pt-2">
        <Link
          href="/guias/como-funciona-leilao-caixa"
          className="text-zinc-100 underline underline-offset-4 hover:text-white"
        >
          As quatro modalidades de venda da Caixa e o que muda em cada uma
        </Link>{" "}
        <span className="text-zinc-500">·</span>{" "}
        <Link href="/guias/seguranca-do-bairro" className="text-zinc-100 underline underline-offset-4 hover:text-white">
          Como ler a segurança do bairro antes de comprar
        </Link>
      </p>
    </Guia>
  );
}
