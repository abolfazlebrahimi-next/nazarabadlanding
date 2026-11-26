import { LandingPage } from "@/components/landing/LandingPage";

/**
 * Structured data (JSON-LD) is injected into index.html at build time by
 * vite.config.ts, so it is present in the static HTML that crawlers and
 * social-preview bots read — not only after JavaScript runs.
 */
export default function App() {
  return <LandingPage />;
}
