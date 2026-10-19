'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "@/lib/gsap"
import { PROJECT_IMAGES } from "@/assets/projects"
import { introDone } from "@/lib/intro"

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
    let alive = true
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrada: les paraules del títol pugen dins la seva màscara.
      // Queda en pausa fins que el loader comença a retirar-se.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
      tl.from(rootRef.current.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.1, stagger: 0.045 })
        .from(rootRef.current.querySelectorAll("[data-fade]"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(stripRef.current.children, { y: 40, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.7")
      introDone.then(() => { if (alive) tl.play() })

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
    return () => { alive = false; mm.revert() }
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
          <ul ref={stripRef} className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 [&>li:nth-child(n+5)]:hidden md:[&>li:nth-child(n+5)]:block">
            {projects.map((p, i) => (
              <li key={p.id}>
                <a href={`#project-${p.id}`} className="group block">
                  <span className="block aspect-video overflow-hidden rounded-md bg-surface-cool">
                    <img
                      src={PROJECT_IMAGES[p.id]}
                      alt=""
                      width="1280" height="720"
                      fetchPriority={i < 2 ? "high" : "auto"}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="sr-only mt-3 items-baseline justify-between gap-4 text-white md:not-sr-only md:flex">
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
