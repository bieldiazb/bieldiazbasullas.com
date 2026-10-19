'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { useReveal } from "@/lib/useReveal"
import { PROJECT_IMAGES } from "@/assets/projects"
import SectionLabel from "@/components/SectionLabel"

const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")

// ── ProjectLinks ──────────────────────────────────────────────────
// demo → píndola blanca · site → enllaç al domini · visit → píndola blanca
function ProjectLinks({ links, t }) {
  const newTab = <span className="sr-only">{t("projects.newTab")}</span>
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {links.map(({ kind, url }) => kind === "site" ? (
        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1 text-white" translate="no">
          {domainOf(url)}
          <ArrowUpRight aria-hidden size={14} />
          {newTab}
        </a>
      ) : (
        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark">
          {kind === "demo" ? t("projects.demo") : t("projects.visit")}
          <ArrowUpRight aria-hidden size={16} />
          {newTab}
        </a>
      ))}
    </div>
  )
}

// ── Projects ──────────────────────────────────────────────────────
// Franja fosca a sang que entra com un panell i s'expandeix fins a tota
// l'amplada. Cada projecte és un cas: títol gran, imatge amb parallax
// suau i, al costat, la fitxa (tipus, any, estat), què inclou i accions.

export default function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const contentRef = useReveal()

  const items = t("projects.items", { returnObjects: true })
  const projects = Array.isArray(items) ? items : []
  const labels = t("projects.labels", { returnObjects: true })

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // El fons fosc creix fins a ocupar tota l'amplada
      gsap.fromTo(stageRef.current, { scale: 0.94 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top top", scrub: true },
      })

      sectionRef.current.querySelectorAll("[data-project]").forEach((card) => {
        const frame = card.querySelector("[data-frame]")
        const img = card.querySelector("img")
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%", once: true } })
          .from(frame, { opacity: 0, y: 48, duration: 1.1, ease: "expo.out" })
          .from(img, { scale: 1.1, duration: 1.6, ease: "expo.out" }, 0)
          .from(card.querySelectorAll("[data-text]"), { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 }, 0.2)
        gsap.fromTo(img.parentElement, { yPercent: -5 }, {
          yPercent: 5, ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [projects.length])

  return (
    <section ref={sectionRef} id="projects" aria-labelledby="projects-title" className="on-dark relative bg-canvas">
      <div ref={stageRef} aria-hidden className="absolute inset-0 origin-top rounded-lg bg-scrim" />

      <div ref={contentRef} className="container-page relative py-24 text-white md:py-36">
        {/* ── Capçalera ── */}
        <div className="max-w-[760px]">
          <SectionLabel index="02" data-reveal className="text-white/60">{t("projects.eyebrow")}</SectionLabel>
          <h2 data-split id="projects-title" className="t-display mt-5">{t("projects.title")}</h2>
          <p data-reveal className="t-subtitle mt-6 max-w-[46ch] text-white/70">{t("projects.intro")}</p>
        </div>

        {/* ── Casos ── */}
        <ol className="mt-20 space-y-24 md:mt-28 md:space-y-36">
          {projects.map((p, i) => {
            const primary = p.links?.find(l => l.kind !== "site") ?? p.links?.[0]
            return (
              <li key={p.id}>
                <article id={`project-${p.id}`} data-project aria-labelledby={`project-${p.id}-title`}>
                  {/* Fila superior: índex, tipus i any, estat */}
                  <div data-text className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5">
                    <p className="t-meta flex gap-4 text-white/60">
                      <span className="index text-white">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p.category}</span>
                      <span className="index">{p.year}</span>
                    </p>
                    {p.status && (
                      <p className="t-meta inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-white">
                        <span aria-hidden className="size-1.5 rounded-full bg-white" />
                        {p.status}
                      </p>
                    )}
                  </div>

                  <h3
                    id={`project-${p.id}-title`}
                    data-text
                    className="mt-6 font-normal leading-[0.95] tracking-[-0.035em]"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
                  >
                    {p.title}
                  </h3>

                  <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
                    {/* ── Imatge (el mateix enllaç que l'acció principal; fora de l'ordre de tabulació) ── */}
                    <a
                      href={primary?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      data-frame
                      data-cursor={t("projects.view")}
                      className="block aspect-video overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10 md:col-span-8"
                    >
                      <span className="block h-[110%] -translate-y-[5%]">
                        <img
                          src={PROJECT_IMAGES[p.id]}
                          alt={p.alt}
                          width="1280" height="720"
                          loading="lazy" decoding="async"
                          className="size-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                        />
                      </span>
                    </a>

                    {/* ── Fitxa ── */}
                    <div className="flex flex-col md:col-span-4">
                      <p data-text className="t-body text-white/75">{p.description}</p>

                      {Array.isArray(p.features) && (
                        <div data-text className="mt-8">
                          <p className="t-meta text-white/60">{p.featuresLabel}</p>
                          <ul className="mt-3">
                            {p.features.map(f => (
                              <li key={f} className="border-t border-white/10 py-2.5 text-[0.875rem] leading-[1.4] text-white/85">{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div data-text className="mt-8">
                        <p className="sr-only">{labels.tags}</p>
                        <ul className="flex flex-wrap gap-2">
                          {p.tags.map(tag => (
                            <li key={tag} className="t-meta rounded-full border border-white/20 px-3 py-1.5 text-white/75">{tag}</li>
                          ))}
                        </ul>
                      </div>

                      <div data-text className="mt-8 md:mt-auto md:pt-10">
                        <ProjectLinks links={p.links ?? []} t={t} />
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
