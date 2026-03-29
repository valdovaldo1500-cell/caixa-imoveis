CREATE TABLE "flippa_favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" varchar(20) NOT NULL,
	"username" varchar(50),
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "flippa_hidden" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" varchar(20) NOT NULL,
	"username" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "ai_analysis" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "ai_analysis_at" timestamp;--> statement-breakpoint
ALTER TABLE "zap_listings" ADD COLUMN IF NOT EXISTS "source" varchar(20) DEFAULT 'zap';