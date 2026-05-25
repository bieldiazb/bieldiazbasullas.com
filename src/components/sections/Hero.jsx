'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Grainient from "../Grainient"

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400&display=swap"

function injectFont() {
  if (typeof document === "undefined") return
  if (document.querySelector(`link[href="${FONT_HREF}"]`)) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = FONT_HREF
  document.head.appendChild(link)
}

const MARQUEE_ITEMS = [
  "Web Developer",
  "UI / UX Design",
  "React",
  "Next.js",
  "Motion Design",
  "Creative Dev",
  "Barcelona",
  "Available 2026",
]

export default function Hero() {
  injectFont()

  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const tagRef     = useRef(null)
  const scrollRef  = useRef(null)
  const metaRef    = useRef(null)
  const numRef     = useRef(null)
  const marqueeRef = useRef(null)
  const tickRef    = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    tl
      .fromTo(tagRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .fromTo(line1Ref.current,
        { yPercent: 105 },
        { yPercent: 0, duration: 1.3 }, 0.35)
      .fromTo(line2Ref.current,
        { yPercent: 105 },
        { yPercent: 0, duration: 1.3 }, 0.48)
      .fromTo(dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, transformOrigin: "left" }, 0.85)
      .fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 }, 0.75)
      .fromTo(numRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 }, 0.8)
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }, 1.1)
      .fromTo(marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 }, 0.9)

    // Marquee
    const inner = marqueeRef.current?.querySelector(".marquee-inner")
    if (inner) {
      gsap.to(inner, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      })
    }

    // Tick on vertical line
    gsap.to(tickRef.current, {
      y: "80%",
      duration: 3.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Scroll line pulse
    gsap.to(scrollRef.current?.querySelector(".scroll-line"), {
      scaleY: 0.2,
      repeat: -1,
      yoyo: true,
      duration: 1.6,
      ease: "sine.inOut",
      transformOrigin: "top center",
    })
  }, [])

  const mono = { fontFamily: "'Geist Mono', monospace", fontWeight: 300 }

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#0b1a3d",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#0d1f4a"
          color2="#256cd0"
          color3="#08142e"
          timeSpeed={0.6}
          colorBalance={0}
          warpStrength={1.2}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.2}
          rotationAmount={500}
          noiseScale={2.5}
          grainAmount={0.06}
          grainScale={1}
          grainAnimated
          contrast={1.6}
          gamma={1}
          saturation={0.6}
          centerX={0}
          centerY={0}
          zoom={0.75}
        />
      </div>

      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
      }} />

      {/* Vertical rule — left */}
      <div style={{
        position: "absolute",
        left: "clamp(1.25rem, 4vw, 3.5rem)",
        top: "18%", bottom: "18%",
        width: "1px",
        background: "rgba(255,255,255,0.07)",
        zIndex: 5,
        overflow: "hidden",
      }}>
        <div ref={tickRef} style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "25%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)",
        }} />
      </div>

      {/* Meta — top right */}
      <div ref={metaRef} className="hidden md:flex" style={{
        position: "absolute",
        top: "calc(72px + 1.5rem)",
        right: "clamp(1.25rem, 4vw, 3.5rem)",
        zIndex: 10,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.35rem",
      }}>
        {["41°22'N / 2°10'E", "BCN — 2026"].map((txt, i) => (
          <span key={i} style={{
            ...mono,
            fontSize: "0.475rem",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.28)",
            textTransform: "uppercase",
          }}>{txt}</span>
        ))}
      </div>

      {/* Project count — bottom left */}
      <div ref={numRef} style={{
        position: "absolute",
        left: "clamp(1.25rem, 4vw, 3.5rem)",
        bottom: "clamp(5rem, 10vh, 8rem)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.25rem",
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1,
          letterSpacing: "0.04em",
        }}>3</span>
        <span style={{
          ...mono,
          fontSize: "0.42rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}>Projects</span>
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: "relative",
        zIndex: 10,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "calc(72px + 3rem) clamp(1.25rem, 6vw, 5rem) 2rem",
      }}>

        {/* Eyebrow */}
        <p ref={tagRef} style={{
          ...mono,
          fontSize: "clamp(0.5rem, 1.1vw, 0.6rem)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          margin: "0 0 clamp(1.2rem, 3vh, 2.5rem) 0",
        }}>
          Web Developer — Portfolio 2026 ©
        </p>

        {/* Name — 2 lines, full, centrat */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <h1 ref={line1Ref} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 19vw, 14rem)",
              lineHeight: 0.87,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.97)",
              margin: 0,
            }}>BIEL DIAZ</h1>
          </div>

          <div style={{ overflow: "hidden", marginTop: "0.04em" }}>
            <h1 ref={line2Ref} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 19vw, 14rem)",
              lineHeight: 0.87,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.97)",
              margin: 0,
            }}>BASULLAS</h1>
          </div>
        </div>

        {/* Hairline + rol */}
        <div style={{
          marginTop: "clamp(1.5rem, 4vh, 3rem)",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}>
          <div ref={dividerRef} style={{
            width: "2.5rem",
            height: "1px",
            background: "rgba(255,255,255,0.35)",
            flexShrink: 0,
          }} />
          <span style={{
            ...mono,
            fontSize: "clamp(0.5rem, 1.1vw, 0.6rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}>
            Creative Developer & UI Designer
          </span>
        </div>
      </div>

      {/* ── Marquee band ── */}
      <div ref={marqueeRef} style={{
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "0.65rem 0",
      }}>
        <div className="marquee-inner" style={{
          display: "flex",
          width: "200%",
          willChange: "transform",
        }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              ...mono,
              fontSize: "0.48rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              whiteSpace: "nowrap",
              padding: "0 2rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}>
              {item}
              <span style={{
                display: "inline-block",
                width: "3px", height: "3px",
                borderRadius: "50%",
                background: "#256cd0",
                opacity: 0.65,
                flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator — bottom right ── */}
      <div ref={scrollRef} style={{
        position: "absolute",
        bottom: "2.5rem",
        right: "clamp(1.25rem, 4vw, 3.5rem)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
      }}>
        <div className="scroll-line" style={{
          width: "1px",
          height: "2.5rem",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))",
          transformOrigin: "top center",
        }} />
        <span style={{
          ...mono,
          fontSize: "0.4375rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          writingMode: "vertical-rl",
        }}>scroll</span>
      </div>

    </section>
  )
}