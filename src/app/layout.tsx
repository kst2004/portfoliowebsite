import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import MotionProvider from '../components/MotionProvider';
import PageTransition from '../components/PageTransition';
import SmoothScroll from '../components/SmoothScroll';
import FilmGrain from '../components/FilmGrain';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import Preloader from '../components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saitejakolan.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Saiteja Kolan — Freelance Creative Designer & 3D Visualizer',
    template: '%s | Saiteja Kolan',
  },
  description:
    'Freelance Creative Designer and 3D Visualizer based in Hyderabad. Brand identity, print design, architectural visualization, and motion work delivered to production standards across hospitality, construction, food & beverage, sports, architecture, and media.',
  keywords: [
    'Saiteja Kolan',
    'freelance designer',
    '3D visualizer',
    'brand identity',
    'logo design',
    'architectural visualization',
    'print design',
    'Hyderabad',
    'interior rendering',
  ],
  authors: [{ name: 'Saiteja Kolan', url: BASE_URL }],
  openGraph: {
    title: 'Saiteja Kolan — Freelance Creative Designer & 3D Visualizer',
    description:
      'Freelance Creative Designer and 3D Visualizer based in Hyderabad. Brand identity, print design, and architectural visualization delivered to production standards.',
    url: BASE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: 'Saiteja Kolan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saiteja Kolan — Freelance Creative Designer & 3D Visualizer',
    description:
      'Freelance Creative Designer and 3D Visualizer based in Hyderabad. Brand identity, print design, and architectural visualization.',
    creator: '@saitejakolan',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saiteja Kolan',
  jobTitle: 'Freelance Creative Designer & 3D Visualizer',
  url: BASE_URL,
  email: 'kolansaiteja15@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/kolansaiteja',
    'https://instagram.com/saitejakolan',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Brand Identity',
    'Logo Design',
    'Print Design',
    '3D Visualization',
    'Architectural Rendering',
    'Motion Design',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[999] -translate-y-20 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform focus:translate-y-0 focus:outline-none"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <SmoothScroll />
          <FilmGrain />
          <BackToTop />
          <PageTransition>{children}</PageTransition>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
