/**
 * Markup for the service and area pages.
 *
 * These pages carry none of the home page's runtime. The language toggle is two links and
 * the FAQ is a real <details>, so both still work with the bundle blocked; what JavaScript
 * there is arrives after first paint and only animates. The accordion is the inline script
 * at the bottom of this file, and the scroll reveals are components/subpage-motion.tsx,
 * which pulls GSAP in a chunk on the visitor's first scroll. Nothing above the fold waits
 * on either.
 *
 * The chrome below is a deliberate second implementation of the home page's header and
 * footer rather than a shared one: SITE_HTML is a single translated string built for one
 * page with in-page anchors, and threading per-page hrefs and per-page language targets
 * through it would have cost more than the hundred lines here. If the brand changes, both
 * change.
 */
import 'server-only';
import { iconSprite, icon } from './icon-sprite';
import { SOCIAL_PROFILES } from './social';
import { WA_TEXT, type Lang } from './i18n';
import { areasIndexPath, homePath, otherLang, pricingPath, servicePath, servicesIndexPath } from './routes';
import type { Copy } from './page-types';
import type { IndexCopy } from './index-pages';

const PHONE_DISPLAY = '(882) 930-0319';
const PHONE_HREF = 'tel:+18829300319';
const EMAIL = 'service@gcscleaning.net';
const waHref = (lang: Lang, text?: string) =>
  `https://wa.me/18829300319?text=${encodeURIComponent(text ?? WA_TEXT[lang])}`;

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Inline markdown links plus newline bullets, so draft bodies can carry one hard link. */
function rich(s: string) {
  const linked = esc(s).replace(
    /\[([^\]]+)\]\((\/[A-Za-z0-9\-\/#?]+)\)/g,
    '<a href="$2" style="color:#007AA8;font-weight:700">$1</a>'
  );
  if (!s.includes('\n- ')) return linked.replace(/\n/g, '<br>');
  const [lead, ...rest] = linked.split('\n- ');
  const items = rest
    .map(item => `<li style="margin:0 0 8px">${item}</li>`)
    .join('');
  return `${lead}<ul style="margin:12px 0 0;padding:0 0 0 18px;color:#4A5A7D">${items}</ul>`;
}

/**
 * Chrome copy. The home page keeps its strings in SITE_HTML and lib/i18n.ts because they
 * are translated out of the markup; here both languages are just written down.
 */
const UI: Record<Lang, Record<string, string>> = {
  en: {
    skip: 'Skip to content',
    home: 'Home',
    services: 'Services',
    areas: 'Service areas',
    pricing: 'Pricing',
    quote: 'Get a Free Quote',
    call: `Call ${PHONE_DISPLAY}`,
    email: 'Email',
    breadcrumb: 'Breadcrumb',
    mainNav: 'Main',
    footerNav: 'Footer',
    langGroup: 'Language',
    serviceEyebrow: 'Our services',
    areaEyebrow: 'Service area',
    faqH2: 'Questions people ask',
    ctaH2: 'Ready for a cleaner space?',
    ctaSub: 'Tell us about your home, office or job site and we will get you a quote.',
    relatedServices: 'Other services we offer',
    relatedAreas: 'Counties we cover',
    townsH2: 'Towns we work in',
    everywhereH2: 'Available across five counties',
    everywhereBody:
      'This service is offered everywhere we work: Essex, Union, Morris, Middlesex and Hudson County, New Jersey.',
    servedH2: 'Every service, in this county',
    servedBody: 'All twelve services are available here. Pick the one you need or call and describe the job.',
    lang: 'Language',
    tag:
      'Professional cleaning, trust and quality for homes and businesses across Essex, Union, Morris, Middlesex and Hudson County, NJ. Los detalles hacen la diferencia.',
    copy: '© 2026 Genesis Cleaning Service LLC. All rights reserved.',
    spanish: 'Aquí se habla español',
    menu: 'Open menu',
    house: 'House cleaning',
    commercial: 'Commercial cleaning'
  },
  es: {
    skip: 'Saltar al contenido',
    home: 'Inicio',
    services: 'Servicios',
    areas: 'Áreas de servicio',
    pricing: 'Precios',
    quote: 'Cotización gratis',
    call: `Llama al ${PHONE_DISPLAY}`,
    email: 'Correo',
    breadcrumb: 'Ruta de navegación',
    mainNav: 'Principal',
    footerNav: 'Pie de página',
    langGroup: 'Idioma',
    serviceEyebrow: 'Nuestros servicios',
    areaEyebrow: 'Área de servicio',
    faqH2: 'Preguntas que nos hacen',
    ctaH2: '¿Listo para un espacio más limpio?',
    ctaSub: 'Cuéntanos sobre tu casa, tu oficina o tu obra y te preparamos una cotización.',
    relatedServices: 'Otros servicios que ofrecemos',
    relatedAreas: 'Condados que cubrimos',
    townsH2: 'Pueblos donde trabajamos',
    everywhereH2: 'Disponible en los cinco condados',
    everywhereBody:
      'Este servicio se ofrece en todo lo que cubrimos: los condados de Essex, Union, Morris, Middlesex y Hudson, Nueva Jersey.',
    servedH2: 'Todos los servicios, en este condado',
    servedBody: 'Los doce servicios están disponibles aquí. Elige el que necesitas o llama y descríbenos el trabajo.',
    lang: 'Idioma',
    tag:
      'Limpieza profesional, confianza y calidad para casas y negocios en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Los detalles hacen la diferencia.',
    copy: '© 2026 Genesis Cleaning Service LLC. Todos los derechos reservados.',
    spanish: 'Aquí se habla español',
    menu: 'Abrir menú',
    house: 'Limpieza de casas',
    commercial: 'Limpieza comercial'
  }
};

export type RelatedLink = { href: string; label: string; icon: string };

export type PageKind = 'service' | 'area';

export type Crumb = { href?: string; label: string };

export type SubpageInput = {
  lang: Lang;
  kind: PageKind;
  copy: Copy;
  /** Symbol id for the badge beside the h1. */
  icon: string;
  /** Basename under /assets/services, or null for the shared area photograph. */
  image: string | null;
  imageAlt: string;
  /** Area pages only. */
  towns?: string[];
  townsH2?: string;
  townsHelper?: string;
  related: RelatedLink[];
  relatedH2: string;
  relatedHelper?: string;
  counties?: RelatedLink[];
  countiesH2?: string;
  crumbs?: Crumb[];
  waText?: string;
  eyebrow?: string;
  ctaH2?: string;
  ctaSub?: string;
  coverageH2?: string;
  coverageBody?: string;
  coverageHref?: string;
  showQuoteForm?: boolean;
  mobileBar?: boolean;
  /** Bottom conversion band includes Email. City/house/commercial leave this false. */
  ctaEmail?: boolean;
  /** This page's own path, used by the header logo link and the breadcrumb. */
  path: string;
  /** The same page in the other language. */
  altPath: string;
};

// --- chrome ---------------------------------------------------------------------------

function header(input: SubpageInput) {
  const { lang, altPath, path } = input;
  const t = UI[lang];
  const enHref = lang === 'en' ? path : altPath;
  const esHref = lang === 'es' ? path : altPath;
  const knob = lang === 'en' ? 'left:3px' : 'right:3px';
  const pill = (code: 'EN' | 'ES', href: string, active: boolean) =>
    `<a href="${href}" hreflang="${code.toLowerCase()}"${active ? ' aria-current="true"' : ''} style="position:relative;z-index:1;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:7px 13px;border-radius:999px;color:${active ? '#fff' : '#56658A'}">${code}</a>`;

  return `<header style="position:sticky;top:0;z-index:60;background:rgba(255,255,255,.97);border-bottom:1px solid #E3ECF3">
  <div style="max-width:1240px;margin:0 auto;padding:0 24px;height:74px;display:flex;align-items:center;gap:28px">
    <a href="${homePath(lang)}" style="display:flex;align-items:center;gap:12px;flex:0 0 auto">
      <img src="/assets/gcs-badge-96.webp" alt="Genesis Cleaning Service LLC logo" width="46" height="46" decoding="async" style="width:46px;height:46px;border-radius:50%;box-shadow:0 3px 12px rgba(11,30,78,.2)">
      <span style="display:flex;flex-direction:column;gap:3px">
        <span style="font-family:Outfit,sans-serif;font-weight:700;font-size:15px;line-height:1;color:#0B1E4E;letter-spacing:.01em">Genesis Cleaning Service</span>
        <span style="font-size:9.5px;font-weight:700;letter-spacing:.22em;color:#007AA8;line-height:1">LLC</span>
      </span>
    </a>
    <nav data-desk="1" aria-label="${esc(t.mainNav)}" style="display:flex;align-items:center;gap:26px;margin-left:auto">
      <a href="${homePath(lang)}" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60">${esc(t.home)}</a>
      <a href="${servicesIndexPath(lang)}" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60">${esc(t.services)}</a>
      <a href="${areasIndexPath(lang)}" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60">${esc(t.areas)}</a>
      <a href="${pricingPath(lang)}" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60">${esc(t.pricing)}</a>
      <a href="${homePath(lang)}#contact" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60">${lang === 'es' ? 'Contacto' : 'Contact'}</a>
    </nav>
    <div style="display:flex;align-items:center;gap:14px;margin-left:auto" data-headend="1">
      <div role="group" aria-label="${esc(t.langGroup)}" style="position:relative;display:flex;align-items:center;background:#EFF5F9;border-radius:999px;padding:3px;overflow:hidden">
        <span aria-hidden="true" style="position:absolute;top:3px;bottom:3px;${knob};width:calc(50% - 3px);border-radius:999px;background:#0B1E4E"></span>
        ${pill('EN', enHref, lang === 'en')}${pill('ES', esHref, lang === 'es')}
      </div>
      <a data-desk="1" href="${waHref(lang, input.waText)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;background:#D42A80;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 18px rgba(212,42,128,.32)">
        ${icon('i-bold-chat-circle-dots', 17)}<span>${esc(t.quote)}</span>
      </a>
    </div>
    <button type="button" id="gcs-burger" data-mob="1" aria-expanded="false" aria-controls="gcs-mobnav" aria-label="${esc(t.menu)}" style="margin-left:auto;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;border:1px solid #DCE7F0;background:#fff;color:#0B1E4E;cursor:pointer">
      ${icon('i-bold-list', 22)}
    </button>
  </div>
  <div id="gcs-mobnav" style="display:none;border-top:1px solid #E3ECF3;background:#fff;padding:18px 24px 24px">
    <nav aria-label="${esc(t.mainNav)}" style="display:flex;flex-direction:column;gap:2px">
      <a href="${homePath(lang)}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.home)}</a>
      <a href="${servicesIndexPath(lang)}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.services)}</a>
      <a href="${servicePath(lang, 'house-cleaning')}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.house)}</a>
      <a href="${servicePath(lang, 'commercial-cleaning')}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.commercial)}</a>
      <a href="${areasIndexPath(lang)}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.areas)}</a>
      <a href="${pricingPath(lang)}" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${esc(t.pricing)}</a>
      <a href="${homePath(lang)}#contact" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8">${lang === 'es' ? 'Contacto' : 'Contact'}</a>
    </nav>
  </div>
</header>`;
}

function breadcrumb(input: SubpageInput) {
  const { lang, kind, copy } = input;
  const t = UI[lang];
  const sep = `<span aria-hidden="true" style="color:#9DB0CE">/</span>`;
  const crumb = (href: string, label: string) =>
    `<a href="${href}" style="color:#4A5A7D;font-weight:600">${esc(label)}</a>`;
  const items = input.crumbs?.length
    ? input.crumbs
    : [
        { href: homePath(lang), label: t.home },
        {
          href: kind === 'service' ? servicesIndexPath(lang) : areasIndexPath(lang),
          label: kind === 'service' ? t.services : t.areas
        },
        { label: copy.name }
      ];
  const html = items
    .map((item, i) => {
      const last = i === items.length - 1;
      const node = !item.href
        ? `<span style="color:#0B1E4E;font-weight:700">${esc(item.label)}</span>`
        : last
          ? `<a href="${item.href}" aria-current="page" style="color:#0B1E4E;font-weight:700">${esc(item.label)}</a>`
          : crumb(item.href, item.label);
      return i ? `${sep}${node}` : node;
    })
    .join('');
  return `<nav aria-label="${esc(t.breadcrumb)}" style="max-width:1240px;margin:0 auto;padding:18px 24px 0;display:flex;flex-wrap:wrap;align-items:center;gap:9px;font-size:13.5px">${html}</nav>`;
}

function footer(input: SubpageInput) {
  const { lang, altPath } = input;
  const t = UI[lang];
  const social = SOCIAL_PROFILES.map(
    p =>
      `<a href="${p.href}" target="_blank" rel="me noopener" aria-label="${p.name}" title="${p.name}" style="display:inline-flex;color:inherit">${icon(p.icon, 21)}</a>`
  ).join('');
  return `<footer style="background:#071336;color:#8FA5CC">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(44px,5vw,64px) 24px 32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:36px;align-items:start">
    <div>
      <img src="/assets/gcs-logo-navy-580.webp" srcset="/assets/gcs-logo-navy-290.webp 290w, /assets/gcs-logo-navy-580.webp 580w" sizes="290px" alt="Genesis Cleaning Service LLC" width="580" height="258" loading="lazy" decoding="async" style="width:100%;max-width:290px;height:auto;display:block;margin:0 0 16px">
      <p style="font-size:14.5px;line-height:1.6;margin:0;max-width:34ch">${esc(t.tag)}</p>
    </div>
    <nav aria-label="${esc(t.footerNav)}" style="display:flex;flex-direction:column;gap:11px">
      <a href="${homePath(lang)}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${esc(t.home)}</a>
      <a href="${servicesIndexPath(lang)}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${esc(t.services)}</a>
      <a href="${areasIndexPath(lang)}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${esc(t.areas)}</a>
      <a href="${pricingPath(lang)}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${esc(t.pricing)}</a>
      <a href="${homePath(lang)}#contact" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${lang === 'es' ? 'Contacto' : 'Contact'}</a>
    </nav>
    <div style="display:flex;flex-direction:column;gap:11px">
      <a href="${PHONE_HREF}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${PHONE_DISPLAY}</a>
      <a href="mailto:${EMAIL}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${EMAIL}</a>
      <a href="${altPath}" hreflang="${otherLang(lang)}" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">${lang === 'en' ? 'Español' : 'English'}</a>
      <span style="display:inline-flex;align-items:center;gap:14px;margin-top:6px">${social}</span>
    </div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,.09)">
    <p style="max-width:1240px;margin:0 auto;padding:20px 24px;font-size:13px;color:#7E92B8">${esc(t.copy)}</p>
  </div>
</footer>`;
}

// --- body -----------------------------------------------------------------------------

function heroFigure(input: SubpageInput) {
  const { image, imageAlt } = input;
  if (!image) {
    return `<picture>
      <source type="image/avif" srcset="/assets/gcs-why-480.avif 480w, /assets/gcs-why-768.avif 768w, /assets/gcs-why-948.avif 948w" sizes="(max-width:1024px) 92vw, 44vw">
      <img src="/assets/gcs-why-948.webp" srcset="/assets/gcs-why-480.webp 480w, /assets/gcs-why-768.webp 768w, /assets/gcs-why-948.webp 948w" sizes="(max-width:1024px) 92vw, 44vw" alt="${esc(imageAlt)}" width="948" height="711" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block">
    </picture>`;
  }
  // The service photographs are generated at 480w and 800w by scripts/images.mjs, 16:10.
  const set = (ext: string) =>
    [480, 800].map(w => `/assets/services/${image}-${w}.${ext} ${w}w`).join(', ');
  return `<picture>
      <source type="image/avif" srcset="${set('avif')}" sizes="(max-width:1024px) 92vw, 44vw">
      <img src="/assets/services/${image}-800.webp" srcset="${set('webp')}" sizes="(max-width:1024px) 92vw, 44vw" alt="${esc(imageAlt)}" width="800" height="500" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block">
    </picture>`;
}

function hero(input: SubpageInput) {
  const { lang, kind, copy } = input;
  const t = UI[lang];
  const eyebrow = input.eyebrow ?? (kind === 'service' ? t.serviceEyebrow : t.areaEyebrow);
  return `<section aria-labelledby="page-h" style="position:relative;overflow:hidden;background:linear-gradient(178deg,#FFFFFF 0%,#F3FAFD 58%,#EAF6FC 100%)">
  <div aria-hidden="true" style="position:absolute;top:-180px;right:-140px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(0,169,224,.20),rgba(0,169,224,0) 68%)"></div>
  <div data-split="1" style="position:relative;max-width:1240px;margin:0 auto;padding:clamp(30px,4vw,52px) 24px clamp(56px,7vw,88px);display:grid;grid-template-columns:1.06fr .94fr;gap:clamp(32px,4vw,60px);align-items:center">
    <div>
      <p data-anim="eyebrow" style="display:inline-flex;align-items:center;gap:9px;margin:0 0 22px;background:#fff;border:1px solid #CFE9F5;color:#0B4A63;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(11,30,78,.06)">
        ${icon(input.icon, 16, 'color:#00A9E0')}${esc(eyebrow)}
      </p>
      <h1 id="page-h" data-anim="sub" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(32px,4.4vw,52px);line-height:1.06;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 20px;text-wrap:balance">${esc(copy.h1)}</h1>
      <p data-anim="cta" style="font-size:clamp(16.5px,1.5vw,18.5px);line-height:1.62;color:#4A5A7D;max-width:54ch;margin:0 0 12px">${esc(copy.intro)}</p>
      <p data-anim="cta" style="font-size:14px;font-weight:700;color:#0B4A63;margin:0 0 28px">${esc(t.spanish)}</p>
      <div data-anim="cta" style="display:flex;flex-wrap:wrap;gap:12px">
        <a href="${waHref(lang, input.waText)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#D42A80;color:#fff;font-weight:700;font-size:15.5px;padding:15px 26px;border-radius:999px;box-shadow:0 8px 22px rgba(212,42,128,.32)">
          ${icon('i-bold-chat-circle-dots', 18)}<span>${esc(t.quote)}</span>
        </a>
        <a href="${PHONE_HREF}" style="display:inline-flex;align-items:center;gap:10px;background:#fff;color:#0B1E4E;border:1.5px solid #CFE0EC;font-weight:700;font-size:15.5px;padding:15px 26px;border-radius:999px">
          ${icon('i-bold-phone-call', 18, 'color:#007AA8')}<span>${esc(t.call)}</span>
        </a>
        ${input.showQuoteForm ? `<a href="#quote" style="display:inline-flex;align-items:center;gap:10px;background:#fff;color:#007AA8;border:1.5px solid #CFE0EC;font-weight:700;font-size:15.5px;padding:15px 26px;border-radius:999px">${esc(lang === 'es' ? 'Formulario corto' : 'Short form')}</a>` : ''}
      </div>
    </div>
    <div style="border-radius:26px;overflow:hidden;aspect-ratio:${input.image ? '16/10' : '4/3'};box-shadow:0 26px 60px rgba(11,30,78,.16)" data-anim="img">${heroFigure(input)}</div>
  </div>
</section>`;
}

function sections(input: SubpageInput) {
  const blocks = input.copy.sections
    .map(
      (s, i) => `<article data-reveal="0" style="padding:${i ? '30px' : '0'} 0 0">
      <h2 style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(22px,2.4vw,30px);line-height:1.16;letter-spacing:-.015em;color:#0B1E4E;margin:0 0 12px;text-wrap:balance">${esc(s.h2)}</h2>
      <div style="font-size:16.5px;line-height:1.68;color:#4A5A7D;margin:0;max-width:64ch">${rich(s.body)}</div>
    </article>`
    )
    .join('');
  return `<div>${blocks}</div>`;
}

function includes(input: SubpageInput) {
  const { copy } = input;
  if (!copy.includes.length) return '';
  const items = copy.includes
    .map(
      line => `<li style="display:flex;align-items:flex-start;gap:12px;padding:13px 0;border-bottom:1px solid #E7EFF6">
        ${icon('i-bold-seal-check', 19, 'color:#007AA8;margin-top:2px')}<span style="font-size:15.5px;line-height:1.55;color:#2A3A60">${esc(line)}</span>
      </li>`
    )
    .join('');
  return `<aside data-reveal="0" style="background:#fff;border:1px solid #DFEAF3;border-radius:24px;padding:clamp(24px,3vw,34px);box-shadow:0 14px 38px rgba(11,30,78,.06)">
    <h2 style="font-family:Outfit,sans-serif;font-weight:800;font-size:21px;line-height:1.2;color:#0B1E4E;margin:0 0 8px">${esc(copy.includesH2)}</h2>
    <ul style="list-style:none;margin:10px 0 0;padding:0">${items}</ul>
  </aside>`;
}

function townList(input: SubpageInput) {
  if (!input.towns?.length) return '';
  const t = UI[input.lang];
  const chips = input.towns
    .map(
      town =>
        `<li style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #DFEAF3;border-radius:999px;padding:9px 16px;font-size:14.5px;font-weight:600;color:#2A3A60">${icon('i-bold-map-pin-area', 15, 'color:#007AA8')}${esc(town)}</li>`
    )
    .join('');
  return `<section aria-labelledby="towns-h" style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,56px) 24px 0">
    <h2 id="towns-h" data-reveal="0" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.14;color:#0B1E4E;margin:0 0 8px">${esc(input.townsH2 ?? t.townsH2)}</h2>
    ${input.townsHelper ? `<p data-reveal="0" style="font-size:15px;color:#4A5A7D;margin:0 0 16px">${esc(input.townsHelper)}</p>` : ''}
    <ul data-reveal="0" style="list-style:none;display:flex;flex-wrap:wrap;gap:10px;margin:0;padding:0">${chips}</ul>
  </section>`;
}

function coverageNote(input: SubpageInput) {
  const t = UI[input.lang];
  const isService = input.kind === 'service';
  const h2 = input.coverageH2 ?? (isService ? t.everywhereH2 : t.servedH2);
  const body = input.coverageBody ?? (isService ? t.everywhereBody : t.servedBody);
  const link = input.coverageHref
    ? `<p style="margin:14px 0 0"><a href="${input.coverageHref}" style="color:#9FE6FF;font-weight:700">${esc(body)}</a></p>`
    : `<p style="font-size:16px;line-height:1.62;margin:0;max-width:62ch">${esc(body)}</p>`;
  return `<section style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,56px) 24px 0">
    <div data-reveal="0" style="background:linear-gradient(140deg,#0B1E4E,#071336);color:#C7D6EE;border-radius:24px;padding:clamp(26px,3vw,38px)">
      <h2 style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(21px,2.2vw,27px);line-height:1.18;color:#fff;margin:0 0 10px">${esc(h2)}</h2>
      ${input.coverageHref ? '' : ''}${link}
    </div>
  </section>`;
}

function related(input: SubpageInput) {
  const cards = input.related
    .map(
      link => `<a href="${link.href}" data-reveal="0" style="display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #DFEAF3;border-radius:16px;padding:16px 18px;font-size:15px;font-weight:700;color:#0B1E4E;transition:border-color .18s ease,transform .18s ease" style-hover="border-color:#00A9E0;transform:translateY(-2px)">
        ${icon(link.icon, 20, 'color:#007AA8;flex:none')}<span>${esc(link.label)}</span>
      </a>`
    )
    .join('');
  const helper = input.relatedHelper
    ? `<p style="font-size:15px;color:#4A5A7D;margin:12px 0 0">${esc(input.relatedHelper)}</p>`
    : '';
  const counties = input.counties?.length
    ? `<section aria-labelledby="co-h" style="max-width:1240px;margin:0 auto;padding:clamp(28px,3vw,40px) 24px 0">
    <h2 id="co-h" data-reveal="0" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.14;color:#0B1E4E;margin:0 0 20px">${esc(input.countiesH2 ?? UI[input.lang].relatedAreas)}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px">${input.counties
      .map(
        link => `<a href="${link.href}" data-reveal="0" style="display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #DFEAF3;border-radius:16px;padding:16px 18px;font-size:15px;font-weight:700;color:#0B1E4E">${icon(link.icon, 20, 'color:#007AA8;flex:none')}<span>${esc(link.label)}</span></a>`
      )
      .join('')}</div>
  </section>`
    : '';
  if (!input.related.length) return counties;
  return `<section aria-labelledby="rel-h" style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,56px) 24px 0">
    <h2 id="rel-h" data-reveal="0" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.14;color:#0B1E4E;margin:0 0 20px">${esc(input.relatedH2)}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px">${cards}</div>
    ${helper}
  </section>${counties}`;
}

/**
 * Same accordion as the home page, down to the durations and the easing curves.
 *
 * The markup is deliberately identical — `data-faq-item`, `data-faq-trigger`,
 * `data-faq-answer`, `data-faq-content`, `data-faq-icon` — so the rules already in
 * app/globals.css (marker removed, icon rotation, the `data-faq-motion` opt-out) apply here
 * without a second copy, and so the two accordions cannot drift apart visually.
 */
function faq(input: SubpageInput) {
  const t = UI[input.lang];
  const items = input.copy.faq
    .map((entry, i) => {
      const n = i + 1;
      return `<details data-faq-item="${n}" data-reveal="0" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
      <summary id="faq-q-${n}" data-faq-trigger="${n}" aria-controls="faq-a-${n}" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
        <span>${esc(entry.q)}</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
      </summary>
      <div id="faq-a-${n}" data-faq-answer="1" role="region" aria-labelledby="faq-q-${n}" style="overflow:hidden">
        <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0">${esc(entry.a)}</p></div>
      </div>
    </details>`;
    })
    .join('');
  return `<section aria-labelledby="faq-h" id="faq" style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,56px) 24px 0">
    <h2 id="faq-h" data-reveal="0" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.14;color:#0B1E4E;margin:0 0 22px">${esc(t.faqH2)}</h2>
    <div data-faq-list="1" style="max-width:900px;display:grid;gap:12px">${items}</div>
  </section>`;
}

function cta(input: SubpageInput) {
  const { lang } = input;
  const t = UI[lang];
  return `<section aria-labelledby="cta-h" id="contact" style="max-width:1240px;margin:clamp(48px,6vw,80px) auto 0;padding:0 24px clamp(56px,6vw,88px)">
    <div data-reveal="0" style="background:linear-gradient(140deg,#0B1E4E,#071336);border-radius:28px;padding:clamp(32px,4vw,54px);text-align:center">
      <p style="display:inline-flex;align-items:center;gap:9px;margin:0 0 16px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#9FE6FF;font-size:13px;font-weight:700;padding:8px 15px;border-radius:999px">${icon('i-bold-chats-circle', 15)}${esc(t.spanish)}</p>
      <h2 id="cta-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(26px,3.2vw,40px);line-height:1.1;color:#fff;margin:0 0 14px;text-wrap:balance">${esc(input.ctaH2 ?? t.ctaH2)}</h2>
      <p style="font-size:16.5px;line-height:1.6;color:#C7D6EE;margin:0 auto 28px;max-width:52ch">${esc(input.ctaSub ?? t.ctaSub)}</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
        <a href="${waHref(lang, input.waText)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:16px 28px;border-radius:999px;box-shadow:0 10px 26px rgba(212,42,128,.36)">${icon('i-bold-chat-circle-dots', 18)}<span>${esc(t.quote)}</span></a>
        <a href="${PHONE_HREF}" style="display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.34);font-weight:700;font-size:16px;padding:16px 28px;border-radius:999px">${icon('i-bold-phone-call', 18)}<span>${esc(t.call)}</span></a>
        ${input.ctaEmail === false ? '' : `<a href="mailto:${EMAIL}" style="display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.34);font-weight:700;font-size:16px;padding:16px 28px;border-radius:999px">${icon('i-bold-envelope-simple', 18)}<span>${esc(t.email)}</span></a>`}
      </div>
    </div>
  </section>`;
}

/**
 * The FAQ accordion, as the one script these pages load.
 *
 * The home page animates this with GSAP inside SiteRuntime. Importing that here would drag
 * in the motion bundle, Lenis, ScrollTrigger, the review modal and the language toggle to
 * animate a height — so this is the same animation written against the Web Animations API,
 * with the durations and curves transcribed from `toggleFaq` in components/site-runtime.tsx
 * (0.95s power3.out on the panel, 0.48s power2.out on the content at a 36% delay, the 45°
 * icon turn with its overshoot). GSAP's power2/power3 are cubic and quartic; the
 * cubic-beziers below are those curves.
 *
 * It stays out of the way in three cases, and in every one of them the native <details>
 * still opens: no JavaScript, a browser without `animate()`, and reduced motion — that last
 * one matches the home page, where `lite` mode returns before any tween.
 *
 * Keep this free of `<` so it can never close its own script tag.
 */
const FAQ_MOTION = `(function(){
var d=document,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)');
var OUT3='cubic-bezier(.165,.84,.44,1)',OUT2='cubic-bezier(.215,.61,.355,1)',IN2='cubic-bezier(.55,.055,.675,.19)',INOUT2='cubic-bezier(.645,.045,.355,1)';
function stop(el){if(el&&el.getAnimations)el.getAnimations().forEach(function(a){a.cancel()})}
function settle(a,fn){if(a&&a.finished)a.finished.then(fn,function(){})}
function remeasure(){if(window.ScrollTrigger&&window.ScrollTrigger.refresh)window.ScrollTrigger.refresh()}
d.addEventListener('click',function(e){
 var t=e.target;
 if(!t||!t.closest)return;
 var trigger=t.closest('[data-faq-trigger]');
 if(!trigger)return;
 var item=trigger.closest('[data-faq-item]');
 if(!item)return;
 var answer=item.querySelector('[data-faq-answer]');
 if(!answer||!answer.animate||(rm&&rm.matches))return;
 var content=item.querySelector('[data-faq-content]'),ic=item.querySelector('[data-faq-icon]');
 e.preventDefault();
 var isOpen=item.dataset.faqState?item.dataset.faqState==='open':item.open;
 var open=!isOpen;
 stop(answer);stop(content);stop(ic);
 item.dataset.faqMotion='gsap';
 item.dataset.faqState=open?'open':'closed';
 if(open){
  item.open=true;
  var h=answer.scrollHeight;
  answer.style.height=h+'px';
  settle(answer.animate([{height:'0px'},{height:h+'px'}],{duration:950,easing:OUT3}),function(){
   if(item.dataset.faqState==='open')answer.style.height='auto';
   remeasure();
  });
  if(content)content.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:480,delay:342,easing:OUT2,fill:'backwards'});
  if(ic)ic.animate([
   {transform:'rotate(0deg) scale(1)',easing:OUT2},
   {transform:'rotate(45deg) scale(1.1)',offset:0.388,easing:OUT2},
   {transform:'rotate(45deg) scale(1)'}
  ],{duration:618});
  return;
 }
 var from=answer.offsetHeight;
 answer.style.height='0px';
 settle(answer.animate([{height:from+'px'},{height:'0px'}],{duration:589,easing:INOUT2}),function(){
  if(item.dataset.faqState==='closed'){item.open=false;answer.style.height=''}
  remeasure();
 });
 if(content)content.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px)'}],{duration:280,easing:IN2});
 if(ic)ic.animate([
  {transform:'rotate(45deg) scale(1)',easing:IN2},
  {transform:'rotate(0deg) scale(0.92)',offset:0.46,easing:OUT2},
  {transform:'rotate(0deg) scale(1)'}
 ],{duration:522});
});
})()`;


function quoteForm(input: SubpageInput) {
  if (!input.showQuoteForm) return '';
  // Placeholder so pricing pages can inject the React #quote form without a duplicate.
  return `<!--QUOTE_FORM-->`;
}

function mobileBar(input: SubpageInput) {
  if (!input.mobileBar) return '';
  const { lang } = input;
  const t = UI[lang];
  return `<nav aria-label="${esc(t.quote)}" style="position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;background:#071336;padding:10px 12px calc(10px + env(safe-area-inset-bottom));gap:8px">
  <a href="${waHref(lang, input.waText)}" target="_blank" rel="noopener" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#D42A80;color:#fff;font-weight:700;font-size:14px;padding:12px 8px;border-radius:12px">${icon('i-bold-chat-circle-dots', 16)}<span>${esc(lang === 'es' ? 'Cotizar' : 'Quote')}</span></a>
  <a href="${PHONE_HREF}" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#0B1E4E;font-weight:700;font-size:14px;padding:12px 8px;border-radius:12px">${icon('i-bold-phone-call', 16)}<span>${esc(lang === 'es' ? 'Llamar' : 'Call')}</span></a>
  ${input.ctaEmail === false ? '' : `<a href="mailto:${EMAIL}" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#0B1E4E;font-weight:700;font-size:14px;padding:12px 8px;border-radius:12px">${icon('i-bold-envelope-simple', 16)}<span>${esc(t.email)}</span></a>`}
</nav>`;
}

/** Every symbol these pages can reference, so the sprite carries no more than it needs. */
function spriteFor(input: SubpageInput) {
  return iconSprite([
    input.icon,
    'i-bold-chat-circle-dots',
    'i-bold-list',
    'i-bold-chats-circle',
    'i-bold-phone-call',
    'i-bold-envelope-simple',
    'i-bold-seal-check',
    'i-bold-map-pin-area',
    ...input.related.map(link => link.icon),
    ...(input.counties ?? []).map(link => link.icon),
    ...SOCIAL_PROFILES.map(profile => profile.icon)
  ]);
}

const NAV_MOTION = `(function(){
var b=document.getElementById('gcs-burger');
var n=document.getElementById('gcs-mobnav');
if(!b||!n)return;
b.addEventListener('click',function(){
 var open=n.style.display==='block';
 n.style.display=open?'none':'block';
 b.setAttribute('aria-expanded',open?'false':'true');
});
n.addEventListener('click',function(e){
 var t=e.target;
 if(t&&t.closest&&t.closest('a')){n.style.display='none';b.setAttribute('aria-expanded','false')}
});
})()`;

export function subpageHtml(input: SubpageInput) {
  const t = UI[input.lang];
  const pad = input.mobileBar ? ' data-pagepad="1"' : '';
  return `<div id="top"${pad}>
<a class="gcs-skip" href="#main">${esc(t.skip)}</a>
${spriteFor(input)}
${header(input)}
<main id="main" tabindex="-1">
${breadcrumb(input)}
${hero(input)}
<section style="max-width:1240px;margin:0 auto;padding:clamp(40px,5vw,64px) 24px 0;display:grid;grid-template-columns:1.35fr .65fr;gap:clamp(28px,4vw,54px);align-items:start" data-split="1">
${sections(input)}
${includes(input)}
</section>
${input.kind === 'area' ? townList(input) : ''}
${coverageNote(input)}
${input.showQuoteForm ? quoteForm(input) : related(input)}
${input.showQuoteForm ? related(input) : quoteForm(input)}
${faq(input)}
${cta(input)}
</main>
${footer(input)}
${mobileBar(input)}
<script>${FAQ_MOTION}</script>
<script>${NAV_MOTION}</script>
</div>`;
}

// --- hub pages ---------------------------------------------------------------------------

export type IndexInput = {
  lang: Lang;
  kind: PageKind;
  copy: IndexCopy;
  /** Every service, or every county, as a card. */
  items: (RelatedLink & { blurb: string })[];
  path: string;
  altPath: string;
};

/**
 * /services and /areas. Same chrome as a detail page; the body is the card grid.
 *
 * It borrows SubpageInput's chrome helpers by handing them a minimal stand-in — the header,
 * the breadcrumb and the footer read only `lang`, `kind`, `copy.name`, `path` and
 * `altPath`, so a listing page can be described to them without inventing sections, a
 * checklist and an FAQ it does not have.
 */
export function indexPageHtml(input: IndexInput) {
  const t = UI[input.lang];
  const chrome: SubpageInput = {
    lang: input.lang,
    kind: input.kind,
    copy: {
      name: input.kind === 'service' ? t.services : t.areas,
      title: input.copy.title,
      desc: input.copy.desc,
      h1: input.copy.h1,
      intro: input.copy.intro,
      sections: [],
      includesH2: '',
      includes: [],
      faq: []
    },
    icon: input.kind === 'service' ? 'i-bold-sparkle' : 'i-bold-map-pin-area',
    image: null,
    imageAlt: '',
    related: input.items,
    relatedH2: input.copy.listH2,
    path: input.path,
    altPath: input.altPath
  };

  const cards = input.items
    .map(
      item => `<a href="${item.href}" data-reveal="0" style="display:flex;flex-direction:column;gap:9px;background:#fff;border:1px solid #DFEAF3;border-radius:20px;padding:22px 24px;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease" style-hover="border-color:#00A9E0;transform:translateY(-3px);box-shadow:0 18px 40px rgba(11,30,78,.10)">
      <span style="display:inline-flex;align-items:center;gap:11px">${icon(item.icon, 22, 'color:#007AA8;flex:none')}<span style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#0B1E4E">${esc(item.label)}</span></span>
      <span style="font-size:15px;line-height:1.6;color:#4A5A7D">${esc(item.blurb)}</span>
    </a>`
    )
    .join('');

  return `<div id="top">
<a class="gcs-skip" href="#main">${esc(t.skip)}</a>
${spriteFor(chrome)}
${header(chrome)}
<main id="main" tabindex="-1">
<nav aria-label="${esc(t.breadcrumb)}" style="max-width:1240px;margin:0 auto;padding:18px 24px 0;display:flex;flex-wrap:wrap;align-items:center;gap:9px;font-size:13.5px">
  <a href="${homePath(input.lang)}" style="color:#4A5A7D;font-weight:600">${esc(t.home)}</a><span aria-hidden="true" style="color:#9DB0CE">/</span><span style="color:#0B1E4E;font-weight:700">${esc(chrome.copy.name)}</span>
</nav>
<section aria-labelledby="page-h" style="background:linear-gradient(178deg,#FFFFFF 0%,#F3FAFD 58%,#EAF6FC 100%)">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(30px,4vw,52px) 24px clamp(40px,5vw,64px)">
    <h1 id="page-h" data-anim="sub" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(32px,4.4vw,52px);line-height:1.06;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 18px;max-width:20ch;text-wrap:balance">${esc(input.copy.h1)}</h1>
    <p data-anim="cta" style="font-size:clamp(16.5px,1.5vw,18.5px);line-height:1.62;color:#4A5A7D;max-width:60ch;margin:0">${esc(input.copy.intro)}</p>
  </div>
</section>
<section aria-labelledby="list-h" style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,56px) 24px 0">
  <h2 id="list-h" data-reveal="0" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.14;color:#0B1E4E;margin:0 0 22px">${esc(input.copy.listH2)}</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(288px,1fr));gap:14px">${cards}</div>
</section>
${cta(chrome)}
</main>
${footer(chrome)}
<script>${NAV_MOTION}</script>
</div>`;
}
