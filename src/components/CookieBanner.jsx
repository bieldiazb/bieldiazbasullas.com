'use client'

import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"
import { CONSENT_CATEGORIES, consentEnabled, getConsent, saveConsent } from "@/lib/consent"
import { pathFor, route } from "@/lib/routes"

// ── CookieBanner ──────────────────────────────────────────────────
// Avís petit a baix a l'esquerra (DESIGN.md alert-banner). Només surt si
// hi ha alguna categoria que requereixi consentiment (src/lib/consent.js)
// i encara no s'ha triat. Rebutjar és tan fàcil com acceptar, i es pot
// tornar a obrir des del peu ("Preferències de cookies").

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => consentEnabled && !getConsent())
  const bannerRef = useRef(null)

  useEffect(() => {
    if (!consentEnabled) return
    const open = () => setVisible(true)
    window.addEventListener("consent:open", open)
    return () => window.removeEventListener("consent:open", open)
  }, [])

  useEffect(() => {
    if (!visible || !bannerRef.current) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(bannerRef.current, { yPercent: 110, duration: 0.7, ease: "expo.out", delay: 0.6 })
    })
    return () => mm.revert()
  }, [visible])

  const choose = (accepted) => {
    saveConsent(Object.fromEntries(CONSENT_CATEGORIES.map(c => [c, accepted])))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label={t("cookies.label")}
      className="fixed bottom-4 left-4 right-4 z-[55] max-w-[420px] rounded-lg border border-hairline-soft bg-canvas p-4 text-ink md:left-6 md:right-auto"
    >
      <p className="text-[0.875rem] leading-[1.3]">
        {t("cookies.text")}{" "}
        <a href={pathFor("cookies", route.lang)} className="text-link text-[0.875rem]">{t("cookies.more")}</a>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose(false)} className="btn btn-ghost">
          {t("cookies.reject")}
        </button>
        <button type="button" onClick={() => choose(true)} className="btn btn-primary">
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  )
}
