import type { Metadata } from 'next';
import { IndexPage } from '@/components/index-page';
import { servicesIndexInput, servicesIndexJsonLd, servicesIndexMetadata } from '@/lib/subpage-build';

// The rating on the business node comes from the approved reviews, so this follows the same
// hourly window the rest of the site uses.
export const revalidate = 3600;

export const metadata: Metadata = servicesIndexMetadata('en');

export default function Page() {
  return <IndexPage input={servicesIndexInput('en')} jsonLd={servicesIndexJsonLd('en')} />;
}
