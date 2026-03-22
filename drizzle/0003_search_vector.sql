ALTER TABLE properties ADD COLUMN IF NOT EXISTS search_vector tsvector;
--> statement-breakpoint
UPDATE properties SET search_vector =
  setweight(to_tsvector('portuguese', coalesce(cidade, '')), 'A') ||
  setweight(to_tsvector('portuguese', coalesce(bairro, '')), 'B') ||
  setweight(to_tsvector('portuguese', coalesce(endereco, '')), 'C') ||
  setweight(to_tsvector('portuguese', coalesce(descricao, '')), 'D');
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS idx_properties_search ON properties USING GIN(search_vector);
--> statement-breakpoint
CREATE OR REPLACE FUNCTION properties_search_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('portuguese', coalesce(NEW.cidade, '')), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(NEW.bairro, '')), 'B') ||
    setweight(to_tsvector('portuguese', coalesce(NEW.endereco, '')), 'C') ||
    setweight(to_tsvector('portuguese', coalesce(NEW.descricao, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
DROP TRIGGER IF EXISTS trg_properties_search ON properties;
--> statement-breakpoint
CREATE TRIGGER trg_properties_search
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION properties_search_update();
