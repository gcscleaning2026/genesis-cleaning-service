import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The site is one stylesheet of ~4 KB and both routes are prerendered, so a separate
  // CSS request is a round trip the first paint waits on for no caching benefit. The
  // Vite build inlined it by hand in scripts/prerender.mjs; this is the same trade.
  experimental: {
    inlineCss: true
  }
};

export default nextConfig;
