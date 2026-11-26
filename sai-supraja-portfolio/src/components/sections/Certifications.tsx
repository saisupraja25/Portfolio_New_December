import { CERTIFICATIONS } from '@/lib/data';
import { SectionTag } from '../ui/SectionTag';
import { TechLogo } from '../ui/TechLogo';
import { ArrowUpRight } from '../ui/Icons';

const css = `
.ct{background:var(--card);border-block:1px solid var(--line)}
.ct-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,80px);align-items:start}
.ct-head{position:sticky;top:110px}
.ct-count{margin-top:18px;color:var(--mute);font-size:15px}
.ct-list{border-top:1px solid var(--line)}
.ct-row{position:relative;display:grid;grid-template-columns:56px 44px minmax(0,1fr) 28px;align-items:center;gap:14px;padding:26px 14px;border-bottom:1px solid var(--line);isolation:isolate;outline:none;transition:color .5s var(--ease)}
.ct-row::before{content:"";position:absolute;inset:0;background:linear-gradient(100deg,#0e1220 0%,#312e81 50%,#6366f1 100%);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
.ct-row:hover,.ct-row:focus-visible{color:#fff}
.ct-row:hover::before,.ct-row:focus-visible::before{transform:scaleX(1)}
.ct-idx{font-family:var(--font-mono);font-size:13px;color:var(--mute);transition:color .5s}
.ct-row:hover .ct-idx,.ct-row:focus-visible .ct-idx,.ct-row:hover .ct-note,.ct-row:focus-visible .ct-note{color:rgba(255,255,255,.6)}
.ct-logo{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:var(--paper);color:var(--indigo);transition:transform .7s var(--ease)}
.ct-row:hover .ct-logo,.ct-row:focus-visible .ct-logo{transform:rotateY(360deg) scale(1.08)}
.ct-title{font-size:clamp(20px,2.2vw,30px);font-weight:700;letter-spacing:-.035em;line-height:1.1}
.ct-note{margin-top:4px;font-size:13px;color:var(--mute);transition:color .5s}
.ct-arrow{opacity:0;transform:translate(-10px,10px);transition:opacity .5s var(--ease),transform .6s var(--ease)}
.ct-row:hover .ct-arrow,.ct-row:focus-visible .ct-arrow{opacity:1;transform:none}
@media (max-width:860px){.ct-grid{grid-template-columns:1fr}.ct-head{position:relative;top:0}.ct-row{grid-template-columns:36px 40px minmax(0,1fr) 20px;padding:20px 6px}}
`;

export default function Certifications() {
  const n = CERTIFICATIONS.length;
  return (
    <section id="certifications" className="sec ct" aria-labelledby="cert-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap ct-grid">
        <div className="ct-head">
          <SectionTag id="certifications" />
          <h2 id="cert-title" className="h2"><span className="rv-mask"><span>Always <span className="it">learning.</span></span></span></h2>
          <p className="ct-count rv">{n} certification{n === 1 ? '' : 's'} listed on the résumé.</p>
        </div>
        <ol className="ct-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="ct-row rv" tabIndex={0} style={{ ['--i' as string]: i }}>
              <span className="ct-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="ct-logo"><TechLogo logo={c.logo} size={24} /></span>
              <span>
                <span className="ct-title" style={{ display: 'block' }}>{c.title}</span>
                <span className="ct-note">{c.note}</span>
              </span>
              <span className="ct-arrow"><ArrowUpRight size={20} /></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
