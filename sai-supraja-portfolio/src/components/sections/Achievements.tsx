import { ACHIEVEMENTS } from '@/lib/data';
import { SectionTag } from '../ui/SectionTag';
import AchievementsTrack from './AchievementsTrack';

const css = `
.ac{position:relative}
.ac-pin{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.ac-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
.ac-head .h2{font-size:clamp(40px,5.4vw,80px)}
.ac-barwrap{position:absolute;right:var(--gutter);bottom:14px}
.ac-bar{width:min(220px,30vw);height:2px;background:var(--line);border-radius:2px;overflow:hidden}
.ac-bar i{display:block;height:100%;background:var(--grad);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.ac-track{display:flex;gap:22px;margin-top:clamp(28px,5vh,56px);padding-left:var(--gutter);padding-right:var(--gutter);will-change:transform;width:max-content}
.ac-track{perspective:1200px}
.ac-card{position:relative;flex:none;width:clamp(340px,40vw,540px);height:clamp(260px,36vh,310px);border-radius:28px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line),0 18px 40px -30px rgba(14,18,32,.25);padding:24px 26px;display:flex;flex-direction:column;justify-content:space-between;transform:translateY(var(--ty,0px)) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.ac-card::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;background:var(--grad);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .7s var(--ease);pointer-events:none}
.ac-card.near::after{opacity:1}
.ac-card.near{--ty:-12px;box-shadow:0 40px 70px -30px rgba(99,102,241,.45)}
.ac-top{display:flex;justify-content:space-between;align-items:flex-start}
.ac-logo{position:relative;width:72px;height:72px;border-radius:20px;background:var(--paper);display:grid;place-items:center;color:var(--indigo);transform:translateZ(30px)}
.ac-logo::before{content:"";position:absolute;inset:-14px;border-radius:50%;background:radial-gradient(closest-side,var(--tint),transparent);opacity:.12;transition:opacity .7s var(--ease);z-index:0}
.ac-card.near .ac-logo::before{opacity:.32}
.ac-logo > *{position:relative}
.ac-idx{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.ac-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.ac-label{font-weight:700;font-size:20px;letter-spacing:-.03em;line-height:1.15}
.ac-cap{margin-top:6px;font-size:14px;color:var(--ink-2);max-width:240px}
.ac-det{margin-top:6px;font-family:var(--font-mono);font-size:11px;color:var(--mute)}
.ac-num{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--indigo);padding-right:.04em;font-weight:800;font-size:clamp(64px,7vw,108px);letter-spacing:-.06em;line-height:.85;white-space:nowrap;font-variant-numeric:tabular-nums}
.ac-num small{font-size:.38em;letter-spacing:-.03em;font-weight:700;margin-left:2px}
.ac-end{flex:none;align-self:center;font-family:var(--font-serif);font-style:italic;font-size:clamp(32px,3.4vw,48px);background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--indigo);padding:0 6vw 0 1vw;white-space:nowrap}
.ac.static .ac-pin{position:relative;height:auto;padding-block:var(--sec-pad)}
.ac.static .ac-track{width:auto;overflow-x:auto;padding-bottom:20px;scroll-snap-type:x mandatory}
.ac.static .ac-card{scroll-snap-align:start}
@media (max-width:640px){.ac-card{width:min(86vw,420px)}.ac-cap{max-width:180px}}
`;

export default function Achievements() {
  return (
    <section id="achievements" className="ac" aria-labelledby="ach-title" tabIndex={-1}>
      <style>{css}</style>
      <AchievementsTrack items={ACHIEVEMENTS}>
        <div className="wrap ac-head">
          <div>
            <SectionTag id="achievements" />
            <h2 id="ach-title" className="h2"><span className="rv-mask"><span>Impact, in <span className="it">numbers.</span></span></span></h2>
          </div>
        </div>
      </AchievementsTrack>
    </section>
  );
}
