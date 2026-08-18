# Genesis Cleaning Service — Next.js

Marketing site for Genesis Cleaning Service LLC (New Jersey), built on Next.js 16 (App
Router, Turbopack) and deployed on Vercel. Migrated from the Vite + React version in
`genesis-cleaning-react`.

The site is bilingual (English at `/`, Spanish at `/es`), statically prerendered, and backed
by a small review pipeline: visitors submit a testimonial, it is moderated and stored as
`pending`, the owner is emailed, and nothing appears publicly until they approve it on
`/admin`.

**Read [CLAUDE.md](./CLAUDE.md) before editing.** The page is one HTML string rather than a
component tree, which is unusual enough that the normal React instincts are wrong here.

---

## Contents

- [Quick start](#quick-start)
- [Commands](#commands)
- [Environment variables](#environment-variables)
- [Architecture](#architecture)
- [The review pipeline](#the-review-pipeline)
- [Database](#database)
- [Admin area](#admin-area)
- [Images](#images)
- [Performance](#performance)
- [Testing](#testing)
- [Deployment](#deployment)
- [SEO](#seo)
- [Before final public launch](#before-final-public-launch)
- [Troubleshooting](#troubleshooting)
- [File map](#file-map)

---

## Quick start

```bash
pnpm install
cp .env.example .env.local          # then fill it in — see "Environment variables"
node --env-file=.env.local scripts/migrate.mjs
pnpm dev
```

`.env.example` covers the eleven variables the review pipeline and admin area need.
`RESEND_EMAIL_DOMAIN` and `REVIEW_TIMING_LOG` are not in it; both are optional.

`pnpm dev` renders the same server-generated markup as production, so `/es`, `<head>` output
and the no-JavaScript view can all be checked without a production build.

For local development, point `TURSO_DATABASE_URL` at `file:local-dev.db`. The whole review
flow — submission, moderation, storage, the admin queue — then runs without a Turso token.

---

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | `next dev` with Turbopack |
| `pnpm build` | `next build` — typechecks, then prerenders `/` and `/es` |
| `pnpm start` | Serves the production build on `:3000` |
| `pnpm typecheck` | `tsc --noEmit` only |
| `pnpm lint` | `eslint` |
| `pnpm test` | `vitest run` — 76 tests across 15 files |
| `pnpm test:watch` | `vitest` in watch mode |
| `pnpm images` | Regenerates responsive image variants with sharp; outputs are committed |
| `pnpm email:test` | Sends one real test email through Resend to `OWNER_EMAIL` |

Helper scripts, run directly:

| Script | Usage |
|---|---|
| `scripts/migrate.mjs` | `node --env-file=.env.local scripts/migrate.mjs` — applies `lib/schema.sql`. Every statement is `IF NOT EXISTS`, so it is safe to re-run |
| `scripts/hash-password.mjs` | `node scripts/hash-password.mjs` — prompts without exposing the password in shell history or process arguments, then prints the `salt:hash` value for `ADMIN_PASSWORD_HASH` |
| `scripts/images.mjs` | Invoked by `pnpm images` |
| `scripts/test-email.mjs` | Invoked by `pnpm email:test` |

### What the build actually guarantees

`pnpm build` is the only automated gate on the front end, and it is weaker than it looks:
`components/site-runtime.tsx` starts with `// @ts-nocheck`, so a clean typecheck says almost
nothing about the largest file in the repo. `lib/*.ts`, `app/` and the tests **are** checked.
Verify front-end changes by loading the page and exercising them.

---

## Environment variables

The public pages need none of these — they are prerendered. Everything below serves the
review pipeline and the admin area.

| Variable | Required for | Purpose |
|---|---|---|
| `TURSO_DATABASE_URL` | Reviews, admin, build | libSQL connection. `file:local-dev.db` locally, a `libsql://…` URL in production |
| `TURSO_AUTH_TOKEN` | Reviews, admin (remote only) | Turso token. Not needed with a `file:` URL |
| `RESEND_API_KEY` | Owner notification | Resend API key. Absent ⇒ the email is skipped and logged, the review is still stored |
| `OWNER_EMAIL` | Owner notification | Where the "new review awaiting approval" mail goes |
| `REVIEW_FROM_EMAIL` | Owner notification | Verified sender, e.g. `Genesis Reviews <reviews@…>` |
| `RESEND_EMAIL_DOMAIN` | Resend setup | The domain verified with Resend |
| `NEXT_PUBLIC_SITE_URL` | Owner notification | Used to build the `/admin` link inside the email |
| `ADMIN_USER` | Admin login | Username for `/admin/login` |
| `ADMIN_PASSWORD_HASH` | Admin login | `salt:hash` from `scripts/hash-password.mjs` (scrypt, 64 bytes) |
| `ADMIN_SESSION_SECRET` | Admin login | HMAC key for the session cookie. Any long random string |
| `REVIEW_IP_SALT` | Rate limiting | Salt for the submitter IP hash. Changing it resets everyone's hourly counter |
| `REVIEW_RATE_LIMIT_PER_HOUR` | Optional | Submissions allowed per IP hash per hour. Defaults to **3**. `0` switches the limit off outside production only; production keeps the default |
| `REVIEW_TIMING_LOG` | Optional | `1` enables per-stage timing logs on `POST /api/reviews`. Off otherwise |

`VERCEL_OIDC_TOKEN` appears in a pulled local env file; it is issued by Vercel and used by
BotID. Do not set it by hand.

> **Check `REVIEW_RATE_LIMIT_PER_HOUR` in production.** It is currently set as a production
> environment variable. A value of `0` is treated as the safe default there, but an explicit
> positive limit makes the deployment intent clear.

---

## Architecture

### The page is one HTML string, not a component tree

- **`lib/site-content.ts`** — `SITE_HTML`, a ~600-line template literal holding the complete
  markup, including an inline `<symbol>` icon sprite. **Server-only**: importing it from a
  client component ships ~96 KB of markup in the browser bundle.
- **`lib/i18n.ts`** — the `ES` dictionary, per-language `HEAD` copy, `SITE_ORIGIN` and
  `WA_TEXT`. Split from `site-content.ts` precisely so the client runtime can import the
  dictionary without dragging the markup along.
- **`lib/render.ts`** — build-time transforms: translate `[data-i18n]` elements to Spanish,
  split the hero heading into per-word spans stamped with `--i`, collect the English seed,
  and inject approved reviews into `#gcs-track`. It asserts that no `[data-i18n]` element
  wraps nested markup; if that assertion fires, split the copy into two keys.
- **`components/site-page.tsx`** — Server Component. Writes the markup into the HTML with
  `dangerouslySetInnerHTML`, plus two JSON seed `<script>` tags.
- **`components/site-runtime.tsx`** — Client Component that **renders `null`**. The DOM
  already exists; this drives it imperatively.

To change page content or layout you edit `SITE_HTML` — there are no components to edit.
Styles are inline `style="…"` attributes in that string; `app/globals.css` holds only what
inline styles cannot express (media queries, pseudo-elements, `:focus-visible`, and hover via
the `[style-hover="…"]` convention).

React state never re-renders markup. `GenesisSite`'s state is only `{ lang, reviews }`, and
updates are imperative DOM writes from `componentDidUpdate` / `apply()` /
`updateReviewMarkup()`. Events are two delegated listeners (`click`, `submit`) attached to
`.gcs-shell`, dispatching on `data-action` / `data-submit`.

### The `data-*` contract

Markup and runtime are coupled solely through data attributes, so renaming one silently
disables a feature:

| Attribute | Drives |
|---|---|
| `data-i18n`, `-ph`, `-aria` | Translation of text, placeholders, aria-labels |
| `data-action`, `data-submit` | Delegated event dispatch |
| `data-wa` | WhatsApp deep link |
| `data-lang-btn`, `data-knob` | Language toggle and its sliding pill |
| `data-cta-solid` | Accent colour override |
| `data-anim` | CSS hero entrance |
| `data-reveal`, `data-clip`, `data-val` | Scroll reveals |
| `data-w` | Hero word spans |
| `data-depth-image`, `data-blob`, `data-badge`, `data-glow` | Parallax layers |
| `data-vel` | Velocity-reactive scale |
| `#gcs-track` | Review marquee |
| `data-star` | Star rating input |

### Two languages, two URLs, two root layouts

English is `/` (`app/(en)/`), Spanish is `/es` (`app/(es)/`). Separate route groups with
separate root layouts exist for one reason: the static HTML must carry the right
`<html lang>` for crawlers that never run the toggle.

**New copy needs two edits** — the English text with `data-i18n="some.key"` in `SITE_HTML`,
and a matching `ES['some.key']` in `lib/i18n.ts`. Missing keys fall back to English with a
build warning.

The English dictionary reaches the client through the `gcs-i18n-en` seed tag, because on
`/es` the served DOM is already Spanish. On load the URL beats `localStorage`
(`langFromPath()`); the toggle swaps text in place and `applyHead()` rewrites title,
description, canonical, `og:*`, `twitter:*` and the address bar via `history.replaceState`.

`components/site-document.tsx` is the shared document: Metadata API (`metadataFor()`),
`viewport` theme-color, `CleaningService` JSON-LD, `ReactDOM.preload` for the two fonts and
the LCP image, and the motion-bail script.

### Motion: CSS above the fold, GSAP below it

The hero entrance is CSS keyframes driving `[data-anim]` and the build-split hero words. This
is load-bearing for LCP: **an element at `opacity: 0` cannot be the Largest Contentful
Paint**, so never pre-hide anything above the fold behind JavaScript.

Everything scroll-driven is GSAP + ScrollTrigger + Lenis, lazily `import()`ed and not started
until the first scroll/pointer/key event, with a 2.5 s idle backstop. Below-fold content is
pre-hidden by `html.gcs-anim`, guarded by three timeouts that must all stay: the inline
script in `site-document.tsx` (4.5 s), the CSS gating, and `initMotion()` / `startMotion()`
(4 s, shrinking to 600 ms after a wake event). **If content is invisible, the class was never
removed** — do not add pre-hiding CSS that is not gated on `html.gcs-anim`.

Tuning goes through the `M` object, not individual timelines. Measured constraints: do not
raise `M.scrub` toward 1 (Lenis already smooths; the two compound into input lag), do not
animate `filter: blur()`, no `backdrop-filter` on the sticky header, no `mix-blend-mode` on
`#gcs-grain`, and keep `will-change: transform` to continuously-animating layers only.

`startMotion()` runs in two frames: everything that pre-hides content, then `gcs-anim`
removal and `ST.refresh()`, then the progress bar, header shadow and marquee on the next
frame. Viewport metrics are cached per ScrollTrigger refresh pass (`vp()` / `maxScroll()`,
invalidated on `refreshInit`) because reading `window.innerHeight` inside a trigger callback
forces a synchronous layout on every trigger.

---

## The review pipeline

### One write path

`POST /api/reviews` (`app/api/reviews/route.ts`) is the only way a review enters the system.
It runs, in order:

1. **Parse JSON.** Malformed body ⇒ `400 { reason: 'length' }`.
2. **Local bot checks** (`failsLocalBotChecks`) — the `rev-website` honeypot field and a 2 s
   minimum fill time. Either ⇒ `403 { reason: 'bot' }`. These need no network and no
   database, so they are answered first; spam never reaches the paid checks below.
3. **BotID and the rate-limit count, in parallel.** `detectBot()` treats a thrown check as
   unclassified, because BotID needs Vercel's OIDC header and throws on a local `next start`.
   A failed rate-limit lookup abstains rather than rejecting the visitor.
4. **`submissionVerdict()`** — applies BotID's answer, the per-IP-hash rate limit
   (3/hour by default), then `moderateReview()`.
5. **Insert** as `pending`. Failure ⇒ `500 { reason: 'store' }`.
6. **Respond `201`**, then email the owner from an `after()` callback — the visitor never
   waits for the mail provider.

The route declares `export const maxDuration = 30`, which caps the whole invocation including
the `after()` work. The Resend SDK accepts no `AbortSignal`, so this is the only way to stop a
hung mail provider from holding a function open for the platform default of 300 s.

### Moderation limits

Defined in `lib/moderation.ts`. Each rejection maps to a `rev.err.*` message in both
languages.

| Rule | Limit | Reason code |
|---|---|---|
| Comment length | 8–80 words, ≤ 500 characters | `words`, `length` |
| Name length | 2–40 characters | `name` |
| Rating | integer 1–5 | `rating` |
| Links / emails / domains | rejected outright | `links` |
| English profanity | `obscenity`, catches leetspeak and separator tricks | `profanity` |
| Spanish profanity | `lib/profanity-es.ts`, accent-normalised substring match | `profanity` |
| Shouting | > 70% uppercase over ≥ 20 letters | `shouting` |

### Notification

`lib/notify.ts` sends the owner an HTML summary with a link to `/admin`. It **never throws**:
a dead mail provider must not fail a review that is already safely stored, and the pending
queue on `/admin` is the source of truth. The Resend SDK is imported dynamically inside the
send path so a cold start that only rejects submissions never loads it.

### Publication

Approved reviews are rendered **into** `#gcs-track` by `injectTrack()` in `lib/render.ts`, so
they live in the static HTML and are visible to crawlers. The same list is seeded to the
client as `#gcs-reviews` JSON for the language-switch rebuild. `decide()` in
`app/admin/actions.ts` calls `revalidatePath('/')` and `revalidatePath('/es')`, so both
languages update the moment the owner approves or unpublishes.

> Anything that must reach crawlers or social/AI scrapers has to be in `SITE_HTML` or the
> document. Content added at runtime by `updateReviewMarkup()` is invisible to them.

---

## Database

Turso (libSQL), accessed through `@libsql/client` with raw SQL — no ORM. `getDb()` in
`lib/db.ts` memoises one client per process; Vercel Fluid Compute reuses instances, so one
client serves many requests.

### Schema (`lib/schema.sql`)

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  comment     TEXT    NOT NULL,
  rating      INTEGER NOT NULL,
  lang        TEXT    NOT NULL DEFAULT 'en',
  status      TEXT    NOT NULL DEFAULT 'pending',
  ip_hash     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  decided_at  TEXT
);

CREATE INDEX IF NOT EXISTS reviews_status_created ON reviews (status, created_at DESC);
CREATE INDEX IF NOT EXISTS reviews_ip_created     ON reviews (ip_hash, created_at DESC);
```

Submitter IPs are never stored raw — `hashIp()` keeps a salted SHA-256, which answers "is
this the same submitter?" without recording who.

### Queries and their plans

| Function | Statement | Plan |
|---|---|---|
| `listByStatus` | `WHERE status = ? ORDER BY created_at DESC, id DESC LIMIT ?` | `SEARCH … USING INDEX reviews_status_created` + a bounded top-N sort for the `id` tiebreak |
| `countRecentByIp` | `COUNT(*) WHERE ip_hash = ? AND created_at >= datetime('now', ?)` | `SEARCH … USING COVERING INDEX reviews_ip_created` |
| `setStatus` | `UPDATE … WHERE id = ?` | `SEARCH … USING INTEGER PRIMARY KEY` |

A composite `(status, created_at DESC, id DESC)` index was benchmarked and **rejected**: it
removes the temp B-tree from the plan but saves ~0.02 ms, flat from 200 to 10,000 rows,
against extra write and storage cost on every insert.

### Local development

```bash
# .env.local
TURSO_DATABASE_URL="file:local-dev.db"

node --env-file=.env.local scripts/migrate.mjs
```

`local-dev.db` is untracked. Re-run the migration after any change to `lib/schema.sql`.

---

## Admin area

`/admin` lists pending reviews first, then published ones, each with the full text and the
details that decide a borderline case. Approve, reject and unpublish are server actions.

### Gated twice, on purpose

1. **`proxy.ts`** — Next 16's renamed middleware, matcher `/admin/:path*`, checks the signed
   `gcs_admin` cookie and redirects to `/admin/login` if it is missing or expired.
2. **Every server action re-checks the session**, because a proxy runs before routing and is
   not authorisation. `decide()` throws `Not authorised` on a bad token.

### Session details

Handled in `lib/admin-session.ts`:

- Password verification is scrypt (64-byte key, `salt:hash` in `ADMIN_PASSWORD_HASH`), with a
  constant-time compare.
- The session token is `expiry.HMAC-SHA256(expiry)` keyed on `ADMIN_SESSION_SECRET`, built
  with Web Crypto so `proxy.ts` can verify it wherever it runs.
- The cookie is `httpOnly`, `sameSite: lax`, `path: /admin`, `secure` in production, 8-hour
  TTL.
- Login failures return one message for both wrong-username and wrong-password: telling an
  attacker which half was right hands them the username for free.

### First-time setup

```bash
node scripts/hash-password.mjs
# Enter the password at the hidden prompt.
# → 3f9a…:8c21…   put this in ADMIN_PASSWORD_HASH

# and set
ADMIN_USER=…
ADMIN_SESSION_SECRET=…   # any long random string
```

`/admin` is `noindex, nofollow` and served `private, no-store` via `vercel.ts`.

---

## Images

`pnpm images` regenerates every derivative from the full-size sources in `public/assets`.
Outputs are **committed**, so deploys need neither sharp nor the extra build time.

| Source | Widths | Formats |
|---|---|---|
| `gcs-hero.webp` | 480, 768, 1034 | WebP q82 + AVIF q55 |
| `gcs-why.webp` | 480, 768, 948 | WebP q82 + AVIF q55 |
| `gcs-badge.webp` | 96, 280, 560 | WebP q82 |
| `gcs-logo-navy.webp` | 290, 580 | WebP q82 |
| `grain.png` | — | WebP q70 tile |

AVIF is on for the two photographs and off for the flat-colour brand art: it wins ~35% on the
hero photo (46.5 KB → 30.2 KB at 1034w) and very little on a logo. Both photographs are
`<picture>` elements with an AVIF `<source>` ahead of the WebP `<img>`; the hero preload in
`site-document.tsx` carries `type: 'image/avif'` so a browser without AVIF support skips the
preload and falls through to the WebP rather than downloading both.

The hero must keep `fetchpriority="high"`; nothing else should claim it.

---

## Performance

All figures below are **lab and build measurements**, not real-user data. The site has no RUM
provider and no CrUX record, so nothing here describes actual visitors.

### Front end

Deployed build, cold cache, fresh browser context, medians of 3 runs:

| Metric | Mobile (412×915, Slow 4G, 4× CPU) | Desktop (1440×900, Fast 4G) |
|---|---:|---:|
| TTFB | 48 ms | 47 ms |
| FCP | 1028 ms | 348 ms |
| LCP | 2619 ms | 624 ms |
| CLS | 0.017 | 0.004 |

Build artifacts:

| Artifact | Size |
|---|---:|
| Landing-route JS (modern browsers, 7 chunks) | 495 KB raw / 127 KB brotli |
| — react-dom + App Router client runtime | 387 KB raw / 96 KB brotli |
| `noModule` legacy polyfill chunk | 113 KB — not fetched by modern browsers |
| Motion chunks (lazy, after first interaction) | 133 KB raw / 46 KB brotli |
| HTML for `/` | 167 KB raw / 20 KB brotli |
| — of which the RSC flight duplicate | 87 KB raw / ~6 KB brotli |

The flight payload duplicating the markup is inherent to `dangerouslySetInnerHTML` in a Server
Component. **Do not "fix" it** by moving `SITE_HTML` into a client component: that trades 6 KB
of compressible HTML for 96 KB of JavaScript.

Known remaining bottleneck: on mobile the LCP image shares its first request wave with ~115 KB
of React and App Router client JavaScript. That JavaScript buys hydration only — the client
component renders `null` — but there is no supported way to defer it inside the App Router.

The remaining 0.017 CLS is web-font swap reflow in the hero heading, not motion. Fixing it
means `size-adjust` / `ascent-override` fallback metrics on the two `@font-face` rules.

### Back end

Local production build, isolated SQLite, concurrency 1, medians of 3 trials:

| Path | p50 |
|---|---:|
| `403` honeypot | 15.7 ms |
| `201` accepted (mail path active) | 123.7 ms |
| `400` moderation rejection | ~121 ms |
| Route module init (cold) | ~336 ms |

Per-stage, from `REVIEW_TIMING_LOG=1`:

| Stage | p50 | p95 |
|---|---:|---:|
| `gate` (BotID ∥ rate limit) | 108 ms | 131 ms |
| `moderate` | 0 ms | 2 ms |
| `insert` | 2 ms | 3 ms |
| `mail` (after the response) | 43 ms | 58 ms |

The `gate` stage dominates. Locally `checkBotId()` throws every time for lack of a Vercel OIDC
header, so that figure may be an artifact of the test environment — production logs are the
way to find out, which is what `REVIEW_TIMING_LOG` exists for.

### Suggested budgets

LCP resource ≤ 32 KB · landing-route modern JS ≤ 127 KB brotli · HTML ≤ 20 KB brotli · no
single long task > 250 ms after the motion wake event · `gate` p95 < 150 ms · accepted-path
p95 < 400 ms · honeypot path p95 < 40 ms · 5xx rate < 0.5%.

---

## Testing

```bash
pnpm test
```

Vitest, 76 tests across 15 files, no DOM environment — everything under test is pure logic.

| File | Covers |
|---|---|
| `moderation.test.ts` | Word/character limits, links, profanity in both languages, shouting, ratings |
| `review-submission.test.ts` | `submissionVerdict` ordering, rate-limit env handling, and the `failsLocalBotChecks` short-circuit agreeing with the full verdict |
| `reviews-repo.test.ts` | Insert, atomic concurrent quota, count-by-IP, list-by-status, status updates |
| `review-body.test.ts` | JSON object shape, encoding, and request-size bounds |
| `review-route.test.ts` | Route response mappings, platform IP preference, atomic quota, deferred notification |
| `admin-login-rate-limit.test.ts`, `login-actions.test.ts` | Atomic login throttling, reset, and pre-scrypt rejection |
| `hash-password-script.test.ts` | Secret-safe stdin hashing and command-line rejection |
| `translation-escaping.test.ts` | Server-rendered translation text escaping |
| `admin-session.test.ts` | scrypt verification, HMAC tokens, expiry, tampering |
| `admin-actions.test.ts` | Authorisation on `decide()`, input validation |
| `notify.test.ts` | Email content, HTML escaping, failure swallowing, skip-when-unconfigured |
| `render-track.test.ts`, `review-card.test.ts` | Review card markup and track injection |
| `db.test.ts` | Schema application |

There is no browser or end-to-end suite. Front-end behaviour — the language toggle, the modal,
motion, reveals — has to be exercised by hand in a real browser.

---

## Deployment

The repo is linked to the `genesis-cleaning-service` Vercel project.

```bash
vercel        # preview deployment
vercel --prod # production
```

### `vercel.ts`

Configuration lives in `vercel.ts` using `@vercel/config`, not `vercel.json`. It declares
`framework: nextjs`, `buildCommand`, `outputDirectory` and the cache headers. **The build
fields are explicit on purpose**: the Vercel project predates this repo and its dashboard
still describes the old Vite build (`vite`, `dist`). Repo config overrides the dashboard.

Header rules are order-sensitive in the counter-intuitive direction — **the later matching
rule wins per key** — so `/assets/fonts/(.*)` (immutable, 1 year) must stay *after*
`/assets/(.*)` (1 day + stale-while-revalidate).

> Never point the immutable rule at `/assets/*`. Filenames there are stable, so replacing an
> image would strand clients on a year-old copy.

`/admin`, `/admin/(.*)` and `/api/reviews` are `private, no-store` — `/admin` needs its own
rule because `/admin/(.*)` does not match the queue page itself.

Every response also carries:

| Header | Value | Why |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | No MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No path leakage off-site |
| `X-Frame-Options` | `DENY` | `/admin` approves reviews with one click; nothing here is meant to be framed |
| `Content-Security-Policy` | `base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'` | Deliberately partial — see below |
| `Permissions-Policy` | camera, microphone, geolocation, payment all `()` | None of them are used |
| `Strict-Transport-Security` | `max-age=31536000` | One year of HTTPS-only |

> **Why the CSP has no `script-src`.** The page is prerendered, so a nonce is not available
> without turning both routes dynamic, and BotID's challenge plus Next's inline bootstrap
> would both have to be allowed by hash. A `script-src` that silently blocked the BotID
> challenge would weaken the review endpoint while looking like hardening. The four
> directives that are set cannot break either one. If a strict `script-src` is ever wanted,
> measure it in `Content-Security-Policy-Report-Only` first.

> **HSTS has no `includeSubDomains` and no `preload`.** Both are hard to walk back and the
> move to `gcscleaning.net` has not happened yet. Revisit once that domain's subdomains are
> known.

### Dependency advisories

`pnpm audit --prod` is clean. The full audit reports one high advisory,
[GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j) (ReDoS in
`path-to-regexp`), reached only as `@vercel/config > @vercel/routing-utils > path-to-regexp`.
It is a dev dependency, `@vercel/config` is already at its latest release (0.6.1), and the
only patterns that library ever compiles are the route strings written by hand in
`vercel.ts` — no attacker-supplied input reaches it at build or at runtime. Not fixable and
not reachable, so it is accepted; re-check when `@vercel/config` publishes an update.

### Rendering

| Route | Mode |
|---|---|
| `/`, `/es` | Static, `revalidate 3600` (a backstop; approvals revalidate immediately) |
| `/admin` | Dynamic (`force-dynamic`) |
| `/admin/login` | Static shell, server action for the POST |
| `/api/reviews` | Dynamic, `maxDuration 30` |
| `proxy.ts` | Runs on `/admin/:path*` only |

`experimental.inlineCss` in `next.config.ts` inlines the ~5 KB stylesheet, so the first paint
does not wait on a separate CSS round trip. `withBotId()` wraps the config to add the proxy
rewrites BotID's challenge needs, so ad blockers cannot weaken the check.

### Environment variables on Vercel

```bash
vercel env ls production
vercel env add NAME production
```

Environment variables are attached at deploy time — setting one does **not** affect existing
deployments. Redeploy after changing any of them.

---

## SEO

- Two separately indexable language pages, cross-linked with `hreflang` (`en`, `es`,
  `x-default`).
- Canonical, OpenGraph and Twitter tags per language, rewritten client-side by `applyHead()`
  when the toggle is used.
- `CleaningService` JSON-LD in `components/site-document.tsx` with services, languages,
  telephone and area served.
- `public/robots.txt` and `public/sitemap.xml`.
- Visually-hidden section headings (`.gcs-sr`) keep the document outline in sequential order
  for screen readers and crawlers.
- Approved reviews are in the static HTML, not injected at runtime, so they are crawlable.

---

## Before final public launch

- **Testimonials come from the moderation queue.** The placeholder samples were removed; the
  strip is empty until the first real review is approved on `/admin`. Do not add
  `Review`/`AggregateRating` schema until several real reviews are published.
- **Location data is generic.** The site says "New Jersey" because no city, street address
  or business hours were supplied. Add the real service area, address and hours to the copy
  and the JSON-LD; a local cleaning business cannot rank locally without them. Claiming and
  filling in a Google Business Profile with exactly the same name/phone/address matters at
  least as much as anything on the site.
- **Social profiles are linked and declared.** Instagram, Facebook and TikTok live in
  `lib/social.ts`; the icons in the contact card and the footer link to them, and the same
  URLs are the `sameAs` array in the JSON-LD. Add a profile there and all three places pick
  it up. Facebook has no vanity handle yet — `profile.php?id=…` is the canonical URL until
  the page gets one, and it should be updated here when it does.
- **Domain.** Canonical, `hreflang`, OpenGraph, `sitemap.xml`, `robots.txt` and the JSON-LD
  all point at `https://genesis-cleaning-service.vercel.app`. When the site moves to
  `gcscleaning.net`, update `SITE_ORIGIN` in `lib/i18n.ts`, `public/robots.txt` and
  `public/sitemap.xml` together.
- **Verify `REVIEW_RATE_LIMIT_PER_HOUR` in production** is unset or ≥ 1. A production value
  of `0` falls back to the default limit of 3.
- **After launch,** verify indexing in Google Search Console (submit the sitemap; check that
  the Google-selected canonical matches the declared one).

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Below-fold content is invisible | The `gcs-anim` class was never removed. Check the motion chunk loaded and that no new pre-hiding CSS is ungated |
| Motion never starts in `next dev` | StrictMode remounts the same class instance; `componentDidMount` must reset `this.unmounted` |
| A feature silently stopped working | A `data-*` attribute was renamed in `SITE_HTML` without updating `site-runtime.tsx` |
| Build warns about a missing translation key | `ES['some.key']` is absent in `lib/i18n.ts`; the English string is used as a fallback |
| Build fails on a nested `[data-i18n]` element | `lib/render.ts` asserts these wrap text only. Split the copy into two keys |
| Reviews never appear after approval | `revalidatePath` covers `/` and `/es`; check the review's status is `approved` and not `rejected` |
| Submissions all return `403 bot` | The honeypot or the 2 s fill timer is being tripped by the client, or BotID is classifying the traffic |
| `checkBotId()` throws locally | Expected — it needs Vercel's OIDC header. The other checks still apply |
| `/api/reviews` 500s with `store` | Turso is unreachable or the schema was never applied. Run `scripts/migrate.mjs` |
| Owner email never arrives | Check `RESEND_API_KEY`, `OWNER_EMAIL`, `REVIEW_FROM_EMAIL`. Failures are logged, never thrown. `pnpm email:test` sends a real one |
| Hero looks soft on a high-DPR phone | The AVIF/WebP `srcset` tops out at 1034w by design |

---

## File map

```
app/
  (en)/                  English root layout + page  →  /
  (es)/es/               Spanish root layout + page  →  /es
  admin/                 Moderation queue, layout, server actions
  admin/login/           Sign-in page and its action
  api/reviews/           The single write path: route.ts + verdict.ts
  globals.css            Only what inline styles cannot express
components/
  site-document.tsx      Shared <html>, metadata, JSON-LD, preloads, motion bail
  site-page.tsx          Server Component: writes SITE_HTML + JSON seeds
  site-runtime.tsx       Client Component that renders null and drives the DOM
lib/
  site-content.ts        SITE_HTML — the entire page markup (server-only)
  i18n.ts                ES dictionary, HEAD copy, SITE_ORIGIN, WA_TEXT
  render.ts              Build-time translate / word-split / seed / inject
  review-card.ts         Review card + track markup, shared server and client
  moderation.ts          Limits and rejection reasons
  profanity-es.ts        Spanish word list
  db.ts                  Memoised libSQL client, schema loader
  reviews-repo.ts        Review queries and atomic submission quota
  notify.ts              Resend owner notification, never throws
  admin-session.ts       scrypt password check + HMAC session
  admin-login-rate-limit.ts  Atomic fixed-window login throttle
  schema.sql             Review/login tables and indexes
scripts/                 images, migrate, hash-password, test-email
tests/                   Vitest suites
proxy.ts                 Next 16 middleware, gates /admin/*
next.config.ts           inlineCss + withBotId
vercel.ts                Framework, build, cache headers
instrumentation-client.ts  BotID init for POST /api/reviews
```
