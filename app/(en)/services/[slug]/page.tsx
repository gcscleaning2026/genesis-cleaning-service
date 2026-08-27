import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Subpage } from '@/components/subpage';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { serviceInput, serviceJsonLd, serviceMetadata } from '@/lib/subpage-build';

type Params = { params: Promise<{ slug: string }> };

// The set of slugs is a constant, so every page is prerendered and an unknown slug is a 404
// at the edge rather than a render that has to decide.
export const dynamicParams = false;

// The business node in the root layout carries an aggregateRating computed from the approved
// reviews, so these pages are not static forever: they pick up a new rating on the same
// hourly window the home page uses.
export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICE_PAGES.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata(slug, 'en');
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const input = serviceInput(slug, 'en');
  const jsonLd = serviceJsonLd(slug, 'en');
  if (!input || !jsonLd) notFound();
  return <Subpage input={input} jsonLd={jsonLd} />;
}
