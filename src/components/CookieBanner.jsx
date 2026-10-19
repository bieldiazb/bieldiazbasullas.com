'use client'

import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

const COOKIE_KEY = "cookie-consent"

// ── CookieBanner ──────────────────────────────────────────────────
// Tira de paper fixa a baix. Es guarda tant si s'accepta com si es
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
      className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-[760px] bg-paper text-ink"
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.9375rem] leading-snug">{t("cookies.text")}</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => dismiss(false)} className="btn btn-paper bg-paper-2">
            {t("cookies.reject")}
          </button>
          <button type="button" onClick={() => dismiss(true)} className="btn">
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  )
}
