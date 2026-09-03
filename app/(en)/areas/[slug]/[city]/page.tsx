import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return [] as { slug: string; city: string }[];
}

export default function NestedCity() {
  notFound();
}
