import confetti from 'canvas-confetti'

const COLORS = ['#ff78b0', '#ff9ec7', '#ffd1e6', '#5b9bf5', '#88bbff', '#ffffff']
const HEART_PATH =
  'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'

let heartShape
const heart = () => (heartShape ??= confetti.shapeFromPath({ path: HEART_PATH }))

/** Kembang api (canvas di FireworksCanvas) selama `duration` ms. */
export function launchFireworks(duration = 4000) {
  window.dispatchEvent(new CustomEvent('fx:fireworks', { detail: { duration } }))
}

/** Semburan confetti berbentuk hati dari titik origin (0..1). */
export function heartBurst(origin = { x: 0.5, y: 0.55 }, amount = 40) {
  confetti({
    particleCount: amount,
    spread: 100,
    startVelocity: 36,
    gravity: 0.85,
    ticks: 220,
    scalar: 1.6,
    origin,
    shapes: [heart()],
    colors: COLORS,
    zIndex: 80,
  })
}

/** Confetti bulat + bintang dari kiri & kanan layar. */
export function sideCannons() {
  const base = { particleCount: 60, spread: 70, startVelocity: 55, ticks: 240, colors: COLORS, shapes: ['circle', 'star'], zIndex: 80 }
  confetti({ ...base, angle: 60, origin: { x: 0, y: 0.75 } })
  confetti({ ...base, angle: 120, origin: { x: 1, y: 0.75 } })
}

/** Titik tengah elemen dalam koordinat 0..1 untuk canvas-confetti. */
export function originOf(el) {
  if (!el) return { x: 0.5, y: 0.5 }
  const r = el.getBoundingClientRect()
  return { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight }
}
