// ── Prerender ─────────────────────────────────────────────────────
// Després de `vite build` (client) i `vite build --ssr` (servidor):
// escriu un HTML estàtic per a cada pàgina i idioma, amb el contingut
// renderitzat dins de #root, el seu <html lang> i el seu bloc SEO.
// També genera 404.html i el sitemap amb les alternatives d'idioma.

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { LANGS, PAGES, PATHS } from "../src/lib/routes.js"
import { headFor, absolute } from "../src/seo/meta.js"

const OUT = "dist"
const SSR = "dist-ssr"
const SEO_BLOCK = /( *)<!-- seo:start[\s\S]*?<!-- seo:end -->/
const ROOT = '<div id="root"></div>'

const { render } = await import(pathToFileURL(path.resolve(SSR, "entry-server.js")).href)
const template = fs.readFileSync(path.join(OUT, "index.html"), "utf8")
if (!SEO_BLOCK.test(template)) throw new Error("prerender: falta el bloc <!-- seo:start --> a index.html")
if (!template.includes(ROOT)) throw new Error(`prerender: falta ${ROOT} a index.html`)

const fileFor = (urlPath) => (urlPath.endsWith("/") ? `${urlPath}index.html` : `${urlPath}.html`)

async function page(pageId, lang) {
  const body = await render(pageId, lang)
  return template
    .replace(/<html lang="[a-z]+">/, `<html lang="${lang}">`)
    .replace(SEO_BLOCK, `    <!-- seo:start -->\n${headFor(pageId, lang)}\n    <!-- seo:end -->`)
    .replace(ROOT, `<div id="root">${body}</div>`)
}

for (const lang of LANGS) {
  for (const pageId of PAGES) {
    const file = path.join(OUT, fileFor(PATHS[lang][pageId]))
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, await page(pageId, lang))
    console.log(`prerender: ${PATHS[lang][pageId]}`)
  }
}
fs.writeFileSync(path.join(OUT, "404.html"), await page("notfound", "ca"))

const urls = PAGES.flatMap((pageId) => LANGS.map((lang) => [
  "  <url>",
  `    <loc>${absolute(PATHS[lang][pageId])}</loc>`,
  ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(PATHS[l][pageId])}" />`),
  `    <changefreq>${pageId === "home" ? "monthly" : "yearly"}</changefreq>`,
  `    <priority>${pageId === "home" ? "1.0" : "0.3"}</priority>`,
  "  </url>",
].join("\n")))

fs.writeFileSync(path.join(OUT, "sitemap.xml"), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls,
  "</urlset>",
  "",
].join("\n"))

fs.rmSync(SSR, { recursive: true, force: true })
console.log("prerender: fet")
