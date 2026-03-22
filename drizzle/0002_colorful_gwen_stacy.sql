CREATE TABLE "itbi_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_estimativa" timestamp,
	"data_pagamento" timestamp,
	"base_calculo" numeric(12, 2),
	"perc_transmitido" numeric(5, 2),
	"finalidade_construcao" varchar(100),
	"logradouro" text,
	"n_endereco" varchar(20),
	"n_unidade" varchar(50),
	"complemento" text,
	"bairro" varchar(100),
	"cep" varchar(10),
	"area_total_terreno" numeric(10, 2),
	"area_constr_total" numeric(10, 2),
	"area_constr_privativa" numeric(10, 2),
	"ano_construcao" integer,
	"matricula" varchar(30),
	"zona_registro" varchar(10),
	"situacao" varchar(30),
	"year" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "market_value" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "market_value_per_m2" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "market_rent_value" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "comparables_count" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "market_value_updated_at" timestamp;--> statement-breakpoint
CREATE INDEX "idx_itbi_bairro" ON "itbi_transactions" USING btree ("bairro");--> statement-breakpoint
CREATE INDEX "idx_itbi_tipo" ON "itbi_transactions" USING btree ("finalidade_construcao");--> statement-breakpoint
CREATE INDEX "idx_itbi_data" ON "itbi_transactions" USING btree ("data_estimativa");--> statement-breakpoint
CREATE INDEX "idx_itbi_year" ON "itbi_transactions" USING btree ("year");