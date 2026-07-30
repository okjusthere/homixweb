# Homix Website

Marketing and brand website for Homix Realty Inc., a New York residential real
estate brokerage. The site is built around brand trust first: warm editorial
design, bilingual content, agent credibility, and light IDX/listing support.

## Stack

- Next.js 16 App Router in `src/app`
- React 19
- Tailwind CSS v4 via CSS tokens in `src/app/globals.css`
- TypeScript
- Supabase for advisor self-editing and website inquiry records
- Supabase for the automated News archive and ingestion state
- Resend for website inquiry email delivery
- Vercel deployment

Read `AGENTS.md` and `DESIGN.md` before changing implementation or visual style.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill values as needed.

Minimum for a public launch with inquiries:

```bash
NEXT_PUBLIC_SITE_URL=https://www.homixny.com
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
AGENTS_REVALIDATE_SECRET=...
RESEND_API_KEY=...
INQUIRY_TO_EMAIL=homix@homixny.com
INQUIRY_FROM_EMAIL="Homix Website <inquiries@homixny.com>"
```

The automated `/news` publisher additionally requires:

```bash
CRON_SECRET=...             # Vercel Cron Bearer secret
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_RESPONSES_ENDPOINT=https://YOUR-RESOURCE.services.ai.azure.com/openai/v1/responses
AZURE_OPENAI_DEPLOYMENT=...
AZURE_OPENAI_IMAGE_ENDPOINT=https://YOUR-RESOURCE.services.ai.azure.com/openai/v1/images/generations?api-version=preview
AZURE_OPENAI_IMAGE_API_KEY=...
AZURE_OPENAI_IMAGE_DEPLOYMENT=gpt-image-2
```

The newsroom calls the dedicated Azure deployment directly with Azure's
`api-key` authentication. It does not use Vercel AI Gateway or a generic
`OPENAI_API_KEY`.

`AGENTS_REVALIDATE_SECRET` is the shared secret with the agents.homixny.com
portal — it authorizes the portal's advisor-profile, roster-admin, and
cache-revalidate calls to this site, and must match the portal's value. Advisor
profiles are managed entirely from that portal (account lifecycle under
`/agents`, self-edit, and public ordering/visibility under `/roster`);
this site has no password-gated admin page.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor. It creates:

- `agents` for Portal-managed advisor profiles and lifecycle visibility.
- `agent-photos` public storage bucket for advisor headshots and long-lived
  website media.
- `inquiries` for website contact form submissions.

Then run `supabase/automated-news.sql` once. It creates the private source,
candidate, article, and run tables; seeds the initial RSS sources; and extends
Share Center links to accept `news`. The service-role key is the only runtime
credential with access to these tables.

No public write policy is created for `inquiries`; the server writes through the
service-role key after validation.

Storage paths are intentionally stable:

- `agent-photos/agents/...` stores advisor headshots. Production agent cards use
  `public.agents.photo_url`; missing headshots use the brand placeholder.
- `agent-photos/site-media/...` stores long-lived editorial assets such as new
  development images, gated community images, guide article covers, neighborhood
  photos, onboarding materials, and training images.
- Git keeps only logo, fallback, and static UI assets in `public/`.

Listings media is not stored by this website. Listing photos remain on the
BBO/R2 listing-media path and are treated as dynamic MLS assets.

## Inquiries

All public inquiry forms submit through a Server Action. A submission:

1. validates required fields and TCPA-style consent;
2. records the inquiry in Supabase when configured;
3. sends an email through Resend to `INQUIRY_TO_EMAIL`;
4. updates the inquiry status with email delivery state.

If Resend is not configured but Supabase is configured, the lead is still stored.

## Automated News

Vercel calls `/api/cron/news` once each morning. A run:

1. claims that New York calendar date so concurrent retries cannot double-publish;
2. reads enabled publisher and Google News RSS sources from Supabase;
3. rejects stale, irrelevant, duplicate, low-trust, or uncorroborated candidates;
4. creates an original bilingual briefing from the strongest candidate;
5. applies deterministic number checks and a separate editorial verification;
6. publishes at most one article and revalidates `/news` plus Share Center.

If no candidate clears every gate, the run is recorded as
`skipped_no_candidate` and `/news` receives no article that day. Evergreen
Guides are never used as a news fallback. Feed and editorial state can be
inspected in `public.news_ingestion_runs` and `public.news_candidates`.

## Deployment

Deploy on Vercel. Configure all production environment variables in Vercel
Project Settings before assigning the production domain.

See `docs/OPERATIONS.md` for the deployment checklist, legal/compliance
checklist, and routine operating tasks.

## Listings Boundary

The listings data layer is intentionally isolated behind `src/lib/listings`.
UI imports only the provider interface/singleton. The website does not call
OneKey/MLSGrid directly and does not keep a local MLS cache; BBO is the only MLS
backend.
