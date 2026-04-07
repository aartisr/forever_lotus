'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface ScrollSection {
  id: string;
  label: string;
}

interface GuidedScrollNavProps {
  sections: ScrollSection[];
  contactHref?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function GuidedScrollNav({ sections, contactHref = '/contact' }: GuidedScrollNavProps) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeId),
    [sections, activeId],
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(ratio);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  };

  const nextSection = sections[Math.min(sections.length - 1, Math.max(0, activeIndex + 1))];
  const prevSection = sections[Math.max(0, activeIndex - 1)];

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-black/35" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-lotus-gold via-lotus-teal to-lotus-pink transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <aside className="fixed bottom-4 right-4 z-40 w-[min(300px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#090d1a]/92 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-lotus-gold/80">Reading Guide</p>
        <p className="mb-2 text-sm font-semibold text-lotus-cream">
          {activeIndex >= 0 ? sections[activeIndex]?.label : sections[0]?.label}
        </p>

        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => scrollToSection(prevSection.id)}
            disabled={activeIndex <= 0}
            className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-lotus-muted transition-colors hover:text-lotus-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(nextSection.id)}
            disabled={activeIndex >= sections.length - 1}
            className="rounded-lg border border-lotus-gold/35 bg-lotus-gold/15 px-2.5 py-1.5 text-xs font-semibold text-lotus-cream transition-colors hover:bg-lotus-gold/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(sections[0].id)}
            className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-lotus-muted transition-colors hover:text-lotus-cream"
          >
            Top
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2">
          <span className="text-[11px] text-lotus-muted">Need to talk now?</span>
          <Link href={contactHref} className="text-xs font-semibold text-lotus-gold hover:text-lotus-cream">
            Contact
          </Link>
        </div>
      </aside>
    </>
  );
}
