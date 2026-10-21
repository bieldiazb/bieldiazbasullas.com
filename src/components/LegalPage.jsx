import { useTranslation } from "react-i18next"
import { OWNER, LEGAL_UPDATED } from "@/lib/legal"
import { consentEnabled } from "@/lib/consent"
import { PATHS } from "@/lib/routes"
import legalCa from "@/legal/ca"
import legalEs from "@/legal/es"
import legalEn from "@/legal/en"
import Avatar from "@/components/Avatar"
import HoopShot from "@/components/HoopShot"

const TEXTS = { ca: legalCa, es: legalEs, en: legalEn }

// ── Inline ────────────────────────────────────────────────────────
// Converteix [text](url) i els correus en enllaços. Els externs s'obren
// en una pestanya nova.
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|([\w.+-]+@[\w-]+\.[\w.]+)/g

function Inline({ text, newTab }) {
  const out = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[3]) {
      out.push(<a key={m.index} href={`mailto:${m[3]}`} className="text-link text-[1em] font-normal" translate="no">{m[3]}</a>)
    } else {
      const external = /^https?:/.test(m[2])
      out.push(
        <a
          key={m.index}
          href={m[2]}
          className="text-link text-[1em] font-normal"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[1]}
          {external && <span className="sr-only"> {newTab}</span>}
        </a>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Block({ block, newTab }) {
  if (typeof block === "string") {
    return <p className="t-body text-graphite"><Inline text={block} newTab={newTab} /></p>
  }
  if (block.list) {
    return (
      <ul className="t-body list-disc space-y-2 pl-5 text-graphite marker:text-stone">
        {block.list.map((item, i) => <li key={i}><Inline text={item} newTab={newTab} /></li>)}
      </ul>
    )
  }
  if (block.dl) {
    return (
      <dl className="grid gap-x-8 border-t border-hairline-soft sm:grid-cols-[12rem_1fr]">
        {block.dl.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="t-meta border-b border-hairline pt-3 text-slate sm:pb-3">{k}</dt>
            <dd className="t-body border-b border-hairline pb-3 text-ink sm:pt-3"><Inline text={v} newTab={newTab} /></dd>
          </div>
        ))}
      </dl>
    )
  }
  if (block.table) {
    return (
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              {block.table.head.map(h => <th key={h} scope="col" className="t-meta border-b border-hairline-soft py-3 pr-4 font-medium text-slate">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map(row => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className={`border-b border-hairline py-3 pr-4 align-top text-[0.875rem] leading-[1.45] ${i === 0 ? "whitespace-nowrap font-medium text-ink" : "text-graphite"}`} translate={i === 0 ? "no" : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

// ── LegalPage ─────────────────────────────────────────────────────
// Avís legal, privacitat, cookies i la pàgina 404, en franja blanca de
// lectura (DESIGN.md): títol gran, data d'actualització i seccions.

export default function LegalPage({ page, lang }) {
  const { t } = useTranslation()
  const address = `${OWNER.street}, ${OWNER.postalCode} ${OWNER.city} (${OWNER.province})`
  const texts = (TEXTS[lang] ?? legalCa)({
    owner: OWNER,
    address,
    paths: PATHS[lang],
    storage: { hasConsent: consentEnabled },
  })
  const newTab = t("projects.newTab")

  if (page === "notfound") {
    const nf = texts.notfound
    return (
      <section aria-labelledby="page-title" className="container-page pb-24 pt-[calc(var(--header-h)+5rem)] md:pb-36">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="t-eyebrow text-slate">404</p>
            <h1 id="page-title" className="t-display mt-5 max-w-[18ch] text-ink">{nf.title}</h1>
            <p className="t-subtitle mt-6 max-w-[44ch] text-graphite">{nf.text}</p>
            <a href={PATHS[lang].home} className="btn btn-primary mt-10">{nf.back}</a>
          </div>
          <div className="hidden md:col-span-4 md:flex md:justify-end">
            <Avatar size={200} />
          </div>
        </div>
        <div className="mt-16 border-t border-hairline-soft pt-10">
          <HoopShot tone="light" />
        </div>
      </section>
    )
  }

  const doc = texts[page]
  const updated = new Intl.DateTimeFormat(lang, { day: "numeric", month: "long", year: "numeric" }).format(new Date(LEGAL_UPDATED))

  return (
    <article aria-labelledby="page-title" className="container-page pb-24 pt-[calc(var(--header-h)+5rem)] md:pb-36 md:pt-[calc(var(--header-h)+7rem)]">
      <header className="max-w-[760px]">
        <h1 id="page-title" className="t-display text-ink">{doc.title}</h1>
        <p className="t-meta mt-5 text-slate">
          {texts.updatedLabel}: <time dateTime={LEGAL_UPDATED}>{updated}</time>
        </p>
        {doc.intro && <p className="t-subtitle mt-8 text-graphite">{doc.intro}</p>}
      </header>

      <div className="mt-14 max-w-[760px] space-y-12 md:mt-20">
        {doc.sections.map((s, i) => (
          <section key={s.heading} aria-labelledby={`section-${i + 1}`}>
            <h2 id={`section-${i + 1}`} className="t-title text-ink">{s.heading}</h2>
            <div className="mt-4 space-y-4">
              {s.blocks.map((b, j) => <Block key={j} block={b} newTab={newTab} />)}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
