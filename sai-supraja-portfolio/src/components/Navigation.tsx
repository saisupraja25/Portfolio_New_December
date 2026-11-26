import NavClient from './NavClient';

const css = `
.nav{position:fixed;inset:0 0 auto 0;z-index:50;pointer-events:none}
.nav-progress{position:fixed;top:0;left:0;height:3px;width:100%;background:var(--grad);transform-origin:0 50%;transform:scaleX(0);z-index:60}
.nav-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:18px}
.nav-brand{pointer-events:auto;display:flex;align-items:center;gap:12px}
.nav-mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-family:var(--font-mono);font-size:13px;font-weight:600;box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink);transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.nav.is-scrolled .nav-mark{background:var(--grad);color:#fff;box-shadow:none}
.nav-name{font-weight:600;letter-spacing:-.02em;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav.is-scrolled .nav-name{opacity:0;transform:translateX(-6px);pointer-events:none}
.nav-pill{pointer-events:auto;position:relative;display:flex;align-items:center;gap:2px;padding:5px;border-radius:999px;transition:background .5s var(--ease),box-shadow .5s var(--ease)}
.nav.is-scrolled .nav-pill,.nav.is-scrolled .nav-menu-btn{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(13,13,13,.35)}
.nav-ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:var(--ink);box-shadow:0 8px 18px -8px rgba(99,102,241,.8),inset 0 -2px 0 rgba(16,185,129,.9);transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s;opacity:0}
.nav-link{position:relative;z-index:1;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2);transition:color .4s var(--ease)}
.nav-link:hover{color:var(--ink)}
.nav-link[aria-current="true"]{color:#fff}
.nav-menu-btn{display:none;pointer-events:auto;height:42px;padding:0 18px;border-radius:999px;font-size:14px;font-weight:600;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2)}
.nav-overlay{position:fixed;inset:0;z-index:70;background:var(--paper);clip-path:circle(0% at calc(100% - 52px) 38px);transition:clip-path .8s var(--ease),visibility 0s .8s;visibility:hidden;pointer-events:auto;display:flex;flex-direction:column}
.nav-overlay.open{clip-path:circle(150% at calc(100% - 52px) 38px);visibility:visible;transition:clip-path .8s var(--ease)}
.nav-ov-top{display:flex;justify-content:space-between;align-items:center;padding:18px var(--gutter)}
.nav-ov-links{flex:1;display:flex;flex-direction:column;justify-content:center;gap:6px;padding:0 var(--gutter)}
.nav-ov-link{display:flex;align-items:baseline;gap:14px;font-size:clamp(40px,12vw,72px);font-weight:700;letter-spacing:-.045em;line-height:1.05;opacity:0;transform:translateY(30px);transition:opacity .6s var(--ease),transform .8s var(--ease)}
.nav-ov-link small{font-family:var(--font-mono);font-size:12px;font-weight:500;letter-spacing:0;color:var(--mute)}
.nav-overlay.open .nav-ov-link{opacity:1;transform:none;transition-delay:calc(.15s + var(--i)*60ms)}
.nav-ov-foot{padding:24px var(--gutter) 32px;font-size:14px;color:var(--mute)}
@media (max-width:860px){.nav-pill{display:none}.nav-menu-btn{display:inline-flex;align-items:center}}
`;

export default function Navigation() {
  return (
    <>
      <style>{css}</style>
      <NavClient />
    </>
  );
}
