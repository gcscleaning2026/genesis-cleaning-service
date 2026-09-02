import { SERVICE_PAGES } from '@/lib/service-pages';
import { AREA_PAGES } from '@/lib/area-pages';
import { SITE_ORIGIN } from '@/lib/i18n';
import { areaPath, servicePath } from '@/lib/routes';

/**
 * A plain-text summary of the business for the crawlers that look for one.
 *
 * It is generated from the same data the pages are built from rather than written by hand,
 * for the same reason the sitemap is: a hand-written summary is a second description of the
 * business, and second descriptions go stale silently. Nothing here is a claim the site does
 * not make in prose somewhere.
 */
export const dynamic = 'force-static';

function body() {
  const services = SERVICE_PAGES.map(
    page => `- [${page.copy.en.name}](${SITE_ORIGIN}${servicePath('en', page.slug)}): ${page.copy.en.intro}`
  ).join('\n');
  const areas = AREA_PAGES.map(
    page =>
      `- [${page.copy.en.name}](${SITE_ORIGIN}${areaPath('en', page.slug)}): ${page.towns.join(', ')}`
  ).join('\n');

  return `# Genesis Cleaning Service LLC

> Residential and commercial cleaning company serving Essex, Union, Morris, Middlesex and Hudson County, New Jersey. Bilingual English and Spanish service. Los detalles hacen la diferencia.

- Based in: Orange, NJ 07050 (service-area business, no public storefront)
- Phone: (882) 930-0319 (call or WhatsApp)
- Email: service@gcscleaning.net
- Website: ${SITE_ORIGIN}
- Languages: English and Spanish, end to end
- Service area: Essex, Union, Morris, Middlesex and Hudson County, New Jersey
- Supplies: all equipment and cleaning products are brought by the crew
- Presence at the property is not required; access is arranged once
- Cancellation: up to 24 hours before the visit, at no charge
- Pricing: quoted per job against the space, its condition and the frequency

## Services

${services}

## Service areas

${areas}

## Spanish

Every page has a Spanish counterpart under ${SITE_ORIGIN}/es. Quotes, scheduling and the
visit itself can be handled in Spanish from start to finish.
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}
