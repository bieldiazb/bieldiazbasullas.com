import { useEffect, useRef } from "react"
import { gsap, SplitText } from "@/lib/gsap"

// ── useReveal ─────────────────────────────────────────────────────
// Entrada de les parts d'una secció quan entra a la pantalla:
//   [data-split]  → el text puja línia a línia dins una màscara
//   [data-reveal] → el bloc puja i apareix, en stagger
// Amb prefers-reduced-motion: reduce no s'anima res i el contingut
// es veu des del principi (mai queda amagat si falla el JS).

export function useReveal({ y = 24, stagger = 0.08, start = "top 80%" } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll("[data-split]").forEach((target) => {
        SplitText.create(target, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 105, duration: 1.1, ease: "expo.out", stagger: 0.09,
            scrollTrigger: { trigger: target, start: "top 88%", toggleActions: "play none none none" },
          }),
        })
      })

      const parts = el.querySelectorAll("[data-reveal]")
      if (parts.length) {
        gsap.from(parts, {
          y, opacity: 0, duration: 0.9, ease: "expo.out", stagger,
          scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        })
      }
    })

    return () => mm.revert()
  }, [y, stagger, start])

  return ref
}
