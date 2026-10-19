'use client'

import { useTranslation } from "react-i18next"
import { useRef, useEffect } from "react"
import { LayoutDashboard, Dumbbell, Palette, Globe, TrendingUp, Store } from "lucide-react"
import { gsap } from "@/lib/gsap"

const ACCENT = "#256cd0"

// Icona per a cada servei (clau = id a i18n)
const ICONS = {
  "custom-apps": LayoutDashboard,
  gyms:          Dumbbell,
  portfolios:    Palette,
  wordpress:     Globe,
  seo:           TrendingUp,
  smb:           Store,
}

export default function Services() {
  const { t } = useTranslation()

  const sectionRef = useRef(null)
  const bgNumRef   = useRef(null)
  const titleRef   = useRef(null)
  const listRef    = useRef(null)

  const items = t("services.items", { returnObjects: true })
  const services = Array.isArray(items) ? items : []

  // ── Animacions (només si l'usuari no demana menys moviment) ──
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(bgNumRef.current,
        { yPercent: -10 },
        {
          yPercent: 10, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      )

      gsap.fromTo(titleRef.current,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 88%", once: true },
        }
      )

      const rows = listRef.current?.querySelectorAll(".service-item") ?? []
      gsap.fromTo(rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.07,
          scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
        }
      )
    })

    return () => mm.revert()
  }, [services.length])

  if (!services.length) return null

  const px = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }
  const monoSm = { fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", fontWeight: 300 }

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      style={{ position: "relative", overflowX: "hidden", paddingBottom: "6rem" }}
    >

      {/* ── Background number ─────────────────────────────────── */}
      <div ref={bgNumRef} aria-hidden style={{
        position: "absolute", top: "-0.05em", right: "-0.05em",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(16rem, 40vw, 36rem)",
        lineHeight: 0.8, letterSpacing: "-0.04em",
        color: "hsl(var(--foreground))", opacity: 0.03,
        pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>04</div>

      {/* ── Grid lines ────────────────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{
            position: "absolute", top: 0, bottom: 0, left: `${pct}%`,
            width: "1px", background: "hsl(var(--border) / 0.07)",
          }} />
        ))}
      </div>

      {/* ── Header band ───────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid hsl(var(--border) / 0.5)",
        borderBottom: "1px solid hsl(var(--border) / 0.5)",
        padding: "0.875rem 0", marginBottom: "5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        ...px,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span aria-hidden style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.16em", color: ACCENT, opacity: 0.9,
          }}>04</span>
          <span style={{ ...monoSm, textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>
            {t("services.eyebrow")}
          </span>
        </div>
        <span style={{ ...monoSm, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>
          {t("services.count", { count: services.length })}
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, ...px }}>

        {/* ── Title + intro ─────────────────────────────────────── */}
        <div className="md:flex md:items-end md:justify-between" style={{ gap: "3rem", marginBottom: "4rem" }}>
          <div style={{ overflow: "hidden" }}>
            <h2 id="services-title" ref={titleRef} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.88, letterSpacing: "0.01em",
              color: "hsl(var(--foreground))", margin: 0,
              textWrap: "balance",
            }}>
              {t("services.title")}
            </h2>
          </div>
          <p style={{
            ...monoSm, fontSize: "0.875rem", letterSpacing: "0.02em", lineHeight: 1.6,
            color: "hsl(var(--muted-foreground))", maxWidth: "38ch",
            margin: 0, marginTop: "1.5rem",
          }}>
            {t("services.intro")}
          </p>
        </div>

        {/* ── Services list ─────────────────────────────────────── */}
        <ul ref={listRef} className="grid md:grid-cols-2" style={{
          listStyle: "none", margin: 0, padding: 0,
          borderTop: "1px solid hsl(var(--border) / 0.4)",
        }}>
          {services.map((service, i) => {
            const Icon = ICONS[service.id] ?? LayoutDashboard
            return (
              <li
                key={service.id}
                className={`service-item group relative py-8 ${i % 2 === 1 ? "md:border-l md:pl-10" : "md:pr-10"}`}
                style={{
                  borderBottom: "1px solid hsl(var(--border) / 0.4)",
                  borderColor: "hsl(var(--border) / 0.4)",
                  display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "1.25rem",
                }}
              >
                {/* Línia d'accent en hover */}
                <span aria-hidden className="absolute left-0 top-[-1px] h-[2px] w-full origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-x-100"
                  style={{ background: ACCENT, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />

                <Icon
                  aria-hidden
                  size={22} strokeWidth={1.5} color={ACCENT}
                  className="motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-0.5"
                  style={{ marginTop: "0.35rem" }}
                />
                <div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "0.03em", lineHeight: 0.95,
                    color: "hsl(var(--foreground))", margin: 0, marginBottom: "0.75rem",
                  }}>{service.title}</h3>
                  <p style={{
                    ...monoSm, fontSize: "0.875rem", letterSpacing: "0.01em", lineHeight: 1.6,
                    color: "hsl(var(--muted-foreground))", margin: 0, maxWidth: "52ch",
                  }}>{service.description}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="md:flex md:items-center md:justify-between" style={{ gap: "2rem", marginTop: "3.5rem" }}>
          <p style={{
            ...monoSm, fontSize: "0.875rem", letterSpacing: "0.02em", lineHeight: 1.6,
            color: "hsl(var(--foreground))", margin: 0, marginBottom: "1.25rem",
          }}>
            {t("services.ctaText")}
          </p>
          <a
            href="#contact"
            className="inline-block border border-[#256cd0] bg-[#256cd0] text-white motion-safe:transition-colors motion-safe:duration-200 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#256cd0]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem", letterSpacing: "0.14em",
              padding: "0.75rem 2rem", textDecoration: "none",
            }}
          >{t("services.cta")}</a>
        </div>

      </div>
    </section>
  )
}
