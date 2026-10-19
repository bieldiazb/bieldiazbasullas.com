// ── Estat del loader d'entrada ────────────────────────────────────
// El hero espera aquesta promesa per començar la seva entrada, de manera
// que les dues animacions queden encadenades. Si el loader no surt
// (segona visita de la sessió), es resol de seguida.

let resolveIntro
export const introDone = new Promise((resolve) => { resolveIntro = resolve })

export function markIntroDone() {
  resolveIntro()
}

export const INTRO_KEY = "intro-seen"
