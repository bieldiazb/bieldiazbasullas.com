'use client'

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

const ACCENT = "#256cd0"

const inputBase = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid hsl(var(--border))",
  outline: "none",
  padding: "0.875rem 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: "0.9375rem",
  letterSpacing: "0.02em",
  color: "hsl(var(--foreground))",
  fontWeight: 300,
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
  borderRadius: 0,
}

const px = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const sectionRef = useRef(null)
  const bgNumRef   = useRef(null)
  const titleRef   = useRef(null)
  const rightRef   = useRef(null)

  // ── Bg number parallax ────────────────────────────────────────
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

  // ── Title clip reveal ─────────────────────────────────────────
  useEffect(() => {
    if (!titleRef.current) return
    const lines = titleRef.current.querySelectorAll(".title-line")
    gsap.fromTo(lines,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out", stagger: 0.09,
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
      }
    )
  }, [])

  // ── Right col fade in ─────────────────────────────────────────
  useEffect(() => {
    if (!rightRef.current) return
    gsap.fromTo(rightRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 82%", once: true },
      }
    )
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    try {
      const res = await fetch("https://formspree.io/f/maqwoqee", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result?.error || "Error")
      setSent(true)
    } catch {
      toast({ title: t("contact.toast.error.title"), description: t("contact.toast.error.description"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" style={{ position: "relative", overflowX: "hidden", paddingBottom: "6rem" }}>

      {/* ── Background number ─────────────────────────────────── */}
      <div ref={bgNumRef} aria-hidden style={{
        position: "absolute", top: "-0.05em", left: "-0.05em",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(16rem, 40vw, 36rem)",
        lineHeight: 0.8, letterSpacing: "-0.04em",
        color: "hsl(var(--foreground))", opacity: 0.03,
        pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>05</div>

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
        padding: "0.875rem 0", marginBottom: "0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        ...px,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.16em", color: ACCENT, opacity: 0.9,
          }}>05</span>
          <span style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 300,
            fontSize: "0.75rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "hsl(var(--muted-foreground))",
          }}>{t("contact.eyebrow")}</span>
        </div>
        <span style={{
          fontFamily: "'Geist Mono', monospace", fontWeight: 300,
          fontSize: "0.75rem", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.9,
        }}>BCN — 2026</span>
      </div>

      {/* ── Hero CTA block ───────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        ...px,
        paddingTop: "5rem", paddingBottom: "5rem",
        borderBottom: "1px solid hsl(var(--border) / 0.3)",
        display: "grid", gridTemplateColumns: "1fr",
        gap: "3rem",
      }}
        className="contact-hero-grid"
      >
        <style>{`
          @media (min-width: 768px) {
            .contact-hero-grid { grid-template-columns: 1fr 1fr !important; align-items: end !important; gap: 5rem !important; }
          }
          input::placeholder, textarea::placeholder { color: hsl(var(--muted-foreground)); opacity: 0.9; }
        `}</style>

        {/* Left — massive title */}
        <div>
          {/* Accent line */}
          <div style={{
            width: "3rem", height: "2px", background: ACCENT,
            marginBottom: "1.5rem",
          }} />
          <div ref={titleRef}>
            {(t("contact.title") || "Let's\nWork").split("\n").map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <h2 className="title-line" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  lineHeight: 0.85, letterSpacing: "0.01em",
                  color: "hsl(var(--foreground))", margin: 0, display: "block",
                }}>{line}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Right — info + availability + email */}
        <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          <p style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 300,
            fontSize: "0.8125rem", letterSpacing: "0.05em",
            lineHeight: 1.85, color: "hsl(var(--muted-foreground))", margin: 0,
          }}>
            {t("contact.left.description")}
          </p>

          {/* Availability badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            alignSelf: "flex-start",
            padding: "0.45rem 1rem",
            border: "1px solid hsl(var(--border) / 0.5)",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#22c55e", flexShrink: 0,
              boxShadow: "0 0 8px #22c55e60",
            }} />
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.75rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "hsl(var(--foreground))", opacity: 0.85,
            }}>
              {t("contact.available")}
            </span>
          </div>

          {/* Direct email */}
          <div style={{ borderTop: "1px solid hsl(var(--border) / 0.2)", paddingTop: "1.5rem" }}>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.8125rem", letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))", opacity: 0.7,
              margin: "0 0 0.5rem",
            }}>
              {t("contact.directLabel")}
            </p>
            <a
              href="mailto:bieldiazbasullas@proton.me"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
                letterSpacing: "0.03em",
                color: "hsl(var(--foreground))",
                textDecoration: "none", opacity: 0.9,
                transition: "opacity 0.2s ease, color 0.2s ease",
                display: "block", wordBreak: "break-all",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = ACCENT }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.color = "hsl(var(--foreground))" }}
            >
              bieldiazbasullas@proton.me
            </a>
          </div>
        </div>
      </div>

      {/* ── Form area ─────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, ...px, paddingTop: "4rem" }}>

        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.25rem" }}>
            <div style={{
              width: "52px", height: "52px",
              border: `1px solid ${ACCENT}`,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polyline points="3,11 9,17 19,5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "0.03em", lineHeight: 0.88,
              color: "hsl(var(--foreground))", margin: 0,
            }}>{t("contact.thanks.title")}</h3>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.8125rem", letterSpacing: "0.06em",
              color: "hsl(var(--muted-foreground))", lineHeight: 1.8, maxWidth: "40ch",
            }}>{t("contact.thanks.description")}</p>
          </div>

        ) : (
          <form onSubmit={handleSubmit}>

            <p style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 300,
              fontSize: "0.75rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.9,
              margin: "0 0 2.5rem",
            }}>
              {t("contact.formLabel")}
            </p>

            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr" }} className="contact-fields-grid">
              <style>{`@media(min-width:768px){.contact-fields-grid{grid-template-columns:1fr 1fr!important;gap:0 3rem!important}}`}</style>

              {[
                { name: "name",  type: "text",  label: t("contact.form.name"),  ph: t("contact.form.namePlaceholder")  },
                { name: "email", type: "email", label: t("contact.form.email"), ph: t("contact.form.emailPlaceholder") },
              ].map(({ name, type, label, ph }) => (
                <div key={name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2rem" }}>
                  <label style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 300,
                    fontSize: "0.8125rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.8,
                  }}>{label}</label>
                  <input
                    name={name} type={type} required placeholder={ph}
                    style={inputBase}
                    onFocus={e => e.target.style.borderBottomColor = ACCENT}
                    onBlur={e  => e.target.style.borderBottomColor = "hsl(var(--border))"}
                  />
                </div>
              ))}
            </div>

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2.5rem" }}>
              <label style={{
                fontFamily: "'Geist Mono', monospace", fontWeight: 300,
                fontSize: "0.75rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "hsl(var(--foreground))", opacity: 0.9,
              }}>{t("contact.form.message")}</label>
              <textarea
                name="message" required rows={5}
                placeholder={t("contact.form.messagePlaceholder")}
                style={{
                  ...inputBase,
                  resize: "none", borderBottom: "none",
                  border: "1px solid hsl(var(--border))",
                  padding: "1rem", lineHeight: 1.75,
                }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e  => e.target.style.borderColor = "hsl(var(--border))"}
              />
            </div>

            {/* Submit row */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap",
              gap: "1.25rem",
              borderTop: "1px solid hsl(var(--border) / 0.2)",
              paddingTop: "1.75rem",
            }}>
              <span style={{
                fontFamily: "'Geist Mono', monospace", fontWeight: 300,
                fontSize: "0.8125rem", letterSpacing: "0.06em",
                color: "hsl(var(--muted-foreground))", opacity: 0.8, lineHeight: 1.6,
              }}>
                {t("contact.formNote")}
              </span>

              <button
                type="submit" disabled={loading}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.05rem", letterSpacing: "0.14em",
                  padding: "0.8rem 3rem",
                  background: ACCENT,
                  color: "white",
                  border: `1px solid ${ACCENT}`,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.8 : 1,
                  transition: "opacity 0.2s ease, background 0.2s ease",
                  whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: "0.8125rem",
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.8" }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = "1" }}
              >
                {loading ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="6.5" cy="6.5" r="5" stroke="white" strokeWidth="1.5" strokeDasharray="18 12" />
                    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                  </svg>
                ) : null}
                {t("contact.form.submit")} →
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}