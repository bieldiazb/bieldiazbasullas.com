import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Seo } from "./components/Seo"

import Header        from "@/components/layout/Header"
import Footer        from "@/components/layout/Footer"
import Hero          from "@/components/sections/Hero"
import About         from "@/components/sections/About"
import Projects      from "@/components/sections/Projects"
import Services      from "@/components/sections/Services"
import Contact       from "@/components/sections/Contact"
import Loader        from "@/components/sections/Loader"
import EntryCTA      from "@/components/EntryCTA"
import CookieBanner  from "./components/CookieBanner"
import { Toaster }   from "./components/ui/toaster"

import Cursor         from "@/components/Cursor"
import ScrollProgress from "@/components/ScrollProgress"
import { SectionReveal } from "@/components/SectionReveal"

export default function App() {
  const [loading, setLoading] = useState(true)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto"
  }, [loading])

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Seo
        lang={i18n.language}
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />

      {/* ── UI globals ─────────────────────────────────── */}
      <Cursor />
      <ScrollProgress />

      <Header />
      <EntryCTA />

      {/* ── Hero — sense reveal (ja té la seva pròpia animació) */}
      <Hero />

      {/* ── Seccions amb reveal en scroll ──────────────── */}
      <SectionReveal><About /></SectionReveal>
      <SectionReveal><Projects /></SectionReveal>
      <SectionReveal><Services /></SectionReveal>
      <SectionReveal><Contact /></SectionReveal>

      <Footer />
      <Toaster />
      <CookieBanner />

      {loading && <Loader onFinish={() => setLoading(false)} />}
    </main>
  )
}