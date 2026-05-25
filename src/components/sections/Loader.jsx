import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function Loader({ onFinish }) {
  const overlayTopRef  = useRef(null)
  const overlayBotRef  = useRef(null)
  const nameRef        = useRef(null)
  const barRef         = useRef(null)
  const labelRef       = useRef(null)
  const numRef         = useRef(null)
  const cursorRef      = useRef(null)
  const dotsRef        = useRef(null)
  const grainRef       = useRef(null)

  useEffect(() => {
    const finish = () => {
      document.body.classList.remove("reveal")
      onFinish()
    }

    const safety = setTimeout(finish, 6000)
    document.body.classList.add("reveal")

    // ── Grain canvas ────────────────────────────────────
    const canvas = grainRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      let frame = 0
      const drawGrain = () => {
        frame++
        if (frame % 2 !== 0) { requestAnimationFrame(drawGrain); return }
        const img = ctx.createImageData(canvas.width, canvas.height)
        for (let i = 0; i < img.data.length; i += 4) {
          const v = (Math.random() * 255) | 0
          img.data[i]     = v
          img.data[i + 1] = v
          img.data[i + 2] = v
          img.data[i + 3] = 18
        }
        ctx.putImageData(img, 0, 0)
        grainRAF = requestAnimationFrame(drawGrain)
      }
      var grainRAF = requestAnimationFrame(drawGrain)
    }

    // ── Scramble name ───────────────────────────────────
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const FULL  = "BIEL DIAZ\nBASULLAS"
    const el    = nameRef.current
    let scrambleInterval
    if (el) {
      let iteration = 0
      const total = FULL.replace("\n", "").length
      scrambleInterval = setInterval(() => {
        el.innerHTML = FULL
          .split("")
          .map((char, i) => {
            if (char === "\n") return "<br/>"
            if (i < iteration) return char
            return `<span style="opacity:0.35">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`
          })
          .join("")
        iteration += 0.8
        if (iteration >= total + 2) clearInterval(scrambleInterval)
      }, 40)
    }

    // ── Dots animation ──────────────────────────────────
    const dotStates = ["", ".", "..", "..."]
    let dotIdx = 0
    const dotsInterval = setInterval(() => {
      if (dotsRef.current) {
        dotsRef.current.textContent = dotStates[dotIdx % 4]
        dotIdx++
      }
    }, 320)

    // ── Cursor blink ────────────────────────────────────
    const cursorInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0"
      }
    }, 530)

    // ── Counter ─────────────────────────────────────────
    const obj = { val: 0 }
    const numTween = gsap.to(obj, {
      val: 100,
      duration: 2.2,
      delay: 0.3,
      ease: "power1.inOut",
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = Math.round(obj.val)
      },
    })

    // ── Main timeline ────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(scrambleInterval)
        clearInterval(dotsInterval)
        clearInterval(cursorInterval)
        if (canvas && grainRAF) cancelAnimationFrame(grainRAF)
        finish()
      }
    })

    tl
      .fromTo(labelRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0)

      .fromTo(nameRef.current,
        { yPercent: 110, skewY: 3 },
        { yPercent: 0, skewY: 0, duration: 1.5, ease: "expo.out" }, 0.15)

      .fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.2, ease: "power2.inOut", transformOrigin: "left" }, 0.3)

      // Split exit: top half up, bottom half down
      .to(overlayTopRef.current,
        { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, 2.7)

      .to(overlayBotRef.current,
        { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, 2.7)

    return () => {
      clearTimeout(safety)
      clearInterval(scrambleInterval)
      clearInterval(dotsInterval)
      clearInterval(cursorInterval)
      if (canvas && typeof grainRAF !== "undefined") cancelAnimationFrame(grainRAF)
      numTween.kill()
      tl.kill()
    }
  }, [onFinish])

  const monoStyle = {
    fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 300,
  }

  const sharedOverlay = {
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 9999,
    background: "hsl(var(--background))",
    overflow: "hidden",
  }

  return (
    <>
      {/* Scan lines */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 10000,
        pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.015) 2px, hsl(var(--foreground) / 0.015) 4px)",
      }} />

      {/* Grain canvas */}
      <canvas ref={grainRef} style={{
        position: "fixed", inset: 0, zIndex: 10001,
        pointerEvents: "none", mixBlendMode: "overlay",
      }} />

      {/* ── TOP HALF ─────────────────────────────────── */}
      <div ref={overlayTopRef} style={{ ...sharedOverlay, top: 0, height: "50%" }}>
        <div style={{
          position: "absolute", inset: 0,
          padding: "clamp(1.25rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          {/* Top label row */}
          <div ref={labelRef} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{
              ...monoStyle,
              fontSize: "0.5rem",
              color: "hsl(var(--muted-foreground))",
            }}>
              Portfolio — 2026
            </span>
            <span style={{
              ...monoStyle,
              fontSize: "0.5rem",
              color: "hsl(var(--muted-foreground))",
              opacity: 0.4,
            }}>
              BCN / ES
            </span>
          </div>

          {/* Name — sits at the bottom of the top half */}
          <div style={{ overflow: "hidden", marginTop: "auto" }}>
            <h1
              ref={nameRef}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 18vw, 13rem)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                color: "hsl(var(--foreground))",
                margin: 0,
                willChange: "transform",
              }}
            >
              BIEL DIAZ<br />BASULLAS
            </h1>
          </div>
        </div>
      </div>

      {/* ── BOTTOM HALF ──────────────────────────────── */}
      <div ref={overlayBotRef} style={{ ...sharedOverlay, bottom: 0, height: "50%" }}>
        {/* Hairline separator */}
        <div style={{
          position: "absolute",
          top: 0, left: "clamp(1.25rem, 5vw, 3rem)", right: "clamp(1.25rem, 5vw, 3rem)",
          height: "1px",
          background: "hsl(var(--border) / 0.25)",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          padding: "clamp(1.25rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "0.75rem",
        }}>
          {/* Progress bar */}
          <div style={{
            height: "1px",
            width: "100%",
            background: "hsl(var(--border) / 0.3)",
            overflow: "hidden",
          }}>
            <div
              ref={barRef}
              style={{
                height: "100%",
                width: "100%",
                background: "hsl(var(--foreground))",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Bottom labels */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{
              ...monoStyle,
              fontSize: "0.475rem",
              color: "hsl(var(--muted-foreground))",
              opacity: 0.4,
            }}>
              Loading<span ref={dotsRef} />
            </span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.25rem",
              letterSpacing: "0.06em",
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "baseline",
              gap: "0.1em",
            }}>
              <span ref={numRef}>0</span>
              <span style={{ opacity: 0.3, fontSize: "0.7rem", fontFamily: "'Geist Mono', monospace" }}>%</span>
              <span ref={cursorRef} style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "hsl(var(--foreground))",
                marginLeft: "2px",
                verticalAlign: "middle",
                opacity: 1,
              }} />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}