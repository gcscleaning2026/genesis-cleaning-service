import { subpageHtml } from '@/lib/subpage';
import { pricingInput, pricingJsonLd } from '@/lib/subpage-build';
import type { Lang } from '@/lib/i18n';
import SubpageMotion from './subpage-motion';
import { QuoteForm } from './quote-form';

export function PricingPage({ lang }: { lang: Lang }) {
  const input = pricingInput(lang);
  const html = subpageHtml(input);
  const [before, after] = html.split('<!--QUOTE_FORM-->');
  return (
    <>
      <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: before }} />
      <QuoteForm lang={lang} />
      {after ? <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: after }} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pricingJsonLd(lang) }} />
      <SubpageMotion />
    </>
  );
}
