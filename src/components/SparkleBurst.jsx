import { useMemo } from 'react'
import { Flower, Heart, Sparkle } from './Decor'

const COLORS = ['#ff9ec7', '#88bbff', '#ffcf5c', '#ff78b0', '#b6d6ff']

/** Bunga + kilau kecil yang bermunculan di sekeliling foto saat di-hover / di-tap. */
export default function SparkleBurst({ count = 11 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const r = 50 + Math.random() * 10
        return {
          x: 50 + Math.cos(angle) * r,
          y: 50 + Math.sin(angle) * r,
          size: 14 + Math.random() * 14,
          delay: Math.random() * 0.9,
          dur: 1.1 + Math.random() * 0.8,
          kind: i % 3,
          color: COLORS[i % COLORS.length],
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {items.map((it, i) => (
        <span
          key={i}
          className="sparkle-item"
          style={{ left: `${it.x}%`, top: `${it.y}%`, width: it.size, height: it.size, animationDelay: `${it.delay}s`, animationDuration: `${it.dur}s` }}
        >
          {it.kind === 0 && <Flower className="h-full w-full" petal={it.color} />}
          {it.kind === 1 && <Sparkle className="h-full w-full" color={it.color === '#ff78b0' ? '#ffcf5c' : it.color} />}
          {it.kind === 2 && <Heart className="h-full w-full" color={it.color} shine={false} />}
        </span>
      ))}
    </div>
  )
}
