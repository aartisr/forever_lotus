'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LotusIcon from './LotusIcon';
import { getMessages, resolveLocale, supportedLocales, withLocale } from '@/i18n';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState(resolveLocale(undefined));
  const pathname = usePathname();
  const messages = getMessages(locale);

  const navLinks = [
    { href: '/manifesto', label: messages.nav.links.manifesto },
    { href: '/philosophy', label: messages.nav.links.philosophy },
    { href: '/research', label: messages.nav.links.research },
    { href: '/insights', label: locale === 'es' ? 'Ideas' : 'Insights' },
    { href: '/growth', label: locale === 'es' ? 'Crecimiento' : 'Growth' },
    { href: '/about', label: messages.nav.links.about },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLocale(resolveLocale(params.get('lang') ?? undefined));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-lotus-bg/90 backdrop-blur-md border-b border-lotus-border-soft shadow-[0_1px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={withLocale('/', locale)}
          className="flex items-center gap-2.5 group"
          aria-label={messages.nav.homeAria}
        >
          <LotusIcon size={32} variant="nav" className="transition-transform duration-700 group-hover:rotate-45" />
          <span className="font-serif text-lg font-bold tracking-wide text-lotus-cream">
            {messages.nav.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={withLocale(href, locale)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === href
                  ? 'text-lotus-gold bg-lotus-gold-dim'
                  : 'text-lotus-muted hover:text-lotus-cream hover:bg-lotus-border-soft'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href={withLocale('/manifesto', locale)}
            className="ml-3 btn-primary text-sm !py-2 !px-5"
            data-track="nav_manifesto_cta"
          >
            {messages.nav.cta}
          </Link>
          <div className="ml-3 hidden lg:flex items-center gap-2 rounded-full border border-lotus-border-soft px-3 py-1.5">
            <span className="text-lotus-muted text-xs tracking-wide uppercase">{messages.nav.languageLabel}</span>
            {supportedLocales.map((lang) => (
              <Link
                key={lang}
                href={withLocale(pathname || '/', lang)}
                className={`text-xs px-2 py-1 rounded-full transition-colors ${locale === lang ? 'bg-lotus-gold-dim text-lotus-gold' : 'text-lotus-muted hover:text-lotus-cream'}`}
              >
                {messages.nav.languages[lang]}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-lotus-border-soft transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        } bg-lotus-bg/95 backdrop-blur-xl border-b border-lotus-border-soft`}
      >
        <div className="px-5 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={withLocale(href, locale)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? 'text-lotus-gold bg-lotus-gold-dim'
                  : 'text-lotus-muted hover:text-lotus-cream hover:bg-lotus-border-soft'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link href={withLocale('/manifesto', locale)} className="mt-3 btn-primary justify-center text-sm">
            {messages.nav.cta}
          </Link>
          <div className="mt-3 rounded-xl border border-lotus-border-soft p-3">
            <p className="text-lotus-muted text-xs mb-2 uppercase tracking-wide">{messages.nav.languageLabel}</p>
            <div className="flex gap-2">
              {supportedLocales.map((lang) => (
                <Link
                  key={lang}
                  href={withLocale(pathname || '/', lang)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${locale === lang ? 'bg-lotus-gold-dim text-lotus-gold' : 'text-lotus-muted hover:text-lotus-cream hover:bg-lotus-border-soft'}`}
                >
                  {messages.nav.languages[lang]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
