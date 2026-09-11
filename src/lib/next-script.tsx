import React, { useEffect } from 'react';

export function Script({ src, strategy, onLoad, children, ...rest }: any) {
  useEffect(() => {
    if (src) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      if (onLoad) {
        script.onload = onLoad;
      }
      document.body.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [src, onLoad]);

  if (children && typeof children === 'string') {
    return <script dangerouslySetInnerHTML={{ __html: children }} {...rest} />;
  }

  return null;
}

export default Script;
