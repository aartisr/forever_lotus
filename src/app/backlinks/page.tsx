import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import {
  buildAlternates,
  buildPageUrl,
  defaultOgImage,
  defaultTwitterImage,
  founderName,
  siteName,
} from '@/lib/seo';
import { buildItemListJsonLd, buildWebPageJsonLd } from '@/lib/structured-data';

const title = 'Backlink & Citation Kit';
const description =
  'Official backlink and citation kit with canonical URLs, citation-safe anchors, copy-ready HTML snippets, and media references for partners, journalists, educators, and aligned websites.';

const recommendedLinks = [
  {
    label: 'Manifesto',
    path: '/manifesto',
    anchor: 'Forever Lotus Manifesto',
    context: 'Use for values, vision, and governance references.',
  },
  {
    label: 'Research',
    path: '/research',
    anchor: 'Forever Lotus Research Dossier',
    context: 'Use when citing evidence, studies, and source-backed arguments.',
  },
  {
    label: 'Insights',
    path: '/insights',
    anchor: 'Forever Lotus Insights',
    context: 'Use for thematic explainers and long-tail editorial links.',
  },
  {
    label: 'About',
    path: '/about',
    anchor: `About ${founderName}`,
    context: 'Use for founder profile, mission context, and authorship references.',
  },
  {
    label: 'Home',
    path: '/',
    anchor: 'Forever Lotus',
    context: 'Use for general brand mentions and homepage references.',
  },
];

const htmlExamples = [
  `<a href="${buildPageUrl('/manifesto')}" title="Forever Lotus Manifesto">Forever Lotus Manifesto</a>`,
  `<a href="${buildPageUrl('/research')}" title="Forever Lotus Research Dossier">Forever Lotus Research Dossier</a>`,
  `<a href="${buildPageUrl('/insights')}" title="Forever Lotus Insights">Forever Lotus Insights</a>`,
];

const markdownExamples = [
  `[Forever Lotus Manifesto](${buildPageUrl('/manifesto')})`,
  `[Forever Lotus Research Dossier](${buildPageUrl('/research')})`,
  `[Forever Lotus Insights](${buildPageUrl('/insights')})`,
];

const editorialResources = [
  {
    audience: 'Research, universities & libraries',
    title: 'A source-conscious framework for responsible progress',
    destination: '/research',
    destinationLabel: 'Research Dossier',
    use: 'Suitable for reading lists, research roundups, and evidence-contextual references.',
  },
  {
    audience: 'Humanitarian, education & civic organizations',
    title: 'Dignity-centered humanitarian design',
    destination: '/insights/dignity-centered-humanitarian-design',
    destinationLabel: 'Dignity-centered design guide',
    use: 'Suitable for practitioner resource lists and discussions of agency-centered service design.',
  },
  {
    audience: 'Ethics, leadership & technology publications',
    title: 'Conscious creation as a practical leadership frame',
    destination: '/insights/conscious-creation-framework',
    destinationLabel: 'Conscious creation framework',
    use: 'Suitable for editorial context on responsible systems, governance, and leadership.',
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/backlinks', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/backlinks', 'en'),
    title,
    description,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultTwitterImage],
  },
};

export default function BacklinksPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    path: '/backlinks',
    title,
    description,
    locale: 'en',
  });

  const itemListJsonLd = buildItemListJsonLd({
    name: 'Recommended Forever Lotus Backlink Targets',
    items: recommendedLinks.map((item) => ({
      name: item.anchor,
      url: buildPageUrl(item.path),
    })),
  });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which page should I link to when citing Forever Lotus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the page that best matches your context: Manifesto for worldview, Research for evidence, Insights for topic explainers, and About for founder profile.',
        },
      },
      {
        '@type': 'Question',
        name: 'What anchor text is preferred?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use natural, descriptive anchor text such as Forever Lotus Manifesto, Forever Lotus Research Dossier, or Forever Lotus Insights.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I quote content from Forever Lotus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Preserve context, attribute to Forever Lotus, and include a canonical page URL in the citation.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Authority Signals"
        title="Backlink & Citation Kit"
        description="For editors, researchers, creators, and aligned websites who want to reference Forever Lotus with high-quality, context-safe backlinks."
        gradient="radial-gradient(ellipse 68% 52% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 62%)"
      />

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]" aria-labelledby="recommended-links-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="recommended-links-heading" className="font-serif font-black text-3xl mb-8">
            Recommended Pages to Link
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendedLinks.map((item) => (
              <article key={item.path} className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-2">{item.label}</p>
                <h3 className="font-serif text-2xl font-bold mb-2 text-[#1a1612]">{item.anchor}</h3>
                <p className="text-sm text-[#4a4640] leading-relaxed mb-3">{item.context}</p>
                <p className="text-xs text-[#6a655f] break-all mb-4">{buildPageUrl(item.path)}</p>
                <Link href={item.path} className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
                  Open page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="copy-paste-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="copy-paste-heading" className="font-serif font-black text-3xl text-lotus-cream mb-8">
            Copy-Paste Backlink Snippets
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl border border-lotus-border-soft bg-white/10 p-6">
              <h3 className="font-serif text-xl text-lotus-cream mb-4">HTML</h3>
              <div className="space-y-3">
                {htmlExamples.map((snippet) => (
                  <pre
                    key={snippet}
                    className="rounded-lg bg-black/30 border border-white/10 p-3 text-[12px] leading-relaxed text-lotus-cream overflow-x-auto"
                  >
                    {snippet}
                  </pre>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-lotus-border-soft bg-white/10 p-6">
              <h3 className="font-serif text-xl text-lotus-cream mb-4">Markdown</h3>
              <div className="space-y-3">
                {markdownExamples.map((snippet) => (
                  <pre
                    key={snippet}
                    className="rounded-lg bg-black/30 border border-white/10 p-3 text-[12px] leading-relaxed text-lotus-cream overflow-x-auto"
                  >
                    {snippet}
                  </pre>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-lotus-border-soft bg-white/5 p-7">
            <h3 className="font-serif text-2xl text-lotus-cream mb-3">Citation Guidelines</h3>
            <ul className="text-lotus-muted text-sm leading-relaxed space-y-2">
              <li>Use canonical page URLs instead of archived or parameterized links.</li>
              <li>Prefer descriptive anchors over generic anchors like &quot;click here&quot;.</li>
              <li>Match citation destination to context: Manifesto for thesis, Research for evidence, Insights for explainer content.</li>
              <li>When quoting, attribute to Forever Lotus and include a direct link to the source page.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]" aria-labelledby="editorial-resources-heading">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-3">Earned editorial references</p>
          <h2 id="editorial-resources-heading" className="font-serif font-black text-3xl mb-4">
            Useful resources deserve useful links
          </h2>
          <p className="max-w-3xl text-[#4a4640] leading-relaxed mb-8">
            Forever Lotus does not seek paid, automated, reciprocal, or context-free links. If you publish a
            resource list, course, report, article, or community guide, link only where one of these materials
            genuinely helps your readers investigate the subject further.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {editorialResources.map((resource) => (
              <article key={resource.destination} className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[#8c7a53] mb-3">{resource.audience}</p>
                <h3 className="font-serif text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-sm text-[#4a4640] leading-relaxed mb-4">{resource.use}</p>
                <Link href={resource.destination} className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
                  Read the {resource.destinationLabel} →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#5a544b]">
            For the team’s measurement, prospecting, review, and reporting routine, see the{' '}
            <a href="https://github.com/aartisr/forever_lotus/blob/main/docs/BACKLINK_ACQUISITION_RUNBOOK.md" className="text-[#8c6b28] hover:text-[#6f541f] font-semibold">
              backlink acquisition runbook
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
