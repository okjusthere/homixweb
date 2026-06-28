<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Homix — project guide

**What this is:** the marketing/brand website for *Homix*, a US residential real
estate brokerage. Primary goal is **brand & professional image**; property
listings support that story but this is not a listings portal.

**Stack:** Next.js 16 (App Router, `src/app`) · React 19 · Tailwind v4
(CSS-based config in `globals.css`, no `tailwind.config.js`) · TypeScript ·
deploys to Vercel.

**Listings data layer (`src/lib/listings/`)** — the most important convention:
- UI imports the `listings` singleton from `@/lib/listings` and the
  `ListingsProvider` interface. **Never import a concrete provider in UI code.**
- BBO is the only MLS data source. The website never imports a mock/cache
  listings provider and never calls OneKey/MLSGrid directly.
- Production requires `BBO_API_URL`, `BBO_API_KEY`,
  `BBO_HOMIX_LIST_OFFICE_MLS_ID=KEYHRMI01`, and
  `BBO_HOMIX_LIST_OFFICE_KEY=KEY421354028`; see `.env.example`.

**Compliance is not optional** (US real estate): Equal Housing Opportunity logo
& language in the footer, MLS listing attribution ("Listing courtesy of …"),
state license number disclosure, privacy policy, and WCAG 2.1 AA accessibility.

**Design system:** see `DESIGN.md` (source of truth for color, type, spacing,
motion). Design tokens live as CSS variables in `globals.css` under `@theme`.

**Run:** `npm run dev` (http://localhost:3000) · `npm run build` · `npm run lint`
