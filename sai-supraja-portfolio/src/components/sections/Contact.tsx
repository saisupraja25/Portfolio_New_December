import { PROFILE } from '@/lib/data';
import { SectionTag } from '../ui/SectionTag';
import { ArrowUpRight } from '../ui/Icons';
import CopyEmail from './CopyEmail';
import BackToTop from './BackToTop';

const css = `
.cx{padding-bottom:0}
.cx-h{margin-top:20px;font-weight:800;font-size:clamp(46px,9.4vw,152px);letter-spacing:-.055em;line-height:.95}
.cx-line{display:block;white-space:nowrap}
.cx-line.it{font-weight:400;letter-spacing:-.03em}
.cx-ch{display:inline-block;transition:transform .5s var(--ease)}
@media (hover:hover){.cx-ch:hover{animation:hop .6s var(--ease)}}
@keyframes hop{0%{transform:none}35%{transform:translateY(-.16em)}65%{transform:translateY(.02em)}100%{transform:none}}
.cx-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:32px;align-items:end;margin-top:clamp(40px,7vh,80px)}
.cx-mail{display:flex;align-items:center;flex-wrap:wrap;gap:14px}
.cx-mail a{font-size:clamp(22px,3.2vw,46px);font-weight:600;letter-spacing:-.035em;text-decoration:underline;text-underline-offset:.16em;text-decoration-thickness:2px;overflow-wrap:anywhere}
.cx-copy{height:36px;padding:0 14px;border-radius:999px;font-family:var(--font-mono);font-size:12px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.22);transition:background .3s,color .3s}
.cx-copy:hover,.cx-copy.done{background:var(--ink);color:#fff}
.cx-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.cx-badge{position:relative;width:150px;height:150px;display:grid;place-items:center}
.cx-badge > svg{position:absolute;inset:0;animation:spin 18s linear infinite}
.cx-badge text{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;fill:var(--ink)}
.cx-badge b{position:relative;width:54px;height:54px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center}
@keyframes spin{to{transform:rotate(360deg)}}
.ft{margin-top:clamp(80px,12vh,140px);border-top:1px solid var(--line);padding-block:26px 34px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:14px;color:var(--mute)}
.ft a,.ft button{color:var(--ink);font-weight:500}
@media (max-width:700px){.cx-row{grid-template-columns:1fr}.cx-badge{width:120px;height:120px}}
`;

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {Array.from(word).map((ch, i) => <span key={i} className="cx-ch">{ch}</span>)}
          {wi < arr.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const year = new Date().getFullYear();
  return (
    <section id="contact" className="sec cx" aria-labelledby="contact-title" tabIndex={-1}>
      <style>{css}</style>
      <div className="wrap">
        <SectionTag id="contact" />
        <h2 id="contact-title" className="cx-h" aria-label="Let's build something together.">
          <span className="rv-mask" aria-hidden="true"><span className="cx-line"><Letters text="Let's build" /></span></span>
          <span className="rv-mask" aria-hidden="true" style={{ ['--i' as string]: 1 }}><span className="cx-line it"><Letters text="something together." /></span></span>
        </h2>
        <div className="cx-row">
          <div>
            <CopyEmail email={PROFILE.email} />
            <div className="cx-links rv">
              <a className="btn btn-line" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
              {PROFILE.github && <a className="btn btn-line" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight /></a>}
              {PROFILE.linkedin && <a className="btn btn-line" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight /></a>}
            </div>
          </div>
          <a className="cx-badge" href={`mailto:${PROFILE.email}`}>
            <span className="sr-only">Say hello by email</span>
            <svg viewBox="0 0 150 150" aria-hidden="true">
              <defs><path id="cx-circle" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs>
              <text><textPath href="#cx-circle">Say hello · Say hello · Say hello · </textPath></text>
            </svg>
            <b aria-hidden="true"><ArrowUpRight size={20} /></b>
          </a>
        </div>
        <footer className="ft">
          <span>© {year} {PROFILE.name}</span>
          <BackToTop />
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
