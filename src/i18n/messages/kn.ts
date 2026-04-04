import { enMessages, type MessageSchema } from './en';

export const knMessages: MessageSchema = {
  ...enMessages,
  nav: {
    ...enMessages.nav,
    languageLabel: 'ಭಾಷೆ',
    languages: {
      ...enMessages.nav.languages,
      en: 'English',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
  },
};
