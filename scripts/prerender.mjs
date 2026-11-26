/**
 * Post-build step (run by `npm run build`):
 *  1. Renders the landing page to static HTML with the SSR bundle in .prerender/
 *     and injects it into dist/index.html (so content is in the first HTML response).
 *  2. Generates dist/sitemap.xml. <lastmod> is the date of the last commit that
 *     changed the page content (git), and is omitted when git history is unavailable.
 */
import { execFileSync } from "node:child_process";
import { readFile, writeFile, rename, access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadEnv } from "vite";

const root = process.cwd();
const distIndex = path.join(root, "dist", "index.html");
const ssrJs = path.join(root, ".prerender", "entry-server.js");
const ssrMjs = path.join(root, ".prerender", "entry-server.mjs");

// ── 1. Prerender ─────────────────────────────────────────────────────────────
// Vite may emit .js or .mjs depending on the version; normalise to .mjs for ESM import.
try {
  await access(ssrJs);
  await rename(ssrJs, ssrMjs);
} catch {
  // already .mjs
}
const { render } = await import(pathToFileURL(ssrMjs).href);
const markup = render();
if (!markup || markup.length < 1000) throw new Error("prerender produced almost no markup");

const EMPTY_ROOT = '<div id="root"></div>';
let html = await readFile(distIndex, "utf8");
if (!html.includes(EMPTY_ROOT)) throw new Error("index.html has no empty #root placeholder");
html = html.replace(EMPTY_ROOT, `<div id="root">${markup}</div>`);
if (html.includes("__SITE_URL__")) throw new Error("unreplaced __SITE_URL__ placeholder");
await writeFile(distIndex, html, "utf8");
console.log(`[prerender] injected ${markup.length} chars into dist/index.html`);

// ── 2. Sitemap ───────────────────────────────────────────────────────────────
const env = loadEnv("production", root, "");
const siteUrl = (env.VITE_SITE_URL || "https://nazarabadshop.ir").replace(/\/+$/, "");

/** Last commit date (YYYY-MM-DD) touching the page content, or null. */
function lastContentChange() {
  const paths = ["index.html", "src/components/landing", "src/data/content.ts", "public/og"];
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const lastmod = lastContentChange();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>
</urlset>
`;
await writeFile(path.join(root, "dist", "sitemap.xml"), sitemap, "utf8");
console.log(`[sitemap] ${siteUrl}/ lastmod=${lastmod ?? "(git unavailable: omitted)"}`);

// Sanity: the generated file must exist.
await access(path.join(root, "dist", "sitemap.xml"));
