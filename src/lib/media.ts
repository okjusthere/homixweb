/**
 * Roots for public media served from Supabase Storage. Kept in one place so
 * moving assets between buckets is a one-line change (URLs are otherwise
 * hardcoded across content files).
 *
 * Bucket layout (after the storage split):
 * - `agent-photos`  — advisor portraits only (`agents/{slug}/…`), uploaded
 *   from the profile edit flow.
 * - `site-media`    — editorial/site imagery (journal, guides, neighborhoods,
 *   communities, training, page heroes). Managed by hand in the dashboard.
 *
 * SITE_MEDIA_ROOT still points at the legacy `agent-photos/site-media/`
 * prefix until the objects are copied to the dedicated bucket; flip the
 * constant at cutover.
 */
export const STORAGE_ROOT =
  "https://wnshsoxtxkfbphglyvmj.supabase.co/storage/v1/object/public";

export const SITE_MEDIA_ROOT = `${STORAGE_ROOT}/agent-photos/site-media`;
