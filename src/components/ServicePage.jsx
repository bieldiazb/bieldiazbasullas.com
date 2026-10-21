import { useTranslation } from "react-i18next"
import { ArrowUpRight, Check } from "lucide-react"
import { CONTENT, serviceLinks } from "@/seo/meta"
import { pathFor } from "@/lib/routes"
import { useReveal } from "@/lib/useReveal"
import { PROJECT_IMAGES } from "@/assets/projects"
import Faq from "@/components/Faq"

// ── Peces compartides de les pàgines de servei i la pàgina local ──

export function Breadcrumb({ items, label }) {
  return (
    <nav aria-label={label}>
      <ol className="t-meta flex flex-wrap items-center gap-2 text-slate">
        {items.map(([name, href], i) => (
          <li key={name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {href ? <a href={href} className="hover:text-ink">{name}</a> : <span aria-current="page" className="text-ink">{name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function CtaPanel({ ui, href }) {
  return (
    <aside aria-label={ui.ctaTitle} className="on-dark mt-24 rounded-lg bg-scrim px-6 py-14 text-white md:mt-32 md:px-12 md:py-20">
      <p className="t-display max-w-[20ch]">{ui.ctaTitle}</p>
      <p className="t-subtitle mt-5 max-w-[44ch] text-white/75">{ui.ctaText}</p>
      <a href={href} className="btn btn-on-dark mt-8">{ui.ctaButton}</a>
    </aside>
  )
}

export function ServiceList({ lang, exclude, title }) {
  const links = serviceLinks(lang).filter(s => s.id !== exclude)
  return (
    <section aria-labelledby="other-services" className="mt-24 md:mt-32">
      <h2 id="other-services" className="t-heading text-ink">{title}</h2>
      <ul className="mt-8 grid border-t border-hairline-soft sm:grid-cols-2">
        {links.map(s => (
          <li key={s.id} className="border-b border-hairline-soft">
            <a href={s.path} className="group flex min-h-[64px] items-center justify-between gap-4 py-4 pr-4 text-ink">
              <span className="t-title transition-transform duration-500 ease-out group-hover:translate-x-1.5">{s.title}</span>
              <ArrowUpRight aria-hidden size={18} className="shrink-0 text-slate" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── ServicePage ───────────────────────────────────────────────────
// Una pàgina per servei: ruta, títol i entrada, per a qui és i què
// inclou, com treballo, projecte relacionat, FAQ, altres serveis i
// crida a contactar (amb el servei ja marcat al formulari).

export default function ServicePage({ id, lang }) {
  const { t } = useTranslation()
  const ref = useReveal()
  const c = CONTENT[lang]
  const s = c.services[id]
  const ui = c.ui
  const home = pathFor("home", lang)

  const items = t("projects.items", { returnObjects: true })
  const project = Array.isArray(items) ? items.find(p => p.id === s.related) : null

  return (
    <article ref={ref} className="container-page pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-36 md:pt-[calc(var(--header-h)+4rem)]">
      <Breadcrumb label={t("nav.main")} items={[[ui.home, home], [ui.services, `${home}#services`], [s.h1, null]]} />

      {/* ── Capçalera ── */}
      <header className="mt-10 max-w-[860px] md:mt-14">
        <h1 data-split className="t-hero text-ink">{s.h1}</h1>
        <p data-reveal className="t-subtitle mt-8 max-w-[52ch] text-graphite">{s.intro}</p>
        <a data-reveal href={`${home}?servei=${id}#contact`} className="btn btn-primary mt-10">{ui.ctaButton}</a>
      </header>

      {/* ── Per a qui és / Què inclou ── */}
      <div className="mt-20 grid gap-14 border-t border-hairline-soft pt-14 md:mt-28 md:grid-cols-2 md:gap-12">
        <section data-reveal aria-labelledby="for-who">
          <h2 id="for-who" className="t-heading text-ink">{ui.forWho}</h2>
          <ul className="mt-8 space-y-4">
            {s.forWho.map(item => (
              <li key={item} className="t-body flex gap-3 text-graphite">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section data-reveal aria-labelledby="includes">
          <h2 id="includes" className="t-heading text-ink">{ui.includes}</h2>
          <ul className="mt-8 space-y-4">
            {s.includes.map(item => (
              <li key={item} className="t-body flex gap-3 text-graphite">
                <Check aria-hidden size={18} className="mt-0.5 shrink-0 text-ink" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── Com treballo ── */}
      <section aria-labelledby="process" className="mt-24 md:mt-32">
        <h2 id="process" className="t-heading text-ink">{ui.process}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {ui.processSteps.map((step, i) => (
            <li key={step.title} data-reveal className="border-t border-ink pt-5">
              <p className="t-meta index text-slate">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-title mt-3 text-ink">{step.title}</h3>
              <p className="t-body mt-3 text-graphite">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Projecte relacionat ── */}
      {project && (
        <section aria-labelledby="related" className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 id="related" className="t-meta text-slate">{ui.related}</h2>
            <p className="t-heading mt-4 text-ink">{project.title}</p>
            <p className="t-body mt-5 text-graphite">{project.description}</p>
            <a href={`${home}#project-${project.id}`} className="text-link mt-6 inline-block text-ink">{ui.relatedLink}</a>
          </div>
          <a href={`${home}#project-${project.id}`} tabIndex={-1} className="block aspect-[40/21] overflow-hidden rounded-md bg-surface-cool md:col-span-7">
            <img
              src={PROJECT_IMAGES[project.id]}
              alt={project.alt}
              width="1200" height="630"
              loading="lazy" decoding="async"
              className="size-full object-cover"
            />
          </a>
        </section>
      )}

      {/* ── Preguntes freqüents ── */}
      <section aria-labelledby="service-faq" className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-12">
        <h2 id="service-faq" className="t-heading text-ink md:col-span-4">{ui.faq}</h2>
        <Faq items={s.faqs} className="md:col-span-8" />
      </section>

      <ServiceList lang={lang} exclude={id} title={ui.otherServices} />
      <CtaPanel ui={ui} href={`${home}?servei=${id}#contact`} />
    </article>
  )
}

