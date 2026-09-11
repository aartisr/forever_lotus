import { type Locale } from './core';

export type ChromeMessages = {
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
      citationKit: string;
      contact: string;
    };
    groups: {
      framework: string;
      knowledge: string;
      growth: string;
      ecosystem: string;
      operators: string;
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
      citationKit: string;
      legalPolicy: string;
      contact: string;
    };
    journey: {
      manifestoKicker: string;
      manifestoDescription: string;
      researchKicker: string;
      researchDescription: string;
      insightsKicker: string;
      insightsDescription: string;
      evaluateKicker: string;
      evaluateDescription: string;
      awariconKicker: string;
      awariconDescription: string;
    };
    cta: string;
    startHere: string;
    startHereDescription: string;
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
    nextEyebrow: string;
    nextTitle: string;
    nextDescription: string;
    proofLabel: string;
    proofPoints: {
      aiIndex: string;
      localized: string;
      research: string;
      repository: string;
    };
    utilityLabel: string;
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
      citationKit: 'Citation Kit',
      contact: 'Contact',
    },
    groups: {
      framework: 'Framework',
      knowledge: 'Knowledge',
      growth: 'Growth',
      ecosystem: 'Ecosystem',
      operators: 'Operators',
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
      citationKit: 'High-quality references for editors and AI indexes',
      legalPolicy: 'Certification terms and usage policy',
      contact: 'Partnerships, media, and certification conversations',
    },
    journey: {
      manifestoKicker: 'Start with the vow',
      manifestoDescription: 'Read the canonical foundation in one focused path.',
      researchKicker: 'Verify the roots',
      researchDescription: 'Trace the sources, evidence, and public context.',
      insightsKicker: 'Learn by topic',
      insightsDescription: 'Explore practical reflections and search-friendly topic clusters.',
      evaluateKicker: 'Test alignment',
      evaluateDescription: 'Score a website against the dignity-centered standard.',
      awariconKicker: 'Signal trust',
      awariconDescription: 'Create a visible proof-of-presence badge for aligned websites.',
    },
    cta: 'Read Manifesto',
    startHere: 'Start here',
    startHereDescription: 'Choose the path that matches why you arrived.',
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
    nextEyebrow: 'Continue the journey',
    nextTitle: 'Where should the lotus take you next?',
    nextDescription: 'Fast paths for readers, researchers, builders, and website owners who want to act on the manifesto.',
    proofLabel: 'Trust signals',
    proofPoints: {
      aiIndex: 'Readable llms.txt and full index',
      localized: 'Localized entry points',
      research: 'Research and source anchors',
      repository: 'Public repository and citation trail',
    },
    utilityLabel: 'Utility',
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
      citationKit: 'Kit de citas',
      contact: 'Contacto',
    },
    groups: {
      framework: 'Marco',
      knowledge: 'Conocimiento',
      growth: 'Crecimiento',
      ecosystem: 'Ecosistema',
      operators: 'Operadores',
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
      citationKit: 'Referencias de alta calidad para editores e indices de IA',
      legalPolicy: 'Terminos de certificacion y politica de uso',
      contact: 'Conversaciones sobre alianzas, medios y certificacion',
    },
    journey: {
      manifestoKicker: 'Comienza con el voto',
      manifestoDescription: 'Lee la base canonica en un camino enfocado.',
      researchKicker: 'Verifica las raices',
      researchDescription: 'Sigue las fuentes, la evidencia y el contexto publico.',
      insightsKicker: 'Aprende por tema',
      insightsDescription: 'Explora reflexiones practicas y grupos tematicos para busqueda.',
      evaluateKicker: 'Prueba alineacion',
      evaluateDescription: 'Evalua un sitio frente al estandar centrado en dignidad.',
      awariconKicker: 'Senala confianza',
      awariconDescription: 'Crea una insignia visible de presencia para sitios alineados.',
    },
    cta: 'Leer manifiesto',
    startHere: 'Comienza aqui',
    startHereDescription: 'Elige el camino que coincide con tu visita.',
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
    nextEyebrow: 'Continua el viaje',
    nextTitle: 'A donde debe llevarte el loto ahora?',
    nextDescription: 'Rutas rapidas para lectores, investigadores, creadores y duenos de sitios que quieren actuar con el manifiesto.',
    proofLabel: 'Senales de confianza',
    proofPoints: {
      aiIndex: 'llms.txt legible e indice completo',
      localized: 'Puntos de entrada localizados',
      research: 'Investigacion y fuentes ancla',
      repository: 'Repositorio publico y rastro de citas',
    },
    utilityLabel: 'Utilidad',
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
