import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import TechStack from "./TechStack"

const ACCENT = "#256cd0"

const STATS = [
  { value: "3+",  label: "anys d'experiència" },
  { value: "20+", label: "projectes entregats" },
  { value: "∞",   label: "cafès consumits"     },
]

export default function About() {
  const { t } = useTranslation()
  const sectionRef  = useRef(null)
  const bgNumRef    = useRef(null)
  const revealRef   = useRef(null)
  const statsRef    = useRef([])
  const titleRef    = useRef(null)
  const lineRef     = useRef(null)
  const TEXT = t("about.text")

  // ── Background number parallax ─────────────────────────────────
  useEffect(() => {
    if (!bgNumRef.current) return
    gsap.fromTo(bgNumRef.current,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  }, [])

  // ── Title clip reveal ──────────────────────────────────────────
  useEffect(() => {
    if (!titleRef.current) return
    const lines = titleRef.current.querySelectorAll(".title-line")
    gsap.fromTo(lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        duration: 1.0,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
      }
    )
  }, [])

  // ── Accent line wipe ───────────────────────────────────────────
  useEffect(() => {
    if (!lineRef.current) return
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "expo.out",
        transformOrigin: "left",
        scrollTrigger: { trigger: lineRef.current, start: "top 88%", once: true },
      }
    )
  }, [])

  // ── Stats reveal ──────────────────────────────────────────────
  useEffect(() => {
    statsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "expo.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      )
    })
  }, [])

  // ── Word reveal ───────────────────────────────────────────────
  useEffect(() => {
    if (!revealRef.current) return
    const words = revealRef.current.querySelectorAll(".word")
    gsap.fromTo(words,
      { "--reveal": 0 },
      {
        "--reveal": 1,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: revealRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [TEXT])

  const px = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative", overflowX: "hidden", paddingBottom: "6rem" }}
    >
      {/* ── Background section number ──────────────────────────── */}
      <div
        ref={bgNumRef}
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "-0.05em",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(16rem, 40vw, 36rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.04em",
          color: "hsl(var(--foreground))",
          opacity: 0.03,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >02</div>

      {/* ── Vertical grid lines ───────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${pct}%`,
            width: "1px",
            background: "hsl(var(--border) / 0.07)",
          }} />
        ))}
      </div>

      {/* ── Header band ───────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid hsl(var(--border) / 0.5)",
        borderBottom: "1px solid hsl(var(--border) / 0.5)",
        padding: "0.875rem 0",
        marginBottom: "5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        ...px,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.875rem",
            letterSpacing: "0.16em", color: ACCENT, opacity: 1,
          }}>02</span>
          <span style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 300,
            fontSize: "0.75rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "hsl(var(--muted-foreground))",
          }}>{t("about.label")}</span>
        </div>
        <span style={{
          fontFamily: "'Geist Mono', monospace", fontWeight: 300,
          fontSize: "0.75rem", letterSpacing: "0.14em",
          color: "hsl(var(--muted-foreground))", opacity: 0.6,
          textTransform: "uppercase",
        }}>BCN — 2026</span>
      </div>

      <div style={{ position: "relative", zIndex: 1, ...px }}>

        {/* ── Title block ───────────────────────────────────────── */}
        <div style={{ marginBottom: "5rem" }}>
          {/* Accent line */}
          <div ref={lineRef} style={{
            width: "3rem", height: "2px",
            background: ACCENT,
            marginBottom: "1.5rem",
            transformOrigin: "left",
          }} />

          <div ref={titleRef} style={{ overflow: "hidden" }}>
            {t("about.title").split("\n").map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <h2 className="title-line" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  lineHeight: 0.88, letterSpacing: "0.01em",
                  color: "hsl(var(--foreground))",
                  margin: 0, display: "block",
                }}>{line}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid hsl(var(--border) / 0.4)",
          borderBottom: "1px solid hsl(var(--border) / 0.4)",
          marginBottom: "5rem",
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              ref={el => statsRef.current[i] = el}
              style={{
                padding: "2rem 0",
                paddingLeft: i === 0 ? 0 : "clamp(0.75rem, 3vw, 2.5rem)",
                borderRight: i < STATS.length - 1 ? "1px solid hsl(var(--border) / 0.4)" : "none",
              }}
            >
              {/* Accent dot */}
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, marginBottom: "0.75rem" }} />
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 0.9, letterSpacing: "0.02em",
                color: "hsl(var(--foreground))", marginBottom: "0.4rem",
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "0.75rem", letterSpacing: "0.14em",
                textTransform: "uppercase", color: "hsl(var(--muted-foreground))",
                fontWeight: 400,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Word reveal ───────────────────────────────────────── */}
        <p
          ref={revealRef}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
            lineHeight: 1.1, letterSpacing: "0.02em",
            maxWidth: "100%", margin: "0 0 5rem",
            wordBreak: "normal", overflowWrap: "normal", hyphens: "none",
          }}
        >
          {TEXT.split(" ").map((word, i) => (
            <span key={i} className="word" style={{
              display: "inline-block",
              marginRight: "0.16em",
              whiteSpace: "nowrap",
              "--reveal": 0,
              color: `color-mix(in oklab, hsl(var(--border) / 0.5), hsl(var(--foreground)) calc(var(--reveal) * 100%))`,
            }}>
              {word}
            </span>
          ))}
        </p>

        {/* ── Tech stack ────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid hsl(var(--border) / 0.4)", paddingTop: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: ACCENT, fontWeight: 300, opacity: 0.8,
            }}>Stack</span>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${ACCENT}40, hsl(var(--border) / 0.2))` }} />
          </div>
          <TechStack />
        </div>

      </div>
    </section>
  )
}