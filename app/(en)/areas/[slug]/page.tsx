import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Subpage } from '@/components/subpage';
import { AREA_PAGES } from '@/lib/area-pages';
import { areaInput, areaJsonLd, areaMetadata } from '@/lib/subpage-build';

type Params = { params: Promise<{ slug: string }> };

// The set of slugs is a constant, so every page is prerendered and an unknown slug is a 404
// at the edge rather than a render that has to decide.
export const dynamicParams = false;

// The business node in the root layout carries an aggregateRating computed from the approved
// reviews, so these pages are not static forever: they pick up a new rating on the same
// hourly window the home page uses.
export const revalidate = 3600;

export function generateStaticParams() {
  return AREA_PAGES.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return areaMetadata(slug, 'en');
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const input = areaInput(slug, 'en');
  const jsonLd = areaJsonLd(slug, 'en');
  if (!input || !jsonLd) notFound();
  return <Subpage input={input} jsonLd={jsonLd} />;
}
