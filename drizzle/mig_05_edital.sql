-- O6: rastreador de edital (requisito #7 do plano).
-- Aditivo: nao altera nem remove nada existente. Seguro de rodar mais de uma vez.
--
-- matricula/comarca JA EXISTIAM na tabela (0006_kind_purifiers.sql) mas
-- estavam 0/5.161 preenchidas: o scraper antigo (`src/pipeline/scrape-details.ts`)
-- procura o valor num `<td>`/`<th>` vizinho, e a pagina de detalhe atual da
-- Caixa usa `<span>Matricula(s): <strong>116303</strong></span>` — nao ha
-- tabela nenhuma. O novo coletor (`src/pipeline/scrape-edital.ts`) extrai por
-- regex sobre o HTML cru (mesmo padrao ja validado em /tmp/o6-edital/measure.py
-- contra 80 paginas de detalhe reais, zero bloqueio Radware) e passa a ser o
-- unico escritor dessas duas colunas.
BEGIN;

ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_numero          varchar(60);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_item            varchar(10);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS leiloeiro              varchar(150);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_publicado_em    timestamp;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_pdf_url         text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS leilao1_data           timestamp;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS leilao2_data           timestamp;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS licitacao_data         timestamp;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS proposta_prazo         timestamp;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS oficio                 varchar(10);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS inscricao_imobiliaria  varchar(40);
-- Bookkeeping do COLETOR (nao confundir com edital_publicado_em, que e a data
-- que a Caixa publicou o edital). NULL = nunca coletado; e o que faz o passo
-- ser incremental (ver scrape-edital.ts: WHERE edital_atualizado_em IS NULL
-- OR < now() - staleDays).
ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_atualizado_em   timestamp;
-- Ultimo erro do coletor para este imovel (bloqueio, parse vazio, timeout).
-- NAO apaga dado bom: um erro so grava aqui, nunca limpa os campos acima.
ALTER TABLE properties ADD COLUMN IF NOT EXISTS edital_erro            varchar(200);

COMMENT ON COLUMN properties.leilao1_data IS 'Data/hora do 1o leilao (SFI), UTC real (fonte e horario de Brasilia, UTC-3 fixo, convertido na coleta).';
COMMENT ON COLUMN properties.leilao2_data IS 'Data/hora do 2o leilao (SFI), mesma conversao.';
COMMENT ON COLUMN properties.licitacao_data IS 'Data/hora da Licitacao Aberta (modalidade licitacao), mesma conversao.';
COMMENT ON COLUMN properties.proposta_prazo IS 'Prazo da proposta (venda direta/online) — so existe em ~1/4 dos imoveis dessa modalidade (medido: 10/40).';
COMMENT ON COLUMN properties.edital_atualizado_em IS 'Quando o COLETOR rodou com sucesso para este imovel — nao e a data do edital.';

COMMIT;

-- CONCURRENTLY nao roda dentro de transacao — statement em separado.
-- E a coluna que toda consulta do coletor incremental usa no WHERE
-- (removed_at IS NULL AND (edital_atualizado_em IS NULL OR < cutoff)), numa
-- tabela com 8.800+ linhas: sem indice parcial isso e Seq Scan a cada run
-- diario do pipeline.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_properties_edital_atualizado
  ON properties (edital_atualizado_em)
  WHERE removed_at IS NULL;
