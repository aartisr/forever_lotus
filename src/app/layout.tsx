import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com'
  ),
  title: {
    default: 'Forever Lotus | A Civilizational Call to Conscious Creation',
    template: '%s | Forever Lotus',
  },
  description:
    'Forever Lotus is a moral architecture for the 21st century — rooted in compassion, dignity, and planetary stewardship. Grounded in 4,000 years of Eastern wisdom and contemporary evidence.',
  keywords: [
    'conscious creation',
    'compassion',
    'dignity',
    'planetary stewardship',
    'Buddhist philosophy',
    'Hindu philosophy',
    'humanitarian',
    'education',
    'peace',
    'lotus',
    'Subasri Dorairaj',
  ],
  authors: [{ name: 'Subasri Dorairaj' }],
  creator: 'Subasri Dorairaj',
  openGraph: {
    type: 'website',
    title: 'Forever Lotus | Conscious Creation',
    description:
      'A civilizational call to conscious creation rooted in compassion, dignity, and planetary stewardship.',
    siteName: 'Forever Lotus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Lotus | Conscious Creation',
    description:
      'A civilizational call to conscious creation rooted in compassion, dignity, and planetary stewardship.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a84c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-lotus-bg text-lotus-cream font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-3 left-3 z-[100] btn-primary text-sm"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
