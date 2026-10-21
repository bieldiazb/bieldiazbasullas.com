import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

import { Seo } from "./components/Seo"
import { OrderProvider } from "@/lib/order"
import { route, serviceIdOf } from "@/lib/routes"

import Header        from "@/components/layout/Header"
import Footer        from "@/components/layout/Footer"
import Hero          from "@/components/sections/Hero"
import Services      from "@/components/sections/Services"
import Projects      from "@/components/sections/Projects"
import Marquee       from "@/components/sections/Marquee"
import Interlude     from "@/components/sections/Interlude"
import About         from "@/components/sections/About"
import Contact       from "@/components/sections/Contact"
import HomeFaq       from "@/components/sections/HomeFaq"
import CookieBanner  from "./components/CookieBanner"
import { Toaster }   from "./components/ui/toaster"
import SmoothScroll  from "@/components/SmoothScroll"
import Intro         from "@/components/Intro"
import CursorLabel   from "@/components/CursorLabel"
import HashScroll    from "@/components/HashScroll"

// Les altres pàgines es carreguen a part: no pesen a l'inici
const LegalPage   = lazy(() => import("@/components/LegalPage"))
const ServicePage = lazy(() => import("@/components/ServicePage"))
const LocalPage   = lazy(() => import("@/components/LocalPage"))

function Page({ page, lang }) {
  const serviceId = serviceIdOf(page)
  if (serviceId) return <ServicePage id={serviceId} lang={lang} />
  if (page === "local") return <LocalPage lang={lang} />
  return <LegalPage page={page} lang={lang} />
}

export default function App() {
  const { t } = useTranslation()
  const { page, lang } = route

  return (
    <OrderProvider>
      <Seo page={page} lang={lang} />
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
        {page === "home" ? (
          <>
            <Hero />
            <Services />
            <Marquee />
            <Projects />
            <About />
            <Interlude />
            <HomeFaq />
            <Contact />
          </>
        ) : (
          <Suspense fallback={<div className="min-h-[100svh]" />}>
            <Page page={page} lang={lang} />
          </Suspense>
        )}
      </main>
      <Footer />

      <Toaster />
      <CookieBanner />
      <HashScroll />
    </OrderProvider>
  )
}
