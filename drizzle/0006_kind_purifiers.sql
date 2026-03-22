CREATE TABLE "zap_listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"zap_id" varchar(30),
	"business" varchar(10),
	"cidade" varchar(100),
	"bairro" varchar(100),
	"unit_type" varchar(30),
	"price" numeric(12, 2),
	"area" numeric(10, 2),
	"price_per_m2" numeric(10, 2),
	"bedrooms" integer,
	"parking_spaces" integer,
	"listing_url" text,
	"condo_fee" numeric(10, 2),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zap_market_value" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zap_market_value_per_m2" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zap_rent_value" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zap_comparables_count" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zap_updated_at" timestamp;--> statement-breakpoint
CREATE INDEX "idx_zap_cidade_bairro" ON "zap_listings" USING btree ("cidade","bairro");--> statement-breakpoint
CREATE INDEX "idx_zap_business" ON "zap_listings" USING btree ("business");