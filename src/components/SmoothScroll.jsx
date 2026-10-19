'use client'

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// ── SmoothScroll ──────────────────────────────────────────────────
// Scroll suau amb Lenis, sincronitzat amb el ticker de GSAP perquè
// ScrollTrigger calculi sobre la mateixa posició.
// No s'activa si l'usuari té prefers-reduced-motion: reduce.
//
// Props:
//   paused — atura el scroll (p. ex. mentre es mostra el loader)

export default function SmoothScroll({ paused = false }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    })
    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [paused])

  return null
}
