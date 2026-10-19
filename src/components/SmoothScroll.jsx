'use client'

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { setLenis } from "@/lib/lenis"

// ── SmoothScroll ──────────────────────────────────────────────────
// Scroll suau amb Lenis, sincronitzat amb el ticker de GSAP perquè
// ScrollTrigger calculi sobre la mateixa posició.
// No s'activa si l'usuari té prefers-reduced-motion: reduce.

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: 0 },
    })
    setLenis(lenis)
    if (document.documentElement.classList.contains("intro-active")) lenis.stop()

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
