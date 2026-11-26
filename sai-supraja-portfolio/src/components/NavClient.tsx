'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV, PROFILE } from '@/lib/data';
import { lockScroll, scrollToTarget } from '@/lib/scroll';



export default function NavClient() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    // clear when back in the hero
    const hero = document.getElementById('top');
    const heroIo = new IntersectionObserver(([e]) => { if (e.isIntersecting && e.intersectionRatio > 0.5) setActive(''); }, { threshold: [0.5, 0.6] });
    if (hero) heroIo.observe(hero);
    return () => { io.disconnect(); heroIo.disconnect(); };
  }, []);

  const placeIndicator = useCallback(() => {
    const pill = pillRef.current;
    const ind = indRef.current;
    if (!pill || !ind) return;
    const link = pill.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) { ind.style.opacity = '0'; return; }
    ind.style.opacity = '1';
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useLayoutEffect(() => { placeIndicator(); }, [placeIndicator]);
  useEffect(() => {
    window.addEventListener('resize', placeIndicator);
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener('resize', placeIndicator);
  }, [placeIndicator]);

  const close = useCallback((focusBack = true) => {
    setOpen(false);
    lockScroll(false);
    if (focusBack) menuBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) { close(false); setTimeout(() => scrollToTarget(id), 380); }
    else scrollToTarget(id);
  };

  return (
    <>
      <div className="nav-progress" ref={progressRef} aria-hidden="true" />
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap nav-row">
          <a href="#top" className="nav-brand" onClick={go('top')}>
            <span className="nav-mark" aria-hidden="true">{PROFILE.initials}</span>
            <span className="nav-name">{PROFILE.name}</span>
            <span className="sr-only">, back to top</span>
          </a>
          <nav aria-label="Primary">
            <div className="nav-pill" ref={pillRef}>
              <span className="nav-ind" ref={indRef} aria-hidden="true" />
              {NAV.map((n) => (
                <a key={n.id} data-id={n.id} href={`#${n.id}`} className="nav-link" aria-current={active === n.id ? 'true' : undefined} onClick={go(n.id)}>
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
          <button
            ref={menuBtnRef}
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => { setOpen(true); lockScroll(true); }}
          >
            Menu
          </button>
        </div>
        <div id="mobile-menu" className={`nav-overlay${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
          <div className="nav-ov-top">
            <span className="nav-mark" aria-hidden="true">{PROFILE.initials}</span>
            <button className="btn btn-line" onClick={() => close()} tabIndex={open ? 0 : -1}>Close</button>
          </div>
          <nav className="nav-ov-links" aria-label="Mobile">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} className="nav-ov-link" style={{ ['--i' as string]: i }} onClick={go(n.id)} tabIndex={open ? 0 : -1}>
                <small>{String(i + 1).padStart(2, '0')}</small>{n.label}
              </a>
            ))}
          </nav>
          <p className="nav-ov-foot">{PROFILE.email}</p>
        </div>
      </header>
    </>
  );
}
