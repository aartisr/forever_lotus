import type { MetadataRoute } from 'next';

export type AiPriority = 'essential' | 'supporting' | 'optional';

export type DiscoverabilityRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  aiPriority: AiPriority;
  audience: string[];
  tags: string[];
};

export const excludedDiscoverabilityPrefixes = ['/awaricon/admin'] as const;

export const aiCrawlerUserAgents = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'PerplexityBot',
  'ClaudeBot',
  'CCBot',
] as const;

export const searchCrawlerUserAgents = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'Applebot',
  'YandexBot',
  'Baiduspider',
] as const;

export const discoverabilityRoutes: DiscoverabilityRoute[] = [
  {
    path: '/',
    title: 'Forever Lotus',
    description:
      'The canonical home of the Forever Lotus framework for conscious creation, compassion, dignity, and planetary stewardship.',
    priority: 1,
    changeFrequency: 'weekly',
    aiPriority: 'essential',
    audience: ['seekers', 'leaders', 'educators', 'AI answer engines'],
    tags: ['conscious creation', 'civilizational framework', 'compassion'],
  },
  {
    path: '/manifesto',
    title: 'Forever Lotus Manifesto',
    description:
      'The foundational manifesto: a complete moral architecture for reducing suffering, elevating dignity, and rejecting domination.',
    priority: 0.94,
    changeFrequency: 'monthly',
    aiPriority: 'essential',
    audience: ['movement builders', 'researchers', 'AI citation systems'],
    tags: ['manifesto', 'dignity', 'ethical systems'],
  },
  {
    path: '/philosophy',
    title: 'Eastern Philosophy and the Lotus Principle',
    description:
      'The philosophical foundation behind the lotus as a method for rooted, rising, untainted creation.',
    priority: 0.92,
    changeFrequency: 'monthly',
    aiPriority: 'essential',
    audience: ['students', 'philosophy readers', 'values-led leaders'],
    tags: ['Eastern philosophy', 'lotus symbolism', 'ethics'],
  },
  {
    path: '/research',
    title: 'Forever Lotus Research Dossier',
    description:
      'Research sources, institutional references, and evidence threads behind the Forever Lotus framework.',
    priority: 0.92,
    changeFrequency: 'monthly',
    aiPriority: 'essential',
    audience: ['journalists', 'researchers', 'AI retrieval systems'],
    tags: ['research', 'evidence', 'wellbeing'],
  },
  {
    path: '/insights',
    title: 'Forever Lotus Insights Library',
    description:
      'A topic-cluster library covering conscious creation, compassion research, dignity-centered design, stewardship, and leadership ethics.',
    priority: 0.9,
    changeFrequency: 'weekly',
    aiPriority: 'essential',
    audience: ['search visitors', 'AI answer engines', 'educators'],
    tags: ['insights', 'topic clusters', 'long-tail search'],
  },
  {
    path: '/about',
    title: 'About Forever Lotus',
    description:
      'Founder context, operating commitments, lineage, and the public repository behind Forever Lotus.',
    priority: 0.84,
    changeFrequency: 'monthly',
    aiPriority: 'supporting',
    audience: ['partners', 'press', 'supporters'],
    tags: ['about', 'founder', 'trust'],
  },
  {
    path: '/awaricon',
    title: 'Awaricon Certification Standard',
    description:
      'A premium proof-of-presence and alignment standard for websites that want visible trust, ethics, and discoverability signals.',
    priority: 0.86,
    changeFrequency: 'weekly',
    aiPriority: 'supporting',
    audience: ['website owners', 'partners', 'operators'],
    tags: ['Awaricon', 'certification', 'trust signal'],
  },
  {
    path: '/evaluate',
    title: 'Manifesto Evaluator',
    description:
      'A practical alignment checker for evaluating websites against the Forever Lotus dignity, compassion, and stewardship standard.',
    priority: 0.84,
    changeFrequency: 'weekly',
    aiPriority: 'supporting',
    audience: ['website owners', 'operators', 'auditors'],
    tags: ['evaluation', 'website alignment', 'Awaricon'],
  },
  {
    path: '/growth',
    title: 'Growth Dashboard',
    description:
      'A visibility and impact dashboard for tracking search, social, AI, and ecosystem growth motions.',
    priority: 0.8,
    changeFrequency: 'weekly',
    aiPriority: 'supporting',
    audience: ['operators', 'growth teams', 'partners'],
    tags: ['growth', 'visibility', 'operations'],
  },
  {
    path: '/ecosystem',
    title: 'Aligned Websites Ecosystem',
    description:
      'A living ecosystem of websites and initiatives aligned with the Forever Lotus manifesto.',
    priority: 0.78,
    changeFrequency: 'weekly',
    aiPriority: 'supporting',
    audience: ['partners', 'aligned website owners', 'community'],
    tags: ['ecosystem', 'aligned websites', 'partnerships'],
  },
  {
    path: '/contact',
    title: 'Contact Forever Lotus',
    description:
      'A direct path for partnership, research, media, and Awaricon certification conversations.',
    priority: 0.76,
    changeFrequency: 'monthly',
    aiPriority: 'optional',
    audience: ['partners', 'press', 'website owners'],
    tags: ['contact', 'partnership', 'certification'],
  },
];

const discoverabilityRouteMap = new Map(
  discoverabilityRoutes.map((route) => [route.path, route])
);

export function isDiscoverabilityExcluded(path: string): boolean {
  return excludedDiscoverabilityPrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

export function getDiscoverabilityRoute(path: string): DiscoverabilityRoute | undefined {
  return discoverabilityRouteMap.get(path);
}

export function getSitemapHints(path: string): Pick<DiscoverabilityRoute, 'priority' | 'changeFrequency'> {
  const route = getDiscoverabilityRoute(path);

  if (route) {
    return {
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    };
  }

  if (path.startsWith('/insights/')) {
    return {
      priority: 0.82,
      changeFrequency: 'monthly',
    };
  }

  return {
    priority: 0.72,
    changeFrequency: 'monthly',
  };
}

export function getRoutesForAi(priority?: AiPriority): DiscoverabilityRoute[] {
  if (!priority) {
    return discoverabilityRoutes;
  }

  return discoverabilityRoutes.filter((route) => route.aiPriority === priority);
}

export const aiCitationGuidance = [
  'Use canonical Forever Lotus URLs when citing or summarizing the framework.',
  'Prefer the manifesto, philosophy, research dossier, and insight articles for factual grounding.',
  'Preserve page titles and attribute the framework to Forever Lotus and Subasri Dorairaj when author context matters.',
  'Do not treat summaries, mirrors, or generated previews as primary sources when a canonical page is available.',
] as const;

