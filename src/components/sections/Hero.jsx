'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"
import { PROJECT_IMAGES } from "@/assets/projects"

// ── Hero ──────────────────────────────────────────────────────────
// Panell fosc a sang (DESIGN.md hero-photo): etiqueta, títol gran, una
// frase i les dues accions. A sota, la feina recent com a imatge.

export default function Hero() {
  const { t } = useTranslation()
  const rootRef  = useRef(null)
  const textRef  = useRef(null)
  const stripRef = useRef(null)

  const title = t("hero.title")
  const items = t("projects.items", { returnObjects: true })
  const projects = Array.isArray(items) ? items : []

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrada: les paraules del títol pugen dins la seva màscara
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      tl.from(rootRef.current.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.1, stagger: 0.045 })
        .from(rootRef.current.querySelectorAll("[data-fade]"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(stripRef.current.children, { y: 40, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.7")

      // Sortida: el text puja i s'esvaeix; la tira va més lenta (parallax)
      gsap.to(textRef.current, {
        y: -80, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(stripRef.current, {
        y: -40, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      })
    })
    return () => mm.revert()
  }, [title])

  return (
    <section
      id="home"
      ref={rootRef}
      aria-labelledby="hero-title"
      className="on-dark overflow-hidden bg-scrim pb-12 pt-[calc(var(--header-h)+4rem)] text-white md:pb-16 md:pt-[calc(var(--header-h)+6rem)]"
    >
      <div className="container-page">
        <div ref={textRef} className="max-w-[1100px]">
          <p data-fade className="t-eyebrow text-white/70">{t("hero.eyebrow")}</p>

          <h1 id="hero-title" className="t-hero mt-6" style={{ textWrap: "balance" }}>
            {title.split(" ").map((word, i) => (
              <span key={i}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                  <span data-word className="inline-block">{word}</span>
                </span>{" "}
              </span>
            ))}
          </h1>

          <p data-fade className="t-subtitle mt-8 max-w-[46ch] text-white/80">{t("hero.lead")}</p>

          <div data-fade className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-on-dark">{t("hero.primary")}</a>
            <a href="#projects" className="btn btn-ghost-dark">{t("hero.secondary")}</a>
          </div>
        </div>

        {/* ── Feina recent ── */}
        <div className="mt-16 md:mt-24">
          <p data-fade className="t-meta text-white/60">{t("hero.workLabel")}</p>
          <ul ref={stripRef} className="mt-4 grid grid-cols-[repeat(3,minmax(240px,1fr))] gap-4 overflow-x-auto pb-2 md:grid-cols-3 md:overflow-visible md:pb-0">
            {projects.map((p) => (
              <li key={p.id}>
                <a href={`#project-${p.id}`} className="group block">
                  <span className="block aspect-video overflow-hidden rounded-md bg-surface-cool">
                    <img
                      src={PROJECT_IMAGES[p.id]}
                      alt=""
                      width="1280" height="720"
                      fetchPriority="high"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-4 text-white">
                    <span className="text-[0.875rem] font-semibold">{p.title}</span>
                    <span className="t-meta shrink-0 text-white/60 [font-variant-numeric:tabular-nums]">{p.year}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
