import { AnimatePresence, motion } from 'motion/react'
import { Heart, Sparkle } from './Decor'

// Random yang "tetap" (seeded) supaya posisi dekorasi tidak loncat saat re-render.
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rnd = seeded(2609)

const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  left: rnd() * 100,
  size: 14 + rnd() * 22,
  dur: 16 + rnd() * 14,
  delay: -rnd() * 30,
  color: i % 2 ? '#ff9ec7' : '#88bbff',
  opacity: 0.35 + rnd() * 0.4,
}))
const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  left: rnd() * 100,
  top: rnd() * 100,
  size: 8 + rnd() * 10,
  dur: 2 + rnd() * 3,
  delay: -rnd() * 4,
  color: i % 3 === 0 ? '#ffcf5c' : i % 3 === 1 ? '#ff9ec7' : '#88bbff',
}))
const CLOUDS = [
  { top: 9, scale: 1, dur: 85, delay: -20 },
  { top: 42, scale: 0.7, dur: 110, delay: -70 },
  { top: 76, scale: 0.85, dur: 95, delay: -45 },
]
const STARS = Array.from({ length: 55 }, () => ({
  left: rnd() * 100,
  top: rnd() * 100,
  size: 1 + rnd() * 2.5,
  dur: 1.8 + rnd() * 3,
  delay: -rnd() * 4,
}))
const PETALS = Array.from({ length: 14 }, () => ({
  left: rnd() * 100,
  dur: 9 + rnd() * 9,
  delay: -rnd() * 18,
  scale: 0.6 + rnd() * 0.8,
}))

export default function Background({ night = false }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-day absolute inset-0" />

      {CLOUDS.map((c, i) => (
        <div key={i} className="cloud" style={{ top: `${c.top}%`, scale: c.scale, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }} />
      ))}

      {HEARTS.map((h, i) => (
        <div key={i} className="bg-heart" style={{ left: `${h.left}%`, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s`, opacity: h.opacity }}>
          <span>
            <Heart color={h.color} className="block" style={{ width: h.size }} />
          </span>
        </div>
      ))}

      {SPARKLES.map((s, i) => (
        <div key={i} className="bg-sparkle" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}>
          <Sparkle className="h-full w-full" color={s.color} />
        </div>
      ))}

      <AnimatePresence>
        {night && (
          <motion.div className="bg-night absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6 }}>
            {STARS.map((s, i) => (
              <span key={i} className="bg-star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }} />
            ))}
            {PETALS.map((p, i) => (
              <span key={i} className="bg-petal" style={{ left: `${p.left}%`, scale: p.scale, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
