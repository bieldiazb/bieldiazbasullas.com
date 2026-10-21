// ── Entrada del prerender ─────────────────────────────────────────
// Només s'usa al build (scripts/prerender.mjs): renderitza cada pàgina a
// HTML perquè el contingut ja vingui escrit dins del fitxer estàtic.
// Al navegador, main.jsx torna a pintar l'app a sobre.

import { prerenderToNodeStream } from "react-dom/static"
import i18n from "./i18n"
import App from "./App.jsx"
import { setRoute } from "@/lib/routes"

export async function render(page, lang) {
  setRoute({ page, lang })
  await i18n.changeLanguage(lang)

  // prerender espera els components carregats a part (pàgines legals)
  const { prelude } = await prerenderToNodeStream(<App />)
  let html = ""
  for await (const chunk of prelude) html += chunk
  return html
}
