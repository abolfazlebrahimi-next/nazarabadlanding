/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional: base URL of the production PHP backend (no trailing slash). */
  readonly VITE_API_BASE_URL?: string;
  /** Optional: canonical public URL of the site, used in <head> metadata. */
  readonly VITE_SITE_URL?: string;
}
