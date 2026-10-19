import { useEffect } from "react"
import { META } from "@/seo/meta"

// ── Seo ───────────────────────────────────────────────────────────
// Les metadades completes ja són a l'HTML estàtic de cada pàgina (les
// escriu el build). Aquí només es manté el títol, la descripció i
// l'idioma sincronitzats al client (per exemple, al servidor de
// desenvolupament, que serveix el mateix HTML a totes les rutes).

export function Seo({ page, lang }) {
  useEffect(() => {
    const m = META[lang]?.[page] ?? META[lang]?.notfound
    if (!m) return
    document.title = m.title
    document.documentElement.lang = lang
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description)
  }, [page, lang])

  return null
}
