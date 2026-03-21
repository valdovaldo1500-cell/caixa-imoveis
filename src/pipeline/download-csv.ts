const CSV_URL =
  "https://venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_RS.csv";

export async function downloadCSV(): Promise<string> {
  const res = await fetch(CSV_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to download CSV: ${res.status} ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();
  // CSV is Latin-1 encoded
  const decoder = new TextDecoder("latin1");
  return decoder.decode(buffer);
}
