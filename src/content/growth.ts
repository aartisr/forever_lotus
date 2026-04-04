export const growthPageContent = {
  title: 'Growth Operations Dashboard',
  description:
    'Operational KPI targets, weekly scorecards, and measurement rituals for search growth, engagement quality, and conversion outcomes.',
  hero: {
    eyebrow: 'Execution Layer',
    title: 'Growth Operations Dashboard',
    description:
      'This page defines the measurement system used to turn SEO and content into a compounding growth engine.',
  },
  kpiCards: [
    {
      metric: 'Organic Impressions',
      target: '+20% MoM',
      why: 'Signals broader query coverage and improved crawl/index visibility.',
    },
    {
      metric: 'Average Position (Priority URLs)',
      target: 'Top 10 in 90 days',
      why: 'Improves sustained discoverability for high-intent pages.',
    },
    {
      metric: 'CTR from Organic',
      target: '>3.5%',
      why: 'Validates title/meta resonance and intent alignment.',
    },
    {
      metric: 'Engaged Session Rate',
      target: '>60%',
      why: 'Ensures traffic quality, not vanity traffic.',
    },
    {
      metric: 'Core CTA Conversion Rate',
      target: '>4%',
      why: 'Measures business/mission impact from content consumption.',
    },
    {
      metric: 'Referring Domains',
      target: '+8 quality links/month',
      why: 'Backlinks remain the strongest external ranking signal.',
    },
  ],
  rituals: [
    'Monday: keyword and page planning using Search Console opportunity gaps.',
    'Tuesday: publish one long-tail insight page and connect two internal links.',
    'Wednesday: refresh titles/meta for two underperforming URLs.',
    'Thursday: ship three distribution assets (LinkedIn, X thread, newsletter).',
    'Friday: scorecard review and next-week iteration plan.',
  ],
} as const;
