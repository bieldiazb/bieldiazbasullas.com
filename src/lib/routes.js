// ── Rutes ─────────────────────────────────────────────────────────
// Cada pàgina té una URL per idioma. El build genera un HTML estàtic per
// a cadascuna (vite.config.js), així que en canviar d'idioma o de pàgina
// es fa una navegació normal del navegador.
// JS pla (sense àlies): també l'importa la configuració de Vite.

export const LANGS = ["ca", "es", "en"]
export const DEFAULT_LANG = "ca"

export const PATHS = {
  ca: { home: "/",    legal: "/avis-legal",       privacy: "/privacitat",     cookies: "/cookies"    },
  es: { home: "/es/", legal: "/es/aviso-legal",   privacy: "/es/privacidad",  cookies: "/es/cookies" },
  en: { home: "/en/", legal: "/en/legal-notice",  privacy: "/en/privacy",     cookies: "/en/cookies" },
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

// Ruta actual (la pàgina es carrega sencera a cada canvi de ruta)
export const route = typeof window === "undefined"
  ? { lang: DEFAULT_LANG, page: "home" }
  : parseRoute(window.location.pathname)

// Enllaç a una secció de l'inici: a l'inici és una àncora; des d'una
// pàgina legal, porta a l'inici de l'idioma actual
export const homeLink = (hash = "") =>
  route.page === "home" ? (hash || "#home") : pathFor("home", route.lang) + hash

// La mateixa pàgina en un altre idioma
export const langLink = (lang) =>
  pathFor(route.page === "notfound" ? "home" : route.page, lang)
