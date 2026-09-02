import { SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { homePath } from '@/lib/routes';

const COPY: Record<Lang, { title: string; body: string; home: string }> = {
  en: {
    title: 'Page not found',
    body: 'That address is not a page we publish. Towns we have not built a page for are not listed, on purpose.',
    home: 'Back to the home page'
  },
  es: {
    title: 'Página no encontrada',
    body: 'Esa dirección no es una página que publiquemos. Los pueblos sin página propia no se listan, a propósito.',
    home: 'Volver al inicio'
  }
};

export function NotFoundPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <main id="main" tabIndex={-1} style={{ maxWidth: 720, margin: '0 auto', padding: '72px 24px 96px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 40, color: '#0B1E4E', margin: '0 0 16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#4A5A7D', margin: '0 0 28px' }}>{t.body}</p>
        <a href={homePath(lang)} style={{ fontWeight: 700, color: '#007AA8' }}>
          {t.home}
        </a>
      </main>
    </>
  );
}

export const notFoundMetadata = {
  title: 'Page not found | Genesis Cleaning',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_ORIGIN}/404` }
};
