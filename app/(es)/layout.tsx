import '../globals.css';
import { SiteDocument, metadataFor, viewport } from '@/components/site-document';

// Root layout for the Spanish site at /es.
export const metadata = metadataFor('es');
export { viewport };

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}
