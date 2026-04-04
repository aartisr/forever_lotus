import { enMessages, type MessageSchema } from './messages/en';
import { esMessages } from './messages/es';
import { ptMessages } from './messages/pt';
import { taMessages } from './messages/ta';
import { knMessages } from './messages/kn';

export const supportedLocales = ['en', 'es', 'pt', 'ta', 'kn'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';

const messagesByLocale: Record<Locale, MessageSchema> = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
  ta: taMessages,
  kn: knMessages,
};

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

export function getMessages(locale: Locale): MessageSchema {
  return messagesByLocale[locale] ?? enMessages;
}

export function getOgLocale(locale: Locale): string {
  return ogLocaleByLocale[locale] ?? ogLocaleByLocale.en;
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
