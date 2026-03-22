CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "comparables_tier1_count" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "comparables_tier2_count" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "search_vector" "tsvector";--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_favorites_property" ON "favorites" USING btree ("property_id");