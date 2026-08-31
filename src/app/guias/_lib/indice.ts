/**
 * Índice dos guias (O6). Fonte única: o hub `/guias` e o `sitemap.ts` leem
 * daqui, então um guia novo entra no sitemap sozinho — foi assim que as 175
 * páginas de cidade ficaram fora do Search Console em 31/08/2026, por a lista
 * viver em dois lugares.
 */

export type GuiaIndice = {
  slug: string;
  titulo: string;
  resumo: string;
};

export const GUIAS: GuiaIndice[] = [
  {
    slug: "como-funciona-leilao-caixa",
    titulo: "Como funciona o leilão da Caixa: as 4 modalidades",
    resumo:
      "Nem todo imóvel da Caixa é leilão. As quatro modalidades se comportam de formas opostas quanto a desconto, preço e financiamento — e a que se chama leilão é justamente a que menos desconta.",
  },
  {
    slug: "onde-estao-os-descontos",
    titulo: "Onde estão os maiores descontos",
    resumo:
      "As cidades com estoque relevante ordenadas pelo desconto mediano sobre a avaliação, e por que esse percentual não é desconto sobre o preço de mercado.",
  },
  {
    slug: "seguranca-do-bairro",
    titulo: "Como ler a segurança do bairro antes de comprar",
    resumo:
      "O que a taxa de mortes violentas por 100 mil habitantes diz e o que ela não diz, por que a média da cidade engana, e quanto dois bairros da mesma cidade chegam a diferir.",
  },
];
