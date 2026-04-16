import { execFileSync } from "child_process";
import { readFileSync, existsSync } from "fs";

export async function downloadCSV(uf: string = "RS"): Promise<string> {
  const ufUpper = uf.toUpperCase();
  const ufLower = uf.toLowerCase();
  const CSV_URL = `https://venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_${ufUpper}.csv`;
  const tmpPath = `/tmp/caixa_imoveis_${ufLower}.csv`;

  // Try local cache first (for development / when Caixa blocks the IP)
  // Supports both per-UF env var (CSV_LOCAL_PATH_GO) and legacy CSV_LOCAL_PATH (RS default)
  const localCache =
    process.env[`CSV_LOCAL_PATH_${ufUpper}`] ||
    (ufUpper === "RS" ? process.env.CSV_LOCAL_PATH : undefined);
  if (localCache && existsSync(localCache)) {
    return readFileSync(localCache).toString("latin1");
  }

  // Use curl with browser-like headers to bypass Radware Bot Manager
  execFileSync("curl", [
    "-s",
    "-o", tmpPath,
    "-L",
    "--max-time", "60",
    "-H", "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "-H", "Accept: text/csv,text/plain,*/*",
    "-H", "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8",
    "-H", "Referer: https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp",
    CSV_URL,
  ], { timeout: 90000 });

  if (!existsSync(tmpPath)) {
    throw new Error(`Failed to download CSV for ${ufUpper}: file not found after curl`);
  }

  const buffer = readFileSync(tmpPath);

  const preview = buffer.toString("latin1").substring(0, 200);
  if (preview.includes("<head>") || preview.includes("CAPTCHA")) {
    throw new Error(
      `Download blocked by Radware Bot Manager for ${ufUpper}. CSV not available from this IP.`
    );
  }

  return buffer.toString("latin1");
}
