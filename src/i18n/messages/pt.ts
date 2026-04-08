import { type MessageSchema } from './en';
import { esMessages } from './es';

export const ptMessages: MessageSchema = {
  ...esMessages,
  nav: {
    ...esMessages.nav,
    languageLabel: 'Idioma',
    languages: {
      ...esMessages.nav.languages,
      en: 'Ingles',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
  },
};
