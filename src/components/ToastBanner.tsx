import React from 'react';
import { ToastState } from '@/hooks/useToast';

interface ToastBannerProps {
  toast: ToastState;
}

export default function ToastBanner({ toast }: ToastBannerProps) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        toast.type === 'success'
          ? 'text-emerald-200 border-emerald-400/30 bg-emerald-400/10'
          : 'text-red-200 border-red-400/30 bg-red-400/10'
      }`}
    >
      {toast.message}
    </div>
  );
}
