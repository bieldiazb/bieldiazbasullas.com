import { useEffect, useRef, useState } from "react"

export default function Cursor() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let raf
    let target = { x: -100, y: -100 }
    let current = { x: -100, y: -100 }
    let hovering = false
    let clicking = false

    const applyStyles = () => {
      const size = clicking ? 28 : hovering ? 44 : 12

      // Mou directament el DOM — zero re-renders React
      cursor.style.width  = size + "px"
      cursor.style.height = size + "px"
      cursor.style.transform = `translate(${current.x - size / 2}px, ${current.y - size / 2}px)`
      cursor.style.backgroundColor = hovering || clicking ? "transparent" : "white"
      cursor.style.border = hovering || clicking ? "1.5px solid white" : "1.5px solid transparent"

      dot.style.transform = `translate(${current.x - 2}px, ${current.y - 2}px)`
      dot.style.width  = hovering ? "4px" : "0px"
      dot.style.height = hovering ? "4px" : "0px"
      dot.style.opacity = hovering ? "1" : "0"
    }

    const loop = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      applyStyles()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      cursor.style.opacity = "1"
      dot.style.opacity = hovering ? "1" : "0"

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const wasHovering = hovering
      hovering = !!el?.closest("button, a, [role='button'], [data-cursor], input, textarea, select, label")
      if (wasHovering !== hovering) applyStyles()
    }

    const onLeave  = () => { cursor.style.opacity = "0"; dot.style.opacity = "0" }
    const onDown   = () => { clicking = true;  applyStyles() }
    const onUp     = () => { clicking = false; applyStyles() }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "50%",
          mixBlendMode: "difference",
          willChange: "transform, width, height",
          transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease, border 0.15s ease, opacity 0.2s ease",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "50%",
          backgroundColor: "white",
          mixBlendMode: "difference",
          willChange: "transform, width, height",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
        }}
      />
    </>
  )
}