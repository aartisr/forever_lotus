import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { Shield, CheckCircle2, ArrowRight, Send, Globe, Mail, User, Info } from 'lucide-react';

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    contactName: '',
    contactEmail: '',
    mission: '',
    selfScore: '85',
    agreeNonExtractive: false,
    agreePrivacy: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Network Expansion"
        title="Onboard Your Website"
        description="Join an emerging global federation of purpose-driven digital presences committed to non-extractive value, transparency, and human agency."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="p-10 rounded-3xl bg-white/[0.02] border border-lotus-gold/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-lotus-teal/20 text-lotus-teal flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-black text-3xl text-lotus-cream">
                Application Received
              </h2>
              <p className="text-lotus-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Thank you for applying to onboard <span className="text-lotus-gold font-semibold">{formData.siteName || formData.siteUrl}</span>. Our review cadre evaluates submissions against the six pillars of the Forever Lotus Manifesto.
              </p>
              <div className="pt-6 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost text-xs !py-2.5 !px-6"
                >
                  Submit Another Site
                </button>
                <Link href="/ecosystem" className="btn-primary text-xs !py-2.5 !px-6">
                  Explore Ecosystem
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-8"
            >
              <div>
                <h2 className="font-serif font-bold text-2xl text-lotus-cream mb-2">
                  Application for Manifesto Alignment
                </h2>
                <p className="text-xs sm:text-sm text-lotus-muted">
                  Please provide details regarding your platform and design governance.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-code text-lotus-gold mb-2 uppercase">
                    Platform / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    placeholder="e.g. Rural Health Open Hub"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-lotus-gold mb-2 uppercase">
                    Live URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    placeholder="https://example.org"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-lotus-gold mb-2 uppercase">
                    Lead Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-lotus-gold mb-2 uppercase">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="name@domain.org"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-lotus-gold mb-2 uppercase">
                  Mission Statement &amp; Values Alignment *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  placeholder="Describe how your initiative embodies non-extractive value, privacy respect, accessibility, or human agency..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
                />
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeNonExtractive}
                    onChange={(e) => setFormData({ ...formData, agreeNonExtractive: e.target.checked })}
                    className="mt-1 accent-lotus-gold"
                  />
                  <span className="text-xs text-lotus-muted">
                    We certify that this web presence does not employ dark patterns, predatory monetization, or non-consensual biometric/personal data harvesting.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="mt-1 accent-lotus-gold"
                  />
                  <span className="text-xs text-lotus-muted">
                    We agree to adhere to the Forever Lotus operating commitments and display verifiable attribution.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary w-full !py-3.5 text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Onboarding Application</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <PageCta
        title="Diagnostic First"
        description="You can also scan your website directly using our real-time scanner."
        links={[
          { href: '/evaluate', label: 'Run Manifesto Evaluator', primary: true },
          { href: '/manifesto', label: 'Review Full Manifesto' },
        ]}
      />
    </div>
  );
}
