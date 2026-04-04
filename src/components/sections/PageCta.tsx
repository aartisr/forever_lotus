import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface CtaLink {
  href: string;
  label: string;
  primary?: boolean;
}

interface PageCtaProps {
  title?: string;
  description?: string;
  quote?: string;
  eyebrow?: string;
  links: CtaLink[];
}

export default function PageCta({
  title,
  description,
  quote,
  eyebrow,
  links,
}: PageCtaProps) {
  return (
    <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          {quote ? (
            <p
              className="font-serif italic font-bold text-gold-shimmer mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
            >
              &ldquo;{quote}&rdquo;
            </p>
          ) : null}
          {title ? (
            <h2
              className="font-serif font-bold text-lotus-cream mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              {title}
            </h2>
          ) : null}
          {description ? <p className="text-lotus-muted mb-8 leading-relaxed">{description}</p> : null}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={link.primary ? 'btn-primary' : 'btn-ghost'}
              >
                {link.label}
                {link.primary ? ' →' : ''}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
