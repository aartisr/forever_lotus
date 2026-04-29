import { defaultLocale, supportedLocales, type Locale } from '@/i18n';
import { getConfiguredSocialProfileUrls } from '@/config/social-media';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com';
export const siteName = 'Forever Lotus';
export const founderName = 'Subasri Dorairaj';
export const githubRepoUrl = 'https://github.com/aartisr/forever_lotus';
export const siteDescription =
  'Forever Lotus is a civilizational framework for conscious creation, humanitarian dignity, peacebuilding, Eastern wisdom, and responsible progress.';
export const siteKeywords = [
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
  'Subasri Dorairaj',
] as const;

export const defaultOgImage = '/opengraph-image';
export const defaultTwitterImage = '/twitter-image';
export const defaultOgImageAlt =
  'Forever Lotus conscious creation framework with lotus-inspired visual identity';

export function buildOpenGraphImage(url = defaultOgImage, alt = defaultOgImageAlt) {
  return {
    url,
    width: 1200,
    height: 630,
    alt,
  };
}

export function buildTwitterImage(
  url = defaultTwitterImage,
  alt = defaultOgImageAlt,
  dimensions = { width: 1200, height: url === defaultTwitterImage ? 600 : 630 }
) {
  return {
    url,
    ...dimensions,
    alt,
  };
}

function normalizeUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
}

export function getTwitterHandle(): string | undefined {
  const handle =
    process.env.NEXT_PUBLIC_X_HANDLE ||
    process.env.NEXT_PUBLIC_TWITTER_HANDLE;

  if (!handle) {
    return undefined;
  }

  return handle.startsWith('@') ? handle : `@${handle}`;
}

export function getSameAsLinks(): string[] {
  return Array.from(
    new Set(
      [
        githubRepoUrl,
        normalizeUrl(process.env.NEXT_PUBLIC_X_PROFILE_URL),
        normalizeUrl(process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL),
        ...getConfiguredSocialProfileUrls(),
      ].filter((value): value is string => Boolean(value))
    )
  );
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }

  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('lang', locale);
  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function buildPageUrl(path: string, locale: Locale = defaultLocale): string {
  const canonicalPath = localizedPath(path, locale);
  return new URL(canonicalPath, siteUrl).toString();
}

export function buildLanguageAlternates(path: string) {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, buildPageUrl(path, locale)])
  );
}

export function buildAlternates(path: string, locale: Locale) {
  const canonical = buildPageUrl(path, locale);
  const defaultUrl = buildPageUrl(path, defaultLocale);

  return {
    canonical,
    languages: {
      'x-default': defaultUrl,
      ...buildLanguageAlternates(path),
    },
  };
}
