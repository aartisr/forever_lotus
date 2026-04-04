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
      insights: 'Ideas',
      growthDashboard: 'Panel de crecimiento',
      alignedWebsites: 'Sitios aliados',
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
    ...enMessages.footer,
    description:
      'Un llamado civilizatorio a la creacion consciente: arraigado en la compasion, elevado por la dignidad, libre de dominacion.',
    navigate: 'Navegar',
    standard: 'El estandar',
    quote:
      'Construye como si la humanidad importara. Lidera como si la dignidad no fuera negociable. Innova como si las futuras generaciones ya te estuvieran observando.',
    rights: 'Forever Lotus. Todos los derechos reservados.',
    authorLabel: 'Autora:',
    alignedNote: 'Tambien destacamos y promovemos sitios web alineados con el Manifiesto Forever Lotus.',
    repositoryLabel: 'Repositorio publico',
  },
  notFound: {
    ...enMessages.notFound,
    title: 'Pagina no encontrada',
    description:
      'Como el loto, algunos caminos regresan antes de elevarse. Esta pagina no existe, pero el marco si.',
    cta: 'Volver al inicio',
  },
  home: {
    ...enMessages.home,
    hero: {
      ...enMessages.home.hero,
      titlePrefix: 'Un llamado civilizatorio a la',
      titleHighlight: 'creacion consciente',
      description:
        'La humanidad puede crear sin dominar. El progreso puede ser bondadoso. Esta es una arquitectura moral practica para una era de poder inmenso.',
      ctaPrimary: 'Leer el manifiesto',
      ctaSecondary: 'Explorar la filosofia',
    },
    principle: {
      ...enMessages.home.principle,
      eyebrow: 'Principio operativo',
      title: 'El loto como metodo',
      description:
        'A traves de 4.000 anios de sabiduria civilizatoria, el loto no evade la dificultad: se transforma a traves de ella. Ese es el principio.',
      cards: [
        {
          ...enMessages.home.principle.cards[0],
          word: 'Arraigado',
          desc: 'Nace de la oscuridad y del desafio. La fortaleza surge de la profundidad, no de la huida.',
        },
        {
          ...enMessages.home.principle.cards[1],
          word: 'Elevandose',
          desc: 'Asciende hacia la luz sin abandonar el origen del crecimiento.',
        },
        {
          ...enMessages.home.principle.cards[2],
          word: 'Intacto',
          desc: 'Puro a pesar de las condiciones. Una creacion que se niega a ser manchada por su contexto.',
        },
      ],
    },
    quote: {
      ...enMessages.home.quote,
      text:
        'Crear no es dominar: es asumir responsabilidad. Cada sistema que diseniamos inclina el futuro hacia la armonia o la fractura. La neutralidad es una ilusion.',
    },
    pillars: {
      ...enMessages.home.pillars,
      eyebrow: 'Marco central',
      title: 'Seis pilares de la creacion consciente',
      description:
        'Una arquitectura moral coherente: ni abstracta, ni burocratica, profundamente operativa.',
      cta: 'Explorar todos los pilares en el manifiesto',
      items: [
        {
          ...enMessages.home.pillars.items[0],
          title: 'Conciencia de la Tierra',
          summary:
            'Gratitud hecha practica. La custodia no es una virtud opcional: es la expresion minima de respeto por las condiciones que sostienen toda vida.',
        },
        {
          ...enMessages.home.pillars.items[1],
          title: 'Bondad sin expectativa',
          summary:
            'La compasion verdadera no es transaccional. Dar no es moneda moral: es alineacion con la vida misma.',
        },
        {
          ...enMessages.home.pillars.items[2],
          title: 'Educacion como liberacion',
          summary:
            'La educacion es la herencia sagrada de la humanidad. El conocimiento debe producir agencia, no teatro de credenciales.',
        },
        {
          ...enMessages.home.pillars.items[3],
          title: 'Paz y armonia interior',
          summary:
            'La paz social duradera empieza en el sistema nervioso humano: contencion, claridad y responsabilidad.',
        },
        {
          ...enMessages.home.pillars.items[4],
          title: 'Dignidad humanitaria',
          summary:
            'La ayuda debe restaurar dignidad, no fabricar dependencia. La asistencia sin agencia termina erosionando.',
        },
        {
          ...enMessages.home.pillars.items[5],
          title: 'Creacion consciente',
          summary:
            'Todo sistema, institucion y decision es un acto de creacion que orienta el futuro hacia armonia o fractura.',
        },
      ],
    },
    stats: [
      { value: '25+', label: 'Fuentes revisadas por pares' },
      { value: '4.000', label: 'Anios de sabiduria oriental' },
      { value: '6', label: 'Pilares civilizatorios' },
      { value: '3', label: 'Continentes de investigacion' },
    ],
    traditions: {
      ...enMessages.home.traditions,
      eyebrow: 'Sabiduria universal',
      title: 'El loto en la civilizacion',
      description:
        'Un simbolo. Cuatro mil anios. Toda gran tradicion espiritual converge en el mismo principio.',
      cta: 'Profundizar en filosofia oriental',
      items: [
        {
          ...enMessages.home.traditions.items[0],
          text: 'Brahma emerge del loto: creacion como responsabilidad, no como conquista.',
        },
        {
          ...enMessages.home.traditions.items[1],
          text: 'El Sutra del Loto: pureza del espiritu intacta frente a las aguas turbias de la ignorancia.',
        },
        {
          ...enMessages.home.traditions.items[2],
          text: 'El loto representa el primer sol: la creacion que emerge desde las aguas primordiales.',
        },
      ],
    },
    research: {
      ...enMessages.home.research,
      eyebrow: 'Base de evidencia',
      title: 'Sustentado en investigacion',
      description:
        'Forever Lotus no es ideologia. Se apoya en mas de 25 fuentes revisadas por pares, textos orientales canonicos e instituciones lideres de tres continentes.',
      quote:
        'La bondad sin intercambio esta respaldada por investigacion prosocial y de florecimiento desde Stanford, Harvard y el World Happiness Report.',
      cta: 'Explorar el dossier de investigacion',
    },
    vow: {
      ...enMessages.home.vow,
      eyebrow: 'El voto',
      titlePrefix: 'Forever Lotus es una marca en forma.',
      titleHighlight: 'Un voto en sustancia.',
      description:
        'Su voto es explicito: reducir sufrimiento, elevar dignidad y rechazar dominacion. Cualquier estrategia, institucion o producto que no cumpla esta prueba no pertenece a Forever Lotus.',
      commitments: [
        {
          ...enMessages.home.vow.commitments[0],
          text: 'Publicar metricas anuales de dignidad e impacto, no metricas de vanidad.',
        },
        {
          ...enMessages.home.vow.commitments[1],
          text: 'Vincular toda iniciativa a reduccion medible de sufrimiento y crecimiento de capacidad.',
        },
        {
          ...enMessages.home.vow.commitments[2],
          text: 'Construir sistemas de aprendizaje abiertos, multilingues y culturalmente arraigados.',
        },
      ],
      cta: 'Leer el manifiesto completo',
    },
    closing: {
      ...enMessages.home.closing,
      titlePrefix: 'Donde una persona elige compasion,',
      titleHighlight: 'el loto vuelve a florecer.',
      description:
        'Esta es una invitacion, no una doctrina. Co-crear equilibrio en lugar de exceso, paz en lugar de teatro de poder y futuros compartidos en lugar de ganancia aislada.',
      ctaPrimary: 'Leer el manifiesto',
      ctaSecondary: 'Acerca de Forever Lotus',
    },
    faq: {
      q1: 'Que es Forever Lotus?',
      q2: 'En que se basa este marco?',
      q3: 'Cual es el objetivo principal?',
    },
  },
  manifesto: {
    ...enMessages.manifesto,
    meta: {
      title: 'Manifiesto',
      description:
        'El Manifiesto Forever Lotus: un marco civilizatorio de 15 secciones para la creacion consciente, basado en compasion, dignidad y sabiduria oriental.',
    },
    hero: {
      eyebrow: 'El marco',
      title: 'El manifiesto',
      description:
        'Quince secciones. Un marco civilizatorio completo para la creacion consciente, basado en sabiduria oriental y esperanza disciplinada.',
    },
    cta: {
      eyebrow: 'Seguir explorando',
      title: 'La filosofia detras del manifiesto',
      primary: 'Filosofia oriental',
      secondary: 'Dossier de investigacion',
    },
    sections: [
      {
        num: 'I',
        title: 'El significado de Forever Lotus',
        body: 'Forever Lotus no es una tendencia, una campania ni un ejercicio de marca. Es una postura civilizatoria. Comienza con una propuesta simple pero radical: la creacion puede ser bondadosa. El progreso humano no tiene que depender de extraccion, humillacion o adormecimiento espiritual. Como el loto que se eleva limpio desde aguas turbias, Forever Lotus representa la posibilidad de que la humanidad evolucione sin abandonar la compasion. No es ingenuidad. Es esperanza disciplinada.',
      },
      {
        num: 'II',
        title: 'El loto en la civilizacion',
        body: 'En tradiciones hindu, budista, egipcia y otras corrientes filosoficas orientales, el loto simboliza pureza, resiliencia, despertar y trascendencia a traves de las condiciones, no la huida de ellas. Su patron biologico tambien es su filosofia: enraizado en la oscuridad, alimentado por el desafio, elevandose hacia la luz y permaneciendo limpio. Forever Lotus adopta el loto no como ornamento, sino como principio operativo.',
      },
      {
        num: 'III',
        title: 'Brahma y la creacion consciente',
        body: 'En la cosmologia hindu, Brahma emerge del loto como principio de creacion. El simbolismo es claro: crear no es dominar, es asumir responsabilidad. Forever Lotus aplica este marco metafisico a la vida moderna. Cada sistema que disenamos, cada institucion que construimos y cada decision que normalizamos es un acto de creacion. O modelamos futuros de armonia, dignidad y continuidad, o futuros de fractura. La neutralidad es una ilusion. Crear siempre es moral.',
      },
      {
        num: 'IV',
        title: 'Bondad sin expectativa',
        body: 'La verdadera bondad no es transaccional. No exige aplauso, ventaja, estatus ni retorno. Forever Lotus rechaza la moral performativa y la compasion orientada a recompensa. Dar no es moneda moral. Es alineacion con la vida. La prueba es simple: si la compasion depende del reconocimiento, es estrategia, no bondad.',
      },
      {
        num: 'V',
        title: 'Conciencia de la Tierra',
        body: 'El loto sobrevive porque pertenece a un ecosistema. Forever Lotus aplica la misma ley a la civilizacion. La conciencia de la Tierra no es ideologia. Es gratitud hecha practica. La custodia no es una virtud opcional. Es la expresion minima de respeto por el medio que hace posible toda vida, aprendizaje y cultura.',
      },
      {
        num: 'VI',
        title: 'Dignidad humanitaria',
        body: 'La accion humanitaria debe restaurar dignidad, no fabricar dependencia. Forever Lotus apoya modelos de ayuda que educan, empoderan y protegen la autonomia. El alivio sin respeto puede volverse control. La asistencia sin agencia puede volverse erosion. La dignidad no es un valor lateral. Es el centro.',
      },
      {
        num: 'VII',
        title: 'Educacion como liberacion',
        body: 'La educacion es la herencia mas sagrada de la humanidad: la transferencia de conciencia, habilidad, discernimiento y memoria etica entre generaciones. Forever Lotus entiende la educacion no como acumulacion de credenciales, sino como liberacion de ignorancia, miedo e indefension heredada. El conocimiento debe producir agencia.',
      },
      {
        num: 'VIII',
        title: 'Paz y armonia interior',
        body: 'La paz no empieza en mesas de negociacion. Empieza en el sistema nervioso humano: contencion, claridad, regulacion emocional y responsabilidad. Como el loto enraizado abajo y floreciendo arriba, Forever Lotus une coherencia interior con accion exterior. No hay paz social duradera sin madurez interior.',
      },
      {
        num: 'IX',
        title: 'Una marca al servicio de la humanidad',
        body: 'Forever Lotus es una marca en forma, pero un voto en sustancia. Su voto es explicito: reducir sufrimiento, elevar dignidad y rechazar dominacion. Cualquier estrategia, institucion, producto o narrativa que no cumpla este criterio no pertenece a Forever Lotus.',
      },
      {
        num: 'X',
        title: 'Una invitacion a co-crear',
        body: 'Forever Lotus no es una doctrina cerrada. Es una invitacion: crear equilibrio en lugar de exceso, paz en lugar de teatro de poder y futuros compartidos en lugar de ganancia aislada. Donde una sola persona elige compasion con valentia, el loto vuelve a florecer.',
      },
      {
        num: 'XI',
        title: 'Posicionamiento estrategico y credibilidad global',
        body: 'Forever Lotus ocupa una posicion poco comun entre marcos globales: ni burocratico, ni dogmatico, ni abstracto, ni solo activista. Integra accion humanitaria, reverencia ecologica, construccion de paz, educacion y sabiduria antigua en una arquitectura moral coherente. Esta coherencia permite colaboracion amplia sin dilucion y autonomia sin antagonismo.',
      },
      {
        num: 'XII',
        title: 'Credibilidad publica y linaje moral',
        body: 'Forever Lotus bebe de la herencia compartida de la humanidad: simbolismo del loto en varias civilizaciones, Brahma como creacion consciente y eticas duraderas presentes en instituciones humanitarias, ambientales, educativas y de paz. Forever Lotus no reclama monopolio de la verdad ni autoridad heredada sobre otros. Reclama responsabilidad: actuar con humildad, bondad, rigor y cuidado de largo plazo por la vida.',
      },
      {
        num: 'XIII',
        title: 'Posicion del white paper de la fundadora',
        body: 'La humanidad tiene un poder sin precedentes y una fragilidad sin precedentes al mismo tiempo. El loto ensena que la creacion debe elevarse desde quietud, contencion y claridad. Forever Lotus existe para reanclar la creacion en la responsabilidad, para que inteligencia, tecnologia y riqueza se orienten a la armonia y no a la dominacion. El progreso sin arquitectura moral es inestabilidad acelerada.',
      },
      {
        num: 'XIV',
        title: 'Custodia y continuidad',
        body: 'Este marco esta pensado para orientar, no para cerrar. Forever Lotus debe protegerse de dos riesgos persistentes: la comercializacion de la compasion y la dilucion del proposito. Su fuerza de largo plazo depende de humildad, coherencia y fidelidad al principio del loto: enraizado, elevandose y limpio.',
      },
      {
        num: 'XV',
        title: 'Compromisos operativos - La capa de accion',
        body: 'La bondad debe ser operativa, no retorica. Para mantener real esta vision, Forever Lotus asume seis estandares vinculantes: publicar metricas anuales de dignidad e impacto (no metricas de vanidad); vincular iniciativas a reduccion medible de sufrimiento y crecimiento de capacidad; mantener un firewall claro entre servicio y autopromocion; construir sistemas de aprendizaje abiertos, multilingues y culturalmente arraigados; priorizar alianzas que fortalezcan agencia local; y rechazar proyectos con compensaciones extractivas.',
      },
    ],
  },
  philosophy: {
    ...enMessages.philosophy,
    meta: {
      title: 'Filosofia',
      description:
        'Fundamentos filosoficos orientales de Forever Lotus: el loto en tradiciones hindu, budista, egipcia y universal; Brahma y creacion consciente.',
    },
    hero: {
      eyebrow: 'Sabiduria oriental',
      title: 'La filosofia',
      description:
        'Cuatro mil anios de sabiduria intercivilizatoria convergen en un principio: crear elevandose desde la dificultad, sin contaminarse.',
    },
    primaryTexts: {
      eyebrow: 'Textos primarios',
      title: 'La base upanishadica',
      description:
        "La tradicion vedica y upanishadica ofrece la estructura mas profunda para lo que Forever Lotus llama 'creacion consciente'.",
    },
    cta: {
      title: 'Ver la base de evidencia',
      description:
        'Mas de 25 fuentes revisadas por pares que anclan estas tradiciones filosoficas en investigacion contemporanea.',
      primary: 'Dossier de investigacion',
      secondary: 'Leer el manifiesto',
    },
    traditions: [
      {
        ...enMessages.philosophy.traditions[0],
        name: 'Tradicion hindu',
        tagline: 'Creacion como responsabilidad',
        overview:
          'En la cosmologia hindu, Brahma - principio creador - emerge de un loto que nace del ombligo de Vishnu. Esta imagen tiene un peso filosofico profundo: crear no es conquistar ni dominar, sino asumir una responsabilidad intencional. Aqui, el loto es medio y mensaje.',
        texts: [
          {
            ...enMessages.philosophy.traditions[0].texts[0],
            quote:
              'Brahma, sentado sobre el loto, percibe lo infinito y al percibir crea, no por deseo de dominio, sino por el imperativo mismo de lo divino.',
          },
          {
            ...enMessages.philosophy.traditions[0].texts[1],
            quote: '"Sarvam khalvidam brahma": todo esto es Brahman. Creador y creacion no estan separados.',
          },
          {
            ...enMessages.philosophy.traditions[0].texts[2],
            quote:
              'El himno cosmologico describe el primer surgimiento desde la oscuridad no por violencia, sino por calor: un principio de origen amable.',
          },
        ],
        insight:
          'De aqui toma Forever Lotus su criterio: cada acto de creacion -institucion, producto o politica- porta una carga moral. La pregunta siempre es la misma: armonia o fractura.',
      },
      {
        ...enMessages.philosophy.traditions[1],
        name: 'Tradicion budista',
        tagline: 'Pureza a traves de las condiciones',
        overview:
          'El Saddharma Pundarika Sutra, conocido como Sutra del Loto, es uno de los textos mas venerados del budismo. Su metafora central: el loto crece en agua lodosa y florece con pureza. No escapa de las condiciones dificiles; se transforma atravesandolas con gracia.',
        texts: [
          {
            ...enMessages.philosophy.traditions[1].texts[0],
            quote:
              'Asi como el loto nace en el agua, crece en el agua y se eleva sobre ella sin mancharse, asi yo, nacido en el mundo y criado en el mundo, vivo sin ser manchado por el mundo.',
          },
          {
            ...enMessages.philosophy.traditions[1].texts[1],
            quote:
              'El Sutra del Loto representa una culminacion del pensamiento mahayana: el potencial universal de despertar, sin importar las condiciones.',
          },
        ],
        insight:
          'Esto se refleja de forma directa en Forever Lotus: no hace falta escapar del sufrimiento para alcanzar claridad. Se asciende a traves de el, sin contaminarse.',
      },
      {
        ...enMessages.philosophy.traditions[2],
        name: 'Tradicion egipcia',
        tagline: 'El primer sol',
        overview:
          'En la cosmologia del antiguo Egipto, el loto (seshen) representa el surgimiento primordial del sol desde las aguas del caos. Nefertem, senor del loto, encarna belleza, sanacion y el primer amanecer. La creacion inicia como emergencia, no como conflicto.',
        texts: [
          {
            ...enMessages.philosophy.traditions[2].texts[0],
            quote:
              'Yo soy el loto puro que surgio de las aguas primordiales. Soy guardian de las fosas de Ra y guardian de la nariz de Hathor.',
          },
        ],
        insight:
          'La tradicion egipcia reafirma una idea central: el inicio de la vida no es conquista violenta, sino aparicion pura desde el agua, de lo informe hacia la forma, con dignidad inherente.',
      },
    ],
    upanishads: [
      {
        ...enMessages.philosophy.upanishads[0],
        text: '"De aquello de lo que nacen los seres, por lo que viven, y a lo que regresan: eso es Brahman."',
      },
      {
        ...enMessages.philosophy.upanishads[1],
        text: '"Emanacion desde una sola fuente: toda creacion fluye desde un principio unificado de conciencia."',
      },
      {
        ...enMessages.philosophy.upanishads[2],
        text: '"Esa esencia mas sutil: todo este mundo la tiene por alma. Esa es la realidad. Ese es el Atman."',
      },
    ],
  },
  researchPage: {
    ...enMessages.researchPage,
    meta: {
      title: 'Investigacion',
      description:
        'El dossier de investigacion de Forever Lotus: mas de 25 fuentes revisadas por pares, textos canonicos orientales e instituciones globales de referencia.',
    },
    hero: {
      eyebrow: 'Base de evidencia',
      title: 'Dossier de investigacion',
      description:
        'Mas de 25 fuentes revisadas por pares, textos primarios canonicos e instituciones globales de referencia respaldan cada afirmacion de Forever Lotus.',
    },
    method: {
      eyebrow: 'Metodo de investigacion',
      description:
        'Este dossier prioriza: (1) fuentes con DOI, revisadas por pares o alojadas por universidades; (2) investigacion respaldada por universidades orientales; (3) textos primarios religiosos y filosoficos identificados por separado; y (4) evidencia contemporanea de bienestar y conducta prosocial. Las fuentes se presentan por categoria para mayor claridad.',
    },
    cta: {
      title: 'De la evidencia al marco',
      description: 'Mira como esta investigacion fundamenta el manifiesto completo de 15 secciones.',
      primary: 'Leer el manifiesto',
      secondary: 'Filosofia oriental',
    },
    categories: [
      {
        ...enMessages.researchPage.categories[0],
        title: 'Loto, pensamiento budista e investigacion oriental',
      },
      {
        ...enMessages.researchPage.categories[1],
        title: 'Brahma, creacion y fundamentos filosoficos indicos',
      },
      {
        ...enMessages.researchPage.categories[2],
        title: 'Anclas institucionales y universitarias',
      },
      {
        ...enMessages.researchPage.categories[3],
        title: 'Compasion, conducta prosocial y evidencia de bienestar',
      },
      {
        ...enMessages.researchPage.categories[4],
        title: 'Acceso humanitario y canon digital',
      },
    ],
  },
  about: {
    ...enMessages.about,
    meta: {
      title: 'Acerca de',
      description:
        'Acerca de Forever Lotus: su vision fundacional, compromisos operativos y marco civilizatorio creado por Subasri Dorairaj.',
    },
    hero: {
      eyebrow: 'La organizacion',
      title: 'Acerca de Forever Lotus',
      description:
        'No es una campania. No es un ejercicio de marca. Es una postura civilizatoria creada con rigor y arraigada en milenios de sabiduria.',
    },
    strategic: {
      ...enMessages.about.strategic,
      eyebrow: 'Posicion estrategica',
      title: 'Una posicion singular',
      description:
        'Forever Lotus ocupa un lugar poco comun entre marcos globales: lo bastante coherente para colaborar y lo bastante principiado para sostenerse por si mismo.',
      values: [
        {
          ...enMessages.about.strategic.values[0],
          label: 'No burocratico',
          sub: 'Sin rigidez burocratica.',
        },
        {
          ...enMessages.about.strategic.values[1],
          label: 'No dogmatico',
          sub: 'Sin monopolio doctrinal.',
        },
        {
          ...enMessages.about.strategic.values[2],
          label: 'No solo activista',
          sub: 'Evidencia antes que performance.',
        },
        {
          ...enMessages.about.strategic.values[3],
          label: 'No abstracto',
          sub: 'Operativo, no retorico.',
        },
      ],
    },
    founder: {
      ...enMessages.about.founder,
      eyebrow: 'Autora y fundadora',
      p1: 'Forever Lotus es el trabajo intelectual y civilizatorio de Subasri Dorairaj: una arquitectura moral concebida para reanclar la creacion en la responsabilidad en un momento de poder humano sin precedentes.',
      p2: "Escrito desde la conviccion de que la humanidad posee las herramientas para fracturar o sanar, este marco bebe de 4.000 anios de sabiduria oriental y evidencia contemporanea para definir que significa, en terminos operativos, el 'progreso con compasion'.",
      paperEyebrow: 'Posicion del white paper',
      paperQuote:
        'La humanidad sostiene un poder sin precedentes y una fragilidad sin precedentes al mismo tiempo. El loto ensena que la creacion debe elevarse desde quietud, contencion y claridad. El progreso sin arquitectura moral es inestabilidad acelerada.',
      paperCite: 'Subasri Dorairaj, Manifiesto Forever Lotus, Seccion XIII',
      repoLink: 'Ver repositorio publico',
    },
    commitments: {
      ...enMessages.about.commitments,
      eyebrow: 'Capa de accion',
      title: 'Compromisos operativos',
      description:
        'La bondad debe ser operativa, no retorica. Estos seis compromisos constituyen la capa de accion del marco Forever Lotus.',
      items: [
        {
          ...enMessages.about.commitments.items[0],
          title: 'Metricas de dignidad',
          body: 'Publicar metricas anuales de dignidad e impacto, no metricas de vanidad. El exito se mide por sufrimiento reducido y capacidad fortalecida.',
        },
        {
          ...enMessages.about.commitments.items[1],
          title: 'Integridad de iniciativas',
          body: 'Vincular cada iniciativa a resultados medibles. Ningun programa existe para aparentar; cada uno debe reducir dano o ampliar agencia.',
        },
        {
          ...enMessages.about.commitments.items[2],
          title: 'Firewall contra autopromocion',
          body: 'Un firewall claro e innegociable entre servicio y autopromocion. La marca sirve a la mision, no al reves.',
        },
        {
          ...enMessages.about.commitments.items[3],
          title: 'Sistemas de aprendizaje abiertos',
          body: 'Construir infraestructura de aprendizaje abierta, multilingue y culturalmente arraigada, accesible para toda persona.',
        },
        {
          ...enMessages.about.commitments.items[4],
          title: 'Primero la agencia local',
          body: 'Priorizar alianzas que fortalezcan la agencia y capacidad locales, no marcos importados de manera mecanica.',
        },
        {
          ...enMessages.about.commitments.items[5],
          title: 'Sin compensaciones extractivas',
          body: 'Rechazar proyectos que exijan compensaciones extractivas. Si un objetivo obliga a comprometer la dignidad en otro frente, se descarta.',
        },
      ],
    },
    lineage: {
      ...enMessages.about.lineage,
      eyebrow: 'Linaje moral',
      title: 'Desde la herencia compartida de la humanidad',
      p1: 'Forever Lotus se nutre del simbolismo del loto en distintas civilizaciones, de Brahma como creacion consciente y de eticas presentes en instituciones humanitarias, ambientales, educativas y de paz alrededor del mundo.',
      p2: 'No reclama monopolio de la verdad. Reclama responsabilidad: actuar con humildad, bondad, rigor y cuidado de largo plazo por la vida.',
    },
    cta: {
      ...enMessages.about.cta,
      primary: 'Leer el manifiesto',
      secondary: 'Dossier de investigacion',
    },
  },
};
