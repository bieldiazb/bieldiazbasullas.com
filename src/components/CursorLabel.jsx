'use client'

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

// ── CursorLabel ───────────────────────────────────────────────────
// Píndola petita que segueix el cursor per sobre dels elements amb
// [data-cursor="Text"] (les imatges dels projectes). Només amb ratolí
// i sense reduced-motion; el cursor del sistema no s'amaga mai.

export default function CursorLabel() {
  const ref = useRef(null)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const el = ref.current
    const mm = gsap.matchMedia()

    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 })
      const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" })
      const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" })

      let last = null
      // Mostra o amaga segons què hi ha sota el cursor
      const update = (target) => {
        const zone = target?.closest?.("[data-cursor]")
        if (zone) {
          setLabel(zone.dataset.cursor)
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" })
        } else {
          gsap.to(el, { opacity: 0, scale: 0.6, duration: 0.25, ease: "power3.out", overwrite: "auto" })
        }
      }
      const onMove = (e) => {
        last = { x: e.clientX, y: e.clientY }
        x(e.clientX); y(e.clientY)
        update(e.target)
      }
      // Si la pàgina es mou sota un cursor quiet, també cal revisar-ho
      const onScroll = () => { if (last) update(document.elementFromPoint(last.x, last.y)) }

      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("scroll", onScroll)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full bg-white px-4 py-2 text-[0.875rem] font-semibold text-black opacity-0 [@media(pointer:fine)]:block"
    >
      {label}
    </div>
  )
}
