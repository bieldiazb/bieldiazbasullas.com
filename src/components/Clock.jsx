import { useEffect, useState } from "react"

// ── Clock ─────────────────────────────────────────────────────────
// Hora de Barcelona en directe (s'actualitza cada 30 s).

export default function Clock({ lang, className = "" }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(now)
  return <time className={`index ${className}`} dateTime={now.toISOString()}>{time}</time>
}
