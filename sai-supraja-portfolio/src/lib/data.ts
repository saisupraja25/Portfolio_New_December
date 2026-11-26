/**
 * Single source of content for the site. Every value below is taken from
 * public/Sai-Supraja-Resume.pdf (text and embedded links). Components only read from here.
 * If something is not in the résumé, it is left out; empty lists hide their section.
 */

export { asset } from './asset';

export type HeroVideo = { mp4: string; webm: string; poster: string };

export const PROFILE = {
  name: 'Sai Supraja',
  firstName: 'Sai',
  initials: 'SS',
  role: 'Business Intelligence Analyst',
  email: 'saisupraja294@gmail.com',
  phone: '+1 (346) 638-2828',
  phoneHref: 'tel:+13466382828',
  location: 'USA',
  resumeSummary:
    'Business Intelligence Analyst with 4+ years of experience in designing enterprise BI solutions, developing interactive dashboards, and transforming complex datasets into actionable business insights. Expertise in Power BI, Tableau, SQL, Python, Excel, ETL, Azure Data Factory, and Data Warehousing. Delivered BI solutions reduced manual reporting by 55%, improved data accuracy by 35%, and accelerated business decision-making by 40%. Skilled in data modeling, SQL optimization, KPI reporting, automation, and collaborating with cross-functional teams to drive business growth in Agile environments.',
  /** One more short line, verbatim from the Walmart role. */
  extraLine:
    'Collaborated with business stakeholders to gather requirements and deliver BI solutions that improved operational efficiency by 30%.',
  /** Paraphrase of the résumé summary ("transforming complex datasets into actionable business insights"). */
  quote: 'Complex datasets in. Actionable business insight out.',
  heroIntro: 'Designing enterprise BI solutions and interactive dashboards for 4+ years.',
  linkedin: 'https://www.linkedin.com/in/sai-supraja-kumar',
  /** Not in the résumé, so not shown. Add it here if the résumé gains a GitHub link. */
  github: null as string | null,
  resume: '/Sai-Supraja-Resume.pdf',
  resumeFileName: 'Sai-Supraja-Resume.pdf',
  education: 'M.S. Data Science, University of Houston',
  graduation: '2025',
  currentRole: 'Business Intelligence Analyst, Walmart',
  careerStart: '2021',
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
/* Experience (verbatim bullets)                                       */
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
    company: 'Walmart',
    place: 'USA',
    title: 'Business Intelligence Analyst',
    start: 'Jul 2025',
    end: 'Present',
    bullets: [
      'Developed enterprise-wide Power BI dashboards integrating sales, finance, supply chain, and customer data, reducing manual reporting effort by 55%.',
      'Automated ETL workflows using Azure Data Factory, SQL, and Power Query, reducing data refresh time by 50%.',
      'Created executive KPI dashboards enabling leadership to monitor revenue, profitability, inventory, and customer performance in real time, improving decision-making speed by 40%.',
      'Built reusable DAX measures, calculated columns, and Power Query transformations, reducing report development time by 35%.',
      'Implemented Row-Level Security (RLS), data governance policies, and validation processes, improving reporting accuracy to 99%.',
      'Collaborated with business stakeholders to gather requirements and deliver BI solutions that improved operational efficiency by 30%.',
      'Automated weekly and monthly reporting processes, saving over 25 hours per week across business teams.',
    ],
  },
  {
    company: 'Accenture',
    place: 'India',
    title: 'Business Intelligence Developer',
    start: 'Jun 2022',
    end: 'Jul 2023',
    bullets: [
      'Designed and deployed Power BI & Tableau dashboards for finance, HR, sales, & operations, improving reporting efficiency by 45%.',
      'Developed optimized SQL stored procedures, views, and complex queries, reducing report execution time by 40%.',
      'Built enterprise data models using Star Schema and Snowflake Schema, improving reporting scalability by 35%.',
      'Streamlined ETL pipeline creation leveraging SQL, SSIS, and Azure Data Factory; achieved a significant reduction in manual processing tasks that led to an overall efficiency gain of approximately 50% monthly.',
      'Integrated ERP, CRM, and cloud-based data sources into centralized BI solutions, improving data accessibility by 40%.',
      'Worked in Agile Scrum teams, participating in sprint planning, UAT, deployment, and production support while maintaining 98% on-time project delivery.',
      'Performed data cleansing, validation, and reconciliation, increasing data quality and reporting accuracy by 30%.',
    ],
  },
  {
    company: 'XLogic',
    place: 'India',
    title: 'Data Analyst',
    start: 'Feb 2021',
    end: 'May 2022',
    bullets: [
      'Investigated large business datasets with SQL, Python, and Excel, uncovering trends that boosted operational efficiency by 20% and improved data quality by 30%.',
      'Cleaned, transformed, and validated over 5 million records, ensuring 99% data accuracy for business reporting.',
      'Automated Excel reports using Power Query and VBA, reducing manual effort by 35%.',
      'Created interactive business intelligence dashboards using Power BI and Tableau, improving data visualization and reducing report generation time by 40%.',
      'Performed exploratory data analysis (EDA) and statistical analysis to identify customer behavior and business opportunities.',
      'Assisted in developing ETL workflows and data migration processes supporting enterprise reporting initiatives.',
      'Collaborated with cross-functional teams to define KPIs and business metrics, improving reporting consistency by 25%.',
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
  { kind: 'work', year: '2021', title: 'Data Analyst', place: 'XLogic, India', period: 'Feb 2021 – May 2022', details: EXPERIENCE[2].bullets.slice(0, 3) },
  { kind: 'work', year: '2022', title: 'Business Intelligence Developer', place: 'Accenture, India', period: 'Jun 2022 – Jul 2023', details: EXPERIENCE[1].bullets.slice(0, 3) },
  { kind: 'study', year: '2023', title: 'Master of Science in Data Science', place: 'University of Houston, USA', period: 'Aug 2023 – May 2025', details: [] },
  { kind: 'work', year: '2025', title: 'Business Intelligence Analyst', place: 'Walmart, USA', period: 'Jul 2025 – Present', details: EXPERIENCE[0].bullets.slice(0, 3) },
];

/* ------------------------------------------------------------------ */
/* Skills: the periodic table                                          */
/* ------------------------------------------------------------------ */

export type Family =
  | 'Business Intelligence'
  | 'Languages'
  | 'Databases'
  | 'Data Warehousing'
  | 'ETL & Integration'
  | 'Cloud'
  | 'Reporting'
  | 'Analytics'
  | 'Microsoft Office'
  | 'Business Apps'
  | 'Tools'
  | 'Methodologies';

export type Skill = {
  name: string;
  symbol: string;
  family: Family;
  /** key into TechLogo (brand file or concept icon) */
  logo: string;
  /** words to look for in the experience bullets ("Used at") */
  match?: string[];
};

const S = (name: string, symbol: string, family: Family, logo: string, match?: string[]): Skill => ({ name, symbol, family, logo, match });

export const SKILL_GROUPS: { family: Family; skills: Skill[] }[] = [
  {
    family: 'Business Intelligence',
    skills: [
      S('Power BI', 'Pb', 'Business Intelligence', 'c:powerbi'),
      S('Tableau', 'Tb', 'Business Intelligence', 'c:tableau'),
      S('Looker', 'Lk', 'Business Intelligence', 'looker'),
      S('Microsoft SSRS', 'Rs', 'Business Intelligence', 'c:report', ['SSRS']),
      S('SAP BusinessObjects', 'Bo', 'Business Intelligence', 'sap', ['BusinessObjects']),
    ],
  },
  {
    family: 'Languages',
    skills: [
      S('SQL', 'Sq', 'Languages', 'c:sql'),
      S('Python', 'Py', 'Languages', 'python'),
      S('Pandas', 'Pd', 'Languages', 'pandas'),
      S('NumPy', 'Np', 'Languages', 'numpy'),
      S('R', 'R', 'Languages', 'r', ['\\bR\\b']),
      S('DAX', 'Dx', 'Languages', 'c:dax'),
      S('Power Query (M)', 'Pq', 'Languages', 'c:query', ['Power Query']),
    ],
  },
  {
    family: 'Databases',
    skills: [
      S('SQL Server', 'Ss', 'Databases', 'microsoftsqlserver'),
      S('MySQL', 'My', 'Databases', 'mysql'),
      S('PostgreSQL', 'Pg', 'Databases', 'postgresql'),
      S('Oracle Database', 'Or', 'Databases', 'oracle'),
      S('Snowflake', 'Sf', 'Databases', 'snowflake', ['\\bSnowflake\\b(?! Schema)']),
      S('Amazon Redshift', 'Rd', 'Databases', 'amazonwebservices', ['Redshift']),
    ],
  },
  {
    family: 'Data Warehousing',
    skills: [
      S('Data Modeling', 'Dm', 'Data Warehousing', 'c:model', ['data models']),
      S('Star Schema', 'St', 'Data Warehousing', 'c:star'),
      S('Snowflake Schema', 'Sh', 'Data Warehousing', 'c:flake'),
      S('Dimensional Modeling', 'Di', 'Data Warehousing', 'c:cube'),
      S('Data Warehouse Design', 'Dw', 'Data Warehousing', 'c:warehouse'),
    ],
  },
  {
    family: 'ETL & Integration',
    skills: [
      S('SSIS', 'Is', 'ETL & Integration', 'c:pipeline'),
      S('Azure Data Factory', 'Df', 'ETL & Integration', 'azure'),
      S('Informatica', 'If', 'ETL & Integration', 'c:pipeline'),
      S('Talend', 'Tl', 'ETL & Integration', 'talend'),
      S('Alteryx', 'Ax', 'ETL & Integration', 'c:flow'),
      S('ETL Pipeline Development', 'Et', 'ETL & Integration', 'c:pipeline', ['ETL']),
    ],
  },
  {
    family: 'Cloud',
    skills: [
      S('Microsoft Azure', 'Az', 'Cloud', 'azure', ['Azure']),
      S('AWS', 'Aw', 'Cloud', 'amazonwebservices'),
      S('Google Cloud Platform', 'Gc', 'Cloud', 'googlecloud', ['GCP']),
    ],
  },
  {
    family: 'Reporting',
    skills: [
      S('Interactive Dashboards', 'Id', 'Reporting', 'c:dashboard', ['interactive']),
      S('KPI Reporting', 'Kp', 'Reporting', 'c:kpi', ['KPI']),
      S('Executive Dashboards', 'Ed', 'Reporting', 'c:dashboard', ['executive']),
      S('Self-Service BI', 'Sb', 'Reporting', 'c:self'),
      S('Data Storytelling', 'Ds', 'Reporting', 'c:story'),
    ],
  },
  {
    family: 'Analytics',
    skills: [
      S('Exploratory Data Analysis', 'Ea', 'Analytics', 'c:explore', ['EDA']),
      S('Statistical Analysis', 'Sa', 'Analytics', 'c:stats'),
      S('Forecasting', 'Fc', 'Analytics', 'c:forecast'),
      S('Trend Analysis', 'Ta', 'Analytics', 'c:trend', ['trends']),
      S('Root Cause Analysis', 'Rc', 'Analytics', 'c:root'),
    ],
  },
  {
    family: 'Microsoft Office',
    skills: [
      S('Advanced Excel', 'Xl', 'Microsoft Office', 'c:excel', ['Excel']),
      S('Pivot Tables', 'Pt', 'Microsoft Office', 'c:pivot'),
      S('Power Pivot', 'Pp', 'Microsoft Office', 'c:pivot'),
      S('VBA', 'Vb', 'Microsoft Office', 'c:macro'),
      S('XLOOKUP', 'Xk', 'Microsoft Office', 'c:lookup'),
    ],
  },
  {
    family: 'Business Apps',
    skills: [
      S('SAP', 'Sp', 'Business Apps', 'sap', ['\\bSAP\\b']),
      S('Oracle ERP', 'Oe', 'Business Apps', 'oracle', ['ERP']),
      S('Salesforce CRM', 'Sc', 'Business Apps', 'salesforce', ['CRM']),
      S('Microsoft Dynamics 365', 'Dy', 'Business Apps', 'c:apps', ['Dynamics']),
    ],
  },
  {
    family: 'Tools',
    skills: [
      S('Git', 'Gt', 'Tools', 'git', ['\\bGit\\b']),
      S('GitHub', 'Gh', 'Tools', 'github'),
      S('Azure DevOps', 'Ad', 'Tools', 'azuredevops'),
      S('Jira', 'Ji', 'Tools', 'jira'),
      S('Confluence', 'Cf', 'Tools', 'confluence'),
    ],
  },
  {
    family: 'Methodologies',
    skills: [
      S('Agile', 'Ag', 'Methodologies', 'c:agile'),
      S('Scrum', 'Sm', 'Methodologies', 'c:sprint'),
      S('SDLC', 'Sd', 'Methodologies', 'c:cycle'),
      S('Waterfall', 'Wf', 'Methodologies', 'c:waterfall'),
    ],
  },
];

export const FAMILIES: Family[] = SKILL_GROUPS.map((g) => g.family);

/** Which roles mention a skill (computed from the verbatim bullets). */
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
 * To show the Work section, add projects here (they must also be on the résumé).
 * Two public repositories already featured on the previous site, ready to use once confirmed:
 *
 * {
 *   id: 'merger', index: '01', title: 'Strategic Merger Operations Dashboard', kicker: 'Business Intelligence · Strategy',
 *   description: 'An OTT merger analysis for leadership, examining user growth, content libraries, audience engagement, subscription movement, watch time, inactivity, and revenue strategy.',
 *   features: ['User growth', 'Content libraries', 'Audience engagement', 'Revenue strategy'],
 *   tech: [{ name: 'Power BI', logo: 'c:powerbi' }, { name: 'KPI Reporting', logo: 'c:kpi' }],
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
/* Certifications (issuer is not stated on the résumé)                 */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS: { title: string; note: string; logo: string }[] = [
  { title: 'Power BI Data Analyst Associate', note: 'Listed on résumé', logo: 'c:powerbi' },
  { title: 'Azure Data Fundamentals', note: 'Listed on résumé', logo: 'azure' },
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
  { value: 55, suffix: '%', label: 'Less manual reporting', caption: 'Enterprise-wide Power BI dashboards', detail: 'Walmart · Business Intelligence Analyst', logo: 'c:powerbi' },
  { value: 50, suffix: '%', label: 'Faster data refresh', caption: 'ETL automated with Azure Data Factory, SQL & Power Query', detail: 'Walmart · Business Intelligence Analyst', logo: 'azure' },
  { value: 99, suffix: '%', label: 'Reporting accuracy', caption: 'Row-Level Security, governance & validation', detail: 'Walmart · Business Intelligence Analyst', logo: 'c:shield' },
  { value: 25, suffix: '+ hrs', label: 'Saved every week', caption: 'Automated weekly and monthly reporting', detail: 'Walmart · Business Intelligence Analyst', logo: 'c:clock' },
  { value: 40, suffix: '%', label: 'Faster report execution', caption: 'Optimized SQL stored procedures, views & queries', detail: 'Accenture · Business Intelligence Developer', logo: 'microsoftsqlserver' },
  { value: 98, suffix: '%', label: 'On-time project delivery', caption: 'Agile Scrum teams, from sprint planning to production', detail: 'Accenture · Business Intelligence Developer', logo: 'c:agile' },
  { value: 5, suffix: 'M+', label: 'Records validated', caption: 'Cleaned, transformed & validated at 99% accuracy', detail: 'XLogic · Data Analyst', logo: 'c:model' },
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
