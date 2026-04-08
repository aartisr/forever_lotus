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

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

const GUIDE_VISIBILITY_KEY = 'forever-lotus-reading-guide-visible';

export default function GuidedScrollNav({ sections, contactHref = '/contact' }: GuidedScrollNavProps) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [isMobileGuideOpen, setIsMobileGuideOpen] = useState(false);
  const [isGuideVisible, setIsGuideVisible] = useState(true);

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeId),
    [sections, activeId],
  );

  useEffect(() => {
    let rafId = 0;

    const runScrollWork = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(ratio);

      const anchor = scrollTop + window.innerHeight * 0.32;
      let closestId = sections[0]?.id ?? '';
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const node = document.getElementById(section.id);
        if (!node) return;
        const distance = Math.abs(node.offsetTop - anchor);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = section.id;
        }
      });

      if (closestId) {
        setActiveId((current) => (current === closestId ? current : closestId));
      }

      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(runScrollWork);
    };

    runScrollWork();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sections]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(GUIDE_VISIBILITY_KEY);
    if (stored === '0') {
      setIsGuideVisible(false);
      return;
    }
    setIsGuideVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(GUIDE_VISIBILITY_KEY, isGuideVisible ? '1' : '0');
  }, [isGuideVisible]);

  const scrollToSection = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  };

  const nextSection = sections[Math.min(sections.length - 1, Math.max(0, activeIndex + 1))];
  const prevSection = sections[Math.max(0, activeIndex - 1)];
  const panelVisibilityClass = !isGuideVisible
    ? 'hidden'
    : isMobileGuideOpen
      ? 'bottom-16 block md:bottom-4 md:block'
      : 'hidden md:bottom-4 md:block';

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-black/35" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-lotus-gold via-lotus-teal to-lotus-pink transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          if (!isGuideVisible) {
            setIsGuideVisible(true);
            setIsMobileGuideOpen(true);
            return;
          }
          setIsMobileGuideOpen((open) => !open);
        }}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-lotus-gold/35 bg-[#090d1a]/90 px-3 py-2 text-xs font-semibold text-lotus-cream shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-sm md:hidden"
        aria-controls="reading-guide-panel"
      >
        {!isGuideVisible || !isMobileGuideOpen ? 'Reading Guide' : 'Hide Guide'}
      </button>

      <button
        type="button"
        onClick={() => setIsGuideVisible(true)}
        className={`fixed bottom-4 right-4 z-40 hidden rounded-full border border-lotus-gold/35 bg-[#090d1a]/90 px-3 py-2 text-xs font-semibold text-lotus-cream shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-sm md:block ${
          isGuideVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        Reading Guide
      </button>

      <aside
        id="reading-guide-panel"
        className={`fixed right-4 z-40 w-[min(300px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#090d1a]/92 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
          panelVisibilityClass
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.16em] text-lotus-gold/80">Reading Guide</p>
          <button
            type="button"
            onClick={() => {
              setIsGuideVisible(false);
              setIsMobileGuideOpen(false);
            }}
            className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-lotus-muted transition-colors hover:text-lotus-cream"
          >
            Close
          </button>
        </div>
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
            onClick={() => {
              scrollToSection(nextSection.id);
              if (isMobileViewport()) {
                setIsMobileGuideOpen(false);
              }
            }}
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
