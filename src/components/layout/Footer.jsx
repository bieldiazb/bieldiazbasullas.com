import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"

const EMAIL = "bieldiazbasullas@proton.me"

const SOCIALS = [
  { href: "https://www.instagram.com/bieldiazbasullas/",              label: "Instagram" },
  { href: "https://www.linkedin.com/in/biel-diaz-basullas-ba7a2b39a", label: "LinkedIn"  },
  { href: "https://github.com/bieldiazb",                              label: "GitHub"    },
  { href: "https://www.fiverr.com/s/XL96N1m",                         label: "Fiverr"    },
  { href: "https://www.upwork.com/freelancers/~01906485989d1d213e",    label: "Upwork"    },
]

// ── Clock ─────────────────────────────────────────────────────────
// Hora de Barcelona en directe (s'actualitza cada 30 s).
function Clock({ lang }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  const time = new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(now)
  return (
    <p className="t-meta text-stone">
      Barcelona <time className="index text-white" dateTime={now.toISOString()}>{time}</time>
    </p>
  )
}

// ── Footer ────────────────────────────────────────────────────────
// Superfície final negra (DESIGN.md footer): una frase amb l'acció,
// tres columnes d'enllaços i el nom en minúscula a tota l'amplada.

export default function Footer() {
  const { t, i18n } = useTranslation()
  const year = new Date().getFullYear()
  const markRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(markRef.current, {
        yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: markRef.current, start: "top 95%", once: true },
      })
    })
    return () => mm.revert()
  }, [])

  const NAV = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"),    href: "#about"    },
    { label: t("nav.contact"),  href: "#contact"  },
  ]

  const linkClass = "inline-flex min-h-[32px] items-center gap-1 text-[1rem] text-white hover:text-stone"

  return (
    <footer className="on-dark overflow-hidden bg-footer-bg text-white">
      <div className="container-page pb-8 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-heading max-w-[16ch]">{t("footer.statement")}</p>
            <a href={`mailto:${EMAIL}`} className="btn btn-on-dark mt-8">{t("footer.cta")}</a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[auto_auto_auto] sm:justify-between md:col-span-7">
            <nav aria-label={t("footer.nav")}>
              <h2 className="t-eyebrow text-stone">{t("footer.nav")}</h2>
              <ul className="mt-4 space-y-1">
                {NAV.map(({ label, href }) => (
                  <li key={href}><a href={href} className={linkClass}>{label}</a></li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="t-eyebrow text-stone">{t("footer.social")}</h2>
              <ul className="mt-4 space-y-1">
                {SOCIALS.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} translate="no">
                      {label}
                      <ArrowUpRight aria-hidden size={14} className="text-stone" />
                      <span className="sr-only">{t("projects.newTab")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="t-eyebrow text-stone">{t("footer.contact")}</h2>
              <a href={`mailto:${EMAIL}`} className={`${linkClass} mt-4 break-all sm:break-normal`} translate="no">{EMAIL}</a>
            </div>
          </div>
        </div>

        {/* ── Nom a tota l'amplada ── */}
        <div className="mt-20 md:mt-28" style={{ containerType: "inline-size" }}>
          <p
            ref={markRef}
            aria-hidden
            translate="no"
            className="whitespace-nowrap font-medium leading-[0.85] tracking-[-0.055em]"
            style={{ fontSize: "14.6cqw" }}
          >
            biel diaz basullas
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <p className="t-meta text-stone">{t("footer.imprint", { year })}</p>
          <Clock lang={i18n.resolvedLanguage || "ca"} />
          <a href="#home" className="t-meta inline-flex min-h-[44px] items-center text-stone hover:text-white">{t("footer.backTop")}</a>
        </div>
      </div>
    </footer>
  )
}
