'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Achievement } from '@/lib/data';
import { TechLogo, brandTint } from '../ui/TechLogo';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function Counter({ value, run }: { value: number; run: boolean }) {
  const [shown, setShown] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    // start from 0 once hydrated (the server HTML keeps the real value for no-JS readers)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !started.current) setShown(0);
  }, []);
  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400);
      setShown(Math.round(easeOutQuart(t) * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{shown}</>;
}

export default function AchievementsTrack({ items, children }: { items: Achievement[]; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isStatic, setStatic] = useState(false);
  const [seen, setSeen] = useState<boolean[]>(() => items.map(() => false));
  const [near, setNear] = useState(0);

  useEffect(() => {
    const section = wrapRef.current?.parentElement;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatic(true);
      setSeen(items.map(() => true));
      return;
    }
    let travel = 0;
    let frame = 0;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.ac-card'));

    const size = () => {
      travel = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + travel}px`;
      update();
    };
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const p = travel ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
      barRef.current?.style.setProperty('--p', String(p));
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      const nextSeen: boolean[] = [];
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
        nextSeen[i] = b.left < window.innerWidth * 0.92 && b.right > 0 && r.top < window.innerHeight * 0.5;
      });
      setNear(best);
      setSeen((prev) => (nextSeen.some((v, i) => v && !prev[i]) ? prev.map((v, i) => v || nextSeen[i]) : prev));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    // 3D tilt toward the pointer (mouse / trackpad only)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.ac-card');
      cards.forEach((c) => { if (c !== card) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); } });
      if (!card) return;
      const b = card.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width - 0.5;
      const py = (e.clientY - b.top) / b.height - 0.5;
      card.style.setProperty('--rx', `${(-py * 10).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(px * 12).toFixed(2)}deg`);
    };
    const onLeave = () => cards.forEach((c) => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    if (fine) { track.addEventListener('pointermove', onMove); track.addEventListener('pointerleave', onLeave); }
    size();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', size);
    document.fonts?.ready.then(size);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', size);
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      section.style.height = '';
    };
  }, [items]);

  useEffect(() => {
    wrapRef.current?.parentElement?.classList.toggle('static', isStatic);
  }, [isStatic]);

  const total = String(items.length).padStart(2, '0');

  return (
    <div className="ac-pin" ref={wrapRef}>
      <div style={{ position: 'relative' }}>
        {children}
        <div className="ac-barwrap">
          <div className="ac-bar" ref={barRef} aria-hidden="true"><i /></div>
        </div>
      </div>
      <div className="ac-track" ref={trackRef}>
        {items.map((a, i) => (
          <article key={a.label} className={`ac-card${near === i && !isStatic ? ' near' : ''}`}>
            <div className="ac-top">
              <div className="ac-logo" style={{ ['--tint' as string]: brandTint(a.logo) }}>
                <TechLogo logo={a.logo} size={a.logo.startsWith('c:') ? 32 : 38} />
              </div>
              <span className="ac-idx">{String(i + 1).padStart(2, '0')} / {total}</span>
            </div>
            <div className="ac-bottom">
              <div>
                <h3 className="ac-label">{a.label}</h3>
                <p className="ac-cap">{a.caption}</p>
                <p className="ac-det">{a.detail}</p>
              </div>
              <p className="ac-num">
                <span className="sr-only">{`${a.prefix ?? ''}${a.value}${a.suffix}`}</span>
                <span aria-hidden="true">{a.prefix}<Counter value={a.value} run={seen[i]} /><small>{a.suffix}</small></span>
              </p>
            </div>
          </article>
        ))}
        <p className="ac-end" aria-hidden="true">and counting →</p>
      </div>
    </div>
  );
}
