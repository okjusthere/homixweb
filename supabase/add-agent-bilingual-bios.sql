-- Add a dedicated Simplified Chinese advisor biography. English remains in
-- `bio` for compatibility with the existing portal and public API consumers.
-- Safe to run more than once.

ALTER TABLE public.agents
  ADD COLUMN IF NOT EXISTS bio_zh TEXT;

COMMENT ON COLUMN public.agents.bio_zh IS
  'Simplified Chinese public biography; English is stored in bio.';
