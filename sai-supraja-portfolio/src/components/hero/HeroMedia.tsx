'use client';

import { useEffect, useRef, useState } from 'react';
import { PROFILE, asset } from '@/lib/data';



function StillPortrait() {
  return (
    <picture>
      <source media="(max-width: 980px)" srcSet={asset(PROFILE.heroStillSmall)} />
      <img
        className="hm-still"
        src={asset(PROFILE.heroStill)}
        width={768}
        height={960}
        alt={`${PROFILE.name}, ${PROFILE.role}`}
        fetchPriority="high"
      />
    </picture>
  );
}

function TalkingVideo({ src }: { src: NonNullable<typeof PROFILE.heroVideo> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const userMuted = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const hero = document.getElementById('top');
    let visible = true;

    const tryPlay = async (withSound: boolean) => {
      v.muted = !withSound;
      try {
        await v.play();
        setSoundOn(withSound);
        setBlocked(false);
        return true;
      } catch {
        return false;
      }
    };

    (async () => {
      const ok = await tryPlay(true);
      if (!ok) {
        setBlocked(true);
        await tryPlay(false);
        setBlocked(true);
      }
    })();

    const unlock = () => {
      if (userMuted.current || !v.muted) return;
      v.muted = false;
      if (visible) v.play().catch(() => {});
      setSoundOn(true);
      setBlocked(false);
    };
    const opts = { once: false, passive: true } as const;
    window.addEventListener('pointerdown', unlock, opts);
    window.addEventListener('keydown', unlock, opts);
    window.addEventListener('touchend', unlock, opts);

    // pause the voice as soon as less than 35% of the hero is visible
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.intersectionRatio >= 0.35;
        if (visible) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    if (hero) io.observe(hero);

    return () => {
      io.disconnect();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchend', unlock);
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    userMuted.current = !next;
    v.muted = !next;
    if (next) v.play().catch(() => {});
    setSoundOn(next);
    setBlocked(false);
  };

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster={asset(src.poster)}
        aria-label={`${PROFILE.name} introducing herself`}
      >
        <source src={asset(src.webm)} type="video/webm" />
        <source src={asset(src.mp4)} type="video/mp4" />
      </video>
      <button
        type="button"
        className={`hm-sound${blocked ? ' ping' : ''}`}
        onClick={toggle}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={soundOn ? 'Mute introduction' : 'Play introduction with sound'}
        aria-pressed={soundOn}
      >
        {soundOn ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" /><rect x="9.6" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.6v10.8a.6.6 0 0 0 .9.5l8.4-5.4a.6.6 0 0 0 0-1L5.4 2.1a.6.6 0 0 0-.9.5z" fill="currentColor" /></svg>
        )}
      </button>
    </>
  );
}

export default function HeroMedia() {
  return (
    <div className="hero-stage">
      <div className="hm hm-in">
        {PROFILE.heroVideo ? <TalkingVideo src={PROFILE.heroVideo} /> : <StillPortrait />}
      </div>
    </div>
  );
}
