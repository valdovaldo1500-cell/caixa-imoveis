CREATE TABLE "qa_listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"qa_id" varchar(30),
	"business" varchar(10),
	"cidade" varchar(100),
	"bairro" varchar(100),
	"unit_type" varchar(30),
	"price" numeric(12, 2),
	"area" numeric(10, 2),
	"price_per_m2" numeric(10, 2),
	"bedrooms" integer,
	"bathrooms" integer,
	"parking_spaces" integer,
	"listing_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "qa_market_value" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "qa_rent_value" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "qa_comparables_count" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "qa_updated_at" timestamp;--> statement-breakpoint
CREATE INDEX "idx_qa_cidade_bairro" ON "qa_listings" USING btree ("cidade","bairro");--> statement-breakpoint
CREATE INDEX "idx_qa_business" ON "qa_listings" USING btree ("business");