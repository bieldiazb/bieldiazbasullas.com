import { useId } from "react"

// ── Scallops ──────────────────────────────────────────────────────
// Vora festonejada d'un full: una fila de semicercles del color del
// camp retallats sobre la vora del paper.
//
// Props:
//   edge  — "top" | "bottom"
//   size  — diàmetre de cada festó en px (default: 28)

export function Scallops({ edge = "bottom", size = 28 }) {
  const id = useId()
  const r = size / 2
  const cy = edge === "top" ? 0 : r

  return (
    <svg
      aria-hidden
      width="100%" height={r}
      style={{ position: "absolute", left: 0, [edge]: 0, display: "block" }}
    >
      <defs>
        <pattern id={id} width={size} height={r} patternUnits="userSpaceOnUse">
          <circle cx={r} cy={cy} r={r} fill="var(--ground)" />
        </pattern>
      </defs>
      <rect width="100%" height={r} fill={`url(#${id})`} />
    </svg>
  )
}

// ── Corners ───────────────────────────────────────────────────────
// Cantonades interiors retallades (com una targeta impresa): quatre
// cercles del color del camp centrats a les cantonades.

export function Corners({ radius = 22 }) {
  const d = radius * 2
  const base = { position: "absolute", width: d, height: d, borderRadius: "50%", background: "var(--ground)" }
  return (
    <>
      <span aria-hidden style={{ ...base, top: -radius, left: -radius }} />
      <span aria-hidden style={{ ...base, top: -radius, right: -radius }} />
      <span aria-hidden style={{ ...base, bottom: -radius, left: -radius }} />
      <span aria-hidden style={{ ...base, bottom: -radius, right: -radius }} />
    </>
  )
}
