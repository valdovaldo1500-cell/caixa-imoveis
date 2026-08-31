import Link from "next/link";
import type { Metadata } from "next";
import { cidadeUrl } from "@/lib/slug";
import { FAIXAS_TAXA, nivelDoPercentil } from "@/lib/seguranca";
import { formatBRL } from "../../leilao-imoveis/_lib/format";
import { getAtualizacao, getBairrosDaCidade, getTotais } from "../_lib/queries";
import { Destaque, Guia, H2 } from "../_components/Guia";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

/**
 * A cidade do exemplo é fixa de propósito: Porto Alegre é a que tem estoque
 * grande E camada de bairro resolvida, então é onde o espalhamento aparece
 * com número em vez de promessa. Se o estoque de POA secar, a página cai no
 * texto sem tabela em vez de quebrar.
 */
const CIDADE_EXEMPLO = { nome: "PORTO ALEGRE", uf: "RS", exibicao: "Porto Alegre" };

const ROTULO: Record<string, string> = {
  baixo: "Risco baixo",
  moderado: "Risco moderado",
  medio: "Risco médio",
  alto: "Risco alto",
  muito_alto: "Risco muito alto",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Como ler a segurança do bairro antes de comprar um imóvel de leilão",
    description:
      "O que a taxa de mortes violentas por 100 mil habitantes diz e o que ela não diz, por que a média da cidade engana, e como comparar dois bairros da mesma cidade.",
    alternates: { canonical: `${SITE_URL}/guias/seguranca-do-bairro` },
  };
}

export default async function GuiaSeguranca() {
  const [bairros, totais, atualizadoEm] = await Promise.all([
    getBairrosDaCidade(CIDADE_EXEMPLO.nome, CIDADE_EXEMPLO.uf),
    getTotais(),
    getAtualizacao(),
  ]);

  const comSeguranca = totais?.comSeguranca ?? 0;
  const comBairro = totais?.comBairro ?? 0;
  const maior = bairros[0];
  const menor = bairros[bairros.length - 1];
  const vezes = maior && menor && menor.taxa > 0 ? maior.taxa / menor.taxa : null;

  return (
    <Guia
      titulo="Como ler a segurança do bairro antes de comprar um imóvel de leilão"
      linhaFina={`Preço barato em bairro ruim não é desconto, é risco embutido — e a média da cidade não responde essa pergunta. Hoje ${comSeguranca} dos imóveis do nosso estoque têm leitura de segurança, ${comBairro} deles no grão do próprio bairro.`}
      atualizadoEm={atualizadoEm}
    >
      <p>
        “Esse apartamento barato fica num bairro seguro?” é a primeira pergunta de quem olha um imóvel de leilão, e é a
        única que nenhum agregador responde. O caminho normal é o comprador abrir o portal da secretaria de segurança
        do estado e tentar cruzar na mão. Aqui a leitura vem junto da ficha.
      </p>

      <H2>O que é o número</H2>
      <p>
        A medida é <strong>mortes violentas por 100 mil habitantes por ano</strong>. Escolhemos essa e não “número de
        ocorrências” por dois motivos. Primeiro, contagem bruta só mede tamanho: o bairro mais populoso sempre lidera, o
        que não ajuda ninguém a decidir. Segundo, morte violenta é o registro mais confiável que existe no Brasil —
        furto e roubo dependem de a vítima registrar boletim, e a subnotificação varia justamente com a renda do bairro,
        o que inverteria a leitura.
      </p>
      <Destaque>
        A régua é nacional e é uma só: a distribuição dos 5.570 municípios brasileiros. Mediana em{" "}
        {FAIXAS_TAXA.mediana.toString().replace(".", ",")} mortes por 100 mil habitantes/ano, com{" "}
        {FAIXAS_TAXA.p20.toString().replace(".", ",")} no percentil 20 e{" "}
        {FAIXAS_TAXA.p80.toString().replace(".", ",")} no percentil 80. O selo colorido classifica sempre{" "}
        <em>o número que está do lado dele</em> — nunca outra coisa.
      </Destaque>

      <H2>Por que a média da cidade engana</H2>
      <p>
        Uma cidade inteira sai com um número só, e esse número não descreve nenhum bairro em particular. A tabela abaixo
        é {CIDADE_EXEMPLO.exibicao}, onde temos estoque e camada de bairro resolvida:
      </p>

      {bairros.length === 0 ? (
        <p className="text-zinc-500">
          Nenhum imóvel com leitura de bairro em {CIDADE_EXEMPLO.exibicao} no estoque de hoje.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-2 pr-3 font-medium">Bairro</th>
                  <th className="py-2 pr-3 text-right font-medium">Mortes/100 mil hab./ano</th>
                  <th className="py-2 pr-3 font-medium">Leitura</th>
                  <th className="py-2 pr-3 text-right font-medium">Imóveis</th>
                  <th className="py-2 text-right font-medium">Preço mediano</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {bairros.map((b) => (
                  <tr key={b.bairro} className="border-b border-zinc-900">
                    <td className="py-2 pr-3">{b.bairro}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{b.taxa.toFixed(1).replace(".", ",")}</td>
                    <td className="py-2 pr-3 text-zinc-400">
                      {b.percentil != null ? ROTULO[nivelDoPercentil(b.percentil)] : "—"}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums">{b.total}</td>
                    <td className="py-2 text-right tabular-nums">{formatBRL(b.precoMediano) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {vezes != null && vezes > 1.5 && (
            <Destaque>
              Entre o bairro mais violento e o mais calmo da lista, com estoque na mesma cidade, a taxa varia{" "}
              {vezes.toFixed(1).replace(".", ",")} vezes — {maior.bairro} em{" "}
              {maior.taxa.toFixed(1).replace(".", ",")} contra {menor.bairro} em{" "}
              {menor.taxa.toFixed(1).replace(".", ",")}. Uma média da cidade devolveria o mesmo número para os dois.
            </Destaque>
          )}

          <p>
            <Link
              href={cidadeUrl(CIDADE_EXEMPLO.uf, CIDADE_EXEMPLO.nome)}
              className="text-zinc-100 underline underline-offset-4 hover:text-white"
            >
              Ver os imóveis de {CIDADE_EXEMPLO.exibicao} com a leitura de cada bairro
            </Link>
          </p>
        </>
      )}

      <H2>O que o número não diz</H2>
      <p>
        A taxa de bairro é uma <strong>estimativa</strong>, e a página sempre a chama assim. Bairro pequeno tem
        denominador pequeno, e a divisão crua produz artefato: um bairro de 276 moradores com duas mortes daria 724 por
        100 mil, que não é uma taxa, é ruído. Por isso a estimativa é suavizada pelo porte da população — quanto menor o
        bairro, mais ela é puxada na direção da média da cidade, que é a leitura honesta quando a base é curta.
      </p>
      <p>
        E ela não mede assalto, furto de carro nem arrombamento. Mede letalidade, que é o indicador com registro
        confiável no país inteiro e que caminha junto com violência de rua, mas não é a mesma coisa. Para um imóvel que
        vai ser alugado, o número ajuda; para um galpão, importa menos que a rota de acesso.
      </p>

      <H2>Onde encontrar na ficha</H2>
      <p>
        Em cada imóvel, o bloco de segurança fica ao lado do preço e traz quatro coisas: a taxa, o selo que classifica
        essa taxa na régua nacional, a origem do dado com a janela fechada, e a taxa do município logo abaixo como
        contexto. Quando o bairro não foi resolvido, a página diz que o número é do município — nunca apresenta um dado
        de cidade como se fosse do bairro. Na lista de cada cidade dá para filtrar e ordenar por essa leitura.
      </p>

      <p className="pt-2">
        <Link
          href="/guias/como-funciona-leilao-caixa"
          className="text-zinc-100 underline underline-offset-4 hover:text-white"
        >
          As quatro modalidades de venda da Caixa
        </Link>{" "}
        <span className="text-zinc-500">·</span>{" "}
        <Link
          href="/guias/onde-estao-os-descontos"
          className="text-zinc-100 underline underline-offset-4 hover:text-white"
        >
          Onde estão os maiores descontos
        </Link>
      </p>
    </Guia>
  );
}
