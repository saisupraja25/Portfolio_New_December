'use client';

import { useState } from 'react';
import type { Project } from '@/lib/data';
import { TechLogo } from '../ui/TechLogo';
import { ArrowUpRight, Plus } from '../ui/Icons';

function MiniUI({ kind }: { kind: Project['ui'] }) {
  if (kind === 'pipeline') {
    return (
      <div className="mui" style={{ gridTemplateColumns: 'repeat(3,1fr)', alignItems: 'center' }}>
        {[0, 1, 2].map((i) => <div key={i} className="mui-card" style={{ height: 80 }}><div className="mui-bar" style={{ width: '70%' }} /></div>)}
        <div className="mui-card" style={{ gridColumn: '1 / -1', height: 120 }}><div className="mui-bar" /><div className="mui-bar" style={{ width: '60%' }} /></div>
      </div>
    );
  }
  if (kind === 'chat') {
    return (
      <div className="mui" style={{ alignContent: 'end' }}>
        <div className="mui-card" style={{ width: '70%' }}><div className="mui-bar" /><div className="mui-bar" style={{ width: '50%' }} /></div>
        <div className="mui-card" style={{ width: '70%', marginLeft: '30%', background: '#0d0d0d' }}><div className="mui-bar" style={{ background: '#555' }} /></div>
        <div className="mui-card" style={{ width: '80%' }}><div className="mui-bar" /><div className="mui-bar" style={{ width: '80%' }} /><div className="mui-bar" style={{ width: '40%' }} /></div>
      </div>
    );
  }
  return (
    <div className="mui" style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto 1fr 1fr' }}>
      {[0, 1, 2].map((i) => <div key={i} className="mui-card"><div className="mui-bar" style={{ width: '40%', height: 8 }} /><div className="mui-bar" style={{ height: 18, width: '75%', background: '#3a3a3a' }} /></div>)}
      <div className="mui-card" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
        <div className="mui-cols">{[40, 62, 48, 80, 66, 92, 74].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      </div>
      <div className="mui-card" style={{ gridRow: 'span 2' }}>{[0, 1, 2, 3].map((i) => <div key={i} className="mui-bar" style={{ width: `${90 - i * 15}%` }} />)}</div>
    </div>
  );
}

export default function WorkAccordion({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="wk-list">
      {projects.map((p, i) => {
        const isOpen = open === i;
        return (
          <article
            key={p.id}
            className={`wk-panel${isOpen ? ' open' : ''}`}
            tabIndex={0}
            data-open={isOpen}
            aria-label={p.title}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(i)}
          >
            <div className="wk-spine" aria-hidden={isOpen}>
              <span className="mono">{p.index}</span>
              <h3>{p.title}</h3>
              <span className="wk-plus"><Plus /></span>
            </div>
            <div className="wk-open" aria-hidden={!isOpen}>
              <div className="wk-info">
                <p className="wk-kick">{p.index} · {p.kicker}</p>
                <h3>{p.title}</h3>
                <p className="wk-desc">{p.description}</p>
                <ul className="wk-feats">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <div className="wk-tech">{p.tech.map((t) => <span key={t.name} className="chip"><TechLogo logo={t.logo} size={14} />{t.name}</span>)}</div>
                {p.github && (
                  <a className="btn btn-ink" href={p.github} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1} style={{ marginTop: 22 }}>
                    View on GitHub <ArrowUpRight />
                  </a>
                )}
              </div>
              <div className="wk-ui" role="img" aria-label="Illustrative UI, not a real screenshot">
                <MiniUI kind={p.ui} />
                <span className="wk-ui-label">Illustrative UI</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
