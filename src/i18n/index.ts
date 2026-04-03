import { enMessages, type MessageSchema } from './messages/en';
import { esMessages } from './messages/es';

export const supportedLocales = ['en', 'es'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';

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

export function getMessages(locale: Locale): MessageSchema {
  return locale === 'es' ? esMessages : enMessages;
}

export function withLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('lang', locale);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
