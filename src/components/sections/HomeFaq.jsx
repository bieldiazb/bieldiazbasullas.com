'use client'

import { useReveal } from "@/lib/useReveal"
import { CONTENT } from "@/seo/meta"
import { route } from "@/lib/routes"
import SectionLabel from "@/components/SectionLabel"
import Faq from "@/components/Faq"

// ── HomeFaq ───────────────────────────────────────────────────────
// Preguntes freqüents de l'inici (també surten a Google gràcies a les
// dades estructurades FAQPage).

export default function HomeFaq() {
  const ref = useReveal()
  const faq = CONTENT[route.lang].homeFaq

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-canvas pb-24 md:pb-36">
      <div className="container-page">
        <div ref={ref} className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <SectionLabel index="04" data-reveal className="text-slate">{faq.eyebrow}</SectionLabel>
            <h2 data-split id="faq-title" className="t-display mt-5 text-ink">{faq.title}</h2>
          </div>
          <div data-reveal className="md:col-span-8">
            <Faq items={faq.items} />
          </div>
        </div>
      </div>
    </section>
  )
}
