import { defaultLocale, type Locale } from '@/i18n';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com';
export const siteName = 'Forever Lotus';

export const defaultOgImage = '/opengraph-image';

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

export function buildAlternates(path: string, locale: Locale) {
  return {
    canonical: localizedPath(path, locale),
    languages: {
      'x-default': path,
      en: path,
      es: localizedPath(path, 'es'),
    },
  };
}
