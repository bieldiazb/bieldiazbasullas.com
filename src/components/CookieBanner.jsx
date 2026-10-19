'use client'

import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

const COOKIE_KEY = "cookie-consent"

// ── CookieBanner ──────────────────────────────────────────────────
// Avís petit a baix a l'esquerra (DESIGN.md alert-banner). Es guarda tant si s'accepta com si es
// rebutja, perquè no torni a sortir a cada visita.

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => {
    try { return !localStorage.getItem(COOKIE_KEY) } catch { return true }
  })
  const bannerRef = useRef(null)

  useEffect(() => {
    if (!visible || !bannerRef.current) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(bannerRef.current, { yPercent: 110, duration: 0.7, ease: "expo.out", delay: 0.6 })
    })
    return () => mm.revert()
  }, [visible])

  const dismiss = (accepted) => {
    try { localStorage.setItem(COOKIE_KEY, accepted ? "accepted" : "rejected") } catch { /* sense storage */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 z-[55] max-w-[420px] rounded-lg border border-hairline-soft bg-canvas p-4 text-ink md:left-6 md:right-auto"
    >
      <p className="text-[0.875rem] leading-[1.3]">{t("cookies.text")}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => dismiss(false)} className="btn btn-ghost">
          {t("cookies.reject")}
        </button>
        <button type="button" onClick={() => dismiss(true)} className="btn btn-primary">
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  )
}
