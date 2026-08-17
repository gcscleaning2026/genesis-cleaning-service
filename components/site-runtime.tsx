// @ts-nocheck
'use client';
import React from 'react';
// Only the dictionary and the per-language <head> copy come over the wire. The page
// markup itself (lib/site-content.ts) is server-only: the Server Component writes it
// into the HTML, this component never renders it, so the ~96 KB string stays out of
// the browser bundle.
import { ES as ES_DICT, HEAD as HEAD_META } from '@/lib/i18n';
// The card template lives in lib/review-card.ts because the server renders approved
// reviews into the static HTML with the same function.
import { renderTrack } from '@/lib/review-card';

// This component renders nothing. Everything below the fold already exists as real DOM
// by the time it mounts — the server wrote it — so the runtime's job is the behaviour
// the static markup cannot carry: the language toggle, the mobile menu, the review
// modal and the motion timelines. It drives that DOM directly, exactly as the Vite
// build did after hydrating the prerendered page.

// GSAP, ScrollTrigger and Lenis are ~240 KB of the bundle and none of it is needed to
// paint the page: the hero entrance is CSS now, and everything GSAP drives is either
// below the fold or a scroll effect. Loading them in a separate chunk after mount keeps
// them off the critical path. They are still published on `window` once resolved, so
// console/devtools inspection works exactly as before.

function loadMotion() {
  return Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]).then(
    ([g, st, l]) => {
      const lib = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, Lenis: l.default };
      window.gsap = lib.gsap;
      window.ScrollTrigger = lib.ScrollTrigger;
      window.Lenis = lib.Lenis;
      return lib;
    }
  );
}


class GenesisSite extends React.Component {
  state = { lang: 'en', reviews: [] };

  ES = ES_DICT;

  WA = {
    en: 'Hello, I am interested in cleaning services and would like to request a quote.',
    es: 'Hola, estoy interesado/a en sus servicios de limpieza y me gustaría solicitar una cotización.'
  };

  // Per-language <head>, shared with scripts/prerender.mjs so the static HTML and the
  // client-side language toggle can never disagree.
  HEAD = HEAD_META;

  componentDidMount() {
    // StrictMode in dev mounts, unmounts and remounts the *same* class instance, so a
    // flag set by componentWillUnmount is still set on the second mount. initMotion()
    // checks it before starting, which left dev with no motion at all until this reset.
    this.unmounted = false;

    // The markup is server-rendered, so there is no React tree to hang handlers off.
    // One delegated listener per event on the shell covers every [data-action] and
    // [data-submit] node inside it, including the review cards rebuilt at runtime.
    this.shell = document.querySelector('.gcs-shell');
    if (this.shell) {
      this.shell.addEventListener('click', this.handleAction);
      this.shell.addEventListener('submit', this.handleSubmit);
    }

    // On /es the DOM is already Spanish, so the English dictionary cannot be read back
    // out of it. The page ships the English strings as JSON alongside the markup; fall
    // back to a DOM snapshot if that tag is ever missing.
    const seed = this.readI18nSeed();
    this.base = seed ? seed.t : {};
    this.baseAttr = seed ? seed.a : {};
    this.basePh = seed ? seed.p : {};
    if (!seed) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        this.base[el.getAttribute('data-i18n')] = el.textContent;
      });
      document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        this.baseAttr[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label');
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        this.basePh[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
      });
    }
    // Status messages have no element in SITE_HTML to read English from, so they live here.
    this.EN_MSG = {
      'rev.err': 'Please add your name and a short comment.',
      'rev.err.words': 'Please write between 8 and 80 words.',
      'rev.err.profanity': 'Please rewrite your comment without offensive language.',
      'rev.err.links': 'Links and email addresses are not allowed in reviews.',
      'rev.err.rate': 'You have already sent a review recently. Please try again later.',
      'rev.err.bot': 'We could not verify this submission. Please try again.',
      'rev.err.network': 'We could not send your review. Please try again.',
      'rev.thanks': 'Thank you. Your review will appear once the owner approves it.'
    };
    this.rating = 5;

    // Approved reviews are already in the DOM; this seed is what the strip is rebuilt from
    // after a language switch. Submitted reviews are pending, so they are not in it.
    let seeded = [];
    try { seeded = JSON.parse(document.getElementById('gcs-reviews')?.textContent || '[]'); } catch (e) {}
    if (Array.isArray(seeded) && seeded.length) {
      // componentDidUpdate rebuilds #gcs-track from this, which reproduces the markup the
      // server already wrote — same cards, same order, so nothing visibly changes.
      this.reviewCount = seeded.length;
      this.setState({ reviews: seeded });
    }

    this.onKey = (e) => {
      if (e.key !== 'Escape') return;
      const m = document.getElementById('rev-modal');
      if (m && m.style.display === 'flex') this.toggleModal(false);
    };
    document.addEventListener('keydown', this.onKey);

    // The URL is the source of truth: /es is a real, separately indexed page, so a
    // visitor (or a crawler) landing there must get Spanish regardless of what this
    // browser chose last time. Only fall back to the stored choice on the English URL.
    let saved = null;
    try { saved = localStorage.getItem('gcs-lang'); } catch (e) {}
    const fromPath = this.langFromPath();
    const start = fromPath || (saved === 'es' || saved === 'en' ? saved : (this.props.defaultLang === 'es' ? 'es' : 'en'));
    if (start !== this.state.lang) this.setState({ lang: start });
    else this.apply();

    if (this.props.showMobileBar === false) {
      const bar = document.querySelector('[data-mobilebar]');
      if (bar) bar.style.setProperty('display', 'none', 'important');
    }
    this.initAnchorScroll();
    this.initMotion();
  }

  componentDidUpdate() {
    this.apply();
    requestAnimationFrame(() => {
      this.ensureHeadings();
      if (this.reviewCount !== this.state.reviews.length) {
        this.reviewCount = this.state.reviews.length;
        this.updateReviewMarkup();
        // Motion is loaded lazily now, so this can run before GSAP exists — the marquee
        // is a GSAP timeline and startMotion() builds it anyway once it arrives.
        if (this.gsap) {
          this.buildMarquee();
          if (this.ST) this.ST.refresh();
        }
      }
    });
  }

  // Sliding knob: the pill travels and stretches slightly toward the direction of
  // travel, then settles — instead of two backgrounds swapping instantly.
  setKnob(k, lang, slide) {
    const to = lang === 'es' ? 100 : 0;
    const gsap = this.gsap;
    if (!gsap || this.lite || !slide) {
      if (gsap) gsap.set(k, { xPercent: to, scaleX: 1 });
      else k.style.transform = 'translateX(' + to + '%)';
      return;
    }
    gsap.set(k, { transformOrigin: to === 100 ? 'right center' : 'left center' });
    gsap.timeline()
      .to(k, { xPercent: to, duration: 0.62, ease: 'back.out(1.6)' }, 0)
      .to(k, { scaleX: 1.16, duration: 0.16, ease: 'power2.out' }, 0)
      .to(k, { scaleX: 1, duration: 0.46, ease: 'power2.out' }, 0.16);
  }

  // One hover standard for primary actions. No 3D rotation — on a pill that reads as a
  // toy and softens the label. Instead: the button drifts toward the pointer, lifts, and
  // its icon and label travel slightly further, so the depth comes from parallax.
  buildTilt() {
    const gsap = this.gsap;
    if (this.lite) return;
    if (!(window.matchMedia && window.matchMedia('(pointer:fine)').matches)) return;

    gsap.utils.toArray('[data-tilt]').forEach(el => {
      const soft = el.hasAttribute('data-tilt-soft');
      const pull = soft ? 3 : 7;
      const lift = soft ? -5 : -3;
      const grow = soft ? 1.008 : 1.022;
      const kids = Array.from(el.children);
      const icon = kids.find(k => k.tagName === 'I');
      const rest = kids.filter(k => k !== icon);
      const D = { duration: 0.55, ease: 'power3.out' };

      const xTo = gsap.quickTo(el, 'x', D);
      const yTo = gsap.quickTo(el, 'y', D);
      const iconX = icon ? gsap.quickTo(icon, 'x', { duration: 0.7, ease: 'power3.out' }) : null;
      const restX = rest.length ? gsap.quickTo(rest, 'x', { duration: 0.75, ease: 'power3.out' }) : null;

      el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: grow, duration: 0.45, ease: 'power3.out' });
        if (icon) gsap.to(icon, { scale: 1.12, duration: 0.45, ease: 'back.out(2)' });
      });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xTo(px * pull * 2);
        yTo(lift + py * pull);
        if (iconX) iconX(px * 4);
        if (restX) restX(px * 2.5);
      });
      el.addEventListener('mouseleave', () => {
        xTo(0); yTo(0);
        if (iconX) iconX(0);
        if (restX) restX(0);
        gsap.to(el, { scale: 1, duration: 0.5, ease: 'power3.out' });
        if (icon) gsap.to(icon, { scale: 1, duration: 0.5, ease: 'power3.out' });
      });
      el.addEventListener('mousedown', () => gsap.to(el, { scale: grow * 0.96, duration: 0.12, ease: 'power2.out' }));
      el.addEventListener('mouseup', () => gsap.to(el, { scale: grow, duration: 0.3, ease: 'back.out(2)' }));
    });
  }

  // Continuous right-to-left marquee. Never pauses; scroll velocity briefly speeds it
  // up so the strip feels connected to the page rather than looping in isolation.
  buildMarquee() {
    const gsap = this.gsap;
    const track = document.getElementById('gcs-track');
    if (!track) return;
    if (this.marq) { this.marq.kill(); this.marq = null; }
    if (this.marqIntro) { this.marqIntro.kill(); this.marqIntro = null; }
    if (this.marqST) { this.marqST.kill(); this.marqST = null; }

    // Clones from a previous build would be measured as if they were reviews.
    track.querySelectorAll('[data-marq-clone]').forEach(node => node.remove());
    gsap.set(track, { x: 0 });

    const wrap = track.parentElement;
    const view = wrap ? wrap.clientWidth : window.innerWidth;
    const one = track.scrollWidth;
    if (one < 40) return;

    // Fewer reviews than fill the strip: a loop would either show the same card twice or
    // leave half the row empty. Centre them and leave them still — a two-card carousel is
    // a worse answer than two cards sitting where they can be read.
    if (one <= view) {
      track.style.justifyContent = 'center';
      track.style.width = '100%';
      return;
    }
    track.style.justifyContent = '';
    track.style.width = 'max-content';
    if (this.lite) return;

    // Enough copies to cover the viewport plus one full list, so there is always a card
    // entering from the right and the wrap point is never on screen.
    const copies = Math.ceil((view + one) / one);
    const originals = Array.from(track.children);
    for (let copy = 1; copy < copies; copy++) {
      originals.forEach(node => {
        const clone = node.cloneNode(true);
        clone.setAttribute('data-marq-clone', '1');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    // Content repeats every `one` pixels, so wrapping there is seamless.
    const loop = gsap.utils.wrap(-one, 0);
    const start = () => {
      this.marq = gsap.to(track, {
        x: `-=${one}`,
        duration: one / 55,
        ease: 'none',
        repeat: -1,
        modifiers: { x: (value) => loop(parseFloat(value)) + 'px' }
      });
    };

    // The strip travels in from the right the first time it is reached, so the reader sees
    // the cards arrive rather than finding them already parked mid-scroll.
    if (this.marqIntroDone) { start(); return; }
    gsap.set(track, { x: view });
    this.marqST = this.ST.create({
      trigger: wrap || track,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        this.marqIntroDone = true;
        this.marqIntro = gsap.to(track, {
          x: 0,
          duration: 1.4,
          ease: 'power2.out',
          onComplete: start
        });
      }
    });
  }

  toggleModal(open) {
    const m = document.getElementById('rev-modal');
    if (!m) return;
    const gsap = this.gsap;
    const scrim = m.firstElementChild;
    const card = m.querySelector('form');
    document.body.style.overflow = open ? 'hidden' : '';
    if (this.lenis) { open ? this.lenis.stop() : this.lenis.start(); }

    if (open) {
      this.modalOpenedAt = Date.now();
      const msg = document.getElementById('rev-msg');
      if (msg) msg.style.display = 'none';
      this.paintStars();
    }

    if (!gsap || this.lite) {
      m.style.display = open ? 'flex' : 'none';
      if (open) { const f = document.getElementById('rev-name'); if (f) f.focus(); }
      return;
    }

    if (this.modalTl) this.modalTl.kill();

    if (open) {
      m.style.display = 'flex';
      this.modalTl = gsap.timeline()
        .fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0)
        // Drops in from above the viewport and settles — no bounce, just a long ease.
        .fromTo(card,
          { y: -70, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'expo.out',
            onComplete: () => { const f = document.getElementById('rev-name'); if (f) f.focus(); }
          }, 0.06);
    } else {
      this.modalTl = gsap.timeline({ onComplete: () => { m.style.display = 'none'; } })
        .to(card, { y: -46, opacity: 0, scale: 0.98, duration: 0.35, ease: 'power2.in' }, 0)
        .to(scrim, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.05);
    }
  }

  paintStars() {
    const r = this.rating || 5;
    document.querySelectorAll('[data-star]').forEach(btn => {
      const v = parseInt(btn.getAttribute('data-star'), 10);
      const icon = btn.querySelector('i');
      if (icon) icon.style.color = v <= r ? '#F5A623' : '#DAE4EC';
      btn.setAttribute('aria-pressed', String(v === r));
    });
  }

  ensureHeadings() {
    if (!this.gsap || this.lite || !this.headEls) return;
    const lost = this.headEls.some(el => el.id !== 'hero-h' && !el.querySelector('[data-w]'));
    const heroLost = !!(this.heroWords && this.heroWords[0] && !this.heroWords[0].isConnected);
    if (!lost && !heroLost) return;
    this.buildHeadings(true);
    this.ST.refresh();
  }

  componentWillUnmount() {
    if (this.motionBail) clearTimeout(this.motionBail);
    if (this.motionIdle) clearTimeout(this.motionIdle);
    if (this.onLoadMotion) window.removeEventListener('load', this.onLoadMotion);
    if (this.startMotionNow) {
      ['scroll','pointerdown','wheel','touchstart','keydown'].forEach(e => window.removeEventListener(e, this.startMotionNow));
    }
    if (this.introSafety) clearTimeout(this.introSafety);
    this.unmounted = true;
    if (this.valuesSafety) clearInterval(this.valuesSafety);
    if (this.valuesDelay) this.valuesDelay.kill();
    if (this.onLoadArm) window.removeEventListener('load', this.onLoadArm);
    if (this.onKey) document.removeEventListener('keydown', this.onKey);
    if (this.onAnchorClick) document.removeEventListener('click', this.onAnchorClick);
    this.stopScrollTween();
    if (this.shell) {
      this.shell.removeEventListener('click', this.handleAction);
      this.shell.removeEventListener('submit', this.handleSubmit);
    }
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    if (window.__gcsMotionOwner !== this) return;
    window.__gcsMotionOwner = null;
    window.__gcsMotionReady = false;
    if (this.ST) this.ST.getAll().forEach(s => s.kill());
    if (this.gsap) {
      if (this.tick) this.gsap.ticker.remove(this.tick);
      if (this.velTick) this.gsap.ticker.remove(this.velTick);
      // Never leave content stranded at opacity 0 / clipped.
      this.gsap.set('[data-reveal],[data-anim],[data-clip],[data-val],[data-val] *,[data-w] > span', { clearProps: 'all' });
    }
    if (this.lenis) this.lenis.destroy();
    document.documentElement.classList.remove('gcs-anim');
  }

  // ---- URL <-> language ----------------------------------------------------------
  // English lives at /, Spanish at /es. Both are prerendered and cross-linked with
  // hreflang, so each is indexable on its own; the client-side toggle keeps the URL
  // and the <head> in step with what is actually on screen.

  langFromPath() {
    const p = (window.location.pathname || '/').replace(/\/+$/, '');
    return p === '/es' ? 'es' : (p === '' || p === '/' ? 'en' : null);
  }

  readI18nSeed() {
    const el = document.getElementById('gcs-i18n-en');
    if (!el) return null;
    try {
      const seed = JSON.parse(el.textContent || '{}');
      if (seed && seed.t) return { t: seed.t, a: seed.a || {}, p: seed.p || {} };
    } catch (e) {}
    return null;
  }

  setMeta(selector, attr, value) {
    const el = document.head.querySelector(selector);
    if (el && value != null) el.setAttribute(attr, value);
  }

  applyHead(lang) {
    const h = this.HEAD[lang] || this.HEAD.en;
    const origin = window.location.origin;
    document.title = h.title;
    this.setMeta('meta[name="description"]', 'content', h.desc);
    this.setMeta('link[rel="canonical"]', 'href', origin + h.path);
    this.setMeta('meta[property="og:url"]', 'content', origin + h.path);
    this.setMeta('meta[property="og:locale"]', 'content', h.locale);
    this.setMeta('meta[property="og:locale:alternate"]', 'content', lang === 'es' ? 'en_US' : 'es_US');
    this.setMeta('meta[property="og:title"]', 'content', h.ogTitle);
    this.setMeta('meta[property="og:description"]', 'content', h.ogDesc);
    this.setMeta('meta[name="twitter:title"]', 'content', h.ogTitle);
    this.setMeta('meta[name="twitter:description"]', 'content', h.ogDesc);

    // Keep the address bar honest without a reload — the markup already matches what
    // /es serves statically, so the URL a visitor copies resolves to the same page.
    const here = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    if (here !== h.path && this.langFromPath() !== null) {
      try { window.history.replaceState(null, '', h.path + window.location.search + window.location.hash); } catch (e) {}
    }
  }

  apply() {
    const lang = this.state.lang;
    const dict = this.ES;
    document.documentElement.lang = lang;
    this.applyHead(lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      const v = lang === 'es' ? (dict[k] != null ? dict[k] : this.base[k]) : this.base[k];
      if (v != null && el.textContent !== v) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const k = el.getAttribute('data-i18n-ph');
      const v = lang === 'es' ? (dict[k] != null ? dict[k] : this.basePh[k]) : this.basePh[k];
      if (v != null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const k = el.getAttribute('data-i18n-aria');
      const v = lang === 'es' ? (dict[k] != null ? dict[k] : this.baseAttr[k]) : this.baseAttr[k];
      if (v != null) el.setAttribute('aria-label', v);
    });

    const href = 'https://wa.me/19083383160?text=' + encodeURIComponent(this.WA[lang] || this.WA.en);
    document.querySelectorAll('[data-wa]').forEach(a => { a.setAttribute('href', href); });

    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const on = btn.getAttribute('data-lang-btn') === lang;
      const dark = btn.closest('footer');
      btn.style.color = on ? (dark ? '#0B1E4E' : '#ffffff') : (dark ? '#A9BEDF' : '#56658A');
      btn.setAttribute('aria-pressed', String(on));
    });

    const slide = this.knobLang !== undefined && this.knobLang !== lang;
    document.querySelectorAll('[data-knob]').forEach(k => this.setKnob(k, lang, slide));
    this.knobLang = lang;

    const accent = this.props.ctaAccent;
    if (accent) {
      document.querySelectorAll('[data-cta-solid]').forEach(el => { el.style.background = accent; });
    }

    if (this.gsap && this.lastLang && this.lastLang !== lang) {
      this.buildHeadings(true);
      this.ST.refresh();
    }
    this.lastLang = lang;

    try { localStorage.setItem('gcs-lang', lang); } catch (e) {}
  }

  // ---- Motion tokens: one duration scale, one easing family, one travel distance ----
  M = {
    ease: 'power3.out',
    easeSoft: 'power2.out',
    dur: { s: 0.6, m: 0.95, l: 1.25, xl: 1.5 },
    // Reveal travel distance is no longer a constant — see vp() below, which scales it
    // with viewport height so big screens get proportionally bigger movement.
    stagger: 0.06,
    enter: 'clamp(top 92%)',
    settle: 'clamp(top 50%)',
    // Scrub is smoothing on top of the scroll position, and the scroll position is
    // already smoothed by Lenis. Anything near 1s stacks the two and the page reads as
    // laggy: content keeps settling long after the wheel stops. Keep this just high
    // enough to hide ScrollTrigger's per-frame quantisation.
    scrub: 0.18
  };

  // Trigger ranges written as viewport percentages are a moving yardstick: "top 92% ->
  // top 52%" is 40% of the window, which is 216px of scrolling in a 540px preview but
  // 500px on a 1249px desktop viewport. Same rule, more than twice the scroll distance,
  // so every reveal reads as sluggish and permanently half-finished on a big screen.
  // Hold the physical distance roughly constant instead, and let travel grow with the
  // screen so larger type still moves proportionally.
  // 540px -> 40% (216px), 800px -> 27% (216px), 1249px -> 24% (300px).
  vp() {
    const vh = window.innerHeight || 800;
    return {
      range: Math.round(Math.min(40, Math.max(24, 21600 / vh))),
      travel: Math.round(Math.min(88, Math.max(52, vh * 0.085)))
    };
  }

  // End positions must be an explicit pixel distance from the (already clamped) start,
  // never a second clamp() percentage. clamp() pins a trigger inside the scrollable
  // range, so for content near the top of the document both ends can pin to the same
  // pixel — a zero-length scrubbed trigger, which can never advance past progress 0 and
  // strands the element at opacity 0 forever. Measuring forward from start guarantees
  // the range is always the distance we asked for.
  // ...and it must also stay inside the scrollable range, which is the job clamp() was
  // doing at the other end of the document: an end past maxScroll can never be reached,
  // so footer content would strand half-revealed. Short-but-real beats unreachable.
  endPx(pct) {
    return (self) => {
      const dist = Math.round(pct / 100 * (window.innerHeight || 800));
      const max = window.ScrollTrigger.maxScroll(window);
      return Math.min(self.start + dist, max);
    };
  }

  // Belt and braces. If a trigger somehow still ends up with no scroll distance — an
  // element pinned against the very bottom of the document, for instance — show the
  // finished state. Content being visible is always the safer failure direction.
  safeRefresh = (self) => {
    if (self.animation && self.end - self.start < 8) self.animation.progress(1);
  };

  initMotion() {
    const root = document.documentElement;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pref = this.props.motion || 'system';
    // 'system' honours prefers-reduced-motion by DEGRADING (quiet opacity fades,
    // no smooth scroll, no parallax, no travel) rather than switching motion off.
    // Design previews run inside an iframe whose host forces reduced-motion; that is a
    // tooling artifact, not the visitor's choice. Honour it only in a real top-level page.
    let framed = false;
    try { framed = window.self !== window.top; } catch (e) { framed = true; }
    this.mode = pref === 'off' ? 'off' : (pref === 'full' ? 'full' : (reduce && !framed ? 'lite' : 'full'));
    if (this.mode === 'off') { root.classList.remove('gcs-anim'); return; }
    // Same contract as before: if the motion libraries never arrive, the class comes
    // off anyway so nothing is left stranded at opacity 0. index.html keeps its own
    // 4.5s belt-and-braces timeout on top of this.
    this.motionBail = setTimeout(() => { root.classList.remove('gcs-anim'); }, 4000);

    // Building the timelines is ~1s of main-thread work on a throttled phone: splitting
    // five headings, registering every ScrollTrigger and measuring an 800-element
    // document. Run before the first paint has settled and it holds up the hero image,
    // which is the LCP element. Nothing above the fold depends on it (the hero entrance
    // is CSS), so wait for idle — but start immediately if the visitor scrolls or
    // touches the page first, since that is when the scroll effects start to matter.
    const WAKE = ['scroll', 'pointerdown', 'wheel', 'touchstart', 'keydown'];
    let started = false;
    const go = () => {
      if (started || this.unmounted) return;
      started = true;
      WAKE.forEach(e => window.removeEventListener(e, go));
      // Below-fold content is pre-hidden until the timelines exist. Once the visitor has
      // started scrolling, that hiding is on a clock: if the chunks are slow, show the
      // content rather than let them scroll into an empty page.
      clearTimeout(this.motionBail);
      this.motionBail = setTimeout(() => { root.classList.remove('gcs-anim'); }, 600);
      loadMotion()
        .then((lib) => {
          if (this.unmounted) return;
          clearTimeout(this.motionBail);
          this.startMotion(lib);
        })
        .catch(() => {
          clearTimeout(this.motionBail);
          root.classList.remove('gcs-anim');
        });
    };
    this.startMotionNow = go;
    WAKE.forEach(e => window.addEventListener(e, go, { passive: true, once: true }));

    // Everything GSAP drives here is scroll-driven, so the honest trigger is the first
    // sign that the visitor is going to scroll. The idle timer is only a backstop for
    // someone who lands and reads without touching anything — by then the work is free,
    // and index.html's own 4.5s timeout has already un-hidden the content either way.
    // A plain timer, not requestIdleCallback: rIC fires at the first idle moment, which
    // on this page is a few milliseconds after load — right on top of the hero image's
    // first paint, which is exactly what we are trying to get out of the way.
    const queue = () => { this.motionIdle = setTimeout(go, 2500); };
    if (document.readyState === 'complete') queue();
    else {
      this.onLoadMotion = () => queue();
      window.addEventListener('load', this.onLoadMotion, { once: true });
    }
  }

  startMotion(lib) {
    const gsap = lib.gsap;
    const ST = lib.ScrollTrigger;
    gsap.registerPlugin(ST);
    this.gsap = gsap;
    this.ST = ST;
    this.made = [];
    // A previous mount (hot reload / StrictMode) may have left triggers behind.
    ST.getAll().forEach(s => s.kill());
    window.__gcsMotionOwner = this;
    this.small = window.innerWidth < 768;
    this.lite = this.mode === 'lite';
    window.__gcsMotionReady = true;

    if (!this.lite) this.initSmoothScroll();
    this.buildHeadings(false);
    this.buildReveals();
    this.buildValues();
    if (!this.lite) this.buildDepth();
    this.buildChrome();
    this.buildMarquee();
    this.heroIntro();

    this.onResize = () => {
      clearTimeout(this.resizeId);
      this.resizeId = setTimeout(() => {
        this.buildMarquee();
        // Trigger ranges and travel distances are functions of window height now, so
        // they have to be re-measured after the marquee rebuild changes the layout.
        ST.refresh();
      }, 220);
    };
    window.addEventListener('resize', this.onResize);

    document.documentElement.classList.remove('gcs-anim');
    ST.refresh();
    requestAnimationFrame(() => this.ensureHeadings());
  }

  // ---- In-page navigation --------------------------------------------------------
  // Every `#section` link glides instead of jumping. This is armed in componentDidMount,
  // not in initSmoothScroll(), for two reasons: the nav is often the first thing a
  // visitor clicks, which is the exact moment the motion chunk has not arrived yet, and
  // Lenis switches its own smoothing off when the OS reports prefers-reduced-motion —
  // which this site deliberately overrides (`motion="full"`), so relying on it left the
  // links landing instantly on any machine with Windows "Animation effects" off.

  // Distance the sticky header covers, so a section heading does not land underneath it.
  HEADER_OFFSET = 86;

  initAnchorScroll() {
    this.onAnchorClick = (e) => {
      // Leave modified clicks (new tab / download / middle click) to the browser.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      let target = null;
      try { target = document.querySelector(id); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      this.scrollToTarget(target);
    };
    document.addEventListener('click', this.onAnchorClick);
  }

  scrollToTarget(target) {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const to = Math.min(max, Math.max(0, Math.round(window.scrollY + target.getBoundingClientRect().top - this.HEADER_OFFSET)));

    this.stopScrollTween();

    // Lenis owns the scroll position while it is smoothing; handing the trip to it keeps
    // one animator on the pixels instead of two fighting over them.
    if (this.lenis && this.lenis.isSmooth) {
      this.lenis.scrollTo(to, { duration: this.scrollDuration(Math.abs(to - window.scrollY)) / 1000, easing: this.EASE_IN_OUT });
      return;
    }

    // Reduced-motion path (`motion="system"` on a machine that asks for less): jump.
    if (this.lite) { window.scrollTo(0, to); return; }

    const from = window.scrollY;
    const dist = to - from;
    if (Math.abs(dist) < 2) return;
    const dur = this.scrollDuration(Math.abs(dist));
    const t0 = performance.now();

    // A wheel or a key press means the visitor changed their mind mid-flight; stop
    // fighting them for the scrollbar.
    this.onScrollInterrupt = () => this.stopScrollTween();
    ['wheel', 'touchstart', 'keydown'].forEach(ev =>
      window.addEventListener(ev, this.onScrollInterrupt, { passive: true }));

    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, Math.round(from + dist * this.EASE_IN_OUT(p)));
      if (p < 1) this.scrollRaf = requestAnimationFrame(step);
      else this.stopScrollTween();
    };
    this.scrollRaf = requestAnimationFrame(step);
  }

  // Fixed durations make short hops feel sluggish and long trips feel like a cut. Scale
  // with distance instead, inside a range that still reads as one deliberate movement.
  scrollDuration(dist) {
    return Math.min(1150, Math.max(480, dist * 0.42));
  }

  EASE_IN_OUT = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  stopScrollTween() {
    if (this.scrollRaf) { cancelAnimationFrame(this.scrollRaf); this.scrollRaf = null; }
    if (this.onScrollInterrupt) {
      ['wheel', 'touchstart', 'keydown'].forEach(ev => window.removeEventListener(ev, this.onScrollInterrupt));
      this.onScrollInterrupt = null;
    }
  }

  initSmoothScroll() {
    const gsap = this.gsap;
    try {
      // Lerp, not duration. A duration-based ease restarts a ~1.15s curve on every wheel
      // tick, so the viewport trails the input by a fixed wall-clock amount no matter how
      // fast the display refreshes. Lenis normalises lerp against delta time, so 0.14
      // converges in roughly 150ms on any refresh rate: still a glide, no drag.
      this.lenis = new window.Lenis({
        lerp: 0.14,
        smoothWheel: true,
        wheelMultiplier: 1,
        // Native momentum on touch already feels right; smoothing it adds latency only.
        syncTouch: false,
        touchMultiplier: 1.5
      });
    } catch (e) { return; }
    const lenis = this.lenis;
    lenis.on('scroll', this.ST.update);
    this.tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(this.tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor clicks are handled by initAnchorScroll(), which is armed at mount rather
    // than here — the nav is usually the first thing a visitor touches, and by then this
    // chunk has only just started downloading.

    // Velocity layer: how fast you scroll subtly inflates the photo frames.
    const vels = gsap.utils.toArray('[data-vel]');
    if (vels.length) {
      vels.forEach(el => el.removeAttribute('scalex,scaley'));
      const setScale = (v) => gsap.set(vels, { scale: v });
      let cur = 1;
      let target = 1;
      lenis.on('scroll', (e) => {
        const v = Math.min(Math.abs(e.velocity || 0) / 45, 1);
        target = 1 + v * 0.022;
      });
      let mq = 1;
      // Snap to rest instead of decaying forever. The old epsilon (0.00005) was tighter
      // than the decay ever reached, so every idle frame still wrote a scale onto the
      // photo frames and a timeScale onto the marquee — paint work for no visible change.
      this.velTick = () => {
        target += (1 - target) * 0.08;
        if (Math.abs(target - 1) < 0.0004) target = 1;
        const next = cur + (target - cur) * 0.12;
        if (Math.abs(next - cur) > 0.0002) { cur = next; setScale(cur); }
        else if (cur !== target && target === 1) { cur = 1; setScale(1); }
        if (this.marq) {
          const want = 1 + (target - 1) * 26;
          const nextMq = mq + (want - mq) * 0.1;
          if (Math.abs(nextMq - mq) > 0.002) { mq = nextMq; this.marq.timeScale(mq); }
          else if (mq !== want && want === 1) { mq = 1; this.marq.timeScale(1); }
        }
      };
      gsap.ticker.add(this.velTick);
    }
  }

  splitWords(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) { if (node.nodeValue && node.nodeValue.trim()) nodes.push(node); }
    const inners = [];
    nodes.forEach(n => {
      const frag = document.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
        const outer = document.createElement('span');
        outer.setAttribute('data-w', '1');
        // Padding + matching negative margin gives descenders and glyph overhang room
        // inside the clipping box without changing the laid-out text position.
        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding:0 .08em .16em;margin:0 -.08em -.16em';
        const inner = document.createElement('span');
        inner.style.cssText = 'display:inline-block';
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
        inners.push(inner);
      });
      n.parentNode.replaceChild(frag, n);
    });
    return inners;
  }

  unsplit(el) {
    el.querySelectorAll('[data-w]').forEach(w => {
      w.parentNode.replaceChild(document.createTextNode(w.textContent), w);
    });
    el.normalize();
  }

  // Headings never plain-fade: words rise out of their own clipping boxes.
  buildHeadings(rebuild) {
    const gsap = this.gsap;
    const M = this.M;
    if (!this.headEls) {
      this.headEls = ['hero-h', 'services-h', 'why-h', 'es-h', 'cta-h', 'contact-h']
        .map(id => document.getElementById(id)).filter(Boolean);
    }
    if (this.headST) this.headST.forEach(s => { if (s) s.kill(); });
    this.headST = [];

    this.headEls.forEach(el => {
      if (this.lite) {
        if (el.id === 'hero-h') return;
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, duration: 0.5, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
        return;
      }
      if (rebuild) this.unsplit(el);
      // The hero heading arrives already split from scripts/prerender.mjs so its CSS
      // stagger can start on parse. Reuse those spans instead of splitting them again,
      // which would nest a second layer of wrappers inside each word.
      const existing = Array.from(el.querySelectorAll('[data-w] > span'));
      const words = existing.length ? existing : this.splitWords(el);
      if (!words.length) return;

      if (el.id === 'hero-h') {
        // Hand the words to nothing: the hero entrance is CSS. Writing inline
        // transforms here would snap words that are still mid-animation.
        this.heroWords = words;
        return;
      }
      gsap.set(words, { yPercent: 118, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'clamp(top 90%)',
          // Headings ran slightly shorter than the reveals (35% vs 40%); keep that
          // proportion while the range itself normalises against viewport height.
          end: (self) => this.endPx(this.vp().range * 0.875)(self),
          scrub: M.scrub,
          invalidateOnRefresh: true,
          onRefresh: this.safeRefresh
        }
      });
      tl.to(words, { yPercent: 0, opacity: 1, duration: 1, ease: M.easeSoft, stagger: M.stagger });
      this.headST.push(tl.scrollTrigger);
    });
  }

  // Scroll-LINKED reveals: a millimetre of scroll = a millimetre of animation.
  buildReveals() {
    const gsap = this.gsap;
    const M = this.M;
    const els = gsap.utils.toArray('[data-reveal]');
    const seen = new Map();

    els.forEach(el => {
      const parent = el.parentElement;
      const i = seen.get(parent) || 0;
      seen.set(parent, i + 1);
      const lag = Math.min(i, 3) * 4;

      if (this.lite) {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, duration: 0.5, ease: 'none', delay: Math.min(i, 3) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 94%', once: true }
        });
        return;
      }
      // Bigger blocks get a slightly longer rise, so they still read as "settling in"
      // from further back. This replaces an animated filter: blur(9px), which repainted
      // the whole element every frame and was the single biggest source of scroll jank
      // (p99 frame time 30.6ms -> 22.2ms at 6x CPU throttle once removed).
      const deep = !this.small && el.offsetHeight > 150;

      // Anything already on screen when the page loads has no scroll distance in front
      // of it — its trigger clamps to scroll 0, so it sits at progress 0 (invisible)
      // until the first wheel tick pops it in. Above the fold is a load-time entrance,
      // not a scroll-linked one; it plays once, on its own clock, after the hero.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.96) {
        gsap.set(el, { opacity: 0, y: this.vp().travel });
        gsap.to(el, {
          opacity: 1, y: 0, duration: M.dur.l, ease: M.easeSoft,
          delay: 0.55 + Math.min(i, 3) * 0.09
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: M.enter,
          // Function-based so it re-measures against the current window on every
          // refresh; invalidateOnRefresh re-evaluates the tween's from-values too.
          end: (self) => this.endPx(this.vp().range + lag)(self),
          scrub: M.scrub,
          invalidateOnRefresh: true,
          onRefresh: this.safeRefresh
        }
      });
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, 0);
      tl.fromTo(el,
        { y: () => deep ? this.vp().travel * 1.35 : this.vp().travel, scale: deep ? 0.985 : 1 },
        { y: 0, scale: 1, duration: 1, ease: M.easeSoft }, 0);
    });

    if (this.lite) return;

    // Signature: photo frames wipe open as they enter.
    gsap.utils.toArray('[data-clip]').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)', ease: this.M.easeSoft,
          scrollTrigger: {
            trigger: el,
            start: 'clamp(top 88%)',
            end: (self) => this.endPx(this.vp().range * 0.9)(self),
            scrub: this.M.scrub,
            invalidateOnRefresh: true,
            onRefresh: this.safeRefresh
          }
        });
    });
  }

  buildDepth() {
    const gsap = this.gsap;
    if (this.small) return;

    const hero = document.getElementById('hero-h');
    const heroSec = hero ? hero.closest('section') : null;
    if (heroSec) {
      gsap.utils.toArray('[data-blob]').forEach(b => {
        const dir = parseFloat(b.getAttribute('data-blob')) || 1;
        gsap.to(b, {
          yPercent: 22 * dir, xPercent: -5 * dir, ease: 'none',
          scrollTrigger: { trigger: heroSec, start: 'top top', end: 'bottom top', scrub: true }
        });
      });
    }

    // Images drift inside their own masks.
    gsap.utils.toArray('[data-depth-image]').forEach(slot => {
      gsap.fromTo(slot,
        { yPercent: -5, scale: 1.12 },
        {
          yPercent: 5, scale: 1.12, ease: 'none',
          scrollTrigger: { trigger: slot.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    // Signature: the brand seal counter-rotates through the navy section.
    const badge = document.querySelector('[data-badge]');
    if (badge) {
      gsap.fromTo(badge,
        { rotate: -14, scale: 0.88, yPercent: 8 },
        {
          rotate: 6, scale: 1, yPercent: -8, ease: 'none',
          scrollTrigger: { trigger: badge.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        });
    }
    const glow = document.querySelector('[data-glow]');
    if (glow) {
      gsap.fromTo(glow,
        { scale: 0.55, opacity: 0.4 },
        {
          scale: 1.25, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: glow.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
        });
    }
  }

  // Signature: the four values assemble themselves, left to right. The section's own
  // claim is attention to detail, so the detail arrives first — a hairline rule draws
  // itself, the icon lands on it, the title rises from behind a mask, the sentence
  // settles last. Four columns offset by ~0.11s read as one deliberate sequence rather
  // than four things fading at once.
  //
  // This strip sits at or just below the fold, so it is TIME-based and plays once as a
  // continuation of the hero entrance. Scroll-linking content that is already on screen
  // at load is what made it sit blank until the first scroll nudged it.
  buildValues() {
    const gsap = this.gsap;
    const blocks = gsap.utils.toArray('[data-val]');
    if (!blocks.length) return;

    if (this.lite) {
      gsap.fromTo(blocks, { opacity: 0 }, {
        opacity: 1, duration: 0.5, ease: 'none', stagger: 0.06, delay: 0.15
      });
      return;
    }

    const parts = blocks.map((b) => {
      const icon = b.querySelector('i');
      const head = b.querySelector('h3');
      const body = b.querySelector('p');

      let rule = b.querySelector('[data-val-rule]');
      if (!rule) {
        rule = document.createElement('span');
        rule.setAttribute('data-val-rule', '1');
        rule.setAttribute('aria-hidden', 'true');
        const accent = (icon && icon.style.color) || '#00A9E0';
        rule.style.cssText = 'display:block;height:2px;width:34px;border-radius:2px;margin:0 0 14px;background:' + accent;
        b.insertBefore(rule, b.firstChild);
      }
      // Wrap rather than word-split: apply() rewrites the h3's textContent on every
      // language switch, which would wipe injected child spans. The heading element
      // itself survives, so the mask goes outside it.
      if (head && !(head.parentElement && head.parentElement.hasAttribute('data-val-mask'))) {
        const mask = document.createElement('span');
        mask.setAttribute('data-val-mask', '1');
        head.parentElement.insertBefore(mask, head);
        mask.appendChild(head);
      }
      return { icon, head, body, rule };
    });

    gsap.set(blocks, { opacity: 1 });
    parts.forEach((p) => {
      gsap.set(p.rule, { scaleX: 0, transformOrigin: 'left center' });
      if (p.icon) gsap.set(p.icon, { opacity: 0, y: 12, scale: 0.55 });
      if (p.head) gsap.set(p.head, { yPercent: 115 });
      if (p.body) gsap.set(p.body, { opacity: 0, y: 18 });
    });

    const tl = gsap.timeline({ paused: true });
    parts.forEach((p, i) => {
      const at = i * 0.11;
      tl.to(p.rule, { scaleX: 1, duration: 0.75, ease: 'power3.out' }, at);
      if (p.icon) tl.to(p.icon, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2.2)' }, at + 0.09);
      if (p.head) tl.to(p.head, { yPercent: 0, duration: 0.95, ease: 'power3.out' }, at + 0.17);
      if (p.body) tl.to(p.body, { opacity: 1, y: 0, duration: 0.95, ease: this.M.easeSoft }, at + 0.27);
    });
    this.valuesTl = tl;

    // Never leave the strip blank — but only force the end state while it is actually
    // on screen. A blanket timer spends the reveal before the reader ever reaches the
    // section, so they scroll down to find it already over.
    const strip = blocks[0].parentElement;
    const born = Date.now();
    this.valuesSafety = setInterval(() => {
      if (tl.progress() > 0) { clearInterval(this.valuesSafety); this.valuesSafety = null; return; }
      const r = strip.getBoundingClientRect();
      const onScreen = r.top < window.innerHeight && r.bottom > 0;
      if (onScreen && Date.now() - born > 5000) {
        tl.progress(1);
        clearInterval(this.valuesSafety);
        this.valuesSafety = null;
      }
    }, 500);

    // One trigger covers both cases: it fires straight away when the strip is already
    // on screen, and on scroll when it is not. It must be armed AFTER window load,
    // though — built earlier it measures a page whose hero image has no height yet,
    // decides a below-the-fold strip is visible, and `once` makes that mistake
    // permanent.
    const arm = () => {
      if (this.unmounted) return;
      this.ST.create({
        trigger: strip,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          // Still mid-hero means this is the initial load, not a scroll. Give the hero
          // a beat so the two read as one cascade down the page — overlapping its tail,
          // not queueing behind it, since waiting out the full ~2s hero leaves the
          // strip visibly empty and that is the original complaint in a new costume.
          const lead = this.introDone ? 0 : 0.9;
          this.valuesDelay = gsap.delayedCall(lead, () => tl.play());
        }
      });
    };
    if (document.readyState === 'complete') arm();
    else {
      this.onLoadArm = arm;
      window.addEventListener('load', arm, { once: true });
    }
  }

  buildChrome() {
    const gsap = this.gsap;
    const ST = this.ST;
    const bar = document.getElementById('gcs-progress');
    if (bar) {
      gsap.to(bar, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: () => ST.maxScroll(window), scrub: 0.35 }
      });
    }
    const header = document.querySelector('header');
    if (header) {
      ST.create({
        start: 50, end: 'max',
        onToggle: (self) => {
          gsap.to(header, {
            boxShadow: self.isActive ? '0 10px 30px rgba(11,30,78,.10)' : '0 0 0 rgba(11,30,78,0)',
            duration: 0.45, ease: this.M.easeSoft
          });
        }
      });
    }
    this.buildTilt();
  }

  // The hero entrance moved to CSS (`@keyframes gcs-rise/gcs-word/gcs-clip` in
  // styles.css) and the word split moved to the prerender. It used to be a GSAP
  // timeline gated on `html.gcs-anim`, which meant the biggest text block in the
  // viewport stayed at opacity 0 until the motion chunk had downloaded and parsed —
  // an element at opacity 0 cannot be the Largest Contentful Paint, so LCP sat at
  // ~2.8s on mobile no matter how fast the HTML arrived. Nothing here needs to run
  // any more; the flag only records that the hero is settled.
  heroIntro() {
    this.introDone = true;
  }


  handleAction = (e) => {
    const target = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (!target || !this.shell || !this.shell.contains(target)) return;
    const action = target.getAttribute('data-action');
    const actions = this.renderVals();
    const fn = actions[action];
    if (typeof fn !== 'function') return;
    if (action === 'setStar') fn({ currentTarget: target, preventDefault: () => e.preventDefault() });
    else fn(e);
  };

  handleSubmit = (e) => {
    const form = e.target instanceof Element ? e.target.closest('[data-submit]') : null;
    if (!form) return;
    const action = form.getAttribute('data-submit');
    const fn = this.renderVals()[action];
    if (typeof fn === 'function') fn(e);
  };

  // The server already wrote these cards; this only runs when the list itself changes.
  updateReviewMarkup() {
    const track = document.getElementById('gcs-track');
    if (!track) return;
    track.innerHTML = renderTrack(this.state.reviews);
  }

  // Nothing to render: the shell and every node inside it were written by the server.
  render() {
    return null;
  }

  // Looks a status message up in the active language, falling back to the English table.
  text(key) {
    if (this.state.lang === 'es' && this.ES[key] != null) return this.ES[key];
    return this.EN_MSG?.[key] ?? this.base?.[key] ?? '';
  }

  renderVals() {
    return {
      openModal: () => this.toggleModal(true),
      closeModal: () => this.toggleModal(false),
      setStar: (e) => {
        this.rating = parseInt(e.currentTarget.getAttribute('data-star'), 10) || 5;
        this.paintStars();
      },
      submitReview: async (e) => {
        e.preventDefault();
        const nameEl = document.getElementById('rev-name');
        const textEl = document.getElementById('rev-text');
        const n = (nameEl.value || '').trim();
        const c = (textEl.value || '').trim();
        const button = e.target.querySelector('button[type="submit"]');
        const show = (key) => {
          const msg = document.getElementById('rev-msg');
          if (!msg) return;
          msg.textContent = this.text(key);
          msg.style.display = 'block';
        };

        if (button) button.disabled = true;
        try {
          const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: n,
              comment: c,
              rating: this.rating || 5,
              lang: this.state.lang,
              website: document.getElementById('rev-website')?.value || '',
              elapsedMs: Date.now() - (this.modalOpenedAt || 0)
            })
          });
          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            const MESSAGE = {
              words: 'rev.err.words', length: 'rev.err.words', profanity: 'rev.err.profanity',
              shouting: 'rev.err.profanity', links: 'rev.err.links', name: 'rev.err',
              rating: 'rev.err', rate: 'rev.err.rate', bot: 'rev.err.bot'
            };
            show(MESSAGE[data.reason] || 'rev.err.network');
            return;
          }

          nameEl.value = '';
          textEl.value = '';
          this.rating = 5;
          // The review is pending: it joins the strip only after the owner approves it and
          // the page revalidates, so nothing is added to state here.
          show('rev.thanks');
          setTimeout(() => this.toggleModal(false), 2200);
        } catch (err) {
          show('rev.err.network');
        } finally {
          if (button) button.disabled = false;
        }
      },
      setEn: () => this.setState({ lang: 'en' }),
      setEs: () => this.setState({ lang: 'es' }),
      toggleNav: () => {
        const el = document.getElementById('gcs-mobnav');
        const btn = document.getElementById('gcs-burger');
        if (!el) return;
        const open = el.style.display === 'block';
        el.style.display = open ? 'none' : 'block';
        if (!open) {
          // The menu's knob was laid out at zero width while hidden — re-seat it.
          el.querySelectorAll('[data-knob]').forEach(k => this.setKnob(k, this.state.lang, false));
        }
        if (btn) {
          btn.setAttribute('aria-expanded', String(!open));
          btn.innerHTML = '<svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-' + (open ? 'list' : 'x') + '"/></svg>';
        }
      },
      closeNav: () => {
        const el = document.getElementById('gcs-mobnav');
        const btn = document.getElementById('gcs-burger');
        if (el) el.style.display = 'none';
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.innerHTML = '<svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-list"/></svg>';
        }
      }
    };
  }
}

export default function SiteRuntime({ lang }: { lang: 'en' | 'es' }) {
  // motion="full" runs the designed GSAP timelines for every visitor.
  // "system" degrades to quiet opacity fades whenever the OS reports
  // prefers-reduced-motion: reduce (Windows "Animation effects" off, macOS
  // "Reduce motion"), which reads as "the animations are broken".
  return <GenesisSite motion="full" defaultLang={lang} showMobileBar={true} ctaAccent="#D42A80" />;
}
