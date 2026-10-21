import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

// ── HoopShot ──────────────────────────────────────────────────────
// Mini joc de bàsquet (picada d'ullet a Swish & Legacy). S'arrossega la
// pilota enrere i es deixa anar, com un tirador; la línia de punts
// mostra la trajectòria. El botó "Tira" fa un tir automàtic amb una mica
// d'atzar, perquè també es pugui jugar amb el teclat. Només anima mentre
// la pilota es mou.
//
// Props:
//   tone   — "dark" (traç blanc) | "light" (traç negre)
//   height — alçada del camp en px

const G = 0.42           // gravetat (px per frame²)
const POWER = 0.16       // velocitat per px arrossegat
const MAX_PULL = 130     // màxim que es pot estirar
const R = 13             // radi de la pilota

export default function HoopShot({ tone = "dark", height = 260 }) {
  const { t } = useTranslation()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef({})
  const [made, setMade] = useState(0)
  const [tries, setTries] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const ink = tone === "dark" ? "#ffffff" : "#030303"
    const soft = tone === "dark" ? "rgba(255,255,255,0.35)" : "rgba(3,3,3,0.3)"

    let w = 0, h = height, dpr = 1
    let raf = 0, msgTimer = 0
    const ball = { x: 0, y: 0, vx: 0, vy: 0, live: false, scored: false, frames: 0 }
    const drag = { on: false, x: 0, y: 0 }
    let hoop = {}

    const layout = () => {
      w = wrapRef.current.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const rimX = Math.max(w * 0.74, w - 150)
      const rimY = h * 0.36
      hoop = { rimX, rimY, x1: rimX - 26, x2: rimX + 26, boardX: rimX + 32, boardTop: rimY - 62, boardBottom: rimY + 14 }
      if (!ball.live) resetBall()
      draw()
    }

    const start = () => ({ x: Math.min(w * 0.16, 90), y: h - R - 18 })

    function resetBall() {
      const s = start()
      Object.assign(ball, { x: s.x, y: s.y, vx: 0, vy: 0, live: false, scored: false, frames: 0 })
    }

    const flash = (text) => {
      setMessage(text)
      clearTimeout(msgTimer)
      msgTimer = setTimeout(() => setMessage(""), 1400)
    }

    function launch(vx, vy) {
      if (ball.live) return
      Object.assign(ball, { vx, vy, live: true, scored: false, frames: 0 })
      setTries(n => n + 1)
      loop()
    }

    // Tir automàtic: velocitat que passa pel centre del cèrcol, amb error
    function autoShot() {
      if (ball.live) return
      const s = start()
      const T = 52 + Math.random() * 10
      const tx = hoop.rimX + (Math.random() - 0.5) * 34
      const ty = hoop.rimY - 6
      const vx = (tx - s.x) / T
      const vy = (ty - s.y - 0.5 * G * T * T) / T
      launch(vx, vy)
    }

    function bounceOffPoint(px, py, restitution = 0.6) {
      const dx = ball.x - px, dy = ball.y - py
      const dist = Math.hypot(dx, dy)
      const min = R + 3
      if (dist >= min || dist === 0) return
      const nx = dx / dist, ny = dy / dist
      const dot = ball.vx * nx + ball.vy * ny
      if (dot < 0) {
        ball.vx -= (1 + restitution) * dot * nx
        ball.vy -= (1 + restitution) * dot * ny
      }
      ball.x = px + nx * min
      ball.y = py + ny * min
    }

    function step() {
      const prevY = ball.y
      ball.vy += G
      ball.x += ball.vx
      ball.y += ball.vy
      ball.frames++

      // Cistella: travessa l'alçada del cèrcol cap avall entre els dos extrems
      if (!ball.scored && ball.vy > 0 && prevY < hoop.rimY && ball.y >= hoop.rimY
          && ball.x > hoop.x1 + 4 && ball.x < hoop.x2 - 4) {
        ball.scored = true
        setMade(n => n + 1)
        flash(t("game.score"))
      }

      bounceOffPoint(hoop.x1, hoop.rimY)
      bounceOffPoint(hoop.x2, hoop.rimY)

      // Tauler
      if (ball.x + R > hoop.boardX && ball.x - R < hoop.boardX + 4 && ball.y > hoop.boardTop && ball.y < hoop.boardBottom && ball.vx > 0) {
        ball.x = hoop.boardX - R
        ball.vx *= -0.55
      }
      // Terra i parets
      if (ball.y + R > h) { ball.y = h - R; ball.vy *= -0.55; ball.vx *= 0.82 }
      if (ball.x - R < 0) { ball.x = R; ball.vx *= -0.6 }
      if (ball.x + R > w) { ball.x = w - R; ball.vx *= -0.6 }

      const resting = ball.y + R >= h - 0.5 && Math.abs(ball.vy) < 1.2 && Math.abs(ball.vx) < 0.4
      if (resting || ball.frames > 420) {
        if (!ball.scored) flash(t("game.miss"))
        ball.live = false
        setTimeout(() => { resetBall(); draw() }, 450)
      }
    }

    function drawHoop() {
      const { rimX, rimY, x1, x2, boardX, boardTop, boardBottom } = hoop
      ctx.lineCap = "round"
      // Tauler i pal
      ctx.strokeStyle = ink
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(boardX + 2, boardTop); ctx.lineTo(boardX + 2, boardBottom); ctx.stroke()
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(boardX + 2, boardBottom - 10); ctx.lineTo(boardX + 18, boardBottom - 10); ctx.lineTo(boardX + 18, h); ctx.stroke()
      // Xarxa
      ctx.strokeStyle = soft
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i <= 4; i++) {
        const top = x1 + (i * (x2 - x1)) / 4
        const bottom = rimX - 14 + (i * 28) / 4
        ctx.moveTo(top, rimY); ctx.lineTo(bottom, rimY + 30)
      }
      ctx.moveTo(rimX - 18, rimY + 12); ctx.lineTo(rimX + 18, rimY + 12)
      ctx.moveTo(rimX - 15, rimY + 22); ctx.lineTo(rimX + 15, rimY + 22)
      ctx.stroke()
      // Cèrcol
      ctx.strokeStyle = ink
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(x1, rimY); ctx.lineTo(x2, rimY); ctx.lineTo(boardX, rimY); ctx.stroke()
    }

    function drawBall() {
      const fill = getComputedStyle(wrapRef.current).getPropertyValue("--spot").trim() || ink
      ctx.fillStyle = fill
      ctx.beginPath(); ctx.arc(ball.x, ball.y, R, 0, Math.PI * 2); ctx.fill()
      // Costures
      ctx.strokeStyle = tone === "dark" ? "#1a1a1a" : "#ffffff"
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(ball.x - R, ball.y); ctx.lineTo(ball.x + R, ball.y)
      ctx.moveTo(ball.x, ball.y - R); ctx.lineTo(ball.x, ball.y + R)
      ctx.stroke()
    }

    function drawAim() {
      if (!drag.on) return
      const pullX = ball.x - drag.x, pullY = ball.y - drag.y
      const len = Math.min(Math.hypot(pullX, pullY), MAX_PULL)
      if (len < 4) return
      const a = Math.atan2(pullY, pullX)
      let x = ball.x, y = ball.y
      let vx = Math.cos(a) * len * POWER, vy = Math.sin(a) * len * POWER
      ctx.fillStyle = soft
      for (let i = 0; i < 26; i++) {
        vy += G; x += vx; y += vy
        if (i % 2 === 0) { ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill() }
        if (y > h) break
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = soft
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, h - 0.5); ctx.lineTo(w, h - 0.5); ctx.stroke()
      drawHoop()
      drawAim()
      drawBall()
    }

    function loop() {
      cancelAnimationFrame(raf)
      const tick = () => {
        if (ball.live) step()
        draw()
        if (ball.live || drag.on) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // ── Entrada del punter (ratolí o dit) ──
    const point = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onDown = (e) => {
      if (ball.live) return
      const p = point(e)
      if (Math.hypot(p.x - ball.x, p.y - ball.y) > R * 3) return
      canvas.setPointerCapture(e.pointerId)
      Object.assign(drag, { on: true, ...p })
      loop()
    }
    const onMove = (e) => { if (drag.on) Object.assign(drag, point(e)) }
    const onUp = () => {
      if (!drag.on) return
      drag.on = false
      const pullX = ball.x - drag.x, pullY = ball.y - drag.y
      const len = Math.min(Math.hypot(pullX, pullY), MAX_PULL)
      if (len < 10) { draw(); return }
      const a = Math.atan2(pullY, pullX)
      launch(Math.cos(a) * len * POWER, Math.sin(a) * len * POWER)
    }

    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerup", onUp)
    canvas.addEventListener("pointercancel", onUp)
    const ro = new ResizeObserver(layout)
    ro.observe(wrapRef.current)
    api.current.autoShot = autoShot

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(msgTimer)
      ro.disconnect()
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointercancel", onUp)
    }
  }, [tone, height, t])

  const muted = tone === "dark" ? "text-white/60" : "text-slate"
  const main = tone === "dark" ? "text-white" : "text-ink"

  return (
    <div>
      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t("game.canvas")}
          className="block cursor-grab touch-none select-none active:cursor-grabbing"
        />
        <p aria-live="polite" className={`t-heading pointer-events-none absolute left-0 top-2 ${main}`}>{message}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className={`t-meta ${muted}`}>{t("game.hint")}</p>
        <div className="flex items-center gap-5">
          <p className={`t-meta index ${muted}`}>
            {t("game.made")} <span className={main}>{made}</span> · {t("game.tries")} <span className={main}>{tries}</span>
          </p>
          <button type="button" onClick={() => api.current.autoShot?.()} className={`btn ${tone === "dark" ? "btn-on-dark" : "btn-primary"}`}>
            {t("game.shoot")}
          </button>
        </div>
      </div>
    </div>
  )
}
