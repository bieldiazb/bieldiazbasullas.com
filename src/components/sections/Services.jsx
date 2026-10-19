'use client'

import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LayoutDashboard, Dumbbell, Palette, Globe, TrendingUp, Store, Plus, Check } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { useOrder } from "@/lib/order"
import { useReveal } from "@/lib/useReveal"
import SectionLabel from "@/components/SectionLabel"

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
// Franja blanca de lectura: etiqueta amb índex + títol + entrada, i una
// fila numerada per servei separada per línies fines. Cada servei es
// pot afegir al missatge de contacte.

export default function Services() {
  const { t } = useTranslation()
  const { selected, toggle, has } = useOrder()
  const rootRef = useReveal()

  const items = t("services.items", { returnObjects: true })
  const services = Array.isArray(items) ? items : []

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Cada fila: la línia es dibuixa i el contingut puja
      rootRef.current.querySelectorAll("[data-row]").forEach((row) => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
          .from(row.querySelector("[data-rule]"), { scaleX: 0, duration: 1, ease: "expo.inOut" })
          .from(row.querySelectorAll("[data-cell]"), { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 }, "-=0.6")
      })
    })
    return () => mm.revert()
  }, [services.length, rootRef])

  if (!services.length) return null

  return (
    <section ref={rootRef} id="services" aria-labelledby="services-title" className="bg-canvas py-24 md:py-36">
      <div className="container-page">

        {/* ── Etiqueta + títol ── */}
        <div className="grid gap-6 md:grid-cols-12">
          <SectionLabel index="01" data-reveal className="text-slate md:col-span-4 md:pt-4">{t("services.eyebrow")}</SectionLabel>
          <div className="md:col-span-8">
            <h2 data-split id="services-title" className="t-display text-ink">{t("services.title")}</h2>
            <p data-reveal className="t-subtitle mt-6 max-w-[40ch] text-graphite">{t("services.intro")}</p>
          </div>
        </div>

        {/* ── Files ── */}
        <ul className="mt-16 md:mt-24">
          {services.map((service, i) => {
            const Icon = ICONS[service.id] ?? LayoutDashboard
            const on = has(service.id)
            return (
              <li key={service.id} data-row className="group relative">
                <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-hairline-soft" />
                <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
                  <span data-cell className="t-meta index pt-1.5 text-slate md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div data-cell className="flex items-start gap-4 md:col-span-4">
                    <Icon aria-hidden size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink transition-transform duration-500 ease-out group-hover:-rotate-6" />
                    <h3 className="t-title text-ink transition-transform duration-500 ease-out group-hover:translate-x-1.5">{service.title}</h3>
                  </div>
                  <p data-cell className="t-body max-w-[52ch] text-graphite md:col-span-5">{service.description}</p>
                  <div data-cell className="md:col-span-2 md:flex md:items-start md:justify-end">
                    <button
                      type="button"
                      onClick={() => toggle(service.id)}
                      aria-pressed={on}
                      className={`btn ${on ? "btn-primary" : "btn-ghost"} min-w-[7.5rem]`}
                    >
                      {on ? <Check aria-hidden size={16} /> : <Plus aria-hidden size={16} />}
                      {on ? t("services.added") : t("services.add")}
                      <span className="sr-only">: {service.title}</span>
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* ── Resum ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline-soft pt-8">
          <p aria-live="polite" className="t-body text-graphite">
            {t("services.summary", { count: selected.length })}
          </p>
          <a href="#contact" className="text-link text-ink">{t("services.review")}</a>
        </div>
      </div>
    </section>
  )
}
