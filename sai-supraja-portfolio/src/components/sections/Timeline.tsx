'use client';

import { useEffect, useRef, useState } from 'react';
import type { PathStop } from '@/lib/data';
import { useScrollProgress } from '@/lib/hooks';
import { scrollToTarget } from '@/lib/scroll';

export default function Timeline({ stops }: { stops: PathStop[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref, { start: 0.7, end: 0.55 });
  const [lit, setLit] = useState<boolean[]>(() => stops.map(() => false));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(stops.map(() => true));
      return;
    }
    const spineTop = root.getBoundingClientRect().top;
    const h = root.offsetHeight || 1;
    const reach = progress * h;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.tl-stop'));
    setLit(items.map((el) => el.getBoundingClientRect().top - spineTop <= reach + 8));
  }, [progress, stops]);

  return (
    <div className="tl" ref={ref} style={{ ['--p' as string]: progress }}>
      <div className="tl-spine" aria-hidden="true"><i /></div>
      <ol>
        {stops.map((s, i) => (
          <li key={s.title + s.year} className={`tl-stop${lit[i] ? ' lit' : ''}`}>
            <span className="tl-dot" aria-hidden="true" />
            <p className="tl-year">{s.year}</p>
            <div className="tl-body">
              <p className="tl-kind">{s.kind === 'study' ? 'Education' : 'Experience'}</p>
              <h3>{s.title}</h3>
              <p className="tl-place">{s.place}</p>
              <p className="tl-period">{s.period}</p>
              {s.details.length > 0 && <ul className="tl-det">{s.details.map((d) => <li key={d}>{d}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
      <div className="tl-next">
        <p>Next: <span className="it">your team?</span></p>
        <a className="btn btn-ink" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget('contact'); }}>Let&apos;s talk</a>
      </div>
    </div>
  );
}
