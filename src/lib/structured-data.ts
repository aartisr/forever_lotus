import { buildPageUrl, founderName, getSameAsLinks, siteDescription, siteName, siteUrl } from '@/lib/seo';
import type { Locale } from '@/i18n';

type StructuredData = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path?: string;
  url?: string;
};

export function compactJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => compactJsonLd(item))
      .filter((item) => item !== undefined && item !== null && item !== '') as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, entry]) => [key, compactJsonLd(entry)])
        .filter(([, entry]) => {
          if (entry === undefined || entry === null || entry === '') {
            return false;
          }

          if (Array.isArray(entry) && entry.length === 0) {
            return false;
          }

          return true;
        })
    ) as T;
  }

  return value;
}

export function buildJsonLdGraph(entries: StructuredData[]): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@graph': entries.map((entry) => {
      const graphEntry = { ...entry };
      delete graphEntry['@context'];
      return graphEntry;
    }),
  });
}

export function buildWebsiteJsonLd(): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: buildPageUrl('/insights?query={search_term_string}'),
      'query-input': 'required name=search_term_string',
    },
  });
}

export function buildOrganizationJsonLd(): StructuredData {
  const sameAs = getSameAsLinks();

  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    logo: buildPageUrl('/icon.svg'),
    founder: {
      '@type': 'Person',
      name: founderName,
      url: buildPageUrl('/about'),
    },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  });
}

export function buildPersonJsonLd(): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': buildPageUrl('/about#founder'),
    name: founderName,
    url: buildPageUrl('/about'),
    affiliation: {
      '@id': `${siteUrl}/#organization`,
    },
    sameAs: getSameAsLinks(),
  });
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ?? (item.path ? buildPageUrl(item.path) : undefined),
    })),
  });
}

export function buildWebPageJsonLd({
  path,
  title,
  description,
  locale = 'en',
  primaryImage,
  breadcrumbs,
}: {
  path: string;
  title: string;
  description: string;
  locale?: Locale | 'en';
  primaryImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}): StructuredData {
  const url = buildPageUrl(path, locale === 'en' ? 'en' : locale);

  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: title,
    url,
    description,
    inLanguage: locale,
    primaryImageOfPage: primaryImage
      ? {
          '@type': 'ImageObject',
          url: primaryImage,
        }
      : undefined,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
    },
    breadcrumb: breadcrumbs ? buildBreadcrumbJsonLd(breadcrumbs) : undefined,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  });
}

export function buildCollectionPageJsonLd({
  path,
  title,
  description,
  items,
}: {
  path: string;
  title: string;
  description: string;
  items: Array<{ name: string; url: string; description?: string; keyword?: string }>;
}): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${buildPageUrl(path)}#collection`,
    name: title,
    url: buildPageUrl(path),
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
    },
    hasPart: items.map((item) => ({
      '@type': 'Article',
      headline: item.name,
      url: item.url,
      description: item.description,
      keywords: item.keyword,
    })),
  });
}

export function buildItemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; url: string }>;
}): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  });
}

export function buildFAQPageJsonLd(items: Array<{ question: string; answer: string }>): StructuredData {
  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

export function buildArticleJsonLd({
  path,
  title,
  description,
  image,
  keywords,
  articleSection,
  wordCount,
  datePublished,
  dateModified,
}: {
  path: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  articleSection: string[];
  wordCount: number;
  datePublished?: string;
  dateModified?: string;
}): StructuredData {
  const url = buildPageUrl(path);

  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image,
    author: {
      '@type': 'Person',
      '@id': buildPageUrl('/about#founder'),
      name: founderName,
      url: buildPageUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: buildPageUrl('/icon.svg'),
      },
    },
    inLanguage: 'en',
    articleSection,
    keywords,
    wordCount,
    datePublished,
    dateModified,
    isAccessibleForFree: true,
  });
}
