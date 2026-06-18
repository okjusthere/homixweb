# Homix — Design System

Source of truth for the Homix brand site. Tokens live as CSS variables in
`src/app/globals.css` (`@theme`); this doc explains the intent. Goal #1 is
**brand & professional image** — authority through restraint.

## Aesthetic — "Warm Editorial"

Architectural Digest meets a modern fintech product: an interactive property
monograph. Large, calm photography; tight, confident type; one bronze accent;
generous margins; subtle motion.

**Hard bans** (AI-slop): purple/blue gradient meshes, glassmorphism, drop
shadows on every card, smiling-agent stock photos, "Find Your Dream Home" copy,
auto-rotating hero carousels, an IDX search grid on the homepage,
centered-everything symmetry, cramped margins.

## Color

| Role | Hex | Token |
|---|---|---|
| Background — bone paper | `#F6F3EC` | `--color-paper` |
| Surface — cards, nav-on-scroll | `#FCFAF5` | `--color-surface` |
| Ink — text, primary button fill | `#1C1B18` | `--color-ink` |
| Muted — eyebrows, meta | `#75716A` | `--color-muted` |
| Accent — bronze | `#9A6A3C` | `--color-bronze` |
| Secondary — deep pine | `#2C4A40` | `--color-pine` |
| Hairline border | `#E6E1D7` | `--color-line` |

Single warm-light theme (no dark mode). Bronze is the brightest, most saturated
thing on the page — use it sparingly (one action per section). Maintain WCAG
2.2 AA contrast (≥4.5:1 body, ≥3:1 large text / UI).

## Typography

- **Display / headings:** Fraunces (variable serif) — H1–H3, hero, pull quotes, prices.
- **Body / UI:** Inter — nav, filters, body, meta.

Scale: Hero 64 / H1 48 / H2 34 / H3 24 / Lead 20 / Body 16 / Small 14 / Eyebrow
12 (uppercase, 0.14em tracking). Prices use Fraunces with tabular figures.

## Spacing & layout

8px base (4/8/12/16/24/32/48/64/96/128). 12-col grid, max width 1200–1320px,
64–96px outer margins on large screens. Section rhythm 96px desktop / 64px
mobile; hero & major sections 128px. Global radius **2px** (token `--radius-sm`).

## Motion

Subtle, editorial only — no bounce, parallax, Ken Burns, or auto-carousels.
Entrances 200–260ms `cubic-bezier(0.22,1,0.36,1)`. Scroll reveals: fade + 12–16px
rise, 60ms stagger, fire once at ~85% viewport, **disabled under
`prefers-reduced-motion`**. Image hover: 1.03× scale (clipped), no card lift.
Sticky nav fades transparent → surface + 1px hairline past the hero. Buttons:
ink → bronze fill on hover; focus-visible 2px bronze ring at 2px offset.

## Imagery

Photography is the brand. Large, calm, architecturally composed; natural
daylight; warm-neutral grade (no HDR / orange-teal / vignettes). 4:3 & 3:2 grids,
16:9 hero, 4:5 agent portraits. Mock listings use licensed/placeholder photos —
**never scraped MLS/Zillow photos**. Replace with real photography for launch.

## Compliance is part of the design

Equal Housing Opportunity logo + statement in the footer on every page;
per-listing attribution ("Listing courtesy of …"); brokerage license number in
the footer; WCAG 2.2 AA. See `AGENTS.md` and the compliance layer in
`src/components/listings/` + `src/config/mls/`.
