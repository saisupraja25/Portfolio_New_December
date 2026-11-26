'use client';

import { useEffect, useRef } from 'react';

/** Canvas for the 3D market scene; Three.js is fetched only after the page has loaded. */
export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const hero = document.getElementById('top');
    if (!canvas || !hero) return;
    try {
      const probe = document.createElement('canvas');
      if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;
    } catch {
      return;
    }
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      import('./scene')
        .then(({ mountScene }) => { if (!cancelled) dispose = mountScene(canvas, hero); })
        .catch(() => {});
    };
    // Start the scene on the first interaction (or after a few quiet seconds), so it never
    // competes with the first paint and the page's initial JavaScript.
    const events = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const;
    let started = false;
    let timer = 0;
    const kick = () => {
      if (started) return;
      started = true;
      events.forEach((ev) => window.removeEventListener(ev, kick));
      clearTimeout(timer);
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(start, { timeout: 600 });
      else setTimeout(start, 50);
    };
    const arm = () => {
      events.forEach((ev) => window.addEventListener(ev, kick, { passive: true, once: true }));
      timer = window.setTimeout(kick, 6000);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('load', arm);
      events.forEach((ev) => window.removeEventListener(ev, kick));
      dispose?.();
    };
  }, []);
  return <canvas ref={ref} className="hero-3d" aria-hidden="true" />;
}
