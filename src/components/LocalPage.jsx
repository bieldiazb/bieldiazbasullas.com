import { useTranslation } from "react-i18next"
import { CONTENT } from "@/seo/meta"
import { pathFor } from "@/lib/routes"
import { useReveal } from "@/lib/useReveal"
import { PROJECT_IMAGES } from "@/assets/projects"
import Avatar from "@/components/Avatar"
import Faq from "@/components/Faq"
import { Breadcrumb, CtaPanel, ServiceList } from "@/components/ServicePage"

// ── LocalPage ─────────────────────────────────────────────────────
// "Disseny web a Manresa i el Bages": pàgina pensada per a les cerques
// locals. Qui soc i on, per què treballar amb algú d'aquí, zona de
// treball, serveis, feina feta i FAQ locals.

export default function LocalPage({ lang }) {
  const { t } = useTranslation()
  const ref = useReveal()
  const c = CONTENT[lang]
  const l = c.local
  const ui = c.ui
  const home = pathFor("home", lang)

  const items = t("projects.items", { returnObjects: true })
  const projects = Array.isArray(items) ? items.slice(0, 4) : []

  return (
    <article ref={ref} className="container-page pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-36 md:pt-[calc(var(--header-h)+4rem)]">
      <Breadcrumb label={t("nav.main")} items={[[ui.home, home], [l.h1, null]]} />

      {/* ── Capçalera ── */}
      <header className="mt-10 grid items-end gap-10 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-9">
          <h1 data-split className="t-hero text-ink">{l.h1}</h1>
          <p data-reveal className="t-subtitle mt-8 max-w-[56ch] text-graphite">{l.intro}</p>
          <a data-reveal href={`${home}#contact`} className="btn btn-primary mt-10">{ui.ctaButton}</a>
        </div>
        <div className="hidden md:col-span-3 md:flex md:justify-end">
          <Avatar size={170} />
        </div>
      </header>

      {/* ── Per què algú d'aquí / Zona ── */}
      <div className="mt-20 grid gap-14 border-t border-hairline-soft pt-14 md:mt-28 md:grid-cols-2 md:gap-12">
        <section data-reveal aria-labelledby="why">
          <h2 id="why" className="t-heading text-ink">{l.whyTitle}</h2>
          <ul className="mt-8 space-y-4">
            {l.why.map(item => (
              <li key={item} className="t-body flex gap-3 text-graphite">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section data-reveal aria-labelledby="areas">
          <h2 id="areas" className="t-heading text-ink">{l.areasTitle}</h2>
          <p className="t-body mt-8 text-graphite">{l.areas}</p>
        </section>
      </div>

      {/* ── Serveis ── */}
      <ServiceList lang={lang} title={l.servicesTitle} />

      {/* ── Feina feta ── */}
      <section aria-labelledby="local-work" className="mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="local-work" className="t-heading text-ink">{t("projects.title")}</h2>
          <a href={`${home}#projects`} className="text-link text-ink">{ui.allProjects}</a>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map(p => (
            <li key={p.id}>
              <a href={`${home}#project-${p.id}`} className="group block">
                <span className="block aspect-[40/21] overflow-hidden rounded-md bg-surface-cool">
                  <img src={PROJECT_IMAGES[p.id]} alt={p.alt} width="1200" height="630" loading="lazy" decoding="async" className="size-full object-cover" />
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="t-title text-ink">{p.title}</span>
                  <span className="t-meta shrink-0 text-slate">{p.category}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Preguntes freqüents ── */}
      <section aria-labelledby="local-faq" className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-12">
        <h2 id="local-faq" className="t-heading text-ink md:col-span-4">{ui.faq}</h2>
        <Faq items={l.faqs} className="md:col-span-8" />
      </section>

      <CtaPanel ui={ui} href={`${home}#contact`} />
    </article>
  )
}
