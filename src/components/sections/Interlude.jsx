'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

// ── Interlude ─────────────────────────────────────────────────────
// Pausa entre mòduls (DESIGN.md: panell fosc arrodonit). El panell
// creix lleugerament mentre entra a la pantalla.

export default function Interlude() {
  const { t } = useTranslation()
  const panelRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(panelRef.current, { scale: 0.94 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: panelRef.current, start: "top bottom", end: "top 35%", scrub: true },
      })
      gsap.from(panelRef.current.querySelectorAll("[data-text]"), {
        y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: panelRef.current, start: "top 70%", once: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <aside aria-label={t("interlude.text")} className="bg-canvas pb-24 md:pb-32">
      <div className="container-page">
        <div ref={panelRef} className="on-dark rounded-lg bg-scrim px-6 py-16 text-white md:px-12 md:py-24">
          <p
            data-text
            className="max-w-[34ch] font-normal leading-[1.1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", textWrap: "balance" }}
          >
            {t("interlude.text")}
          </p>
          <p data-text className="t-subtitle mt-6 max-w-[44ch] text-white/75">{t("interlude.lead")}</p>
          <a data-text href="#contact" className="btn btn-on-dark mt-10">{t("interlude.cta")}</a>
        </div>
      </div>
    </aside>
  )
}
