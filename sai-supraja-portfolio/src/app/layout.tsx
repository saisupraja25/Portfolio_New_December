import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { PROFILE, asset } from '@/lib/data';
import './globals.css';

const sans = localFont({
  src: '../fonts/InterTight-Variable.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});
const serif = localFont({
  src: [
    { path: '../fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
});
const mono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const description =
  'Financial Analyst with nearly four years of experience in financial risk analysis, forecasting and performance reporting, backed by Advanced Excel, SQL, Python and Power BI.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`),
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description,
  icons: { icon: asset('/favicon.svg') },
  openGraph: {
    type: 'website',
    title: `${PROFILE.name} | ${PROFILE.role}`,
    description,
    images: [{ url: 'og.jpg', width: 1200, height: 630, alt: `${PROFILE.name}, ${PROFILE.role}` }],
  },
  twitter: { card: 'summary_large_image', title: `${PROFILE.name} | ${PROFILE.role}`, description, images: ['og.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {!PROFILE.heroVideo && (
          <>
            <link rel="preload" as="image" href={asset(PROFILE.heroStillSmall)} media="(max-width: 980px)" fetchPriority="high" />
            <link rel="preload" as="image" href={asset(PROFILE.heroStill)} media="(min-width: 981px)" fetchPriority="high" />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
