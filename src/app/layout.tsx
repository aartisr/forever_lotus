import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { buildAlternates, defaultOgImage, siteName, siteUrl } from '@/lib/seo';

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

const siteTitle = 'Forever Lotus | Conscious Creation, Compassion, and Eastern Wisdom';
const siteDescription =
  'Forever Lotus is a civilizational framework for conscious creation, humanitarian dignity, and peacebuilding, grounded in 4,000 years of Eastern wisdom and modern research.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: buildAlternates('/', 'en'),
  keywords: [
    'Forever Lotus',
    'conscious leadership',
    'conscious creation',
    'compassion',
    'dignity',
    'Eastern wisdom',
    'civilizational framework',
    'planetary stewardship',
    'Buddhist philosophy',
    'Hindu philosophy',
    'Lotus Sutra',
    'Brahma creation philosophy',
    'humanitarian',
    'education',
    'peace',
    'lotus',
    'Subasri Dorairaj',
  ],
  authors: [{ name: 'Subasri Dorairaj' }],
  creator: 'Subasri Dorairaj',
  publisher: siteName,
  category: 'philosophy',
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'en_US',
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Forever Lotus - Conscious Creation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage],
    creator: '@foreverlotus',
    site: '@foreverlotus',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  other: {
    'github:repo': 'https://github.com/aartisr/forever_lotus',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a84c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      inLanguage: ['en', 'es'],
      description: siteDescription,
      publisher: {
        '@type': 'Organization',
        name: siteName,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      sameAs: ['https://github.com/aartisr/forever_lotus'],
      founder: {
        '@type': 'Person',
        name: 'Subasri Dorairaj',
      },
    },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-lotus-bg text-lotus-cream font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
