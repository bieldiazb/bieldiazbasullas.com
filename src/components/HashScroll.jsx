import { useEffect } from "react"
import { ScrollTrigger } from "@/lib/gsap"
import { getLenis } from "@/lib/lenis"

// ── HashScroll ────────────────────────────────────────────────────
// Si la URL porta una àncora (p. ex. /?servei=gyms#contact), main.jsx deixa
// la pàgina a dalt de tot perquè les animacions es creïn bé. Aquest
// component, l'últim de l'app, salta a l'àncora quan ja estan creades.

const initialHash = typeof window === "undefined" ? "" : window.location.hash.slice(1)

export default function HashScroll() {
  useEffect(() => {
    if (!initialHash) return
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const target = document.getElementById(decodeURIComponent(initialHash))
        if (!target) return
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
        else target.scrollIntoView()
      })
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return null
}
