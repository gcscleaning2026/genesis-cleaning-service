import { describe, expect, it } from 'vitest';
import { OPENING_HOURS_SPECIFICATION } from '../lib/business-hours';
import { BUSINESS_ADDRESS } from '../lib/service-area';

describe('CleaningService hours', () => {
  it('covers Monday through Sunday 08:00-18:00 in America/New_York', () => {
    expect(OPENING_HOURS_SPECIFICATION['@type']).toBe('OpeningHoursSpecification');
    expect(OPENING_HOURS_SPECIFICATION.dayOfWeek).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]);
    expect(OPENING_HOURS_SPECIFICATION.opens).toBe('08:00');
    expect(OPENING_HOURS_SPECIFICATION.closes).toBe('18:00');
    expect(OPENING_HOURS_SPECIFICATION.scheduleTimezone).toBe('America/New_York');
  });

  it('does not put a street, geo pin or price range on the service-area address', () => {
    expect(BUSINESS_ADDRESS).not.toHaveProperty('streetAddress');
    expect(JSON.stringify(BUSINESS_ADDRESS)).not.toMatch(/geo|priceRange|streetAddress/);
  });
});
