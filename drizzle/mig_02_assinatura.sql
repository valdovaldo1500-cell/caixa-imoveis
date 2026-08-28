-- O6: assinatura pública. Aditivo — nada existente é tocado.
BEGIN;

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

COMMIT;
