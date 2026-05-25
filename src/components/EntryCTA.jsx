'use client'

import { useEffect, useState, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useTranslation } from "react-i18next"
import { X } from "lucide-react"

const ACCENT   = "#256cd0"
const STORAGE_KEY = "entryCtaSeen"

export default function EntryCTA() {
  const [open, setOpen]   = useState(false)
  const panelRef          = useRef(null)
  const lineRef           = useRef(null)
  const { t }             = useTranslation()

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => {
      setOpen(true)
      localStorage.setItem(STORAGE_KEY, "true")
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Animate in
  useEffect(() => {
    if (!open || !panelRef.current) return
    gsap.fromTo(panelRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.85, ease: "expo.out" }
    )
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, ease: "expo.out", delay: 0.3, transformOrigin: "left" }
    )
  }, [open])

  const close = () => {
    gsap.to(panelRef.current, {
      yPercent: 100, opacity: 0, duration: 0.55, ease: "expo.in",
      onComplete: () => setOpen(false),
    })
  }

  if (!open) return null

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none" }}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          pointerEvents: "all",
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          pointerEvents: "all",
          background: "hsl(var(--background))",
          borderTop: `2px solid ${ACCENT}`,
          overflow: "hidden",
        }}
      >
        {/* Accent line wipe */}
        <div ref={lineRef} style={{
          position: "absolute", top: 0, left: 0,
          height: "2px", width: "100%",
          background: ACCENT,
          transformOrigin: "left", transform: "scaleX(0)",
        }} />

        {/* Grid lines */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[25, 50, 75].map(pct => (
            <div key={pct} style={{
              position: "absolute", top: 0, bottom: 0, left: `${pct}%`,
              width: "1px", background: "hsl(var(--border) / 0.07)",
            }} />
          ))}
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 5rem)",
          gap: "2.5rem",
        }}
          className="cta-panel-grid"
        >
          <style>{`
            @media (min-width: 768px) {
              .cta-panel-grid {
                grid-template-columns: auto 1fr auto !important;
                align-items: center !important;
                gap: 3rem !important;
              }
            }
          `}</style>

          {/* Index + label */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "0.35rem",
            borderRight: "1px solid hsl(var(--border) / 0.2)",
            paddingRight: "3rem",
          }}
            className="cta-left-col"
          >
            <style>{`.cta-left-col { border-right: none !important; padding-right: 0 !important; }
              @media(min-width:768px){ .cta-left-col { border-right: 1px solid hsl(var(--border) / 0.2) !important; padding-right: 3rem !important; } }`}
            </style>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              lineHeight: 0.85, letterSpacing: "0.02em",
              color: "hsl(var(--foreground))",
            }}>CTA</span>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.625rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: ACCENT,
            }}>Web Design · Dev</span>
          </div>

          {/* Content */}
          <div>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
              letterSpacing: "0.02em", lineHeight: 0.9,
              color: "hsl(var(--foreground))",
              margin: "0 0 0.75rem",
            }}>
              {t("cta.entry.title")}
            </h3>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.75rem", letterSpacing: "0.05em", lineHeight: 1.8,
              color: "hsl(var(--muted-foreground))",
              margin: 0, maxWidth: "52ch",
            }}>
              {t("cta.entry.description")}
            </p>
          </div>

          {/* Actions */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: "0.75rem", flexShrink: 0,
          }}>
            <button
              onClick={() => {
                close()
                setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 600)
              }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem", letterSpacing: "0.14em",
                padding: "0.75rem 2.5rem",
                background: ACCENT, color: "#fff",
                border: `1px solid ${ACCENT}`,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t("cta.entry.primary")} →
            </button>

            <button
              onClick={() => {
                close()
                setTimeout(() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }), 600)
              }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem", letterSpacing: "0.14em",
                padding: "0.75rem 2.5rem",
                background: "transparent", color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border) / 0.5)",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(var(--border) / 0.5)"; e.currentTarget.style.color = "hsl(var(--foreground))" }}
            >
              {t("cta.entry.secondary")}
            </button>
          </div>

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute", top: "1.25rem", right: "1.25rem",
              background: "transparent", border: "none",
              cursor: "pointer", padding: "0.25rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "hsl(var(--muted-foreground))",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "hsl(var(--foreground))"}
            onMouseLeave={e => e.currentTarget.style.color = "hsl(var(--muted-foreground))"}
          >
            <X size={14} />
          </button>
        </div>

        {/* Bottom hairline */}
        <div style={{ height: "1px", background: "hsl(var(--border) / 0.15)" }} />
      </div>
    </div>
  )
}