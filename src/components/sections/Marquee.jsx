'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"

// ── Marquee ───────────────────────────────────────────────────────
// Dues files de text enorme amb els serveis que es desplacen en
// direccions oposades seguint el scroll (scrub): no es mouen soles, així
// que no cal botó de pausa. Decoratiu: el contingut ja és a Serveis.
// Amb reduced-motion queden quietes.

function Row({ items, rowRef, muted }) {
  // El contingut es repeteix perquè la fila sempre ompli l'amplada
  const loop = [...items, ...items, ...items]
  return (
    <div ref={rowRef} className="flex w-max items-center whitespace-nowrap will-change-transform">
      {loop.map((item, i) => (
        <span key={i} className={`flex items-center ${muted ? "text-stone" : "text-ink"}`}>
          <span className="px-[0.35em]">{item}</span>
          <span aria-hidden className="inline-block size-[0.14em] rounded-full bg-current" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const { t } = useTranslation()
  const rootRef = useRef(null)
  const rowA = useRef(null)
  const rowB = useRef(null)

  const items = t("services.items", { returnObjects: true })
  const titles = Array.isArray(items) ? items.map(s => s.title) : []
  const half = Math.ceil(titles.length / 2)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 }
      gsap.fromTo(rowA.current, { xPercent: 0 },   { xPercent: -25, ease: "none", scrollTrigger: st })
      gsap.fromTo(rowB.current, { xPercent: -25 }, { xPercent: 0,   ease: "none", scrollTrigger: st })
    })
    return () => mm.revert()
  }, [])

  if (!titles.length) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="overflow-hidden bg-canvas pb-24 font-normal leading-[1.05] tracking-[-0.04em] md:pb-36"
      style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
    >
      <Row items={titles.slice(0, half)} rowRef={rowA} />
      <div className="-translate-x-[12%]">
        <Row items={titles.slice(half)} rowRef={rowB} muted />
      </div>
    </div>
  )
}
