'use client'

import { useTranslation } from "react-i18next"
import { useReveal } from "@/lib/useReveal"
import { Scallops } from "@/components/paper/Scallops"
import avatarLight from "@/assets/avatarw.png"
import avatarDark  from "@/assets/avatard.png"

const EMAIL = "bieldiazbasullas@proton.me"

// ── About ─────────────────────────────────────────────────────────
// Una carta en primera persona sobre un full, amb una tira per
// arrencar al peu que porta l'email.

export default function About() {
  const { t } = useTranslation()
  const ref = useReveal({ stagger: 0.07 })

  const paragraphs = t("about.paragraphs", { returnObjects: true })

  return (
    <section id="about" aria-labelledby="about-title" className="px-3 pb-24 md:pb-40">
      <div ref={ref} className="mx-auto max-w-[640px]">

        {/* ── Full ── */}
        <div className="paper px-6 pb-12 pt-12 md:px-[60px] md:pb-14 md:pt-14">
          <div data-reveal className="size-11 overflow-hidden rounded-full bg-paper-2">
            <img src={avatarLight} alt={t("about.portraitAlt")} width="44" height="44" loading="lazy" className="size-full object-cover dark:hidden" />
            <img src={avatarDark}  alt={t("about.portraitAlt")} width="44" height="44" loading="lazy" className="hidden size-full object-cover dark:block" />
          </div>

          <h2
            id="about-title"
            data-reveal
            className="mt-7 font-serif leading-tight text-ink"
            style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
          >
            {t("about.greeting")}
          </h2>

          <div className="mt-6 space-y-[1.55em] text-[1.0625rem] leading-[1.55] text-ink">
            {Array.isArray(paragraphs) && paragraphs.map((p, i) => (
              <p key={i} data-reveal>{p}</p>
            ))}
          </div>

          <p data-reveal className="mt-10">
            <span className="block font-serif text-[1.75rem] italic leading-tight text-ink">{t("about.name")}</span>
            <span className="block text-[0.875rem] text-ink-soft">{t("about.role")}</span>
          </p>
        </div>

        {/* ── Tira per arrencar ── */}
        <div className="perforation relative bg-paper-2 px-6 pb-8 pt-5 md:px-[60px]">
          <div className="flex flex-col gap-3 md:min-h-[72px] md:flex-row md:items-center md:justify-between">
            <p className="text-[0.875rem] text-ink-soft">{t("about.stub")}</p>
            <a href={`mailto:${EMAIL}`} className="link break-all text-[1.125rem] font-medium text-ink" translate="no">
              {EMAIL}
            </a>
          </div>
          <Scallops edge="bottom" size={20} />
        </div>
      </div>
    </section>
  )
}
