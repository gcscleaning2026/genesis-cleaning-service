'use client';

import React from 'react';
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

/**
 * Scroll motion for the service, area and hub pages.
 *
 * The home page gets this from SiteRuntime, which also owns the language toggle, the mobile
 * menu, the review modal, the marquee, the star widget and the i18n seed — none of which
 * exists on these pages. Mounting that class here to animate a fade would be importing a
 * page's worth of behaviour for one timeline, so this is the motion half of it, alone: the
 * same tokens, the same easing, the same ScrollTrigger configuration, transcribed from
 * `buildReveals` in components/site-runtime.tsx.
 *
 * What it deliberately leaves out is Lenis. Smooth scrolling is 18 KB and the measured
 * source of a 116 ms forced layout inside the frame that arms motion, and these pages are
 * short enough that it buys much less than it does on a long home page. The reveals are the
 * part that reads as "the same site".
 *
 * Renders nothing. The DOM it drives was written by the server.
 */

const WAKE = ['scroll', 'pointerdown', 'wheel', 'touchstart', 'keydown'] as const;

// One duration scale and one easing family, matching SiteRuntime's `M`.
const M = {
  easeSoft: 'power2.out',
  durL: 1.25,
  enter: 'clamp(top 92%)',
  scrub: 0.18
};

type Gsap = typeof GsapType;
type ScrollTriggerStatic = typeof ScrollTriggerType;
type Lib = { gsap: Gsap; ScrollTrigger: ScrollTriggerStatic };

declare global {
  interface Window {
    ScrollTrigger?: ScrollTriggerStatic;
  }
}

/** The two fields of a ScrollTrigger instance the callbacks below read. */
type TriggerSelf = { start: number; end: number; animation?: { progress(value: number): void } };

type Viewport = { vh: number; range: number; travel: number };

function loadMotion(): Promise<Lib> {
  return Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
    // Published on `window` for the same two reasons SiteRuntime publishes it: devtools
    // inspection, and so the FAQ script in lib/subpage.ts can re-measure the triggers after
    // an accordion changes the document height. It has no other way to reach this instance.
    window.ScrollTrigger = st.ScrollTrigger;
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
}

export default class SubpageMotion extends React.Component {
  lib: Lib | null = null;
  armed = false;
  unmounted = false;
  lite = false;
  vpCache: Viewport | null = null;
  maxCache: number | null = null;
  armHandler: (() => void) | null = null;
  onResize: (() => void) | null = null;
  resizeId: ReturnType<typeof setTimeout> | undefined;

  componentDidMount() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lite = !!reduce;

    // The same bargain the home page strikes: nothing above the fold needs this, so the
    // chunk waits for the first sign the visitor is going to scroll, with a timer as the
    // backstop for one who never touches anything.
    const arm = () => this.arm();
    this.armHandler = arm;
    WAKE.forEach(type => window.addEventListener(type, arm, { once: true, passive: true }));
    window.setTimeout(arm, 1200);

    // If the chunk never resolves, the pre-hide class still has to come off. SiteDocument
    // ships a 4.5s backstop for the whole site; this is the shorter one for this route.
    window.setTimeout(() => {
      if (!this.unmounted && !this.lib) document.documentElement.classList.remove('gcs-anim');
    }, 2600);
  }

  componentWillUnmount() {
    this.unmounted = true;
    const arm = this.armHandler;
    if (arm) WAKE.forEach(type => window.removeEventListener(type, arm));
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeId);
    if (this.lib) {
      this.lib.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Never leave content stranded at opacity 0.
      this.lib.gsap.set('[data-reveal]', { clearProps: 'all' });
    }
    document.documentElement.classList.remove('gcs-anim');
  }

  arm() {
    if (this.armed || this.unmounted) return;
    this.armed = true;
    if (this.lite) {
      // Reduced motion gets the content, not a quieter version of the animation.
      document.documentElement.classList.remove('gcs-anim');
      return;
    }
    loadMotion()
      .then(lib => {
        if (this.unmounted) return;
        this.lib = lib;
        lib.gsap.registerPlugin(lib.ScrollTrigger);
        this.start();
      })
      .catch(() => {
        document.documentElement.classList.remove('gcs-anim');
      });
  }

  /**
   * Window height decides both the travel distance and the trigger range, and neither can
   * change inside one refresh pass. Read once and clear when ScrollTrigger announces the
   * next pass — the same cache SiteRuntime keeps, for the same forced-layout reason.
   */
  vp(): Viewport {
    if (!this.vpCache) {
      const vh = window.innerHeight || 800;
      this.vpCache = {
        vh,
        range: Math.round(Math.min(40, Math.max(24, 21600 / vh))),
        travel: Math.round(Math.min(88, Math.max(52, vh * 0.085)))
      };
    }
    return this.vpCache;
  }

  maxScroll(): number {
    if (this.maxCache == null) this.maxCache = this.lib!.ScrollTrigger.maxScroll(window);
    return this.maxCache;
  }

  clearVp = () => {
    this.vpCache = null;
    this.maxCache = null;
  };

  /**
   * End positions are an explicit pixel distance from the start, never a second clamp().
   * Two clamped percentages can resolve to the same pixel for content near the top of a
   * short document, and a zero-length scrubbed trigger strands its element at opacity 0.
   */
  endPx(pct: number) {
    return (self: TriggerSelf) =>
      Math.min(self.start + Math.round((pct / 100) * this.vp().vh), this.maxScroll());
  }

  /** If a trigger still ends up with no scroll distance, show the finished state. */
  safeRefresh = (self: TriggerSelf) => {
    if (self.animation && self.end - self.start < 8) self.animation.progress(1);
  };

  start() {
    const { ScrollTrigger } = this.lib!;
    ScrollTrigger.addEventListener('refreshInit', this.clearVp);

    this.buildReveals();

    document.documentElement.classList.remove('gcs-anim');
    ScrollTrigger.refresh();

    this.onResize = () => {
      clearTimeout(this.resizeId);
      this.resizeId = setTimeout(() => {
        this.clearVp();
        ScrollTrigger.refresh();
      }, 220);
    };
    window.addEventListener('resize', this.onResize);
  }

  buildReveals() {
    const { gsap } = this.lib!;
    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    const { vh, travel } = this.vp();
    const seen = new Map<Element | null, number>();

    // One measurement pass before a single style is written, so writing through gsap.set
    // below cannot invalidate layout for the element measured next.
    const tops = els.map(el => el.getBoundingClientRect().top);

    els.forEach((el, index) => {
      const parent = el.parentElement;
      const i = seen.get(parent) || 0;
      seen.set(parent, i + 1);
      const lag = Math.min(i, 3) * 4;

      // Anything already on screen at load has no scroll distance in front of it: its
      // trigger clamps to scroll 0 and the element would sit invisible until the first
      // wheel tick. Above the fold is a load-time entrance on its own clock.
      if (tops[index] < vh * 0.96) {
        gsap.set(el, { opacity: 0, y: travel });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: M.durL,
          ease: M.easeSoft,
          delay: 0.35 + Math.min(i, 3) * 0.09
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: M.enter,
          end: this.endPx(this.vp().range + lag),
          scrub: M.scrub,
          invalidateOnRefresh: true,
          onRefresh: this.safeRefresh
        }
      });
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, 0);
      tl.fromTo(el, { y: () => this.vp().travel }, { y: 0, duration: 1, ease: M.easeSoft }, 0);
    });
  }

  render() {
    return null;
  }
}
