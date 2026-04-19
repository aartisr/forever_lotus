import { buildPageUrl, founderName, getSameAsLinks, githubRepoUrl, siteDescription, siteName, siteUrl } from '@/lib/seo';
import type { Locale } from '@/i18n';

type StructuredData = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path?: string;
  url?: string;
};

export function buildWebsiteJsonLd(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
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
  };
}

export function buildOrganizationJsonLd(): StructuredData {
  const sameAs = getSameAsLinks();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
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
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ?? (item.path ? buildPageUrl(item.path) : undefined),
    })),
  };
}

export function buildWebPageJsonLd({
  path,
  title,
  description,
  locale = 'en',
}: {
  path: string;
  title: string;
  description: string;
  locale?: Locale | 'en';
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: buildPageUrl(path, locale === 'en' ? 'en' : locale),
    description,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  };
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
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url: buildPageUrl(path),
    description,
    isPartOf: {
      '@type': 'WebSite',
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
  };
}

export function buildItemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; url: string }>;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function buildArticleJsonLd({
  path,
  title,
  description,
  image,
  keywords,
  articleSection,
  wordCount,
}: {
  path: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  articleSection: string[];
  wordCount: number;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: buildPageUrl(path),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildPageUrl(path),
    },
    image,
    author: {
      '@type': 'Person',
      name: founderName,
      url: buildPageUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
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
    isAccessibleForFree: true,
  };
}
