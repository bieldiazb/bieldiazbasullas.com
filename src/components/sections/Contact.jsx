'use client'

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Check, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useOrder } from "@/lib/order"
import { useReveal } from "@/lib/useReveal"
import SectionLabel from "@/components/SectionLabel"
import { OWNER } from "@/lib/legal"
import { pathFor, route } from "@/lib/routes"

const EMAIL = OWNER.email
const FORM_ENDPOINT = "https://formspree.io/f/maqwoqee"

// DESIGN.md form-field: línia inferior que s'enfosqueix en focus
const fieldClass =
  "mt-2 block w-full rounded-none border-0 border-b border-hairline-soft bg-transparent px-0 py-3 text-[1rem] text-ink placeholder:text-slate focus:border-ink focus:shadow-[0_1px_0_0_var(--ink)] focus:outline-none"

// ── Contact ───────────────────────────────────────────────────────
// Títol a l'esquerra i formulari a la dreta. Els serveis marcats aquí o
// a la secció de serveis omplen el missatge mentre no s'hagi editat.

export default function Contact() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { selected, toggle, has } = useOrder()
  const ref = useReveal()

  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [message, setMessage] = useState("")
  const [edited, setEdited]   = useState(false)
  const thanksRef = useRef(null)

  const items = t("services.items", { returnObjects: true })
  const services = Array.isArray(items) ? items : []
  const selectedServices = services.filter(s => selected.includes(s.id))

  const autoMessage = selectedServices.length
    ? t("contact.prefill", { services: selectedServices.map(s => s.title).join(", ") })
    : ""
  const messageValue = edited ? message : autoMessage

  useEffect(() => {
    if (sent) thanksRef.current?.focus()
  }, [sent])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: messageValue,
          services: selectedServices.map(s => s.title).join(", "),
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result?.error || "Error")
      setSent(true)
    } catch {
      toast({ title: t("contact.toast.error.title"), description: t("contact.toast.error.description"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-canvas pb-24 md:pb-32">
      <div className="container-page">
        <div ref={ref} className="grid gap-12 border-t border-hairline-soft pt-24 md:grid-cols-12 md:pt-32">

          {/* ── Títol ── */}
          <div className="md:col-span-5">
            <SectionLabel index="04" data-reveal className="text-slate">{t("contact.eyebrow")}</SectionLabel>
            <h2 data-split id="contact-title" className="t-display mt-5 text-ink">
              {t("contact.title")}
            </h2>
            <p data-reveal className="t-subtitle mt-6 max-w-[34ch] text-graphite">{t("contact.subtitle")}</p>

            <div data-reveal className="mt-10">
              <p className="t-meta text-slate">{t("contact.directLabel")}</p>
              <a href={`mailto:${EMAIL}`} className="text-link mt-1 inline-block break-all text-[1rem] text-ink" translate="no">
                {EMAIL}
              </a>
            </div>
          </div>

          {/* ── Formulari ── */}
          <div data-reveal className="md:col-span-7">
            {sent ? (
              <div ref={thanksRef} tabIndex={-1} role="status" className="outline-none">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-ink text-white">
                  <Check size={22} strokeWidth={2} />
                </span>
                <h3 className="t-heading mt-6 text-ink">{t("contact.thanks.title")}</h3>
                <p className="t-body mt-3 max-w-[44ch] text-graphite">{t("contact.thanks.description")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* ── Serveis ── */}
                <fieldset>
                  <legend className="t-body font-semibold text-ink">{t("contact.servicesLabel")}</legend>
                  <p className="t-meta mt-1 text-slate">{t("contact.servicesHint")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map(s => {
                      const on = has(s.id)
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggle(s.id)}
                          aria-pressed={on}
                          className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-[0.875rem] font-semibold ${
                            on ? "border-ink bg-ink text-white" : "border-hairline-soft bg-canvas text-ink hover:border-ink"
                          }`}
                        >
                          {on ? <Check aria-hidden size={14} /> : <Plus aria-hidden size={14} />}
                          {s.title}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  <label className="t-body block text-ink">
                    {t("contact.form.name")}
                    <input
                      name="name" type="text" required autoComplete="name"
                      placeholder={t("contact.form.namePlaceholder")}
                      className={fieldClass}
                    />
                  </label>
                  <label className="t-body block text-ink">
                    {t("contact.form.email")}
                    <input
                      name="email" type="email" required autoComplete="email" inputMode="email" spellCheck={false}
                      placeholder={t("contact.form.emailPlaceholder")}
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="t-body mt-8 block text-ink">
                  {t("contact.form.message")}
                  <textarea
                    name="message" required rows={4}
                    value={messageValue}
                    onChange={(e) => { setMessage(e.target.value); setEdited(true) }}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className={`${fieldClass} resize-y`}
                  />
                </label>

                <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="t-meta text-slate">{t("contact.formNote")}</p>
                  <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
                    {loading ? t("contact.form.sending") : t("contact.form.submit")}
                  </button>
                </div>

                {/* Informació bàsica de protecció de dades (RGPD art. 13) */}
                <p className="t-meta mt-6 max-w-[60ch] text-slate">
                  {t("contact.privacyNote", { name: OWNER.name })}{" "}
                  <a href={pathFor("privacy", route.lang)} className="text-link text-[1em] font-normal text-ink">{t("contact.privacyLink")}</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
