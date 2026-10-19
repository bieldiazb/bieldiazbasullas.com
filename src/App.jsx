import { useTranslation } from "react-i18next"

import { Seo } from "./components/Seo"
import { OrderProvider } from "@/lib/order"

import Header        from "@/components/layout/Header"
import Footer        from "@/components/layout/Footer"
import Hero          from "@/components/sections/Hero"
import Services      from "@/components/sections/Services"
import Projects      from "@/components/sections/Projects"
import Interlude     from "@/components/sections/Interlude"
import About         from "@/components/sections/About"
import Contact       from "@/components/sections/Contact"
import CookieBanner  from "./components/CookieBanner"
import { Toaster }   from "./components/ui/toaster"
import SmoothScroll  from "@/components/SmoothScroll"
import Intro         from "@/components/Intro"
import CursorLabel   from "@/components/CursorLabel"

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
      <Intro />
      <CursorLabel />

      {/* Lenis fa el scroll de l'àncora però no mou el focus: el movem aquí */}
      <a
        href="#main"
        onClick={() => setTimeout(() => document.getElementById("main")?.focus({ preventScroll: true }), 0)}
        className="btn btn-primary fixed left-4 top-3 z-[60] -translate-y-24 focus:translate-y-0"
      >
        {t("nav.skip")}
      </a>

      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Projects />
        <About />
        <Interlude />
        <Contact />
      </main>
      <Footer />

      <Toaster />
      <CookieBanner />
    </OrderProvider>
  )
}
