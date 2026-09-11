import React from 'react';
import { navigateTo } from './next-navigation';

export function Link({ href, children, className, onClick, target, rel, ...rest }: any) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    if (target === '_blank' || (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:')))) {
      return;
    }

    if (href && typeof href === 'string') {
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      if (href.startsWith('/')) {
        e.preventDefault();
        navigateTo(href);
      }
    }
  };

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Link;

