# Homix Website Operations

This runbook covers deployment, form operations, Supabase setup, and launch QA
for the Homix brand website.

## Production Environment Variables

Set these in Vercel for Production, Preview, and Development as appropriate.

Required for public launch:

- `NEXT_PUBLIC_SITE_URL`: canonical origin, for example `https://www.homixny.com`.
- `SUPABASE_URL`: Supabase Project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only Supabase service-role key.
- `ADMIN_SECRET`: long random secret for `/api/admin/*` utility endpoints.
- `ADMIN_PASSWORD`: password used by `/admin`.
- `RESEND_API_KEY`: Resend API key for inquiry email delivery.
- `INQUIRY_TO_EMAIL`: `homix@homixny.com`.
- `INQUIRY_FROM_EMAIL`: verified sender, for example `Homix Website <inquiries@homixny.com>`.

Optional:

- `INQUIRY_BCC_EMAIL`: comma-separated internal BCC recipients.
- `LISTINGS_PROVIDER`: `mock` or `onekey`; leave specialist-owned if MLS work is paused.
- `ONEKEY_API_BASE`, `ONEKEY_TOKEN`, `ONEKEY_OFFICE_ID`: MLS/IDX feed credentials.
- `CRON_SECRET`, `DEPLOY_HOOK_URL`: optional listing refresh automation.

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET`, `ADMIN_PASSWORD`,
`RESEND_API_KEY`, or `ONEKEY_TOKEN` with a `NEXT_PUBLIC_` prefix.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run the full contents of `supabase/schema.sql`.
4. Confirm the following exist:
   - `public.agents`
   - `public.inquiries`
   - public storage bucket `agent-photos`
5. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel.

The `inquiries` table has RLS enabled and no public insert policy. Public forms
submit to the Next.js server, and the server writes through the service-role key.

## Inquiry Flow

The public forms are intentionally simple. A submission should:

1. appear in `public.inquiries`;
2. send an email to `homix@homixny.com`;
3. set `status` to `emailed` when email succeeds.

If email is not configured, `status` becomes `stored_email_not_configured`. If
email fails after storage, `status` becomes `stored_email_failed` and
`email_error` contains the provider response.

Operational check after deploy:

1. Submit a test inquiry from `/contact`.
2. Confirm it appears in Supabase.
3. Confirm `homix@homixny.com` receives the email.
4. Reply from the email thread to verify `reply_to` points to the visitor.

## Resend Setup

1. Verify the sending domain in Resend, preferably `homixny.com`.
2. Create an API key with email-send permission.
3. Set `RESEND_API_KEY` in Vercel.
4. Set `INQUIRY_FROM_EMAIL` to a verified sender on that domain.

Avoid using a temporary sender for production; it can reduce deliverability or
fail when sending outside test recipients.

## Admin And Advisor Profiles

`/admin` requires `ADMIN_PASSWORD`.

Admin utility endpoints require `ADMIN_SECRET`:

- `/api/admin/migrate-agents?secret=...`
- `/api/admin/edit-links?secret=...`

Recommended launch sequence:

1. Set Supabase env vars, `ADMIN_SECRET`, and `ADMIN_PASSWORD`.
2. Deploy.
3. Visit `/api/admin/migrate-agents?secret=YOUR_SECRET` once to seed advisors.
4. Store private edit links securely.
5. Send each advisor their own `/edit/<token>` link.

Advisor missing photos, bios, phone numbers, emails, and license numbers are
expected to be completed through Supabase self-editing.

## Legal And Compliance

Before public launch, confirm with broker/counsel:

- Broker license disclosure: `NYS Real Estate Broker License #10991241632`.
- Broker of record: `Si Zhang`.
- Footer includes Equal Housing Opportunity language on every page.
- `/fair-housing` is published.
- `/standard-operating-procedures` is published and linked in the footer.
- Privacy Policy and Terms of Use reflect actual business operations.
- OneKey/MLS IDX attribution and display rules are reviewed by the MLS specialist.

New York Department of State guidance requires broker standardized operating
procedures to be publicly available on maintained websites and apps. Keep dated
archives of SOP amendments and update the website within the required period
after changes.

## Deployment Checklist

Before production deploy:

```bash
npm run lint
npm run build
```

Then verify:

- homepage desktop and mobile first viewport;
- `/join` stats band uses warm Homix colors, not green;
- `/contact` test inquiry stores and emails;
- `/privacy`, `/terms`, `/fair-housing`, `/standard-operating-procedures`;
- footer license, Equal Housing language, and legal links;
- no obvious red/green/purple palette drift outside brand tokens;
- `NEXT_PUBLIC_SITE_URL` points at the production domain.

## Visual Direction

Homix should read as warm, editorial, and high-end:

- primary background: bone paper / warm beige;
- surface: soft ivory;
- text: warm ink;
- accent: restrained bronze;
- secondary dark surfaces: ink only when a strong conversion section needs it.

Avoid bright red, bright green, purple/blue gradients, glassmorphism, generic
stock real estate patterns, or heavy shadows. If a new section needs contrast,
prefer `bg-surface`, `bg-paper`, `border-line`, `text-ink`, and small bronze
accents.

## Listings Notes

MLS/listing image hardening is intentionally deferred. Do not refactor the
listing provider, image proxying, or MLS media handling as part of brand/content
work. When the MLS specialist resumes:

- validate OneKey/MLS Grid display rules;
- solve signed media URL durability;
- confirm attribution and noindex behavior;
- verify image loading in production, not only local dev.
