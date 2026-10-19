// ── Metadades SEO ─────────────────────────────────────────────────
// Títol i descripció de cada pàgina per idioma, i el bloc <head> que el
// build escriu a cada HTML estàtic (canonical, hreflang, Open Graph,
// Twitter i dades estructurades). JS pla: l'importa vite.config.js.

import { LANGS, DEFAULT_LANG, PATHS } from "../lib/routes.js"
import { OWNER, SITE_URL, SOCIALS } from "../lib/legal.js"

const NAME = OWNER.name

export const META = {
  ca: {
    home:     { title: `${NAME} | Desenvolupador web i dissenyador`, description: "Webs i apps a mida per a negocis i professionals de Catalunya: apps de gestió, gimnasos, portfolis, WordPress, SEO i apps per a pimes." },
    legal:    { title: `Avís legal | ${NAME}`, description: "Dades del titular i condicions d’ús del lloc web bieldiazbasullas.com." },
    privacy:  { title: `Política de privacitat | ${NAME}`, description: "Quines dades personals es recullen a bieldiazbasullas.com, per a què s’utilitzen i com exercir els teus drets." },
    cookies:  { title: `Política de cookies | ${NAME}`, description: "Què guarda bieldiazbasullas.com al teu navegador i per a què." },
    notfound: { title: `Pàgina no trobada | ${NAME}`, description: "Aquesta pàgina no existeix." },
    jobTitle: "Desenvolupador web i dissenyador",
    locale: "ca_ES",
  },
  es: {
    home:     { title: `${NAME} | Desarrollador web y diseñador`, description: "Webs y apps a medida para negocios y profesionales de Cataluña: apps de gestión, gimnasios, portfolios, WordPress, SEO y apps para pymes." },
    legal:    { title: `Aviso legal | ${NAME}`, description: "Datos del titular y condiciones de uso del sitio web bieldiazbasullas.com." },
    privacy:  { title: `Política de privacidad | ${NAME}`, description: "Qué datos personales se recogen en bieldiazbasullas.com, para qué se usan y cómo ejercer tus derechos." },
    cookies:  { title: `Política de cookies | ${NAME}`, description: "Qué guarda bieldiazbasullas.com en tu navegador y para qué." },
    notfound: { title: `Página no encontrada | ${NAME}`, description: "Esta página no existe." },
    jobTitle: "Desarrollador web y diseñador",
    locale: "es_ES",
  },
  en: {
    home:     { title: `${NAME} | Web developer and designer`, description: "Custom websites and apps for businesses and professionals in Catalonia: management apps, gyms, portfolios, WordPress, SEO and small-business apps." },
    legal:    { title: `Legal notice | ${NAME}`, description: "Owner details and terms of use of the bieldiazbasullas.com website." },
    privacy:  { title: `Privacy policy | ${NAME}`, description: "What personal data bieldiazbasullas.com collects, what it is used for and how to exercise your rights." },
    cookies:  { title: `Cookie policy | ${NAME}`, description: "What bieldiazbasullas.com stores in your browser and why." },
    notfound: { title: `Page not found | ${NAME}`, description: "This page does not exist." },
    jobTitle: "Web developer and designer",
    locale: "en_GB",
  },
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
export const absolute = (path) => SITE_URL + path

// Dades estructurades (schema.org) de la pàgina d'inici
function jsonLd(lang) {
  const m = META[lang]
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: NAME,
        url: absolute(PATHS[lang].home),
        jobTitle: m.jobTitle,
        email: `mailto:${OWNER.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: OWNER.city,
          addressRegion: "Catalunya",
          addressCountry: OWNER.country,
        },
        sameAs: SOCIALS.map(s => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        inLanguage: LANGS,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  }
}

// Bloc <head> d'una pàgina concreta
export function headFor(page, lang) {
  const m = META[lang][page] ?? META[lang].notfound
  const indexable = page !== "notfound"
  const url = indexable ? absolute(PATHS[lang][page]) : null
  const image = absolute("/og-image.jpg")

  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}" />`,
    `<meta name="author" content="${esc(NAME)}" />`,
  ]
  if (indexable) {
    tags.push(`<link rel="canonical" href="${url}" />`)
    for (const l of LANGS) tags.push(`<link rel="alternate" hreflang="${l}" href="${absolute(PATHS[l][page])}" />`)
    tags.push(`<link rel="alternate" hreflang="x-default" href="${absolute(PATHS[DEFAULT_LANG][page])}" />`)
  }
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(NAME)}" />`,
    `<meta property="og:locale" content="${META[lang].locale}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  )
  if (url) tags.push(`<meta property="og:url" content="${url}" />`)
  if (page === "home") tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>`)

  return tags.map(t => `    ${t}`).join("\n")
}
