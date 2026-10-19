'use client'

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useOrder } from "@/lib/order"
import { useReveal } from "@/lib/useReveal"
import { Corners } from "@/components/paper/Scallops"

const EMAIL = "bieldiazbasullas@proton.me"
const FORM_ENDPOINT = "https://formspree.io/f/maqwoqee"

const fieldClass =
  "mt-2 block w-full rounded-none border-0 bg-paper-2 px-4 py-3 text-[1rem] text-ink placeholder:text-ink-soft focus-visible:outline-stamp"

// ── Contact ───────────────────────────────────────────────────────
// El peu del full d'encàrrec: els serveis marcats i el formulari.
// Mentre el visitant no toqui el missatge, s'omple sol amb els serveis.

export default function Contact() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { selected, toggle } = useOrder()
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
    <section id="contact" aria-labelledby="contact-title" className="px-3 pb-24 md:pb-40">
      <div ref={ref} className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-6">

        {/* ── Text sobre el camp ── */}
        <div className="md:col-span-5">
          <h2
            id="contact-title"
            data-reveal
            className="font-serif leading-[0.95] text-on-ground"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", textWrap: "balance" }}
          >
            {t("contact.title")}
          </h2>
          <p data-reveal className="mt-6 max-w-[36ch] text-[1.25rem] leading-snug text-on-ground">
            {t("contact.subtitle")}
          </p>
          <p data-reveal className="mt-10 text-[0.875rem] text-on-ground-soft">{t("contact.directLabel")}</p>
          <a data-reveal href={`mailto:${EMAIL}`} className="link mt-1 inline-block break-all text-[1.125rem] font-medium text-on-ground" translate="no">
            {EMAIL}
          </a>
        </div>

        {/* ── Full del formulari ── */}
        <div data-reveal className="paper relative px-6 py-10 md:col-span-7 md:px-12 md:py-12">
          <Corners radius={16} />

          {sent ? (
            <div ref={thanksRef} tabIndex={-1} role="status" className="py-10 outline-none">
              <span aria-hidden className="grid size-14 place-items-center rounded-full bg-stamp text-on-stamp">
                <Check size={26} strokeWidth={2.5} />
              </span>
              <h3 className="mt-6 font-serif text-[2.5rem] leading-tight text-ink">{t("contact.thanks.title")}</h3>
              <p className="mt-3 max-w-[40ch] text-[1.0625rem] text-ink">{t("contact.thanks.description")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* ── Serveis marcats ── */}
              <fieldset>
                <legend className="text-[0.875rem] text-ink-soft">{t("contact.selectedLabel")}</legend>
                {selectedServices.length ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {selectedServices.map(s => (
                      <li key={s.id} className="flex items-center bg-ground text-on-ground">
                        <span className="py-2 pl-3 text-[0.9375rem]">{s.title}</span>
                        <button
                          type="button"
                          onClick={() => toggle(s.id)}
                          aria-label={t("contact.remove", { service: s.title })}
                          className="grid min-h-[40px] min-w-[40px] place-items-center text-on-ground-soft transition-colors hover:text-on-ground"
                        >
                          <X aria-hidden size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[1rem] text-ink">{t("contact.selectedEmpty")}</p>
                )}
              </fieldset>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <label className="block text-[0.875rem] font-medium text-ink">
                  {t("contact.form.name")}
                  <input
                    name="name" type="text" required autoComplete="name"
                    placeholder={t("contact.form.namePlaceholder")}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-[0.875rem] font-medium text-ink">
                  {t("contact.form.email")}
                  <input
                    name="email" type="email" required autoComplete="email" inputMode="email" spellCheck={false}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="mt-5 block text-[0.875rem] font-medium text-ink">
                {t("contact.form.message")}
                <textarea
                  name="message" required rows={5}
                  value={messageValue}
                  onChange={(e) => { setMessage(e.target.value); setEdited(true) }}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className={`${fieldClass} resize-y`}
                />
              </label>

              <button type="submit" disabled={loading} className="btn mt-8 min-h-[52px] w-full disabled:opacity-70">
                {loading ? t("contact.form.sending") : t("contact.form.submit")}
              </button>
              <p className="mt-4 text-[0.875rem] text-ink-soft">{t("contact.formNote")}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
