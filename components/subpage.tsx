import { subpageHtml, type SubpageInput } from '@/lib/subpage';
import SubpageMotion from './subpage-motion';

/**
 * One service or area page.
 *
 * The markup is a string built on the server and written straight into the document, so the
 * page is complete before any JavaScript runs. SubpageMotion renders nothing; it attaches to
 * that DOM after mount and adds the scroll reveals, and it is the only client component
 * under this one.
 */
export function Subpage({ input, jsonLd }: { input: SubpageInput; jsonLd: string }) {
  return (
    <>
      <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: subpageHtml(input) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SubpageMotion />
    </>
  );
}
