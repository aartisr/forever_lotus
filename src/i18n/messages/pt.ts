import { enMessages, type MessageSchema } from './en';

export const ptMessages: MessageSchema = {
  ...enMessages,
  nav: {
    ...enMessages.nav,
    languageLabel: 'Idioma',
    languages: {
      ...enMessages.nav.languages,
      en: 'Ingles',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
  },
};
