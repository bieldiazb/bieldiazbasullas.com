'use client'

import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

const ACCENT = "#256cd0"

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polyline points="3,9 7,13 15,5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="5" y1="5" x2="13" y2="13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <line x1="13" y1="5" x2="5" y2="13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const [hoveredPack, setHoveredPack] = useState(null)
  const [mobilePack, setMobilePack]   = useState(0)

  const sectionRef = useRef(null)
  const bgNumRef   = useRef(null)
  const titleRef   = useRef(null)
  const packsRef   = useRef(null)

  const packs    = t("services.packs",    { returnObjects: true }) || []
  const features = t("services.features", { returnObjects: true }) || []
  if (!packs.length || !features.length) return null

  // ── Background number parallax ─────────────────────────────────
  useEffect(() => {
    if (!bgNumRef.current) return
    gsap.fromTo(bgNumRef.current,
      { yPercent: -10 },
      {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      }
    )
  }, [])

  // ── Title reveal ──────────────────────────────────────────────
  useEffect(() => {
    if (!titleRef.current) return
    gsap.fromTo(titleRef.current,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", once: true },
      }
    )
  }, [])

  // ── Pack cards fade in ─────────────────────────────────────────
  useEffect(() => {
    if (!packsRef.current) return
    const cols = packsRef.current.querySelectorAll(".pack-col")
    gsap.fromTo(cols,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: packsRef.current, start: "top 82%", once: true },
      }
    )
  }, [packs.length])

  const px = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }
  const monoSm = { fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", fontWeight: 300 }

  return (
    <section ref={sectionRef} id="services" style={{ position: "relative", overflowX: "hidden", paddingBottom: "6rem" }}>

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
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.16em", color: ACCENT, opacity: 0.9,
          }}>04</span>
          <span style={{ ...monoSm, textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>
            {t("services.eyebrow")}
          </span>
        </div>
        <span style={{ ...monoSm, color: "hsl(var(--muted-foreground))", opacity: 0.55, textTransform: "uppercase" }}>
          {packs.length} packs
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, ...px }}>

        {/* ── Title ─────────────────────────────────────────────── */}
        <div style={{ overflow: "hidden", marginBottom: "4rem" }}>
          <h2 ref={titleRef} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "hsl(var(--foreground))", margin: 0,
          }}>
            {t("services.title")}
          </h2>
        </div>

        {/* ══════════════ MOBILE ══════════════ */}
        <div className="md:hidden">
          {/* Tabs */}
          <div style={{
            display: "flex", gap: 0,
            borderTop: "1px solid hsl(var(--border) / 0.4)",
            borderBottom: "1px solid hsl(var(--border) / 0.4)",
            marginBottom: "2rem",
          }}>
            {packs.map((pack, pi) => (
              <button
                key={pack.id}
                onClick={() => setMobilePack(pi)}
                style={{
                  flex: 1, padding: "0.875rem 0.5rem",
                  background: "transparent", border: "none",
                  borderRight: pi < packs.length - 1 ? "1px solid hsl(var(--border) / 0.4)" : "none",
                  cursor: "pointer", position: "relative",
                }}
              >
                {mobilePack === pi && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "2px", background: ACCENT,
                  }} />
                )}
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.25rem", letterSpacing: "0.06em",
                  color: mobilePack === pi ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  lineHeight: 1, marginBottom: "0.2rem",
                }}>{pack.name}</div>
                <div style={{ ...monoSm, color: "hsl(var(--muted-foreground))", opacity: mobilePack === pi ? 0.8 : 0.35 }}>
                  {pack.price}
                </div>
              </button>
            ))}
          </div>

          {/* Active pack */}
          {(() => {
            const pack = packs[mobilePack]
            return (
              <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid hsl(var(--border) / 0.3)" }}>
                {pack.highlight && (
                  <span style={{
                    display: "inline-block",
                    ...monoSm, fontSize: "0.75rem", letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    border: `1px solid ${ACCENT}`, color: ACCENT,
                    padding: "0.15rem 0.6rem", marginBottom: "0.75rem",
                  }}>{t("services.recommended")}</span>
                )}
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "3.5rem", letterSpacing: "0.02em", lineHeight: 0.9,
                  color: "hsl(var(--foreground))", marginBottom: "0.35rem",
                }}>{pack.price}</div>
                <div style={{ ...monoSm, color: "hsl(var(--muted-foreground))", marginBottom: "1.5rem" }}>{pack.time}</div>
                <a href="#contact" style={{
                  display: "inline-block",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.9rem", letterSpacing: "0.14em",
                  padding: "0.65rem 1.75rem", textDecoration: "none",
                  color: pack.highlight ? "hsl(var(--background))" : "hsl(var(--foreground))",
                  background: pack.highlight ? ACCENT : "transparent",
                  border: `1px solid ${pack.highlight ? ACCENT : "hsl(var(--foreground) / 0.4)"}`,
                }}>{t("services.cta")}</a>
              </div>
            )
          })()}

          {features.map((feature) => {
            const val = packs[mobilePack].features[feature.key]
            return (
              <div key={feature.key} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.875rem 0", borderBottom: "1px solid hsl(var(--border) / 0.15)", gap: "1rem",
              }}>
                <div>
                  <div style={{ ...monoSm, fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "hsl(var(--foreground))", fontWeight: 400 }}>
                    {feature.label}
                  </div>
                  {feature.description && (
                    <div style={{ ...monoSm, fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", opacity: 0.5 }}>
                      {feature.description}
                    </div>
                  )}
                </div>
                <div style={{ flexShrink: 0 }}>
                  {val === true  && <Check />}
                  {val === false && <Cross />}
                  {(typeof val === "string" || typeof val === "number") && (
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.06em", color: "hsl(var(--foreground))" }}>{val}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ══════════════ DESKTOP ══════════════ */}
        <div ref={packsRef} className="hidden md:block">

          {/* Pack column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `240px repeat(${packs.length}, 1fr)`,
            borderBottom: "1px solid hsl(var(--border) / 0.4)",
            paddingBottom: "2.5rem",
          }}>
            <div />
            {packs.map((pack, pi) => (
              <div
                key={pack.id}
                className="pack-col"
                onMouseEnter={() => setHoveredPack(pi)}
                onMouseLeave={() => setHoveredPack(null)}
                style={{
                  padding: "1.75rem 1.5rem",
                  borderLeft: "1px solid hsl(var(--border) / 0.3)",
                  background: pack.highlight
                    ? `${ACCENT}08`
                    : hoveredPack === pi ? "hsl(var(--foreground) / 0.02)" : "transparent",
                  transition: "background 0.25s ease",
                  position: "relative",
                }}
              >
                {/* Accent top line for highlighted */}
                {pack.highlight && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: ACCENT }} />
                )}

                {pack.highlight && (
                  <span style={{
                    display: "inline-block", ...monoSm,
                    fontSize: "0.8125rem", letterSpacing: "0.14em", textTransform: "uppercase",
                    border: `1px solid ${ACCENT}`, color: ACCENT,
                    padding: "0.15rem 0.6rem", marginBottom: "0.875rem",
                  }}>{t("services.recommended")}</span>
                )}
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  letterSpacing: "0.04em", lineHeight: 0.92,
                  color: "hsl(var(--foreground))", marginBottom: "0.3rem",
                }}>{pack.name}</div>
                <div style={{ ...monoSm, fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", opacity: 0.75, marginBottom: "1.25rem" }}>{pack.time}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "0.02em", lineHeight: 0.9,
                  color: pack.highlight ? ACCENT : "hsl(var(--foreground))",
                  marginBottom: "1.75rem",
                }}>{pack.price}</div>
                <a
                  href="#contact"
                  style={{
                    display: "inline-block",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.85rem", letterSpacing: "0.14em",
                    padding: "0.6rem 1.5rem", textDecoration: "none",
                    color: pack.highlight ? "hsl(var(--background))" : "hsl(var(--foreground))",
                    background: pack.highlight ? ACCENT : "transparent",
                    border: `1px solid ${pack.highlight ? ACCENT : "hsl(var(--foreground) / 0.35)"}`,
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!pack.highlight) {
                      e.currentTarget.style.background = "hsl(var(--foreground))"
                      e.currentTarget.style.color = "hsl(var(--background))"
                    }
                  }}
                  onMouseLeave={e => {
                    if (!pack.highlight) {
                      e.currentTarget.style.background = "transparent"
                      e.currentTarget.style.color = "hsl(var(--foreground))"
                    }
                  }}
                >{t("services.cta")}</a>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((feature, fi) => (
            <div
              key={feature.key}
              style={{
                display: "grid",
                gridTemplateColumns: `240px repeat(${packs.length}, 1fr)`,
                borderBottom: "1px solid hsl(var(--border) / 0.15)",
              }}
            >
              <div style={{
                padding: "1rem 0",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.2rem",
              }}>
                <span style={{ ...monoSm, fontSize: "0.8125rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--foreground))", fontWeight: 400 }}>
                  {feature.label}
                </span>
                {feature.description && (
                  <span style={{ ...monoSm, fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", opacity: 0.45 }}>
                    {feature.description}
                  </span>
                )}
              </div>

              {packs.map((pack, pi) => {
                const val = pack.features[feature.key]
                return (
                  <div
                    key={pack.id + feature.key}
                    onMouseEnter={() => setHoveredPack(pi)}
                    onMouseLeave={() => setHoveredPack(null)}
                    style={{
                      padding: "1rem 1.5rem",
                      borderLeft: "1px solid hsl(var(--border) / 0.15)",
                      display: "flex", alignItems: "center",
                      background: pack.highlight
                        ? `${ACCENT}05`
                        : hoveredPack === pi ? "hsl(var(--foreground) / 0.015)" : "transparent",
                      transition: "background 0.25s ease",
                    }}
                  >
                    {val === true  && <Check />}
                    {val === false && <Cross />}
                    {(typeof val === "string" || typeof val === "number") && (
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em", color: "hsl(var(--foreground))" }}>{val}</span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}