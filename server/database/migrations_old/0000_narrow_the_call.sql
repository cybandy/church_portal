DO $$ BEGIN
 CREATE TYPE "public"."event_type" AS ENUM('church', 'sabbath_school_service');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."hymnLanguagesEnum" AS ENUM('twi', 'en-US', 'fr-FR', 'it-IT', 'de-DE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('member', 'sabbath_school_leader', 'pastor', 'secretary', 'elder', 'deacon', 'chorister', 'communication_department', 'admin');
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
CREATE TABLE IF NOT EXISTS "event_officials" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"title" varchar,
	"rank" integer,
	"member_id" integer,
	"event_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"date" date,
	"from" time with time zone,
	"to" time with time zone,
	"event_type" "event_type",
	"location" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hymn" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"number" varchar(10),
	"language" "hymnLanguagesEnum",
	"author" varchar,
	"mp3" varchar,
	"title" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"password_hash" varchar,
	"email" text NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"address" varchar,
	"avatar_url" varchar,
	"tel" varchar(20),
	"roles" role[],
	"ss_group_id" integer,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sabbath_school_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "sabbath_school_group_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stanza" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer,
	"verse" varchar,
	"hymn_id" integer,
	"is_refrain" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_officials" ADD CONSTRAINT "event_officials_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
