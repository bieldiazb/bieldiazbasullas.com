// ── Rutes ─────────────────────────────────────────────────────────
// Cada pàgina té una URL per idioma. El build genera un HTML estàtic per
// a cadascuna (vite.config.js), així que en canviar d'idioma o de pàgina
// es fa una navegació normal del navegador.
// JS pla (sense àlies): també l'importa la configuració de Vite.

export const LANGS = ["ca", "es", "en"]
export const DEFAULT_LANG = "ca"

// Serveis amb pàgina pròpia (mateixos ids que a i18n i src/content)
export const SERVICE_IDS = ["custom-apps", "gyms", "portfolios", "wordpress", "seo", "smb"]
export const servicePage = (id) => `service-${id}`
export const serviceIdOf = (page) => (page?.startsWith("service-") ? page.slice(8) : null)

const SERVICE_SLUGS = {
  ca: { "custom-apps": "apps-de-gestio-a-mida", gyms: "gestio-per-a-gimnasos", portfolios: "portfolis-web-a-mida", wordpress: "webs-wordpress", seo: "seo", smb: "apps-per-a-pimes" },
  es: { "custom-apps": "apps-de-gestion-a-medida", gyms: "gestion-para-gimnasios", portfolios: "portfolios-web-a-medida", wordpress: "webs-wordpress", seo: "seo", smb: "apps-para-pymes" },
  en: { "custom-apps": "custom-management-apps", gyms: "gym-management", portfolios: "custom-portfolio-websites", wordpress: "wordpress-websites", seo: "seo", smb: "small-business-apps" },
}
const SERVICE_BASE = { ca: "/serveis", es: "/es/servicios", en: "/en/services" }
const services = (lang) => Object.fromEntries(
  SERVICE_IDS.map(id => [servicePage(id), `${SERVICE_BASE[lang]}/${SERVICE_SLUGS[lang][id]}`])
)

export const PATHS = {
  ca: { home: "/",    local: "/disseny-web-manresa",     ...services("ca"), legal: "/avis-legal",      privacy: "/privacitat",    cookies: "/cookies"    },
  es: { home: "/es/", local: "/es/diseno-web-manresa",   ...services("es"), legal: "/es/aviso-legal",  privacy: "/es/privacidad", cookies: "/es/cookies" },
  en: { home: "/en/", local: "/en/web-design-manresa",   ...services("en"), legal: "/en/legal-notice", privacy: "/en/privacy",    cookies: "/en/cookies" },
}

export const PAGES = Object.keys(PATHS.ca)

const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/"

// Ruta a partir del pathname: { lang, page }. Les desconegudes són "notfound".
export function parseRoute(pathname) {
  const path = normalize(pathname.replace(/\.html$/, "").replace(/\/index$/, "/"))
  for (const lang of LANGS) {
    for (const page of PAGES) {
      if (normalize(PATHS[lang][page]) === path) return { lang, page }
    }
  }
  const lang = LANGS.find(l => l !== DEFAULT_LANG && (path === `/${l}` || path.startsWith(`/${l}/`))) ?? DEFAULT_LANG
  return { lang, page: "notfound" }
}

export const pathFor = (page, lang) => PATHS[lang]?.[page] ?? PATHS[DEFAULT_LANG].home

// Ruta actual (la pàgina es carrega sencera a cada canvi de ruta).
// Al prerender del build (sense window) es fixa amb setRoute per a cada pàgina.
export let route = typeof window === "undefined"
  ? { lang: DEFAULT_LANG, page: "home" }
  : parseRoute(window.location.pathname)

export function setRoute(next) {
  route = next
}

// Enllaç a una secció de l'inici: a l'inici és una àncora; des d'una
// pàgina legal, porta a l'inici de l'idioma actual
export const homeLink = (hash = "") =>
  route.page === "home" ? (hash || "#home") : pathFor("home", route.lang) + hash

// La mateixa pàgina en un altre idioma
export const langLink = (lang) =>
  pathFor(route.page === "notfound" ? "home" : route.page, lang)
