import { type Locale } from './core';

type ChromeMessages = {
  nav: {
    brand: string;
    links: {
      manifesto: string;
      philosophy: string;
      research: string;
      about: string;
      insights: string;
      growthDashboard: string;
      alignedWebsites: string;
      awaricon: string;
      manifestoEvaluator: string;
      onboardWebsite: string;
    };
    groups: {
      framework: string;
      knowledge: string;
      growth: string;
      ecosystem: string;
    };
    descriptions: {
      manifesto: string;
      philosophy: string;
      about: string;
      research: string;
      insights: string;
      growthDashboard: string;
      alignedWebsites: string;
      awaricon: string;
      manifestoEvaluator: string;
      onboardWebsite: string;
    };
    cta: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    languages: Record<Locale, string>;
    homeAria: string;
  };
  footer: {
    description: string;
    navigate: string;
    standard: string;
    quote: string;
    rights: string;
    tagline: string;
    authorLabel: string;
    authorName: string;
    alignedNote: string;
    legalPolicyLabel: string;
  };
};

const enChromeMessages: ChromeMessages = {
  nav: {
    brand: 'Forever Lotus',
    links: {
      manifesto: 'Manifesto',
      philosophy: 'Philosophy',
      research: 'Research',
      about: 'About',
      insights: 'Insights',
      growthDashboard: 'Growth Dashboard',
      alignedWebsites: 'Aligned Websites',
      awaricon: 'Awaricon',
      manifestoEvaluator: 'Manifesto Evaluator',
      onboardWebsite: 'Onboard Your Website',
    },
    groups: {
      framework: 'Framework',
      knowledge: 'Knowledge',
      growth: 'Growth',
      ecosystem: 'Ecosystem',
    },
    descriptions: {
      manifesto: 'The foundational document',
      philosophy: 'Principles and six pillars',
      about: 'Origin and purpose',
      research: 'Eastern and modern sources',
      insights: 'Articles and reflections',
      growthDashboard: 'Metrics and impact',
      alignedWebsites: 'Conscious ecosystem',
      awaricon: 'Premium proof-of-presence badges',
      manifestoEvaluator: 'Alignment checker',
      onboardWebsite: 'Join the network',
    },
    cta: 'Read Manifesto',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
    languages: {
      en: 'English',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
    homeAria: 'Forever Lotus - Home',
  },
  footer: {
    description:
      'A civilizational call to conscious creation - rooted in compassion, rising through dignity, untainted by domination.',
    navigate: 'Navigate',
    standard: 'The Standard',
    quote:
      'Build as if humanity matters. Lead as if dignity is non-negotiable. Innovate as if future generations are already watching.',
    rights: 'Forever Lotus. All rights reserved.',
    tagline: 'Rooted. Rising. Untainted.',
    authorLabel: 'Author:',
    authorName: 'Subasri Dorairaj',
    alignedNote: 'We also highlight and promote websites aligned with the Forever Lotus Manifesto.',
    legalPolicyLabel: 'Awaricon legal policy',
  },
};

const esChromeMessages: ChromeMessages = {
  nav: {
    ...enChromeMessages.nav,
    links: {
      manifesto: 'Manifiesto',
      philosophy: 'Filosofia',
      research: 'Investigacion',
      about: 'Acerca de',
      insights: 'Ideas',
      growthDashboard: 'Panel de crecimiento',
      alignedWebsites: 'Sitios aliados',
      awaricon: 'Awaricon',
      manifestoEvaluator: 'Evaluador de manifiesto',
      onboardWebsite: 'Onboarding de sitios',
    },
    groups: {
      framework: 'Marco',
      knowledge: 'Conocimiento',
      growth: 'Crecimiento',
      ecosystem: 'Ecosistema',
    },
    descriptions: {
      manifesto: 'El documento fundacional',
      philosophy: 'Principios y seis pilares',
      about: 'Origen y proposito',
      research: 'Fuentes orientales y modernas',
      insights: 'Articulos y reflexiones',
      growthDashboard: 'Metricas e impacto',
      alignedWebsites: 'Ecosistema consciente',
      awaricon: 'Insignias premium de prueba de presencia',
      manifestoEvaluator: 'Verificador de alineacion',
      onboardWebsite: 'Unirse a la red',
    },
    cta: 'Leer manifiesto',
    openMenu: 'Abrir menu',
    closeMenu: 'Cerrar menu',
    languageLabel: 'Idioma',
    homeAria: 'Forever Lotus - Inicio',
    languages: {
      en: 'Ingles',
      es: 'Espanol',
      pt: 'Portugues',
      ta: 'Tamil',
      kn: 'Kannada',
    },
  },
  footer: {
    ...enChromeMessages.footer,
    description:
      'Un llamado civilizatorio a la creacion consciente: arraigado en la compasion, elevado por la dignidad, libre de dominacion.',
    navigate: 'Navegar',
    standard: 'El estandar',
    quote:
      'Construye como si la humanidad importara. Lidera como si la dignidad no fuera negociable. Innova como si las futuras generaciones ya te estuvieran observando.',
    rights: 'Forever Lotus. Todos los derechos reservados.',
    authorLabel: 'Autora:',
    alignedNote: 'Tambien destacamos y promovemos sitios web alineados con el Manifiesto Forever Lotus.',
    legalPolicyLabel: 'Politica legal de Awaricon',
  },
};

const chromeMessagesByLocale: Record<Locale, ChromeMessages> = {
  en: enChromeMessages,
  es: esChromeMessages,
  pt: {
    ...esChromeMessages,
    nav: {
      ...esChromeMessages.nav,
      languageLabel: 'Idioma',
      languages: {
        ...esChromeMessages.nav.languages,
        en: 'Ingles',
        es: 'Espanol',
        pt: 'Portugues',
      },
    },
  },
  ta: {
    ...esChromeMessages,
    nav: {
      ...esChromeMessages.nav,
      languageLabel: 'மொழி',
      languages: {
        ...esChromeMessages.nav.languages,
        en: 'English',
        ta: 'Tamil',
      },
    },
  },
  kn: {
    ...esChromeMessages,
    nav: {
      ...esChromeMessages.nav,
      languageLabel: 'ಭಾಷೆ',
      languages: {
        ...esChromeMessages.nav.languages,
        en: 'English',
        kn: 'Kannada',
      },
    },
  },
};

export function getChromeMessages(locale: Locale): ChromeMessages {
  return chromeMessagesByLocale[locale] ?? enChromeMessages;
}
