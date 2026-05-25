import { useEffect } from "react"

export function Seo({ title, description, lang = "ca" }) {
  useEffect(() => {
    // Title
    if (title) document.title = title

    // Lang
    document.documentElement.lang = lang

    // Helpers
    const setMeta = (attr, key, value) => {
      if (!value) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    // Basic
    setMeta("name", "description", description)
    setMeta("name", "robots", "index, follow")
    setMeta("name", "author", "Biel Diaz Basullas")

    // Open Graph
    setMeta("property", "og:title",       title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:type",        "website")
    setMeta("property", "og:url",         window.location.href)
    setMeta("property", "og:image",       "/og-image.jpg")
    setMeta("property", "og:image:width", "1200")
    setMeta("property", "og:image:height","630")
    setMeta("property", "og:locale",      lang === "ca" ? "ca_ES" : lang === "es" ? "es_ES" : "en_US")
    setMeta("property", "og:site_name",   "Biel Diaz Basullas")

    // Twitter
    setMeta("name", "twitter:card",        "summary_large_image")
    setMeta("name", "twitter:title",       title)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image",       "/og-image.jpg")
  }, [title, description, lang])

  return null
}