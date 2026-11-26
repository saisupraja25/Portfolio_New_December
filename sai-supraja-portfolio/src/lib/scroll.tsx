'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './hooks';

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

/** Smoothly scroll to a section id (or "top"). Falls back to native scrolling. */
export function scrollToTarget(id: string) {
  if (id === 'top') {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
  el.focus({ preventScroll: true });
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('scroll-locked', locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // deep link on load
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => lenis?.scrollTo(el, { immediate: true }), 50);
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
