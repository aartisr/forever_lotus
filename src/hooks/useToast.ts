import { useState } from 'react';

export type ToastType = 'success' | 'error';

export interface ToastState {
  type: ToastType;
  message: string;
}

export function useToast(duration: number = 2600) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    window.setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, duration);
  };

  const clearToast = () => setToast(null);

  return { toast, showToast, clearToast };
}
