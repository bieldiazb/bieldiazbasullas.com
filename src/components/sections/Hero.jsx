'use client'

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Pause, Play } from "lucide-react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { PROJECT_IMAGES } from "@/assets/projects"
import { introDone } from "@/lib/intro"
import Clock from "@/components/Clock"

const SLIDE_SECONDS = 5

// ── Showcase ──────────────────────────────────────────────────────
// Passi de la feina recent: un marc gran amb la imatge de cada projecte
// i, a sota, l'índex amb una barra de progrés al projecte actiu.
// Es pot pausar, triar un projecte i s'atura sol quan no es veu.
// Amb reduced-motion no avança sol.

function Showcase({ projects, t }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [auto, setAuto]     = useState(false)
  const rootRef  = useRef(null)
  const tweenRef = useRef(null)
  const total = projects.length

  // Autoplay només sense reduced-motion i quan el loader ja ha acabat
  useEffect(() => {
    let alive = true
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduce) introDone.then(() => { if (alive) setAuto(true) })

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => setHidden(!self.isActive),
    })
    return () => { alive = false; st.kill() }
  }, [])

  // Barra de progrés del projecte actiu; en acabar, passa al següent
  useEffect(() => {
    const bars = rootRef.current.querySelectorAll("[data-bar]")
    gsap.set(bars, { scaleX: 0 })
    if (!auto) { gsap.set(bars[active], { scaleX: 1 }); return }

    tweenRef.current = gsap.fromTo(bars[active], { scaleX: 0 }, {
      scaleX: 1, duration: SLIDE_SECONDS, ease: "none",
      onComplete: () => setActive(a => (a + 1) % total),
    })
    return () => tweenRef.current?.kill()
  }, [active, auto, total])

  useEffect(() => {
    tweenRef.current?.paused(paused || hidden)
  }, [paused, hidden, active])

  const current = projects[active]
  if (!current) return null

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label={t("hero.workLabel")}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => { if (!paused && !hidden) tweenRef.current?.resume() }}
    >
      {/* ── Capçalera del passi ── */}
      <div className="flex items-center justify-between gap-4">
        <p className="t-meta text-white/60">{t("hero.workLabel")}</p>
        <div className="flex items-center gap-3">
          <p className="t-meta index text-white/60" aria-hidden>
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </p>
          {auto && (
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              aria-label={paused ? t("hero.play") : t("hero.pause")}
              className="grid size-10 place-items-center rounded-full border border-white/25 text-white hover:border-white"
            >
              {paused ? <Play aria-hidden size={14} /> : <Pause aria-hidden size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* ── Marc ── */}
      <a
        href={`#project-${current.id}`}
        data-cursor={t("projects.view")}
        className="relative mt-4 block aspect-[40/21] overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10"
      >
        <span className="sr-only">{current.title}</span>
        {projects.map((p, i) => (
          <img
            key={p.id}
            src={PROJECT_IMAGES[p.id]}
            alt=""
            width="1200" height="630"
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </a>

      {/* Anunci per a lectors de pantalla (només quan no avança sol) */}
      <p className="sr-only" aria-live={auto && !paused ? "off" : "polite"}>
        {t("hero.slide", { n: active + 1, total })}: {current.title}
      </p>

      {/* ── Índex ── */}
      <ol className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className="group block w-full pb-1 pt-2 text-left"
            >
              <span className="relative block h-px bg-white/20">
                <span data-bar aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-spot" />
              </span>
              <span className={`t-meta mt-2.5 block truncate ${i === active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                <span className="sr-only sm:not-sr-only sm:block sm:truncate">{p.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      {/* Al mòbil els noms no hi caben: es mostra només l'actiu */}
      <p className="t-meta mt-1 text-white sm:hidden" aria-hidden>{current.title}</p>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────
// Panell fosc a sang (DESIGN.md hero-photo): a l'esquerra l'etiqueta, el
// títol gran, la frase i les accions; a la dreta el passi de la feina
// recent. A baix, una fila de dades com un programa de festival.

export default function Hero() {
  const { t, i18n } = useTranslation()
  const rootRef  = useRef(null)
  const textRef  = useRef(null)
  const showRef  = useRef(null)

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
      tl.from(rootRef.current.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.1, stagger: 0.05 })
        .from(rootRef.current.querySelectorAll("[data-fade]"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(showRef.current, { y: 40, opacity: 0, duration: 1.1 }, "-=0.9")
        .from(rootRef.current.querySelectorAll("[data-meta]"), { y: 12, opacity: 0, duration: 0.8, stagger: 0.06 }, "-=0.7")
      introDone.then(() => { if (alive) tl.play() })

      // Sortida: el text puja i s'esvaeix; el passi va més lent (parallax)
      gsap.to(textRef.current, {
        y: -80, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(showRef.current, {
        y: -40, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      })
    })
    return () => { alive = false; mm.revert() }
  }, [title])

  const META = [
    { label: t("hero.availabilityLabel"), value: (
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="size-1.5 rounded-full bg-spot" />
        {t("hero.availability")}
      </span>
    ) },
    { label: t("hero.placeLabel"), value: (
      <>{t("hero.place")} <Clock lang={i18n.resolvedLanguage || "ca"} className="text-white/60" /></>
    ) },
    { label: t("hero.replyLabel"), value: t("hero.reply") },
  ]

  return (
    <section
      id="home"
      ref={rootRef}
      aria-labelledby="hero-title"
      className="on-dark overflow-hidden bg-scrim pb-10 pt-[calc(var(--header-h)+3.5rem)] text-white md:pb-14 md:pt-[calc(var(--header-h)+5rem)]"
    >
      <div className="container-page">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ── Text ── */}
          <div ref={textRef} className="lg:col-span-6">
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

            <p data-fade className="t-subtitle mt-8 max-w-[44ch] text-white/80">{t("hero.lead")}</p>

            <div data-fade className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-on-dark">{t("hero.primary")}</a>
              <a href="#projects" className="btn btn-ghost-dark">{t("hero.secondary")}</a>
            </div>
          </div>

          {/* ── Passi de la feina ── */}
          <div ref={showRef} className="lg:col-span-6">
            <Showcase projects={projects} t={t} />
          </div>
        </div>

        {/* ── Fila de dades ── */}
        <dl className="mt-16 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-3 md:mt-24">
          {META.map(({ label, value }) => (
            <div key={label} data-meta>
              <dt className="t-meta text-white/50">{label}</dt>
              <dd className="t-body mt-1 text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
