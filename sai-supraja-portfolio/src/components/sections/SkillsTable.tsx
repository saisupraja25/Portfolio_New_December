'use client';

import { useEffect, useRef, useState } from 'react';
import { TechLogo, brandTint } from '../ui/TechLogo';

export type Tile = { n: number; name: string; symbol: string; family: string; logo: string; usedAt: string[]; d8: number; d4: number };

export default function SkillsTable({ tiles, families }: { tiles: Tile[]; families: string[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [sel, setSel] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        grid.classList.add('is-in');
        io.disconnect();
        setTimeout(() => grid.classList.add('settled'), 1400);
      }
    }, { threshold: 0.15 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  const t = tiles[sel];

  return (
    <>
      <div className="sk-chips" role="group" aria-label="Filter skills by family">
        {['All', ...families].map((f) => (
          <button key={f} type="button" className="sk-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="sk-body">
        <div className="sk-grid" ref={gridRef}>
          {tiles.map((tile, i) => {
            const dim = filter !== 'All' && tile.family !== filter;
            return (
              <button
                key={tile.n}
                type="button"
                className={`sk-tile${dim ? ' dim' : ''}`}
                style={{ ['--d8' as string]: tile.d8, ['--d4' as string]: tile.d4 }}
                aria-current={sel === i ? 'true' : undefined}
                aria-label={`${tile.name}, ${tile.family}`}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                onClick={() => setSel(i)}
              >
                <span className="sk-num" aria-hidden="true">{String(tile.n).padStart(2, '0')}</span>
                <span className="sk-sym" aria-hidden="true">{tile.symbol}</span>
                <span className="sk-name" aria-hidden="true">{tile.name}</span>
              </button>
            );
          })}
        </div>
        <aside className="sk-insp card" aria-live="polite" aria-label="Skill details">
          <div key={t.n} className="sk-logo" style={{ ['--tint' as string]: brandTint(t.logo) }}>
            <TechLogo logo={t.logo} size={t.logo.startsWith('c:') ? 96 : 150} />
          </div>
          <div>
            <h3>{t.name}</h3>
            <p className="sk-f">{String(t.n).padStart(2, '0')} · {t.family}</p>
          </div>
          <div className="sk-used">
            <p>{t.usedAt.length ? 'Used at' : 'On the résumé'}</p>
            <ul>
              {t.usedAt.length ? t.usedAt.map((u) => <li key={u}>{u}</li>) : <li>Listed under {t.family}</li>}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
