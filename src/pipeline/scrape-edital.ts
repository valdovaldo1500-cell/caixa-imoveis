import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { and, eq, isNull, lt, or, sql } from "drizzle-orm";
import { DetailFetchBlockedError, fetchDetailHtml, sleep } from "./caixa-detail-fetch";

/**
 * Rastreador de edital (O6, requisito #7 do plano).
 *
 * Extrai por REGEX sobre o HTML cru da página de detalhe — não por seletor
 * de tabela (`cheerio` + `td`/`th`), porque a página atual da Caixa não usa
 * tabela pra nada disso: é `<span>Rótulo: <strong>valor</strong></span>` ou
 * `<span>Rótulo:&nbsp;valor</span>`. Padrões validados em 31/08/2026 contra
 * 80 páginas de detalhe reais (20 leilão SFI, 20 licitação, 40 venda
 * direta/online), zero bloqueio Radware — ver /tmp/o6-edital/measure.py e
 * /tmp/o6-edital/detail_*.txt. `.` no lugar de acento (º, ã, í, ó) porque a
 * página é servida em latin1 e não vale a pena depender do byte exato bater
 * com o literal do arquivo-fonte (UTF-8) — mais robusto a variação de
 * encoding, no mesmo padrão do recon que validou a cobertura.
 */

const RE_EDITAL_NUMERO = /Edital:&nbsp;([^<]+)<\/span>/;
const RE_EDITAL_ITEM = /N.mero do item:\s*(\d+)/;
const RE_LEILOEIRO = /Leiloeiro\(a\):\s*([^<]+)<\/span>/;
const RE_LEILAO1 = /Data do 1. Leil.o\s*-\s*(\d{2})\/(\d{2})\/(\d{4})\s*-\s*(\d{2})h(\d{2})/;
const RE_LEILAO2 = /Data do 2. Leil.o\s*-\s*(\d{2})\/(\d{2})\/(\d{4})\s*-\s*(\d{2})h(\d{2})/;
const RE_LICITACAO = /Data da Licita..o Aberta\s*-\s*(\d{2})\/(\d{2})\/(\d{4})\s*-\s*(\d{2})h(\d{2})/;
const RE_EDITAL_PUBLICADO = /Edital publicado em:\s*(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/;
// (?!matricula) exclui o link "Baixar matrícula do imóvel", que também é um
// ExibeDoc('/editais/matricula/UF/xxx.pdf') — não é o edital.
const RE_EDITAL_PDF = /ExibeDoc\('(\/editais\/(?!matricula)[^']+\.PDF)'\)/i;
// strLista: ("1@@" + "31/08/2026 18:00:00" + "||" + ...) — prazo de proposta
// (venda direta/online). Só a PRIMEIRA string concatenada interessa.
const RE_PROPOSTA_PRAZO = /strLista:\s*\("1@@"\s*\+\s*"(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})"/;
const RE_MATRICULA = /Matr.cula\(s\):\s*<strong>([^<]+)<\/strong>/i;
const RE_COMARCA = /Comarca:\s*<strong>([^<]+)<\/strong>/i;
const RE_OFICIO = /Of.cio:\s*<strong>([^<]+)<\/strong>/i;
const RE_INSCRICAO = /Inscri..o imobili.ria:\s*<strong>([^<]+)<\/strong>/i;

const PDF_BASE_URL = "https://venda-imoveis.caixa.gov.br";

export interface EditalFields {
  editalNumero: string | null;
  editalItem: string | null;
  leiloeiro: string | null;
  editalPublicadoEm: Date | null;
  editalPdfUrl: string | null;
  leilao1Data: Date | null;
  leilao2Data: Date | null;
  licitacaoData: Date | null;
  propostaPrazo: Date | null;
  matricula: string | null;
  comarca: string | null;
  oficio: string | null;
  inscricaoImobiliaria: string | null;
}

/** Brasil não observa horário de verão desde 2019 — UTC-3 fixo em todo o país. */
function dataBrasilParaUtc(dia: string, mes: string, ano: string, hora: string, min: string, seg = "0"): Date {
  return new Date(
    Date.UTC(Number(ano), Number(mes) - 1, Number(dia), Number(hora) + 3, Number(min), Number(seg))
  );
}

function textoOuNull(v: string | undefined): string | null {
  const t = v?.trim();
  return t ? t : null;
}

/** Extração pura (sem I/O) — testável isoladamente contra os HTML de recon. */
export function extrairEdital(html: string): EditalFields {
  const mNumero = RE_EDITAL_NUMERO.exec(html);
  const mItem = RE_EDITAL_ITEM.exec(html);
  const mLeiloeiro = RE_LEILOEIRO.exec(html);
  const mLeilao1 = RE_LEILAO1.exec(html);
  const mLeilao2 = RE_LEILAO2.exec(html);
  const mLicitacao = RE_LICITACAO.exec(html);
  const mPublicado = RE_EDITAL_PUBLICADO.exec(html);
  const mPdf = RE_EDITAL_PDF.exec(html);
  const mProposta = RE_PROPOSTA_PRAZO.exec(html);
  const mMatricula = RE_MATRICULA.exec(html);
  const mComarca = RE_COMARCA.exec(html);
  const mOficio = RE_OFICIO.exec(html);
  const mInscricao = RE_INSCRICAO.exec(html);

  return {
    editalNumero: textoOuNull(mNumero?.[1]),
    editalItem: textoOuNull(mItem?.[1]),
    leiloeiro: textoOuNull(mLeiloeiro?.[1]),
    editalPublicadoEm: mPublicado
      ? dataBrasilParaUtc(mPublicado[1], mPublicado[2], mPublicado[3], mPublicado[4], mPublicado[5], mPublicado[6])
      : null,
    editalPdfUrl: mPdf ? `${PDF_BASE_URL}${mPdf[1]}` : null,
    leilao1Data: mLeilao1
      ? dataBrasilParaUtc(mLeilao1[1], mLeilao1[2], mLeilao1[3], mLeilao1[4], mLeilao1[5])
      : null,
    leilao2Data: mLeilao2
      ? dataBrasilParaUtc(mLeilao2[1], mLeilao2[2], mLeilao2[3], mLeilao2[4], mLeilao2[5])
      : null,
    licitacaoData: mLicitacao
      ? dataBrasilParaUtc(mLicitacao[1], mLicitacao[2], mLicitacao[3], mLicitacao[4], mLicitacao[5])
      : null,
    propostaPrazo: mProposta
      ? dataBrasilParaUtc(mProposta[1], mProposta[2], mProposta[3], mProposta[4], mProposta[5], mProposta[6])
      : null,
    matricula: textoOuNull(mMatricula?.[1]),
    comarca: textoOuNull(mComarca?.[1]),
    oficio: textoOuNull(mOficio?.[1]),
    inscricaoImobiliaria: textoOuNull(mInscricao?.[1]),
  };
}

export interface EditalBatchResult {
  processados: number;
  atualizados: number;
  semDadoNovo: number;
  erros: number;
  abortado: boolean;
  motivoAborto?: string;
  detalheErros: string[];
}

const LIMIAR_ERRO_MINIMO_TENTATIVAS = 5;
const LIMIAR_ERRO_TAXA = 0.3; // aborta se >30% das tentativas falharem
const ATRASO_ENTRE_REQUISICOES_MS = 2000;

/**
 * Roda o coletor incremental: pega até `limit` imóveis ATIVOS cujo edital
 * nunca foi coletado (edital_atualizado_em IS NULL) ou está velho (>
 * staleDays), busca a página de detalhe, extrai os campos e grava.
 *
 * Idempotente: cada UPDATE só inclui um campo se o valor extraído não for
 * null (COALESCE contra o valor atual) — uma tentativa que não achou nada
 * (ex.: venda direta sem edital) NUNCA apaga dado bom já gravado antes.
 * `edital_atualizado_em` avança sempre que a requisição teve sucesso (mesmo
 * sem achar campo nenhum — é o caso normal e esperado de venda direta/online
 * sem edital), então uma segunda chamada imediata não teria mais nada
 * elegível pra rebuscar: idempotente por construção.
 *
 * Interrompível: cada imóvel é lido, buscado e gravado antes de passar pro
 * próximo — não há estado de lote em memória que uma interrupção no meio
 * possa corromper.
 */
export async function coletarEditalBatch(
  limit = 200,
  staleDays = 21
): Promise<EditalBatchResult> {
  const cutoff = new Date(Date.now() - staleDays * 24 * 60 * 60 * 1000);

  const pendentes = await db
    .select({ id: properties.id, caixaId: properties.caixaId, linkCaixa: properties.linkCaixa })
    .from(properties)
    .where(
      and(
        isNull(properties.removedAt),
        or(isNull(properties.editalAtualizadoEm), lt(properties.editalAtualizadoEm, cutoff))
      )
    )
    .orderBy(sql`${properties.editalAtualizadoEm} asc nulls first`)
    .limit(limit);

  const result: EditalBatchResult = {
    processados: 0,
    atualizados: 0,
    semDadoNovo: 0,
    erros: 0,
    abortado: false,
    detalheErros: [],
  };

  for (let i = 0; i < pendentes.length; i++) {
    const prop = pendentes[i];
    if (i > 0) await sleep(ATRASO_ENTRE_REQUISICOES_MS);

    result.processados++;

    try {
      const html = fetchDetailHtml(prop);
      const campos = extrairEdital(html);

      const temCampoNovo = Object.values(campos).some((v) => v != null);

      // Só inclui no SET os campos não-nulos — nunca sobrescreve dado bom
      // com null (ex.: venda direta sem "Data do 1º Leilão" não deve apagar
      // um leilao1Data que porventura já existisse de uma coleta anterior
      // com modalidade diferente).
      const set: Record<string, unknown> = {
        editalAtualizadoEm: new Date(),
        editalErro: null,
        updatedAt: new Date(),
      };
      if (campos.editalNumero != null) set.editalNumero = campos.editalNumero;
      if (campos.editalItem != null) set.editalItem = campos.editalItem;
      if (campos.leiloeiro != null) set.leiloeiro = campos.leiloeiro;
      if (campos.editalPublicadoEm != null) set.editalPublicadoEm = campos.editalPublicadoEm;
      if (campos.editalPdfUrl != null) set.editalPdfUrl = campos.editalPdfUrl;
      if (campos.leilao1Data != null) set.leilao1Data = campos.leilao1Data;
      if (campos.leilao2Data != null) set.leilao2Data = campos.leilao2Data;
      if (campos.licitacaoData != null) set.licitacaoData = campos.licitacaoData;
      if (campos.propostaPrazo != null) set.propostaPrazo = campos.propostaPrazo;
      if (campos.matricula != null) set.matricula = campos.matricula;
      if (campos.comarca != null) set.comarca = campos.comarca;
      if (campos.oficio != null) set.oficio = campos.oficio;
      if (campos.inscricaoImobiliaria != null) set.inscricaoImobiliaria = campos.inscricaoImobiliaria;

      await db.update(properties).set(set).where(eq(properties.id, prop.id));

      if (temCampoNovo) {
        result.atualizados++;
      } else {
        result.semDadoNovo++;
      }
    } catch (err) {
      result.erros++;
      const msg = err instanceof Error ? err.message : String(err);
      result.detalheErros.push(`${prop.caixaId}: ${msg}`);

      // Erro NÃO apaga dado bom — só registra o motivo e avança
      // edital_atualizado_em (senão um imóvel permanentemente bloqueado
      // trava no topo da fila pra sempre e nunca deixa os outros passarem).
      // Bloqueio Radware é a única exceção: não marca como tentado, porque
      // se o site nos bloqueou o problema é da requisição, não do imóvel —
      // marcar aqui esconderia o imóvel da fila até o próximo staleDays.
      if (!(err instanceof DetailFetchBlockedError)) {
        await db
          .update(properties)
          .set({ editalAtualizadoEm: new Date(), editalErro: msg.slice(0, 200) })
          .where(eq(properties.id, prop.id));
      }

      const taxaErro = result.erros / result.processados;
      if (result.processados >= LIMIAR_ERRO_MINIMO_TENTATIVAS && taxaErro > LIMIAR_ERRO_TAXA) {
        result.abortado = true;
        result.motivoAborto = `Taxa de erro ${(taxaErro * 100).toFixed(0)}% (${result.erros}/${result.processados}) acima do limiar de ${LIMIAR_ERRO_TAXA * 100}% — abortando o restante do lote (${pendentes.length - result.processados} imóveis não tentados nesta rodada).`;
        break;
      }
    }
  }

  return result;
}
