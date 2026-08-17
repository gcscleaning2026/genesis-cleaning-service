# Genesis Cleaning Service — Next.js

Marketing site for Genesis Cleaning Service LLC (New Jersey), built on Next.js 16 (App
Router, Turbopack) and deployed on Vercel. Migrated from the Vite + React version in
`genesis-cleaning-react`.

## Included

- Next.js 16 + React 19 + TypeScript, both pages statically prerendered
- Responsive desktop/mobile layout
- English and Spanish as two separately indexable pages (`/` and `/es`), cross-linked with
  `hreflang`, plus an in-place language toggle with a saved preference
- WhatsApp quote links, click-to-call and email contact actions
- Mobile navigation and a fixed mobile quick-contact bar
- Customer review modal with star rating, `localStorage` and WhatsApp handoff
- GSAP + ScrollTrigger + Lenis animation and smooth scrolling, loaded lazily
- CSS-driven hero entrance, so the page paints before any JavaScript runs
- Self-hosted fonts and an inline SVG icon sprite — no third-party requests on the
  critical path
- Responsive image variants generated with sharp (`pnpm images`)
- `robots.txt`, `sitemap.xml`, canonical / `hreflang` / OpenGraph / Twitter tags and
  `CleaningService` JSON-LD
- Vercel configuration in `vercel.ts`, including asset cache headers

## Run locally

```bash
pnpm install
pnpm dev
```

Unlike the previous Vite setup, the dev server renders the same markup as production, so
`/es`, `<head>` output and the no-JavaScript view can be checked without building.

## Verify a production build

```bash
pnpm build
pnpm start
```

Both routes should report as `○ (Static)`.

## Deploy to Vercel

The repo is linked to the `genesis-cleaning-service` Vercel project. `vercel.ts` declares
`framework: nextjs`, the build command and the output directory, which override the
project's older dashboard settings from the Vite build. No environment variables are
required.

```bash
vercel        # preview deployment
vercel --prod # production
```

## How it is put together

See [ARCHITECTURE.md](./ARCHITECTURE.md). The page is a single HTML string rendered by the
server; a client component drives that DOM. That is unusual enough to read about before
editing.

## Before final public launch

- **Testimonials are placeholders.** Replace them with approved real customer reviews
  before publishing, and do not add `Review`/`AggregateRating` schema until they are real.
- **Location data is generic.** The site says "New Jersey" because no city, street address
  or business hours were supplied. Add the real service area, address and hours to the copy
  and the JSON-LD; a local cleaning business cannot rank locally without them. Claiming and
  filling in a Google Business Profile with exactly the same name/phone/address matters at
  least as much as anything on the site.
- **Social profiles are text, not links.** `@gcs.genesis` is shown with icons but no URLs
  were provided. Once they exist, link them and add them to `sameAs` in the JSON-LD.
- **Domain.** Canonical, `hreflang`, OpenGraph, `sitemap.xml`, `robots.txt` and the JSON-LD
  all point at `https://genesis-cleaning-service.vercel.app`. When the site moves to
  `gcscleaning.net`, update `SITE_ORIGIN` in `lib/i18n.ts`, `public/robots.txt` and
  `public/sitemap.xml` together.
- **After launch,** verify indexing in Google Search Console (submit the sitemap; check
  that the Google-selected canonical matches the declared one).
