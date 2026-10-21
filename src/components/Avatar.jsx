import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

// ── Avatar ────────────────────────────────────────────────────────
// La il·lustració del Biel com a personatge de la marca. Gira el cap
// lleugerament cap al cursor (només amb ratolí i sense reduced-motion).
//
// Props:
//   tone  — "light" (traç negre, fons clar) | "dark" (traç blanc, fons fosc)
//   size  — amplada en px
//   alt   — text alternatiu ("" si és decoratiu)

export default function Avatar({ tone = "light", size = 160, alt = "", className = "" }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const mm = gsap.matchMedia()
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rot = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" })
      const x   = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" })
      const y   = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" })

      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        // Distància normalitzada del cursor al centre de l'avatar (-1..1)
        const dx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2))
        const dy = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2))
        rot(dx * 8)
        x(dx * size * 0.04)
        y(dy * size * 0.03)
      }
      window.addEventListener("pointermove", onMove, { passive: true })
      return () => window.removeEventListener("pointermove", onMove)
    })
    return () => mm.revert()
  }, [size])

  return (
    <img
      ref={ref}
      src={tone === "dark" ? "/avatar-dark.svg" : "/avatar-light.svg"}
      alt={alt}
      width={size}
      height={Math.round(size * 1.16)}
      loading="lazy"
      decoding="async"
      className={`block origin-bottom select-none ${className}`}
      draggable={false}
    />
  )
}
