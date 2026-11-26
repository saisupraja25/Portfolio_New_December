'use client';

import { useEffect, useState, type RefObject } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** true once (or while) the element intersects the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, threshold = 0.2, rootMargin = '0px' }: { once?: boolean; threshold?: number; rootMargin?: string } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, threshold, rootMargin]);
  return inView;
}

/**
 * Scroll progress (0..1) of an element moving through the viewport.
 * mode "through": 0 when its top reaches `start` × viewport height, 1 when its bottom reaches `end` × viewport height.
 * mode "pin": 0 at top of a tall sticky wrapper, 1 when its bottom reaches the viewport bottom.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { mode = 'through', start = 0.75, end = 0.5 }: { mode?: 'through' | 'pin'; start?: number; end?: number } = {},
) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let active = false;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'pin') {
        const travel = Math.max(1, r.height - vh);
        p = -r.top / travel;
      } else {
        const from = vh * start;
        const to = vh * end;
        p = (from - r.top) / Math.max(1, r.height + from - to);
      }
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) measure();
    }, { rootMargin: '20% 0px 20% 0px' });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, mode, start, end]);
  return progress;
}
