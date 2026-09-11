import React from 'react';

export function dynamic(importFn: () => Promise<any>, options?: any) {
  const LazyComponent = React.lazy(async () => {
    const mod = await importFn();
    if (mod && mod.default) {
      return mod;
    }
    return { default: mod };
  });

  return function DynamicWrapper(props: any) {
    const fallback = options?.loading ? (
      React.createElement(options.loading)
    ) : (
      <div className="p-4 text-center text-xs text-stone-500">Loading module...</div>
    );

    return (
      <React.Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}

export default dynamic;
