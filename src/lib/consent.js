// ── Consentiment de cookies ───────────────────────────────────────
// Categoria "analytics": Google Analytics (src/lib/analytics.js), que
// només es carrega si el visitant l'accepta al bàner. Si s'afegeix una
// altra eina, cal afegir-la també a la política de cookies (src/legal/*.js).

export const CONSENT_CATEGORIES = ["analytics"]
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

// Executa fn cada cop que l'usuari canvia les preferències
export function onConsentChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Torna a obrir el bàner (enllaç "Preferències de cookies" del peu)
export const openConsent = () => window.dispatchEvent(new Event("consent:open"))
