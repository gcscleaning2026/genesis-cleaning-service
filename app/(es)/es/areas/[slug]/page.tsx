import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Subpage } from '@/components/subpage';
import { AREA_PAGES } from '@/lib/area-pages';
import { CITY_PAGES } from '@/lib/city-pages';
import { areaInput, areaJsonLd, areaMetadata, cityInput, cityJsonLd, cityMetadata } from '@/lib/subpage-build';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return [...AREA_PAGES, ...CITY_PAGES].map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (CITY_PAGES.some(page => page.slug === slug)) return cityMetadata(slug, 'es');
  return areaMetadata(slug, 'es');
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (CITY_PAGES.some(page => page.slug === slug)) {
    const input = cityInput(slug, 'es');
    const jsonLd = cityJsonLd(slug, 'es');
    if (!input || !jsonLd) notFound();
    return <Subpage input={input} jsonLd={jsonLd} />;
  }
  const input = areaInput(slug, 'es');
  const jsonLd = areaJsonLd(slug, 'es');
  if (!input || !jsonLd) notFound();
  return <Subpage input={input} jsonLd={jsonLd} />;
}
