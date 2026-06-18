# Agent self-edit (Supabase) — setup

When Supabase is configured, advisor profiles are read from the `agents` table and
each advisor can edit their own profile (photo, contact, bio, social) via a private
`/edit/<token>` link. Until it's configured, the site uses the bundled static roster.

## One-time setup

1. **Create a Supabase project** at supabase.com (free tier is fine).
2. **Run the schema:** open the project's **SQL Editor**, paste `supabase/schema.sql`,
   and run it. This creates the `agents` table (+ RLS) and the public `agent-photos`
   storage bucket.
3. **Get your keys:** Project Settings → API. Copy the **Project URL** and the
   **`service_role`** key (secret — server only).
4. **Set environment variables** (in `.env.local` for local dev, and in Vercel →
   Project → Settings → Environment Variables for production):
   ```
   SUPABASE_URL=https://YOUR-REF.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...            # service_role key
   ADMIN_SECRET=pick-a-long-random-string      # guards the admin endpoints
   NEXT_PUBLIC_SITE_URL=https://www.homixny.com # so edit links use your domain
   ```
5. **Deploy** (or restart `npm run dev`).
6. **Seed the roster + get edit links:** open
   `https://YOUR-DOMAIN/api/admin/migrate-agents?secret=YOUR_ADMIN_SECRET`
   It copies the 50 current advisors into Supabase, generates a stable secret token
   for each, and returns every advisor's `editUrl`. (Safe to re-run — it never
   overwrites an advisor's own edits.)
7. **Distribute** each advisor their private `editUrl`. They open it, update their
   photo/details, and save — their public profile updates within a minute.

Re-list all links anytime: `https://YOUR-DOMAIN/api/admin/edit-links?secret=YOUR_ADMIN_SECRET`

## Notes

- The `service_role` key and `ADMIN_SECRET` are **server-only** — never exposed to the
  browser. All writes go through a server action gated by the advisor's edit token.
- Edit links are bearer secrets — distribute them privately. To revoke/rotate, change
  a row's `edit_token` in Supabase (the old link stops working).
- Headshots upload to the `agent-photos` bucket and are served from Supabase Storage.
