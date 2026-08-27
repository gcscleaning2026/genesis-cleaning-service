/**
 * The service area, as schema.org nodes, derived from the county pages themselves.
 *
 * Three places need it — the business node in the document head, the Service node on every
 * service page, and the county pages — and the one thing worse than a service area stated
 * once is a service area stated three times slightly differently. AREA_PAGES is the source:
 * a county we publish a page for is a county we work, and there is no second list to drift.
 */
import { AREA_PAGES } from './area-pages';

const NEW_JERSEY = { '@type': 'State', name: 'New Jersey' };

/**
 * Where the business is based.
 *
 * No `streetAddress`: this is a service-area business with no public storefront, and
 * schema.org allows a PostalAddress to stop at the locality. Google asks a service-area
 * business to hide its street address on the profile, and markup that publishes one the
 * profile hides is the kind of inconsistency the local algorithms notice. The locality,
 * region and postal code are what a NAP citation actually gets matched on, and Orange sits
 * inside Essex — the first of the five counties on the service-area list, which is the
 * check worth remembering if the base ever moves.
 */
export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Orange',
  addressRegion: 'NJ',
  postalCode: '07050',
  addressCountry: 'US'
};

/** The same thing as one line of prose, for the contact card. */
export const BASE_LOCATION = 'Orange, NJ 07050';

export const AREA_SERVED = AREA_PAGES.map(area => ({
  '@type': 'AdministrativeArea',
  name: `${area.county} County, New Jersey`,
  containedInPlace: NEW_JERSEY
}));
