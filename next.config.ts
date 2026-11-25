import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    /* modern formats first, webp fallback */
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      // legacy browsers still probe for /favicon.ico — serve the brand SVG
      { source: "/favicon.ico", destination: "/favicon.svg" },
    ];
  },
};

export default nextConfig;
