/**
 * Hours on the CleaningService node.
 *
 * The crew takes jobs seven days a week, 8am to 6pm Eastern. schema.org has no timezone
 * field on OpeningHoursSpecification in the core vocab, so `scheduleTimezone` (pending)
 * is what actually names America/New_York instead of leaving the times ambiguous.
 *
 * Deliberately no streetAddress, geo, or priceRange on the business node that consumes
 * this: this is a service-area business with no public storefront and quotes per job.
 */
export const OPENING_HOURS_SPECIFICATION = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '08:00',
  closes: '18:00',
  scheduleTimezone: 'America/New_York'
} as const;
