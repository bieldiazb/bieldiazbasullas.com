import { Plus } from "lucide-react"

// ── Faq ───────────────────────────────────────────────────────────
// Preguntes freqüents com a acordió natiu (details/summary): funciona
// amb teclat i sense JavaScript, i les respostes són al codi HTML perquè
// Google les pugui llegir. Les dades estructurades (FAQPage) les escriu
// el build a partir del mateix contingut (src/content).

export default function Faq({ items, className = "" }) {
  return (
    <ul className={`border-t border-hairline-soft ${className}`}>
      {items.map(({ q, a }) => (
        <li key={q} className="border-b border-hairline-soft">
          <details className="group">
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-ink [&::-webkit-details-marker]:hidden">
              <span className="t-title">{q}</span>
              <Plus aria-hidden size={20} className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="t-body max-w-[64ch] pb-6 text-graphite">{a}</p>
          </details>
        </li>
      ))}
    </ul>
  )
}
