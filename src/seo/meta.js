// ── Metadades SEO ─────────────────────────────────────────────────
// Títol i descripció de cada pàgina per idioma, i el bloc <head> que el
// build escriu a cada HTML estàtic (canonical, hreflang, Open Graph,
// Twitter i dades estructurades). JS pla: l'importa vite.config.js.

import { LANGS, DEFAULT_LANG, PATHS, SERVICE_IDS, servicePage, serviceIdOf } from "../lib/routes.js"
import { OWNER, SITE_URL, SOCIALS } from "../lib/legal.js"
import ca from "../i18n/ca.json" with { type: "json" }
import es from "../i18n/es.json" with { type: "json" }
import en from "../i18n/en.json" with { type: "json" }
import contentCa from "../content/ca.js"
import contentEs from "../content/es.js"
import contentEn from "../content/en.js"

const NAME = OWNER.name
const SHORT_NAME = OWNER.name.split(" ").slice(0, 2).join(" ")   // "Biel Díaz"
const SERVICES = { ca: ca.services.items, es: es.services.items, en: en.services.items }
export const CONTENT = { ca: contentCa, es: contentEs, en: contentEn }

export const META = {
  ca: {
    home:     { title: `Disseny web i apps a mida a Manresa i el Bages | ${SHORT_NAME}`, description: "Webs i apps a mida per a negocis de Manresa, el Bages i Catalunya: apps de gestió, gimnasos, portfolis, WordPress i SEO. Tracte directe, sense intermediaris." },
    legal:    { title: `Avís legal | ${NAME}`, description: "Dades del titular i condicions d’ús del lloc web bieldiazbasullas.com." },
    privacy:  { title: `Política de privacitat | ${NAME}`, description: "Quines dades personals es recullen a bieldiazbasullas.com, per a què s’utilitzen i com exercir els teus drets." },
    cookies:  { title: `Política de cookies | ${NAME}`, description: "Què guarda bieldiazbasullas.com al teu navegador i per a què." },
    notfound: { title: `Pàgina no trobada | ${NAME}`, description: "Aquesta pàgina no existeix." },
    jobTitle: "Desenvolupador web i dissenyador",
    locale: "ca_ES",
  },
  es: {
    home:     { title: `Diseño web y apps a medida en Manresa y el Bages | ${SHORT_NAME}`, description: "Webs y apps a medida para negocios de Manresa, el Bages y Cataluña: apps de gestión, gimnasios, portfolios, WordPress y SEO. Trato directo, sin intermediarios." },
    legal:    { title: `Aviso legal | ${NAME}`, description: "Datos del titular y condiciones de uso del sitio web bieldiazbasullas.com." },
    privacy:  { title: `Política de privacidad | ${NAME}`, description: "Qué datos personales se recogen en bieldiazbasullas.com, para qué se usan y cómo ejercer tus derechos." },
    cookies:  { title: `Política de cookies | ${NAME}`, description: "Qué guarda bieldiazbasullas.com en tu navegador y para qué." },
    notfound: { title: `Página no encontrada | ${NAME}`, description: "Esta página no existe." },
    jobTitle: "Desarrollador web y diseñador",
    locale: "es_ES",
  },
  en: {
    home:     { title: `Custom websites and apps in Manresa, Catalonia | ${SHORT_NAME}`, description: "Custom websites and apps for businesses in Manresa, the Bages and Catalonia: management apps, gyms, portfolios, WordPress and SEO. Work directly with me." },
    legal:    { title: `Legal notice | ${NAME}`, description: "Owner details and terms of use of the bieldiazbasullas.com website." },
    privacy:  { title: `Privacy policy | ${NAME}`, description: "What personal data bieldiazbasullas.com collects, what it is used for and how to exercise your rights." },
    cookies:  { title: `Cookie policy | ${NAME}`, description: "What bieldiazbasullas.com stores in your browser and why." },
    notfound: { title: `Page not found | ${NAME}`, description: "This page does not exist." },
    jobTitle: "Web developer and designer",
    locale: "en_GB",
  },
}

// Títol i descripció de qualsevol pàgina (també les de servei i la local)
export function pageMeta(page, lang) {
  const c = CONTENT[lang]
  const id = serviceIdOf(page)
  if (id && c.services[id]) return { title: c.services[id].metaTitle, description: c.services[id].metaDescription }
  if (page === "local") return { title: c.local.metaTitle, description: c.local.metaDescription }
  return META[lang][page] ?? META[lang].notfound
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
export const absolute = (path) => SITE_URL + path

// Dades estructurades (schema.org) de la pàgina d'inici: la persona, el
// negoci local amb la zona on treballa i els serveis (sense preus), i el web
function homeGraph(lang) {
  const m = META[lang]
  const home = absolute(PATHS[lang].home)
  return [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: NAME,
        url: home,
        image: absolute("/avatar-light.svg"),
        jobTitle: m.jobTitle,
        email: `mailto:${OWNER.email}`,
        worksFor: { "@id": `${SITE_URL}/#business` },
        knowsLanguage: LANGS,
        sameAs: SOCIALS.map(s => s.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: NAME,
        description: m.home.description,
        url: home,
        image: absolute("/og-image.jpg"),
        email: OWNER.email,
        founder: { "@id": `${SITE_URL}/#person` },
        address: {
          "@type": "PostalAddress",
          streetAddress: OWNER.street,
          postalCode: OWNER.postalCode,
          addressLocality: OWNER.city,
          addressRegion: OWNER.province,
          addressCountry: OWNER.country,
        },
        areaServed: [
          { "@type": "City", name: "Manresa" },
          { "@type": "AdministrativeArea", name: "Bages" },
          { "@type": "AdministrativeArea", name: "Catalunya" },
        ],
        knowsLanguage: LANGS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: m.jobTitle,
          itemListElement: SERVICES[lang].map(s => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
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
  ]
}

const faqNode = (items) => ({
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
})

const breadcrumbNode = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
})

// Dades estructurades segons la pàgina: inici (persona, negoci, web i
// FAQ), servei (servei, ruta i FAQ) i pàgina local (ruta i FAQ)
function jsonLdFor(page, lang) {
  const c = CONTENT[lang]
  const homeUrl = absolute(PATHS[lang].home)
  const url = absolute(PATHS[lang][page])
  let nodes = null

  if (page === "home") {
    nodes = [...homeGraph(lang), faqNode(c.homeFaq.items)]
  } else if (page === "local") {
    nodes = [
      breadcrumbNode([[c.ui.home, homeUrl], [c.local.h1, url]]),
      faqNode(c.local.faqs),
    ]
  } else if (serviceIdOf(page)) {
    const s = c.services[serviceIdOf(page)]
    nodes = [
      {
        "@type": "Service",
        name: s.h1,
        description: s.intro,
        url,
        serviceType: s.h1,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "City", name: "Manresa" },
          { "@type": "AdministrativeArea", name: "Bages" },
          { "@type": "AdministrativeArea", name: "Catalunya" },
        ],
        inLanguage: lang,
      },
      breadcrumbNode([[c.ui.home, homeUrl], [c.ui.services, `${homeUrl}#services`], [s.h1, url]]),
      faqNode(s.faqs),
    ]
  }
  return nodes && { "@context": "https://schema.org", "@graph": nodes }
}

// Llista de serveis amb la seva URL (per enllaçar-los des de les pàgines)
export const serviceLinks = (lang) =>
  SERVICE_IDS.map(id => ({ id, path: PATHS[lang][servicePage(id)], title: CONTENT[lang].services[id].h1 }))

// Bloc <head> d'una pàgina concreta
export function headFor(page, lang) {
  const m = pageMeta(page, lang)
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
  const ld = indexable ? jsonLdFor(page, lang) : null
  // "<" escapat dins del JSON perquè cap text pugui tancar l'etiqueta <script>
  if (ld) tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`)

  return tags.map(t => `    ${t}`).join("\n")
}
