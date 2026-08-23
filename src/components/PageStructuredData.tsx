import JsonLd from '@/components/JsonLd';
import type { Locale } from '@/i18n';
import { buildJsonLdGraph, buildWebPageJsonLd } from '@/lib/structured-data';

type PageStructuredDataProps = {
  path: string;
  title: string;
  description: string;
  locale: Locale;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

/** Adds a canonical WebPage entity to editorial pages without duplicating markup. */
export default function PageStructuredData({
  path,
  title,
  description,
  locale,
  breadcrumbs,
}: PageStructuredDataProps) {
  return (
    <JsonLd
      data={buildJsonLdGraph([
        buildWebPageJsonLd({ path, title, description, locale, breadcrumbs }),
      ])}
    />
  );
}
