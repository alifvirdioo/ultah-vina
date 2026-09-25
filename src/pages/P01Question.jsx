import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Mascot from '../components/Mascot'
import { Heart, Sparkle } from '../components/Decor'
import { COPY } from '../config/content'
import { IMPROV } from '../config/improvisations'
import { heartBurst, originOf } from '../lib/fx'

const MARGIN = 16

// Cari posisi acak di layar yang jauh dari kursor/jari dan cukup jauh dari posisi sekarang.
function randomSpot(rect, pointer) {
  const maxX = Math.max(MARGIN, window.innerWidth - rect.width - MARGIN)
  const maxY = Math.max(MARGIN, window.innerHeight - rect.height - MARGIN)
  let best = { x: MARGIN, y: MARGIN }
  let bestDist = -1
  for (let i = 0; i < 40; i++) {
    const x = MARGIN + Math.random() * (maxX - MARGIN)
    const y = MARGIN + Math.random() * (maxY - MARGIN)
    const fromPointer = Math.hypot(x + rect.width / 2 - pointer.x, y + rect.height / 2 - pointer.y)
    const travel = Math.hypot(x - rect.left, y - rect.top)
    if (fromPointer > 190 && travel > 150) return { x, y }
    if (fromPointer > bestDist) {
      bestDist = fromPointer
      best = { x, y }
    }
  }
  return best
}

export default function P01Question({ go }) {
  const [escaped, setEscaped] = useState(null)
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const slotRef = useRef(null)
  const floatRef = useRef(null)
  const pointer = useRef({ x: -9999, y: -9999 })
  const lastEscape = useRef(0)

  // Tombol "G" kabur ke posisi acak, selamanya. Tidak akan pernah bisa diklik.
  const escape = useCallback(() => {
    const now = performance.now()
    if (now - lastEscape.current < 90) return
    lastEscape.current = now
    const el = floatRef.current ?? slotRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const spot = randomSpot(rect, pointer.current)
    setEscaped((prev) => ({ ...spot, from: prev?.from ?? { x: rect.left, y: rect.top } }))
    setCount((c) => c + 1)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY }
      if (e.pointerType !== 'mouse') return
      const el = floatRef.current ?? slotRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
      if (Math.hypot(dx, dy) < 40) escape()
    }
    const onResize = () => setEscaped((prev) => (prev ? { ...prev, x: Math.min(prev.x, window.innerWidth - 90), y: Math.min(prev.y, window.innerHeight - 70) } : prev))
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [escape])

  const dodge = (e) => {
    e.preventDefault()
    pointer.current = { x: e.clientX, y: e.clientY }
    escape()
  }

  const onYes = (e) => {
    if (leaving) return
    setLeaving(true)
    heartBurst(originOf(e.currentTarget), 60)
    go(2, 'pink')
  }

  const yesScale = IMPROV.p1Teasing ? 1 + Math.min(count, 12) * 0.07 : 1
  const noButtonProps = {
    type: 'button',
    'aria-label': COPY.p1.no,
    onPointerDown: dodge,
    onClick: dodge,
    onFocus: escape,
    className: 'btn-cute btn-blue min-w-24',
  }

  return (
    <PageShell>
      <motion.div
        className="card-cute w-full max-w-sm px-8 pb-10 pt-24 text-center sm:max-w-md"
        initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 190, damping: 13, delay: 0.25 }}
      >
        <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 items-end">
          <Mascot color="pink" mood={count > 0 ? 'tongue' : 'happy'} className="anim-bob -mr-5 w-24" />
          <Mascot color="blue" mood={count > 0 ? 'wow' : 'love'} className="anim-float w-28" />
        </div>
        <Sparkle className="anim-twinkle absolute left-6 top-8 w-5" color="#88bbff" />
        <Heart className="anim-beat absolute right-7 top-10 w-6" />

        <h1 className="font-cute text-[1.9rem] leading-snug text-stitch-800 sm:text-4xl">{COPY.p1.question}</h1>

        <div className="mt-9 flex items-center justify-center gap-6">
          <motion.button
            type="button"
            layout
            className="btn-cute min-w-24"
            onClick={onYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.08, rotate: -3 }}
            whileTap={{ scale: yesScale * 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          >
            {COPY.p1.yes}
          </motion.button>

          <button ref={slotRef} {...noButtonProps} hidden={!!escaped}>
            {COPY.p1.no}
          </button>
        </div>
      </motion.div>

      {escaped &&
        createPortal(
          <>
            <motion.button
              ref={floatRef}
              {...noButtonProps}
              className={`${noButtonProps.className} fixed left-0 top-0 z-[60]`}
              initial={{ x: escaped.from.x, y: escaped.from.y }}
              animate={{ x: escaped.x, y: escaped.y }}
              transition={{ type: 'spring', stiffness: 520, damping: 24 }}
            >
              <span key={count} className="anim-wiggle inline-block" style={{ animationIterationCount: 1, animationDuration: '0.4s' }}>
                {COPY.p1.no}
              </span>
            </motion.button>

            {IMPROV.p1Teasing && (
              <AnimatePresence>
                <motion.div
                  key={count}
                  className="bubble pointer-events-none fixed left-0 top-0 z-[61] whitespace-nowrap text-sm"
                  initial={{ opacity: 0, scale: 0.6, x: escaped.x + 10, y: escaped.y - 44 }}
                  animate={{ opacity: 1, scale: 1, x: Math.min(escaped.x + 10, window.innerWidth - 150), y: Math.max(escaped.y - 44, 8) }}
                  exit={{ opacity: 0 }}
                >
                  {COPY.p1.teases[count % COPY.p1.teases.length]}
                </motion.div>
              </AnimatePresence>
            )}
          </>,
          document.body,
        )}
    </PageShell>
  )
}
