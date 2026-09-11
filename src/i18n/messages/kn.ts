import { type MessageSchema } from './en';
import { esMessages } from './es';

export const knMessages: MessageSchema = {
  ...esMessages,
  nav: {
    ...esMessages.nav,
    languageLabel: 'ಭಾಷೆ',
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
