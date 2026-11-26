import { PROFILE, asset } from '@/lib/data';
import { Heading, SectionTag } from '../ui/SectionTag';
import { ArrowDown, ArrowUpRight } from '../ui/Icons';
import IdCard from './IdCard';

const css = `
.about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:stretch}
.about-left .h2{font-size:clamp(40px,4.6vw,72px)}
.about-sum{margin-top:28px;color:var(--ink-2);font-size:16px;line-height:1.65;max-width:520px}
.about-extra{margin-top:14px;color:var(--mute);font-size:15px;max-width:520px}
.about-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.about-col{position:relative;margin-top:calc(var(--sec-pad) * -1)}
.about-right{display:flex;flex-direction:column;justify-content:space-between;gap:36px;padding-top:8px}
.facts{border-top:1px solid var(--line)}
.fact{display:grid;grid-template-columns:110px minmax(0,1fr);gap:14px;padding:16px 0;border-bottom:1px solid var(--line);font-size:15px}
.fact dt{font-family:var(--font-mono);font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.04em;padding-top:2px}
.fact dd{margin:0;color:var(--ink);overflow-wrap:anywhere}
.fact a{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.about-quote{font-family:var(--font-serif);font-style:italic;font-size:clamp(28px,2.6vw,38px);line-height:1.15;letter-spacing:-.01em;color:var(--ink)}
.about-quote cite{display:block;margin-top:12px;font-family:var(--font-mono);font-style:normal;font-size:12px;color:var(--mute)}
@media (max-width:1100px){.about-grid{grid-template-columns:minmax(0,1fr) 320px}.about-right{grid-column:1/-1}}
@media (max-width:760px){.about-grid{grid-template-columns:1fr}.about-col{margin-top:0;order:-1;height:640px}.about-left{text-align:left}}

/* ---------- lanyard ID card ---------- */
.lan{position:absolute;left:50%;top:0;width:300px;margin-left:-150px;transform-origin:50% 0;will-change:transform;z-index:3}
.lan-strap{position:relative;margin:0 auto;width:30px;height:calc(var(--sec-pad) + 56px);background:#1b1b1b;overflow:hidden;box-shadow:inset 3px 0 0 rgba(255,255,255,.06),inset -3px 0 0 rgba(0,0,0,.25)}
@media (max-width:760px){.lan-strap{height:56px}}
.lan-strap-text{position:absolute;left:0;top:0;width:30px;display:flex;flex-direction:column;align-items:center;gap:22px;animation:strapScroll 14s linear infinite}
.lan-strap-text span{writing-mode:vertical-rl;transform:rotate(180deg);font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;color:#cfcac2;white-space:nowrap;text-transform:uppercase}
@keyframes strapScroll{to{transform:translateY(-50%)}}
.lan-clip{position:relative;margin:-2px auto 0;width:38px;height:30px}
.lan-clip::before{content:"";position:absolute;left:4px;right:4px;top:0;height:16px;border-radius:4px 4px 2px 2px;background:linear-gradient(180deg,#e4e2de,#9c9a95 60%,#c9c6c0)}
.lan-clip::after{content:"";position:absolute;left:12px;top:12px;width:14px;height:18px;border-radius:0 0 8px 8px;border:3px solid #a4a19b;border-top:0}
.idc{perspective:1400px;width:300px;height:404px;margin:-4px auto 0;cursor:pointer;outline:none;border-radius:22px}
.idc{position:relative}
.idc-hit{position:absolute;inset:0;z-index:5;border-radius:22px;cursor:pointer}
.idc-hit:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
.idc-flip{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 1s var(--ease)}
.idc.flipped .idc-flip{transform:rotateY(180deg)}
@media (hover:hover) and (pointer:fine){.idc:hover .idc-flip{transform:rotateY(180deg)}.idc.flipped:hover .idc-flip{transform:rotateY(180deg)}}
.idc-face{position:absolute;inset:0;border-radius:22px;background:#fff;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -30px rgba(13,13,13,.45),0 8px 20px -10px rgba(13,13,13,.2);display:flex;flex-direction:column}
.idc-face::before{content:"";position:absolute;left:50%;top:9px;width:46px;height:8px;margin-left:-23px;border-radius:8px;background:var(--paper);box-shadow:inset 0 1px 2px rgba(0,0,0,.25);z-index:2}
.idc-back{transform:rotateY(180deg)}
.idc-band{height:50px;background:var(--ink);color:#fff;display:flex;align-items:flex-end;justify-content:space-between;padding:0 20px 12px;font-family:var(--font-mono);font-size:11px;letter-spacing:.16em}
.idc-band b{font-weight:600}
.idc-photo{position:relative;width:128px;height:156px;margin:14px auto 0;border-radius:16px;padding:3px;background:linear-gradient(160deg,#d9d6d0,#8f8c86 55%,#e8e6e2)}
.idc-photo::before{content:"";position:absolute;inset:-14px;border-radius:26px;background:radial-gradient(closest-side,rgba(13,13,13,.10),transparent);z-index:-1}
.idc-photo-in{width:100%;height:100%;border-radius:13px;overflow:hidden;background:var(--soft)}
.idc-photo img{width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease)}
.idc:hover .idc-photo img{transform:scale(1.06)}
.idc-name{margin-top:10px;text-align:center;font-weight:700;font-size:19px;letter-spacing:-.03em;line-height:1.2}
.idc-role{text-align:center;font-size:12.5px;line-height:1.3;margin-top:2px;color:var(--mute)}
.idc-rows{margin:10px 20px 0;border-top:1px dashed rgba(13,13,13,.16)}
.idc-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;font-size:12px;line-height:1.3;border-bottom:1px dashed rgba(13,13,13,.12)}
.idc-row span:first-child{font-family:var(--font-mono);color:var(--mute);font-size:10.5px;text-transform:uppercase;letter-spacing:.06em}
.idc-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding:8px 20px 14px}
.idc-bar{width:150px;height:26px;background:repeating-linear-gradient(90deg,#1a1a1a 0 2px,transparent 2px 4px,#1a1a1a 4px 5px,transparent 5px 8px,#1a1a1a 8px 11px,transparent 11px 12px)}
.idc-holo{width:34px;height:34px;flex:none;border-radius:50%;background:conic-gradient(from 0deg,#d8d6d2,#8d8a85,#f1f0ee,#a9a6a1,#e3e1dd,#7f7c77,#d8d6d2);box-shadow:inset 0 0 0 1px rgba(13,13,13,.1);position:relative;overflow:hidden}
.idc-holo::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.85) 48%,transparent 62%);transform:translateX(-100%);animation:holo 3.6s ease-in-out infinite}
@keyframes holo{60%,100%{transform:translateX(100%)}}
.idc-backin{padding:22px 22px 18px;display:flex;flex-direction:column;height:100%}
.idc-backin h3{margin-top:22px;font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;color:var(--mute);font-weight:500;text-transform:uppercase}
.idc-backin ul{margin-top:12px;display:flex;flex-direction:column;gap:9px}
.idc-backin li{font-size:13px;line-height:1.4;padding-left:16px;position:relative;color:var(--ink-2)}
.idc-backin li::before{content:"";position:absolute;left:0;top:7px;width:7px;height:1px;background:var(--ink)}
.idc-sig{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:30px;border-bottom:1px solid var(--line);padding-bottom:2px}
.idc-found{margin-top:8px;font-family:var(--font-mono);font-size:10.5px;color:var(--mute);overflow-wrap:anywhere}
`;

export default function About() {
  return (
    <section id="about" className="sec" aria-labelledby="about-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap about-grid">
        <div className="about-left">
          <SectionTag id="about" />
          <Heading id="about-title" text={`Hi, I'm ${PROFILE.firstName}`} accent={`${PROFILE.name.split(' ').slice(1).join(' ')}.`} />
          <p className="about-sum rv">{PROFILE.resumeSummary}</p>
          <p className="about-extra rv">{PROFILE.extraLine}</p>
          <div className="about-btns rv">
            <a className="btn btn-ink" href={asset(PROFILE.resume)} download={PROFILE.resumeFileName}>Résumé <ArrowDown /></a>
            {PROFILE.github && <a className="btn btn-line" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight /></a>}
            {PROFILE.linkedin && <a className="btn btn-line" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight /></a>}
          </div>
        </div>

        <div className="about-col">
          <IdCard />
        </div>

        <div className="about-right">
          <dl className="facts rv">
            <div className="fact"><dt>Location</dt><dd>{PROFILE.location}</dd></div>
            <div className="fact"><dt>Education</dt><dd>{PROFILE.education} ({PROFILE.graduation})</dd></div>
            <div className="fact"><dt>Current role</dt><dd>{PROFILE.currentRole}</dd></div>
            <div className="fact"><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
          </dl>
          <blockquote className="about-quote rv">
            “{PROFILE.quote}”
            <cite>Paraphrased from the résumé summary</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
