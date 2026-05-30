import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import PageTransition from '../components/PageTransition';
import SmoothScroll from '../components/SmoothScroll';
import FilmGrain from '../components/FilmGrain';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import Preloader from '../components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Saiteja Kolan | Creative Portfolio',
  description: 'Cinematic creative portfolio for Saiteja Kolan — designer and 3D visualizer based in Hyderabad.',
  keywords: ['portfolio', 'branding', 'logo design', '3D visualization', 'creative designer', 'Saiteja Kolan', 'Hyderabad'],
  openGraph: {
    title: 'Saiteja Kolan | Creative Portfolio',
    description: 'Cinematic creative portfolio for Saiteja Kolan — designer and 3D visualizer based in Hyderabad.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Saiteja Kolan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saiteja Kolan | Creative Portfolio',
    description: 'Cinematic creative portfolio for Saiteja Kolan — designer and 3D visualizer based in Hyderabad.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body>
        <Preloader />
        <ScrollProgress />
        <SmoothScroll />
        <FilmGrain />
        <BackToTop />
        <PageTransition>{children}</PageTransition>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
