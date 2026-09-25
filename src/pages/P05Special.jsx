import { motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Polaroid from '../components/Polaroid'
import CuteButton from '../components/CuteButton'
import { Envelope, Flower, Heart, Sparkle } from '../components/Decor'
import { COPY, PHOTOS } from '../config/content'

// Tiap polaroid punya gaya goyang sendiri supaya kelihatan "hidup".
const WIGGLES = [
  { rotate: [-8, -3, -8], y: [0, -10, 0], duration: 3.2 },
  { rotate: [6, 10, 2, 6], y: [0, -4, 0, -2], duration: 4 },
  { rotate: [-4, 2, -4], y: [0, -8, 0], duration: 3.6 },
  { rotate: [7, 2, 7], y: [0, -9, 0], duration: 3.4 },
  { rotate: [-6, -10, -2, -6], y: [0, -5, 0, -3], duration: 4.2 },
  { rotate: [4, -2, 4], y: [0, -7, 0], duration: 3.8 },
]

function PolaroidColumn({ photos, offset, side }) {
  return (
    <div className="flex items-start justify-center gap-1 md:flex-col md:items-center md:gap-4">
      {photos.map((p, i) => {
        const w = WIGGLES[i + offset]
        const shift = side === 'left' ? ['md:-translate-x-6', 'md:translate-x-8', 'md:-translate-x-4'][i] : ['md:translate-x-6', 'md:-translate-x-8', 'md:translate-x-4'][i]
        return (
          <motion.div
            key={p.src}
            className={`w-[30%] max-w-36 md:w-40 lg:w-44 md:max-w-none ${shift} ${i === 1 ? 'mt-4 md:mt-0' : ''}`}
            initial={{ opacity: 0, scale: 0.3, x: side === 'left' ? -80 : 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 13, delay: 0.3 + (i + offset) * 0.12 }}
          >
            <motion.div
              animate={{ rotate: w.rotate, y: w.y }}
              transition={{ duration: w.duration, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
              className="relative"
            >
              <Polaroid src={p.src} caption={p.caption} label={`foto ${i + offset + 1}`} tape={i % 2 ? 'blue' : 'pink'} />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function P05Special({ go }) {
  const left = PHOTOS.special.slice(0, 3)
  const right = PHOTOS.special.slice(3, 6)

  return (
    <PageShell>
      <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-[1fr_minmax(0,1.4fr)_1fr] md:gap-4">
        <PolaroidColumn photos={left} offset={0} side="left" />

        <div className="flex flex-col items-center text-center">
          <motion.div className="flex items-center gap-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.9 }}>
            <Flower className="anim-spin w-7" petal="#88bbff" />
            <Heart className="anim-beat w-9" />
            <Flower className="anim-spin w-7" style={{ animationDirection: 'reverse' }} />
          </motion.div>

          <motion.h1
            className="text-outline mt-2 font-vibes text-[3.6rem] leading-[1.05] text-pinky-500 sm:text-8xl"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.5 }}
          >
            {COPY.p5.title}
          </motion.h1>

          <motion.p
            className="mt-4 flex max-w-sm items-start gap-2 font-script text-lg font-semibold leading-snug text-stitch-700 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Sparkle className="anim-twinkle mt-1 w-4 shrink-0" />
            {COPY.p5.credit}
            <Sparkle className="anim-twinkle mt-1 w-4 shrink-0" color="#88bbff" />
          </motion.p>

          <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
            <CuteButton tone="blue" onClick={() => go(6)}>
              <Envelope className="w-7 text-stitch-600" />
              {COPY.p5.button}
            </CuteButton>
          </motion.div>
        </div>

        <PolaroidColumn photos={right} offset={3} side="right" />
      </div>
    </PageShell>
  )
}
