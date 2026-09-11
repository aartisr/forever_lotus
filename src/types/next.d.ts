declare module 'next' {
  export type Metadata = Record<string, any>;
  export type Viewport = Record<string, any>;
  export type ResolvingMetadata = Promise<Metadata>;
  export namespace MetadataRoute {
    export type Robots = any;
    export type Sitemap = any;
    export type Manifest = any;
  }
}

declare module 'next/link' {
  import type { AnchorHTMLAttributes, FC } from 'react';
  const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; [key: string]: any }>;
  export default Link;
}

declare module 'next/image' {
  import type { ImgHTMLAttributes, FC } from 'react';
  const Image: FC<ImgHTMLAttributes<HTMLImageElement> & { src: string | any; alt?: string; [key: string]: any }>;
  export default Image;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): { push: (url: string) => void; replace: (url: string) => void; [key: string]: any };
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/dynamic' {
  import type { ComponentType } from 'react';
  export default function dynamic<T = any>(fn: () => Promise<any>, options?: any): ComponentType<T>;
}

declare module 'next/script' {
  import type { ScriptHTMLAttributes, FC } from 'react';
  const Script: FC<ScriptHTMLAttributes<HTMLScriptElement> & { [key: string]: any }>;
  export default Script;
}

declare module 'next/server' {
  export class NextResponse {
    static json<T = any>(data: T, init?: any): any;
  }
  export type NextRequest = any;
}
