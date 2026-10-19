// ── Consentiment de cookies ───────────────────────────────────────
// Ara la web no fa servir cap cookie que requereixi consentiment, així
// que no hi ha categories i el bàner no surt.
//
// Per afegir analítica:
//   1. Afegeix "analytics" a CONSENT_CATEGORIES.
//   2. Carrega l'script de l'eina només dins de onConsent("analytics", ...).
//   3. Actualitza la taula de la política de cookies (src/legal/*.js).

export const CONSENT_CATEGORIES = []          // p. ex. ["analytics"]
export const CONSENT_KEY = "cookie-consent"
const MAX_AGE_DAYS = 365                      // es torna a preguntar al cap d'un any

export const consentEnabled = CONSENT_CATEGORIES.length > 0

export function getConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY))
    if (!saved?.date) return null
    const age = (Date.now() - new Date(saved.date).getTime()) / 86400000
    return age > MAX_AGE_DAYS ? null : saved
  } catch {
    return null
  }
}

const listeners = new Set()

export function saveConsent(choices) {
  const value = { ...choices, date: new Date().toISOString() }
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(value)) } catch { /* sense storage */ }
  listeners.forEach(fn => fn(value))
}

// Executa fn quan (i si) l'usuari accepta la categoria
export function onConsent(category, fn) {
  const run = (c) => { if (c?.[category]) fn() }
  run(getConsent())
  listeners.add(run)
  return () => listeners.delete(run)
}

// Torna a obrir el bàner (enllaç "Preferències de cookies" del peu)
export const openConsent = () => window.dispatchEvent(new Event("consent:open"))
