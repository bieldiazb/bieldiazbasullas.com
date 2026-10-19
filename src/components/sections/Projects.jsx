'use client'

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight, Lock } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { PROJECT_IMAGES } from "@/assets/projects"

// ── Projects ──────────────────────────────────────────────────────
// Fitxes amb la captura a l'esquerra (16:9) i el text a la dreta
// (DESIGN.md research-card). La captura entra amb una escala suau i
// es mou una mica per dins mentre es fa scroll.

export default function Projects() {
  const { t } = useTranslation()
  const rootRef = useRef(null)

  const items = t("projects.items", { returnObjects: true })
  const projects = Array.isArray(items) ? items : []

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current
      gsap.from(root.querySelectorAll("[data-head]"), {
        y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      })
      root.querySelectorAll("[data-project]").forEach((card) => {
        const frame = card.querySelector("[data-frame]")
        const img = card.querySelector("img")
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } })
          .from(frame, { opacity: 0, y: 40, duration: 1, ease: "expo.out" })
          .from(img, { scale: 1.08, duration: 1.4, ease: "expo.out" }, 0)
          .from(card.querySelectorAll("[data-text]"), { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.07 }, 0.15)
        // Parallax suau dins el marc
        gsap.fromTo(img.parentElement, { yPercent: -4 }, {
          yPercent: 4, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [projects.length])

  return (
    <section ref={rootRef} id="projects" aria-labelledby="projects-title" className="bg-canvas pb-24 md:pb-32">
      <div className="container-page">
        <div className="border-t border-hairline-soft pt-24 md:pt-32">
          <div className="max-w-[640px]">
            <p data-head className="t-eyebrow text-slate">{t("projects.eyebrow")}</p>
            <h2 data-head id="projects-title" className="t-display mt-4 text-ink">{t("projects.title")}</h2>
            <p data-head className="t-subtitle mt-6 text-graphite">{t("projects.intro")}</p>
          </div>
        </div>

        <ul className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {projects.map((p) => (
            <li key={p.id}>
              <article id={`project-${p.id}`} data-project aria-labelledby={`project-${p.id}-title`} className="grid gap-8 md:grid-cols-12 md:gap-12">
                {/* ── Captura ── */}
                <div data-frame className="aspect-video overflow-hidden rounded-md bg-surface-cool md:col-span-7">
                  <div className="h-[108%] -translate-y-[4%]">
                    <img
                      src={PROJECT_IMAGES[p.id]}
                      alt={p.alt}
                      width="1280" height="720"
                      loading="lazy" decoding="async"
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* ── Text ── */}
                <div className="flex flex-col md:col-span-5 md:py-2">
                  <p data-text className="t-meta text-slate">
                    <span className="[font-variant-numeric:tabular-nums]">{p.year}</span> · {p.category}
                  </p>
                  <h3 data-text id={`project-${p.id}-title`} className="t-heading mt-3 text-ink" style={{ textWrap: "balance" }}>
                    {p.title}
                  </h3>
                  <p data-text className="t-body mt-5 max-w-[48ch] text-graphite">{p.description}</p>

                  <div data-text className="mt-6">
                    <p className="sr-only">{t("projects.tools")}</p>
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map(tag => (
                        <li key={tag} className="t-meta rounded-full border border-hairline-soft px-3 py-1.5 text-slate">{tag}</li>
                      ))}
                    </ul>
                  </div>

                  <div data-text className="mt-8 md:mt-auto md:pt-8">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        {t("projects.visit")}
                        <ArrowUpRight aria-hidden size={16} />
                        <span className="sr-only">{t("projects.newTab")}</span>
                      </a>
                    ) : (
                      <p className="t-meta inline-flex items-center gap-2 text-slate">
                        <Lock aria-hidden size={14} />
                        {p.access}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
