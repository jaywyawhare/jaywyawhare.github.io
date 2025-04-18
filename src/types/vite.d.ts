/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add env variables if needed
}

interface ImportMeta {
  readonly glob: <T = any>(
    pattern: string,
    options?: {
      eager?: boolean;
      as?: string;
    }
  ) => Record<string, T>;
}
