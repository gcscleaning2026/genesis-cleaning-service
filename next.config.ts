import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';

const APEX_HOST = 'gcscleaning.net';
const WWW_HOST = 'www.gcscleaning.net';
const CANONICAL_ORIGIN = 'https://www.gcscleaning.net';

const nextConfig: NextConfig = {
  // Lock URL shape to the sitemap: home is `/`, every other loc is unslashed.
  // vercel.ts sets the same value so the dashboard cannot reintroduce trailing slashes.
  trailingSlash: false,
  // The site is one stylesheet of ~4 KB and both routes are prerendered, so a separate
  // CSS request is a round trip the first paint waits on for no caching benefit. The
  // Vite build inlined it by hand in scripts/prerender.mjs; this is the same trade.
  experimental: {
    inlineCss: true
  },
  async redirects() {
    // Apex → https://www in one hop. HTTP on the apex is included because the destination
    // is already https://www; a separate http→https on the apex first would be two hops.
    return [
      {
        source: '/',
        has: [{ type: 'host', value: APEX_HOST }],
        destination: `${CANONICAL_ORIGIN}/`,
        permanent: true
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: APEX_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true
      },
      {
        source: '/',
        has: [
          { type: 'host', value: WWW_HOST },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' }
        ],
        destination: `${CANONICAL_ORIGIN}/`,
        permanent: true
      },
      {
        source: '/:path*',
        has: [
          { type: 'host', value: WWW_HOST },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' }
        ],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true
      }
    ];
  }
};

// withBotId adds the proxy rewrites BotID's challenge needs, so ad blockers and third-party
// script blockers cannot weaken the check.
export default withBotId(nextConfig);
