import type { Metadata } from 'next';
import { IndexPage } from '@/components/index-page';
import { areasIndexInput, areasIndexJsonLd, areasIndexMetadata } from '@/lib/subpage-build';

// The rating on the business node comes from the approved reviews, so this follows the same
// hourly window the rest of the site uses.
export const revalidate = 3600;

export const metadata: Metadata = areasIndexMetadata('es');

export default function Page() {
  return <IndexPage input={areasIndexInput('es')} jsonLd={areasIndexJsonLd('es')} />;
}
