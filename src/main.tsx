import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/globals.css";
import "./styles/tokens.css";
import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/cta.css";
import App from "./App";

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// When the prerendered HTML is present, hydrate it in place (no second copy
// of the content, no flash). Otherwise (e.g. `vite dev`) render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
