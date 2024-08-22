DO $$ BEGIN
 CREATE TYPE "public"."event_type" AS ENUM('church', 'sabbath_school_service');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."hymnLanguagesEnum" AS ENUM('twi', 'eng', 'french', 'italian');
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
	"datetime" timestamp with time zone NOT NULL,
	"member_id" integer NOT NULL,
	"event_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blackListedTokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"jti" varchar NOT NULL,
	"expiration" timestamp NOT NULL,
	CONSTRAINT "blackListedTokens_jti_unique" UNIQUE("jti")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_officials" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"title" varchar NOT NULL,
	"rank" integer NOT NULL,
	"member_id" integer NOT NULL,
	"event_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"date" date NOT NULL,
	"from" time with time zone NOT NULL,
	"to" time with time zone NOT NULL,
	"event_type" "event_type",
	"location" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hymn" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"number" varchar(10) NOT NULL,
	"language" "hymnLanguagesEnum" DEFAULT 'eng' NOT NULL,
	"author" varchar,
	"type" varchar(10) DEFAULT 'num' NOT NULL,
	"mp3" varchar,
	"title" varchar NOT NULL,
	"hymnSearch" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', COALESCE("hymn"."number", '') || ' ' || COALESCE("hymn"."title", '') || ' ' || COALESCE("hymn"."author", ''))) STORED
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
	"number" integer NOT NULL,
	"verse" varchar NOT NULL,
	"hymn_id" integer NOT NULL,
	"is_refrain" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_officials" ADD CONSTRAINT "event_officials_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_hymn_search" ON "hymn" USING gin ("hymnSearch");