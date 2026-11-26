import { PROJECTS } from '@/lib/data';
import { Heading, SectionTag } from '../ui/SectionTag';
import WorkAccordion from './WorkAccordion';

const css = `
.wk-list{display:flex;gap:10px;height:min(78svh,600px);margin-top:48px}
.wk-panel{position:relative;flex:1;min-width:0;border-radius:26px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;transition:flex 1s var(--ease),box-shadow .6s var(--ease);cursor:pointer;outline:none}
.wk-panel.open{flex:8;cursor:default;box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -40px rgba(13,13,13,.35)}
.wk-panel:focus-visible{box-shadow:0 0 0 2px var(--ink)}
.wk-spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;transition:opacity .4s var(--ease)}
.wk-panel.open .wk-spine{opacity:0;pointer-events:none}
.wk-spine .mono{font-size:12px;color:var(--mute)}
.wk-spine h3{writing-mode:vertical-rl;transform:rotate(180deg);font-size:20px;font-weight:700;letter-spacing:-.03em;white-space:nowrap}
.wk-plus{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:transform .6s var(--ease),background .3s}
.wk-panel:hover .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-open{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;padding:clamp(22px,3vw,40px);opacity:0;pointer-events:none;transition:opacity .5s var(--ease) 0s}
.wk-panel.open .wk-open{opacity:1;pointer-events:auto;transition-delay:.35s}
.wk-info{display:flex;flex-direction:column;min-width:0;overflow:auto}
.wk-kick{font-family:var(--font-mono);font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
.wk-info h3{margin-top:14px;font-size:clamp(28px,2.8vw,42px);font-weight:700;letter-spacing:-.045em;line-height:1.02}
.wk-desc{margin-top:16px;color:var(--ink-2);font-size:15px}
.wk-feats{margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:14px}
.wk-feats li{padding-left:14px;position:relative}.wk-feats li::before{content:"";position:absolute;left:0;top:10px;width:6px;height:1px;background:var(--ink)}
.wk-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:18px}
.wk-info .btn{margin-top:auto;align-self:flex-start}
.wk-ui{position:relative;border-radius:18px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;clip-path:inset(0 100% 0 0 round 18px);transition:clip-path 1.1s var(--ease)}
.wk-panel.open .wk-ui{clip-path:inset(0 0 0 0 round 18px);transition-delay:.45s}
.wk-ui-label{position:absolute;left:12px;bottom:12px;font-family:var(--font-mono);font-size:10.5px;padding:4px 9px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);color:var(--mute)}
.mui{position:absolute;inset:16px 16px 44px;display:grid;gap:10px}
.mui-bar{height:12px;border-radius:6px;background:#d9d6d0}
.mui-card{border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);padding:10px;display:flex;flex-direction:column;gap:8px;justify-content:flex-end}
.mui-cols{display:flex;align-items:flex-end;gap:6px;height:100%}
.mui-cols i{flex:1;border-radius:4px 4px 0 0;background:linear-gradient(#3a3a3a,#77756f)}
@media (max-width:860px){
  .wk-list{flex-direction:column;height:auto}
  .wk-panel{flex:none;min-height:76px}
  .wk-panel.open{flex:none}
  .wk-spine{position:relative;flex-direction:row;padding:0 20px;height:76px}
  .wk-spine h3{writing-mode:horizontal-tb;transform:none;font-size:18px;flex:1;margin-left:14px;white-space:normal}
  .wk-panel.open .wk-spine{display:none}
  .wk-open{position:relative;grid-template-columns:1fr;display:none}
  .wk-panel.open .wk-open{display:grid}
  .wk-ui{min-height:220px}
}
`;

export default function Work() {
  return (
    <section id="work" className="sec" aria-labelledby="work-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap">
        <SectionTag id="work" />
        <Heading id="work-title" text="Things I've" accent="built." />
        <WorkAccordion projects={PROJECTS} />
      </div>
    </section>
  );
}
