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
  buildCommand: 'next build',
  outputDirectory: '.next',
  trailingSlash: false,
  headers: [
    // Images and other public assets keep short freshness: the filenames are stable, so
    // replacing one has to be able to reach clients without stranding them on a year-old
    // copy.
    routes.cacheControl('/assets/(.*)', {
      public: true,
      maxAge: '1day',
      staleWhileRevalidate: '1week'
    }),
    // The two variable fonts are content-addressed in practice — a new cut ships under a
    // new filename — so they can be cached for a year.
    routes.cacheControl('/assets/fonts/(.*)', {
      public: true,
      maxAge: '1year',
      immutable: true
    }),
    // The queue and the submission endpoint are per-request and per-session: nothing about
    // them may be held in a shared cache.
    routes.header('/admin/(.*)', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/api/reviews', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/(.*)', [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
    ])
  ]
};

export default config;
