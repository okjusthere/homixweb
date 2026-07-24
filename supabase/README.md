# Advisor profiles (Supabase) — setup

When Supabase is configured, advisor profiles are read from the `agents` table.
Advisors edit their own profile (photo, contact, bio, social) from the
**agents.homixny.com portal**, and admins manage the roster there too — there is
no password-gated page on the marketing site. Until Supabase is configured, the
site uses the bundled static roster.

The same schema also creates `public.inquiries`, used by website inquiry forms.

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
   AGENTS_REVALIDATE_SECRET=<random>           # shared secret with the portal
   RESEND_API_KEY=re_...                        # inquiry email delivery
   INQUIRY_TO_EMAIL=homix@homixny.com
   INQUIRY_FROM_EMAIL="Homix Website <inquiries@homixny.com>"
   NEXT_PUBLIC_SITE_URL=https://www.homixny.com
   ```
   `AGENTS_REVALIDATE_SECRET` must be **identical** to the value set on the
   agents.homixny.com portal — it authorizes the portal's profile-edit,
   roster-admin, and cache-revalidate calls to this site.
5. **Deploy** (or restart `npm run dev`).
6. **Manage advisors from the portal** (agents.homixny.com):
   - Advisors self-edit their public profile under **我的档案 → 对外主页**.
   - Admins manage the whole roster at **/roster** — add advisors, publish/hide,
     reorder, delete, and edit anyone's profile (including advisors who don't have
     a portal account). Changes sync to www.homixny.com within a minute.

## Notes

- The `service_role` key and `AGENTS_REVALIDATE_SECRET` are **server-only** — never
  exposed to the browser. Portal edits are forwarded to this site's
  `/api/agent-profile` (self-edit) and `/api/agent-admin` (roster admin) endpoints,
  which are gated by the shared secret.
- Headshots upload to the `agent-photos` bucket and are served from Supabase Storage.
- Website inquiries are stored in `public.inquiries`; email delivery status is
  reflected in the `status`, `email_sent_at`, and `email_error` columns.
