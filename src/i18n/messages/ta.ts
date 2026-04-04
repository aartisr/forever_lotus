import { enMessages, type MessageSchema } from './en';

export const taMessages: MessageSchema = {
  ...enMessages,
  nav: {
    ...enMessages.nav,
    languageLabel: 'மொழி',
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
