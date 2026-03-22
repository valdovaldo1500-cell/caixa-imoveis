CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" varchar(128) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "property_notes" DROP CONSTRAINT "property_notes_property_id_unique";--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "username" varchar(50);--> statement-breakpoint
ALTER TABLE "hidden_properties" ADD COLUMN "username" varchar(50);--> statement-breakpoint
ALTER TABLE "property_notes" ADD COLUMN "username" varchar(50);--> statement-breakpoint
CREATE INDEX "idx_favorites_username" ON "favorites" USING btree ("username");--> statement-breakpoint
CREATE INDEX "idx_hidden_username" ON "hidden_properties" USING btree ("username");--> statement-breakpoint
CREATE INDEX "idx_property_notes_username" ON "property_notes" USING btree ("username");