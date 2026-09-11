import type { CSSProperties, ReactNode, Key } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  key?: Key;
}

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }
    : undefined;

  return (
    <div className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

