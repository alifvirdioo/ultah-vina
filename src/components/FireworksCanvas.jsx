import { useEffect, useRef } from 'react'

const COLORS = ['#ff4f9a', '#ff86bd', '#ffb3d4', '#3f7fe6', '#6fb7ff', '#9cc9ff', '#ffcf5c', '#c77dff']
const rand = (a, b) => a + Math.random() * (b - a)

/**
 * Kembang api di atas semua halaman. Dipicu lewat launchFireworks() di lib/fx.js.
 * Sebagian ledakan berbentuk hati ♡.
 */
export default function FireworksCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const rockets = []
    const sparks = []
    let w = 0
    let h = 0
    let raf = 0
    let until = 0
    let nextLaunch = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const launch = () => {
      const targetY = rand(h * 0.1, h * 0.42)
      rockets.push({
        x: rand(w * 0.12, w * 0.88),
        y: h + 10,
        vx: rand(-0.7, 0.7),
        vy: -Math.sqrt(2 * 0.12 * (h + 10 - targetY)),
        color: COLORS[(Math.random() * COLORS.length) | 0],
      })
    }

    const explode = (x, y, color) => {
      const heart = Math.random() < 0.4
      const n = heart ? 80 : Math.round(rand(60, 90))
      const power = rand(3.2, 4.8)
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2
        let vx
        let vy
        if (heart) {
          vx = (16 * Math.sin(t) ** 3 * power) / 16
          vy = (-(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * power) / 16
        } else {
          const s = power * rand(0.3, 1)
          vx = Math.cos(t) * s
          vy = Math.sin(t) * s
        }
        sparks.push({ x, y, vx, vy, life: 1, decay: rand(0.011, 0.02), color: Math.random() < 0.18 ? '#ffffff' : color, size: rand(1.8, 3) })
      }
    }

    const frame = (now) => {
      const dt = last ? Math.min(2.5, (now - last) / 16.67) : 1
      last = now

      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.26)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      if (now < until && now >= nextLaunch) {
        launch()
        if (Math.random() < 0.35) launch()
        nextLaunch = now + rand(260, 520)
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx * dt
        r.y += r.vy * dt
        r.vy += 0.12 * dt
        ctx.fillStyle = r.color
        ctx.beginPath()
        ctx.arc(r.x, r.y, 2.6, 0, Math.PI * 2)
        ctx.fill()
        if (r.vy >= -0.4) {
          explode(r.x, r.y, r.color)
          rockets.splice(i, 1)
        }
      }

      ctx.lineCap = 'round'
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        const px = p.x
        const py = p.y
        const drag = 0.975 ** dt
        p.vx *= drag
        p.vy = p.vy * drag + 0.05 * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.life -= p.decay * dt
        if (p.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = p.life
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      if (now < until || rockets.length || sparks.length) {
        raf = requestAnimationFrame(frame)
      } else {
        ctx.clearRect(0, 0, w, h)
        raf = 0
        last = 0
      }
    }

    const onFire = (e) => {
      until = Math.max(until, performance.now() + (e.detail?.duration ?? 4000))
      nextLaunch = 0
      if (!raf) raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('fx:fireworks', onFire)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('fx:fireworks', onFire)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[75] h-full w-full" />
}
