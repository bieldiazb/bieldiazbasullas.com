import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight, X } from "lucide-react"
import { gsap } from "@/lib/gsap"
import Clock from "@/components/Clock"
import { OWNER, SOCIALS } from "@/lib/legal"
import { homeLink, pathFor, route } from "@/lib/routes"
import { CONTENT, serviceLinks } from "@/seo/meta"
import { consentEnabled, openConsent } from "@/lib/consent"

const EMAIL = OWNER.email

// El joc només es descarrega si algú l'obre
const HoopShot = lazy(() => import("@/components/HoopShot"))

// ── Footer ────────────────────────────────────────────────────────
// Superfície final negra (DESIGN.md footer): una frase amb l'acció,
// tres columnes d'enllaços i el nom en minúscula a tota l'amplada.

export default function Footer() {
  const { t, i18n } = useTranslation()
  const year = new Date().getFullYear()
  const markRef = useRef(null)
  const [game, setGame] = useState(false)
  const gameToggleRef = useRef(null)
  const gameCloseRef = useRef(null)
  const gameTouched = useRef(false)

  // En obrir o tancar el joc, el focus va al botó que el substitueix
  useEffect(() => {
    if (!gameTouched.current) return
    const target = game ? gameCloseRef : gameToggleRef
    target.current?.focus()
  }, [game])
  const toggleGame = (open) => { gameTouched.current = true; setGame(open) }

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(markRef.current, {
        yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: markRef.current, start: "top 95%", toggleActions: "play none none none" },
      })
    })
    return () => mm.revert()
  }, [])

  const NAV = [
    { label: t("nav.services"), href: homeLink("#services") },
    { label: t("nav.projects"), href: homeLink("#projects") },
    { label: t("nav.about"),    href: homeLink("#about")    },
    { label: t("nav.contact"),  href: homeLink("#contact")  },
    { label: CONTENT[route.lang].local.h1, href: pathFor("local", route.lang) },
  ]

  const LEGAL = [
    { label: t("footer.legal"),   href: pathFor("legal", route.lang)   },
    { label: t("footer.privacy"), href: pathFor("privacy", route.lang) },
    { label: t("footer.cookies"), href: pathFor("cookies", route.lang) },
  ]
  const metaLink = "t-meta inline-flex min-h-[44px] items-center text-stone hover:text-white"

  const linkClass = "inline-flex min-h-[32px] items-center gap-1 text-[1rem] text-white hover:text-stone"

  return (
    <footer className="on-dark overflow-hidden bg-footer-bg text-white">
      <div className="container-page pb-8 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-heading max-w-[16ch]">{t("footer.statement")}</p>
            <a href={`mailto:${EMAIL}`} className="btn btn-on-dark mt-8">{t("footer.cta")}</a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[auto_auto_auto_auto] sm:justify-between lg:col-span-8">
            <nav aria-label={CONTENT[route.lang].ui.services}>
              <h2 className="t-eyebrow text-stone">{CONTENT[route.lang].ui.services}</h2>
              <ul className="mt-4 space-y-1">
                {serviceLinks(route.lang).map(({ id, path, title }) => (
                  <li key={id}><a href={path} className={linkClass}>{title}</a></li>
                ))}
              </ul>
            </nav>
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

        {/* ── Un descans: el joc de bàsquet ── */}
        <div className="mt-16 md:mt-20">
          {game ? (
            <div className="rounded-lg border border-white/15 p-5 md:p-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="t-title">{t("game.title")}</h2>
                <button
                  ref={gameCloseRef}
                  type="button"
                  onClick={() => toggleGame(false)}
                  aria-label={t("game.close")}
                  className="grid size-10 place-items-center rounded-full border border-white/25 hover:border-white"
                >
                  <X aria-hidden size={16} />
                </button>
              </div>
              <Suspense fallback={<div className="h-[260px]" />}>
                <HoopShot tone="dark" />
              </Suspense>
            </div>
          ) : (
            <button
              ref={gameToggleRef}
              type="button"
              onClick={() => toggleGame(true)}
              className="text-link text-white"
            >
              {t("game.toggle")} →
            </button>
          )}
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
            biel díaz basullas
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-white/15 pt-4">
          <p className="t-meta text-stone">{t("footer.imprint", { year })}</p>
          <nav aria-label={t("footer.legalNav")}>
            <ul className="flex flex-wrap gap-x-5">
              {LEGAL.map(({ label, href }) => (
                <li key={href}><a href={href} className={metaLink}>{label}</a></li>
              ))}
              {consentEnabled && (
                <li><button type="button" onClick={openConsent} className={metaLink}>{t("footer.cookiePrefs")}</button></li>
              )}
            </ul>
          </nav>
          <p className="t-meta text-stone">Barcelona <Clock lang={i18n.resolvedLanguage || "ca"} className="text-white" /></p>
          <a href="#main" className={metaLink}>{t("footer.backTop")}</a>
        </div>
      </div>
    </footer>
  )
}
