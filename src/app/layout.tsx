import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import MotionProvider from '../components/MotionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saitejakolan.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Saiteja Kolan — Multidisciplinary Designer & Builder',
    template: '%s | Saiteja Kolan',
  },
  description:
    'A multidisciplinary portfolio exploring design, software, 3D visualization, aviation, electronics, and creative technology. Selected projects, experiments, and things built by Saiteja Kolan.',
  keywords: [
    'Saiteja Kolan',
    'multidisciplinary designer',
    'creative developer',
    'software projects',
    'brand identity',
    '3D visualization',
    'creative technology',
    'automation',
    'electronics',
    'Hyderabad',
  ],
  authors: [{ name: 'Saiteja Kolan', url: BASE_URL }],
  openGraph: {
    title: 'Saiteja Kolan — Multidisciplinary Designer & Builder',
    description: 'Design, software, experiments, and everything in between.',
    url: BASE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: 'Saiteja Kolan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saiteja Kolan — Multidisciplinary Designer & Builder',
    description: 'Design, software, experiments, and everything in between.',
    creator: '@saitejakolan',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saiteja Kolan',
  jobTitle: 'Multidisciplinary Designer and Builder',
  url: BASE_URL,
  email: 'kolansaiteja15@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/kolansaiteja',
    'https://instagram.com/saitejakolan',
    'https://github.com/kst2004',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Visual Design',
    'Brand Identity',
    'Software Development',
    '3D Visualization',
    'Creative Technology',
    'Electronics',
    'Automation',
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
          className="fixed left-4 top-4 z-[999] -translate-y-20 bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform focus:translate-y-0 focus:outline-none"
        >
          Skip to main content
        </a>
        <MotionProvider>
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
