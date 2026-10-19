'use client'

import { useTranslation } from "react-i18next"
import { useReveal } from "@/lib/useReveal"
import avatar from "@/assets/avatarw.png"

// ── About ─────────────────────────────────────────────────────────
// Etiqueta + títol a l'esquerra, text i xifres a la dreta (5/7).

export default function About() {
  const { t } = useTranslation()
  const ref = useReveal({ stagger: 0.07 })

  const paragraphs = t("about.paragraphs", { returnObjects: true })
  const stats = t("about.stats", { returnObjects: true })

  return (
    <section id="about" aria-labelledby="about-title" className="bg-canvas pb-24 md:pb-32">
      <div className="container-page">
        <div ref={ref} className="grid gap-10 border-t border-hairline-soft pt-24 md:grid-cols-12 md:gap-12 md:pt-32">

          <div className="md:col-span-5">
            <p data-reveal className="t-eyebrow text-slate">{t("about.eyebrow")}</p>
            <h2 data-reveal id="about-title" className="t-display mt-4 text-ink">{t("about.greeting")}</h2>
            <img
              data-reveal
              src={avatar}
              alt={t("about.portraitAlt")}
              width="96" height="96"
              loading="lazy"
              className="mt-10 size-24 rounded-full bg-hairline object-cover"
            />
          </div>

          <div className="md:col-span-7">
            <p data-reveal className="t-subtitle text-ink">{t("about.lead")}</p>
            <div className="mt-6 space-y-4">
              {Array.isArray(paragraphs) && paragraphs.map((p, i) => (
                <p key={i} data-reveal className="t-body max-w-[60ch] text-graphite">{p}</p>
              ))}
            </div>

            {Array.isArray(stats) && (
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-hairline-soft pt-8">
                {stats.map(({ value, label }) => (
                  <div key={label} data-reveal className="flex flex-col-reverse">
                    <dt className="t-meta mt-2 text-slate">{label}</dt>
                    <dd className="t-display text-ink [font-variant-numeric:tabular-nums]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
