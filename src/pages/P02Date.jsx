import { useState } from 'react'
import { motion, useAnimate } from 'motion/react'
import PageShell from '../components/PageShell'
import Modal from '../components/Modal'
import Mascot from '../components/Mascot'
import { Heart, Sparkle } from '../components/Decor'
import { useToast } from '../context/ToastContext'
import { useLater } from '../hooks/useLater'
import { COPY, CORRECT_DATE } from '../config/content'
import { heartBurst } from '../lib/fx'

const pad = (n) => String(n).padStart(2, '0')

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 1 tanggal benar + 5 tanggal acak (unik), posisinya diacak.
function makeOptions() {
  const set = new Set([CORRECT_DATE])
  while (set.size < 6) {
    const d = 1 + Math.floor(Math.random() * 28)
    const m = 1 + Math.floor(Math.random() * 12)
    const y = 2021 + Math.floor(Math.random() * 9)
    set.add(`${pad(d)}-${pad(m)}-${y}`)
  }
  return shuffle([...set])
}

function DateOption({ value, index, onPick }) {
  const [scope, animate] = useAnimate()

  const onClick = () => {
    if (!onPick(value)) {
      animate(scope.current, { x: [0, -12, 12, -8, 8, -3, 0], rotate: [0, -4, 4, -2, 2, 0, 0] }, { duration: 0.5 })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.5 + index * 0.08 }}
    >
      <button
        ref={scope}
        type="button"
        onClick={onClick}
        className="chip-date w-full"
        style={{ '--chip': index % 2 ? 'var(--color-stitch-200)' : 'var(--color-pinky-200)' }}
      >
        {value}
      </button>
    </motion.div>
  )
}

export default function P02Date({ go }) {
  const [options] = useState(makeOptions)
  const [success, setSuccess] = useState(false)
  const toast = useToast()
  const later = useLater()

  const onPick = (value) => {
    if (success) return true
    if (value !== CORRECT_DATE) {
      toast(COPY.p2.wrong)
      return false
    }
    setSuccess(true)
    later(() => heartBurst({ x: 0.5, y: 0.45 }, 70), 250)
    later(() => go(3, 'blue'), 2300)
    return true
  }

  return (
    <PageShell>
      <div className="w-full max-w-xl text-center">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}>
          <Mascot color="blue" mood="joy" className="anim-bob mx-auto w-24 sm:w-28" />
        </motion.div>

        <h1 className="mt-3 font-cute text-[1.75rem] leading-snug sm:text-5xl">
          <span className="text-candy">{COPY.p2.title}</span>
        </h1>

        <p className="mt-5 flex items-center justify-center gap-2 font-script text-2xl font-bold text-stitch-700 sm:text-3xl">
          <Sparkle className="anim-twinkle w-5" />
          {COPY.p2.question}
          <Sparkle className="anim-twinkle w-5" color="#88bbff" />
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {options.map((value, i) => (
            <DateOption key={value} value={value} index={i} onPick={onPick} />
          ))}
        </div>
      </div>

      <Modal open={success}>
        <Mascot color="pink" mood="love" className="anim-bob mx-auto -mt-16 w-28" />
        <p className="mt-2 font-cute text-3xl text-pinky-600">{COPY.p2.right}</p>
        <div className="mt-3 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <Heart key={i} className="anim-beat w-6" color={i === 1 ? '#5b9bf5' : '#ff78b0'} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </Modal>
    </PageShell>
  )
}
