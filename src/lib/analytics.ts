/**
 * Conversion-event hook point.
 *
 * No third-party analytics is installed, so this helper does two safe things:
 *  1. pushes the event onto `window.dataLayer` when a GTM-like layer exists,
 *  2. logs to the console in development for QA.
 * It never sends data anywhere on its own — privacy by default.
 */
type EventDetail = Record<string, unknown>;

const KNOWN_EVENTS = new Set([
  "hero_primary_cta_click",
  "hero_secondary_cta_click",
  "product_card_click",
  "store_partner_cta_click",
  "courier_partner_cta_click",
  "registration_form_submit",
  "registration_form_success",
  "faq_open",
  "nav_cta_click",
]);

export function trackEvent(name: string, detail?: EventDetail): void {
  if (typeof window === "undefined") return;

  const payload = { event: name, ...detail, ts: Date.now() };

  const dataLayer = (window as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(payload);

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${name}`, detail ?? {});
  }

  void KNOWN_EVENTS; // keep the allowed-event list documented in one place
}
