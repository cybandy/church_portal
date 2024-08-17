ALTER TABLE
  "hymn"
ADD
  COLUMN "hymnSearch" "tsvector" GENERATED ALWAYS AS (
    to_tsvector(
      'english',
      COALESCE("hymn"."number", '') || ' ' || COALESCE("hymn"."title", '') || ' ' || COALESCE("hymn"."author", '')
    )
  ) STORED;

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_hymn_search" ON "hymn" USING gin ("hymnSearch");

CREATE FUNCTION update_hymn_search_vector() RETURNS trigger AS $$ BEGIN NEW.hymnSearch := to_tsvector(
  'english',
  COALESCE(NEW.number, '') || ' ' || COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.author, '')
);

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_hymn_search_vector_trigger BEFORE
INSERT
  OR
UPDATE
  ON "hymn" FOR EACH ROW EXECUTE FUNCTION update_hymn_search_vector();