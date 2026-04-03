'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LotusIcon from './LotusIcon';
import { getMessages, resolveLocale, withLocale } from '@/i18n';

export default function Footer() {
  const [locale, setLocale] = useState(resolveLocale(undefined));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLocale(resolveLocale(params.get('lang') ?? undefined));
  }, []);

  const messages = getMessages(locale);

  const links = [
    { label: messages.nav.links.manifesto, href: '/manifesto' },
    { label: messages.nav.links.philosophy, href: '/philosophy' },
    { label: messages.nav.links.research, href: '/research' },
    { label: locale === 'es' ? 'Ideas' : 'Insights', href: '/insights' },
    { label: locale === 'es' ? 'Crecimiento' : 'Growth', href: '/growth' },
    { label: locale === 'es' ? 'Sitios aliados' : 'Aligned Websites', href: '/ecosystem' },
    { label: locale === 'es' ? 'Onboarding de sitios' : 'Onboard Website', href: '/onboarding-websites' },
    { label: messages.nav.links.about, href: '/about' },
  ];

  return (
    <footer className="relative bg-lotus-bg-2 border-t border-lotus-border-soft overflow-hidden" role="contentinfo">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lotus-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <Link href={withLocale('/', locale)} className="flex items-center gap-2.5 mb-4 group">
              <LotusIcon size={30} variant="nav" />
              <span className="font-serif text-lg font-bold text-lotus-cream">{messages.nav.brand}</span>
            </Link>
            <p className="text-lotus-muted text-sm leading-relaxed">
              {messages.footer.description}
            </p>
            <p className="text-lotus-muted-2 text-xs leading-relaxed mt-3">
              {locale === 'es'
                ? 'Tambien destacamos y promovemos sitios web alineados con el Manifiesto Forever Lotus.'
                : 'We also highlight and promote websites aligned with the Forever Lotus Manifesto.'}
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
            <a
              href="https://github.com/aartisr/forever_lotus"
              target="_blank"
              rel="noreferrer"
              className="text-lotus-gold/70 hover:text-lotus-gold transition-colors duration-200"
              data-track="footer_repository_click"
            >
              {messages.footer.repositoryLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
