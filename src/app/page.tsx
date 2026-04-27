import Link from 'next/link';
import GuidedScrollNav from '@/components/GuidedScrollNav';
import JsonLd from '@/components/JsonLd';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';
import { buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';
import {
  buildFAQPageJsonLd,
  buildItemListJsonLd,
  buildJsonLdGraph,
  buildWebPageJsonLd,
} from '@/lib/structured-data';

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section
      id="home-hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Starfield */}
      <div className="starfield" aria-hidden="true" />

      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(201,168,76,0.11) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(14,182,168,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Animated lotus mandala */}
      <div
        className="hero-mandala absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <LotusIcon
          size={520}
          variant="hero"
          className="opacity-30 animate-float"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <p
          className="eyebrow mb-6 animate-fade-up"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          ❋ &nbsp; {home.hero.eyebrow} &nbsp; ❋
        </p>

        <h1
          id="hero-heading"
          className="font-serif font-black leading-[1.06] mb-6 animate-fade-up"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            animationDelay: '380ms',
            animationFillMode: 'both',
          }}
        >
          {home.hero.titlePrefix}{' '}
          <span className="text-gold-shimmer">{home.hero.titleHighlight}</span>
        </h1>

        <p
          className="text-lotus-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '540ms', animationFillMode: 'both' }}
        >
          {home.hero.description}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '700ms', animationFillMode: 'both' }}
        >
          <Link href={withLocale('/manifesto', locale)} className="btn-primary text-base" data-track="home_hero_manifesto_cta">
            {home.hero.ctaPrimary}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={withLocale('/philosophy', locale)} className="btn-ghost text-base" data-track="home_hero_philosophy_cta">
            {home.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#home-principle"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up"
        style={{ animationDelay: '1200ms', animationFillMode: 'both' }}
        aria-label="Scroll to next section"
      >
        <span className="text-lotus-muted-2 text-xs tracking-widest uppercase">
          {home.hero.scroll}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-lotus-gold/40 to-transparent animate-float" />
      </a>
    </section>
  );
}

// ─── Lotus Principle ─────────────────────────────────────────────────────────

function LotusPrinciple({ home }: { home: ReturnType<typeof getMessages>['home'] }) {
  return (
    <section id="home-principle" className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="principle-heading">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-4">{home.principle.eyebrow}</p>
          <h2
            id="principle-heading"
            className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {home.principle.title}
          </h2>
          <p className="text-lotus-muted max-w-2xl mx-auto text-lg leading-relaxed mb-16">
            {home.principle.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {home.principle.cards.map(({ symbol, word, desc, color }) => (
            <ScrollReveal key={word} className="h-full">
              <div className="card-glass rounded-2xl p-8 h-full group hover:border-lotus-border transition-all duration-500 hover:shadow-card-hover">
                <div
                  className="text-4xl mb-4 font-serif font-black"
                  style={{ color }}
                >
                  {symbol}
                </div>
                <h3
                  className="font-serif text-2xl font-bold mb-3"
                  style={{ color }}
                >
                  {word}
                </h3>
                <p className="text-lotus-muted leading-relaxed text-sm">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Quote Section ────────────────────────────────────────────────────────────

function QuoteSection({ home }: { home: ReturnType<typeof getMessages>['home'] }) {
  return (
    <section id="home-quote" className="relative py-28 px-5 sm:px-8 overflow-hidden bg-lotus-bg-2">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <LotusIcon size={44} variant="section" className="mx-auto mb-8 opacity-70" />
          <blockquote>
            <p
              className="font-serif italic leading-tight mb-8 text-lotus-cream/90"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            >
              &ldquo;{home.quote.text}&rdquo;
            </p>
            <footer className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-lotus-gold/40" />
              <cite className="not-italic text-lotus-gold text-sm font-medium tracking-wider uppercase">
                {home.quote.cite}
              </cite>
              <div className="h-px w-12 bg-lotus-gold/40" />
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Six Pillars ──────────────────────────────────────────────────────────────

const pillarBorderColors: Record<string, string> = {
  teal: 'hover:border-lotus-teal/40',
  pink: 'hover:border-lotus-pink/40',
  gold: 'hover:border-lotus-gold/40',
  violet: 'hover:border-violet-500/40',
};

const pillarIconBg: Record<string, string> = {
  teal: 'bg-lotus-teal/10 text-lotus-teal',
  pink: 'bg-lotus-pink/10 text-lotus-pink',
  gold: 'bg-lotus-gold/10 text-lotus-gold',
  violet: 'bg-violet-500/10 text-violet-400',
};

function PillarsSection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section id="home-pillars" className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="pillars-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="eyebrow mb-4">{home.pillars.eyebrow}</p>
          <h2
            id="pillars-heading"
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {home.pillars.title}
          </h2>
          <p className="text-lotus-muted max-w-xl mx-auto mt-4 leading-relaxed">
            {home.pillars.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {home.pillars.items.map(({ icon, title, summary, color }) => (
            <ScrollReveal key={title} className="h-full">
              <div
                className={`card-glass rounded-2xl p-7 h-full border border-lotus-border-soft transition-all duration-500 group cursor-default ${pillarBorderColors[color]}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 ${pillarIconBg[color]}`}
                >
                  {icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-lotus-cream">
                  {title}
                </h3>
                <p className="text-lotus-muted text-sm leading-relaxed">{summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link href={withLocale('/manifesto', locale)} className="btn-ghost">
              {home.pillars.cta} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Statistics ───────────────────────────────────────────────────────────────

function StatsSection({ home }: { home: ReturnType<typeof getMessages>['home'] }) {
  return (
    <section id="home-stats" className="py-20 px-5 sm:px-8 bg-lotus-bg-2 border-y border-lotus-border-soft">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
          {home.stats.map(({ value, label }) => (
            <ScrollReveal key={label} className="text-center">
              <p
                className="font-serif font-black text-gold-shimmer mb-2"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
              >
                {value}
              </p>
              <p className="text-lotus-muted text-sm leading-snug">{label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Traditions Section ───────────────────────────────────────────────────────

function TraditionsSection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section id="home-traditions" className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="traditions-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="eyebrow mb-4">{home.traditions.eyebrow}</p>
          <h2
            id="traditions-heading"
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {home.traditions.title}
          </h2>
          <p className="text-lotus-muted max-w-xl mx-auto mt-4 leading-relaxed">
            {home.traditions.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger-children">
          {home.traditions.items.map(({ tradition, text, cite }) => (
            <ScrollReveal key={tradition} className="h-full">
              <div className="card-glass-gold rounded-2xl p-7 h-full group hover:shadow-gold transition-all duration-500">
                <p className="eyebrow mb-3 text-lotus-gold/60">{tradition}</p>
                <p className="font-serif italic text-lotus-cream/85 text-lg leading-relaxed mb-4">
                  &ldquo;{text}&rdquo;
                </p>
                <p className="text-lotus-muted-2 text-xs tracking-wide">— {cite}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Link href={withLocale('/philosophy', locale)} className="btn-ghost">
              {home.traditions.cta} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Research Section ─────────────────────────────────────────────────────────

function ResearchSection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section id="home-research" className="py-28 px-5 sm:px-8 bg-lotus-bg-2" aria-labelledby="research-heading">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-4">{home.research.eyebrow}</p>
          <h2
            id="research-heading"
            className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {home.research.title}
          </h2>
          <p className="text-lotus-muted max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            {home.research.description}
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3 mb-14 stagger-children">
          {home.research.institutions.map((inst) => (
            <ScrollReveal key={inst}>
              <span className="card-glass-gold inline-block px-5 py-2.5 rounded-full text-sm text-lotus-cream/80 font-medium">
                {inst}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="card-glass rounded-2xl p-8 max-w-2xl mx-auto border border-lotus-border-soft">
            <LotusIcon size={36} variant="section" className="mx-auto mb-5 opacity-70" />
            <p className="font-serif italic text-lotus-cream/80 text-xl leading-relaxed mb-5">
              &ldquo;{home.research.quote}&rdquo;
            </p>
            <Link href={withLocale('/research', locale)} className="btn-primary text-sm !py-2.5" data-track="home_research_cta">
              {home.research.cta} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Vow Section ─────────────────────────────────────────────────────────────

function VowSection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section id="home-vow" className="relative py-32 px-5 sm:px-8 overflow-hidden bg-lotus-bg-3" aria-labelledby="vow-heading">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,135,166,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-6">{home.vow.eyebrow}</p>
          <h2
            id="vow-heading"
            className="font-serif font-black leading-tight mb-8 text-lotus-cream"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            {home.vow.titlePrefix}{' '}
            <span className="text-lotus-pink">{home.vow.titleHighlight}</span>
          </h2>
          <p className="text-lotus-muted text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            {home.vow.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-12">
            {home.vow.commitments.map(({ num, text }) => (
              <div
                key={num}
                className="card-glass rounded-xl p-5 border border-lotus-border-soft"
              >
                <span className="font-serif text-lotus-gold/40 text-xs font-bold tracking-wider">
                  {num}
                </span>
                <p className="text-lotus-cream/75 text-sm leading-relaxed mt-2">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <Link href={withLocale('/manifesto', locale)} className="btn-primary text-base" data-track="home_vow_manifesto_cta">
            {home.vow.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function HomeFAQSection({ home }: { home: ReturnType<typeof getMessages>['home'] }) {
  const items = [
    {
      question: home.faq.q1,
      answer: home.principle.description,
    },
    {
      question: home.faq.q2,
      answer: home.research.description,
    },
    {
      question: home.faq.q3,
      answer: home.vow.description,
    },
  ];

  return (
    <section id="home-faq" className="py-24 px-5 sm:px-8 bg-lotus-bg-2" aria-labelledby="home-faq-heading">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="eyebrow mb-4">{home.faq.eyebrow}</p>
          <h2
            id="home-faq-heading"
            className="font-serif font-bold text-lotus-cream"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            {home.faq.title}
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {items.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 80}>
              <details className="group rounded-2xl border border-lotus-border-soft bg-white/[0.035] p-5 open:border-lotus-gold/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold text-lotus-cream">
                  {item.question}
                  <span className="text-lotus-gold transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-lotus-muted">{item.answer}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ home, locale }: { home: ReturnType<typeof getMessages>['home']; locale: ReturnType<typeof resolveLocale> }) {
  return (
    <section id="home-cta" className="py-28 px-5 sm:px-8 bg-lotus-bg border-t border-lotus-border-soft" aria-labelledby="cta-heading">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <LotusIcon size={52} variant="section" className="mx-auto mb-8 animate-float" />
          <h2
            id="cta-heading"
            className="font-serif font-black mb-5 text-lotus-cream"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {home.closing.titlePrefix}{' '}
            <span className="text-gold-shimmer">{home.closing.titleHighlight}</span>
          </h2>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed mb-10">
            {home.closing.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={withLocale('/manifesto', locale)} className="btn-primary text-base" data-track="home_final_manifesto_cta">
              {home.closing.ctaPrimary}
            </Link>
            <Link href={withLocale('/about', locale)} className="btn-ghost text-base" data-track="home_final_about_cta">
              {home.closing.ctaSecondary}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const locale = resolveLocale();
  const home = getMessages(locale).home;
  const guidedSections = [
    { id: 'home-hero', label: 'Hero' },
    { id: 'home-principle', label: 'Lotus Principle' },
    { id: 'home-quote', label: 'Quote' },
    { id: 'home-pillars', label: 'Six Pillars' },
    { id: 'home-stats', label: 'Evidence Snapshot' },
    { id: 'home-traditions', label: 'Traditions' },
    { id: 'home-research', label: 'Research' },
    { id: 'home-vow', label: 'The Vow' },
    { id: 'home-faq', label: 'Fast Answers' },
    { id: 'home-cta', label: 'Next Step' },
  ] as const;

  const faqItems = [
    { question: home.faq.q1, answer: home.principle.description },
    { question: home.faq.q2, answer: home.research.description },
    { question: home.faq.q3, answer: home.vow.description },
  ];

  const structuredData = buildJsonLdGraph([
    buildWebPageJsonLd({
      path: '/',
      title: siteName,
      description: home.hero.description,
      locale,
      primaryImage: buildPageUrl(defaultOgImage),
      breadcrumbs: [{ name: 'Home', path: '/' }],
    }),
    buildFAQPageJsonLd(faqItems),
    buildItemListJsonLd({
      name: 'Six pillars of conscious creation',
      items: home.pillars.items.map((item) => ({
        name: item.title,
        url: `${buildPageUrl('/', locale)}#home-pillars`,
      })),
    }),
  ]);

  return (
    <>
      <JsonLd data={structuredData} />
      <GuidedScrollNav sections={[...guidedSections]} contactHref={withLocale('/contact', locale)} />
      <HeroSection home={home} locale={locale} />
      <LotusPrinciple home={home} />
      <QuoteSection home={home} />
      <PillarsSection home={home} locale={locale} />
      <StatsSection home={home} />
      <TraditionsSection home={home} locale={locale} />
      <ResearchSection home={home} locale={locale} />
      <VowSection home={home} locale={locale} />
      <HomeFAQSection home={home} />
      <CTASection home={home} locale={locale} />
    </>
  );
}
