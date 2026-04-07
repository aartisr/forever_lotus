import type { Metadata } from 'next';
import Link from 'next/link';
import ContactCtaButtons from '@/components/ContactCtaButtons';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Invest In Creation With Responsibility | Forever Lotus';
const description =
  'A private invitation for aligned venture capitalists and long-horizon investors to support Forever Lotus and Awaricon: trust infrastructure for conscious creation.';

const investorEmail = 'investors@foreverlotus.com';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/contact', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/contact', 'en'),
    title,
    description,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultOgImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#05060c] px-5 pb-20 pt-32 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 76% 56% at 50% 0%, rgba(201,168,76,0.2) 0%, transparent 64%), radial-gradient(ellipse 52% 44% at 14% 90%, rgba(14,182,168,0.12) 0%, transparent 70%), radial-gradient(ellipse 46% 42% at 88% 80%, rgba(158,230,255,0.11) 0%, transparent 75%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-lotus-gold/80">
            Capital Invitation
          </p>
          <h1
            className="font-serif font-black text-lotus-cream"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5.1rem)', lineHeight: 1.04 }}
          >
            Invest In The Future Of
            <span className="block text-gold-shimmer">Creation With Responsibility</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-lotus-muted">
            Forever Lotus is building a trust-first civilization brand and Awaricon is its proof layer: a new
            standard for presence, dignity, and accountable digital participation. We invite investors who care about
            durable value, not extractive velocity.
          </p>

          <div className="mt-9">
            <ContactCtaButtons />
          </div>
        </div>
      </section>

      <section className="bg-lotus-bg px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Why This Moment',
              text: 'AI abundance has created a trust deficit. The next category winner is the organization that can prove responsibility at scale.',
            },
            {
              title: 'What We Are Building',
              text: 'Awaricon certification, verification interfaces, and governance-grade transparency systems that convert trust into compounding adoption.',
            },
            {
              title: 'Who We Seek',
              text: 'Venture capitalists, impact funds, family offices, and institutions aligned with dignity-first growth and long-horizon ethical returns.',
            },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="mb-3 font-serif text-2xl text-lotus-cream">{card.title}</h2>
              <p className="leading-relaxed text-lotus-muted">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#070914] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-lotus-gold/30 bg-gradient-to-br from-lotus-gold/10 via-transparent to-lotus-teal/10 p-8 sm:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lotus-gold/80">Contact</p>
          <h2 className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 900 }}>
            Let Us Build Responsible Scale Together
          </h2>
          <p className="mt-5 max-w-3xl text-lotus-muted leading-relaxed">
            Share your thesis, fund mandate, and strategic intent. We will respond with the most relevant next step:
            manifesto alignment conversation, diligence package, or founder strategy session.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ContactCtaButtons
              showSecondary={false}
              buttonClassName="inline-flex items-center justify-center rounded-full border border-lotus-gold/40 bg-lotus-gold/20 px-6 py-3 text-sm font-semibold text-lotus-cream transition-colors hover:bg-lotus-gold/30"
            />
            <Link href="/manifesto" className="text-sm font-semibold text-lotus-gold hover:text-lotus-cream">
              Revisit the Manifesto →
            </Link>
          </div>

          <p className="mt-4 text-xs text-lotus-muted">Primary inbox: {investorEmail}</p>
        </div>
      </section>
    </>
  );
}
