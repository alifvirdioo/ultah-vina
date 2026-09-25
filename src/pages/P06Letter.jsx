import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import CuteButton from '../components/CuteButton'
import Mascot from '../components/Mascot'
import { Heart } from '../components/Decor'
import { useTypewriter } from '../hooks/useTypewriter'
import { COPY, LETTER, LETTER_TYPING_SPEED } from '../config/content'

export default function P06Letter({ go }) {
  const { typed, done } = useTypewriter(LETTER, { speed: LETTER_TYPING_SPEED, startDelay: 1300 })
  const boxRef = useRef(null)
  const followRef = useRef(true)

  // Selama mengetik, kertas ikut scroll ke baris terbaru, kecuali kalau Vina sedang scroll ke atas.
  useEffect(() => {
    const box = boxRef.current
    if (box && followRef.current && !done) box.scrollTop = box.scrollHeight
  }, [typed, done])

  const onScroll = () => {
    const b = boxRef.current
    followRef.current = b.scrollHeight - b.scrollTop - b.clientHeight < 48
  }

  return (
    <PageShell>
      <motion.article
        className="relative w-full max-w-2xl"
        initial={{ rotateX: 75, opacity: 0, y: 80 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.2, 0.9, 0.3, 1] }}
        style={{ transformPerspective: 1200, transformOrigin: 'top center' }}
      >
        <span className="tape z-10" style={{ width: 96, left: 24, transform: 'rotate(-8deg)' }} />
        <span className="tape tape-blue z-10" style={{ width: 96, left: 'auto', right: 24, transform: 'rotate(7deg)' }} />

        <div className="overflow-hidden rounded-[1.6rem] border-4 border-white bg-cream shadow-[0_30px_60px_-24px_rgba(29,47,92,0.45)]">
          <div
            ref={boxRef}
            onScroll={onScroll}
            className="paper-lines cute-scroll h-[64svh] overflow-y-auto whitespace-pre-wrap break-words pb-10 pl-12 pr-5 font-script text-[1.3rem] font-medium text-stitch-900 sm:h-[66vh] sm:pl-14 sm:pr-10 sm:text-2xl"
          >
            {typed}
            {!done && <span className="caret" />}
          </div>
        </div>

        <motion.div
          className="absolute -bottom-7 -right-3 w-20 sm:-right-8 sm:w-24"
          initial={{ scale: 0, rotate: 30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 1.2 }}
        >
          <Mascot color="pink" mood={done ? 'love' : 'happy'} className="anim-bob" />
        </motion.div>
        <div className="absolute -left-4 -top-5 grid h-14 w-14 place-items-center rounded-full bg-pinky-500 shadow-[0_6px_14px_-4px_rgba(185,37,102,0.7)] ring-4 ring-pinky-300">
          <Heart className="anim-beat w-7" color="#fff" shine={false} />
        </div>
      </motion.article>

      <div className="mt-12 flex h-16 items-center">
        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
              <CuteButton onClick={() => go(7)}>
                {COPY.p6.button} <Heart className="w-5" color="#fff" shine={false} />
              </CuteButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
