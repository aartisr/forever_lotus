'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LotusIcon from './LotusIcon';

const navLinks = [
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Forever Lotus – Home"
        >
          <LotusIcon size={32} variant="nav" className="transition-transform duration-700 group-hover:rotate-45" />
          <span className="font-serif text-lg font-bold tracking-wide text-lotus-cream">
            Forever Lotus
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
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
            href="/manifesto"
            className="ml-3 btn-primary text-sm !py-2 !px-5"
          >
            Read Manifesto
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-lotus-border-soft transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
              href={href}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? 'text-lotus-gold bg-lotus-gold-dim'
                  : 'text-lotus-muted hover:text-lotus-cream hover:bg-lotus-border-soft'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link href="/manifesto" className="mt-3 btn-primary justify-center text-sm">
            Read Manifesto
          </Link>
        </div>
      </div>
    </header>
  );
}
