'use client'

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const ACCENT = "#256cd0"

export default function Projects() {
  const { t } = useTranslation()
  const projects = t("projects.items", { returnObjects: true }) || []
  const [active, setActive]   = useState(0)
  const [hovered, setHovered] = useState(null)

  const sectionRef = useRef(null)
  const bgNumRef   = useRef(null)
  const titleRef   = useRef(null)
  const tableRef   = useRef(null)
  const previewRef = useRef(null)
  const videoRef   = useRef(null)
  const infoRef    = useRef(null)
  const lazyVideos = useRef({})

  // Lazy load mobile videos
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const video = entry.target
        const src = video.dataset.src
        if (src && !video.src) { video.src = src; video.load() }
        obs.unobserve(video)
      })
    }, { rootMargin: "200px" })
    Object.values(lazyVideos.current).forEach(v => v && obs.observe(v))
    return () => obs.disconnect()
  }, [projects.length])

  if (!projects.length) return null
  const project = projects[active]

  // BG parallax
  useEffect(() => {
    if (!bgNumRef.current) return
    gsap.fromTo(bgNumRef.current,
      { yPercent: -10 },
      { yPercent: 10, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
    )
  }, [])

  // Title reveal
  useEffect(() => {
    if (!titleRef.current) return
    gsap.fromTo(titleRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", once: true } }
    )
  }, [])

  // Table rows reveal
  useEffect(() => {
    if (!tableRef.current) return
    const rows = tableRef.current.querySelectorAll(".proj-row")
    gsap.fromTo(rows,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: tableRef.current, start: "top 82%", once: true } }
    )
  }, [projects.length])

  // Preview transition on active change
  useEffect(() => {
    if (!videoRef.current || !infoRef.current) return
    if (window.innerWidth < 768) return

    const vid = videoRef.current
    const src = vid.dataset.src
    if (src && vid.getAttribute("src") !== src) { vid.src = src; vid.load() }

    gsap.fromTo(videoRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "expo.out" }
    )
    gsap.fromTo(Array.from(infoRef.current.children),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.08 }
    )
  }, [active])

  const px   = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }
  const mono = { fontFamily: "'Geist Mono', monospace", fontWeight: 300 }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: "relative", overflowX: "hidden", paddingBottom: "6rem" }}
    >
      {/* BG number */}
      <div ref={bgNumRef} aria-hidden style={{
        position: "absolute", top: "-0.1em", left: "-0.05em",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(16rem, 40vw, 36rem)",
        lineHeight: 0.8, letterSpacing: "-0.04em",
        color: "hsl(var(--foreground))", opacity: 0.03,
        pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>03</div>

      {/* Grid lines */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[25, 50, 75].map(p => (
          <div key={p} style={{
            position: "absolute", top: 0, bottom: 0, left: `${p}%`,
            width: "1px", background: "hsl(var(--border) / 0.07)",
          }} />
        ))}
      </div>

      {/* Header band */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid hsl(var(--border) / 0.5)",
        borderBottom: "1px solid hsl(var(--border) / 0.5)",
        padding: "0.875rem 0", marginBottom: "5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        ...px,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.875rem", letterSpacing: "0.16em", color: ACCENT }}>03</span>
          <span style={{ ...mono, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{t("projects.eyebrow")}</span>
        </div>
        <span style={{ ...mono, fontSize: "0.75rem", letterSpacing: "0.14em", color: "hsl(var(--muted-foreground))", opacity: 0.5 }}>
          {projects.length} projects
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, ...px }}>

        {/* Title */}
        <div style={{ overflow: "hidden", marginBottom: "4rem" }}>
          <h2 ref={titleRef} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "hsl(var(--foreground))", margin: 0,
          }}>{t("projects.title")}</h2>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden">
          {projects.map((p, i) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", textDecoration: "none",
                color: "hsl(var(--foreground))",
                borderBottom: "1px solid hsl(var(--border) / 0.3)",
                paddingBottom: "2rem", marginBottom: "2rem",
              }}
            >
              <span style={{ ...mono, fontSize: "0.8125rem", letterSpacing: "0.14em", color: ACCENT, display: "block", marginBottom: "0.75rem" }}>0{i + 1}</span>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 9", marginBottom: "1.25rem", background: "hsl(var(--muted) / 0.3)" }}>
                <video data-src={p.video} autoPlay muted loop playsInline preload="none"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  ref={el => { if (el) lazyVideos.current[i] = el }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: ACCENT, opacity: 0.7 }} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 5vw, 2.25rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.35rem" }}>{p.title}</div>
                  <div style={{ ...mono, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{p.subtitle} · {p.year}</div>
                </div>
                <span style={{ ...mono, fontSize: "0.75rem", color: ACCENT, opacity: 0.6, flexShrink: 0 }}>→</span>
              </div>
            </a>
          ))}
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:block">

          {/* ── PROJECT LIST ── */}
          <div ref={tableRef}>
            {projects.map((p, i) => {
              const isActive  = active === i
              const isHovered = hovered === i
              const dim       = !isActive && hovered !== null && !isHovered

              return (
                <div
                  key={p.title}
                  className="proj-row"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3rem 1fr auto",
                    alignItems: "center",
                    padding: "1.4rem 0",
                    borderTop: i === 0 ? "1px solid hsl(var(--border) / 0.35)" : "none",
                    borderBottom: "1px solid hsl(var(--border) / 0.35)",
                    cursor: "pointer",
                    gap: "1.5rem",
                    transition: "opacity 0.25s ease",
                    opacity: dim ? 0.25 : 1,
                    position: "relative",
                  }}
                >
                  {/* Active indicator bar */}
                  <div style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: "2px",
                    background: ACCENT,
                    transform: isActive ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }} />

                  {/* Index */}
                  <span style={{
                    ...mono,
                    fontSize: "0.55rem", letterSpacing: "0.18em",
                    color: isActive ? ACCENT : "hsl(var(--muted-foreground))",
                    opacity: isActive ? 1 : 0.45,
                    transition: "color 0.25s, opacity 0.25s",
                    paddingLeft: "0.75rem",
                  }}>0{i + 1}</span>

                  {/* Title */}
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)",
                    letterSpacing: "0.01em", lineHeight: 1,
                    color: "hsl(var(--foreground))",
                    transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                    transform: isHovered ? "translateX(8px)" : "translateX(0)",
                    display: "inline-block",
                  }}>{p.title}</span>

                  {/* Right meta */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "2rem",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      ...mono, fontSize: "0.6rem", letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: isActive ? ACCENT : "hsl(var(--muted-foreground))",
                      transition: "color 0.25s",
                    }}>{p.subtitle}</span>
                    <span style={{
                      ...mono, fontSize: "0.6rem", letterSpacing: "0.14em",
                      color: "hsl(var(--muted-foreground))", opacity: 0.45,
                    }}>{p.year}</span>
                    <span style={{
                      ...mono, fontSize: "0.75rem",
                      color: isActive ? ACCENT : "transparent",
                      transition: "color 0.25s, transform 0.35s",
                      transform: isHovered ? "translateX(4px)" : "translateX(0)",
                      display: "inline-block",
                    }}>→</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── ACTIVE PREVIEW — 50/50 ── */}
          <div ref={previewRef} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            marginTop: "4rem",
            borderTop: "1px solid hsl(var(--border) / 0.3)",
          }}>

            {/* Left — Video */}
            <a
              href={project.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", position: "relative",
                overflow: "hidden", textDecoration: "none",
                borderRight: "1px solid hsl(var(--border) / 0.2)",
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector(".vid-overlay").style.opacity = "1"
                e.currentTarget.querySelector("video").style.transform = "scale(1.03)"
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector(".vid-overlay").style.opacity = "0"
                e.currentTarget.querySelector("video").style.transform = "scale(1)"
              }}
            >
              <video
                ref={videoRef}
                data-src={project.video}
                autoPlay muted loop playsInline preload="none"
                style={{
                  width: "100%", display: "block",
                  objectFit: "cover", aspectRatio: "4 / 3",
                  transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              {/* Accent corner */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: "3px", height: "3rem",
                background: ACCENT,
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: "3rem", height: "3px",
                background: ACCENT,
              }} />
              {/* Hover overlay */}
              <div className="vid-overlay" style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.3s ease",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.25rem", letterSpacing: "0.12em",
                  color: "white", border: "1px solid rgba(255,255,255,0.4)",
                  padding: "0.6rem 1.5rem",
                }}>View Live →</span>
              </div>
            </a>

            {/* Right — Info */}
            <div ref={infoRef} style={{
              padding: "3rem clamp(1.5rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              minHeight: "100%",
            }}>
              {/* Top */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Index + category */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.2em", color: ACCENT, opacity: 0.8, textTransform: "uppercase" }}>
                    {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", opacity: 0.5 }}>
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 0.88, letterSpacing: "0.01em",
                  color: "hsl(var(--foreground))", margin: 0,
                }}>{project.title}</h3>

                {/* Subtitle */}
                <span style={{
                  ...mono, fontSize: "0.65rem", letterSpacing: "0.16em",
                  textTransform: "uppercase", color: ACCENT, opacity: 0.85,
                }}>{project.subtitle}</span>

                {/* Description — if available */}
                {project.description && (
                  <p style={{
                    ...mono, fontSize: "0.8125rem", lineHeight: 1.65,
                    color: "hsl(var(--muted-foreground))", margin: 0,
                    maxWidth: "32ch",
                  }}>{project.description}</p>
                )}
              </div>

              {/* Bottom — Tags + CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Tags */}
                {project.tags?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        ...mono, fontSize: "0.55rem", letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground))",
                        border: "1px solid hsl(var(--border) / 0.5)",
                        padding: "0.25rem 0.65rem",
                        opacity: 0.7,
                      }}>{tag}</span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <a
                  href={project.url}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1rem", letterSpacing: "0.1em",
                    color: "hsl(var(--foreground))",
                    textDecoration: "none",
                    borderBottom: `1px solid hsl(var(--border) / 0.4)`,
                    paddingBottom: "0.4rem",
                    width: "fit-content",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = ACCENT
                    e.currentTarget.style.borderColor = ACCENT
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "hsl(var(--foreground))"
                    e.currentTarget.style.borderColor = "hsl(var(--border) / 0.4)"
                  }}
                >
                  View Project
                  <span style={{ transition: "transform 0.3s", display: "inline-block" }}>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}