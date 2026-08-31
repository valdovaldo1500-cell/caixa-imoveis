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
