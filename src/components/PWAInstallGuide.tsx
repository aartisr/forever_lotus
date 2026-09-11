import React, { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  X, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  ShieldCheck, 
  WifiOff, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import LotusIcon from './LotusIcon';

export const PWAInstallGuide: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isMobile, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [modalOpen, setModalOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // If already running in standalone mode, only show offline banner if disconnected
  if (isInstalled) {
    if (!isOnline) {
      return (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/90 text-black text-xs font-mono-code shadow-2xl backdrop-blur-md">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>Offline Sovereign Mode — Cached Knowledge Active</span>
        </div>
      );
    }
    return null;
  }

  const handleTrigger = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      {/* Offline Status Warning */}
      {!isOnline && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-black text-xs font-mono-code font-bold shadow-lg animate-bounce">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode — Using Local Precached Cache</span>
        </div>
      )}

      {/* Subtle Floating Install Indicator (Bottom Right) */}
      {!isBannerDismissed && (
        <div className="fixed bottom-5 right-5 z-40 animate-fade-in">
          <div className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#0d0f1a]/95 border border-lotus-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-lotus-gold transition-all duration-300">
            <button
              onClick={handleTrigger}
              className="flex items-center gap-2 text-xs font-mono-code text-lotus-cream hover:text-lotus-gold transition pl-1"
              title="Install Forever Lotus as a Sovereign Progressive Web App"
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-lotus-gold/15 text-lotus-gold border border-lotus-gold/30">
                <Download className="w-3 h-3 animate-bounce" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </span>
              <span className="font-semibold tracking-wide">Install App</span>
              <span className="hidden sm:inline text-[10px] text-lotus-muted bg-white/[0.06] px-1.5 py-0.5 rounded">PWA</span>
            </button>

            <button
              onClick={() => setIsBannerDismissed(true)}
              className="text-lotus-muted hover:text-white p-1 rounded-full transition ml-0.5"
              aria-label="Dismiss install indicator"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Guided Walkthrough Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-md rounded-2xl bg-[#0d0f1c] border border-lotus-gold/40 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-lotus-cream space-y-5 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-lotus-muted hover:text-white hover:bg-white/10 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-lotus-gold/10 border border-lotus-gold/30">
                <LotusIcon className="w-7 h-7 text-lotus-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-lotus-cream">
                  Install Forever Lotus
                </h3>
                <p className="text-xs font-mono-code text-lotus-gold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sovereign Progressive Web App</span>
                </p>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code bg-white/[0.03] p-3 rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Zero Tracking</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Offline Cached</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Standalone UI</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Instant Launch</span>
              </div>
            </div>

            {/* Platform-Specific Step-by-Step Instructions */}
            {isIOS ? (
              /* iOS Safari Walkthrough */
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-lotus-gold uppercase tracking-wider font-mono-code">
                  <Smartphone className="w-4 h-4 text-lotus-rose" />
                  <span>iOS Safari Installation Steps</span>
                </div>
                <ol className="space-y-2.5 text-xs text-lotus-cream/90 font-serif-body">
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <span className="w-5 h-5 rounded-full bg-lotus-gold/20 text-lotus-gold font-mono-code text-[11px] flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                    <div>
                      Tap the <strong className="text-white">Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-1 text-lotus-gold" /> at the bottom or top of your Safari toolbar.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <span className="w-5 h-5 rounded-full bg-lotus-gold/20 text-lotus-gold font-mono-code text-[11px] flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                    <div>
                      Scroll through the options and tap <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-emerald-400" />.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <span className="w-5 h-5 rounded-full bg-lotus-gold/20 text-lotus-gold font-mono-code text-[11px] flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                    <div>
                      Tap <strong className="text-white">Add</strong> in the top right corner. Forever Lotus will appear on your home screen with its sacred crest icon.
                    </div>
                  </li>
                </ol>
              </div>
            ) : isInstallable ? (
              /* Chromium / Native Prompt Flow */
              <div className="space-y-3 pt-1">
                <p className="text-xs text-lotus-muted leading-relaxed font-serif-body">
                  Your browser supports 1-click standalone installation. Click the button below to add Forever Lotus directly to your desktop or device launcher.
                </p>
                <button
                  onClick={async () => {
                    await install();
                    setModalOpen(false);
                  }}
                  className="btn-primary w-full !py-3 text-xs font-mono-code font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Confirm &amp; Install Standalone App</span>
                </button>
              </div>
            ) : (
              /* Desktop Chrome / Edge / Firefox / Brave Manual Guide */
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-lotus-gold uppercase tracking-wider font-mono-code">
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span>Desktop Browser Installation</span>
                </div>
                <div className="space-y-2 text-xs text-lotus-cream/90 font-serif-body">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-lotus-gold" />
                      <span>Address Bar Quick Install:</span>
                    </div>
                    <p className="text-lotus-muted text-[11px]">
                      Look for the <strong className="text-white">Install icon</strong> (a computer monitor with down-arrow or <code className="text-lotus-gold">⊕</code>) in the right side of your browser URL address bar.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <div className="font-semibold text-white">Browser Menu Alternative:</div>
                    <p className="text-lotus-muted text-[11px]">
                      Click the three-dot menu <code className="text-lotus-gold">⋮</code> &gt; <strong className="text-white">Save and share</strong> &gt; <strong className="text-white">Install Forever Lotus</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Notice */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-code text-lotus-muted">
              <span>Runs 100% Offline &amp; Ad-Free</span>
              <button
                onClick={() => setModalOpen(false)}
                className="hover:text-lotus-gold transition underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
