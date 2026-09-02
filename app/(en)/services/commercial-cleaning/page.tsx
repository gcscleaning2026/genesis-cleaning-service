import type { Metadata } from 'next';
import { Subpage } from '@/components/subpage';
import { wave1ServiceInput, wave1ServiceJsonLd, wave1ServiceMetadata } from '@/lib/subpage-build';

export const revalidate = 3600;

export const metadata: Metadata = wave1ServiceMetadata('commercial-cleaning', 'en');

export default function Page() {
  const input = wave1ServiceInput('commercial-cleaning', 'en');
  const jsonLd = wave1ServiceJsonLd('commercial-cleaning', 'en');
  if (!input || !jsonLd) return null;
  return <Subpage input={input} jsonLd={jsonLd} />;
}
