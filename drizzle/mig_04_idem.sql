-- O6: idempotência do webhook de cobrança.
-- Sem isso, o provedor reenviando o mesmo evento (o que TODO provedor faz
-- quando não recebe 200 rápido) processaria o pagamento duas vezes.
-- Índice parcial: eventos sem id do provedor (os de teste/demo) não colidem.
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS uniq_cobrancas_evento
  ON cobrancas (provedor, provedor_evento_id)
  WHERE provedor_evento_id IS NOT NULL;
