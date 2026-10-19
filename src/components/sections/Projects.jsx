'use client'

import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { useReveal } from "@/lib/useReveal"

// Cada carpeta (i la seva pestanya) té el seu to de paper
const BANDS = ["bg-paper", "bg-paper-2", "bg-paper-3"]

// Pestanya amb espatlles tallades
const TAB_SHAPE = "polygon(0 100%, 14px 0, calc(100% - 14px) 0, 100% 100%)"

// ── Projects ──────────────────────────────────────────────────────
// Els projectes arxivats com a carpetes: a l'escriptori s'apilen amb
// position: sticky mentre es fa scroll, deixant veure la pestanya de
// cada una. Al mòbil van en flux normal.

export default function Projects() {
  const { t } = useTranslation()
  const ref = useReveal()

  const items = t("projects.items", { returnObjects: true })
  const projects = Array.isArray(items) ? items : []
  const labels = t("projects.labels", { returnObjects: true })

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-3 pb-24 md:pb-40">
      <div ref={ref} className="mx-auto max-w-[1200px]">
        <h2
          id="projects-title"
          data-reveal
          className="mb-10 font-serif leading-none text-on-ground"
          style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
        >
          {t("projects.title")}
        </h2>

        <ol className="space-y-6 md:space-y-0">
          {projects.map((p, i) => {
            const domain = p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
            return (
              <li
                key={p.url}
                className="md:sticky"
                style={{ top: `calc(var(--header-h) + 16px + ${i * 56}px)` }}
              >
                <article aria-labelledby={`project-${i}`} className="relative md:pt-[44px]">
                  {/* ── Pestanya ── al mòbil va en flux; a l'escriptori surt per sobre de la carpeta */}
                  <p
                    className={`${BANDS[i % BANDS.length]} relative flex w-fit min-h-[44px] items-center gap-3 px-7 py-2 text-[0.9375rem] text-ink md:absolute md:top-0 md:left-[var(--tab-x)]`}
                    style={{ clipPath: TAB_SHAPE, "--tab-x": `calc(${i} * min(240px, 20vw))` }}
                  >
                    <span className="font-medium">{p.category}</span>
                    <span aria-hidden className="inline-block size-2 rotate-45 bg-stamp" />
                    <span className="[font-variant-numeric:tabular-nums]">{p.year}</span>
                  </p>

                  {/* ── Carpeta ── */}
                  <div className={`${BANDS[i % BANDS.length]} -mt-px flex flex-col gap-10 px-5 py-8 md:min-h-[60svh] md:px-10 md:py-12`}>
                    <div className="grid gap-8 md:grid-cols-12">
                      <h3
                        id={`project-${i}`}
                        data-reveal
                        className="font-serif leading-[0.95] text-ink md:col-span-8"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", textWrap: "balance" }}
                      >
                        {p.title}
                      </h3>

                      <div data-reveal className="md:col-span-4">
                        <p className="text-[1.0625rem] text-ink">{p.description}</p>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn mt-6"
                        >
                          {t("projects.visit")}
                          <ArrowUpRight aria-hidden size={18} />
                          <span className="sr-only">{t("projects.newTab")}</span>
                        </a>
                      </div>
                    </div>

                    <dl data-reveal className="mt-auto flex flex-wrap items-end gap-x-12 gap-y-6">
                      <div>
                        <dt className="text-[0.875rem] text-ink-soft">{labels.tools}</dt>
                        <dd className="mt-2 flex flex-wrap gap-1.5">
                          {p.tags.map(tag => (
                            <span key={tag} className="bg-ground px-3 py-1.5 text-[0.875rem] text-on-ground">{tag}</span>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.875rem] text-ink-soft">{labels.site}</dt>
                        <dd className="mt-1 break-words text-[1.25rem] text-ink" translate="no">{domain}</dd>
                      </div>
                    </dl>
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
