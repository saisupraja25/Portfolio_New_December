'use client';

import { SHOW } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';
import { ArrowRight } from '../ui/Icons';

/** "Explore work" goes to Work when it exists, otherwise to Skills. */
export default function HeroLinks() {
  const workTarget = SHOW.work ? 'work' : 'skills';
  return (
    <>
      <a className="btn btn-ink" href={`#${workTarget}`} onClick={(e) => { e.preventDefault(); scrollToTarget(workTarget); }}>
        {SHOW.work ? 'Explore work' : 'Explore skills'} <ArrowRight />
      </a>
      <a className="btn btn-line" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget('contact'); }}>
        Let&apos;s talk
      </a>
    </>
  );
}
