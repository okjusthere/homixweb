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
ADMIN_SECRET=...
ADMIN_PASSWORD=...
RESEND_API_KEY=...
INQUIRY_TO_EMAIL=homix@homixny.com
INQUIRY_FROM_EMAIL="Homix Website <inquiries@homixny.com>"
```

`ADMIN_SECRET` protects one-time admin API endpoints. `ADMIN_PASSWORD` is the
login password for `/admin`; keep them different.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor. It creates:

- `agents` for advisor profiles and private edit links.
- `agent-photos` public storage bucket for advisor headshots and long-lived
  website media.
- `inquiries` for website contact form submissions.

No public write policy is created for `inquiries`; the server writes through the
service-role key after validation.

Storage paths are intentionally stable:

- `agent-photos/agents/...` stores advisor headshots. Production agent cards use
  `public.agents.photo_url`; the static roster only keeps the brand fallback.
- `agent-photos/site-media/...` stores long-lived editorial assets such as new
  development images, gated community images, journal covers, neighborhood
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
