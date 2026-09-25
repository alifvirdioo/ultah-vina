import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import CuteButton from '../components/CuteButton'
import Mascot from '../components/Mascot'
import { Clock, Flower, Heart } from '../components/Decor'
import { useCountdown } from '../hooks/useCountdown'
import { useLater } from '../hooks/useLater'
import { useMusic } from '../context/MusicContext'
import { BIRTHDAY_TARGET, COPY, isCountdown } from '../config/content'
import { isPreview } from '../lib/params'
import { heartBurst, launchFireworks, originOf, sideCannons } from '../lib/fx'

const pad = (n) => String(n).padStart(2, '0')

function FlowerCluster({ flip = false }) {
  return (
    <span className={`relative inline-block h-12 w-8 shrink-0 sm:h-16 sm:w-14 ${flip ? '-scale-x-100' : ''}`} aria-hidden="true">
      {[
        { cls: 'left-0 top-1 w-7 sm:w-10', petal: '#ff9ec7', delay: 0.4, dur: 7 },
        { cls: 'left-4 top-6 w-5 sm:left-6 sm:top-8 sm:w-7', petal: '#88bbff', delay: 0.6, dur: 9 },
        { cls: 'left-0 top-8 w-3.5 sm:top-11 sm:w-5', petal: '#ffc4de', delay: 0.8, dur: 6 },
      ].map((f, i) => (
        <motion.span
          key={i}
          className={`absolute ${f.cls}`}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 10, delay: f.delay }}
        >
          <Flower className="anim-spin block w-full" petal={f.petal} style={{ animationDuration: `${f.dur}s` }} />
        </motion.span>
      ))}
    </span>
  )
}

function Unit({ value, label, tone, index }) {
  return (
    <motion.div
      className={`flex flex-col items-center rounded-3xl border-[3px] border-white px-1 pb-2 pt-1 shadow-[0_14px_30px_-14px_rgba(29,47,92,0.5)] sm:px-3 sm:pb-3 ${
        tone === 'pink' ? 'bg-linear-to-b from-pinky-200 to-pinky-300' : 'bg-linear-to-b from-stitch-200 to-stitch-300'
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 1 + index * 0.1 }}
    >
      <div className="relative h-[1.6em] w-full overflow-hidden text-center font-cute text-[1.9rem] leading-[1.6] text-white [text-shadow:0_3px_0_rgba(29,47,92,0.18)] sm:text-5xl md:text-6xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-round text-[0.65rem] font-bold uppercase tracking-[0.15em] text-stitch-900/70 sm:text-sm">{label}</span>
    </motion.div>
  )
}

export default function P03Countdown({ go }) {
  const target = useMemo(() => {
    if (!isCountdown) return Date.now() // countdown dimatikan → langsung selesai
    if (isPreview) return Date.now() + 8000
    return new Date(BIRTHDAY_TARGET).getTime()
  }, [])
  const { days, hours, minutes, seconds, done } = useCountdown(target)
  const [leaving, setLeaving] = useState(false)
  const music = useMusic()
  const later = useLater()

  // Countdown selesai → kembang api "congratulations"
  useEffect(() => {
    if (!done) return
    launchFireworks(6000)
    sideCannons()
  }, [done])

  const onNext = (e) => {
    if (leaving) return
    setLeaving(true)
    music.start()
    launchFireworks(4500)
    sideCannons()
    heartBurst(originOf(e.currentTarget), 60)
    later(() => go(4, 'flash'), 2800)
  }

  const units = [days, hours, minutes, seconds]

  return (
    <PageShell>
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Clock className="anim-wiggle w-11 sm:w-14" />
          <h2 className="font-cute text-2xl text-stitch-600 sm:text-4xl">{COPY.p3.counting}</h2>
        </motion.div>

        <motion.div
          className="mt-2 flex items-center justify-center gap-1 sm:gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 150, damping: 14 }}
        >
          <FlowerCluster />
          <h1 className="text-outline font-vibes text-[2.6rem] leading-tight text-pinky-500 sm:text-8xl">{COPY.p3.special}</h1>
          <FlowerCluster flip />
        </motion.div>

        <motion.p className="font-cute text-2xl text-stitch-700 sm:text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          {COPY.p3.coming}
        </motion.p>

        <motion.p
          className="mt-4 max-w-md font-script text-xl font-semibold leading-snug text-stitch-800 sm:max-w-xl sm:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          {COPY.p3.message}
        </motion.p>

        <div className="mt-8 grid w-full max-w-lg grid-cols-4 gap-2.5 sm:gap-4">
          {units.map((v, i) => (
            <Unit key={COPY.p3.labels[i]} value={v} label={COPY.p3.labels[i]} tone={i % 2 ? 'blue' : 'pink'} index={i} />
          ))}
        </div>

        <div className="mt-10 flex min-h-24 items-center justify-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="next"
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 12 }}
                className="flex flex-col items-center gap-3"
              >
                <CuteButton onClick={onNext} disabled={leaving} className="px-12 text-2xl">
                  {COPY.p3.next} <Heart className="w-6" color="#fff" shine={false} />
                </CuteButton>
              </motion.div>
            ) : (
              <motion.div key="wait" className="flex items-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 1.4 }}>
                <Mascot color="pink" mood="happy" className="anim-bob w-16 sm:w-20" />
                <p className="font-cute text-2xl text-pinky-500 sm:text-3xl">{COPY.p3.waiting}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  )
}
