// ── Google Analytics ──────────────────────────────────────────────
// Només es carrega si el visitant accepta l'analítica al bàner de cookies.
// Fins aleshores no es descarrega cap script de Google ni s'envia cap dada.
// Si després ho rebutja, s'atura i s'esborren les cookies _ga.

import { onConsent, onConsentChange } from "@/lib/consent"

export const GA_ID = "G-4PM01TM1G7"

let loaded = false

function gtag() {
  window.dataLayer.push(arguments)
}

function enable() {
  window[`ga-disable-${GA_ID}`] = false
  if (loaded) {
    gtag("consent", "update", { analytics_storage: "granted" })
    return
  }
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = gtag
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
  gtag("js", new Date())
  gtag("config", GA_ID)

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

function disable() {
  window[`ga-disable-${GA_ID}`] = true
  if (loaded) gtag("consent", "update", { analytics_storage: "denied" })

  // Esborra les cookies de GA (al domini i al domini pare)
  const domains = ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`]
  document.cookie.split(";").map(c => c.split("=")[0].trim()).filter(n => n.startsWith("_ga")).forEach(name => {
    domains.forEach(d => { document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}` })
  })
}

// Envia un esdeveniment a GA4. No fa res si el visitant no ha acceptat l'analítica
// (o en local), així que es pot cridar sempre sense comprovar res abans.
export function trackEvent(name, params = {}) {
  if (!loaded || window[`ga-disable-${GA_ID}`]) return
  gtag("event", name, params)
}

// Clics a enllaços de contacte: GA4 no els mesura sol (mailto/tel no són "outbound").
// Un sol listener delegat cobreix tot el web (Contact, Footer, etc.).
function onContactLinkClick(e) {
  const a = e.target instanceof Element ? e.target.closest("a[href]") : null
  if (!a) return
  const href = a.getAttribute("href") || ""
  const params = { link_location: a.closest("[id]")?.id || "page" }
  if (href.startsWith("mailto:")) trackEvent("email_click", params)
  else if (href.startsWith("tel:")) trackEvent("phone_click", params)
  else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href)) trackEvent("whatsapp_click", params)
}

export function initAnalytics() {
  // En local no es compten visites
  if (!import.meta.env.PROD || location.hostname === "localhost") return
  onConsent("analytics", enable)
  onConsentChange((c) => { if (!c?.analytics) disable() })
  document.addEventListener("click", onContactLinkClick)
}
