'use client';

import React from 'react';
import Link from 'next/link';
import LotusIcon from './LotusIcon';
import LogoMeaningPopover from './LogoMeaningPopover';
import { withLocale } from '@/i18n/core';
import { getChromeMessages } from '@/i18n/chromeMessages';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';

export default function Footer() {
  const locale = useResolvedLocale();

  const messages = getChromeMessages(locale);

  const links = [
    { label: messages.nav.links.manifesto, href: '/manifesto' },
    { label: messages.nav.links.philosophy, href: '/philosophy' },
    { label: messages.nav.links.research, href: '/research' },
    { label: messages.nav.links.insights, href: '/insights' },
    { label: messages.nav.groups.growth, href: '/growth' },
    { label: messages.nav.links.alignedWebsites, href: '/ecosystem' },
    { label: messages.nav.links.manifestoEvaluator, href: '/evaluate' },
    { label: messages.nav.links.onboardWebsite, href: '/onboarding-websites' },
    { label: messages.nav.links.about, href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-lotus-bg-2 border-t border-lotus-border-soft overflow-hidden" role="contentinfo">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lotus-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <Link href={withLocale('/', locale)} className="flex items-center gap-3 mb-4 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lotus-gold/30 bg-[rgba(255,214,107,0.08)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <LotusIcon size={34} variant="nav" />
              </span>
              <span className="font-serif text-lg font-bold tracking-[0.02em] text-lotus-cream">{messages.nav.brand}</span>
            </Link>
            <LogoMeaningPopover locale={locale} className="mb-4" align="left" />
            <p className="text-lotus-muted text-sm leading-relaxed">
              {messages.footer.description}
            </p>
            <p className="text-lotus-muted-2 text-xs leading-relaxed mt-3">
              {messages.footer.alignedNote}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">{messages.footer.navigate}</p>
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={withLocale(href, locale)}
                    className="text-lotus-muted hover:text-lotus-cream text-sm transition-colors duration-200"
                    data-track={`footer_${href.replace('/', '') || 'home'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-xs">
            <p className="eyebrow mb-4">{messages.footer.standard}</p>
            <blockquote className="font-serif text-lotus-cream/70 text-sm leading-relaxed italic border-l-2 border-lotus-gold/40 pl-4">
              &ldquo;{messages.footer.quote}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Divider */}
        <div className="lotus-divider mb-8">
          <LotusIcon size={20} variant="section" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-lotus-muted-2">
          <p>
            &copy; {new Date().getFullYear()} {messages.footer.rights}
          </p>
          <p className="font-serif italic text-lotus-gold/60 tracking-wide">
            {messages.footer.tagline}
          </p>
          <div className="flex flex-col sm:items-end gap-1">
            <p>
              {messages.footer.authorLabel}{' '}
              <span className="text-lotus-muted">{messages.footer.authorName}</span>
            </p>
            <Link
              href={withLocale('/awaricon/legal', locale)}
              className="text-lotus-muted hover:text-lotus-cream transition-colors duration-200"
              data-track="footer_awaricon_legal"
            >
              {messages.footer.legalPolicyLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
