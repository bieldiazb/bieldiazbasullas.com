'use client'

import { useEffect, useRef, useId } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"
import { Corners } from "@/components/paper/Scallops"

// ── Stamp ─────────────────────────────────────────────────────────
// Segell vermell del full: text en cercle i el monograma al centre.
function Stamp({ text }) {
  const id = useId()
  const label = `${text} · ${text} · `
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden className="block">
      <circle cx="60" cy="60" r="58" fill="var(--accent)" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="var(--on-accent)" strokeWidth="2" />
      <defs>
        <path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
      </defs>
      <text fill="var(--on-accent)" fontSize="11.5" fontWeight="600" letterSpacing="1.2" style={{ fontFamily: "Inter, sans-serif" }}>
        <textPath href={`#${id}`} textLength="268">{label.toUpperCase()}</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fill="var(--on-accent)" fontSize="24" fontStyle="italic" style={{ fontFamily: "'Instrument Serif', serif" }}>bdb</text>
    </svg>
  )
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const cardRef  = useRef(null)
  const stampRef = useRef(null)

  const fields = t("hero.fields", { returnObjects: true })
  const today = new Intl.DateTimeFormat(i18n.resolvedLanguage || "ca", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date())

  // ── Entrada: el full puja, les línies entren i el segell es pica ──
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      tl.from(cardRef.current, { y: 120, opacity: 0, duration: 1.2 })
        .from(cardRef.current.querySelectorAll("[data-line]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(stampRef.current, { scale: 1.6, rotation: -24, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
    })
    return () => mm.revert()
  }, [])

  const NAV = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"),    href: "#about"    },
  ]

  return (
    <section id="home" aria-labelledby="hero-title" className="px-3 pt-[96px] md:pt-[190px]">
      <div
        ref={cardRef}
        className="paper relative mx-auto flex w-full max-w-[680px] flex-col md:w-1/2"
        style={{ aspectRatio: "5 / 7" }}
      >
        <Corners />

        <div className="flex flex-1 flex-col px-6 pb-12 pt-14 text-center md:px-14">

          {/* ── Nom ── */}
          <h1
            id="hero-title"
            className="font-serif italic leading-[0.95] text-ink"
            style={{ fontSize: "clamp(3rem, 12vw, 5.5rem)" }}
          >
            <span data-line className="block md:-translate-x-[8%]">{t("hero.nameLine1")}</span>
            <span data-line className="block md:translate-x-[8%]">{t("hero.nameLine2")}</span>
          </h1>

          <p data-line className="mx-auto mt-8 max-w-[34ch] text-[1.25rem] leading-snug text-ink">
            {t("hero.lead")}
          </p>

          {/* ── Dades del full ── */}
          <p data-line className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.9375rem] text-ink-soft">
            <span>{t("hero.sheet")}</span>
            <span aria-hidden className="inline-block size-2.5 rotate-45 bg-stamp" />
            <span>{t("hero.place")}</span>
            <span aria-hidden className="inline-block size-2.5 rotate-45 bg-stamp" />
            <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
          </p>

          {/* ── Camps ── */}
          <dl data-line className="mx-auto mt-12 w-full max-w-[420px] text-left">
            {Array.isArray(fields) && fields.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-4 bg-paper-2 px-4 py-3 [&+&]:mt-1.5">
                <dt className="w-[4.5rem] shrink-0 text-[0.875rem] text-ink-soft">{label}</dt>
                <dd className="text-[1rem] font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          {/* ── Signatura + segell ── */}
          <div data-line className="mx-auto mt-auto flex w-full max-w-[420px] items-end justify-between pt-10">
            <p className="text-left">
              <span className="block text-[0.875rem] text-ink-soft">{t("hero.signed")}</span>
              <span className="font-serif text-[2.5rem] italic leading-none text-ink" translate="no">{t("hero.signature")}</span>
            </p>
            <div ref={stampRef} className="-rotate-[8deg]">
              <Stamp text={t("hero.stamp")} />
            </div>
          </div>

          {/* ── Enllaços (mòbil) a la part baixa del full ── */}
          <nav aria-label={t("nav.main")} className="pt-12 md:hidden">
            <ul className="flex justify-center gap-6 text-[1rem]">
              {NAV.map(({ label, href }) => (
                <li key={href}><a href={href} className="link">{label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
