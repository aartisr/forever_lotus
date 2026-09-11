/**
 * Aligned Websites Showcase
 * Featured platforms that exemplify Forever Lotus Manifesto principles
 */

export interface AlignedWebsite {
  id: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  missionStatement: string;
  principles: string[]; // Which manifesto principles they embody
  impact: {
    headline: string;
    metrics: string[];
  };
  designPhilosophy: string; // How their design demonstrates values
  accessibility: string;
  dataTransparency: string;
  featuredReason: string; // Why they're highlighted
  socialProof?: string; // Awards, recognitions, impact statements
  getStarted?: string; // How users can engage
  imageAlt: string;
}

export const alignedWebsites: AlignedWebsite[] = [
  {
    id: 'wellness-ruralguru',
    name: 'Wellness Rural Guru',
    url: 'https://wellness.ruralguru.com',
    tagline: 'Holistic Wellness for Rural & Underserved Communities',
    description:
      'Wellness Rural Guru is an authentic purpose-driven platform bringing accessible, evidence-based wellness guidance directly to underserved rural populations. Rooted in dignity, accessibility, and community empowerment, the platform offers yoga, meditation, nutritional knowledge, and mental health support—without personal data extraction, advertising, or algorithmic manipulation.',
    missionStatement:
      'To democratize access to holistic wellness and mental health resources, ensuring that rural and underserved communities receive the same quality guidance as urban populations, while maintaining deep respect for cultural contexts and local knowledge systems.',
    principles: [
      'Non-Extractive Value',
      'Accessibility & Inclusivity',
      'Humanitarian Dignity',
      'Knowledge Liberation',
      'Environmental Stewardship',
      'Radical Transparency',
    ],
    impact: {
      headline: 'Transforming Rural Wellness Access',
      metrics: [
        'Dedicated to free, high-quality wellness guidance for rural practitioners',
        'Zero personal data extraction—privacy-first architecture',
        'Integrates traditional wisdom and modern wellness science',
        'Multilingual community outreach',
        'Low-bandwidth accessible UI',
      ],
    },
    designPhilosophy:
      'The platform uses calm, unhurried design that respects human attention and cognitive bandwidth. Zero dark patterns, zero aggressive popups. Content is organized around human wellbeing rather than extractive engagement retention.',
    accessibility:
      'Full WCAG 2.1 AA+ compliance. Screen-reader tested, semantic markup, high-contrast typography, and full keyboard navigability.',
    dataTransparency:
      'Zero-data tracking model. Visitors can browse, learn, and practice without mandatory registration or third-party behavioral analytics.',
    featuredReason:
      '**A Sterling Example of Dignified, Purpose-First Design.** Wellness Rural Guru represents a practical standard of conscious creation, proving that digital wellness can be delivered freely with deep respect for human agency.',
    socialProof:
      'Conscious digital creation case study in community-first accessibility and non-extractive web architecture.',
    getStarted:
      'Visit the platform to explore free wellness guidance and mindfulness resources tailored to rural and grassroots community needs.',
    imageAlt: 'Wellness Rural Guru meditation and wellness interface',
  },

  {
    id: 'internet-archive',
    name: 'Internet Archive',
    url: 'https://archive.org',
    tagline: 'Universal Access to All Knowledge',
    description:
      'A 501(c)(3) non-profit digital library offering free universal access to millions of digitized books, historic web pages (the Wayback Machine), audio recordings, and software artifacts without commercial ads or behavioral trackers.',
    missionStatement:
      'To provide universal access to all knowledge and preserve the cultural heritage of humanity in open digital formats for future generations.',
    principles: [
      'Knowledge Liberation',
      'Non-Extractive Value',
      'Universal Accessibility',
      'Architectural Permanence',
    ],
    impact: {
      headline: 'Preserving Civilizational Memory',
      metrics: [
        'Over 800 billion archived web pages in public commons',
        'Millions of free public domain books, movies, and audio files',
        'Zero behavioral surveillance advertising',
        'Open API and non-walled-garden architecture',
      ],
    },
    designPhilosophy:
      'Utilitarian, durable, and standard-compliant. Built for longevity, research utility, and public citation rather than sensational algorithmic feeds.',
    accessibility:
      'Extensive audio accessibility, DAISY formats for visually impaired scholars, and universal text transcription.',
    dataTransparency:
      'Public non-profit transparency reports, clear open privacy policies, and public domain cultural preservation.',
    featuredReason:
      '**The Bedrock of Digital Permanence.** Demonstrating that an open, non-profit digital library can preserve global human heritage without commercial data exploitation.',
    socialProof:
      'Official library member of the American Library Association and trusted worldwide by researchers.',
    getStarted:
      'Explore hundreds of billions of historical digital records, documents, and public domain collections freely.',
    imageAlt: 'Internet Archive digital library interface',
  },

  {
    id: 'wikimedia-foundation',
    name: 'Wikipedia / Wikimedia Commons',
    url: 'https://wikimediafoundation.org',
    tagline: 'The Free Knowledge Commons of Humanity',
    description:
      'The world’s largest collaborative encyclopedia and media repository, entirely funded by community donations, operating without commercial advertisements, behavioral profiling, or paywalls.',
    missionStatement:
      'To empower and engage people around the world to collect and develop educational content under a free license or in the public domain, and to disseminate it effectively and globally.',
    principles: [
      'Knowledge Liberation',
      'Radical Transparency',
      'Non-Extractive Value',
      'Open Protocols',
    ],
    impact: {
      headline: 'Democratizing Global Understanding',
      metrics: [
        'Over 60 million open articles in 300+ languages',
        'Zero surveillance advertising or user data auctions',
        'Open edit history and publicly auditable discussion logs',
        'Free, open API for scholars and non-profit tools',
      ],
    },
    designPhilosophy:
      'Radically transparent, minimalist, citation-driven typography that emphasizes verifiable factual references over sensationalism.',
    accessibility:
      'Comprehensive multilingual script support, lightweight HTML rendering, and full keyboard/screen-reader accessibility.',
    dataTransparency:
      'All contributions released under Creative Commons licenses with public edit logs and audited non-profit finances.',
    featuredReason:
      '**The Living Proof of Non-Extractive Digital Commons.** Demonstrating that planetary-scale knowledge systems flourish when governed for human enlightenment rather than financial extraction.',
    socialProof:
      'Global standard for free reference information, cited across academic, scientific, and public domains.',
    getStarted:
      'Access, read, and contribute to the global multilingual knowledge commons freely without barriers.',
    imageAlt: 'Wikipedia free encyclopedia interface',
  },

  {
    id: 'signal-foundation',
    name: 'Signal Foundation',
    url: 'https://signal.org',
    tagline: 'Open Source, Privacy-Preserving Communication',
    description:
      'A non-profit foundation developing state-of-the-art end-to-end encrypted messaging protocols and applications with zero metadata retention, zero ads, and zero investor extraction.',
    missionStatement:
      'To develop open source privacy technology that protects free expression and enables secure global communication.',
    principles: [
      'Zero-Knowledge Privacy',
      'Dignity Over Dopamine',
      'Radical Transparency',
      'Open Protocols',
    ],
    impact: {
      headline: 'Defending Human Cognitive & Private Autonomy',
      metrics: [
        'End-to-end encryption for text, voice, and video',
        'Sealed sender technology ensuring zero server metadata logs',
        '100% open-source inspectable cryptographic code',
        'Supported purely by voluntary grants and non-profit donations',
      ],
    },
    designPhilosophy:
      'Distraction-free, clean, and reliable. No algorithmic recommendation feeds, no algorithmic stories, no vanity metric counts.',
    accessibility:
      'Clean interface with high contrast options, voice messaging, and tactile feedback across modern operating systems.',
    dataTransparency:
      'Grand jury subpoena compliance records proving cryptographically that zero user message contents or contact graphs are stored.',
    featuredReason:
      '**Gold Standard in Mathematical Privacy.** Proving that world-class communication infrastructure can be built on mathematical zero-knowledge rather than surveillance.',
    socialProof:
      'Endorsed by leading cryptographers, digital rights organizations, and human rights defenders worldwide.',
    getStarted:
      'Download the open source Signal application for sovereign, private communication across devices.',
    imageAlt: 'Signal encrypted private messaging interface',
  },
];

/**
 * Featured website (highlighted on ecosystem page)
 */
export function getFeaturedWebsite(): AlignedWebsite {
  return alignedWebsites[0]; // Currently features Wellness Rural Guru
}

/**
 * Get information about what makes a website "aligned"
 */
export const alignmentCriteria = [
  {
    principle: 'Compassionate Value',
    description:
      'Provides genuine value without manipulation. No dark patterns, no attention exploitation, no extractive business models.',
  },
  {
    principle: 'Privacy & Transparency',
    description:
      'Clear about data practices. Minimal data collection. Users know exactly what information is gathered and why. No third-party tracking or deceptive practices.',
  },
  {
    principle: 'Accessibility First',
    description:
      'Designed for diverse abilities, languages, and economic situations. WCAG compliant. Support for multilingual access. Includes underserved communities intentionally.',
  },
  {
    principle: 'Dignified Design',
    description:
      'Respects user attention and autonomy. Content organized around user needs, not engagement metrics. No aggressive CTAs or fear-based messaging.',
  },
  {
    principle: 'Knowledge Liberation',
    description:
      'Educational content aims to expand agency and critical thinking. Empowers users with skills and understanding. Low or no barriers to learning.',
  },
  {
    principle: 'Environmental & Social Consciousness',
    description:
      'Acknowledges environmental impact. Supports social justice and equity. Transparent about supply chain and organizational values.',
  },
];
