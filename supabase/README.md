# Advisor profiles (Supabase) — setup

When Supabase is configured, advisor profiles are read from the `agents` table.
Advisors edit their own profile (photo, contact, bio, social) from the
**agents.homixny.com portal**, and admins manage the roster there too — there is
no password-gated page on the marketing site. Supabase is the only runtime
roster source; missing configuration fails closed with an empty directory.

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
   - Admins add/approve/deactivate accounts under **经纪人**. Creation and
     approval automatically create a minimal visible public profile.
   - Admins manage public ordering and force-hide/show under **/roster**.
   - Advisors can switch their own profile between `visible` and
     `agent_hidden`; only admins can apply or release `admin_hidden`.

## Notes

- The `service_role` key and `AGENTS_REVALIDATE_SECRET` are **server-only** — never
  exposed to the browser. Portal edits are forwarded to this site's
  `/api/agent-profile` (self-edit) and `/api/agent-admin` (roster admin) endpoints,
  which are gated by the shared secret.
- Headshots upload to the `agent-photos` bucket and are served from Supabase Storage.
- Existing shared databases must run the Portal repository's lifecycle Phase A
  migration before deployment and Phase B after both deployments are verified.
- Website inquiries are stored in `public.inquiries`; email delivery status is
  reflected in the `status`, `email_sent_at`, and `email_error` columns.
