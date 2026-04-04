import React from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  gradient: string;
  titleSize?: string;
  /** Extra bottom padding class, e.g. "pb-20". Defaults to "pb-16". */
  paddingBottom?: string;
  /** Content rendered after the description (e.g. a divider or icon). */
  children?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  gradient,
  titleSize = 'clamp(2.2rem, 6vw, 4.5rem)',
  paddingBottom = 'pb-16',
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative pt-32 ${paddingBottom} px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: gradient }}
      />
      <div className="relative max-w-3xl mx-auto">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-serif font-black text-lotus-cream mb-5" style={{ fontSize: titleSize }}>
          {title}
        </h1>
        <p className="text-lotus-muted text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
        {children}
      </div>
    </section>
  );
}
