import { FAMILIES, SKILL_GROUPS, usedAt } from '@/lib/data';
import { Heading, SectionTag } from '../ui/SectionTag';
import SkillsTable, { type Tile } from './SkillsTable';

const css = `
.sk-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px}
.sk-note{max-width:380px;color:var(--mute);font-size:15px}
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:40px}
.sk-chip{height:34px;padding:0 14px;border-radius:999px;font-size:13px;box-shadow:inset 0 0 0 1px var(--line);background:var(--card);color:var(--ink-2);transition:background .35s var(--ease),color .35s var(--ease)}
.sk-chip:hover{box-shadow:inset 0 0 0 1px rgba(13,13,13,.3)}
.sk-chip[aria-pressed="true"]{background:var(--ink);color:#fff;box-shadow:none}
.sk-body{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(20px,3vw,40px);margin-top:28px;align-items:start}
.sk-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.sk-tile{position:relative;aspect-ratio:1;border-radius:14px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);padding:9px 10px;text-align:left;display:flex;flex-direction:column;justify-content:space-between;min-width:0;transition:opacity .45s var(--ease),filter .45s var(--ease),transform .5s var(--ease),background .35s var(--ease),color .35s var(--ease),box-shadow .5s var(--ease)}
.sk-tile:hover,.sk-tile:focus-visible,.sk-tile[aria-current="true"]{background:var(--ink);color:#fff;transform:translateY(-3px);box-shadow:0 16px 30px -18px rgba(13,13,13,.6)}
.sk-tile:hover .sk-num,.sk-tile:focus-visible .sk-num,.sk-tile[aria-current="true"] .sk-num,.sk-tile:hover .sk-fam,.sk-tile[aria-current="true"] .sk-fam{color:rgba(255,255,255,.6)}
.sk-tile.dim{opacity:.22;filter:grayscale(1)}
.sk-num{font-family:var(--font-mono);font-size:10px;color:var(--mute)}
.sk-sym{font-weight:700;font-size:clamp(20px,2.1vw,30px);letter-spacing:-.04em;line-height:1}
.sk-name{font-size:11px;line-height:1.2;font-weight:500;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sk-fam{display:none}
.js .sk-grid .sk-tile{opacity:0;transform:translateY(14px) scale(.96)}
.js .sk-grid.is-in .sk-tile{opacity:1;transform:none;transition-delay:calc(var(--d8) * 1ms)}
.js .sk-grid.is-in .sk-tile.dim{opacity:.22}
.js .sk-grid.settled .sk-tile{transition-delay:0ms}
.sk-insp{position:sticky;top:96px;padding:26px;min-height:420px;display:flex;flex-direction:column;align-items:center;text-align:center}
.sk-logo{position:relative;width:150px;height:150px;margin-top:6px;display:grid;place-items:center;color:var(--ink);animation:pop .7s var(--ease)}
.sk-logo::before{content:"";position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(closest-side,var(--tint),transparent);opacity:.18}
.sk-logo > *{position:relative}
@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.06);opacity:1}100%{transform:none}}
.sk-insp h3{margin-top:22px;font-size:26px;font-weight:700;letter-spacing:-.035em;line-height:1.1}
.sk-insp .sk-f{margin-top:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
.sk-used{margin-top:22px;width:100%;text-align:left;border-top:1px solid var(--line);padding-top:16px}
.sk-used p{font-family:var(--font-mono);font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
.sk-used li{font-size:14px;padding:7px 0;border-bottom:1px dashed var(--line)}
@media (max-width:1100px){.sk-body{grid-template-columns:1fr}.sk-insp{position:relative;top:0;min-height:0;flex-direction:row;text-align:left;gap:20px;align-items:center;flex-wrap:wrap}.sk-logo{width:96px;height:96px}.sk-used{flex-basis:100%}}
@media (max-width:640px){.sk-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.js .sk-grid.is-in .sk-tile{transition-delay:calc(var(--d4) * 1ms)}}
`;

export default function Skills() {
  let n = 0;
  const tiles: Tile[] = SKILL_GROUPS.flatMap((g) =>
    g.skills.map((s) => {
      const i = n++;
      return {
        n: i + 1,
        name: s.name,
        symbol: s.symbol,
        family: s.family,
        logo: s.logo,
        usedAt: usedAt(s),
        d8: (Math.floor(i / 8) + (i % 8)) * 40,
        d4: (Math.floor(i / 4) + (i % 4)) * 40,
      };
    }),
  );

  return (
    <section id="skills" className="sec" aria-labelledby="skills-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap">
        <div className="sk-head">
          <div>
            <SectionTag id="skills" />
            <Heading id="skills-title" text="The periodic table of my" accent="stack." />
          </div>
          <p className="sk-note rv">Every skill on the résumé, grouped the way the résumé groups them. Hover or focus an element to inspect it.</p>
        </div>
        <SkillsTable tiles={tiles} families={FAMILIES} />
      </div>
    </section>
  );
}
