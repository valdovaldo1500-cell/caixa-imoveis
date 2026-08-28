/**
 * URLs públicas do agregador (O6).
 *
 * Padrão escolhido a partir do que os concorrentes já indexam
 * (ver revenue-plan/concorrente-leilao/SEO.md):
 *   Arremata.ai     /leilao/{cidade}-uf  +  /imovel/{uuid}
 *   Mapa do Leilão  /cidade/{cidade}-uf
 *   Leilão Ninja    /imoveis-leilao/{cidade}
 *
 * Nossa escolha:
 *   /leilao-imoveis/{uf}                      hub do estado
 *   /leilao-imoveis/{uf}/{cidade}             lista da cidade
 *   /imovel/{cidade}-{uf}-{tipo}-{caixaId}    ficha do imóvel
 *
 * O `caixaId` no fim garante URL única e estável mesmo quando duas cidades
 * repetem nome de bairro ou quando o imóvel muda de preço.
 */

export function slugify(txt: string): string {
  return txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ufSlug(uf: string): string {
  return uf.toLowerCase();
}

export function cidadeUrl(uf: string, cidade: string): string {
  return `/leilao-imoveis/${ufSlug(uf)}/${slugify(cidade)}`;
}

export function ufUrl(uf: string): string {
  return `/leilao-imoveis/${ufSlug(uf)}`;
}

export function imovelUrl(p: {
  uf: string;
  cidade: string;
  tipoImovel?: string | null;
  caixaId: string;
}): string {
  const partes = [slugify(p.cidade), ufSlug(p.uf)];
  if (p.tipoImovel) partes.push(slugify(p.tipoImovel));
  partes.push(p.caixaId);
  return `/imovel/${partes.join("-")}`;
}

/** O `caixaId` é sempre o último segmento — é por ele que a página busca. */
export function caixaIdDoSlug(slug: string): string | null {
  const m = slug.match(/([0-9]+)$/);
  return m ? m[1] : null;
}
