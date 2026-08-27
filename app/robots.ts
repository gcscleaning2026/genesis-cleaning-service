import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/i18n';

/**
 * Replaces the hand-written public/robots.txt so the origin comes from one place.
 *
 * Deliberately no `Disallow: /admin`. The queue is behind a session check and its layout
 * already sends `robots: { index: false }`, and the two do not combine the way they look
 * like they do: a crawler told not to fetch the page never reads the noindex on it, which
 * leaves the URL itself eligible to appear from an external link. Letting Googlebot fetch
 * the redirect to /admin/login and read the noindex there is the stronger of the two.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`
  };
}
