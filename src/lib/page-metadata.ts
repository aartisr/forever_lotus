import type { Metadata } from 'next';
import { type Locale, getOgLocale } from '@/i18n';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

interface LocalizedMetadataInput {
  path: string;
  locale: Locale;
  title: string;
  description: string;
}

export function buildLocalizedPageMetadata({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: 'article',
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
      images: [defaultOgImage],
    },
  };
}
