// ── SectionLabel ──────────────────────────────────────────────────
// Etiqueta de secció (DESIGN.md eyebrow) amb el seu número d'índex.

export default function SectionLabel({ index, children, className = "", ...props }) {
  return (
    <p className={`t-eyebrow flex items-baseline gap-3 ${className}`} {...props}>
      <span className="index">{index}</span>
      <span aria-hidden className="h-px w-8 translate-y-[-0.25em] bg-current opacity-40" />
      <span>{children}</span>
    </p>
  )
}
