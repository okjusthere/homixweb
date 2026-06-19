# Agent self-edit (Supabase) — setup

When Supabase is configured, advisor profiles are read from the `agents` table and
each advisor can edit their own profile (photo, contact, bio, social) via a private
`/edit/<token>` link. Until it's configured, the site uses the bundled static roster.

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
   ADMIN_PASSWORD=pick-a-password               # /admin login
   RESEND_API_KEY=re_...                        # inquiry email delivery
   INQUIRY_TO_EMAIL=homix@homixny.com
   INQUIRY_FROM_EMAIL="Homix Website <inquiries@homixny.com>"
   NEXT_PUBLIC_SITE_URL=https://www.homixny.com # so edit links use your domain
   ```
5. **Deploy** (or restart `npm run dev`).
6. **Manage advisors at `/admin`:** sign in with `ADMIN_PASSWORD`. Add advisors
   (each gets a private `/edit/<token>` link you can copy), hide/show, or remove them.
7. **Distribute** each advisor their private edit link from the dashboard. They open
   it, update their photo/details, and save — their public profile updates within a minute.

> The initial roster was seeded once via a one-time migration endpoint that has since
> been removed. Ongoing management happens entirely through `/admin`.

## Notes

- The `service_role` key and `ADMIN_PASSWORD` are **server-only** — never exposed to the
  browser. All writes go through a server action gated by the advisor's edit token.
- Edit links are bearer secrets — distribute them privately. To revoke/rotate, change
  a row's `edit_token` in Supabase (the old link stops working).
- Headshots upload to the `agent-photos` bucket and are served from Supabase Storage.
- Website inquiries are stored in `public.inquiries`; email delivery status is
  reflected in the `status`, `email_sent_at`, and `email_error` columns.
