'use client'

import { useTranslation } from "react-i18next"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

const LANGS = ["ca", "es", "en"]

// ── Header ────────────────────────────────────────────────────────
// Fila superior sobre el camp verd: monograma, enllaços, idioma, tema
// i l'única acció. Barra plana, sense vidre ni ombres.

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const lang = i18n.resolvedLanguage || "ca"

  const changeLang = (value) => {
    i18n.changeLanguage(value)
    try { localStorage.setItem("lang", value) } catch { /* sense storage */ }
  }

  const NAV = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"),    href: "#about"    },
  ]

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-ground text-on-ground"
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full items-center justify-between gap-4 px-4 md:px-7">

        {/* ── Monograma ── */}
        <a
          href="#home"
          aria-label={t("nav.home")}
          className="font-serif text-[1.75rem] italic leading-none text-on-ground no-underline"
          translate="no"
        >
          bdb
        </a>

        {/* ── Enllaços (escriptori) ── */}
        <nav aria-label={t("nav.main")} className="hidden md:block">
          <ul className="flex gap-8">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="link text-[0.9375rem] text-on-ground no-underline hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          {/* ── Idioma ── */}
          <div role="group" aria-label={t("nav.language")} className="flex">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => changeLang(l)}
                aria-pressed={lang === l}
                lang={l}
                className={`min-h-[44px] min-w-[36px] px-1.5 text-[0.875rem] uppercase transition-colors ${
                  lang === l ? "text-on-ground underline underline-offset-4" : "text-on-ground-soft hover:text-on-ground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* ── Tema ── */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
            className="grid min-h-[44px] min-w-[44px] place-items-center text-on-ground-soft transition-colors hover:text-on-ground"
          >
            {theme === "dark" ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
          </button>

          {/* ── Acció ── */}
          <a href="#contact" className="btn ml-1 min-h-[40px] px-4 text-[0.9375rem]">
            <span className="hidden sm:inline">{t("nav.action")}</span>
            <span className="sm:hidden">{t("nav.actionShort")}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
