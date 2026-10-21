'use client'

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { lockScroll } from "@/lib/lenis"
import { LANGS, homeLink, langLink } from "@/lib/routes"

// ── LangSwitch ────────────────────────────────────────────────────
function LangSwitch({ className = "" }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || "ca"

  return (
    <div role="group" aria-label={t("nav.language")} className={`flex ${className}`}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={langLink(l)}
          hrefLang={l}
          lang={l}
          aria-current={lang === l ? "true" : undefined}
          className={`inline-flex min-h-[44px] min-w-[36px] items-center justify-center px-1.5 text-[0.875rem] font-semibold uppercase ${
            lang === l ? "text-ink" : "text-slate hover:text-ink"
          }`}
        >
          {l}
        </a>
      ))}
    </div>
  )
}

// ── Header ────────────────────────────────────────────────────────
// Barra blanca de 64px (DESIGN.md nav-bar): nom en minúscula, menú
// centrat i la píndola negra. S'amaga en baixar i torna en pujar.
// Al mòbil, el menú s'obre en un panell a pantalla completa.

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const panelRef  = useRef(null)
  const toggleRef = useRef(null)

  const NAV = [
    { label: t("nav.services"), href: homeLink("#services") },
    { label: t("nav.projects"), href: homeLink("#projects") },
    { label: t("nav.about"),    href: homeLink("#about")    },
    { label: t("nav.contact"),  href: homeLink("#contact")  },
  ]

  // ── S'amaga en baixar, torna en pujar ──
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const hide = gsap.quickTo(headerRef.current, "yPercent", { duration: 0.45, ease: "power3.out" })
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const down = self.direction === 1 && self.scroll() > 240
          hide(down ? -100 : 0)
        },
      })
    })
    return () => mm.revert()
  }, [])

  // ── Menú mòbil: bloqueja el scroll, fa inert la resta i gestiona el focus ──
  useEffect(() => {
    const outside = [document.getElementById("main"), document.querySelector("footer")]
    if (!open) return

    lockScroll(true)
    outside.forEach(el => el && (el.inert = true))
    gsap.set(headerRef.current, { yPercent: 0 })
    panelRef.current?.querySelector("a")?.focus()

    const onKey = (e) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(panelRef.current.querySelectorAll("[data-menu-item]"), {
        y: 16, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.05,
      })
    })

    const toggle = toggleRef.current
    return () => {
      lockScroll(false)
      outside.forEach(el => el && (el.inert = false))
      document.removeEventListener("keydown", onKey)
      mm.revert()
      toggle?.focus()
    }
  }, [open])

  return (
    <>
      <header
        ref={headerRef}
        // Si el focus de teclat entra a la barra amagada, la tornem a mostrar
        onFocusCapture={() => gsap.to(headerRef.current, { yPercent: 0, duration: 0.2 })}
        className="fixed inset-x-0 top-0 z-50 bg-canvas"
        style={{
          height: "var(--header-h)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <div className="container-page flex h-full items-center justify-between gap-4">

          {/* ── Nom ── */}
          <a href={homeLink()} aria-label={t("nav.home")} className="text-[1rem] font-semibold tracking-[-0.02em] text-ink" translate="no">
            biel díaz basullas
          </a>

          {/* ── Menú (escriptori) ── */}
          <nav aria-label={t("nav.main")} className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex gap-1">
              {NAV.slice(0, 3).map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-[44px] items-center px-3 text-[0.875rem] font-semibold text-ink-soft hover:text-slate">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden lg:flex" />
            {/* En passar-hi el ratolí, el text roda i diu "Som-hi!" */}
          <a href={homeLink("#contact")} aria-label={t("nav.action")} className="btn btn-primary group">
            <span className="relative block overflow-hidden">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{t("nav.action")}</span>
              <span aria-hidden className="absolute inset-0 block translate-y-full text-center transition-transform duration-300 ease-out group-hover:translate-y-0">{t("nav.actionHover")}</span>
            </span>
          </a>

            {/* ── Botó del menú (mòbil) ── */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              className="grid size-12 place-items-center rounded-full text-ink hover:bg-hairline lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Panell del menú (mòbil): fora del header, que té transform ── */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.menu")}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto overscroll-contain bg-canvas lg:hidden"
        >
          <nav aria-label={t("nav.main")} className="container-page pt-8">
            <ul>
              {NAV.map(({ label, href }) => (
                <li key={href} data-menu-item className="border-b border-hairline">
                  <a
                    href={href}
                    // Reprèn Lenis abans que gestioni l'àncora
                    onClick={() => { lockScroll(false); setOpen(false) }}
                    className="t-heading flex min-h-[64px] items-center text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-item className="container-page mt-auto pb-8 pt-10">
            <LangSwitch />
          </div>
        </div>
      )}
    </>
  )
}
