'use client'

import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

const ACCENT      = "#256cd0"
const COOKIE_KEY  = "cookie-consent"

export default function CookieBanner() {
  const { t }           = useTranslation()
  const [visible, setVisible] = useState(false)
  const bannerRef       = useRef(null)

  useEffect(() => {
    if (localStorage.getItem(COOKIE_KEY) !== "accepted") {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!visible || !bannerRef.current) return
    gsap.fromTo(bannerRef.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.2 }
    )
  }, [visible])

  const dismiss = (accepted) => {
    gsap.to(bannerRef.current, {
      yPercent: 110, opacity: 0, duration: 0.45, ease: "expo.in",
      onComplete: () => setVisible(false),
    })
    if (accepted) localStorage.setItem(COOKIE_KEY, "accepted")
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 55,
        pointerEvents: "none",
      }}
    >
      <div
        ref={bannerRef}
        style={{
          pointerEvents: "all",
          background: "hsl(var(--background))",
          borderTop: "1px solid hsl(var(--border) / 0.5)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Accent left line */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: `clamp(1.25rem, 5vw, 5rem)`,
          height: "2px",
          background: ACCENT,
        }} />

        {/* Grid lines */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[25, 50, 75].map(pct => (
            <div key={pct} style={{
              position: "absolute", top: 0, bottom: 0, left: `${pct}%`,
              width: "1px", background: "hsl(var(--border) / 0.06)",
            }} />
          ))}
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem clamp(1.25rem, 5vw, 5rem)",
        }}>

          {/* Label + text */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", flex: 1, minWidth: "200px" }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.875rem", letterSpacing: "0.1em",
              color: ACCENT, flexShrink: 0,
            }}>COOKIES</span>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.6875rem", letterSpacing: "0.04em", lineHeight: 1.7,
              color: "hsl(var(--muted-foreground))",
              margin: 0,
            }}>
              {t("cookies.text")}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button
              onClick={() => dismiss(false)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.875rem", letterSpacing: "0.14em",
                padding: "0.5rem 1.5rem",
                background: "transparent",
                color: "hsl(var(--muted-foreground))",
                border: "1px solid hsl(var(--border) / 0.4)",
                cursor: "pointer",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "hsl(var(--foreground))"; e.currentTarget.style.borderColor = "hsl(var(--border))" }}
              onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.borderColor = "hsl(var(--border) / 0.4)" }}
            >
              {t("cookies.reject")}
            </button>

            <button
              onClick={() => dismiss(true)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.875rem", letterSpacing: "0.14em",
                padding: "0.5rem 1.5rem",
                background: ACCENT, color: "#fff",
                border: `1px solid ${ACCENT}`,
                cursor: "pointer",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t("cookies.accept")}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}