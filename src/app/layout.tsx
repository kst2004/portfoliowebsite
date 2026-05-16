import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageTransition from '../components/PageTransition';
import SmoothScroll from '../components/SmoothScroll';
import FilmGrain from '../components/FilmGrain';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Saiteja Kolan | Creative Portfolio',
  description: 'Cinematic creative portfolio for Saiteja Kolan - designer and 3D visualizer.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll />
        <FilmGrain />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
