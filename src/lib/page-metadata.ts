import type { Metadata } from 'next';
import { type Locale, getOgLocale } from '@/i18n';
import {
  buildAlternates,
  buildPageUrl,
  defaultOgImage,
  defaultTwitterImage,
  founderName,
  getTwitterHandle,
  siteKeywords,
  siteName,
} from '@/lib/seo';

interface LocalizedMetadataInput {
  path: string;
  locale: Locale;
  title: string;
  description: string;
  keywords?: string[];
  openGraphType?: 'website' | 'article';
}

export function buildLocalizedPageMetadata({
  path,
  locale,
  title,
  description,
  keywords = [],
  openGraphType = 'website',
}: LocalizedMetadataInput): Metadata {
  const twitterHandle = getTwitterHandle();

  return {
    title,
    description,
    keywords: [...siteKeywords, ...keywords],
    authors: [{ name: founderName, url: buildPageUrl('/about') }],
    alternates: buildAlternates(path, locale),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: openGraphType,
      url: buildPageUrl(path, locale),
      locale: getOgLocale(locale),
      title,
      description,
      siteName,
      images: [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultTwitterImage],
      creator: twitterHandle,
      site: twitterHandle,
    },
  };
}
