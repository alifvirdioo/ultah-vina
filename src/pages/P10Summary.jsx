import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Polaroid from '../components/Polaroid'
import CuteButton from '../components/CuteButton'
import Mascot from '../components/Mascot'
import Photobooth from '../components/Photobooth'
import { Balloon, Crown, Flower, Heart, Sparkle } from '../components/Decor'
import { useToast } from '../context/ToastContext'
import { useLater } from '../hooks/useLater'
import { COPY, HER, PHOTOS } from '../config/content'
import { IMPROV } from '../config/improvisations'
import { heartBurst, originOf, sideCannons } from '../lib/fx'

const t = COPY.p10

/** Kalender yang "membalik" tanggal 1 → 26, lalu berhenti di hari lahir Vina. */
function BirthdayCalendar({ className = '' }) {
  const { day, monthShort, year } = HER.birthday
  const [n, setN] = useState(1)

  useEffect(() => {
    if (n >= day) return
    const id = setTimeout(() => setN((v) => v + 1), n < day - 5 ? 55 : 150)
    return () => clearTimeout(id)
  }, [n, day])

  const landed = n === day

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: [-5, 5, -5] }}
      transition={{ scale: { type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }, rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <div className="absolute -top-2 left-0 right-0 z-10 flex justify-around px-4" aria-hidden="true">
        <span className="h-5 w-2.5 rounded-full bg-stitch-700 ring-2 ring-white" />
        <span className="h-5 w-2.5 rounded-full bg-stitch-700 ring-2 ring-white" />
      </div>
      <div className="calendar-card text-center">
        <div className="bg-linear-to-r from-pinky-400 to-pinky-500 py-1.5 font-round text-sm font-bold tracking-[0.25em] text-white sm:text-base">{monthShort}</div>
        <div className="relative h-[4.2rem] overflow-hidden [perspective:400px] sm:h-20">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={n}
              className="absolute inset-0 grid place-items-center font-cute text-[2.6rem] leading-none text-stitch-700 sm:text-5xl"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              {n}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="pb-1.5 font-round text-[0.7rem] font-bold tracking-widest text-stitch-400 sm:text-xs">{year}</div>
      </div>
      <AnimatePresence>
        {landed && (
          <motion.div className="absolute -right-3 -top-4" initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.5 }}>
            <Heart className="anim-beat w-8" />
          </motion.div>
        )}
      </AnimatePresence>
      <p className="mt-1.5 whitespace-nowrap text-center font-script text-sm font-bold text-pinky-600 sm:text-base">{t.calendarCaption}</p>
    </motion.div>
  )
}

function PhotoStrip({ vertical = false, className = '' }) {
  return (
    <motion.div
      className={`photo-strip flex gap-2 p-2 ${vertical ? 'flex-col pb-1' : ''} ${className}`}
      initial={{ opacity: 0, y: 30, rotate: vertical ? -8 : 8 }}
      animate={{ opacity: 1, y: 0, rotate: vertical ? -3 : 4 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.9 }}
    >
      {PHOTOS.her.strip.map((p, i) => (
        <div key={p.src} className="relative min-w-0 flex-1">
          <Polaroid src={p.src} label={`foto ${i + 4}`} className="!p-1 [&_figcaption]:hidden" />
          {i === 0 && <Heart className="anim-beat absolute -right-1.5 -top-1.5 w-4" />}
          {i === 1 && <Sparkle className="anim-twinkle absolute -left-1.5 -top-1.5 w-4" />}
          {i === 2 && <Flower className="anim-spin absolute -bottom-1.5 -right-1.5 w-4" petal="#88bbff" />}
        </div>
      ))}
      <p className={`self-center whitespace-nowrap font-cute text-xs text-pinky-500 sm:text-sm ${vertical ? 'py-1' : '[writing-mode:vertical-rl]'}`}>{t.stripLabel}</p>
    </motion.div>
  )
}

const RISING = Array.from({ length: 9 }, (_, i) => ({
  left: 8 + ((i * 37) % 84),
  size: 14 + ((i * 7) % 14),
  dur: 3.2 + (i % 4) * 0.7,
  delay: i * 0.55,
  color: i % 3 === 0 ? '#5b9bf5' : '#ff78b0',
}))

function PhotoStack() {
  const [left, right] = PHOTOS.her.sides
  return (
    <div className="relative mx-auto w-[52vw] max-w-[270px] md:w-[58vw]">
      {RISING.map((h, i) => (
        <span key={i} className="rising-heart z-0" style={{ left: `${h.left}%`, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}>
          <Heart color={h.color} style={{ width: h.size }} />
        </span>
      ))}

      <motion.div
        className="absolute -left-[28%] top-[16%] z-0 w-[58%] md:-left-[34%] md:w-[62%]"
        initial={{ opacity: 0, x: 60, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: -14 }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, delay: 0.6 }}
      >
        <div className="anim-sway">
          <Polaroid src={left.src} label="foto 2" tape="blue" />
        </div>
      </motion.div>
      <motion.div
        className="absolute -right-[28%] top-[22%] z-0 w-[58%] md:-right-[34%] md:w-[62%]"
        initial={{ opacity: 0, x: -60, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: 13 }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, delay: 0.75 }}
      >
        <div className="anim-sway" style={{ animationDelay: '-2s' }}>
          <Polaroid src={right.src} label="foto 3" tape="pink" />
        </div>
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.3 }}
      >
        <Polaroid src={PHOTOS.her.main.src} caption={PHOTOS.her.main.caption} label="foto utama" className="shadow-[0_30px_50px_-18px_rgba(247,85,154,0.55)]">
          <Crown className="anim-bob absolute -left-6 -top-8 w-20 -rotate-[20deg] drop-shadow-md sm:w-24" />
          <Sparkle className="anim-twinkle absolute -right-3 -top-3 w-7" />
          <Sparkle className="anim-twinkle absolute right-6 top-8 w-4" color="#fff" style={{ animationDelay: '0.7s' }} />
          <Heart className="anim-beat absolute -right-4 top-[42%] w-8" />
          <span className="absolute -right-5 bottom-[26%] rotate-[8deg] rounded-full border-2 border-white bg-stitch-400 px-3 py-1 font-cute text-xs text-white shadow-md sm:text-sm">
            {t.tag} ♡
          </span>
          <Mascot color="blue" mood="love" className="anim-float absolute -bottom-8 -left-9 w-20 sm:w-24" />
        </Polaroid>
      </motion.div>
    </div>
  )
}

function WishCard({ wish, className = '' }) {
  const text = wish?.trim()
  return (
    <motion.div
      className={`relative rounded-3xl border-[3px] border-pinky-200 bg-white/92 p-5 text-left shadow-[0_20px_40px_-20px_rgba(29,47,92,0.45)] ${className}`}
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1.1 }}
    >
      <span className="tape" style={{ width: 80 }} />
      <p className="font-cute text-lg text-pinky-500">{t.wishLabel}</p>
      <p
        className={`cute-scroll mt-2 max-h-44 overflow-y-auto whitespace-pre-wrap break-words font-script font-semibold leading-snug text-stitch-900 ${
          text && text.length > 220 ? 'text-lg' : 'text-xl sm:text-2xl'
        }`}
      >
        {text ? `“${text}”` : t.wishEmpty}
      </p>
      {text && <p className="mt-2 text-right font-script text-base font-bold text-stitch-500">{t.wishSign}</p>}
      <Heart className="anim-beat absolute -bottom-3 -left-3 w-8" color="#5b9bf5" />
    </motion.div>
  )
}

export default function P10Summary({ go, wish }) {
  const [flash, setFlash] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [booth, setBooth] = useState(false)
  const toast = useToast()
  const later = useLater()

  useEffect(() => {
    later(() => {
      heartBurst({ x: 0.5, y: 0.3 }, 60)
      sideCannons()
    }, 900)
  }, [later])

  const notYet = () => {
    setFlash((f) => f + 1)
    toast(t.notYet, { tone: 'blue', duration: 3200 })
  }

  const done = (e) => {
    if (leaving) return
    setLeaving(true)
    heartBurst(originOf(e.currentTarget), 60)
    go(11, 'pink')
  }

  return (
    <PageShell top>
      <header className="text-center">
        <motion.h1
          className="font-cute text-[2.2rem] leading-tight sm:text-6xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 12 }}
        >
          <span className="text-candy">{t.title}</span>
        </motion.h1>
        <motion.p className="font-script text-xl font-bold text-stitch-700 sm:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {HER.fullName} · {HER.age} ✨
        </motion.p>
      </header>

      <section className="relative mt-6 w-full max-w-5xl rounded-[2rem] border-[3px] border-dashed border-pinky-200 bg-white/45 px-3 pb-8 pt-6 backdrop-blur-[2px] sm:px-8 md:grid md:grid-cols-[1fr_minmax(0,1.2fr)_1fr] md:items-center md:gap-6 md:pt-12">
        <div className="pointer-events-none absolute -top-10 left-6 hidden md:flex" aria-hidden="true">
          <Balloon className="anim-float w-14" color="#ff78b0" text="2" />
          <Balloon className="anim-float -ml-2 mt-3 w-14" color="#5b9bf5" text="3" style={{ animationDelay: '-1.6s' }} />
        </div>

        <div className="mb-4 flex items-start justify-between gap-3 md:mb-0 md:flex-col md:items-center md:gap-8">
          <BirthdayCalendar className="w-24 sm:w-32" />
          <div className="pointer-events-none flex pr-2 md:hidden" aria-hidden="true">
            <Balloon className="anim-float w-12" color="#ff78b0" text="2" />
            <Balloon className="anim-float -ml-2 mt-3 w-12" color="#5b9bf5" text="3" style={{ animationDelay: '-1.6s' }} />
          </div>
          <div className="hidden md:block">
            <PhotoStrip vertical className="w-28" />
          </div>
        </div>

        <div className="py-6 md:py-0">
          <PhotoStack />
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-0">
          <WishCard wish={wish} className="w-full max-w-sm" />
          <div className="w-full max-w-[18rem] md:hidden">
            <PhotoStrip />
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col items-center text-center">
        <motion.p
          className="font-cute text-2xl leading-snug text-pinky-500 sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {t.photoPrompt}
        </motion.p>
        {IMPROV.p10Photobooth && (
          <motion.div className="mt-5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7, type: 'spring' }}>
            <CuteButton tone="white" onClick={() => setBooth(true)}>
              {t.boothOpen}
            </CuteButton>
          </motion.div>
        )}
        <p className="mt-6 font-script text-2xl font-bold text-stitch-800 sm:text-3xl">{t.question}</p>
        <div className="mt-4 flex gap-5">
          <CuteButton onClick={done} disabled={leaving}>
            {t.yes}
          </CuteButton>
          <CuteButton tone="blue" onClick={notYet}>
            {t.no} 📸
          </CuteButton>
        </div>
      </div>

      {IMPROV.p10Photobooth && <Photobooth open={booth} onClose={() => setBooth(false)} onSaved={() => toast(t.boothSaved, { duration: 3000 })} />}

      {createPortal(
        <AnimatePresence>
          {flash > 0 && (
            <motion.div
              key={flash}
              className="pointer-events-none fixed inset-0 z-[88] bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.55, times: [0, 0.15, 1] }}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </PageShell>
  )
}
