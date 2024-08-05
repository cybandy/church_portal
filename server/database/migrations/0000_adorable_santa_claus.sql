DO $$ BEGIN
 CREATE TYPE "public"."event_type" AS ENUM('church', 'sabbath_school_service');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('member', 'sabbath_school_leader', 'pastor', 'secretary', 'elder', 'deacon', 'chorister');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"datetime" timestamp with time zone,
	"member_id" integer,
	"event_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"datetime" timestamp with time zone,
	"event_type" "event_type",
	"location" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"username" varchar NOT NULL,
	"email" text NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"address" varchar,
	"avatar_url" varchar,
	"tel" varchar(20),
	"role" "role",
	"ss_group_id" integer,
	CONSTRAINT "members_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sabbath_school_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "sabbath_school_group_name_unique" UNIQUE("name")
);
