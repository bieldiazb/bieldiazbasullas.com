// ── Instància de Lenis compartida ─────────────────────────────────
// SmoothScroll la registra; altres components (el menú mòbil) la fan
// servir per aturar o reprendre el scroll. Pot ser null (reduced-motion).

let instance = null

export const setLenis = (lenis) => { instance = lenis }
export const getLenis = () => instance

// Atura o reprèn el scroll, amb o sense Lenis
export function lockScroll(locked) {
  if (instance) {
    if (locked) instance.stop()
    else instance.start()
  }
  document.documentElement.style.overflow = locked ? "hidden" : ""
}
