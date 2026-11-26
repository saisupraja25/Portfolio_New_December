import { asset } from '@/lib/asset';

/** Official logos copied from devicon (MIT) and simple-icons (CC0) into public/logos. */
export const BRAND: Record<string, { file: string; tint: string }> = {
  python: { file: 'python.svg', tint: '#3776ab' },
  r: { file: 'r.svg', tint: '#2369bc' },
  pandas: { file: 'pandas.svg', tint: '#150458' },
  numpy: { file: 'numpy.svg', tint: '#4dabcf' },
  mysql: { file: 'mysql.svg', tint: '#00758f' },
  postgresql: { file: 'postgresql.svg', tint: '#336791' },
  oracle: { file: 'oracle.svg', tint: '#ea1b22' },
  microsoftsqlserver: { file: 'microsoftsqlserver.svg', tint: '#cc2927' },
  snowflake: { file: 'snowflake.svg', tint: '#29b5e8' },
  amazonwebservices: { file: 'amazonwebservices.svg', tint: '#ff9900' },
  azure: { file: 'azure.svg', tint: '#0078d4' },
  googlecloud: { file: 'googlecloud.svg', tint: '#4285f4' },
  looker: { file: 'looker.svg', tint: '#4285f4' },
  sap: { file: 'sap.svg', tint: '#0faaff' },
  talend: { file: 'talend.svg', tint: '#ff6d70' },
  salesforce: { file: 'salesforce.svg', tint: '#00a1e0' },
  git: { file: 'git.svg', tint: '#f05032' },
  github: { file: 'github.svg', tint: '#6e7681' },
  azuredevops: { file: 'azuredevops.svg', tint: '#0078d7' },
  jira: { file: 'jira.svg', tint: '#2684ff' },
  confluence: { file: 'confluence.svg', tint: '#2684ff' },
};

/**
 * Thin line icons (24×24, 1.5 stroke) for concepts and for tools whose official
 * logo is not available under a free licence (Power BI, Tableau, Excel, SSIS…).
 */
export const CONCEPT: Record<string, string> = {
  powerbi: 'M5 20V12M10 20V8M15 20V4M19 20h-16',
  tableau: 'M12 3v6M9 6h6M12 15v6M9 18h6M5 9v6M2 12h6M19 9v6M16 12h6',
  report: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15h7M9 18h4',
  sql: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  dax: 'M4 18h3l4-12h3M8 12h6M15 14l5 5M20 14l-5 5',
  query: 'M3 5h18l-7 8v6l-4 2v-8z',
  model: 'M4 5h6v5H4zM14 14h6v5h-6zM14 5h6v5h-6zM10 7.5h4M17 10v4M7 10v6.5h7',
  star: 'M9 9h6v6H9zM12 3v6M12 15v6M3 12h6M15 12h6M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4',
  flake: 'M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 3 3-3M9 20l3-3 3 3',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  warehouse: 'M3 10l9-6 9 6v10H3zM7 20v-6h10v6M7 17h10',
  pipeline: 'M3 7h6v4H3zM15 13h6v4h-6zM9 9h3v6h3M18 7v6M18 7h-3',
  flow: 'M5 6a2 2 0 1 0 0 .01M19 6a2 2 0 1 0 0 .01M12 18a2 2 0 1 0 0 .01M7 6h10M6 8l5 8M18 8l-5 8',
  dashboard: 'M3 4h18v16H3zM3 9h18M9 9v11M12 16l2-3 2 2 3-4',
  kpi: 'M4 18a8 8 0 1 1 16 0M12 18l4-6M8 14h.01M12 10h.01M16 14h.01',
  self: 'M8 8a4 4 0 1 0 8 0 4 4 0 1 0-8 0M4 21c0-4 3.6-7 8-7M15 18l2 2 4-4',
  story: 'M4 5h16v11H8l-4 4zM8 9h8M8 12h5',
  explore: 'M10 10m-6 0a6 6 0 1 0 12 0 6 6 0 1 0-12 0M14.5 14.5L21 21M7 11l2-2 2 2',
  stats: 'M3 20h18M5 20V14M9 20V9M13 20v-5M17 20V6M4 12c4-8 8-8 16-6',
  forecast: 'M3 17l5-5 4 3 4-6M16 9l5-4M16 9h4v.01M3 21h18',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  root: 'M12 3v8M12 11l-5 4M12 11l5 4M7 15l-2 5M7 15l2 5M17 15l-2 5M17 15l2 5',
  excel: 'M4 4h16v16H4zM4 9h16M4 14h16M10 4v16M15 4v16',
  pivot: 'M4 4h16v16H4zM4 9h16M9 4v16M13 13h4v4M17 13l-4 4',
  macro: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  lookup: 'M3 5h10v14H3zM3 10h10M8 5v14M15 13a3 3 0 1 0 6 0 3 3 0 1 0-6 0M20.2 15.2L22 17',
  apps: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  agile: 'M20 12a8 8 0 1 1-3-6.2M20 4v5h-5M9 12l2 2 4-4',
  sprint: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
  cycle: 'M12 4a8 8 0 1 1-7.4 5M4 4v5h5M12 8v4l3 2',
  waterfall: 'M3 4h6v4H3zM9 10h6v4H9zM15 16h6v4h-6zM6 8v4h3M12 14v4h3',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  clock: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 7v5l3 2',
};

export const isBrand = (key: string) => !key.startsWith('c:') && key in BRAND;

export const brandTint = (key: string) => (isBrand(key) ? BRAND[key].tint : '#8a8780');

export function TechLogo({ logo, size = 24, className = '' }: { logo: string; size?: number; className?: string }) {
  if (isBrand(logo)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(`/logos/${BRAND[logo].file}`)}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }
  const d = CONCEPT[logo.replace(/^c:/, '')] ?? CONCEPT.dashboard;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}
