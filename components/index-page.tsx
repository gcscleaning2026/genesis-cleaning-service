import { indexPageHtml, type IndexInput } from '@/lib/subpage';
import SubpageMotion from './subpage-motion';

/** A hub page: /services or /areas, in one language. Same motion as the detail pages. */
export function IndexPage({ input, jsonLd }: { input: IndexInput; jsonLd: string }) {
  return (
    <>
      <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: indexPageHtml(input) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SubpageMotion />
    </>
  );
}
