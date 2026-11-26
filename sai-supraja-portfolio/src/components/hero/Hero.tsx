import { PROFILE, asset } from '@/lib/data';
import { ArrowDown } from '../ui/Icons';
import HeroMedia from './HeroMedia';
import HeroLinks from './HeroLinks';

const css = `
.hero{position:relative;min-height:100svh;display:flex;align-items:flex-end;overflow:clip}
.h-in{animation:hIn 1s var(--ease) both;animation-delay:calc(var(--i,0) * 90ms)}
.h-mask{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.h-mask>span{display:block;animation:hMask 1.1s var(--ease) both;animation-delay:calc(var(--i,0) * 90ms)}
@keyframes hIn{from{opacity:0;transform:translateY(24px)}}
@keyframes hMask{from{transform:translateY(105%)}}
.hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:end;gap:clamp(16px,2vw,40px);width:100%}
.hero-ghost{position:absolute;left:50%;top:clamp(70px,13vh,140px);transform:translateX(-50%);font-weight:800;font-size:clamp(150px,31vw,560px);line-height:.8;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.13);white-space:nowrap;user-select:none;pointer-events:none;z-index:0}
.hero-ghost{animation:heroGhost 1.6s var(--ease) .1s both}
@keyframes heroGhost{from{opacity:0;transform:translateX(-50%) translateY(40px)}}
.hero-stage{position:relative;z-index:1;height:min(96svh,1040px);aspect-ratio:768/960;margin-inline:auto;max-width:100%}
.hero-left,.hero-right{position:relative;z-index:2;padding-bottom:clamp(40px,11vh,120px)}
.hero-left{container-type:inline-size}
.hero h1{margin-top:18px;font-weight:700;font-size:clamp(30px,17cqi,72px);letter-spacing:-.045em;line-height:1}
.hero h1 .it{display:block}
.hero-intro{max-width:300px;color:var(--ink-2);font-size:15px;line-height:1.55}
.hero-ctas{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-top:22px}
.hero-loc{margin-top:26px;font-family:var(--font-mono);font-size:12px;color:var(--mute);display:flex;align-items:center;gap:8px}
.hero-loc i{width:7px;height:7px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 4px rgba(13,13,13,.1)}
.hm{position:relative;width:100%;height:100%}
.hm video,.hm img{width:100%;height:100%;object-fit:contain;object-position:50% 100%}
.hm video{mix-blend-mode:multiply}
.hm-in{animation:hmIn 1.4s var(--ease) both}
@keyframes hmIn{from{opacity:.01;transform:translateY(40px) scale(.98)}}
.hm-still{animation:hmBreath 6s ease-in-out 1.8s infinite alternate;transform-origin:50% 100%}
@keyframes hmBreath{from{transform:none}to{transform:translateY(-4px) scale(1.006)}}
.hm-sound{position:absolute;right:6%;bottom:12%;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;box-shadow:0 12px 26px -12px rgba(13,13,13,.6);transition:transform .5s var(--ease)}
.hm-sound:hover{transform:scale(1.06)}
.hm-sound svg{width:16px;height:16px}
.hm-sound.ping::after{content:"";position:absolute;inset:-6px;border-radius:50%;box-shadow:0 0 0 1.5px var(--ink);animation:hmPing 1.8s var(--ease) infinite}
@keyframes hmPing{0%{opacity:.7;transform:scale(.85)}100%{opacity:0;transform:scale(1.5)}}
@media (max-width:980px){
  .hero{align-items:flex-start;padding-top:84px}
  .hero-grid{grid-template-columns:minmax(0,1fr);gap:0}
  .hero-stage{height:62svh;order:-1;width:100%;max-width:min(100%,49.6svh)}
  .hero-ghost{top:110px;font-size:clamp(140px,44vw,360px)}
  .hero-left{padding-bottom:0;margin-top:14px;text-align:center}
  .hero-left .tag{justify-content:center}
  .hero h1{font-size:clamp(34px,11cqi,64px)}
  .hero-right{padding-bottom:56px;display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:18px}
  .hero-ctas{flex-direction:row;flex-wrap:wrap;justify-content:center}
  .hero-loc{justify-content:center}
}
`;

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <style>{css}</style>
      <p className="hero-ghost" aria-hidden="true">{PROFILE.firstName.toUpperCase()}</p>
      <div className="wrap hero-grid">
        <div className="hero-left">
          <p className="tag h-in" style={{ ['--i' as string]: 0 }}><b>00</b><i aria-hidden="true" />Hello, I&apos;m {PROFILE.name}</p>
          <h1 id="hero-title">
            <span className="h-mask" style={{ ['--i' as string]: 1 }}><span>Business Intelligence</span></span>
            <span className="h-mask" style={{ ['--i' as string]: 2 }}><span className="it">Analyst.</span></span>
          </h1>
        </div>
        <HeroMedia />
        <div className="hero-right">
          <p className="hero-intro h-in" style={{ ['--i' as string]: 2 }}>{PROFILE.heroIntro}</p>
          <div className="hero-ctas h-in" style={{ ['--i' as string]: 3 }}>
            <HeroLinks />
            <a className="btn btn-line" href={asset(PROFILE.resume)} download={PROFILE.resumeFileName}>
              Résumé <ArrowDown />
            </a>
          </div>
          <p className="hero-loc h-in" style={{ ['--i' as string]: 4 }}><i aria-hidden="true" />Based in the {PROFILE.location}</p>
        </div>
      </div>
    </section>
  );
}
