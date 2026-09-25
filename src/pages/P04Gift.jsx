import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Mascot from '../components/Mascot'
import Cake from '../components/Cake'
import { Bow, Heart, Sparkle } from '../components/Decor'
import { useLater } from '../hooks/useLater'
import { COPY } from '../config/content'
import { IMPROV } from '../config/improvisations'
import { heartBurst, launchFireworks, originOf, sideCannons } from '../lib/fx'

const BOX_MOTION = {
  idle: {
    animate: { rotate: [0, -5, 5, -3, 3, 0], y: [0, -8, 0, -4, 0, 0] },
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1.1 },
  },
  shaking: {
    animate: { rotate: [0, -10, 10, -12, 12, -8, 8, 0], x: [0, -6, 6, -7, 7, -4, 4, 0], scale: [1, 1.04, 1.04, 1.08, 1.08, 1.1, 1.1, 1] },
    transition: { duration: 0.75 },
  },
  open: { animate: { rotate: 0, x: 0, y: 0, scale: 1 }, transition: { duration: 0.3 } },
}

/** Kue 23 lilin yang muncul setelah kado terbuka (improvisasi p4Cake). */
function CakeScene({ go }) {
  const [left, setLeft] = useState(23)
  const [blown, setBlown] = useState(false)
  const cakeRef = useRef(null)
  const later = useLater()
  const t = COPY.p4

  const onAllOut = () => {
    setBlown(true)
    later(() => {
      heartBurst(originOf(cakeRef.current), 90)
      sideCannons()
      launchFireworks(2600)
    }, 350)
    later(() => go(5, 'flash'), 3600)
  }

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.6, y: 80 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
    >
      <p className="font-cute text-[1.7rem] leading-snug text-pinky-500 sm:text-4xl">{t.wishFirst}</p>
      <p className="mt-2 font-script text-xl font-bold text-stitch-700 sm:text-2xl">{t.blowHint}</p>

      <div ref={cakeRef} className="relative mt-8 flex items-end">
        <Mascot color="pink" mood={blown ? 'joy' : 'love'} className="anim-bob z-10 -mr-5 w-14 sm:w-24" />
        <Cake className="w-64 sm:w-96" onAllOut={onAllOut} onGust={setLeft} puffText={t.puff} />
        <Mascot color="blue" mood={blown ? 'joy' : 'wow'} className="anim-float z-10 -ml-5 w-14 sm:w-24" />
      </div>

      <div className="mt-6 flex h-14 items-center">
        <AnimatePresence mode="wait">
          {blown ? (
            <motion.p
              key="blown"
              className="font-cute text-2xl text-pinky-500 sm:text-4xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 11 }}
            >
              {t.blown}
            </motion.p>
          ) : (
            <motion.p
              key={left}
              className="rounded-full bg-white/80 px-4 py-1 font-script text-xl font-bold text-stitch-700"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            >
              🕯️ {t.candlesLeft.replace('{n}', left)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function P04Gift({ go }) {
  const [phase, setPhase] = useState('idle')
  const [scene, setScene] = useState('gift')
  const boxRef = useRef(null)
  const later = useLater()

  const open = () => {
    if (phase !== 'idle') return
    setPhase('shaking')
    later(() => {
      setPhase('open')
      heartBurst(originOf(boxRef.current), 80)
      sideCannons()
    }, 750)
    if (IMPROV.p4Cake) later(() => setScene('cake'), 3300)
    else later(() => go(5, 'flash'), 3900)
  }

  const isOpen = phase === 'open'

  return (
    <PageShell>
      <AnimatePresence mode="wait">
        {scene === 'cake' ? (
          <CakeScene key="cake" go={go} />
        ) : (
          <motion.div key="gift" className="relative flex flex-col items-center pt-28" exit={{ opacity: 0, scale: 0.7, y: 60, transition: { duration: 0.45 } }}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="gift-rays pointer-events-none absolute left-1/2 top-[-3.5rem] h-[26rem] w-[26rem] -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: 90 }}
                  transition={{ scale: { duration: 0.6 }, opacity: { duration: 0.6 }, rotate: { duration: 6, ease: 'linear' } }}
                />
              )}
            </AnimatePresence>

            {['left-[-1.5rem] top-32 w-6', 'right-[-1.25rem] top-40 w-5', 'left-[-0.5rem] bottom-16 w-4', 'right-[-1rem] bottom-24 w-7'].map((cls, i) => (
              <Sparkle key={cls} className={`anim-twinkle absolute ${cls}`} color={i % 2 ? '#88bbff' : '#ffcf5c'} style={{ animationDelay: `${i * 0.4}s` }} />
            ))}

            <motion.div
              ref={boxRef}
              role="button"
              tabIndex={0}
              aria-label="Buka kado"
              onClick={open}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
              className="relative h-48 w-52 cursor-pointer sm:h-56 sm:w-60"
              animate={BOX_MOTION[phase].animate}
              transition={BOX_MOTION[phase].transition}
              whileHover={phase === 'idle' ? { scale: 1.05 } : undefined}
            >
              <motion.div
                className="absolute left-1/2 top-[8%] w-[64%] -translate-x-1/2"
                initial={{ y: 40, scale: 0.3, opacity: 0 }}
                animate={isOpen ? { y: -100, scale: 1, opacity: 1 } : { y: 40, scale: 0.3, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 170, damping: 10, delay: isOpen ? 0.2 : 0 }}
              >
                <Mascot color="blue" mood="love" />
              </motion.div>

              <div className="gift-body absolute bottom-0 left-0 h-[70%] w-full rounded-b-[1.6rem] rounded-t-md">
                <div className="gift-ribbon absolute left-1/2 top-0 h-full w-[18%] -translate-x-1/2" />
              </div>

              <motion.div
                className="gift-lid absolute left-[-7%] top-[14%] h-[20%] w-[114%] rounded-2xl"
                animate={isOpen ? { y: -260, x: 110, rotate: 45, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.2, 0.8, 0.4, 1] }}
              >
                <div className="gift-ribbon absolute left-1/2 top-0 h-full w-[16%] -translate-x-1/2 rounded-sm" />
                <Bow className="absolute bottom-[80%] left-1/2 w-[58%] -translate-x-1/2" />
              </motion.div>
            </motion.div>

            <div className="mt-10 flex h-16 items-center">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.p
                    key="opened"
                    className="font-cute text-4xl text-pinky-500 sm:text-5xl"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 11, delay: 0.3 }}
                  >
                    {COPY.p4.opened}
                  </motion.p>
                ) : (
                  <motion.p
                    key="hint"
                    className="flex items-center gap-2 font-script text-2xl font-bold text-stitch-700 sm:text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                    transition={{ y: { duration: 1.6, repeat: Infinity }, opacity: { duration: 0.4 } }}
                  >
                    <Heart className="w-5" /> {COPY.p4.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
