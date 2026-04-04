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
    tagline: 'Holistic Wellness for Rural Communities',
    description:
      'Wellness Rural Guru is a purpose-driven platform dedicated to bringing accessible, evidence-based wellness resources directly to underserved rural communities. Rooted in principles of dignity, accessibility, and community empowerment, the platform offers yoga, meditation, nutritional guidance, and mental health support—without extraction of personal data or algorithmic manipulation.',
    missionStatement:
      'To democratize access to holistic wellness and mental health resources, ensuring that rural and underserved communities receive the same quality guidance as urban populations, while maintaining deep respect for cultural contexts and local knowledge systems.',
    principles: [
      'Non-Extractive Value',
      'Accessibility & Inclusivity',
      'Humanitarian Dignity',
      'Knowledge Liberation',
      'Environmental Stewardship',
      'Transparency',
    ],
    impact: {
      headline: 'Transforming Rural Wellness Access',
      metrics: [
        'Serves underserved rural communities with free, high-quality wellness content',
        'Zero data extraction—privacy-first architecture',
        'Integrates traditional and modern wellness approaches',
        'Multilingual support for accessibility',
        'Offline-first design for low-bandwidth areas',
      ],
    },
    designPhilosophy:
      'The platform uses calm, unhurried design that respects attention and cognitive load. No aggressive CTAs, no dark patterns. Content is organized around user needs, not engagement metrics. The interface celebrates cultural diversity and uses images that honor the communities served.',
    accessibility:
      'Full WCAG 2.1 AA compliance. Screen reader tested. Captions on all video content. Text alternatives for images. Keyboard navigation throughout. High contrast options available.',
    dataTransparency:
      'Zero-data collection model. Users can browse, learn, and practice without creating accounts. When accounts are optional, users see exactly what data is collected and why. No tracking, no third-party analytics, no data sales.',
    featuredReason:
      '**A Sterling Example of Dignified, Purpose-First Design.** Wellness Rural Guru represents the highest standard of conscious creation. Every design decision prioritizes the wellbeing of underserved communities over metrics or profit margins. The platform demonstrates that accessibility and values alignment are not trade-offs—they are enhancements.',
    socialProof:
      'Recognized as a model for ethical, inclusive wellness platforms. Endorsed by wellness educators, rural health advocates, and digital rights organizations.',
    getStarted:
      'Visit the platform to explore free wellness courses, join meditation circles, and discover resources tailored to rural wellness needs. All content is free and access requires no personal information.',
    imageAlt: 'Wellness Rural Guru dashboard showing peaceful meditation interface with rural landscape imagery',
  },

  {
    id: 'example-platform-2',
    name: 'Example Aligned Platform',
    url: 'https://example.com',
    tagline: 'Coming Soon - More Aligned Websites to Showcase',
    description:
      'We are actively seeking additional purpose-driven websites that exemplify the Forever Lotus Manifesto. If your platform shares these values, apply for onboarding.',
    missionStatement: 'To promote ethical, dignified, and compassionate digital presence.',
    principles: ['Compassion', 'Transparency', 'Dignity'],
    impact: {
      headline: 'Building an Ecosystem',
      metrics: ['Growing network of aligned platforms', 'Promoting ethical design practices'],
    },
    designPhilosophy:
      'User-centered, dignified design that respects attention and privacy.',
    accessibility: 'Committed to accessible design standards.',
    dataTransparency: 'Privacy-first approach to user data.',
    featuredReason:
      'Placeholder for future Featured websites that embody manifesto principles.',
    imageAlt: 'Placeholder for aligned website showcase',
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
