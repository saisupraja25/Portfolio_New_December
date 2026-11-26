/**
 * Single source of content for the site. Every value below is taken from
 * public/Sai_Supraja_Financial_Analyst_Resume.pdf (text and embedded links). Components only read from here.
 * If something is not in the résumé, it is left out; empty lists hide their section.
 */

export { asset } from './asset';

export type HeroVideo = { mp4: string; webm: string; poster: string };

export const PROFILE = {
  name: 'Sai Supraja',
  firstName: 'Sai',
  initials: 'SS',
  role: 'Financial Analyst',
  /** hero heading: lead words + one italic accent word */
  roleLead: 'Financial',
  roleAccent: 'Analyst.',
  dept: 'Finance & Risk',
  email: 'saisupraja294@gmail.com',
  phone: '+1 (346) 638-2828',
  phoneHref: 'tel:+13466382828',
  location: 'USA',
  resumeSummary:
    'Financial Analyst with nearly four years of experience in financial risk analysis, forecasting and performance reporting across financial services and enterprise environments. Combines credit, market and operational risk assessment with hands-on data skills in Advanced Excel, SQL, Python and Power BI to turn financial data into clear decisions.',
  /** One more short line, verbatim from the summary. */
  extraLine:
    'Recent results include resolving more than $75,000 in cost discrepancies, improving reporting accuracy by 25% and cutting reporting time by 30%.',
  /** Paraphrase of the résumé summary ("to turn financial data into clear decisions"). */
  quote: 'Financial data in. Clear decisions out.',
  heroIntro: 'Financial risk analysis, forecasting and performance reporting, backed by SQL, Python and Power BI.',
  linkedin: 'https://www.linkedin.com/in/sai-supraja-kumar',
  github: 'https://github.com/saisupraja25' as string | null,
  resume: '/Sai_Supraja_Financial_Analyst_Resume.pdf',
  resumeFileName: 'Sai_Supraja_Financial_Analyst_Resume.pdf',
  education: 'M.S. Data Science, University of Houston',
  graduation: '2025',
  currentRole: 'Financial Analyst, Morgan Stanley',
  careerStart: '2021',
  /** Back of the ID card ("What I am"): all from the résumé. */
  cardLines: [
    'Financial Analyst · Morgan Stanley',
    'Financial Risk Analyst · XLogic (2021–2023)',
    'M.S. Data Science, University of Houston (2025)',
    'Excel · SQL · Python · Power BI · Azure',
    'Certified: Power BI Data Analyst Associate · Azure Data Fundamentals',
  ],
  /**
   * Talking-intro video. null = the hero shows the still portrait.
   * After running scripts/build-hero-assets.py, set this to:
   * { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', poster: '/hero/hero-poster.webp' }
   */
  heroVideo: null as HeroVideo | null,
  heroStill: '/hero/hero-still.webp',
  heroStillSmall: '/hero/hero-still-sm.webp',
  portrait: '/portrait-bust.webp',
};

export type SectionId = 'about' | 'skills' | 'work' | 'certifications' | 'experience' | 'achievements' | 'contact';

/* ------------------------------------------------------------------ */
/* Experience (verbatim bullets from the résumé)                       */
/* ------------------------------------------------------------------ */

export type Role = {
  company: string;
  place: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: Role[] = [
  {
    company: 'Morgan Stanley',
    place: 'USA',
    title: 'Financial Analyst',
    start: 'Jul 2025',
    end: 'Present',
    bullets: [
      'Reconcile monthly results against projected targets; identified and resolved more than $75,000 in cost discrepancies.',
      'Extract, transform, validate and reconcile financial datasets in SQL, improving reporting accuracy by 25%.',
      'Evaluate financial scenarios and market fluctuations to flag risks, improving decision-making efficiency by 20%.',
      'Build Advanced Excel models and forecasts for revenue, expenses, cash flow and portfolio performance.',
      'Assess financial exposure using financial statements, market trends and key risk indicators.',
      'Develop Power BI dashboards (DAX, Power Query) tracking financial KPIs, risk exposure and budget performance, and prepare performance reports and management presentations that support strategic decisions.',
      'Automate repetitive reporting and identify trends in financial data with Python (Pandas, NumPy).',
    ],
  },
  {
    company: 'XLogic',
    place: 'India',
    title: 'Financial Risk Analyst',
    start: 'Feb 2021',
    end: 'Jul 2023',
    bullets: [
      'Identified the three largest causes of budget overruns; presented findings that led management to adjust allocations and stopped recurring spend leaks.',
      'Built Power BI dashboards tracking financial KPIs and risk indicators, reducing reporting time by 30%.',
      'Reduced reporting turnaround time by 25% using Advanced Excel (PivotTables, VLOOKUP, financial formulas).',
      'Improved data accuracy by 20% by extracting, validating and reconciling financial data with SQL.',
      'Conducted credit risk assessments using financial ratios, payment histories, credit indicators and historical data.',
      'Evaluated balance sheets, income statements and cash flow reports to assess financial health; performed market and operational risk analysis and recommended mitigation strategies.',
      'Prepared risk assessment reports, audit documentation and management summaries, processing and analyzing data with Python (Pandas, NumPy), SQL Server and Microsoft Azure.',
    ],
  },
];

export type Study = { school: string; place: string; degree: string; start: string; end: string };

export const EDUCATION: Study[] = [
  { school: 'University of Houston', place: 'USA', degree: 'Master of Science in Data Science', start: 'Aug 2023', end: 'May 2025' },
];

/** Education + experience merged into one path, oldest first. */
export type PathStop = {
  kind: 'work' | 'study';
  year: string;
  title: string;
  place: string;
  period: string;
  details: string[];
};

export const PATH: PathStop[] = [
  { kind: 'work', year: '2021', title: 'Financial Risk Analyst', place: 'XLogic, India', period: 'Feb 2021 – Jul 2023', details: EXPERIENCE[1].bullets.slice(0, 3) },
  { kind: 'study', year: '2023', title: 'Master of Science in Data Science', place: 'University of Houston, USA', period: 'Aug 2023 – May 2025', details: [] },
  { kind: 'work', year: '2025', title: 'Financial Analyst', place: 'Morgan Stanley, USA', period: 'Jul 2025 – Present', details: EXPERIENCE[0].bullets.slice(0, 3) },
];

/* ------------------------------------------------------------------ */
/* Skills: the periodic table                                          */
/* ------------------------------------------------------------------ */

export type Family = 'Financial Analysis & FP&A' | 'Risk Management' | 'Reporting & Controls' | 'Tools & Technology';

/** One colour per family (used on tiles, filters and the inspector glow). */
export const FAMILY_COLOR: Record<Family, string> = {
  'Financial Analysis & FP&A': '#10b981',
  'Risk Management': '#f43f5e',
  'Reporting & Controls': '#f59e0b',
  'Tools & Technology': '#6366f1',
};

export type Skill = {
  name: string;
  symbol: string;
  family: Family;
  /** key into TechLogo (brand file or concept icon) */
  logo: string;
  /** patterns to look for in the experience bullets ("Used at") */
  match?: string[];
};

const S = (name: string, symbol: string, family: Family, logo: string, match?: string[]): Skill => ({ name, symbol, family, logo, match });

export const SKILL_GROUPS: { family: Family; skills: Skill[] }[] = [
  {
    family: 'Financial Analysis & FP&A',
    skills: [
      S('Financial Statement Analysis', 'Fs', 'Financial Analysis & FP&A', 'c:statement', ['financial statements', 'balance sheets', 'income statements']),
      S('Financial Modeling', 'Fm', 'Financial Analysis & FP&A', 'c:model', ['models']),
      S('Budgeting', 'Bu', 'Financial Analysis & FP&A', 'c:budget', ['budget']),
      S('Forecasting', 'Fc', 'Financial Analysis & FP&A', 'c:forecast', ['forecast']),
      S('Variance Analysis', 'Va', 'Financial Analysis & FP&A', 'c:variance', ['against projected targets']),
      S('Cash Flow Analysis', 'Cf', 'Financial Analysis & FP&A', 'c:cashflow', ['cash flow']),
      S('Profitability Analysis', 'Pf', 'Financial Analysis & FP&A', 'c:profit', ['profitab']),
      S('Revenue Analysis', 'Rv', 'Financial Analysis & FP&A', 'c:trend', ['revenue']),
      S('Financial Ratio Analysis', 'Fr', 'Financial Analysis & FP&A', 'c:ratio', ['financial ratios']),
    ],
  },
  {
    family: 'Risk Management',
    skills: [
      S('Credit Risk Assessment', 'Cr', 'Risk Management', 'c:credit', ['credit risk']),
      S('Market Risk Analysis', 'Mr', 'Risk Management', 'c:market', ['market risk', 'market fluctuations', 'market trends']),
      S('Operational Risk Management', 'Op', 'Risk Management', 'c:operational', ['operational risk']),
      S('Key Risk Indicators', 'Kr', 'Risk Management', 'c:kpi', ['risk indicators']),
      S('Scenario Analysis', 'Sc', 'Risk Management', 'c:scenario', ['scenarios']),
      S('Sensitivity Analysis', 'Se', 'Risk Management', 'c:sensitivity', ['sensitivity']),
      S('Risk Mitigation', 'Rm', 'Risk Management', 'c:shield', ['mitigation']),
    ],
  },
  {
    family: 'Reporting & Controls',
    skills: [
      S('Management Reporting', 'Mg', 'Reporting & Controls', 'c:report', ['management presentations', 'management summaries']),
      S('KPI Monitoring', 'Kp', 'Reporting & Controls', 'c:dashboard', ['KPIs']),
      S('Financial Reconciliation', 'Rc', 'Reporting & Controls', 'c:reconcile', ['reconcil']),
      S('Cost Analysis', 'Co', 'Reporting & Controls', 'c:cost', ['cost discrepancies', 'spend']),
      S('Audit Support', 'Au', 'Reporting & Controls', 'c:audit', ['audit']),
      S('Internal Controls', 'Ic', 'Reporting & Controls', 'c:controls', ['internal controls']),
    ],
  },
  {
    family: 'Tools & Technology',
    skills: [
      S('Advanced Excel', 'Xl', 'Tools & Technology', 'c:excel', ['Excel']),
      S('PivotTables', 'Pt', 'Tools & Technology', 'c:pivot'),
      S('VLOOKUP', 'Vl', 'Tools & Technology', 'c:lookup'),
      S('SQL', 'Sq', 'Tools & Technology', 'c:sql', ['\\bSQL\\b']),
      S('SQL Server', 'Ss', 'Tools & Technology', 'microsoftsqlserver'),
      S('Python', 'Py', 'Tools & Technology', 'python'),
      S('Pandas', 'Pd', 'Tools & Technology', 'pandas'),
      S('NumPy', 'Np', 'Tools & Technology', 'numpy'),
      S('Power BI', 'Pb', 'Tools & Technology', 'c:powerbi'),
      S('DAX', 'Dx', 'Tools & Technology', 'c:dax'),
      S('Power Query', 'Pq', 'Tools & Technology', 'c:query'),
      S('Microsoft Azure', 'Az', 'Tools & Technology', 'azure', ['Azure']),
    ],
  },
];

export const FAMILIES: Family[] = SKILL_GROUPS.map((g) => g.family);

/** Which roles mention a skill (computed from the bullets). */
export function usedAt(skill: Skill): string[] {
  const patterns = (skill.match ?? [skill.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')]).map((p) => new RegExp(p, 'i'));
  return EXPERIENCE.filter((role) => role.bullets.some((b) => patterns.some((re) => re.test(b)))).map(
    (r) => `${r.company} · ${r.title}`,
  );
}

/* ------------------------------------------------------------------ */
/* Work: the résumé lists no projects, so the section is hidden.       */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: { name: string; logo: string }[];
  github?: string;
  /** which illustrative mini-UI to draw */
  ui: 'dashboard' | 'pipeline' | 'chat';
};

/*
 * To show the Work section, add projects here (they should also be on the résumé).
 * Two public repositories on her GitHub, ready to use once confirmed:
 *
 * {
 *   id: 'merger', index: '01', title: 'Strategic Merger Operations Dashboard', kicker: 'Business Intelligence · Strategy',
 *   description: 'An OTT merger analysis for leadership, examining user growth, content libraries, audience engagement, subscription movement, watch time, inactivity, and revenue strategy.',
 *   features: ['User growth', 'Content libraries', 'Audience engagement', 'Revenue strategy'],
 *   tech: [{ name: 'Power BI', logo: 'c:powerbi' }, { name: 'KPI Monitoring', logo: 'c:dashboard' }],
 *   github: 'https://github.com/saisupraja25/Strategic_Merger_Operations_Dashboard', ui: 'dashboard',
 * },
 * {
 *   id: 'genai-hr', index: '02', title: 'GenAI HR Analytics', kicker: 'GenAI · Data workflow',
 *   description: 'A Streamlit prototype for resume and job-description analysis using PDF extraction, semantic chunking, embeddings, vector retrieval, and LLM-assisted fit evaluation.',
 *   features: ['PDF extraction', 'Semantic chunking', 'Vector retrieval', 'LLM-assisted review'],
 *   tech: [{ name: 'Python', logo: 'python' }],
 *   github: 'https://github.com/saisupraja25/GenAI_HR_Analytics', ui: 'chat',
 * },
 */
export const PROJECTS: Project[] = [];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS: { title: string; note: string; logo: string }[] = [
  { title: 'Power BI Data Analyst Associate', note: 'Microsoft Certified', logo: 'c:powerbi' },
  { title: 'Azure Data Fundamentals', note: 'Microsoft Certified', logo: 'azure' },
];

/* ------------------------------------------------------------------ */
/* Achievements: impact figures stated on the résumé                   */
/* ------------------------------------------------------------------ */

export type Achievement = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  logo: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { value: 75, prefix: '$', suffix: 'K+', label: 'Cost discrepancies resolved', caption: 'Monthly results reconciled against projected targets', detail: 'Morgan Stanley · Financial Analyst', logo: 'c:reconcile' },
  { value: 25, suffix: '%', label: 'Better reporting accuracy', caption: 'Financial datasets validated and reconciled in SQL', detail: 'Morgan Stanley · Financial Analyst', logo: 'microsoftsqlserver' },
  { value: 20, suffix: '%', label: 'Faster decision-making', caption: 'Scenario and market-fluctuation analysis', detail: 'Morgan Stanley · Financial Analyst', logo: 'c:scenario' },
  { value: 30, suffix: '%', label: 'Less reporting time', caption: 'Power BI dashboards for KPIs and risk indicators', detail: 'XLogic · Financial Risk Analyst', logo: 'c:powerbi' },
  { value: 25, suffix: '%', label: 'Faster reporting turnaround', caption: 'Advanced Excel: PivotTables, VLOOKUP, formulas', detail: 'XLogic · Financial Risk Analyst', logo: 'c:excel' },
  { value: 20, suffix: '%', label: 'Higher data accuracy', caption: 'Financial data extracted and reconciled with SQL', detail: 'XLogic · Financial Risk Analyst', logo: 'c:sql' },
  { value: 3, suffix: '', label: 'Budget-overrun causes fixed', caption: 'Findings led management to adjust allocations', detail: 'XLogic · Financial Risk Analyst', logo: 'c:budget' },
];

/* ------------------------------------------------------------------ */
/* Navigation and section order                                        */
/* ------------------------------------------------------------------ */

export const SECTION_ORDER: { id: SectionId; label: string; nav: boolean; show: boolean }[] = [
  { id: 'about', label: 'About', nav: true, show: true },
  { id: 'skills', label: 'Skills', nav: true, show: SKILL_GROUPS.length > 0 },
  { id: 'work', label: 'Selected work', nav: true, show: PROJECTS.length > 0 },
  { id: 'certifications', label: 'Certifications', nav: false, show: CERTIFICATIONS.length > 0 },
  { id: 'experience', label: 'Experience', nav: true, show: PATH.length > 0 },
  { id: 'achievements', label: 'Achievements', nav: true, show: ACHIEVEMENTS.length > 0 },
  { id: 'contact', label: 'Contact', nav: true, show: true },
];

const visible = SECTION_ORDER.filter((s) => s.show);

/** Mono section tags in render order: "01 — About" */
export const sectionTag = (id: SectionId) => {
  const i = visible.findIndex((s) => s.id === id);
  return { index: String(i + 1).padStart(2, '0'), label: visible[i]?.label ?? '' };
};

export const NAV = visible
  .filter((s) => s.nav)
  .map((s) => ({ id: s.id, label: s.id === 'work' ? 'Work' : s.label }));

export const SHOW = Object.fromEntries(SECTION_ORDER.map((s) => [s.id, s.show])) as Record<SectionId, boolean>;
