import { enMessages, type MessageSchema } from './en';

export const esMessages: MessageSchema = {
  ...enMessages,
  nav: {
    ...enMessages.nav,
    links: {
      manifesto: 'Manifiesto',
      philosophy: 'Filosofia',
      research: 'Investigacion',
      about: 'Acerca de',
    },
    cta: 'Leer Manifiesto',
    openMenu: 'Abrir menu',
    closeMenu: 'Cerrar menu',
    languageLabel: 'Idioma',
    homeAria: 'Forever Lotus - Inicio',
    languages: {
      en: 'English',
      es: 'Espanol',
    },
  },
  footer: {
    ...enMessages.footer,
    navigate: 'Navegar',
    standard: 'El Estandar',
    authorLabel: 'Autora:',
    repositoryLabel: 'Repositorio publico',
  },
  notFound: {
    ...enMessages.notFound,
    title: 'Pagina no encontrada',
    cta: 'Volver al inicio',
  },
};
