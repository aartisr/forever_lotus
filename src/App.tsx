import React, { useEffect, Suspense, lazy } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { PWAInstallGuide } from './components/PWAInstallGuide';
import { AnalyticsProvider } from './components/AnalyticsProvider';

// Core Home Page (included directly for instant First Contentful Paint)
import HomePage from './pages/HomePage';

// Code-split all secondary pages so the initial homepage bundle is lean and fast
const ManifestoPage = lazy(() => import('./pages/ManifestoPage'));
const PhilosophyPage = lazy(() => import('./pages/PhilosophyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const BacklinksPage = lazy(() => import('./pages/BacklinksPage'));
const AwariconLegalPage = lazy(() => import('./pages/AwariconLegalPage'));
const StrategicAuditPage = lazy(() => import('./pages/StrategicAuditPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NobelCadreExperiencePage = lazy(() => import('./pages/NobelCadreExperiencePage'));
const ObservatoryPage = lazy(() => import('./pages/ObservatoryPage'));
const AccordPage = lazy(() => import('./pages/AccordPage'));

// Code-split heavy interactive tool views
const WebsiteEvaluatorView = lazy(() =>
  import('./components/WebsiteEvaluatorView').then((m) => ({ default: m.WebsiteEvaluatorView }))
);
const AwariconCompleteSuiteView = lazy(() =>
  import('./components/AwariconCompleteSuiteView').then((m) => ({ default: m.AwariconCompleteSuiteView }))
);
const AwariconAdminConsole = lazy(() => import('./components/AwariconAdminConsole'));
const SearchGrowthOpsView = lazy(() =>
  import('./components/SearchGrowthOpsView').then((m) => ({ default: m.SearchGrowthOpsView }))
);
import PageHero from './components/PageHero';
import PageCta from './components/sections/PageCta';

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="w-8 h-8 rounded-full border-2 border-lotus-gold/30 border-t-lotus-gold animate-spin" />
      <span className="text-xs font-mono-code tracking-widest text-lotus-muted uppercase">
        Loading Sovereign Portal...
      </span>
    </div>
  );
}

export default function App() {
  const pathname = usePathname() || '/';

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Route resolver
  const renderCurrentView = () => {
    // Normalize path by stripping trailing slash
    const path = pathname.replace(/\/$/, '') || '/';

    // 1. Home (instant, no lazy overhead)
    if (path === '' || path === '/') {
      return <HomePage />;
    }

    // 2. Manifesto
    if (path === '/manifesto') {
      return <ManifestoPage />;
    }

    // 3. Philosophy
    if (path === '/philosophy') {
      return <PhilosophyPage />;
    }

    // 4. Research Dossier
    if (path === '/research') {
      return <ResearchPage />;
    }

    // 5. About
    if (path === '/about') {
      return <AboutPage />;
    }

    // 6. Insights & Articles
    if (path.startsWith('/insights')) {
      const slug = path.replace('/insights/', '').replace('/insights', '');
      return <InsightsPage initialSlug={slug || undefined} />;
    }

    // 7. Aligned Websites Ecosystem
    if (path === '/ecosystem') {
      return <EcosystemPage />;
    }

    // 8. Onboard Websites
    if (path === '/onboard' || path === '/onboarding-websites') {
      return <OnboardingPage />;
    }

    // 9. Citation Kit & Backlinks
    if (path === '/backlinks') {
      return <BacklinksPage />;
    }

    // 10. Manifesto Evaluator
    if (path === '/evaluate') {
      return (
        <div className="bg-lotus-bg text-lotus-cream min-h-screen">
          <PageHero
            eyebrow="Diagnostic Standard"
            title="Manifesto Website Evaluator"
            description="Run a comprehensive diagnostic of any digital platform against the 6 pillars of conscious creation and calculate its alignment score."
            gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
          />
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lotus-border-soft">
            <WebsiteEvaluatorView />
          </section>
          <PageCta
            title="Integrate the Results"
            description="Explore our aligned ecosystem or onboard your platform today."
            links={[
              { href: '/onboarding-websites', label: 'Onboard Website', primary: true },
              { href: '/ecosystem', label: 'Explore Directory' },
            ]}
          />
        </div>
      );
    }

    // 11. Awaricon Complete Trust Suite
    if (path === '/awaricon') {
      return (
        <div className="bg-lotus-bg text-lotus-cream min-h-screen">
          <PageHero
            eyebrow="Mathematical Trust Architecture"
            title="Awaricon Proof-of-Presence Suite"
            description="The complete verification suite: dignity calculator, crystal/luxury/heraldic studio, SVG embed kit, and live validation lookup."
            gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
          />
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lotus-border-soft">
            <AwariconCompleteSuiteView />
          </section>
          <PageCta
            title="Governance &amp; Terms"
            description="Read the official verification policy and badging guidelines."
            links={[
              { href: '/awaricon/legal', label: 'Awaricon Legal Policy', primary: true },
              { href: '/manifesto', label: 'Read Manifesto' },
            ]}
          />
        </div>
      );
    }

    // 12. Awaricon Admin Console
    if (path === '/awaricon/admin') {
      return (
        <div className="bg-lotus-bg text-lotus-cream min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <AwariconAdminConsole />
        </div>
      );
    }

    // 13. Awaricon Legal Policy
    if (path === '/awaricon/legal') {
      return <AwariconLegalPage />;
    }

    // 14. Growth & Search Operations Dashboard
    if (path === '/growth') {
      return (
        <div className="bg-lotus-bg text-lotus-cream min-h-screen">
          <PageHero
            eyebrow="Operational Telemetry"
            title="Search Growth Operations"
            description="Real-time multi-engine indexing orchestration (Google, Bing, IndexNow, Yandex, Baidu), KPI tracking, and weekly editorial rituals."
            gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
          />
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lotus-border-soft">
            <SearchGrowthOpsView />
          </section>
          <PageCta
            title="Explore Published Writing"
            description="Inspect the 10 operational insight essays published for search discovery."
            links={[
              { href: '/insights', label: 'Explore Insights Library', primary: true },
              { href: '/manifesto', label: 'Read Manifesto' },
            ]}
          />
        </div>
      );
    }

    // 15. Nobel-Cadre Transformation Experience Platform
    if (path === '/nobel-cadre') {
      return <NobelCadreExperiencePage />;
    }

    // 16. Living Global Dignity Observatory & Open Telemetry
    if (path === '/observatory') {
      return <ObservatoryPage />;
    }

    // 17. Global Dignity Accord & Non-Extractive Charter
    if (path === '/accord') {
      return <AccordPage />;
    }

    // 18. Strategic Architecture Audit & Whitepaper
    if (path === '/audit') {
      return <StrategicAuditPage />;
    }

    // 19. Contact & Partnership
    if (path === '/contact') {
      return <ContactPage />;
    }

    // Fallback: Default to HomePage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-lotus-bg text-lotus-cream flex flex-col selection:bg-lotus-gold selection:text-black">
      {/* PostHog & Microsoft Clarity Telemetry Provider */}
      <AnalyticsProvider />

      {/* Universal Navigation Header */}
      <Navigation />

      {/* Primary Page Content */}
      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentView()}
        </Suspense>
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Subtle PWA Install Indicator & Guided Walkthrough */}
      <PWAInstallGuide />
    </div>
  );
}
