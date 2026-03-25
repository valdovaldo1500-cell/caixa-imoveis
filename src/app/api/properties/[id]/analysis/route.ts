import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { spawnSync } from "child_process";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Check force param
  const force = request.nextUrl.searchParams.get("force") === "true";

  // Fetch property
  const [prop] = await db.select().from(properties).where(eq(properties.id, propertyId)).limit(1);
  if (!prop) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Check cache: if aiAnalysis exists and aiAnalysisAt >= updatedAt, return cached
  if (!force && prop.aiAnalysis && prop.aiAnalysisAt && prop.updatedAt && prop.aiAnalysisAt >= prop.updatedAt) {
    return NextResponse.json({ analysis: prop.aiAnalysis, cached: true });
  }

  // Build context for the prompt
  const preco = parseFloat(prop.preco || "0");
  const avaliacao = parseFloat(prop.valorAvaliacao || "0");
  const desconto = parseFloat(prop.desconto || "0");
  const zapMV = parseFloat(prop.zapMarketValue || "0");
  const itbiMV = parseFloat(prop.marketValue || "0");
  const qaMV = parseFloat(prop.qaMarketValue || "0");
  const zapRent = parseFloat(prop.zapRentValue || "0");
  const score = parseFloat(prop.score || "0");
  const crime = parseFloat(prop.crimeRate || "0");
  const area = parseFloat(prop.areaPrivativaM2 || "0") || parseFloat(prop.areaTotalM2 || "0") || 0;
  const yieldBruto = zapRent > 0 && preco > 0 ? (zapRent * 12 / preco) * 100 : 0;
  const bestMV = itbiMV || zapMV || qaMV || avaliacao;
  const descontoMercado = bestMV > 0 && preco > 0 ? ((1 - preco / bestMV) * 100) : 0;

  const prompt = `Você é um especialista em investimentos imobiliários no Brasil, focado em imóveis retomados (leilão/venda direta) da Caixa Econômica Federal no Rio Grande do Sul.

Analise este imóvel e dê sua recomendação de investimento em português brasileiro. Seja direto, prático e específico. Use no máximo 150 palavras.

DADOS DO IMÓVEL:
- Tipo: ${prop.tipoImovel || "N/D"}
- Cidade: ${prop.cidade}, Bairro: ${prop.bairro || "N/D"}
- Área: ${area > 0 ? area + "m²" : "N/D"}, Quartos: ${prop.quartos ?? "N/D"}
- Preço Caixa: R$${preco.toLocaleString("pt-BR")}
- Avaliação Caixa: R$${avaliacao.toLocaleString("pt-BR")}
- Desconto sobre avaliação: ${desconto.toFixed(0)}%
- Desconto vs mercado: ${descontoMercado.toFixed(0)}%
- Valor mercado ITBI: ${itbiMV > 0 ? "R$" + itbiMV.toLocaleString("pt-BR") : "N/D"}
- Valor mercado ZAP: ${zapMV > 0 ? "R$" + zapMV.toLocaleString("pt-BR") : "N/D"}
- Valor mercado 5ºAndar: ${qaMV > 0 ? "R$" + qaMV.toLocaleString("pt-BR") : "N/D"}
- Aluguel estimado: ${zapRent > 0 ? "R$" + zapRent.toLocaleString("pt-BR") + "/mês" : "N/D"}
- Yield bruto: ${yieldBruto > 0 ? yieldBruto.toFixed(1) + "%" : "N/D"}
- Score: ${score.toFixed(0)}/100
- Criminalidade: ${crime > 0 ? crime.toFixed(0) + "/100k hab" : "N/D"}
- Modalidade: ${prop.modalidadeVenda || "N/D"}
- Financiamento: ${prop.aceitaFinanciamento ? "Sim" : "Não"}
- Selic atual: 14,25%

Inclua:
1. Veredicto: COMPRAR / CONSIDERAR / EVITAR
2. Estratégia recomendada: aluguel ou flip (revenda)
3. Pontos fortes e riscos principais
4. Comparação com Selic (14,25%) — vale mais investir aqui ou no Tesouro?`;

  try {
    // Use spawnSync to avoid shell injection — prompt is passed as a direct argument
    const result = spawnSync("claude", ["-p", prompt], {
      timeout: 60000,
      encoding: "utf-8",
      maxBuffer: 1024 * 1024,
    });

    if (result.error) {
      throw result.error;
    }

    const output = (result.stdout || "").trim();

    if (output && output.length > 20) {
      // Cache in DB
      await db.update(properties).set({
        aiAnalysis: output,
        aiAnalysisAt: new Date(),
      }).where(eq(properties.id, propertyId));

      return NextResponse.json({ analysis: output, cached: false });
    }

    const stderr = (result.stderr || "").trim();
    return NextResponse.json(
      { error: "Claude CLI returned empty response", stderr, analysis: null },
      { status: 500 }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("AI analysis error:", msg);
    return NextResponse.json({ error: msg, analysis: null }, { status: 500 });
  }
}

// GET: return cached analysis
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  if (isNaN(propertyId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const [prop] = await db
    .select({ aiAnalysis: properties.aiAnalysis, aiAnalysisAt: properties.aiAnalysisAt })
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!prop) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ analysis: prop.aiAnalysis, generatedAt: prop.aiAnalysisAt });
}
