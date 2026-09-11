import { type MessageSchema } from './en';
import { esMessages } from './es';

export const taMessages: MessageSchema = {
  ...esMessages,
  nav: {
    ...esMessages.nav,
    languageLabel: 'மொழி',
    languages: {
      ...esMessages.nav.languages,
      en: 'English',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
  },
};
