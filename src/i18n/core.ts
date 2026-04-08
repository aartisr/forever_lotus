export const supportedLocales = ['en', 'es', 'pt', 'ta', 'kn'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';
export const selectableLocales: readonly Locale[] = supportedLocales;

const ogLocaleByLocale: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_PT',
  ta: 'ta_IN',
  kn: 'kn_IN',
};

function normalizeLangParam(lang?: string | string[]): string | undefined {
  if (Array.isArray(lang)) {
    return lang[0];
  }
  return lang;
}

export function resolveLocale(lang?: string | string[]): Locale {
  const normalized = normalizeLangParam(lang)?.toLowerCase();
  if (!normalized) {
    return defaultLocale;
  }
  return (supportedLocales as readonly string[]).includes(normalized)
    ? (normalized as Locale)
    : defaultLocale;
}

export function getOgLocale(locale: Locale): string {
  return ogLocaleByLocale[locale] ?? ogLocaleByLocale.en;
}

export function withLocale(path: string, locale: Locale): string {
  const [pathAndQuery, hash = ''] = path.split('#');
  const [pathnameRaw, query = ''] = pathAndQuery.split('?');
  const pathname = pathnameRaw || '/';
  const params = new URLSearchParams(query);
  if (locale === defaultLocale) {
    params.delete('lang');
  } else {
    params.set('lang', locale);
  }
  const qs = params.toString();
  const localizedPath = qs ? `${pathname}?${qs}` : pathname;
  return hash ? `${localizedPath}#${hash}` : localizedPath;
}