import { PATH } from '@/lib/data';
import { Heading, SectionTag } from '../ui/SectionTag';
import Timeline from './Timeline';

const css = `
.tl{position:relative;margin-top:64px;padding-left:clamp(36px,9vw,140px)}
.tl-spine{position:absolute;left:clamp(10px,4vw,60px);top:6px;bottom:0;width:2px;background:var(--line);border-radius:2px}
.tl-spine i{position:absolute;inset:0;background:linear-gradient(180deg,#10b981,#0ea5e9 40%,#6366f1 75%,#a855f7);box-shadow:0 0 14px rgba(99,102,241,.5);transform-origin:50% 0;transform:scaleY(var(--p,0));border-radius:2px}
.tl-stop{position:relative;display:grid;grid-template-columns:120px minmax(0,1fr);gap:clamp(16px,3vw,48px);padding-bottom:clamp(48px,8vh,88px)}
.tl-dot{position:absolute;left:calc(clamp(10px,4vw,60px) - clamp(36px,9vw,140px) - 6px);top:6px;width:14px;height:14px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:background .5s var(--ease),box-shadow .5s var(--ease),transform .5s var(--ease)}
.tl-year{font-family:var(--font-mono);font-size:14px;color:var(--mute);transition:color .5s var(--ease)}
.tl-body{color:var(--mute);transition:color .7s var(--ease)}
.tl-body h3,.tl-body .tl-place,.tl-body .tl-det li{color:inherit;transition:color .7s var(--ease)}
.tl-stop.lit .tl-dot{background:var(--emerald);box-shadow:0 0 0 6px rgba(16,185,129,.18),0 0 18px rgba(16,185,129,.6);transform:scale(1.15)}
.tl-stop.lit .tl-year{color:var(--indigo-ink)}
.tl-stop.lit .tl-body h3{color:var(--ink)}
.tl-stop.lit .tl-body .tl-place,.tl-stop.lit .tl-body .tl-det li{color:var(--ink-2)}
.tl-kind{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.tl-body h3{margin-top:6px;font-size:clamp(24px,2.8vw,40px);font-weight:700;letter-spacing:-.04em;line-height:1.05}
.tl-place{margin-top:6px;font-size:15px;color:var(--ink-2)}
.tl-period{font-family:var(--font-mono);font-size:12px;color:var(--mute);margin-top:2px}
.tl-det{margin-top:16px;display:flex;flex-direction:column;gap:8px;max-width:760px}
.tl-det li{position:relative;padding-left:18px;font-size:15px;color:var(--ink-2)}
.tl-det li::before{content:"";position:absolute;left:0;top:11px;width:8px;height:1px;background:var(--ink)}
.tl-next{margin-left:calc(120px + clamp(16px,3vw,48px));padding:28px 30px;border-radius:24px;border:1.5px dashed rgba(99,102,241,.45);background:linear-gradient(100deg,rgba(16,185,129,.06),rgba(99,102,241,.08));display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.tl-next p{font-size:clamp(22px,2.4vw,32px);font-weight:700;letter-spacing:-.035em}
.tl-next p .it{font-weight:400}
@media (max-width:700px){.tl-stop{grid-template-columns:1fr;gap:6px}.tl-next{margin-left:0}}
`;

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="exp-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap">
        <SectionTag id="experience" />
        <Heading id="exp-title" text="Education and experience, one" accent="path." />
        <Timeline stops={PATH} />
      </div>
    </section>
  );
}
