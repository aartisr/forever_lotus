import React from 'react';

export function Image({ src, alt, width, height, className, priority, unoptimized, ...rest }: any) {
  return (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
    />
  );
}

export default Image;
