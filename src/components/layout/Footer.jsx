import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { Scallops } from "@/components/paper/Scallops"
import avatarLight from "@/assets/avatarw.png"
import avatarDark  from "@/assets/avatard.png"

const EMAIL = "bieldiazbasullas@proton.me"

const SOCIALS = [
  { href: "https://www.instagram.com/bieldiazbasullas/",              label: "Instagram" },
  { href: "https://www.linkedin.com/in/biel-diaz-basullas-ba7a2b39a", label: "LinkedIn"  },
  { href: "https://github.com/bieldiazb",                              label: "GitHub"    },
  { href: "https://www.fiverr.com/s/XL96N1m",                         label: "Fiverr"    },
  { href: "https://www.upwork.com/freelancers/~01906485989d1d213e",    label: "Upwork"    },
]

// ── Footer ────────────────────────────────────────────────────────
// El revers del full, com el darrere d'una postal: missatge a
// l'esquerra, adreces a la dreta i un segell amb el retrat.
// A l'escriptori queda per sota de la pàgina i es destapa (cortina).

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="curtain-footer px-3 pb-6 pt-16">
      <div className="paper relative mx-auto max-w-[1000px] px-6 pb-8 pt-16 md:px-14 md:pt-20">
        <Scallops edge="top" size={56} />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* ── Missatge ── */}
          <div>
            <p className="font-serif text-[2rem] italic leading-tight text-ink">{t("footer.signoff")}</p>
            <p className="mt-4 max-w-[36ch] text-[1.0625rem] text-ink">{t("footer.message")}</p>
            <p className="mt-6 font-serif text-[1.75rem] italic leading-none text-ink" translate="no">Biel</p>
          </div>

          {/* ── Adreces + segell ── */}
          <div className="relative">
            <div aria-hidden className="absolute right-0 top-0 w-16 rotate-[4deg] bg-paper-3 p-1.5 md:w-[88px]">
              <img src={avatarLight} alt="" width="88" height="117" loading="lazy" className="block aspect-[3/4] w-full bg-paper object-contain dark:hidden" />
              <img src={avatarDark}  alt="" width="88" height="117" loading="lazy" className="hidden aspect-[3/4] w-full bg-paper object-contain dark:block" />
            </div>

            <ul className="space-y-3 pr-20 text-[1.0625rem] md:pr-28 md:text-[1.125rem]">
              <li>
                <a href={`mailto:${EMAIL}`} className="link break-all font-medium text-ink" translate="no">{EMAIL}</a>
              </li>
              {SOCIALS.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-ink" translate="no">
                    {label}
                    <ArrowUpRight aria-hidden size={16} />
                    <span className="sr-only">{t("projects.newTab")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 text-center text-[0.8125rem] text-ink-soft">
          {t("footer.imprint", { year })}
        </p>
      </div>
    </footer>
  )
}
