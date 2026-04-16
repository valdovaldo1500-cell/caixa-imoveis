DROP INDEX "idx_itbi_bairro";--> statement-breakpoint
DROP INDEX "idx_qa_cidade_bairro";--> statement-breakpoint
DROP INDEX "idx_zap_cidade_bairro";--> statement-breakpoint
ALTER TABLE "itbi_transactions" ADD COLUMN "cidade" varchar(100) DEFAULT 'PORTO ALEGRE';--> statement-breakpoint
ALTER TABLE "qa_listings" ADD COLUMN "uf" varchar(2) DEFAULT 'RS';--> statement-breakpoint
ALTER TABLE "zap_listings" ADD COLUMN "uf" varchar(2) DEFAULT 'RS';--> statement-breakpoint
CREATE INDEX "idx_itbi_cidade_bairro" ON "itbi_transactions" USING btree ("cidade","bairro");--> statement-breakpoint
CREATE INDEX "idx_qa_uf_cidade_bairro" ON "qa_listings" USING btree ("uf","cidade","bairro");--> statement-breakpoint
CREATE INDEX "idx_zap_uf_cidade_bairro" ON "zap_listings" USING btree ("uf","cidade","bairro");