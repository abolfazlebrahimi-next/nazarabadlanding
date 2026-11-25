import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/tokens.css";
import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/cta.css";

/**
 * Canonical URL: set NEXT_PUBLIC_SITE_URL to the real domain in production.
 * Until then it falls back to localhost, keeping metadata valid and honest.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "نظرآباد شاپ | خرید روزانه از فروشگاه‌های شهر، تا درِ خانه شما",
    template: "%s | نظرآباد شاپ",
  },
  description:
    "نظرآباد شاپ، بازار آنلاین خرید محلی نظرآباد است: سفارش آنلاین از فروشگاه‌های شهر ثبت می‌کنید، فروشگاه سفارش را آماده می‌کند و پیک آن را درب منزل تحویل می‌دهد.",
  keywords: [
    "نظرآباد شاپ",
    "خرید آنلاین نظرآباد",
    "سوپرمارکت آنلاین",
    "فروشگاه اینترنتی نظرآباد",
    "پیک موتوری نظرآباد",
  ],
  applicationName: "نظرآباد شاپ",
  authors: [{ name: "نظرآباد شاپ" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "نظرآباد شاپ | بازار آنلاین شهر",
    description:
      "خرید روزانه از فروشگاه‌های نظرآباد، تا درِ خانه شما. سفارش آنلاین، آماده‌سازی توسط فروشگاه، تحویل با پیک.",
    url: "/",
    siteName: "نظرآباد شاپ",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نظرآباد شاپ | بازار آنلاین شهر",
    description:
      "خرید روزانه از فروشگاه‌های نظرآباد، تا درِ خانه شما.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#064E45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* self-hosted Persian fonts — preload the brand weights above the fold */}
        <link
          rel="preload"
          href="/fonts/Shoor-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Shoor-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ShoorRounded-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
