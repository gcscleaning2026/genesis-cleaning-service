import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The site is one stylesheet of ~4 KB and both routes are prerendered, so a separate
  // CSS request is a round trip the first paint waits on for no caching benefit. The
  // Vite build inlined it by hand in scripts/prerender.mjs; this is the same trade.
  experimental: {
    inlineCss: true
  }
};

// withBotId adds the proxy rewrites BotID's challenge needs, so ad blockers and third-party
// script blockers cannot weaken the check.
export default withBotId(nextConfig);
