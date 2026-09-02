// Page markup as plain data, so lib/render.ts can turn it into the English and Spanish
// pages on the server without loading React, GSAP or CSS. SITE_HTML is the English
// source of truth; lib/i18n.ts holds the Spanish overrides, keyed by the data-i18n
// attributes inside SITE_HTML.
//
// This module is server-only: it must never be imported from a client component, or the
// ~96 KB string below ships in the browser bundle as well as in the HTML. Nothing here uses
// a Node builtin, so without this marker that mistake builds cleanly and only shows up as a
// heavier bundle; the import turns it into a build error instead.
import 'server-only';

import {
  HERO_AVIF_SRCSET,
  HERO_FALLBACK_SRC,
  HERO_HEIGHT,
  HERO_SIZES,
  HERO_WEBP_SRCSET,
  HERO_WIDTH
} from './hero-image';
import { ICON_SPRITE_ALL } from './icon-sprite';
import { BASE_LOCATION } from './service-area';
import { socialIconLinks } from './social';

export const SITE_HTML = `<div id="top" data-pagepad="1">
<a class="gcs-skip" href="#main" data-i18n="a11y.skip">Skip to content</a>
<div id="gcs-grain" aria-hidden="true"></div>
${ICON_SPRITE_ALL}

<header style="position:sticky;top:0;z-index:60;background:rgba(255,255,255,.97);border-bottom:1px solid #E3ECF3">
  <div id="gcs-progress" aria-hidden="true" style="position:absolute;left:0;bottom:-1px;height:2px;width:100%;transform:scaleX(0);transform-origin:0 50%;background:linear-gradient(90deg,#00A9E0,#D42A80)"></div>
  <div style="max-width:1240px;margin:0 auto;padding:0 24px;height:74px;display:flex;align-items:center;gap:28px">
    <a href="#top" style="display:flex;align-items:center;gap:12px;text-decoration:none;flex:0 0 auto">
      <img src="/assets/gcs-badge-96.webp" alt="Genesis Cleaning Service LLC logo" width="46" height="46" decoding="async" style="width:46px;height:46px;border-radius:50%;box-shadow:0 3px 12px rgba(11,30,78,.2)">
      <span style="display:flex;flex-direction:column;gap:3px">
        <span style="font-family:Outfit,sans-serif;font-weight:700;font-size:15px;line-height:1;color:#0B1E4E;letter-spacing:.01em">Genesis Cleaning Service</span>
        <span style="font-size:9.5px;font-weight:700;letter-spacing:.22em;color:#007AA8;line-height:1">LLC</span>
      </span>
    </a>

    <nav data-desk="1" aria-label="Main" style="display:flex;align-items:center;gap:26px;margin-left:auto">
      <a href="#top" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.home">Home</a>
      <a href="/services" data-eshref="/es/services" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.services">Services</a>
      <a href="/areas" data-eshref="/es/areas" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.areas">Service areas</a>
      <a href="#why" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.why">Why GCS</a>
      <a href="#faq" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.faq">FAQ</a>
      <a href="#contact" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.contact">Contact</a>
    </nav>

    <div data-desk="1" style="display:flex;align-items:center;gap:14px">
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:flex;align-items:center;background:#EFF5F9;border-radius:999px;padding:3px;overflow:hidden">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:3px;bottom:3px;left:3px;width:calc(50% - 3px);border-radius:999px;background:#0B1E4E"></span>
        <a href="/" hreflang="en" aria-current="true" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:7px 13px;border-radius:999px;background:transparent;color:#fff;transition:color .32s ease">EN</a>
        <a href="/es" hreflang="es" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:7px 13px;border-radius:999px;background:transparent;color:#56658A;transition:color .32s ease">ES</a>
      </div>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:9px;background:#D42A80;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 18px rgba(212,42,128,.32);transition:transform .18s ease, box-shadow .18s ease" style-hover="transform:translateY(-1px);box-shadow:0 10px 24px rgba(212,42,128,.4)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:17px;height:17px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
      </a>
    </div>

    <button type="button" id="gcs-burger" data-mob="1" data-action="toggleNav" aria-expanded="false" aria-controls="gcs-mobnav" data-i18n-aria="a11y.menu" aria-label="Open menu" style="margin-left:auto;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;border:1px solid #DCE7F0;background:#fff;color:#0B1E4E;cursor:pointer">
      <svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-list"/></svg>
    </button>
  </div>

  <div id="gcs-mobnav" style="display:none;border-top:1px solid #E3ECF3;background:#fff;padding:18px 24px 24px">
    <nav aria-label="Mobile" style="display:flex;flex-direction:column;gap:2px">
      <a href="#top" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.home">Home</a>
      <a href="#services" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.services">Services</a>
      <a href="#why" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.why">Why GCS</a>
      <a href="#faq" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.faq">FAQ</a>
      <a href="#contact" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.contact">Contact</a>
    </nav>
    <div style="display:flex;align-items:center;gap:12px;margin-top:20px">
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:flex;align-items:center;background:#EFF5F9;border-radius:999px;padding:4px;overflow:hidden">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:#0B1E4E"></span>
        <a href="/" hreflang="en" aria-current="true" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;padding:9px 16px;border-radius:999px;background:transparent;color:#fff;transition:color .32s ease">EN</a>
        <a href="/es" hreflang="es" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;padding:9px 16px;border-radius:999px;background:transparent;color:#56658A;transition:color .32s ease">ES</a>
      </div>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" data-action="closeNav" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:9px;background:#D42A80;color:#fff;font-weight:700;font-size:15px;padding:14px 18px;border-radius:999px">
        <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
      </a>
    </div>
  </div>
</header>

<main id="main" tabindex="-1">

<section aria-labelledby="hero-h" style="position:relative;overflow:hidden;background:linear-gradient(178deg,#FFFFFF 0%,#F3FAFD 58%,#EAF6FC 100%)">
  <div aria-hidden="true" data-blob="1" style="position:absolute;top:-180px;right:-140px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(0,169,224,.20),rgba(0,169,224,0) 68%)"></div>
  <div aria-hidden="true" data-blob="-1" style="position:absolute;bottom:-220px;left:-160px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle at 50% 50%,rgba(212,42,128,.13),rgba(212,42,128,0) 70%)"></div>

  <div data-split="1" style="position:relative;max-width:1240px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px clamp(56px,7vw,96px);display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(32px,4vw,64px);align-items:center">
    <div>
      <p data-anim="eyebrow" style="display:inline-flex;align-items:center;gap:9px;margin:0 0 22px;background:#fff;border:1px solid #CFE9F5;color:#0B4A63;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(11,30,78,.06)">
        <svg class="gi" aria-hidden="true" style="width:16px;height:16px;color:#00A9E0"><use href="#i-bold-chats-circle"/></svg>Aquí se habla español
      </p>
      <h1 id="hero-h" data-anim="h1" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(38px,5.4vw,66px);line-height:1.04;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 20px;text-wrap:balance">
        <span data-i18n="hero.h1a">House and commercial cleaning</span> <span style="color:#007AA8" data-i18n="hero.h1b">in New Jersey</span>
      </h1>
      <p data-anim="sub" style="font-size:clamp(16.5px,1.5vw,19px);line-height:1.6;color:#4A5A7D;max-width:52ch;margin:0 0 32px" data-i18n="hero.sub">Professional house cleaning, office cleaning and post-construction cleaning across Essex, Union, Morris, Middlesex and Hudson County, with attention to the details that make the difference.</p>
      <div data-anim="cta" style="display:flex;flex-wrap:wrap;gap:14px">
        <a data-wa="1" data-cta-solid="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:11px;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px;white-space:nowrap;box-shadow:0 10px 26px rgba(212,42,128,.34);transition:box-shadow .18s ease" data-tilt="1" style-hover="transform:translateY(-2px);box-shadow:0 14px 32px rgba(212,42,128,.42)" style-active="transform:translateY(1px)">
          <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-whatsapp-logo"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
        </a>
        <a href="tel:+18829300319" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;border:1.5px solid #C9DCEA;font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px;white-space:nowrap;transition:border-color .18s ease" data-tilt="1" style-hover="border-color:#00A9E0;transform:translateY(-2px)" style-active="transform:translateY(1px)">
          <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.call">Call (882) 930-0319</span>
        </a>
      </div>
    </div>

    <div style="position:relative">
      <div aria-hidden="true" style="position:absolute;inset:26px -22px -26px 26px;border-radius:32px;background:linear-gradient(140deg,#00A9E0,#7FE0F5 55%,#E8368F);opacity:.16"></div>
      <div data-anim="img" data-vel="1" data-depth-mask="1" style="position:relative;border-radius:26px;overflow:hidden;background:#EAF4FA;box-shadow:0 26px 60px rgba(11,30,78,.16);border:1px solid #DCEBF4;aspect-ratio:4/3.35;min-height:300px">
        <picture style="display:block;width:100%;height:100%">
          <source type="image/avif" srcset="${HERO_AVIF_SRCSET}" sizes="${HERO_SIZES}">
          <img src="${HERO_FALLBACK_SRC}" srcset="${HERO_WEBP_SRCSET}" sizes="${HERO_SIZES}" alt="Bright, freshly cleaned home interior in New Jersey" width="${HERO_WIDTH}" height="${HERO_HEIGHT}" fetchpriority="high" decoding="async" data-depth-image="1" style="width:100%;height:100%;object-fit:cover;display:block">
        </picture>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="vals-h" style="background:#fff;border-top:1px solid #EBF2F7;border-bottom:1px solid #EBF2F7">
  <h2 id="vals-h" class="gcs-sr" data-i18n="val.h2">What we stand for</h2>
  <div style="max-width:1240px;margin:0 auto;padding:clamp(34px,4vw,52px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:clamp(24px,3vw,44px)">
    <div data-val="0">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-seal-check"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.1.t">Professional</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.1.b">A careful, consistent process on every job, residential or commercial.</p>
    </div>
    <div data-val="1">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-handshake"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.2.t">Trust</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.2.b">Clear communication before, during and after the work is done.</p>
    </div>
    <div data-val="2">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-sparkle"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.3.t">Quality</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.3.b">We finish a space when it looks the way we would want our own to look.</p>
    </div>
    <div data-val="3">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#E8368F"><use href="#i-bold-magnifying-glass-plus"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.4.t">Attention to detail</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.4.b">Los detalles hacen la diferencia. The corners, edges and surfaces that usually get missed.</p>
    </div>
  </div>
</section>

<section id="services" aria-labelledby="services-h" style="background:#FBFDFE">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(64px,8vw,110px) 24px">
    <p data-reveal="0" style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#007AA8;margin:0 0 14px" data-i18n="svc.eyebrow">Our services</p>
    <h2 id="services-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 16px;max-width:17ch;text-wrap:balance" data-i18n="svc.h2">Twelve ways we keep a space clean</h2>
    <p data-reveal="0" style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:0 0 clamp(32px,4vw,52px);max-width:56ch" data-i18n="svc.sub">Twelve services across New Jersey, each one quoted against the space in front of us instead of a package you have to fit into.</p>

    <div data-svcgrid="1">
      <article data-svc-feature="1" data-svccard="1" data-reveal="1" style="position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(120deg,#E7F7FD 0%,#F8FCFE 60%,#FFFFFF 100%);border:1px solid #D3EBF6;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;overflow:hidden;background:#EAF4FA;min-height:230px">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-commercial-residential-480.avif 480w, /assets/services/gcs-svc-commercial-residential-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-commercial-residential-800.webp" srcset="/assets/services/gcs-svc-commercial-residential-480.webp 480w, /assets/services/gcs-svc-commercial-residential-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Bright open-plan living room and kitchen after a residential cleaning" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:13px;padding:clamp(26px,3vw,36px)">
          <span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:17px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:27px;height:27px;color:#00A9E0"><use href="#i-bold-house-line"/></svg>
          </span>
          <h3 style="font-family:Outfit,sans-serif;font-size:clamp(20px,2.1vw,25px);font-weight:700;line-height:1.2;color:#0B1E4E;margin:0"><a href="/services/residential-commercial-cleaning" data-eshref="/es/services/residential-commercial-cleaning" data-i18n="svc.1.t" style="color:inherit" data-navlink="1">Commercial & Residential Cleaning</a></h3>
          <p style="font-size:15.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="svc.1.b">The same crew for your house and for your place of business, booked as a standing visit or as a one-off, and worked room by room either way.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-window-480.avif 480w, /assets/services/gcs-svc-window-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-window-800.webp" srcset="/assets/services/gcs-svc-window-480.webp 480w, /assets/services/gcs-svc-window-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Gloved hand pulling a squeegee down a large window pane" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-app-window"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/window-cleaning" data-eshref="/es/services/window-cleaning" data-i18n="svc.2.t" style="color:inherit" data-navlink="1">Interior & Exterior Window Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.2.b">Glass washed on both faces, frames and sills included, until nothing stands between the room and the daylight.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-standard-480.avif 480w, /assets/services/gcs-svc-standard-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-standard-800.webp" srcset="/assets/services/gcs-svc-standard-480.webp 480w, /assets/services/gcs-svc-standard-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Person mopping the floor of a tidy, plant-filled living room" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-broom"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/standard-cleaning" data-eshref="/es/services/standard-cleaning" data-i18n="svc.3.t" style="color:inherit" data-navlink="1">Standard Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.3.b">The steady weekly or monthly pass that holds a place together between the heavier jobs.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-move-480.avif 480w, /assets/services/gcs-svc-move-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-move-800.webp" srcset="/assets/services/gcs-svc-move-480.webp 480w, /assets/services/gcs-svc-move-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Packing boxes in an empty room being prepared for a move" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-truck"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/move-in-move-out-cleaning" data-eshref="/es/services/move-in-move-out-cleaning" data-i18n="svc.4.t" style="color:inherit" data-navlink="1">Move-In & Move-Out Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.4.b">An empty unit brought back to move-in condition before the keys go to whoever is next.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-office-480.avif 480w, /assets/services/gcs-svc-office-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-office-800.webp" srcset="/assets/services/gcs-svc-office-480.webp 480w, /assets/services/gcs-svc-office-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Open-plan office with desks and meeting areas" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-buildings"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/office-cleaning" data-eshref="/es/services/office-cleaning" data-i18n="svc.5.t" style="color:inherit" data-navlink="1">Office Workplace Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.5.b">Desks, kitchens and floors handled early, late or overnight, so nobody has to work around us.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-apartment-480.avif 480w, /assets/services/gcs-svc-apartment-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-apartment-800.webp" srcset="/assets/services/gcs-svc-apartment-480.webp 480w, /assets/services/gcs-svc-apartment-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Living room of a bright modern apartment" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-building-apartment"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/apartment-condo-cleaning" data-eshref="/es/services/apartment-condo-cleaning" data-i18n="svc.6.t" style="color:inherit" data-navlink="1">Apartment & Condo Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.6.b">Careful work scaled to a smaller footprint, where every corner is close enough to notice.</p>
        </div>
      </article>

      <article data-svc-feature="1" data-svccard="1" data-reveal="1" style="position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(120deg,#E7F7FD 0%,#F8FCFE 60%,#FFFFFF 100%);border:1px solid #D3EBF6;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;overflow:hidden;background:#EAF4FA;min-height:230px">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-deep-480.avif 480w, /assets/services/gcs-svc-deep-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-deep-800.webp" srcset="/assets/services/gcs-svc-deep-480.webp 480w, /assets/services/gcs-svc-deep-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Steam cleaner lifting grime from tiled bathroom walls" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:13px;padding:clamp(26px,3vw,36px)">
          <span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:17px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:27px;height:27px;color:#00A9E0"><use href="#i-bold-sparkle"/></svg>
          </span>
          <h3 style="font-family:Outfit,sans-serif;font-size:clamp(20px,2.1vw,25px);font-weight:700;line-height:1.2;color:#0B1E4E;margin:0"><a href="/services/deep-cleaning" data-eshref="/es/services/deep-cleaning" data-i18n="svc.7.t" style="color:inherit" data-navlink="1">Deep Cleaning</a></h3>
          <p style="font-size:15.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="svc.7.b">For a place that has been let go, or one that takes heavy traffic every day: grout, window tracks, appliance interiors, baseboards and whatever has gathered behind them.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-construction-480.avif 480w, /assets/services/gcs-svc-construction-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-construction-800.webp" srcset="/assets/services/gcs-svc-construction-480.webp 480w, /assets/services/gcs-svc-construction-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Interior of a building under construction before final cleanup" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-hard-hat"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/construction-cleaning" data-eshref="/es/services/construction-cleaning" data-i18n="svc.8.t" style="color:inherit" data-navlink="1">Construction & Model Home Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.8.b">Drywall dust, adhesive marks and leftover debris cleared out so the unit can be shown or signed off.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-clubhouse-480.avif 480w, /assets/services/gcs-svc-clubhouse-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-clubhouse-800.webp" srcset="/assets/services/gcs-svc-clubhouse-480.webp 480w, /assets/services/gcs-svc-clubhouse-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Bright community clubhouse lounge with seating and tall windows" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-armchair"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/clubhouse-cleaning" data-eshref="/es/services/clubhouse-cleaning" data-i18n="svc.9.t" style="color:inherit" data-navlink="1">Clubhouse Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.9.b">Lounges, party rooms and amenity floors kept ready for whoever walks in next.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-gym-480.avif 480w, /assets/services/gcs-svc-gym-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-gym-800.webp" srcset="/assets/services/gcs-svc-gym-480.webp 480w, /assets/services/gcs-svc-gym-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Fitness centre floor lined with cardio and weight equipment" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-barbell"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/gym-cleaning" data-eshref="/es/services/gym-cleaning" data-i18n="svc.10.t" style="color:inherit" data-navlink="1">Gyms & Fitness Center Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.10.b">Machines, mats, mirrors and locker rooms wiped down wherever hands and skin land.</p>
        </div>
      </article>

      <article data-svc-feature="1" data-svccard="1" data-reveal="1" style="position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(120deg,#FFF2F8 0%,#FFFFFF 72%);border:1px solid #F6D8E7;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;overflow:hidden;background:#EAF4FA;min-height:230px">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-sanitizing-480.avif 480w, /assets/services/gcs-svc-sanitizing-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-sanitizing-800.webp" srcset="/assets/services/gcs-svc-sanitizing-480.webp 480w, /assets/services/gcs-svc-sanitizing-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Gloved hands disinfecting a countertop with spray and a cloth" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:13px;padding:clamp(26px,3vw,36px)">
          <span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:17px;background:#fff;box-shadow:0 8px 20px rgba(212,42,128,.24)">
            <svg class="gi" style="width:27px;height:27px;color:#E8368F"><use href="#i-bold-spray-bottle"/></svg>
          </span>
          <h3 style="font-family:Outfit,sans-serif;font-size:clamp(20px,2.1vw,25px);font-weight:700;line-height:1.2;color:#0B1E4E;margin:0"><a href="/services/sanitizing-disinfecting" data-eshref="/es/services/sanitizing-disinfecting" data-i18n="svc.11.t" style="color:inherit" data-navlink="1">Sanitizing & Disinfecting</a></h3>
          <p style="font-size:15.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="svc.11.b">Disinfection aimed where it counts: door handles, light switches, faucets, keyboards and the rest of what a day's worth of hands passes over.</p>
        </div>
      </article>

      <article data-svccard="1" data-reveal="1" style="display:flex;flex-direction:column;overflow:hidden;border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div data-svc-figure="1" style="position:relative;background:#EAF4FA;aspect-ratio:16/10">
          <picture style="display:block;width:100%;height:100%">
            <source type="image/avif" srcset="/assets/services/gcs-svc-vacation-rental-480.avif 480w, /assets/services/gcs-svc-vacation-rental-800.avif 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw">
            <img src="/assets/services/gcs-svc-vacation-rental-800.webp" srcset="/assets/services/gcs-svc-vacation-rental-480.webp 480w, /assets/services/gcs-svc-vacation-rental-800.webp 800w" sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" alt="Freshly made bed in a bright vacation rental bedroom" width="800" height="500" loading="lazy" decoding="async" data-svc-img="1" style="width:100%;height:100%;object-fit:cover;display:block">
          </picture>
          <span aria-hidden="true" style="position:absolute;left:18px;bottom:-24px;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 8px 20px rgba(0,169,224,.24)">
            <svg class="gi" style="width:24px;height:24px;color:#00A9E0"><use href="#i-bold-suitcase-rolling"/></svg>
          </span>
        </div>
        <div style="padding:40px 24px 26px">
          <h3 style="font-family:Outfit,sans-serif;font-size:18.5px;font-weight:700;line-height:1.25;color:#0B1E4E;margin:0 0 9px"><a href="/services/vacation-rental-cleaning" data-eshref="/es/services/vacation-rental-cleaning" data-i18n="svc.12.t" style="color:inherit" data-navlink="1">Vacation Rental Cleaning</a></h3>
          <p style="font-size:15px;line-height:1.58;color:#5A6A8C;margin:0" data-i18n="svc.12.b">Same-day turnarounds between bookings, linens and all, so the next arrival finds a finished room.</p>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="why" aria-labelledby="why-h" style="background:#fff;border-top:1px solid #EBF2F7">
  <div data-split="1" style="max-width:1240px;margin:0 auto;padding:clamp(64px,8vw,110px) 24px;display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(36px,5vw,72px);align-items:start">
    <div>
      <h2 id="why-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 20px;text-wrap:balance" data-i18n="why.h2">Why people call Genesis back</h2>
      <p style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:0 0 28px;max-width:40ch" data-i18n="why.sub">GCS is built around one idea, the one written on our logo: los detalles hacen la diferencia.</p>
      <div data-clip="1" data-vel="1" data-depth-mask="1" style="position:relative;border-radius:22px;overflow:hidden;border:1px solid #DCEBF4;background:#EAF4FA;aspect-ratio:4/3;box-shadow:0 18px 44px rgba(11,30,78,.1)">
        <picture style="display:block;width:100%;height:100%">
          <source type="image/avif" srcset="/assets/gcs-why-480.avif 480w, /assets/gcs-why-768.avif 768w, /assets/gcs-why-948.avif 948w" sizes="(max-width:1024px) 92vw, 46vw">
          <img src="/assets/gcs-why-948.webp" srcset="/assets/gcs-why-480.webp 480w, /assets/gcs-why-768.webp 768w, /assets/gcs-why-948.webp 948w" sizes="(max-width:1024px) 92vw, 46vw" alt="Genesis Cleaning Service team at work on a residential job" width="948" height="711" loading="lazy" decoding="async" data-depth-image="1" style="width:100%;height:100%;object-fit:cover;display:block">
        </picture>
      </div>
    </div>

    <ul style="list-style:none;margin:0;padding:0;display:grid;gap:14px">
      <li data-reveal="0" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-magnifying-glass-plus"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.1.t">Attention to detail</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.1.b">The finish is judged on the parts most people skip: baseboards, tracks, handles, edges.</p></div>
      </li>
      <li data-reveal="60" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-buildings"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.2.t">Homes and businesses</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.2.b">One team for your house, your office and the job site after construction.</p></div>
      </li>
      <li data-reveal="120" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-chats-circle"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.3.t">Bilingual service</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.3.b">English or Spanish, whichever you are most comfortable speaking.</p></div>
      </li>
      <li data-reveal="180" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-phone-call"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.4.t">Direct communication</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.4.b">Call or send a WhatsApp message and talk with the people who do the work.</p></div>
      </li>
      <li data-reveal="240" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-seal-check"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.5.t">Professional presentation</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.5.b">We arrive prepared, work carefully around your things and leave the space ready to use.</p></div>
      </li>
    </ul>
  </div>
</section>

<section id="faq" aria-labelledby="faq-h" style="background:#FBFDFE;border-top:1px solid #EBF2F7">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(64px,8vw,110px) 24px">
    <div style="max-width:680px;margin:0 0 clamp(32px,4vw,48px)">
      <p data-reveal="0" style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#007AA8;margin:0 0 14px" data-i18n="faq.eyebrow">Frequently asked questions</p>
      <h2 id="faq-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 18px;max-width:18ch;text-wrap:balance" data-i18n="faq.h2">Questions people ask before booking</h2>
      <p data-reveal="0" style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:0;max-width:58ch" data-i18n="faq.sub">Clear answers about our supplies, access, pets, cancellations and quotes.</p>
    </div>

    <div data-faq-list="1" style="max-width:900px;display:grid;gap:12px">
      <details data-faq-item="1" data-reveal="0" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
        <summary id="faq-q-1" data-action="toggleFaq" data-faq-trigger="1" aria-controls="faq-a-1" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
          <span data-i18n="faq.1.q">Do you bring the supplies?</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
        </summary>
        <div id="faq-a-1" data-faq-answer="1" role="region" aria-labelledby="faq-q-1" style="overflow:hidden">
          <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0" data-i18n="faq.1.a">Of course, we supply all the necessary top-quality cleaning equipment.</p></div>
        </div>
      </details>

      <details data-faq-item="2" data-reveal="60" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
        <summary id="faq-q-2" data-action="toggleFaq" data-faq-trigger="2" aria-controls="faq-a-2" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
          <span data-i18n="faq.2.q">Do I need to be home?</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
        </summary>
        <div id="faq-a-2" data-faq-answer="1" role="region" aria-labelledby="faq-q-2" style="overflow:hidden">
          <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0" data-i18n="faq.2.a">You don't need to be home for us to do the job; we take care of the cleaning.</p></div>
        </div>
      </details>

      <details data-faq-item="3" data-reveal="120" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
        <summary id="faq-q-3" data-action="toggleFaq" data-faq-trigger="3" aria-controls="faq-a-3" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
          <span data-i18n="faq.3.q">Are pets allowed?</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
        </summary>
        <div id="faq-a-3" data-faq-answer="1" role="region" aria-labelledby="faq-q-3" style="overflow:hidden">
          <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0" data-i18n="faq.3.a">It doesn't matter if you have pets; we can still take care of the cleaning.</p></div>
        </div>
      </details>

      <details data-faq-item="4" data-reveal="180" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
        <summary id="faq-q-4" data-action="toggleFaq" data-faq-trigger="4" aria-controls="faq-a-4" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
          <span data-i18n="faq.4.q">Are there cancellations?</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
        </summary>
        <div id="faq-a-4" data-faq-answer="1" role="region" aria-labelledby="faq-q-4" style="overflow:hidden">
          <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0" data-i18n="faq.4.a">You can cancel up to 24 hours in advance.</p></div>
        </div>
      </details>

      <details data-faq-item="5" data-reveal="240" style="background:#fff;border:1px solid #E3ECF3;border-radius:18px;box-shadow:0 8px 24px rgba(11,30,78,.05)">
        <summary id="faq-q-5" data-action="toggleFaq" data-faq-trigger="5" aria-controls="faq-a-5" style="display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;padding:22px 24px;font-family:Outfit,sans-serif;font-size:clamp(17px,1.8vw,20px);font-weight:700;line-height:1.3;color:#0B1E4E">
          <span data-i18n="faq.5.q">How does the pricing work?</span><span data-faq-icon="1" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:#EAF6FC;color:#007AA8;font-family:Manrope,sans-serif;font-size:24px;font-weight:400;line-height:1">+</span>
        </summary>
        <div id="faq-a-5" data-faq-answer="1" role="region" aria-labelledby="faq-q-5" style="overflow:hidden">
          <div data-faq-content="1" style="padding:0 24px 22px"><p style="font-size:15.5px;line-height:1.65;color:#5A6A8C;margin:0" data-i18n="faq.5.a">Pricing depends on the details of each job, so the price is provided in your quote.</p></div>
        </div>
      </details>
    </div>
  </div>
</section>

<section id="reviews" aria-labelledby="rev-h" style="background:linear-gradient(180deg,#F4FAFD 0%,#FFFFFF 72%);border-top:1px solid #E2EFF5;overflow:hidden">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(60px,7vw,100px) 24px 0">
    <p data-reveal="0" style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#007AA8;margin:0 0 14px" data-i18n="rev.eyebrow">Testimonials</p>
    <h2 id="rev-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 18px;max-width:20ch;text-wrap:balance" data-i18n="rev.h2">What people say about us</h2>
    <span data-reveal="0" aria-hidden="true" style="display:block;width:64px;height:4px;border-radius:2px;background:#00A9E0"></span>
    <p data-reveal="0" style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:20px 0 0;max-width:56ch" data-i18n="rev.sub">Homes, offices and job sites we have cleaned.</p>
  </div>

  <div data-marq-wrap="1" style="position:relative;margin-top:clamp(34px,4vw,48px);padding:6px 0 4px">
    <div id="gcs-track" style="display:flex;gap:20px;width:max-content;padding:0 10px">
      <article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">They cleaned the whole apartment before we moved in. Even the window tracks were spotless, and booking took one WhatsApp message.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Yesenia M.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">We use GCS every two weeks for the office. Always on time, and the kitchen and bathrooms are ready before staff arrive.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Daniel R.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Después de la remodelación había polvo por todas partes. Lo dejaron impecable en un solo día.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Carla V.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Careful work on the hardwood floors and baseboards. They moved furniture back exactly where it was.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Michael T.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Limpiaron las ventanas por dentro y por fuera. Ahora entra muchísima más luz en la casa.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Rosa E.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Straightforward quote, no surprises, and the team was easy to talk to throughout the job.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Priya N.</p>
            </div>
          </article>
      <article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">They cleaned the whole apartment before we moved in. Even the window tracks were spotless, and booking took one WhatsApp message.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Yesenia M.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">We use GCS every two weeks for the office. Always on time, and the kitchen and bathrooms are ready before staff arrive.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Daniel R.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Después de la remodelación había polvo por todas partes. Lo dejaron impecable en un solo día.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Carla V.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Careful work on the hardwood floors and baseboards. They moved furniture back exactly where it was.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Michael T.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Limpiaron las ventanas por dentro y por fuera. Ahora entra muchísima más luz en la casa.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Rosa E.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Straightforward quote, no surprises, and the team was easy to talk to throughout the job.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Priya N.</p>
            </div>
          </article>
    </div>
  </div>

  <div style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,52px) 24px clamp(60px,7vw,96px);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px;text-align:center">
    <p style="font-size:16.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="rev.prompt">Have we cleaned for you?</p>
    <button type="button" data-action="openModal" data-tilt="1" data-cta-solid="1" style="display:inline-flex;align-items:center;gap:10px;border:0;cursor:pointer;font-family:Manrope,sans-serif;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:16px 28px;border-radius:999px;box-shadow:0 10px 26px rgba(212,42,128,.32)">
      <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-star"/></svg><span data-i18n="rev.leave">Leave a review</span>
    </button>
  </div>
</section>

<section aria-labelledby="es-h" style="background:linear-gradient(160deg,#0A1A45 0%,#071336 62%,#0C2456 100%);position:relative;overflow:hidden">
  <div data-glow="1" aria-hidden="true" style="position:absolute;top:-140px;right:-100px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(0,169,224,.28),rgba(0,169,224,0) 68%)"></div>
  <div data-split="1" style="position:relative;max-width:1240px;margin:0 auto;padding:clamp(60px,7vw,100px) 24px;display:grid;grid-template-columns:.72fr 1.28fr;gap:clamp(32px,4.5vw,64px);align-items:center">
    <img data-badge="1" src="/assets/gcs-badge-560.webp" srcset="/assets/gcs-badge-280.webp 280w, /assets/gcs-badge-560.webp 560w" sizes="280px" width="560" height="560" loading="lazy" decoding="async" alt="Genesis Cleaning Service LLC brand seal: los detalles hacen la diferencia" style="width:100%;max-width:280px;height:auto;border-radius:50%;justify-self:center;box-shadow:0 24px 60px rgba(0,0,0,.4)">
    <div data-reveal="0">
      <h2 id="es-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(32px,4.2vw,54px);line-height:1.05;letter-spacing:-.02em;color:#fff;margin:0 0 20px">Aquí se habla <span style="color:#4FD3F5">español</span></h2>
      <p style="font-size:clamp(16px,1.5vw,18.5px);line-height:1.65;color:#C7D6EE;margin:0 0 16px;max-width:56ch" data-i18n="es.p1">Llámanos o escríbenos por WhatsApp en español. Te atendemos en español desde la primera pregunta hasta el último detalle del trabajo.</p>
      <p style="font-size:15.5px;line-height:1.65;color:#8FA5CC;margin:0 0 30px;max-width:56ch" data-i18n="es.p2">Ask for a quote in Spanish, explain what your space needs in Spanish, and get your answer in Spanish. No translation app in the middle.</p>
      <a data-wa="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px" style-hover="transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.32)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#0B9E5B"><use href="#i-bold-whatsapp-logo"/></svg><span data-i18n="es.cta">Escríbenos por WhatsApp</span>
      </a>
    </div>
  </div>
</section>

<section aria-labelledby="cta-h" style="background:#0A1A45;border-top:1px solid rgba(255,255,255,.08)">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(56px,6vw,88px) 24px;text-align:center">
    <h2 id="cta-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.8vw,48px);line-height:1.08;letter-spacing:-.02em;color:#fff;margin:0 0 14px" data-i18n="cta.h2">Ready for a cleaner space?</h2>
    <p data-reveal="0" style="font-size:16.5px;line-height:1.6;color:#A9BEDF;margin:0 auto 34px;max-width:48ch" data-i18n="cta.sub">Tell us about your home, office or job site and we will get you a quote.</p>
    <div data-reveal="0" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
      <a href="tel:+18829300319" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px" style-hover="transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.callshort">Call</span>
      </a>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px;box-shadow:0 10px 26px rgba(212,42,128,.36)" style-hover="transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-whatsapp-logo"/></svg>WhatsApp
      </a>
      <a href="mailto:service@gcscleaning.net" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.34);font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px;transition:border-color .18s ease" style-hover="border-color:#4FD3F5;transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#4FD3F5"><use href="#i-bold-envelope-simple"/></svg><span data-i18n="cta.email">Email</span>
      </a>
    </div>
  </div>
</section>

<section id="contact" aria-labelledby="contact-h" style="background:#0A1A45">
  <div style="max-width:1240px;margin:0 auto;padding:0 24px clamp(60px,7vw,96px)">
    <h2 id="contact-h" style="font-family:Outfit,sans-serif;font-weight:700;font-size:clamp(22px,2.4vw,28px);color:#fff;margin:0 0 28px;padding-top:12px" data-i18n="contact.h2">Contact Genesis Cleaning Service</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(238px,1fr));gap:16px">
      <a href="tel:+18829300319" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-phone-call"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.phone">Phone</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0">+1 (882) 930-0319</p>
      </a>
      <a href="mailto:service@gcscleaning.net" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-envelope-simple"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.email">Email</p>
        <p style="font-family:Outfit,sans-serif;font-size:16.5px;font-weight:700;color:#fff;margin:0;word-break:break-word">service@gcscleaning.net</p>
      </a>
      <div data-reveal="0" data-tilt="1" data-tilt-soft="1" style="padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)">
        <div style="display:flex;gap:10px;color:#4FD3F5">
          ${socialIconLinks(22, 10)}
        </div>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.social">Social</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0">@gcs.genesis</p>
      </div>
      <a href="https://www.gcscleaning.net" target="_blank" rel="noopener" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-globe-simple"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.web">Website</p>
        <p style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#fff;margin:0">www.gcscleaning.net</p>
      </a>
      <div data-reveal="0" data-tilt="1" data-tilt-soft="1" style="padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-map-pin-area"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.base">Based in</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0 0 16px">${BASE_LOCATION}</p>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:0 0 7px" data-i18n="contact.area">Service area</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0" data-i18n="contact.areaval">Essex, Union, Morris, Middlesex and Hudson County, NJ</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin:13px 0 0"><a href="/areas/essex-county" data-eshref="/es/areas/essex-county" style="display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font-size:13.5px;font-weight:700;color:#C7D6EE;transition:background .18s ease,border-color .18s ease" style-hover="background:rgba(255,255,255,.14);border-color:rgba(79,211,245,.5)">Essex</a><a href="/areas/union-county" data-eshref="/es/areas/union-county" style="display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font-size:13.5px;font-weight:700;color:#C7D6EE;transition:background .18s ease,border-color .18s ease" style-hover="background:rgba(255,255,255,.14);border-color:rgba(79,211,245,.5)">Union</a><a href="/areas/morris-county" data-eshref="/es/areas/morris-county" style="display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font-size:13.5px;font-weight:700;color:#C7D6EE;transition:background .18s ease,border-color .18s ease" style-hover="background:rgba(255,255,255,.14);border-color:rgba(79,211,245,.5)">Morris</a><a href="/areas/middlesex-county" data-eshref="/es/areas/middlesex-county" style="display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font-size:13.5px;font-weight:700;color:#C7D6EE;transition:background .18s ease,border-color .18s ease" style-hover="background:rgba(255,255,255,.14);border-color:rgba(79,211,245,.5)">Middlesex</a><a href="/areas/hudson-county" data-eshref="/es/areas/hudson-county" style="display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font-size:13.5px;font-weight:700;color:#C7D6EE;transition:background .18s ease,border-color .18s ease" style-hover="background:rgba(255,255,255,.14);border-color:rgba(79,211,245,.5)">Hudson</a></div>
      </div>
    </div>
  </div>
</section>

</main>

<footer style="background:#071336;color:#8FA5CC">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(44px,5vw,64px) 24px 32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:36px;align-items:start">
    <div data-reveal="0">
      <img src="/assets/gcs-logo-navy-580.webp" srcset="/assets/gcs-logo-navy-290.webp 290w, /assets/gcs-logo-navy-580.webp 580w" sizes="290px" alt="Genesis Cleaning Service LLC" width="580" height="258" loading="lazy" decoding="async" style="width:100%;max-width:290px;height:auto;display:block;margin:0 0 16px">
      <p style="font-size:14.5px;line-height:1.6;margin:0;max-width:34ch" data-i18n="foot.tag">Professional cleaning, trust and quality for homes and businesses across Essex, Union, Morris, Middlesex and Hudson County, NJ. Los detalles hacen la diferencia.</p>
    </div>
    <nav data-reveal="0" aria-label="Footer" style="display:flex;flex-direction:column;gap:11px">
      <a href="#top" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.home">Home</a>
      <a href="/services" data-eshref="/es/services" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.services">Services</a>
      <a href="/areas" data-eshref="/es/areas" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.areas">Service areas</a>
      <a href="#why" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.why">Why GCS</a>
      <a href="#faq" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.faq">FAQ</a>
      <a href="#contact" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.contact">Contact</a>
    </nav>
    <div data-reveal="0" style="display:flex;flex-direction:column;gap:11px">
      <a href="tel:+18829300319" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">+1 (882) 930-0319</a>
      <a href="mailto:service@gcscleaning.net" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">service@gcscleaning.net</a>
      <a href="https://www.gcscleaning.net" target="_blank" rel="noopener" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">www.gcscleaning.net</a>
      <p style="display:flex;align-items:center;gap:9px;font-size:14.5px;font-weight:600;color:#C7D6EE;margin:0">
        ${socialIconLinks(17, 9)}
        @gcs.genesis
      </p>
    </div>
    <div data-reveal="0">
      <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6C82AC;margin:0 0 12px" data-i18n="foot.lang">Language</p>
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border-radius:999px;padding:4px;overflow:hidden">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:#ffffff"></span>
        <a href="/" hreflang="en" aria-current="true" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:8px 15px;border-radius:999px;background:transparent;color:#0B1E4E;transition:color .32s ease">EN</a>
        <a href="/es" hreflang="es" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:8px 15px;border-radius:999px;background:transparent;color:#A9BEDF;transition:color .32s ease">ES</a>
      </div>
    </div>
  </div>
  <div style="max-width:1240px;margin:0 auto;padding:20px 24px 34px;border-top:1px solid rgba(255,255,255,.09)">
    <p style="font-size:13px;margin:0;color:#6C82AC"><span data-i18n="foot.copy">© 2026 Genesis Cleaning Service LLC. All rights reserved.</span></p>
  </div>
</footer>

<div id="rev-modal" role="dialog" aria-modal="true" aria-labelledby="rev-modal-h" style="display:none;position:fixed;inset:0;z-index:120;align-items:center;justify-content:center;padding:20px">
  <div data-action="closeModal" style="position:absolute;inset:0;background:rgba(7,19,54,.62);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)"></div>
  <form data-submit="submitReview" style="position:relative;width:100%;max-width:470px;max-height:88vh;overflow-y:auto;background:#fff;border-radius:24px;padding:clamp(26px,3vw,34px);box-shadow:0 30px 80px rgba(7,19,54,.42);display:grid;gap:18px">
    <div style="display:flex;align-items:flex-start;gap:16px">
      <h2 id="rev-modal-h" style="font-family:Outfit,sans-serif;font-size:23px;font-weight:700;color:#0B1E4E;margin:0;flex:1" data-i18n="rev.leave">Leave a review</h2>
      <button type="button" data-action="closeModal" data-i18n-aria="rev.close" aria-label="Close" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:12px;border:1px solid #DCE7F0;background:#fff;color:#0B1E4E;cursor:pointer">
        <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-x"/></svg>
      </button>
    </div>
    <div style="display:grid;gap:8px">
      <label for="rev-name" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.name">Your name</label>
      <input id="rev-name" name="name" type="text" maxlength="40" autoComplete="name" data-i18n-ph="rev.namePh" placeholder="Maria R." style="font-family:Manrope,sans-serif;font-size:15.5px;color:#12203F;padding:14px 16px;border:1.5px solid #6E93B4;border-radius:14px;background:#fff;width:100%">
    </div>
    <div style="display:grid;gap:8px">
      <span id="rev-rate-l" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.rating">Your rating</span>
      <div role="group" aria-labelledby="rev-rate-l" style="display:flex;gap:4px"><button type="button" data-star="1" data-action="setStar" aria-label="1" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="2" data-action="setStar" aria-label="2" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="3" data-action="setStar" aria-label="3" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="4" data-action="setStar" aria-label="4" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="5" data-action="setStar" aria-label="5" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button></div>
    </div>
    <div style="display:grid;gap:8px">
      <label for="rev-text" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.comment">Your review</label>
      <textarea id="rev-text" name="comment" rows="4" maxlength="500" data-i18n-ph="rev.commentPh" placeholder="Tell us how the cleaning went." style="font-family:Manrope,sans-serif;font-size:15.5px;line-height:1.55;color:#12203F;padding:14px 16px;border:1.5px solid #6E93B4;border-radius:14px;background:#fff;width:100%;resize:vertical"></textarea>
    </div>
    <div aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden">
      <label for="rev-website">Website</label>
      <input id="rev-website" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <p id="rev-msg" role="status" style="display:none;font-size:14px;line-height:1.5;margin:0;color:#B4225F"></p>
    <button type="submit" data-cta-solid="1" style="display:inline-flex;align-items:center;justify-content:center;gap:10px;border:0;cursor:pointer;font-family:Manrope,sans-serif;background:#D42A80;color:#fff;font-weight:700;font-size:15.5px;padding:16px 26px;border-radius:999px;box-shadow:0 8px 22px rgba(212,42,128,.3)">
      <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-paper-plane-tilt"/></svg><span data-i18n="rev.submit">Send review</span>
    </button>
    <p style="font-size:13px;line-height:1.5;color:#5A6A8C;margin:0" data-i18n="rev.note">Reviews are published after Genesis approves them. 8 to 80 words.</p>
  </form>
</div>

<div data-mobilebar="1" role="navigation" data-i18n-aria="a11y.quickcontact" aria-label="Quick contact" style="position:fixed;left:0;right:0;bottom:0;z-index:70;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#DCE7F0;border-top:1px solid #DCE7F0;box-shadow:0 -6px 22px rgba(11,30,78,.12)">
  <a href="tel:+18829300319" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#fff;color:#0B1E4E;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.callshort">Call</span>
  </a>
  <a data-wa="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#fff;color:#0B1E4E;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#0B9E5B"><use href="#i-bold-whatsapp-logo"/></svg>WhatsApp
  </a>
  <a data-wa="1" data-cta-solid="1" href="https://wa.me/18829300319" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#D42A80;color:#fff;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quoteshort">Quote</span>
  </a>
</div>

</div>`;
