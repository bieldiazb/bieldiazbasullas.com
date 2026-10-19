import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

// ── useReveal ─────────────────────────────────────────────────────
// Entrada de les parts d'una secció: els fills marcats amb
// [data-reveal] pugen i apareixen en stagger quan la secció entra.
// Amb prefers-reduced-motion: reduce no s'anima res i el contingut
// es veu des del principi (mai queda amagat si falla el JS).

export function useReveal({ y = 24, stagger = 0.08, start = "top 80%" } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const parts = el.querySelectorAll("[data-reveal]")
      if (!parts.length) return
      gsap.from(parts, {
        y, opacity: 0, duration: 0.9, ease: "expo.out", stagger,
        scrollTrigger: { trigger: el, start, once: true },
      })
    })

    return () => mm.revert()
  }, [y, stagger, start])

  return ref
}
