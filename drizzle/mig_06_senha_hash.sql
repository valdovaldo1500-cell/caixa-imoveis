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
BEGIN;

ALTER TABLE assinantes ALTER COLUMN senha_hash TYPE text;

COMMIT;
