-- 0014 — baseline do O6.
--
-- POR QUE ESTE ARQUIVO EXISTE: tudo que o O6 acrescentou ao banco (camada de
-- segurança, assinatura, cobrança, índices, rastreador de edital, correção do
-- senha_hash) foi aplicado em produção por SQL manual — os arquivos
-- `mig_01..mig_06` ao lado deste. Eles nunca entraram no `_journal.json`,
-- então `drizzle-kit migrate` (que o `entrypoint.sh` roda a cada subida do
-- container) não os conhecia: um ambiente NOVO subia com o schema de 0013 e
-- sem NENHUMA tabela do O6. Este arquivo fecha esse buraco.
--
-- É o conteúdo daqueles seis arquivos MAIS `scripts/sql/mig_04_bairro.sql`
-- (a camada de bairro, de 31/08/2026 — esse ficou numa pasta diferente das
-- outras, que é exatamente por que passou batido), na ordem, com duas
-- transformações:
--
--   1. BEGIN/COMMIT removidos — o migrator do drizzle já envolve tudo na
--      transação dele, e um COMMIT aqui dentro fecharia a transação DELE no
--      meio, deixando a migração meio aplicada e registrada como completa.
--   2. CONCURRENTLY removido dos CREATE INDEX — o Postgres recusa
--      `CREATE INDEX CONCURRENTLY` dentro de transação. O CONCURRENTLY existia
--      em `mig_03_idx.sql` para não travar a tabela de produção durante a
--      criação à mão; aqui não faz falta: em produção os índices já existem
--      (o IF NOT EXISTS torna isto um no-op) e num banco novo a tabela está
--      vazia.
--
-- TODO comando aqui é idempotente de propósito (`IF NOT EXISTS`, e o
-- `ALTER COLUMN ... TYPE text` do senha_hash é no-op quando já é text): em
-- produção, onde os seis já foram aplicados à mão, esta migração precisa
-- rodar e não fazer nada. Testado nos dois cenários antes de subir — banco
-- vazio e cópia da produção.

-- ==================== mig_01_crime.sql ====================
-- O6: camada de seguranca por municipio (score_nacional) + assinatura publica.
-- Aditivo: nao altera nem remove nada existente. Seguro de rodar mais de uma vez.

-- 1. Camada de seguranca. Substitui o uso de crime_rate (escala do heatmap,
--    2.451..12.177 = todas as ocorrencias/100k) que so existia no RS.
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_nota          integer;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_taxa          numeric(12,4);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_grao          varchar(12);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_cobertura     varchar(12);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_fonte         varchar(40);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_janela_inicio date;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_janela_fim    date;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_suprimido     boolean;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS crime_atualizado_em timestamp;

COMMENT ON COLUMN properties.crime_nota IS
  'Nota de RISCO 0-1000 de app.score_nacional. MAIOR = MAIS VIOLENTO. Inverter para exibir seguranca.';
COMMENT ON COLUMN properties.crime_grao IS 'municipio | bairro | ponto — sempre exibir na tela.';
COMMENT ON COLUMN properties.crime_janela_inicio IS
  'Janela REAL da apuracao (vem de app.ancora_letal, nao da coluna janela_inicio do score_nacional, que e hardcode falso em 11 UFs).';

CREATE INDEX IF NOT EXISTS idx_properties_crime_nota ON properties (crime_nota);


-- ==================== mig_02_assinatura.sql ====================
-- O6: assinatura pública. Aditivo — nada existente é tocado.

CREATE TABLE IF NOT EXISTS assinantes (
  id                     serial PRIMARY KEY,
  email                  varchar(160) UNIQUE NOT NULL,
  senha_hash             varchar(128),
  nome                   varchar(120),
  telefone               varchar(20),
  plano                  varchar(20)  NOT NULL DEFAULT 'livre',
  status                 varchar(20)  NOT NULL DEFAULT 'ativa',
  provedor               varchar(20),
  provedor_assinatura_id varchar(80),
  valido_ate             timestamp,
  cancelado_em           timestamp,
  ultimo_acesso_em       timestamp,
  criado_em              timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_assinantes_plano  ON assinantes (plano);
CREATE INDEX IF NOT EXISTS idx_assinantes_status ON assinantes (status);

CREATE TABLE IF NOT EXISTS alertas (
  id              serial PRIMARY KEY,
  assinante_id    integer NOT NULL REFERENCES assinantes(id),
  nome            varchar(80),
  uf              varchar(2),
  cidade          varchar(100),
  preco_max       numeric(12,2),
  desconto_min    numeric(5,2),
  tipo_imovel     varchar(50),
  crime_nota_max  integer,
  ativo           boolean NOT NULL DEFAULT true,
  ultimo_envio_em timestamp,
  criado_em       timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_alertas_assinante ON alertas (assinante_id);

CREATE TABLE IF NOT EXISTS cobrancas (
  id                 serial PRIMARY KEY,
  assinante_id       integer REFERENCES assinantes(id),
  provedor           varchar(20) NOT NULL,
  provedor_evento_id varchar(80),
  tipo               varchar(40),
  valor              numeric(10,2),
  status             varchar(20),
  payload            jsonb,
  criado_em          timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_cobrancas_assinante ON cobrancas (assinante_id);

COMMENT ON TABLE assinantes IS 'Público pagante do agregador (O6). Separado de users, que é a equipe interna.';
COMMENT ON COLUMN alertas.crime_nota_max IS 'Teto de risco aceito — o filtro de segurança que nenhum concorrente tem.';


-- ==================== mig_03_idx.sql ====================
-- O6: índices para as páginas públicas de cidade e estado.
-- Sem eles, TODA consulta de cidade faz Seq Scan em properties: o filtro usa
-- upper(cidade) e o índice existente (idx_properties_cidade) é na coluna crua,
-- então o planner não consegue usá-lo. Medido em 28/08/2026: Seq Scan de 889
-- linhas, 11,3 ms. Com 175 cidades sendo rastreadas pelo Google, isso vira
-- carga desnecessária constante.
-- CONCURRENTLY: não pode rodar dentro de transação e não bloqueia escrita.
CREATE INDEX IF NOT EXISTS idx_properties_pub_cidade
  ON properties (uf, upper(cidade), desconto DESC NULLS LAST)
  WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_properties_pub_uf
  ON properties (uf, desconto DESC NULLS LAST)
  WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_properties_pub_caixa_id
  ON properties (caixa_id)
  WHERE removed_at IS NULL;

-- ==================== mig_04_idem.sql ====================
-- O6: idempotência do webhook de cobrança.
-- Sem isso, o provedor reenviando o mesmo evento (o que TODO provedor faz
-- quando não recebe 200 rápido) processaria o pagamento duas vezes.
-- Índice parcial: eventos sem id do provedor (os de teste/demo) não colidem.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_cobrancas_evento
  ON cobrancas (provedor, provedor_evento_id)
  WHERE provedor_evento_id IS NOT NULL;

-- ==================== mig_05_edital.sql ====================
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


-- CONCURRENTLY nao roda dentro de transacao — statement em separado.
-- E a coluna que toda consulta do coletor incremental usa no WHERE
-- (removed_at IS NULL AND (edital_atualizado_em IS NULL OR < cutoff)), numa
-- tabela com 8.800+ linhas: sem indice parcial isso e Seq Scan a cada run
-- diario do pipeline.
CREATE INDEX IF NOT EXISTS idx_properties_edital_atualizado
  ON properties (edital_atualizado_em)
  WHERE removed_at IS NULL;

-- ==================== mig_06_senha_hash.sql ====================
-- O6: cadastro de assinante estava QUEBRADO em produção (HTTP 500).
--
-- `hashSenha()` (src/lib/assinatura.ts) devolve `salt:hash` em hex — 32 + 1 +
-- 128 = 161 caracteres — mas a coluna foi criada como varchar(128). Todo
-- INSERT em `assinantes` morria com 22001 "value too long for type character
-- varying(128)". Ninguém nunca conseguiu criar conta; os zeros de assinante
-- não eram falta de público, era a porta trancada. Descoberto em 31/08/2026
-- ao testar o fluxo de pagamento ponta a ponta.
--
-- `text` em vez de um varchar maior: o tamanho do hash muda se os parâmetros
-- do scrypt mudarem, e no Postgres text e varchar têm o mesmo desempenho.

ALTER TABLE assinantes ALTER COLUMN senha_hash TYPE text;


-- ==================== scripts/sql/mig_04_bairro.sql ====================
-- O6 — camada de segurança no grão BAIRRO (31/08/2026).
--
-- Até aqui todo imóvel recebia a nota do MUNICÍPIO. 13 UFs têm grão bairro em
-- app.score_nacional (RS entre elas, 2.196 bairros); GO não tem, e continua
-- municipal. Esta migration abre espaço para as duas coisas conviverem na
-- mesma linha.
--
-- POR QUE crime_percentil EXISTE (não é enfeite): as réguas dos dois grãos são
-- DIFERENTES. Medido em 31/08/2026 sobre o Brasil, notas não suprimidas:
--   município (n=3.615): p20=400 p40=460 mediana=489 p60=520 p80=589
--   bairro    (n=10.748): p20=374 p40=435 mediana=454 p60=469 p80=497
-- Uma nota 497 é "médio" na régua municipal e "entre os 20% piores" na de
-- bairro. Filtrar ou ordenar por crime_nota cru misturando os dois grãos
-- compara coisas distintas. crime_percentil (0-100, dentro do próprio grão) é
-- a única coluna comparável — filtro e ordenação usam ELA.
--
-- crime_taxa continua sendo "mortes violentas por 100 mil habitantes/ano" e
-- SÓ existe no grão município (vem de app.ancora_letal.taxa_100k_hab). No grão
-- bairro ela fica NULL de propósito: taxa_letal de bairro tem outro
-- denominador (endereços) e rotulá-la "por 100 mil habitantes" seria falso.
-- Por isso as colunas crime_muni_* guardam sempre o contexto municipal, mesmo
-- quando a nota exibida é a do bairro.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS crime_percentil          smallint,
  ADD COLUMN IF NOT EXISTS crime_bairro             varchar(120),
  ADD COLUMN IF NOT EXISTS crime_bairro_origem      varchar(12),
  ADD COLUMN IF NOT EXISTS crime_marcado            boolean,
  ADD COLUMN IF NOT EXISTS crime_ocorrencias        integer,
  ADD COLUMN IF NOT EXISTS crime_muni_nota          integer,
  ADD COLUMN IF NOT EXISTS crime_muni_taxa          numeric(10,2),
  ADD COLUMN IF NOT EXISTS crime_muni_janela_inicio date,
  ADD COLUMN IF NOT EXISTS crime_muni_janela_fim    date,
  ADD COLUMN IF NOT EXISTS crime_muni_fonte         varchar(40);

COMMENT ON COLUMN properties.crime_percentil IS
  'Percentil nacional (0-100) da nota DENTRO do próprio grão. Única coluna comparável entre bairro e município — filtro e ordenação de risco usam esta, nunca crime_nota.';
COMMENT ON COLUMN properties.crime_bairro IS
  'Bairro efetivamente usado para a nota (pode diferir de properties.bairro, que traz o nome do loteamento escrito pela Caixa).';
COMMENT ON COLUMN properties.crime_bairro_origem IS
  'Como o bairro foi resolvido: "nome" (casamento textual) ou "coordenada" (ponto-em-polígono em app.ibge_bairro_geo).';
COMMENT ON COLUMN properties.crime_ocorrencias IS
  'Ocorrências registradas na janela, no grão exibido. Abaixo de 20 a tela avisa que a base é pequena.';
COMMENT ON COLUMN properties.crime_taxa IS
  'Mortes violentas por 100 mil habitantes/ano. SÓ no grão município — NULL no grão bairro, cujo denominador é endereços.';

-- Ordenação e filtro de risco na página da cidade.
CREATE INDEX IF NOT EXISTS idx_properties_pub_percentil
  ON properties (uf, upper(cidade), crime_percentil)
  WHERE removed_at IS NULL;

-- Correção de comentário: `mig_04_bairro.sql` foi escrito quando `crime_taxa`
-- só existia no grão município. Desde 31/08/2026 ela existe nos DOIS grãos —
-- no bairro é estimativa sobre a população do Censo 2022, suavizada por
-- credibilidade. Deixar o comentário antigo aqui propagaria a afirmação errada
-- para todo banco novo (ver o cabeçalho de `src/lib/seguranca.ts`).
COMMENT ON COLUMN properties.crime_taxa IS
  'Mortes violentas por 100 mil habitantes/ano, no grão exibido. No município vem direto do DATASUS/IBGE; no bairro é estimativa sobre a população do Censo 2022, suavizada por credibilidade (bairro pequeno é puxado para a média do município). NULL quando o bairro não tem população no Censo.';
