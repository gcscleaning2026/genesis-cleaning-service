import type { Metadata } from 'next';
import { PricingPage } from '@/components/pricing-page';
import { pricingMetadata } from '@/lib/subpage-build';

export const revalidate = 3600;
export const metadata: Metadata = pricingMetadata('en');

export default function Page() {
  return <PricingPage lang="en" />;
}
