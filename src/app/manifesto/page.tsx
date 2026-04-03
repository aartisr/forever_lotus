import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'The Forever Lotus Manifesto — a 15-section civilizational framework for conscious creation, rooted in compassion, dignity, and Eastern wisdom.',
};

const sections = [
  {
    num: 'I',
    title: 'The Meaning of Forever Lotus',
    body: 'Forever Lotus is not a trend, a campaign, or a brand exercise. It is a civilizational stance. It begins with a simple but radical proposition: creation can be kind. Human progress does not have to depend on extraction, humiliation, or spiritual numbness. Like the lotus rising untainted from murky waters, Forever Lotus stands for the possibility that humanity can evolve without abandoning compassion. This is not naive. It is disciplined hope.',
  },
  {
    num: 'II',
    title: 'The Lotus Across Civilization',
    body: 'Across Hindu, Buddhist, Egyptian, and wider Eastern philosophical traditions, the lotus symbolizes purity, resilience, awakening, and transcendence through conditions rather than escape from them. Its biological pattern is also its philosophy: rooted in darkness, fed by challenge, rising toward light, and remaining unstained. Forever Lotus adopts the lotus not as ornament, but as operating principle.',
  },
  {
    num: 'III',
    title: 'Brahma and Conscious Creation',
    body: 'In Hindu cosmology, Brahma emerges from the lotus as the principle of creation. This symbolism is clear: creation is not domination, it is responsibility. Forever Lotus applies this metaphysical frame to modern life. Every system we design, every institution we build, and every decision we normalize becomes an act of creation. We either shape futures of harmony, dignity, and continuity, or futures of fracture. Neutrality is an illusion. Creation is always moral.',
  },
  {
    num: 'IV',
    title: 'Kindness Without Expectation',
    body: 'True kindness is not transactional. It does not demand applause, leverage, status, or return. Forever Lotus rejects performative morality and reward-seeking compassion. Giving is not moral currency. It is alignment with life. The test is simple: if compassion is conditional on recognition, it is strategy, not kindness.',
  },
  {
    num: 'V',
    title: 'Earth Consciousness',
    body: 'The lotus survives because it belongs to an ecosystem. Forever Lotus applies the same law to civilization. Earth consciousness is not ideology. It is gratitude made practical. Stewardship is not optional virtue. It is the minimum expression of respect for the medium that makes all life, learning, and culture possible.',
  },
  {
    num: 'VI',
    title: 'Humanitarian Dignity',
    body: 'Humanitarian work must restore dignity, not manufacture dependency. Forever Lotus supports aid models that educate, empower, and protect autonomy. Relief without respect can become control. Assistance without agency can become erosion. Dignity is not a side value. It is the center.',
  },
  {
    num: 'VII',
    title: 'Education as Liberation',
    body: "Education is humanity's most sacred inheritance: the transfer of awareness, skill, discernment, and ethical memory across generations. Forever Lotus treats education not as credential accumulation, but as liberation from ignorance, fear, and inherited helplessness. Knowledge must produce agency.",
  },
  {
    num: 'VIII',
    title: 'Peace and Inner Harmony',
    body: 'Peace does not begin at negotiation tables. It begins in the human nervous system: restraint, clarity, emotional regulation, and responsibility. Like the lotus rooted below and blooming above, Forever Lotus unites inner coherence with outer action. There is no durable social peace without interior maturity.',
  },
  {
    num: 'IX',
    title: 'A Brand That Serves Humanity',
    body: 'Forever Lotus is a brand in form, but a vow in substance. Its vow is explicit: reduce suffering, elevate dignity, and reject domination. Any strategy, institution, product, or narrative that fails this test does not belong within Forever Lotus.',
  },
  {
    num: 'X',
    title: 'An Invitation to Co-Create',
    body: 'Forever Lotus is not a closed doctrine. It is an invitation. An invitation to create balance instead of excess, peace instead of power theater, and shared futures instead of isolated gain. Where even one person chooses compassion with courage, the lotus blooms again.',
  },
  {
    num: 'XI',
    title: 'Strategic Positioning and Global Credibility',
    body: 'Forever Lotus occupies an uncommon position among global frameworks: not bureaucratic, not dogmatic, not abstract, not merely activist. It integrates humanitarian action, ecological reverence, peacebuilding, education, and ancient wisdom into one coherent moral architecture. This coherence enables broad collaboration without dilution and independent standing without antagonism.',
  },
  {
    num: 'XII',
    title: 'Public Credibility and Moral Lineage',
    body: "Forever Lotus draws from humanity's shared inheritance: lotus symbolism across civilizations, Brahma as conscious creation, and durable ethics reflected in humanitarian, environmental, peace, and educational institutions. Forever Lotus claims no monopoly on truth and no inherited authority over others. It claims responsibility. Responsibility to act with humility, kindness, rigor, and long-range care for life.",
  },
  {
    num: 'XIII',
    title: "Founder's White Paper Position",
    body: 'Humanity holds unprecedented power and unprecedented fragility at the same time. The lotus teaches that creation must rise from stillness, restraint, and clarity. Forever Lotus exists to re-anchor creation in responsibility, so that intelligence, technology, and wealth are directed toward harmony rather than domination. Progress without moral architecture is instability accelerated.',
  },
  {
    num: 'XIV',
    title: 'Stewardship and Continuity',
    body: 'This framework is intended to guide, not conclude. Forever Lotus must remain protected from two persistent risks: the commercialization of compassion, and dilution of purpose. Its long-term strength depends on humility, coherence, and fidelity to the lotus principle: rooted, rising, and untainted.',
  },
  {
    num: 'XV',
    title: 'Operating Commitments — The Action Layer',
    body: 'Kindness must be operational, not rhetorical. To keep this vision real, Forever Lotus commits to six binding standards: publishing annual dignity and impact metrics (not vanity metrics); tying all initiatives to measurable suffering reduction and capability growth; maintaining a clear firewall between service and self-promotion; building learning systems that are open, multilingual, and culturally grounded; prioritizing partnerships that strengthen local agency; and refusing projects that require extractive trade-offs.',
    isLast: true,
  },
];

export default function ManifestoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">The Framework</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            The Manifesto
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            Fifteen sections. A complete civilizational framework for conscious
            creation — rooted in Eastern wisdom and disciplined hope.
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* Manifesto sections — light editorial background */}
      <section className="bg-[#f5f0e8] text-[#1a1612]" aria-label="Manifesto sections">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
          {sections.map(({ num, title, body, isLast }) => (
            <ScrollReveal key={num}>
              <article
                className={`py-12 ${!isLast ? 'border-b border-[rgba(26,22,18,0.10)]' : ''}`}
                aria-labelledby={`section-${num}`}
              >
                <div className="flex items-start gap-5">
                  {/* Roman numeral */}
                  <span
                    className="font-serif text-[#c9a84c] font-black shrink-0 mt-1 select-none"
                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
                    aria-hidden="true"
                  >
                    {num}.
                  </span>

                  <div>
                    <h2
                      id={`section-${num}`}
                      className="font-serif font-bold text-[#1a1612] mb-4"
                      style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}
                    >
                      {title}
                    </h2>
                    <p className="text-[#4a4640] leading-relaxed text-base sm:text-[1.05rem]">
                      {body}
                    </p>
                  </div>
                </div>

                {isLast && (
                  <div className="mt-10 pt-10 border-t border-[rgba(26,22,18,0.12)] text-center">
                    <p className="font-serif italic text-2xl text-[#c9a84c] font-semibold">
                      &ldquo;Rooted. Rising. Untainted.&rdquo;
                    </p>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-4">Continue Exploring</p>
            <h2
              className="font-serif font-bold text-lotus-cream mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
            >
              The Philosophy Behind the Manifesto
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/philosophy" className="btn-primary">
                Eastern Philosophy →
              </Link>
              <Link href="/research" className="btn-ghost">
                Research Dossier
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
