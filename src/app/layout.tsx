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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com';
const siteTitle = 'Forever Lotus | A Civilizational Call to Conscious Creation';
const siteDescription =
  'Forever Lotus is a moral architecture for the 21st century — rooted in compassion, dignity, and planetary stewardship. Grounded in 4,000 years of Eastern wisdom and contemporary evidence.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Forever Lotus',
  title: {
    default: siteTitle,
    template: '%s | Forever Lotus',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
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
  publisher: 'Forever Lotus',
  category: 'philosophy',
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'en_US',
    title: siteTitle,
    description: siteDescription,
    siteName: 'Forever Lotus',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  other: {
    'github:repo': 'https://github.com/aartisr/forever_lotus',
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
