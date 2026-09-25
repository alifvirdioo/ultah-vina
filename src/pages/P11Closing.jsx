import { motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Mascot from '../components/Mascot'
import { Heart, Sparkle } from '../components/Decor'
import { CLOSING_QUOTES, COPY } from '../config/content'
import { IMPROV } from '../config/improvisations'

export default function P11Closing({ go }) {
  const quotesStart = 2.2

  return (
    <PageShell className="text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 10, delay: 0.6 }}>
        <Heart className="anim-beat mx-auto w-14 drop-shadow-[0_0_18px_rgba(255,120,176,0.9)] sm:w-16" />
      </motion.div>

      <motion.h1
        className="text-glow mt-3 font-vibes text-[4rem] leading-none text-white sm:text-9xl"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, delay: 0.9 }}
      >
        {COPY.p11.title}
      </motion.h1>

      <motion.p
        className="mt-5 font-script text-xl font-bold text-pinky-200 sm:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
      >
        {COPY.p11.from}
      </motion.p>

      <div className="mt-12 max-w-2xl space-y-6 px-2">
        {CLOSING_QUOTES.map((q, i) => (
          <motion.p
            key={q}
            className="flex items-start justify-center gap-2 font-script text-xl font-semibold leading-snug text-white/90 sm:text-2xl"
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: quotesStart + i * 1.5 }}
          >
            <Sparkle className="anim-twinkle mt-2 w-3 shrink-0" color={i % 2 ? '#88bbff' : '#ffc4de'} />
            <span>“{q}”</span>
          </motion.p>
        ))}
      </div>

      <motion.div
        className="mt-14 flex items-end justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: quotesStart + CLOSING_QUOTES.length * 1.5, type: 'spring' }}
      >
        <Mascot color="pink" mood="love" className="anim-bob w-16 sm:w-20" />
        <Mascot color="blue" mood="joy" className="anim-float -ml-3 w-20 sm:w-24" />
      </motion.div>

      {IMPROV.p11ReplayButton && (
        <motion.button
          type="button"
          onClick={() => go(1, 'pink')}
          className="mt-10 font-script text-lg font-bold text-white/70 underline decoration-dotted underline-offset-4 hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: quotesStart + CLOSING_QUOTES.length * 1.5 + 1 }}
        >
          {COPY.p11.replay}
        </motion.button>
      )}
    </PageShell>
  )
}
