# Sai Supraja: talking-video portfolio

A light, quiet, single-page portfolio (white, black and gray) built with Next.js 15, React 19, TypeScript, Tailwind CSS 4 and Lenis. All content comes from `public/Sai-Supraja-Resume.pdf` and lives in one file: `src/lib/data.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out (also runs type checks and lint)
```

Node 20 or newer is recommended (built and tested with Node 22).

## Deploy to GitHub Pages

The site is exported as static files, and `.github/workflows/deploy.yml` builds and publishes it on every push to `main`.

1. Replace the repository contents with this project (keep `.github/`, drop the old `index.html`, `style.css` and `script.js`).
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow sets the base path automatically (`/<repo-name>` for project pages, none for `<user>.github.io`).

To preview a project-page build locally: `NEXT_PUBLIC_BASE_PATH=/Portfoilo-Website- npm run build`.

## Sections

| # | Section | Component | What it does |
|---|---|---|---|
| 00 | Hero | `hero/Hero.tsx`, `hero/HeroMedia.tsx` | Talking intro video (or the cut-out portrait until the video exists), giant outlined first name, role heading, CTAs |
| 01 | About | `sections/About.tsx`, `sections/IdCard.tsx` | Summary, quick facts, and a lanyard ID card that swings with the pointer and flips (hover, tap, Enter/Space) |
| 02 | Skills | `sections/Skills.tsx`, `sections/SkillsTable.tsx` | Periodic table of every résumé skill, family filters, inspector with logo and where each skill was used |
| – | Work | `sections/Work.tsx`, `sections/WorkAccordion.tsx` | Expanding accordion gallery. Hidden while `PROJECTS` is empty (the résumé lists no projects) |
| 03 | Certifications | `sections/Certifications.tsx` | Ink-flood index |
| 04 | Experience | `sections/Experience.tsx`, `sections/Timeline.tsx` | Education and experience as one path; the spine draws as you scroll |
| 05 | Achievements | `sections/Achievements.tsx`, `sections/AchievementsTrack.tsx` | Pinned horizontal gallery of résumé impact figures with count-up numbers |
| 06 | Contact | `sections/Contact.tsx` | Hopping-letter heading, email with Copy chip, phone, LinkedIn, footer |

Section numbers are assigned automatically in render order, so adding projects renumbers everything.

## Content rules

Nothing is invented. If the résumé does not say it, the site does not show it. Notes from the extraction:

- **Email:** the résumé uses `saisupraja294@gmail.com` (the previous site used a different address).
- **GitHub and projects:** not on the résumé, so the GitHub button and the Work section are hidden. Two public repositories from the previous site are ready to paste into `PROJECTS` in `src/lib/data.ts` once confirmed (and ideally added to the résumé). Set `PROFILE.github` to show the GitHub buttons.
- **Achievements:** the résumé has no awards section, so this section shows impact figures stated in the experience bullets (55%, 50%, 99%, 25+ hrs, 40%, 98%, 5M+).
- **Certifications:** issuers are not named on the résumé, so each shows "Listed on résumé".
- **Quote:** a paraphrase of the résumé summary, labelled as such.

## Add the talking intro video

The hero is ready for the video; until then it shows a cut-out of the supplied portrait. The video should be made and approved by Sai Supraja herself (Step 1 and Step 2 of the guide).

1. Record or generate an 8 to 15 second intro, 16:9, person centred against a plain white or light background, with a short pause at the start and end.
2. Build the looping hero assets (needs ffmpeg and numpy):

   ```bash
   python3 scripts/build-hero-assets.py intro.mp4
   # optional: --crop W:H:X:Y  --seconds 10  --fade 0.5  --portrait
   ```

   It crops head to toe at 768×960, whitens the background, cross-fades the last 0.5 s into the first 0.5 s for picture and audio (sample-accurate, never retimed, so lips stay in sync), and writes `public/hero/hero.mp4`, `hero.webm`, `hero-poster.webp` and `public/og.jpg`. `--portrait` also replaces `public/portrait-bust.webp` with the sharpest frame.
3. In `src/lib/data.ts` set:

   ```ts
   heroVideo: { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', poster: '/hero/hero-poster.webp' },
   ```

Video behaviour: it tries to play with sound and falls back to muted if the browser blocks it (a soft ring pulses on the round button). The first click, tap or key press anywhere turns the sound on. It pauses as soon as less than 35% of the hero is visible and resumes when you scroll back. The ▶ / ❚❚ button toggles sound.

## Quality checks (last run)

- `npm run build`: no type or lint errors; first-load JS 121 kB.
- Playwright at 1440×900 and 390×844: no horizontal overflow, no console errors, every reveal fires; reduced motion turns off smooth scroll and decorative motion.
- Interactions tested: nav and mobile menu (Esc, scroll lock), skill filters and inspector, card swing and flip (mouse, keyboard, touch), pinned achievements with count-up, copy email, and the video's sound unlock / pause on scroll / resume (with a test clip).
- Video pipeline tested on a synthetic clip: the loop seam differs from the next frame by the same amount as any two normal frames, and the audio seam has no click.
- Lighthouse (served with gzip, as GitHub Pages does): mobile Performance 92 to 94, Accessibility 100, Best Practices 100, SEO 100; desktop Performance 99, Accessibility 100.

## Credits and licences

- Fonts (SIL Open Font License, files in `src/fonts`): Inter Tight, Instrument Serif, JetBrains Mono.
- Brand logos in `public/logos`: [devicon](https://github.com/devicons/devicon) (MIT, `LICENSE-devicon.txt`) and [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0, `LICENSE-simple-icons.md`, see `DISCLAIMER-simple-icons.md`). Logos are trademarks of their owners and are used only to name the tools.
- Power BI, Tableau, Excel, SSIS, SSRS, Informatica, Alteryx and Dynamics 365 have no official logo available under a free licence, so they use custom line icons, as do concept skills.
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis) (MIT).
