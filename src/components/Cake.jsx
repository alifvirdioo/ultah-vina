import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// 23 lilin di atas kue: 12 di baris belakang, 11 di baris depan.
const CANDLES = [
  ...Array.from({ length: 12 }, (_, i) => ({ x: 84 + i * 12, base: 95 })),
  ...Array.from({ length: 11 }, (_, i) => ({ x: 90 + i * 12, base: 106 })),
]
const DRIPS = [
  [52, 8],
  [74, 11],
  [98, 7],
  [124, 12],
  [150, 8],
  [178, 11],
  [204, 7],
  [228, 10],
  [250, 7],
]
const SPRINKLES = [
  [60, 205, 20, '#5b9bf5'],
  [90, 222, -30, '#ffcf5c'],
  [118, 200, 50, '#fff'],
  [150, 226, 10, '#5b9bf5'],
  [182, 204, -40, '#ffcf5c'],
  [212, 224, 30, '#fff'],
  [240, 206, -15, '#5b9bf5'],
  [104, 142, 25, '#ff78b0'],
  [140, 150, -20, '#ffcf5c'],
  [176, 140, 40, '#fff'],
  [206, 152, -35, '#ff78b0'],
]

const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((p) => p[1])

/**
 * Kue ulang tahun dengan 23 lilin. Tiap tap = "tiupan" yang mematikan beberapa lilin.
 * onAllOut dipanggil sekali saat semua lilin padam.
 */
export default function Cake({ onAllOut, onGust, puffText = 'fuuuh~', className = '' }) {
  const [lit, setLit] = useState(() => CANDLES.map(() => true))
  const [puffs, setPuffs] = useState([])
  const doneRef = useRef(false)

  const blow = (e) => {
    if (doneRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Math.random()
    setPuffs((p) => [...p.slice(-3), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setPuffs((p) => p.filter((q) => q.id !== id)), 900)

    const burning = lit.flatMap((on, i) => (on ? [i] : []))
    const out = new Set(shuffle(burning).slice(0, 6 + Math.floor(Math.random() * 3)))
    const next = lit.map((on, i) => on && !out.has(i))
    setLit(next)
    const left = next.filter(Boolean).length
    onGust?.(left)
    if (left === 0) {
      doneRef.current = true
      onAllOut?.()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 262" className="w-full cursor-pointer select-none" onClick={blow} role="button" aria-label="Tiup lilin">
        <defs>
          <linearGradient id="cake-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6c2" />
            <stop offset=".55" stopColor="#ffcf5c" />
            <stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="244" rx="140" ry="15" fill="#fff" stroke="#ffc4de" strokeWidth="3" />

        {/* Tingkat bawah (pink) */}
        <rect x="38" y="165" width="224" height="78" rx="16" fill="#ff9ec7" />
        <rect x="38" y="165" width="224" height="16" rx="8" fill="#fff" />
        {DRIPS.map(([x, r]) => (
          <ellipse key={x} cx={x} cy="182" rx={r * 0.8} ry={r} fill="#fff" />
        ))}

        {/* Tingkat atas (biru) */}
        <rect x="72" y="100" width="156" height="70" rx="14" fill="#88bbff" />
        <rect x="72" y="104" width="156" height="12" rx="6" fill="#fff" />
        {DRIPS.slice(2, 7).map(([x, r]) => (
          <ellipse key={x} cx={x} cy="117" rx={r * 0.7} ry={r * 0.9} fill="#fff" />
        ))}
        {SPRINKLES.map(([x, y, rot, c], i) => (
          <rect key={i} x={x} y={y} width="9" height="3.5" rx="1.75" fill={c} transform={`rotate(${rot} ${x + 4.5} ${y + 1.75})`} />
        ))}
        <ellipse cx="150" cy="100" rx="78" ry="12" fill="#fff" />

        {CANDLES.map((c, i) => {
          const cx = c.x + 2.5
          const top = c.base - 24
          return (
            <g key={i}>
              <rect x={c.x} y={top} width="5" height="24" rx="1.5" fill={i % 2 ? '#5b9bf5' : '#ff78b0'} />
              <path d={`M${c.x} ${top + 7} L${c.x + 5} ${top + 4} M${c.x} ${top + 15} L${c.x + 5} ${top + 12}`} stroke="#fff" strokeWidth="1.4" />
              <line x1={cx} y1={top} x2={cx} y2={top - 4} stroke="#4a4a5a" strokeWidth="1" />
              <AnimatePresence>
                {lit[i] ? (
                  <motion.g key="flame" exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                    <circle cx={cx} cy={top - 10} r="7" fill="#ffcf5c" opacity=".28" />
                    <path
                      className="cake-flame"
                      style={{ animationDelay: `${(i * 0.13) % 0.6}s` }}
                      d={`M${cx} ${top - 17} C${cx + 4.5} ${top - 11} ${cx + 4} ${top - 5} ${cx} ${top - 4} C${cx - 4} ${top - 5} ${cx - 4.5} ${top - 11} ${cx} ${top - 17} Z`}
                      fill="url(#cake-flame)"
                    />
                  </motion.g>
                ) : (
                  <motion.path
                    key="smoke"
                    d={`M${cx} ${top - 5} q -4 -6 0 -12 q 4 -6 0 -12`}
                    stroke="#b8c2d6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -16 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {puffs.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute whitespace-nowrap font-cute text-lg text-stitch-500"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.6, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1.1, y: '-160%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {puffText}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
