-- O6: camada de seguranca por municipio (score_nacional) + assinatura publica.
-- Aditivo: nao altera nem remove nada existente. Seguro de rodar mais de uma vez.
BEGIN;

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

COMMIT;
