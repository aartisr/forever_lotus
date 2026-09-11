import React from 'react';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ContactLeadCaptureExperience from '@/components/ContactLeadCaptureExperience';
import { Mail, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Dialogue &amp; Partnership"
        title="Contact Forever Lotus"
        description="Engage with our research cadre, explore ethical institutional partnerships, or submit inquiries regarding conscious creation."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct channels */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <Mail className="w-6 h-6 text-lotus-gold mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-lotus-cream mb-1">Direct Inquiries</h3>
              <p className="text-xs text-lotus-muted mb-3">Institutional &amp; Academic</p>
              <a href="mailto:contact@foreverlotus.com" className="text-xs font-mono-code text-lotus-gold hover:underline">
                contact@foreverlotus.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <ShieldCheck className="w-6 h-6 text-lotus-gold mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-lotus-cream mb-1">Awaricon Audits</h3>
              <p className="text-xs text-lotus-muted mb-3">Verification &amp; Governance</p>
              <a href="mailto:audit@foreverlotus.com" className="text-xs font-mono-code text-lotus-gold hover:underline">
                audit@foreverlotus.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <Globe className="w-6 h-6 text-lotus-gold mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-lotus-cream mb-1">Open Repository</h3>
              <p className="text-xs text-lotus-muted mb-3">Public Code &amp; Data</p>
              <a
                href="https://github.com/aartisr/forever_lotus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-lotus-gold hover:underline"
              >
                github.com/aartisr/forever_lotus
              </a>
            </div>
          </div>

          {/* Interactive Secure Lead & Diligence Drawer */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-lotus-gold/25">
            <h2 className="font-serif font-bold text-2xl text-lotus-cream mb-2 text-center">
              Direct Diligence &amp; Partnership Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-lotus-muted text-center max-w-lg mx-auto mb-8">
              Open our verified diligence workflow to establish institutional alignment or request detailed whitepapers.
            </p>
            <ContactLeadCaptureExperience investorEmail="subasri@foreverlotus.com" />
          </div>
        </div>
      </section>

      <PageCta
        title="Grounding in the Framework"
        description="Review the complete 15-section manifesto authored by Subasri Dorairaj."
        links={[
          { href: '/manifesto', label: 'Read Manifesto', primary: true },
          { href: '/about', label: 'About the Founder' },
        ]}
      />
    </div>
  );
}
