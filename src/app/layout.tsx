import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Footer, Navigation } from '@/components';
import ClientRuntime from '@/components/ClientRuntime';
import {
  buildAlternates,
  buildPageUrl,
  defaultOgImage,
  defaultTwitterImage,
  founderName,
  getSameAsLinks,
  getTwitterHandle,
  githubRepoUrl,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
} from '@/lib/seo';
import { getOgLocale, supportedLocales } from '@/i18n';
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/lib/structured-data';

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
const twitterHandle = getTwitterHandle();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  manifest: '/manifest.webmanifest',
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    ...buildAlternates('/', 'en'),
    types: {
      'application/rss+xml': buildPageUrl('/rss.xml'),
      'text/plain': buildPageUrl('/llms.txt'),
    },
  },
  keywords: [...siteKeywords, 'lotus'],
  authors: [{ name: founderName, url: buildPageUrl('/about') }],
  creator: founderName,
  publisher: siteName,
  category: 'philosophy',
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'en_US',
    alternateLocale: supportedLocales
      .filter((locale) => locale !== 'en')
      .map((locale) => getOgLocale(locale)),
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
    images: [defaultTwitterImage],
    creator: twitterHandle,
    site: twitterHandle,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  other: {
    'github:repo': githubRepoUrl,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
      ? { 'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFICATION
      ? { 'p:domain_verify': process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFICATION }
      : {}),
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
  const structuredData = [buildWebsiteJsonLd(), buildOrganizationJsonLd()].map((entry) => ({
    ...entry,
    inLanguage: supportedLocales,
    sameAs: entry['@type'] === 'Organization' ? getSameAsLinks() : entry.sameAs,
  }));

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-lotus-bg text-lotus-cream font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ClientRuntime />
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
