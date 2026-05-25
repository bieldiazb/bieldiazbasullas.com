'use client'

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// ── SectionReveal ─────────────────────────────────────────────────
// Embolcalla qualsevol secció i li aplica un reveal suau en scroll.
//
// Ús:
//   <SectionReveal>
//     <About />
//   </SectionReveal>
//
// Props:
//   y        — distància de desplaçament inicial (default: 40)
//   duration — durada de l'animació en segons (default: 0.9)
//   delay    — retard en segons (default: 0)

export function SectionReveal({ children, y = 40, duration = 0.9, delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    )

    return () => ScrollTrigger.getAll()
      .filter(t => t.vars?.trigger === el)
      .forEach(t => t.kill())
  }, [y, duration, delay])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

// ── useRevealChildren ─────────────────────────────────────────────
// Hook per revelar fills d'un contenidor en stagger.
//
// Ús:
//   const containerRef = useRevealChildren(".reveal-item")
//   <div ref={containerRef}>
//     <p className="reveal-item">Hola</p>
//     <p className="reveal-item">Món</p>
//   </div>

export function useRevealChildren(selector = "*", options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll(selector)
    if (!children.length) return

    gsap.fromTo(children,
      { opacity: 0, y: options.y ?? 24 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.7,
        ease: "expo.out",
        stagger: options.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top 85%",
          once: true,
        },
      }
    )

    return () => ScrollTrigger.getAll()
      .filter(t => t.vars?.trigger === el)
      .forEach(t => t.kill())
  }, [selector])

  return ref
}

// ── Exemple d'ús en App.jsx / layout ──────────────────────────────
//
// import { SectionReveal } from "@/components/SectionReveal"
//
// <SectionReveal><About /></SectionReveal>
// <SectionReveal delay={0.05}><Projects /></SectionReveal>
// <SectionReveal delay={0.05}><Services /></SectionReveal>
// <SectionReveal delay={0.05}><Contact /></SectionReveal>