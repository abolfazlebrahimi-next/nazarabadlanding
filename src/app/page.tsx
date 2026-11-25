import { LandingPage } from "@/components/landing/LandingPage";
import { FAQ_ITEMS, FOOTER } from "@/data/content";

/**
 * Structured data built ONLY from real business information already
 * published on this page (FAQ answers, contact channels). No ratings,
 * reviews, addresses or opening hours are fabricated.
 */
function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "نظرآباد شاپ",
      description:
        "نظرآباد شاپ، بازار آنلاین خرید محلی نظرآباد است: سفارش آنلاین از فروشگاه‌های شهر ثبت می‌کنید، فروشگاه سفارش را آماده می‌کند و پیک آن را درب منزل تحویل می‌دهد.",
      email: FOOTER.contactEmail,
      contactPoint: FOOTER.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone.tel,
        contactType: "customer service",
        areaServed: "IR",
        availableLanguage: "Persian",
      })),
      sameAs: [
        "https://instagram.com/nazarabadshop_ir",
        "https://t.me/nazarabadshop_ir",
        "https://ble.ir/nazarabadshop_ir",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <LandingPage />
    </>
  );
}
