import '../globals.css';
import { SiteDocument, metadataFor, viewport } from '@/components/site-document';

// Root layout for the English site at /. See components/site-document.tsx for why the
// two languages have separate root layouts.
export const metadata = metadataFor('en');
export { viewport };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
