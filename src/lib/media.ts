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
 * The 1111 site-media objects were copied into the dedicated public
 * `site-media` bucket (scripts/split-storage-bucket.ts, verified 200), so
 * SITE_MEDIA_ROOT now points there. `agent-photos` is back to advisor
 * portraits only. The old `agent-photos/site-media/` copies are kept until
 * this deploy is verified, then cleaned up by hand.
 */
export const STORAGE_ROOT =
  "https://wnshsoxtxkfbphglyvmj.supabase.co/storage/v1/object/public";

export const SITE_MEDIA_ROOT = `${STORAGE_ROOT}/site-media`;
