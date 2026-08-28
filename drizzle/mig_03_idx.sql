-- O6: índices para as páginas públicas de cidade e estado.
-- Sem eles, TODA consulta de cidade faz Seq Scan em properties: o filtro usa
-- upper(cidade) e o índice existente (idx_properties_cidade) é na coluna crua,
-- então o planner não consegue usá-lo. Medido em 28/08/2026: Seq Scan de 889
-- linhas, 11,3 ms. Com 175 cidades sendo rastreadas pelo Google, isso vira
-- carga desnecessária constante.
-- CONCURRENTLY: não pode rodar dentro de transação e não bloqueia escrita.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_properties_pub_cidade
  ON properties (uf, upper(cidade), desconto DESC NULLS LAST)
  WHERE removed_at IS NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_properties_pub_uf
  ON properties (uf, desconto DESC NULLS LAST)
  WHERE removed_at IS NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_properties_pub_caixa_id
  ON properties (caixa_id)
  WHERE removed_at IS NULL;
