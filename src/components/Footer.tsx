import React from 'react';
import Link from 'next/link';
import LotusIcon from './LotusIcon';

const links = [
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="relative bg-lotus-bg-2 border-t border-lotus-border-soft overflow-hidden" role="contentinfo">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lotus-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <LotusIcon size={30} variant="nav" />
              <span className="font-serif text-lg font-bold text-lotus-cream">Forever Lotus</span>
            </Link>
            <p className="text-lotus-muted text-sm leading-relaxed">
              A civilizational call to conscious creation — rooted in compassion, rising through dignity, untainted by domination.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-lotus-muted hover:text-lotus-cream text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-xs">
            <p className="eyebrow mb-4">The Standard</p>
            <blockquote className="font-serif text-lotus-cream/70 text-sm leading-relaxed italic border-l-2 border-lotus-gold/40 pl-4">
              &ldquo;Build as if humanity matters. Lead as if dignity is non-negotiable. Innovate as if future generations are already watching.&rdquo;
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
            &copy; {new Date().getFullYear()} Forever Lotus. All rights reserved.
          </p>
          <p className="font-serif italic text-lotus-gold/60 tracking-wide">
            Rooted. Rising. Untainted.
          </p>
          <div className="flex flex-col sm:items-end gap-1">
            <p>
              Author:{' '}
              <span className="text-lotus-muted">Subasri Dorairaj</span>
            </p>
            <a
              href="https://github.com/aartisr/forever_lotus"
              target="_blank"
              rel="noreferrer"
              className="text-lotus-gold/70 hover:text-lotus-gold transition-colors duration-200"
            >
              Public repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
