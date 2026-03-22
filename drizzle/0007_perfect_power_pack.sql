CREATE TABLE "property_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"note" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "property_notes_property_id_unique" UNIQUE("property_id")
);
--> statement-breakpoint
ALTER TABLE "property_notes" ADD CONSTRAINT "property_notes_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_property_notes_prop" ON "property_notes" USING btree ("property_id");