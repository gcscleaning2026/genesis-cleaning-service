import type { Metadata } from 'next';
import { Subpage } from '@/components/subpage';
import { wave1ServiceInput, wave1ServiceJsonLd, wave1ServiceMetadata } from '@/lib/subpage-build';

export const revalidate = 3600;

export const metadata: Metadata = wave1ServiceMetadata('house-cleaning', 'es');

export default function Page() {
  const input = wave1ServiceInput('house-cleaning', 'es');
  const jsonLd = wave1ServiceJsonLd('house-cleaning', 'es');
  if (!input || !jsonLd) return null;
  return <Subpage input={input} jsonLd={jsonLd} />;
}
