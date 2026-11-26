'use client';

import { useEffect, useRef, useState } from 'react';
import { CERTIFICATIONS, EXPERIENCE, PROFILE, asset } from '@/lib/data';

/** Lanyard ID card: damped pendulum swing driven by pointer velocity, idle sway, 3D flip. */
export default function IdCard() {
  const lanRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const lan = lanRef.current;
    const section = document.getElementById('about');
    if (!lan || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let angle = 0; // degrees
    let vel = 0;
    let lastX = 0;
    let lastT = 0;
    let lastMove = 0;
    let raf = 0;
    let running = false;
    let prev = performance.now();

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastT) {
        const dt = Math.max(8, now - lastT);
        const vx = (e.clientX - lastX) / dt; // px per ms
        vel += Math.max(-2.2, Math.min(2.2, vx * 0.9));
      }
      lastX = e.clientX;
      lastT = now;
      lastMove = now;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const idle = now - lastMove > 1500 ? Math.sin(now / 1400) * 1.6 : 0;
      const k = 26; // spring stiffness
      const c = 3.2; // damping
      const acc = -k * (angle - idle) - c * vel;
      vel += acc * dt;
      angle += vel * dt * 10;
      angle = Math.max(-24, Math.min(24, angle));
      lan.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(section);
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
    };
  }, []);

  const strapWords = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>{i % 2 ? PROFILE.role : PROFILE.name}</span>
  ));

  const backLines = [
    `${PROFILE.role} · 4+ years`,
    `Master of Science in Data Science, University of Houston (${PROFILE.graduation})`,
    'Power BI · Tableau · SQL · Python · Azure Data Factory',
    `Certified: ${CERTIFICATIONS.map((c) => c.title).join(' · ')}`,
    EXPERIENCE.map((r) => r.company).join(' · '),
  ];

  return (
    <div className="lan" ref={lanRef}>
      <div className="lan-strap" aria-hidden="true">
        <div className="lan-strap-text">{strapWords}{strapWords}</div>
      </div>
      <div className="lan-clip" aria-hidden="true" />
      <div className={`idc${flipped ? ' flipped' : ''}`}>
        <button
          type="button"
          className="idc-hit"
          aria-pressed={flipped}
          aria-label="Flip ID card"
          onClick={() => setFlipped((f) => !f)}
        />
        <div className="idc-flip">
          <div className="idc-face idc-front" aria-hidden={flipped}>
            <div className="idc-band"><b>ANALYST ID</b><span>{PROFILE.initials}</span></div>
            <div className="idc-photo">
              <div className="idc-photo-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(PROFILE.portrait)} width={480} height={600} alt={`Portrait of ${PROFILE.name}`} loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="idc-name">{PROFILE.name}</p>
            <p className="idc-role">{PROFILE.role}</p>
            <div className="idc-rows">
              <div className="idc-row"><span>ID No.</span><span>{PROFILE.initials}-{PROFILE.careerStart}</span></div>
              <div className="idc-row"><span>Dept.</span><span>Business Intelligence</span></div>
              <div className="idc-row"><span>Class of</span><span>{PROFILE.graduation}</span></div>
            </div>
            <div className="idc-foot">
              <div className="idc-bar" aria-hidden="true" />
              <div className="idc-holo" aria-hidden="true" />
            </div>
          </div>
          <div className="idc-face idc-back" aria-hidden={!flipped}>
            <div className="idc-backin">
              <h3>What I am</h3>
              <ul>{backLines.map((l) => <li key={l}>{l}</li>)}</ul>
              <p className="idc-sig">{PROFILE.name}</p>
              <p className="idc-found">If found, say hello · {PROFILE.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
