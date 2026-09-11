import { enMessages, type MessageSchema } from './messages/en';
import { esMessages } from './messages/es';
import { ptMessages } from './messages/pt';
import { taMessages } from './messages/ta';
import { knMessages } from './messages/kn';
import type { Locale } from './core';
export { defaultLocale, getOgLocale, resolveLocale, selectableLocales, supportedLocales, withLocale, type Locale } from './core';

const messagesByLocale: Record<Locale, MessageSchema> = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
  ta: taMessages,
  kn: knMessages,
};

export function getMessages(locale: Locale): MessageSchema {
  return messagesByLocale[locale] ?? enMessages;
}
