'use client'

import { useState, useEffect, useRef } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400&display=swap"

const ACCENT = "#256cd0"

const BRAND_TICKER = ["DEV", "2026", "BCN", "DEV"]

function useFont() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

export default function Header() {
  useFont()
  const { t } = useTranslation()
  const [lang, setLang]             = useState(() => {
    if (typeof localStorage !== "undefined") return localStorage.getItem("lang") || "ca"
    return "ca"
  })
  const [scrolled, setScrolled]     = useState(false)
  const [visible, setVisible]       = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted]       = useState(false)
  const [tickerIdx, setTickerIdx]   = useState(0)
  const lastYRef = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTickerIdx(i => i + 1), 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 32)
      setVisible(y < lastYRef.current || y < 80)
      lastYRef.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const changeLang = (value) => {
    setLang(value)
    i18n.changeLanguage(value)
    localStorage.setItem("lang", value)
  }

  const NAV = [
    { label: t("nav.about"),    href: "#about"    },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.contact"),  href: "#contact"  },
  ]

  const tp      = !scrolled
  const fg      = tp ? "rgba(255,255,255,1)"    : "hsl(var(--foreground))"
  const fgMuted = tp ? "rgba(255,255,255,0.42)" : "hsl(var(--muted-foreground))"
  const mono    = { fontFamily: "'Geist Mono', monospace", fontWeight: 300 }

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 50,
      opacity: mounted ? 1 : 0,
      transform: mounted
        ? visible ? "translateY(0)" : "translateY(-110%)"
        : "translateY(-8px)",
      transition: mounted
        ? "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease"
        : "opacity 0.6s ease",
      background: scrolled ? "hsl(var(--background) / 0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid hsl(var(--border) / 0.4)" : "none",
    }}>

      {/* Accent top line — only on hero */}
      {tp && (
        <div style={{
          height: "2px",
          background: `linear-gradient(to right, ${ACCENT} 0%, ${ACCENT}88 40%, transparent 100%)`,
          opacity: 0.8,
        }} />
      )}

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: scrolled ? "52px" : "68px",
        transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
        paddingLeft: "clamp(1.25rem, 4vw, 3.5rem)",
        paddingRight: "clamp(1.25rem, 4vw, 3.5rem)",
        gap: "2rem",
      }}>

        {/* ── Brand ── */}
        <a href="#home" style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          lineHeight: 1,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: scrolled ? "1.875rem" : "2.5rem",
            letterSpacing: "0.04em",
            color: scrolled ? "hsl(var(--foreground))" : "rgba(255,255,255,1)",
            transition: "color 0.4s ease, font-size 0.4s cubic-bezier(0.16,1,0.3,1)",
            lineHeight: 1,
          }}>BIEL</span>

          {/* Accent dot */}
          <span style={{
            display: "inline-block",
            width: "5px", height: "5px",
            borderRadius: "50%",
            background: ACCENT,
            marginBottom: "0.35em",
            flexShrink: 0,
          }} />

          {/* Rolling ticker */}
          <div style={{
            overflow: "hidden",
            height: "0.85rem",
            marginBottom: "0.3em",
            alignSelf: "flex-end",
          }}>
            <div style={{
              transform: `translateY(${-(tickerIdx % BRAND_TICKER.length) * 100}%)`,
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}>
              {BRAND_TICKER.map((t, i) => (
                <div key={i} style={{
                  ...mono,
                  fontSize: "0.45rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: tp ? "rgba(255,255,255,0.4)" : "hsl(var(--muted-foreground))",
                  height: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.4s ease",
                }}>{t}</div>
              ))}
            </div>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem", margin: "0 auto" }}>
          {NAV.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              style={{
                position: "relative",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.125rem",
                letterSpacing: "0.08em",
                color: fgMuted,
                textDecoration: "none",
                transition: "color 0.2s ease",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline",
                gap: "0.3em",
                paddingBottom: "2px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = tp ? "rgba(255,255,255,1)" : "hsl(var(--foreground))"
                const line = e.currentTarget.querySelector(".nav-line")
                if (line) line.style.transform = "scaleX(1)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = fgMuted
                const line = e.currentTarget.querySelector(".nav-line")
                if (line) line.style.transform = "scaleX(0)"
              }}
            >
              {/* Index */}
              <span style={{
                ...mono,
                fontSize: "0.4rem",
                letterSpacing: "0.1em",
                color: ACCENT,
                opacity: 0.7,
                marginBottom: "0.1em",
              }}>0{i + 1}</span>

              {label}

              {/* Underline */}
              <span className="nav-line" style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "1px",
                background: tp ? "rgba(255,255,255,0.6)" : ACCENT,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }} />
            </a>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

          {/* Lang */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.05rem" }}>
            {["ca", "es", "en"].map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                style={{
                  ...mono,
                  fontSize: "0.75rem", letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: lang === l
                    ? (tp ? "rgba(255,255,255,0.9)" : ACCENT)
                    : fgMuted,
                  background: "transparent", border: "none",
                  cursor: "pointer", padding: "0.25rem 0.35rem",
                  opacity: lang === l ? 1 : 0.38,
                  fontWeight: lang === l ? 400 : 300,
                  transition: "color 0.2s, opacity 0.2s",
                  borderBottom: lang === l ? `1px solid ${ACCENT}` : "1px solid transparent",
                }}
              >{l.toUpperCase()}</button>
            ))}
          </div>

          {/* CTA pill — desktop */}
          <a
            href="#contact"
            className="hidden md:flex"
            style={{
              ...mono,
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: tp ? "#fff" : "hsl(var(--foreground))",
              border: `1px solid ${tp ? "rgba(255,255,255,0.25)" : "hsl(var(--border))"}`,
              borderRadius: "999px",
              padding: "0.45rem 1rem",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = ACCENT
              e.currentTarget.style.borderColor = ACCENT
              e.currentTarget.style.color = "#fff"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.borderColor = tp ? "rgba(255,255,255,0.25)" : "hsl(var(--border))"
              e.currentTarget.style.color = tp ? "#fff" : "hsl(var(--foreground))"
            }}
          >
            Hire me
          </a>

          {/* ModeToggle */}
          <div className="hidden md:flex" style={{
            filter: tp ? "invert(1)" : "none",
            transition: "filter 0.4s ease",
          }}>
            <ModeToggle />
          </div>

          {/* Hamburger — mobile */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Obrir menú"
                  style={{
                    display: "flex", flexDirection: "column",
                    justifyContent: "center", gap: "5px",
                    width: "2.5rem", height: "2.5rem",
                    background: "transparent", border: "none",
                    cursor: "pointer", padding: "0.5rem 0.25rem",
                  }}
                >
                  {[
                    { w: "100%", rotate: mobileOpen ? "45deg" : "0deg", ty: mobileOpen ? "6px" : "0" },
                    { w: "60%",  opacity: mobileOpen ? 0 : 1 },
                    { w: "80%",  rotate: mobileOpen ? "-45deg" : "0deg", ty: mobileOpen ? "-6px" : "0" },
                  ].map((s, i) => (
                    <span key={i} style={{
                      display: "block",
                      height: "1px",
                      background: tp ? "rgba(255,255,255,1)" : "hsl(var(--foreground))",
                      width: s.w,
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      opacity: s.opacity ?? 1,
                      transform: s.rotate ? `rotate(${s.rotate}) translateY(${s.ty})` : "none",
                    }} />
                  ))}
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="[&>button]:hidden"
                style={{
                  width: "100vw", maxWidth: "100vw",
                  height: "100dvh",
                  background: "hsl(var(--background))",
                  border: "none", padding: 0,
                  display: "flex", flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "2px", background: `linear-gradient(to right, ${ACCENT}, transparent)`, flexShrink: 0 }} />

                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 clamp(1.25rem, 5vw, 2.5rem)",
                  height: "60px",
                  borderBottom: "1px solid hsl(var(--border) / 0.12)",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2rem", letterSpacing: "0.04em",
                      color: "hsl(var(--foreground))", lineHeight: 1,
                    }}>BIEL</span>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, marginBottom: "0.3em" }} />
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Tancar"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "2.5rem", height: "2.5rem",
                      background: "transparent", border: "none", cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {[45, -45].map((deg, i) => (
                      <span key={i} style={{
                        position: "absolute",
                        width: "1.25rem", height: "1px",
                        background: "hsl(var(--foreground))",
                        transform: `rotate(${deg}deg)`,
                      }} />
                    ))}
                  </button>
                </div>

                <nav style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 clamp(1.25rem, 5vw, 2.5rem)",
                }}>
                  {NAV.map(({ label, href }, i) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "flex", alignItems: "baseline",
                        justifyContent: "space-between",
                        padding: "0.9rem 0",
                        borderBottom: i < NAV.length - 1
                          ? "1px solid hsl(var(--border) / 0.1)"
                          : "none",
                        textDecoration: "none",
                        color: "hsl(var(--foreground))",
                        transition: "color 0.2s ease, padding-left 0.3s cubic-bezier(0.16,1,0.3,1)",
                        paddingLeft: "0",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.paddingLeft = "0.75rem"
                        e.currentTarget.style.color = ACCENT
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.paddingLeft = "0"
                        e.currentTarget.style.color = "hsl(var(--foreground))"
                      }}
                    >
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 14vw, 5rem)",
                        letterSpacing: "0.02em", lineHeight: 1,
                        transition: "inherit",
                      }}>{label}</span>
                      <span style={{
                        ...mono,
                        fontSize: "0.75rem", letterSpacing: "0.12em",
                        color: "hsl(var(--muted-foreground))", opacity: 0.5,
                      }}>0{i + 1}</span>
                    </a>
                  ))}
                </nav>

                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem clamp(1.25rem, 5vw, 2.5rem)",
                  borderTop: "1px solid hsl(var(--border) / 0.12)",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {["ca", "es", "en"].map((val) => (
                      <button
                        key={val}
                        onClick={() => changeLang(val)}
                        style={{
                          ...mono,
                          fontSize: "0.75rem", letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: lang === val ? ACCENT : "hsl(var(--muted-foreground))",
                          background: "transparent", border: "none",
                          cursor: "pointer", padding: 0,
                          opacity: lang === val ? 1 : 0.38,
                          transition: "opacity 0.2s, color 0.2s",
                          borderBottom: lang === val ? `1px solid ${ACCENT}` : "none",
                        }}
                      >{val.toUpperCase()}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <ModeToggle />
                    <span style={{
                      ...mono,
                      fontSize: "0.75rem", letterSpacing: "0.12em",
                      color: "hsl(var(--muted-foreground))", opacity: 0.4,
                    }}>© {new Date().getFullYear()}</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}