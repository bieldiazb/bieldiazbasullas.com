'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { LayoutDashboard, Dumbbell, Palette, Globe, TrendingUp, Store, Plus, Check } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { useOrder } from "@/lib/order"

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
// Franja blanca de lectura: etiqueta + títol + entrada, i una fila per
// servei separada per línies fines. Cada servei es pot afegir al
// missatge de contacte.

export default function Services() {
  const { t } = useTranslation()
  const { selected, toggle, has } = useOrder()
  const rootRef = useRef(null)

  const items = t("services.items", { returnObjects: true })
  const services = Array.isArray(items) ? items : []

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current
      gsap.from(root.querySelectorAll("[data-head]"), {
        y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      })
      // Cada fila: la línia es dibuixa i el contingut puja
      root.querySelectorAll("[data-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
        tl.from(row.querySelector("[data-rule]"), { scaleX: 0, duration: 1, ease: "expo.inOut" })
          .from(row.querySelectorAll("[data-cell]"), { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 }, "-=0.6")
      })
    })
    return () => mm.revert()
  }, [services.length])

  if (!services.length) return null

  return (
    <section ref={rootRef} id="services" aria-labelledby="services-title" className="bg-canvas py-24 md:py-32">
      <div className="container-page">

        {/* ── Etiqueta + títol ── */}
        <div className="max-w-[640px]">
          <p data-head className="t-eyebrow text-slate">{t("services.eyebrow")}</p>
          <h2 data-head id="services-title" className="t-display mt-4 text-ink">{t("services.title")}</h2>
          <p data-head className="t-subtitle mt-6 text-graphite">{t("services.intro")}</p>
        </div>

        {/* ── Files ── */}
        <ul className="mt-16 md:mt-20">
          {services.map((service) => {
            const Icon = ICONS[service.id] ?? LayoutDashboard
            const on = has(service.id)
            return (
              <li key={service.id} data-row className="relative">
                <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-hairline-soft" />
                <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
                  <div data-cell className="flex items-start gap-4 md:col-span-5">
                    <Icon aria-hidden size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink" />
                    <h3 className="t-title text-ink">{service.title}</h3>
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
