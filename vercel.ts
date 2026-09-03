import { routes, type VercelConfig } from '@vercel/config/v1';

/**
 * Vercel project configuration.
 *
 * Everything hashed by the build (`/_next/static/*`) is already served immutable by
 * Vercel, so the rules here only cover `public/` — files with stable names that the
 * pages reference directly. Later rules win, so the font rule has to come after the
 * general asset rule.
 */
export const config: VercelConfig = {
  // The project on Vercel predates this repo and its dashboard settings still describe
  // the old Vite build (framework `vite`, output `dist`). Declaring them here overrides
  // the dashboard, so the deploy follows the repo instead of stale project settings.
  framework: 'nextjs',
  buildCommand: 'next build && node --experimental-strip-types --experimental-detect-module --import ./scripts/register-ts-ext.mjs scripts/submit-indexnow.mts',
  outputDirectory: '.next',
  trailingSlash: false,
  headers: [
    // Images and other public assets. The filenames are stable, so this cannot be
    // `immutable` — replacing one has to be able to reach clients. A day of freshness was
    // too cautious for that: these files change a few times a year and there are sixty-odd
    // of them, so every returning visitor was revalidating an unchanged set daily. A month
    // of freshness with a year of stale-while-revalidate keeps a replacement reachable
    // — the stale copy is served once and the new one is fetched in the background — while
    // the common case stops touching the network at all.
    routes.cacheControl('/assets/(.*)', {
      public: true,
      maxAge: '30days',
      staleWhileRevalidate: '1year'
    }),
    // The two variable fonts are content-addressed in practice — a new cut ships under a
    // new filename — so they can be cached for a year.
    routes.cacheControl('/assets/fonts/(.*)', {
      public: true,
      maxAge: '1year',
      immutable: true
    }),
    // The queue and the submission endpoint are per-request and per-session: nothing about
    // them may be held in a shared cache. Two rules rather than one: `/admin/(.*)` matches
    // every page under the queue but not `/admin` itself, which is the queue.
    routes.header('/admin', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/admin/(.*)', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/api/reviews', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/(.*)', [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Nothing here has any reason to be framed, and /admin approves reviews with
      // single-click buttons — exactly what a clickjacking overlay is for. frame-ancestors
      // is the modern control; X-Frame-Options covers the browsers that predate it.
      { key: 'X-Frame-Options', value: 'DENY' },
      // No camera, microphone, geolocation or payment API is used, so no embedded frame or
      // injected script gets to ask for one either.
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()'
      },
      // A year of HTTPS-only. Deliberately no `includeSubDomains` and no `preload`: both are
      // commitments that outlive a mistake, and the domain move to gcscleaning.net has not
      // happened yet. Revisit once the subdomains of the real domain are known.
      { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
      // A deliberately partial CSP. `script-src` and `connect-src` are absent, and so is
      // `default-src`, because BotID's challenge and Next's own inline bootstrap would both
      // be caught by them: a CSP that silently disables bot detection is worse than none.
      // What is here cannot break either — it blocks base-tag hijacking, plugin embeds,
      // form posts to another origin, and framing.
      {
        key: 'Content-Security-Policy',
        value: "base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'"
      }
    ])
  ]
};

export default config;
