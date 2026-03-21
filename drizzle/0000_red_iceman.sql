CREATE TABLE "pipeline_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"status" varchar(20),
	"properties_total" integer,
	"properties_new" integer,
	"properties_removed" integer,
	"price_changes" integer,
	"errors" text
);
--> statement-breakpoint
CREATE TABLE "price_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"preco" numeric(12, 2),
	"desconto" numeric(5, 2),
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"caixa_id" varchar(20) NOT NULL,
	"uf" varchar(2) DEFAULT 'RS' NOT NULL,
	"cidade" varchar(100) NOT NULL,
	"bairro" varchar(100),
	"endereco" text,
	"cep" varchar(10),
	"preco" numeric(12, 2),
	"valor_avaliacao" numeric(12, 2),
	"desconto" numeric(5, 2),
	"aceita_financiamento" boolean DEFAULT false,
	"descricao" text,
	"modalidade_venda" varchar(80),
	"link_caixa" text,
	"tipo_imovel" varchar(50),
	"quartos" integer,
	"vagas" integer,
	"banheiros" integer,
	"area_total_m2" numeric(10, 2),
	"area_privativa_m2" numeric(10, 2),
	"matricula" varchar(30),
	"comarca" varchar(50),
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"geocoded_at" timestamp,
	"score" numeric(5, 2),
	"score_details" jsonb,
	"first_seen_at" timestamp DEFAULT now() NOT NULL,
	"last_seen_at" timestamp DEFAULT now() NOT NULL,
	"removed_at" timestamp,
	"detail_scraped_at" timestamp,
	"foto_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "properties_caixa_id_unique" UNIQUE("caixa_id")
);
--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_price_history_prop" ON "price_history" USING btree ("property_id","recorded_at");--> statement-breakpoint
CREATE INDEX "idx_properties_cidade" ON "properties" USING btree ("cidade");--> statement-breakpoint
CREATE INDEX "idx_properties_score" ON "properties" USING btree ("score");--> statement-breakpoint
CREATE INDEX "idx_properties_preco" ON "properties" USING btree ("preco");--> statement-breakpoint
CREATE INDEX "idx_properties_desconto" ON "properties" USING btree ("desconto");--> statement-breakpoint
CREATE INDEX "idx_properties_removed" ON "properties" USING btree ("removed_at");--> statement-breakpoint
CREATE INDEX "idx_properties_latlng" ON "properties" USING btree ("lat","lng");