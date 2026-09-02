import { matchers, routes, type VercelConfig } from '@vercel/config/v1';

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
  // Apex (http and https) and http-www all 308 to https://www in one hop. Host-gated so
  // preview deployments and localhost are not swept along. Path is preserved.
  redirects: [
    routes.redirect('/', 'https://www.gcscleaning.net/', {
      permanent: true,
      has: [matchers.host('gcscleaning.net')]
    }),
    routes.redirect('/(.*)', 'https://www.gcscleaning.net/$1', {
      permanent: true,
      has: [matchers.host('gcscleaning.net')]
    }),
    routes.redirect('/', 'https://www.gcscleaning.net/', {
      permanent: true,
      has: [matchers.host('www.gcscleaning.net'), matchers.header('x-forwarded-proto', 'http')]
    }),
    routes.redirect('/(.*)', 'https://www.gcscleaning.net/$1', {
      permanent: true,
      has: [matchers.host('www.gcscleaning.net'), matchers.header('x-forwarded-proto', 'http')]
    })
  ],
  headers: [
    routes.cacheControl('/assets/(.*)', {
      public: true,
      maxAge: '30days',
      staleWhileRevalidate: '1year'
    }),
    routes.cacheControl('/assets/fonts/(.*)', {
      public: true,
      maxAge: '1year',
      immutable: true
    }),
    routes.header('/admin', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/admin/(.*)', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/api/reviews', [{ key: 'Cache-Control', value: 'private, no-store' }]),
    routes.header('/(.*)', [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()'
      },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
      {
        key: 'Content-Security-Policy',
        value: "base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'"
      }
    ])
  ]
};

export default config;
