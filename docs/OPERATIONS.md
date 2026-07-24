# Homix Website Operations

This runbook covers deployment, form operations, Supabase setup, and launch QA
for the Homix brand website.

## Production Environment Variables

Set these in Vercel for Production, Preview, and Development as appropriate.

Required for public launch:

- `NEXT_PUBLIC_SITE_URL`: canonical origin, for example `https://www.homixny.com`.
- `BBO_API_URL`: BBO backend origin, currently `https://onekey.kevv.ai`.
- `BBO_API_KEY`: server-only read key for BBO listings. Use a DB-backed key with `["listings:read","sync:read"]` scopes.
- `BBO_HOMIX_LIST_OFFICE_MLS_ID`: `KEYHRMI01`.
- `BBO_HOMIX_LIST_OFFICE_KEY`: `KEY421354028`.
- `SUPABASE_URL`: Supabase Project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only Supabase service-role key.
- `AGENTS_REVALIDATE_SECRET`: shared secret with the agents.homixny.com portal; authorizes the portal's advisor-profile, roster-admin, and cache-revalidate calls. Must match the portal's value.
- `RESEND_API_KEY`: Resend API key for inquiry email delivery.
- `INQUIRY_TO_EMAIL`: `homix@homixny.com`.
- `INQUIRY_FROM_EMAIL`: verified sender, for example `Homix Website <inquiries@homixny.com>`.

Optional:

- `INQUIRY_BCC_EMAIL`: comma-separated internal BCC recipients.
- `BBO_REVALIDATE_SECONDS`: server-side listing fetch revalidation window; default `300`.

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `AGENTS_REVALIDATE_SECRET`,
`RESEND_API_KEY`, or `BBO_API_KEY` with a `NEXT_PUBLIC_` prefix.

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

## Media Storage

The website uses Supabase Storage for long-lived brand and content assets:

- `agent-photos/agents/...`: advisor headshots. The production source of truth is
  `public.agents.photo_url`; profiles without a headshot use
  `/agent-placeholder-logo.png`.
- `agent-photos/site-media/...`: new development media, gated community media,
  guide article covers, neighborhood images, onboarding materials, training images,
  and other long-lived editorial assets.

Git should keep only logo, fallback, favicon/icon, and small static UI assets in
`public/`. Do not add large advisor, building, community, training, guide article, or
neighborhood media back into Git.

To re-run or extend the media migration from a trusted local machine:

```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-media-to-supabase.mjs --dry-run
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-media-to-supabase.mjs
```

The script uploads to the existing public `agent-photos` bucket, updates agent
`photo_url` rows by slug, and replaces local content-media paths in source files
with Supabase public URLs. Keep the service-role key out of Git and logs.

Advisor profile edits from the agents.homixny.com portal also upload headshots to
`agent-photos/agents/<slug>/...` (forwarded to this site's `/api/agent-profile` /
`/api/agent-admin/edit`).

Listing photos are excluded from this storage policy. They are dynamic MLS media
served through BBO/R2 and should not be copied into Supabase or Git.

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

## Advisor Profiles

Advisor profiles live in `public.agents` and are managed entirely from the
agents.homixny.com portal — this site has no password-gated admin page. Portal
calls are authorized by `AGENTS_REVALIDATE_SECRET` (must match the portal's value)
and land on this site's endpoints:

- `/api/agent-profile` (+ `/publish`, `/identity`, `/visibility`) — the linked
  advisor profile keyed by `portal_agent_id`. Portal owns identity; advisors
  edit marketing fields and may switch `visible` ↔ `agent_hidden`.
- `/api/agent-admin` (+ `/edit`) — Portal admins manage `admin_hidden`, ordering,
  and marketing fields. Account creation/deactivation remains in the Portal.
- `/api/revalidate-agents` — cache refresh after an edit.

Recommended launch sequence:

1. Set the Supabase env vars and `AGENTS_REVALIDATE_SECRET` (identical on this
   site and the portal).
2. Deploy.
3. In the portal, admins add/approve accounts under **经纪人**; the minimal
   public profile is created visible automatically. **/roster** controls public
   ordering and administrator visibility. Advisors self-edit under
   **我的档案 → 对外主页**.

Advisors missing photos, bios, phone numbers, emails, and license numbers are
expected to complete them from the portal.

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

## SEO, GEO, And Local Search

### Canonical Locale URLs

- English public URLs stay clean: `/about`, `/guides/buying-in-nyc`, and so on.
- Chinese public URLs are first-class pages under `/zh/...`, for example
  `/zh/about` and `/zh/guides/buying-in-nyc`.
- Do not publish, link, or campaign against `?lang=zh` URLs. The proxy sends
  legacy query-string links to their permanent canonical route.
- Every indexable public page must retain a self-canonical URL plus reciprocal
  `en`, `zh-Hans`, and `x-default` hreflang entries. `sitemap.xml` must include
  a separate `<loc>` entry for each language URL, not just alternates on English.

### Canonical NAP

The source-controlled primary business record is:

```text
Homix Realty Inc.
37-20 Prince St, STE 3H
Flushing, NY 11354
(929) 666-9886
homix@homixny.com
NYS Real Estate Broker License #10991241632
```

The SEO/GEO audit found a conflicting external office variant using `3720 Prince
St, STE F`. This cannot be corrected in Git. Before changing any external
profile, the broker of record must confirm the legally authorized suite from the
lease, NYS brokerage record, and MLS office record. Do not guess between the two
suite numbers or create duplicate profiles.

Once the authoritative NAP is confirmed, update the same exact legal name,
address, primary phone, website, license, and category across the following,
then record the date and profile owner in the operating log:

1. OneKey MLS brokerage and office records.
2. Google Business Profile and Google Maps.
3. Apple Business Connect and Bing Places.
4. Realtor.com, Zillow, Homes.com, and any active brokerage directories.
5. NYS Department of State/public licensing records where a public address is
   displayed.
6. Social bio links and link-in-bio pages that represent the brokerage.

For a suite or phone change, update the website and all profiles in the same
release window. Keep a screenshot or export of the before/after record; local
search systems reconcile conflicting data slowly, and a partial update creates
more duplicate-entity risk than a short delay.

### Release Verification

After each production deployment, check at least one English and Chinese URL
from each page family:

1. `/about` and `/zh/about`: correct canonical, hreflang cluster, `html[lang]`,
   localized title/description, and an individual Open Graph image URL.
2. `/guides/buying-in-nyc` and `/zh/guides/buying-in-nyc`: localized Article,
   Breadcrumb, and organization entity references in rendered JSON-LD.
3. `/agents/<slug>` and `/zh/agents/<slug>`: agent JSON-LD contains an `@id`,
   the visible profile URL, and `worksFor.@id` pointing to the Homix entity.
4. `/sitemap.xml`: both English and `/zh` locations appear for each indexable
   route, with reciprocal alternates.
5. A Chinese share URL in Facebook Sharing Debugger, LinkedIn Post Inspector,
   and a fresh iMessage/WeChat preview: the card describes that page, rather
   than the generic homepage, and CJK text stays on-card.
6. Google Search Console: submit the sitemap after this migration, inspect a
   representative Chinese URL, and monitor canonical-selection, alternate-page,
   and duplicate-title reports for at least four weeks.

MLS detail pages remain `noindex` by design. Their social cards should identify
the specific property, but do not add them to the sitemap or manually request
indexing without written OneKey approval.

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
- `/listings` loads from BBO or displays the formal temporary-unavailable state;
- listing image URLs come from BBO/R2 domains, not `media.mlsgrid.com`;
- advisor and long-lived content images load from Supabase Storage, not
  Squarespace or deleted local content directories;
- `NEXT_PUBLIC_SITE_URL` points at the production domain.

`next.config.ts` sets `images.unoptimized = true`; this avoids Vercel Image
Optimization transformation limits on the Hobby plan. Images are served directly
from Supabase, BBO/R2, or static public assets.

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

## Listings Operations

The website does not store MLS listings, does not run a listing sync script, and
does not call OneKey/MLSGrid directly. The only supported path is:

```text
Homix website -> BBO API -> OneKey MLS
```

Default public listing search sends `listOfficeMlsId=KEYHRMI01`, which maps to
`Homix Realty Inc` / `officeKey=KEY421354028` in BBO. The `/listings?scope=all`
view searches the wider BBO/OneKey set through the same API key.

If listings fail:

1. confirm `BBO_API_URL` and `BBO_API_KEY` are set in Vercel;
2. smoke test `GET /api/v1/listings/search?listOfficeMlsId=KEYHRMI01&limit=1` against BBO;
3. smoke test `GET /api/v1/sync/status` against BBO;
4. check BBO Railway logs and `syncLog` for `Property` sync status;
5. confirm media URLs are served from the BBO proxy or R2 public media domain.

Do not reintroduce local cache files, mock listing data, Vercel cron deploy
hooks, or direct OneKey/MLSGrid credentials in this website.
