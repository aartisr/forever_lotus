import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import { ShieldCheck, Scale, FileText, AlertTriangle } from 'lucide-react';

export default function AwariconLegalPage() {
  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Governance &amp; Integrity"
        title="Awaricon Verification Policy"
        description="Official governance framework, trademark guidelines, audit specifications, and cryptographic trust terms for the Awaricon Proof-of-Presence standard."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1: Standard Definition */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 text-lotus-gold">
              <Scale className="w-5 h-5" />
              <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                1. Purpose &amp; Regulatory Standard
              </h2>
            </div>
            <p className="text-sm sm:text-base text-lotus-muted leading-relaxed">
              The Awaricon mark is a voluntary, non-commercial trust certification issued by Forever Lotus. Its purpose is to attest that an online entity, digital platform, or software artifact respects user dignity, minimizes non-consensual telemetry, and maintains transparency according to the Forever Lotus Manifesto.
            </p>
          </div>

          {/* Section 2: Mathematical Audit Integrity */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 text-lotus-gold">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                2. Audit Integrity &amp; Verification
              </h2>
            </div>
            <p className="text-sm sm:text-base text-lotus-muted leading-relaxed">
              Certification tiers (Platinum, Gold, Silver, Bronze) are assigned through mathematical evaluation under the Awaricon Dignity Metric. Tiers are subject to continuous re-verification. If an entity introduces predatory monetization, deceptive patterns, or unnotified tracking, the badge token will be revoked immediately via public DNS and on-chain ledger publication.
            </p>
          </div>

          {/* Section 3: Trademark & Badging Constraints */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 text-lotus-gold">
              <FileText className="w-5 h-5" />
              <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                3. Trademark &amp; Display Rules
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-lotus-muted leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-lotus-gold">•</span>
                <span>The Awaricon SVG badge must link directly to the official validation endpoint (<code className="text-lotus-gold">/awaricon/verify/[id]</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lotus-gold">•</span>
                <span>Entities may not alter the color, tier label, or vector geometry of the certified emblem.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lotus-gold">•</span>
                <span>The badge may not be used in connection with illicit, predatory, or misleading campaigns.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Revocation & Appeals */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 text-lotus-gold">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                4. Revocation &amp; Appeals Process
              </h2>
            </div>
            <p className="text-sm sm:text-base text-lotus-muted leading-relaxed">
              Any entity whose certification has been contested may request a peer re-audit by our cadre. Disputes are resolved via public evidence dossiers adhering to our transparent operating commitments.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        title="Explore the Trust Suite"
        description="Return to the interactive Awaricon suite, calculator, and badge generator."
        links={[
          { href: '/awaricon', label: 'Awaricon Trust Suite', primary: true },
          { href: '/manifesto', label: 'Read Manifesto' },
        ]}
      />
    </div>
  );
}
