export type InsightSection = {
  heading: string;
  body: string;
};

export type InsightFaq = {
  question: string;
  answer: string;
};

export type InsightArticle = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  sections: InsightSection[];
  faq: InsightFaq[];
  relatedSlugs: string[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: 'conscious-creation-framework',
    keyword: 'conscious creation framework',
    title: 'Conscious Creation Framework: A Practical Guide to Responsible Progress',
    description:
      'A practical framework for conscious creation that aligns innovation, leadership, and policy with dignity, compassion, and long-term stewardship.',
    intro:
      'Conscious creation means designing systems with moral intent. It rejects extraction-driven progress and replaces it with measurable human and ecological benefit.',
    sections: [
      {
        heading: 'What Conscious Creation Means',
        body:
          'Conscious creation is a method for building institutions, products, and communities that reduce suffering and increase capability. It is not abstract philosophy. It is an operating discipline.',
      },
      {
        heading: 'Core Design Principles',
        body:
          'The model centers on dignity-first decisions, measurable social outcomes, and non-extractive growth. Every initiative should pass a simple test: does it improve long-term wellbeing without hidden harm?',
      },
      {
        heading: 'How To Apply It',
        body:
          'Use impact metrics, transparent governance, and continuous learning loops. Start with one pilot initiative, document outcomes, and scale only what demonstrably improves lives.',
      },
    ],
    faq: [
      {
        question: 'Is conscious creation only for nonprofits?',
        answer:
          'No. It applies equally to businesses, educators, governments, and community leaders who want durable value creation.',
      },
      {
        question: 'How is this different from CSR?',
        answer:
          'CSR is often a side program. Conscious creation makes ethics part of the core architecture of decisions and incentives.',
      },
    ],
    relatedSlugs: ['dignity-centered-humanitarian-design', 'eastern-philosophy-for-leadership-and-ethics'],
  },
  {
    slug: 'lotus-symbolism-in-buddhism-and-hinduism',
    keyword: 'lotus symbolism in buddhism and hinduism',
    title: 'Lotus Symbolism in Buddhism and Hinduism: Meaning, History, and Modern Relevance',
    description:
      'Understand lotus symbolism in Buddhism and Hinduism through primary texts, cultural history, and contemporary ethical interpretation.',
    intro:
      'The lotus appears across major Eastern traditions as a symbol of purity through conditions. Its relevance today is practical: resilience without moral compromise.',
    sections: [
      {
        heading: 'Shared Symbol Across Traditions',
        body:
          'In both Buddhist and Hindu thought, the lotus represents emergence from difficulty into clarity. It does not deny hardship. It transforms through it.',
      },
      {
        heading: 'Philosophical Implications',
        body:
          'The symbol teaches that growth can occur without becoming stained by destructive incentives. It anchors ethical action in both humility and strength.',
      },
      {
        heading: 'Contemporary Application',
        body:
          'Modern leadership, education, and humanitarian systems can use this model to prioritize inner coherence, social responsibility, and long-range stewardship.',
      },
    ],
    faq: [
      {
        question: 'Is lotus symbolism purely religious?',
        answer:
          'No. It has spiritual roots, but it is also a cross-cultural ethical model for resilience and disciplined growth.',
      },
      {
        question: 'Why does this matter in modern policy?',
        answer:
          'Because policy failures often come from short-term incentives. Lotus symbolism emphasizes integrity under pressure.',
      },
    ],
    relatedSlugs: ['brahma-creation-philosophy-explained', 'eastern-philosophy-for-leadership-and-ethics'],
  },
  {
    slug: 'dignity-centered-humanitarian-design',
    keyword: 'dignity centered humanitarian design',
    title: 'Dignity-Centered Humanitarian Design: Moving from Relief to Agency',
    description:
      'A dignity-centered approach to humanitarian design that prioritizes autonomy, local capability, and long-term resilience.',
    intro:
      'Humanitarian systems should reduce harm without creating dependency. Dignity-centered design shifts from temporary rescue models to capability-building models.',
    sections: [
      {
        heading: 'From Dependency to Agency',
        body:
          'Effective aid enables people to recover autonomy. Programs should include education, local governance support, and economic pathways.',
      },
      {
        heading: 'Design Standards',
        body:
          'Use participatory planning, transparent metrics, and cultural fit checks. Solutions must be co-created with local communities, not imposed externally.',
      },
      {
        heading: 'Impact Measurement',
        body:
          'Track dignity outcomes: decision-making power, access to learning, income stability, and social trust. These indicators are stronger than output counts alone.',
      },
    ],
    faq: [
      {
        question: 'How do you measure dignity in programs?',
        answer:
          'Use proxy indicators like agency, literacy progression, local ownership, and long-term self-sufficiency outcomes.',
      },
      {
        question: 'Can dignity-centered design scale?',
        answer:
          'Yes, when programs are modular, locally adaptable, and evaluated with transparent feedback loops.',
      },
    ],
    relatedSlugs: ['compassion-research-and-wellbeing-evidence', 'conscious-creation-framework'],
  },
  {
    slug: 'compassion-research-and-wellbeing-evidence',
    keyword: 'compassion research and wellbeing evidence',
    title: 'Compassion Research and Wellbeing Evidence: What the Data Actually Shows',
    description:
      'A synthesis of compassion research and wellbeing evidence from leading institutions and peer-reviewed studies.',
    intro:
      'Compassion is not only a moral preference. It has measurable effects on wellbeing, social trust, and durable flourishing.',
    sections: [
      {
        heading: 'Empirical Evidence Base',
        body:
          'Studies from global research centers show links between prosocial behavior and improved life satisfaction, resilience, and community outcomes.',
      },
      {
        heading: 'Policy and Leadership Relevance',
        body:
          'Compassion-informed leadership reduces burnout and improves team coherence. At societal scale, trust and wellbeing correlate with better civic outcomes.',
      },
      {
        heading: 'Actionable Practices',
        body:
          'Organizations can operationalize compassion through mentoring systems, reflective leadership, and equitable decision processes.',
      },
    ],
    faq: [
      {
        question: 'Is compassion measurable?',
        answer:
          'Yes. Researchers use validated scales and correlate them with wellbeing, prosocial behavior, and mental health outcomes.',
      },
      {
        question: 'Does compassion weaken performance?',
        answer:
          'No. Evidence suggests it can improve long-term performance by strengthening trust and reducing destructive stress cycles.',
      },
    ],
    relatedSlugs: ['conscious-creation-framework', 'education-as-liberation-model'],
  },
  {
    slug: 'eastern-philosophy-for-leadership-and-ethics',
    keyword: 'eastern philosophy for leadership and ethics',
    title: 'Eastern Philosophy for Leadership and Ethics in the 21st Century',
    description:
      'How Eastern philosophy informs modern leadership ethics, governance, and values-based decision-making.',
    intro:
      'Leadership failures often come from value drift. Eastern philosophical traditions provide durable anchors for responsibility, restraint, and wise action.',
    sections: [
      {
        heading: 'Why Ethical Anchors Matter',
        body:
          'Fast-moving systems create pressure to optimize for short-term gains. Ethical anchors prevent mission drift and structural harm.',
      },
      {
        heading: 'Relevant Eastern Principles',
        body:
          'Interdependence, non-harm, disciplined self-awareness, and service-oriented responsibility translate directly into modern leadership models.',
      },
      {
        heading: 'Implementation Blueprint',
        body:
          'Integrate ethics into hiring, incentives, review rituals, and strategic planning. Values should shape systems, not only slogans.',
      },
    ],
    faq: [
      {
        question: 'Can spiritual traditions guide secular leadership?',
        answer:
          'Yes. Their ethical principles can be translated into universal governance practices without religious imposition.',
      },
      {
        question: 'What is the first practical step?',
        answer:
          'Define non-negotiable values and connect them to measurable organizational behavior and incentives.',
      },
    ],
    relatedSlugs: ['lotus-symbolism-in-buddhism-and-hinduism', 'conscious-creation-framework'],
  },
  {
    slug: 'education-as-liberation-model',
    keyword: 'education as liberation model',
    title: 'Education as Liberation: A Model for Agency, Not Credential Theater',
    description:
      'A practical model for education as liberation that focuses on agency, discernment, and social responsibility.',
    intro:
      'Education should transfer power to learners. Liberation-oriented models prioritize capability, ethical literacy, and real-world agency.',
    sections: [
      {
        heading: 'Beyond Credential Accumulation',
        body:
          'Credential-only systems can produce compliance without wisdom. Liberation models train discernment, adaptability, and moral responsibility.',
      },
      {
        heading: 'Curriculum Design Principles',
        body:
          'Combine critical thinking, cultural grounding, and practical problem-solving. Learners should leave with both skills and ethical clarity.',
      },
      {
        heading: 'Institutional Outcomes',
        body:
          'Liberation-oriented education correlates with stronger civic participation, healthier communities, and long-term social resilience.',
      },
    ],
    faq: [
      {
        question: 'Can this model work in mainstream schools?',
        answer:
          'Yes. Schools can introduce project-based inquiry, ethics modules, and capability metrics without disrupting core standards.',
      },
      {
        question: 'What should be measured?',
        answer:
          'Measure agency, collaboration quality, ethical reasoning, and real-world problem-solving outcomes.',
      },
    ],
    relatedSlugs: ['conscious-creation-framework', 'peace-and-inner-harmony-practice'],
  },
  {
    slug: 'peace-and-inner-harmony-practice',
    keyword: 'peace and inner harmony practice',
    title: 'Peace and Inner Harmony Practice: Building Social Stability from Within',
    description:
      'A practical guide to inner harmony practices that support peacebuilding, emotional regulation, and collective resilience.',
    intro:
      'Durable peace is not only diplomatic. It begins with human nervous systems, emotional regulation, and shared responsibility.',
    sections: [
      {
        heading: 'Inner State and Social Outcome',
        body:
          'High-reactivity environments amplify conflict. Inner coherence practices improve judgment and reduce escalation under stress.',
      },
      {
        heading: 'Practice Architecture',
        body:
          'Use routines that include reflective pauses, disciplined dialogue, and conflict de-escalation methods at both individual and team levels.',
      },
      {
        heading: 'Institutional Adoption',
        body:
          'Schools, teams, and public institutions can embed peace practices through training, peer facilitation, and accountability metrics.',
      },
    ],
    faq: [
      {
        question: 'Is inner harmony only personal wellness?',
        answer:
          'No. It is a systems input that affects leadership quality, conflict behavior, and social trust.',
      },
      {
        question: 'How quickly can results appear?',
        answer:
          'Behavioral shifts often appear in weeks when practices are consistent and tied to real workflows.',
      },
    ],
    relatedSlugs: ['compassion-research-and-wellbeing-evidence', 'education-as-liberation-model'],
  },
  {
    slug: 'earth-consciousness-and-stewardship',
    keyword: 'earth consciousness and stewardship',
    title: 'Earth Consciousness and Stewardship: Practical Ethics for Planetary Care',
    description:
      'Translate earth consciousness into measurable stewardship practices for institutions, communities, and long-term resilience.',
    intro:
      'Stewardship is not branding. It is a governance discipline that aligns behavior with ecological limits and intergenerational responsibility.',
    sections: [
      {
        heading: 'From Narrative to Operations',
        body:
          'Earth consciousness must be built into procurement, product design, and policy incentives. Good intent is not enough without system-level alignment.',
      },
      {
        heading: 'Stewardship Metrics',
        body:
          'Track emissions intensity, waste reduction, regenerative investment, and local ecosystem outcomes.',
      },
      {
        heading: 'Community-First Transition',
        body:
          'Planetary action succeeds when local communities gain capability, not when they absorb all transition costs.',
      },
    ],
    faq: [
      {
        question: 'Is stewardship expensive?',
        answer:
          'Poorly planned transition can be expensive. Strategic stewardship often reduces long-run risk and operational waste.',
      },
      {
        question: 'What is the first implementation step?',
        answer:
          'Audit current systems, define measurable goals, and link leadership incentives to stewardship outcomes.',
      },
    ],
    relatedSlugs: ['conscious-creation-framework', 'dignity-centered-humanitarian-design'],
  },
  {
    slug: 'lotus-sutra-modern-meaning',
    keyword: 'lotus sutra modern meaning',
    title: 'Lotus Sutra Modern Meaning: Why It Still Matters Today',
    description:
      'An accessible interpretation of the Lotus Sutra for modern life, ethics, and social responsibility.',
    intro:
      'The Lotus Sutra remains relevant because it addresses a timeless challenge: how to remain clear and compassionate under difficult conditions.',
    sections: [
      {
        heading: 'Core Message for Modern Readers',
        body:
          'The sutra emphasizes universal potential for awakening and moral action. It invites disciplined transformation rather than passive belief.',
      },
      {
        heading: 'Ethical Relevance Today',
        body:
          'In periods of polarization and uncertainty, the text offers a framework for non-reactive courage and inclusive compassion.',
      },
      {
        heading: 'Applied Reflection',
        body:
          'Use the sutra as a mirror for decision quality: does this action reduce harm, increase clarity, and strengthen shared dignity?',
      },
    ],
    faq: [
      {
        question: 'Can non-Buddhists learn from the Lotus Sutra?',
        answer:
          'Yes. Its ethical insights can be applied in secular contexts of leadership, education, and civic life.',
      },
      {
        question: 'Is this purely symbolic?',
        answer:
          'No. The symbolism points to practical disciplines of compassion, resilience, and responsible action.',
      },
    ],
    relatedSlugs: ['lotus-symbolism-in-buddhism-and-hinduism', 'peace-and-inner-harmony-practice'],
  },
  {
    slug: 'brahma-creation-philosophy-explained',
    keyword: 'brahma creation philosophy explained',
    title: 'Brahma Creation Philosophy Explained: Responsibility at the Root of Innovation',
    description:
      'Explore Brahma-centered creation philosophy and its relevance to modern innovation, ethics, and institutional design.',
    intro:
      'In Indic thought, creation implies responsibility. This contrasts with modern narratives that equate creation with conquest and speed alone.',
    sections: [
      {
        heading: 'Creation as Responsibility',
        body:
          'Brahma symbolism frames creation as accountable emergence. The creator is not exempt from consequence.',
      },
      {
        heading: 'Modern Institutional Reading',
        body:
          'Organizations can apply this by aligning innovation with dignity metrics, long-term impact, and transparent correction loops.',
      },
      {
        heading: 'Strategic Application',
        body:
          'When responsibility is built into creation itself, institutions become more trusted, resilient, and socially legitimate.',
      },
    ],
    faq: [
      {
        question: 'How does this differ from innovation culture today?',
        answer:
          'It moves from speed-at-all-costs to accountable, dignity-first innovation with explicit long-term stewardship.',
      },
      {
        question: 'Can this be used outside religious contexts?',
        answer:
          'Yes. The principle is ethical and governance-oriented, and can be translated into secular policy and business frameworks.',
      },
    ],
    relatedSlugs: ['conscious-creation-framework', 'eastern-philosophy-for-leadership-and-ethics'],
  },
];

export const insightBySlug: Record<string, InsightArticle> = insightArticles.reduce((acc, article) => {
  acc[article.slug] = article;
  return acc;
}, {} as Record<string, InsightArticle>);

export const insightSlugs = insightArticles.map((article) => article.slug);

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightBySlug[slug];
}

function tokenizeInsightText(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(Boolean);
}

export function searchInsights(query?: string): InsightArticle[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return insightArticles;
  }

  const queryTerms = tokenizeInsightText(normalizedQuery);

  return insightArticles.filter((article) => {
    const corpus = [
      article.keyword,
      article.title,
      article.description,
      article.intro,
      ...article.sections.flatMap((section) => [section.heading, section.body]),
      ...article.faq.flatMap((item) => [item.question, item.answer]),
    ]
      .join(' ')
      .toLowerCase();

    return queryTerms.every((term) => corpus.includes(term));
  });
}

export function getInsightWordCount(article: InsightArticle): number {
  const content = [
    article.title,
    article.description,
    article.intro,
    ...article.sections.flatMap((section) => [section.heading, section.body]),
    ...article.faq.flatMap((item) => [item.question, item.answer]),
  ].join(' ');

  return tokenizeInsightText(content).length;
}

export function getInsightReadTime(article: InsightArticle): number {
  return Math.max(3, Math.ceil(getInsightWordCount(article) / 220));
}
