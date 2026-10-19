import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { LANGS, PAGES, PATHS } from "./src/lib/routes.js";
import { headFor, absolute } from "./src/seo/meta.js";

// ── Pàgines estàtiques ────────────────────────────────────────────
// Després del build, escriu un HTML per a cada pàgina i idioma amb el seu
// <html lang> i el seu bloc SEO, perquè els cercadors i les xarxes socials
// els llegeixin sense executar JavaScript. També genera 404.html i el
// sitemap amb les alternatives d'idioma.
function staticPages() {
  let outDir = "dist";
  const SEO_BLOCK = /( *)<!-- seo:start[\s\S]*?<!-- seo:end -->/;

  const fileFor = (urlPath) =>
    urlPath.endsWith("/") ? `${urlPath}index.html` : `${urlPath}.html`;

  const render = (template, page, lang) =>
    template
      .replace(/<html lang="[a-z]+">/, `<html lang="${lang}">`)
      .replace(SEO_BLOCK, `    <!-- seo:start -->\n${headFor(page, lang)}\n    <!-- seo:end -->`);

  return {
    name: "static-pages",
    apply: "build",
    configResolved(config) { outDir = config.build.outDir; },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      if (!SEO_BLOCK.test(template)) throw new Error("static-pages: falta el bloc <!-- seo:start --> a index.html");

      for (const lang of LANGS) {
        for (const page of PAGES) {
          const file = path.join(outDir, fileFor(PATHS[lang][page]));
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, render(template, page, lang));
        }
      }
      fs.writeFileSync(path.join(outDir, "404.html"), render(template, "notfound", "ca"));

      const urls = PAGES.flatMap(page => LANGS.map(lang => {
        const alternates = LANGS
          .map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(PATHS[l][page])}" />`)
          .join("\n");
        return [
          "  <url>",
          `    <loc>${absolute(PATHS[lang][page])}</loc>`,
          alternates,
          `    <changefreq>${page === "home" ? "monthly" : "yearly"}</changefreq>`,
          `    <priority>${page === "home" ? "1.0" : "0.3"}</priority>`,
          "  </url>",
        ].join("\n");
      }));
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urls,
        "</urlset>",
        "",
      ].join("\n"));
    },
  };
}

export default defineConfig({
  plugins: [react(), staticPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    allowedHosts: [
      "unmaterial-tanner-overeducatively.ngrok-free.dev",
    ],
  },
});
