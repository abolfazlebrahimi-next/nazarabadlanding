import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { FAQ_ITEMS, FOOTER } from "./src/data/content";

const SITE_NAME = "نظرآباد شاپ";
const SITE_DESCRIPTION =
  "با نظرآباد شاپ از سوپرمارکت‌ها و فروشگاه‌های محلی نظرآباد آنلاین خرید کنید. سفارش خود را ثبت کنید و محصولات موردنیازتان را درب منزل تحویل بگیرید.";
const SITE_TITLE = "نظرآباد شاپ | خرید آنلاین از سوپرمارکت‌های نظرآباد";

/**
 * JSON-LD built from real data only: no ratings, reviews, physical address
 * or opening hours are invented. Nazarabad Shop is an online local marketplace,
 * so it is modelled as an Organization/WebSite, not as a single store.
 * FAQPage lists exactly the questions visible on the page.
 */
function buildStructuredData(siteUrl: string) {
  const base = `${siteUrl}/`;
  const orgId = `${base}#organization`;
  const websiteId = `${base}#website`;
  const image = `${siteUrl}/og/og-cover.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: base,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/brand/logo.png`,
          width: 512,
          height: 322,
        },
        image,
        description: SITE_DESCRIPTION,
        email: FOOTER.contactEmail,
        contactPoint: FOOTER.phones.map((phone) => ({
          "@type": "ContactPoint",
          telephone: phone.tel,
          contactType: "customer service",
          areaServed: "IR",
          availableLanguage: "Persian",
        })),
        areaServed: { "@type": "City", name: "نظرآباد" },
        sameAs: [
          "https://instagram.com/nazarabadshop_ir",
          "https://t.me/nazarabadshop_ir",
          "https://ble.ir/nazarabadshop_ir",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: base,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "fa-IR",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${base}#webpage`,
        url: base,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "fa-IR",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      },
      {
        "@type": "FAQPage",
        "@id": `${base}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/**
 * Build-time HTML fixes for index.html:
 *  - __SITE_URL__ → canonical/og/twitter absolute URLs (VITE_SITE_URL)
 *  - <!--STRUCTURED_DATA--> → JSON-LD script
 */
function seoPlugin(siteUrl: string): Plugin {
  return {
    name: "nazarabad-seo-html",
    transformIndexHtml(html) {
      const jsonLd = JSON.stringify(buildStructuredData(siteUrl)).replace(/</g, "\\u003c");
      return html
        .replaceAll("__SITE_URL__", siteUrl)
        .replace(
          "<!--STRUCTURED_DATA-->",
          `<script type="application/ld+json">${jsonLd}</script>`,
        );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

  return {
    plugins: [react(), seoPlugin(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
      proxy: {
        // Dev only: forward /api/* to the live PHP backend (same-origin from the browser).
        "/api": {
          target: "https://nazarabadshop.ir",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
    },
  };
});
