CREATE TABLE "hidden_properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "hidden_properties" ADD CONSTRAINT "hidden_properties_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_hidden_property" ON "hidden_properties" USING btree ("property_id");