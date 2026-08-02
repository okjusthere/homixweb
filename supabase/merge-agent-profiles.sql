-- Atomically move one Portal account from an auto-created duplicate profile
-- to the canonical public profile selected by an administrator.
--
-- Safe to re-run. Existing installations should execute this file once in the
-- Supabase SQL editor (or through the production Postgres connection).

CREATE OR REPLACE FUNCTION public.merge_agent_profiles(
  p_portal_agent_id INTEGER,
  p_keep_profile_id TEXT,
  p_delete_profile_id TEXT
)
RETURNS TABLE (
  kept_id TEXT,
  kept_slug TEXT,
  deleted_id TEXT,
  deleted_slug TEXT,
  portal_agent_id INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  keep_profile public.agents%ROWTYPE;
  delete_profile public.agents%ROWTYPE;
BEGIN
  IF p_portal_agent_id IS NULL OR p_portal_agent_id <= 0 THEN
    RAISE EXCEPTION 'A valid Portal agent id is required.';
  END IF;
  IF NULLIF(BTRIM(p_keep_profile_id), '') IS NULL
     OR NULLIF(BTRIM(p_delete_profile_id), '') IS NULL THEN
    RAISE EXCEPTION 'Both public profile ids are required.';
  END IF;
  IF p_keep_profile_id = p_delete_profile_id THEN
    RAISE EXCEPTION 'The retained and deleted profiles must be different.';
  END IF;

  -- Lock in a stable order so concurrent admin requests cannot cross-link the
  -- same two profiles or observe a partially changed relationship.
  PERFORM id
  FROM public.agents
  WHERE id IN (p_keep_profile_id, p_delete_profile_id)
  ORDER BY id
  FOR UPDATE;

  SELECT * INTO keep_profile
  FROM public.agents
  WHERE id = p_keep_profile_id;
  IF keep_profile.id IS NULL THEN
    RAISE EXCEPTION 'The profile selected to retain no longer exists.';
  END IF;

  SELECT * INTO delete_profile
  FROM public.agents
  WHERE id = p_delete_profile_id;
  IF delete_profile.id IS NULL THEN
    RAISE EXCEPTION 'The duplicate profile no longer exists.';
  END IF;

  IF keep_profile.portal_agent_id IS NOT NULL THEN
    RAISE EXCEPTION 'The profile selected to retain is already linked.';
  END IF;
  IF delete_profile.portal_agent_id IS DISTINCT FROM p_portal_agent_id THEN
    RAISE EXCEPTION 'The duplicate profile is not linked to this Portal account.';
  END IF;

  -- Release the unique partial index before assigning the same Portal account
  -- to the retained profile. The surrounding function call is one database
  -- transaction, so an error restores the original relationship.
  UPDATE public.agents AS agent
  SET portal_agent_id = NULL,
      updated_at = NOW()
  WHERE agent.id = delete_profile.id
    AND agent.portal_agent_id = p_portal_agent_id;

  UPDATE public.agents AS agent
  SET
    name = COALESCE(NULLIF(BTRIM(keep_profile.name), ''), delete_profile.name),
    title = COALESCE(NULLIF(BTRIM(keep_profile.title), ''), delete_profile.title),
    photo_url = CASE
      WHEN NULLIF(BTRIM(keep_profile.photo_url), '') IS NULL
        OR keep_profile.photo_url = '/agent-placeholder-logo.png'
      THEN delete_profile.photo_url
      ELSE keep_profile.photo_url
    END,
    phone = COALESCE(NULLIF(BTRIM(keep_profile.phone), ''), delete_profile.phone),
    email = COALESCE(NULLIF(BTRIM(keep_profile.email), ''), delete_profile.email),
    bio = COALESCE(NULLIF(BTRIM(keep_profile.bio), ''), delete_profile.bio),
    bio_zh = COALESCE(NULLIF(BTRIM(keep_profile.bio_zh), ''), delete_profile.bio_zh),
    specialties = CASE
      WHEN COALESCE(CARDINALITY(keep_profile.specialties), 0) > 0
      THEN keep_profile.specialties
      ELSE delete_profile.specialties
    END,
    languages = CASE
      WHEN COALESCE(CARDINALITY(keep_profile.languages), 0) > 0
      THEN keep_profile.languages
      ELSE delete_profile.languages
    END,
    social = CASE
      WHEN COALESCE(keep_profile.social, '{}'::jsonb) <> '{}'::jsonb
      THEN keep_profile.social
      ELSE delete_profile.social
    END,
    wechat_qr = COALESCE(NULLIF(BTRIM(keep_profile.wechat_qr), ''), delete_profile.wechat_qr),
    reviews = CASE
      WHEN COALESCE(keep_profile.reviews, '{}'::jsonb) <> '{}'::jsonb
      THEN keep_profile.reviews
      ELSE delete_profile.reviews
    END,
    stats = CASE
      WHEN COALESCE(keep_profile.stats, '{}'::jsonb) <> '{}'::jsonb
      THEN keep_profile.stats
      ELSE delete_profile.stats
    END,
    testimonials = CASE
      WHEN JSONB_TYPEOF(COALESCE(keep_profile.testimonials, '[]'::jsonb)) = 'array'
        AND JSONB_ARRAY_LENGTH(COALESCE(keep_profile.testimonials, '[]'::jsonb)) > 0
      THEN keep_profile.testimonials
      ELSE delete_profile.testimonials
    END,
    license_number = COALESCE(
      NULLIF(BTRIM(keep_profile.license_number), ''),
      delete_profile.license_number
    ),
    profile_url = COALESCE(NULLIF(BTRIM(keep_profile.profile_url), ''), delete_profile.profile_url),
    mls_id = COALESCE(NULLIF(BTRIM(keep_profile.mls_id), ''), delete_profile.mls_id),
    portal_agent_id = p_portal_agent_id,
    updated_at = NOW()
  WHERE agent.id = keep_profile.id;

  DELETE FROM public.agents AS agent
  WHERE agent.id = delete_profile.id;

  RETURN QUERY
  SELECT
    keep_profile.id,
    keep_profile.slug,
    delete_profile.id,
    delete_profile.slug,
    p_portal_agent_id;
END;
$$;

REVOKE ALL ON FUNCTION public.merge_agent_profiles(INTEGER, TEXT, TEXT)
  FROM PUBLIC, anon, authenticated;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE
      ON FUNCTION public.merge_agent_profiles(INTEGER, TEXT, TEXT)
      TO service_role;
  END IF;
END $$;
