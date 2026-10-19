'use client'

import { useTranslation } from "react-i18next"
import { LayoutDashboard, Dumbbell, Palette, Globe, TrendingUp, Store, Plus, Check } from "lucide-react"
import { useOrder } from "@/lib/order"
import { useReveal } from "@/lib/useReveal"
import { Scallops } from "@/components/paper/Scallops"

// Icona per a cada servei (clau = id a i18n)
const ICONS = {
  "custom-apps": LayoutDashboard,
  gyms:          Dumbbell,
  portfolios:    Palette,
  wordpress:     Globe,
  seo:           TrendingUp,
  smb:           Store,
}

// ── Services ──────────────────────────────────────────────────────
// Un full amb la paraula gegant i una fila plena per servei. Cada fila
// s'obre (details) i deixa afegir el servei a l'encàrrec.

export default function Services() {
  const { t } = useTranslation()
  const { selected, toggle, has } = useOrder()
  const ref = useReveal()

  const items = t("services.items", { returnObjects: true })
  const services = Array.isArray(items) ? items : []
  if (!services.length) return null

  const word = t("services.title")

  return (
    <section id="services" aria-labelledby="services-title" className="px-3 py-24 md:py-40">
      <div ref={ref} className="paper relative mx-auto max-w-[720px] px-5 pb-16 pt-10 md:px-10">

        <h2
          id="services-title"
          data-reveal
          className="font-serif leading-[0.8] text-ink"
          style={{ containerType: "inline-size" }}
        >
          {/* La mida s'ajusta a la llargada de la paraula perquè ompli l'amplada del full */}
          <span className="block whitespace-nowrap" style={{ fontSize: `${Math.min(44, 318 / word.length)}cqw` }}>
            {word}
          </span>
        </h2>

        <p data-reveal className="mt-6 max-w-[44ch] text-[1.25rem] leading-snug text-ink">
          {t("services.intro")}
        </p>

        <ul className="mt-8 space-y-1.5">
          {services.map((service, i) => {
            const Icon = ICONS[service.id] ?? LayoutDashboard
            const on = has(service.id)
            return (
              <li key={service.id} data-reveal>
                <details className="group bg-paper-2" open={i === 0}>
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-4 px-[18px] py-3 transition-colors hover:bg-paper-3 [&::-webkit-details-marker]:hidden">
                    {/* Casella del full: plena quan el servei és a l'encàrrec */}
                    <span
                      aria-hidden
                      className={`grid size-5 shrink-0 place-items-center transition-colors ${on ? "bg-stamp text-on-stamp" : "bg-paper"}`}
                    >
                      {on && <Check size={14} strokeWidth={3} />}
                    </span>
                    <Icon aria-hidden size={20} strokeWidth={1.75} className="shrink-0 text-ink-soft" />
                    <span className="flex-1 text-[1.0625rem] font-medium text-ink">{service.title}</span>
                    <Plus aria-hidden size={20} className="shrink-0 text-ink transition-transform duration-300 group-open:rotate-45" />
                  </summary>

                  <div className="px-[18px] pb-5 pt-1 md:pl-[76px]">
                    <p className="max-w-[52ch] text-[1rem] text-ink">{service.description}</p>
                    <button
                      type="button"
                      onClick={() => toggle(service.id)}
                      aria-pressed={on}
                      className={`mt-4 inline-flex min-h-[44px] items-center gap-2 px-4 text-[0.9375rem] font-medium transition-colors ${
                        on ? "bg-stamp text-on-stamp hover:bg-ink hover:text-paper" : "bg-paper text-ink hover:bg-ink hover:text-paper"
                      }`}
                    >
                      {on ? <Check aria-hidden size={16} /> : <Plus aria-hidden size={16} />}
                      {on ? t("services.added") : t("services.add")}
                    </button>
                  </div>
                </details>
              </li>
            )
          })}
        </ul>

        {/* ── Resum de l'encàrrec ── */}
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p aria-live="polite" className="text-[1rem] text-ink">
            {t("services.summary", { count: selected.length })}
          </p>
          <a href="#contact" className="btn">{t("services.review")}</a>
        </div>

        <Scallops edge="bottom" />
      </div>
    </section>
  )
}
