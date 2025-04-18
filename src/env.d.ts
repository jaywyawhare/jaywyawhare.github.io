/// <reference types="vite/client" />

interface GlobOptions {
  eager?: boolean;
  as?: string;
}

interface ImportMetaGlob {
  (pattern: string, options?: GlobOptions): Record<string, any>;
}

interface ImportMeta {
  glob: ImportMetaGlob;
}
