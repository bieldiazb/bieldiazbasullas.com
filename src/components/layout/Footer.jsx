import {
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiGithubFill,
} from "react-icons/ri"
import { SiFiverr } from "react-icons/si"
import { FaUpwork } from "react-icons/fa6"
import { useTranslation } from "react-i18next"

const ACCENT = "#256cd0"

const SOCIALS = [
  { href: "https://www.instagram.com/bieldiazbasullas/",              label: "Instagram", Icon: RiInstagramLine },
  { href: "https://www.linkedin.com/in/biel-diaz-basullas-ba7a2b39a", label: "LinkedIn",  Icon: RiLinkedinBoxFill },
  { href: "https://github.com/bieldiazb",                              label: "GitHub",    Icon: RiGithubFill },
  { href: "https://www.fiverr.com/s/XL96N1m",                         label: "Fiverr",    Icon: SiFiverr },
  { href: "https://www.upwork.com/freelancers/~01906485989d1d213e",    label: "Upwork",    Icon: FaUpwork },
]

const mono = (sz = "0.5rem", extra = {}) => ({
  fontFamily: "'Geist Mono', monospace",
  fontWeight: 300,
  fontSize: sz,
  letterSpacing: "0.14em",
  ...extra,
})

const linkStyle = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
  letterSpacing: "0.04em",
  lineHeight: 1.15,
  color: "hsl(var(--foreground))",
  textDecoration: "none",
  opacity: 0.3,
  transition: "opacity 0.2s ease, color 0.2s ease",
}

const colLabel = mono("0.5rem", {
  textTransform: "uppercase",
  color: "hsl(var(--muted-foreground))",
  opacity: 0.35,
  marginBottom: "0.75rem",
  display: "block",
  letterSpacing: "0.2em",
})

export default function Footer() {
  const { t } = useTranslation()

  const NAV = [
    { label: t("nav.about"),    href: "#about"    },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.contact"),  href: "#contact"  },
  ]

  const px = { paddingLeft: "clamp(1.25rem, 5vw, 5rem)", paddingRight: "clamp(1.25rem, 5vw, 5rem)" }

  return (
    <footer style={{ position: "relative", borderTop: `2px solid ${ACCENT}` }}>

      {/* ── Grid lines ────────────────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{
            position: "absolute", top: 0, bottom: 0, left: `${pct}%`,
            width: "1px", background: "hsl(var(--border) / 0.06)",
          }} />
        ))}
      </div>

      {/* ── Main block ───────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        ...px,
        paddingTop: "3.5rem",
        paddingBottom: "2.5rem",
        borderBottom: "1px solid hsl(var(--border) / 0.2)",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "3rem",
      }}
        className="md:footer-grid"
      >
        <style>{`
          @media (min-width: 768px) {
            .md\\:footer-grid {
              grid-template-columns: 1.3fr 1fr 1fr !important;
              align-items: start !important;
              gap: 3rem !important;
            }
          }
        `}</style>

        {/* ── Col 1 — tagline + CTA ─────────────────────── */}
        <div>
          {/* Accent line */}
          <div style={{ width: "2rem", height: "2px", background: ACCENT, marginBottom: "1.25rem" }} />
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "hsl(var(--foreground))",
            margin: "0 0 1.25rem",
          }}>
            Let's build{" "}
            <span style={{ color: ACCENT }}>something</span>
          </h2>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              textDecoration: "none",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.875rem", letterSpacing: "0.14em",
              color: "hsl(var(--background))",
              background: ACCENT,
              padding: "0.55rem 1.5rem",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Start a project →
          </a>
        </div>

        {/* ── Col 2 — nav ───────────────────────────────── */}
        <div>
          <span style={colLabel}>Navigation</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.3"; e.currentTarget.style.color = "hsl(var(--foreground))" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 3 — socials ───────────────────────────── */}
        <div>
          <span style={colLabel}>Social</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  ...linkStyle,
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.3"; e.currentTarget.style.color = "hsl(var(--foreground))" }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom strip ─────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        ...px,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "1rem", paddingBottom: "1.25rem",
        gap: "0.5rem", flexWrap: "wrap",
      }}>
        <span style={mono("0.45rem", {
          color: "hsl(var(--muted-foreground))",
          opacity: 0.3, textTransform: "uppercase",
        })}>
          © {new Date().getFullYear()} Biel Diaz Basullas
        </span>
        <span style={mono("0.45rem", {
          color: "hsl(var(--muted-foreground))",
          opacity: 0.3, textTransform: "uppercase",
        })}>
          Designed & built by biel
        </span>
      </div>

    </footer>
  )
}