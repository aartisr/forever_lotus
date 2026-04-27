import type { ChromeMessages } from '@/i18n/chromeMessages';

export type NavChild = {
  href: string;
  label: string;
  icon: string;
  description: string;
};

export type NavGroup = {
  key: string;
  label: string;
  href: string;
  items: NavChild[];
};

export type JourneyLink = NavChild & {
  kicker: string;
};

export type FooterColumn = {
  key: string;
  label: string;
  links: NavChild[];
};

export type FooterProofPoint = {
  value: string;
  label: string;
};

export function getNavigationGroups(messages: ChromeMessages): NavGroup[] {
  return [
    {
      key: 'framework',
      label: messages.nav.groups.framework,
      href: '/manifesto',
      items: [
        {
          href: '/manifesto',
          label: messages.nav.links.manifesto,
          icon: '📜',
          description: messages.nav.descriptions.manifesto,
        },
        {
          href: '/philosophy',
          label: messages.nav.links.philosophy,
          icon: '🪷',
          description: messages.nav.descriptions.philosophy,
        },
        {
          href: '/about',
          label: messages.nav.links.about,
          icon: '✦',
          description: messages.nav.descriptions.about,
        },
      ],
    },
    {
      key: 'knowledge',
      label: messages.nav.groups.knowledge,
      href: '/research',
      items: [
        {
          href: '/research',
          label: messages.nav.links.research,
          icon: '🔬',
          description: messages.nav.descriptions.research,
        },
        {
          href: '/insights',
          label: messages.nav.links.insights,
          icon: '💡',
          description: messages.nav.descriptions.insights,
        },
        {
          href: '/backlinks',
          label: messages.nav.links.citationKit,
          icon: '⌁',
          description: messages.nav.descriptions.citationKit,
        },
      ],
    },
    {
      key: 'growth',
      label: messages.nav.groups.growth,
      href: '/growth',
      items: [
        {
          href: '/growth',
          label: messages.nav.links.growthDashboard,
          icon: '📈',
          description: messages.nav.descriptions.growthDashboard,
        },
      ],
    },
    {
      key: 'ecosystem',
      label: messages.nav.groups.ecosystem,
      href: '/ecosystem',
      items: [
        {
          href: '/ecosystem',
          label: messages.nav.links.alignedWebsites,
          icon: '🌐',
          description: messages.nav.descriptions.alignedWebsites,
        },
        {
          href: '/evaluate',
          label: messages.nav.links.manifestoEvaluator,
          icon: '⚖️',
          description: messages.nav.descriptions.manifestoEvaluator,
        },
        {
          href: '/onboarding-websites',
          label: messages.nav.links.onboardWebsite,
          icon: '✚',
          description: messages.nav.descriptions.onboardWebsite,
        },
      ],
    },
  ];
}

export function getJourneyLinks(messages: ChromeMessages): JourneyLink[] {
  return [
    {
      href: '/manifesto',
      label: messages.nav.links.manifesto,
      icon: '01',
      kicker: messages.nav.journey.manifestoKicker,
      description: messages.nav.journey.manifestoDescription,
    },
    {
      href: '/research',
      label: messages.nav.links.research,
      icon: '02',
      kicker: messages.nav.journey.researchKicker,
      description: messages.nav.journey.researchDescription,
    },
    {
      href: '/insights',
      label: messages.nav.links.insights,
      icon: '03',
      kicker: messages.nav.journey.insightsKicker,
      description: messages.nav.journey.insightsDescription,
    },
    {
      href: '/evaluate',
      label: messages.nav.links.manifestoEvaluator,
      icon: '04',
      kicker: messages.nav.journey.evaluateKicker,
      description: messages.nav.journey.evaluateDescription,
    },
    {
      href: '/awaricon',
      label: messages.nav.links.awaricon,
      icon: '05',
      kicker: messages.nav.journey.awariconKicker,
      description: messages.nav.journey.awariconDescription,
    },
  ];
}

export function getFooterColumns(messages: ChromeMessages): FooterColumn[] {
  const groups = getNavigationGroups(messages);
  const groupByKey = new Map(groups.map((group) => [group.key, group]));

  return [
    {
      key: 'framework',
      label: messages.nav.groups.framework,
      links: groupByKey.get('framework')?.items ?? [],
    },
    {
      key: 'knowledge',
      label: messages.nav.groups.knowledge,
      links: groupByKey.get('knowledge')?.items ?? [],
    },
    {
      key: 'ecosystem',
      label: messages.nav.groups.ecosystem,
      links: groupByKey.get('ecosystem')?.items ?? [],
    },
    {
      key: 'operators',
      label: messages.nav.groups.operators,
      links: [
        {
          href: '/growth',
          label: messages.nav.links.growthDashboard,
          icon: '📈',
          description: messages.nav.descriptions.growthDashboard,
        },
        {
          href: '/awaricon',
          label: messages.nav.links.awaricon,
          icon: '✺',
          description: messages.nav.descriptions.awaricon,
        },
        {
          href: '/awaricon/legal',
          label: messages.footer.legalPolicyLabel,
          icon: '§',
          description: messages.nav.descriptions.legalPolicy,
        },
        {
          href: '/contact',
          label: messages.nav.links.contact,
          icon: '@',
          description: messages.nav.descriptions.contact,
        },
      ],
    },
  ];
}

export function getFooterProofPoints(messages: ChromeMessages): FooterProofPoint[] {
  return [
    {
      value: 'AI',
      label: messages.footer.proofPoints.aiIndex,
    },
    {
      value: '5',
      label: messages.footer.proofPoints.localized,
    },
    {
      value: '25+',
      label: messages.footer.proofPoints.research,
    },
    {
      value: 'Open',
      label: messages.footer.proofPoints.repository,
    },
  ];
}
