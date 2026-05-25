'use client'

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? scrolled / total : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      height: "1px",
      zIndex: 9998,
      background: "hsl(var(--border) / 0.2)",
      pointerEvents: "none",
    }}>
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "100%",
          background: "hsl(var(--foreground))",
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  )
}