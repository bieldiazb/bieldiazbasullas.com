'use client'

import { useEffect } from "react"
import { gsap } from "@/lib/gsap"
import { lockScroll } from "@/lib/lenis"
import { markIntroDone, INTRO_KEY } from "@/lib/intro"

const MIN_MS = 1000   // perquè el nom es llegeixi
const MAX_MS = 1400   // mai s'allarga més enllà d'això esperant recursos

// Tipografia i imatges del hero carregades (o el temps màxim)
function assetsReady() {
  const fonts = document.fonts?.ready ?? Promise.resolve()
  const imgs = [...document.querySelectorAll("#home img")].map(img => img.decode?.().catch(() => {}))
  const timeout = new Promise(r => setTimeout(r, MAX_MS))
  return Promise.race([Promise.all([fonts, ...imgs]), timeout])
}

// ── Intro ─────────────────────────────────────────────────────────
// Anima el loader que ja és a index.html: el nom puja paraula a paraula,
// el comptador segueix la càrrega real i el panell es retira cap amunt
// amb una màscara mentre el hero comença la seva entrada.

export default function Intro() {
  useEffect(() => {
    const el = document.getElementById("intro")
    if (!el) { markIntroDone(); return }

    lockScroll(true)
    const counter = el.querySelector(".intro-count")
    const progress = { value: 0 }
    const render = () => { counter.textContent = String(Math.round(progress.value)).padStart(3, "0") }
    const start = performance.now()

    const finish = () => {
      try { sessionStorage.setItem(INTRO_KEY, "1") } catch { /* sense storage */ }
      document.documentElement.classList.remove("intro-active")
      lockScroll(false)
      el.remove()
    }

    let alive = true   // les promeses no formen part del context de GSAP
    const mm = gsap.matchMedia()

    // ── Amb animació ──
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = el.querySelectorAll(".intro-word > span")
      gsap.fromTo(words, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 })
      const count = gsap.to(progress, { value: 90, duration: MIN_MS / 1000, ease: "power2.out", onUpdate: render })

      assetsReady().then(() => {
        if (!alive) return
        const wait = Math.max(0, MIN_MS - (performance.now() - start)) / 1000
        gsap.timeline({ delay: wait, onComplete: finish })
          .add(() => count.kill())
          .to(progress, { value: 100, duration: 0.2, ease: "power1.out", onUpdate: render })
          .to(words, { yPercent: -110, duration: 0.45, ease: "expo.in", stagger: 0.03 })
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" }, "-=0.3")
          // El hero entra mentre la màscara puja
          .add(markIntroDone, "-=0.5")
      })
    })

    // ── Reduced motion: fos curt ──
    mm.add("(prefers-reduced-motion: reduce)", () => {
      progress.value = 100
      render()
      assetsReady().then(() => {
        if (!alive) return
        markIntroDone()
        gsap.to(el, { opacity: 0, duration: 0.3, onComplete: finish })
      })
    })

    // Només revertim les animacions: en desenvolupament (StrictMode) l'efecte
    // es munta dues vegades i el loader ha de sobreviure al primer desmuntatge
    return () => { alive = false; mm.revert() }
  }, [])

  return null
}
