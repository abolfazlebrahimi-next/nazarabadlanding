import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/** Fills the canonical / og:url placeholders in index.html (Next.js used metadataBase). */
function siteUrlPlugin(siteUrl: string): Plugin {
  return {
    name: "nazarabad-site-url",
    transformIndexHtml(html) {
      return html.replaceAll("__SITE_URL__", siteUrl);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

  return {
    plugins: [react(), siteUrlPlugin(siteUrl)],
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
