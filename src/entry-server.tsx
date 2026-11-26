import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Build-time renderer used by scripts/prerender.mjs. It produces the same
 * markup the client hydrates, so the landing content exists in the static HTML.
 */
export function render(): string {
  return renderToString(<App />);
}
