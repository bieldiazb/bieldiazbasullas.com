import { useTranslation } from "react-i18next"

import { Seo } from "./components/Seo"
import { OrderProvider } from "@/lib/order"

import Header        from "@/components/layout/Header"
import Footer        from "@/components/layout/Footer"
import Hero          from "@/components/sections/Hero"
import Services      from "@/components/sections/Services"
import Projects      from "@/components/sections/Projects"
import About         from "@/components/sections/About"
import Contact       from "@/components/sections/Contact"
import CookieBanner  from "./components/CookieBanner"
import { Toaster }   from "./components/ui/toaster"
import SmoothScroll  from "@/components/SmoothScroll"

export default function App() {
  const { t, i18n } = useTranslation()

  return (
    <OrderProvider>
      <Seo
        lang={i18n.resolvedLanguage}
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />
      <SmoothScroll />

      <a
        href="#main"
        className="btn fixed left-3 top-3 z-[60] -translate-y-24 focus:translate-y-0"
      >
        {t("nav.skip")}
      </a>

      {/* ── La pàgina: llisca cap amunt i destapa el peu (cortina) ── */}
      <div className="curtain-page">
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>

      <Footer />
      <Toaster />
      <CookieBanner />
    </OrderProvider>
  )
}
