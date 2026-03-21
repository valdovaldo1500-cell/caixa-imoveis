export interface RawProperty {
  caixaId: string;
  uf: string;
  cidade: string;
  bairro: string;
  endereco: string;
  descricao: string;
  preco: number | null;
  valorAvaliacao: number | null;
  desconto: number | null;
  modalidadeVenda: string;
  linkCaixa: string;
  aceitaFinanciamento: boolean;
}

function parseDecimal(value: string): number | null {
  if (!value || value.trim() === "" || value.trim() === "-") return null;
  // Brazilian format: 1.234,56 → 1234.56
  const cleaned = value.trim().replace(/\./g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function parseCSV(csvText: string): RawProperty[] {
  const lines = csvText.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  // Find the header line (skip metadata rows)
  let headerIdx = 0;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const lower = lines[i].toLowerCase();
    if (
      lower.includes("imóvel") ||
      lower.includes("imovel") ||
      lower.includes("cidade") ||
      lower.includes("endereço")
    ) {
      headerIdx = i;
      break;
    }
  }

  const headers = lines[headerIdx]
    .split(";")
    .map((h) => h.trim().replace(/"/g, ""));

  // Map header names to indices (flexible matching)
  const findCol = (keywords: string[]): number =>
    headers.findIndex((h) => {
      const lower = h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return keywords.some((k) => lower.includes(k));
    });

  const colId = findCol(["n do imovel", "numero do imovel", "imovel"]);
  const colUF = findCol(["uf", "estado"]);
  const colCidade = findCol(["cidade", "municipio"]);
  const colBairro = findCol(["bairro"]);
  const colEndereco = findCol(["endereco", "endere"]);
  const colDescricao = findCol(["descricao", "descri"]);
  const colPreco = findCol(["preco de venda", "valor de venda", "preco"]);
  const colAvaliacao = findCol(["avaliacao", "valor de avalia"]);
  const colDesconto = findCol(["desconto"]);
  const colModalidade = findCol(["modalidade"]);
  const colLink = findCol(["link", "acesso"]);
  const colFinanciamento = findCol(["financ", "fgts"]);

  const results: RawProperty[] = [];

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cols = lines[i].split(";").map((c) => c.trim().replace(/"/g, ""));
    if (cols.length < 3) continue;

    const caixaId = colId >= 0 ? cols[colId]?.trim() : "";
    if (!caixaId || caixaId.length < 5) continue;

    const cidade = colCidade >= 0 ? cols[colCidade]?.trim() : "";
    if (!cidade) continue;

    results.push({
      caixaId,
      uf: colUF >= 0 ? cols[colUF]?.trim() || "RS" : "RS",
      cidade,
      bairro: colBairro >= 0 ? cols[colBairro]?.trim() || "" : "",
      endereco: colEndereco >= 0 ? cols[colEndereco]?.trim() || "" : "",
      descricao: colDescricao >= 0 ? cols[colDescricao]?.trim() || "" : "",
      preco: colPreco >= 0 ? parseDecimal(cols[colPreco]) : null,
      valorAvaliacao: colAvaliacao >= 0 ? parseDecimal(cols[colAvaliacao]) : null,
      desconto: colDesconto >= 0 ? parseDecimal(cols[colDesconto]) : null,
      modalidadeVenda:
        colModalidade >= 0 ? cols[colModalidade]?.trim() || "" : "",
      linkCaixa: colLink >= 0 ? cols[colLink]?.trim() || "" : "",
      aceitaFinanciamento:
        colFinanciamento >= 0
          ? /sim|s|yes|1/i.test(cols[colFinanciamento] || "")
          : false,
    });
  }

  return results;
}
