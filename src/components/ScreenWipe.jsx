import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { HEART_D } from './Decor'

const GRADIENTS = {
  pink: ['#ffc4de', '#ff78b0', '#f7559a'],
  blue: ['#b6d6ff', '#5b9bf5', '#ff9ec7'],
}

/** Transisi antar-page: hati raksasa yang menutup layar, atau kilatan putih. */
export default function ScreenWipe({ wipe }) {
  return createPortal(
    <AnimatePresence>
      {wipe &&
        (wipe.variant === 'flash' ? (
          <motion.div
            key={wipe.id}
            className="fixed inset-0 z-[90] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <motion.div
            key={wipe.id}
            className="fixed inset-0 z-[90] grid place-items-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.svg
              viewBox="0 0 32 30"
              className="h-28 w-28"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 44, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            >
              <defs>
                <linearGradient id={`wipe-${wipe.id}`} x1="0" y1="0" x2="1" y2="1">
                  {GRADIENTS[wipe.variant].map((c, i) => (
                    <stop key={c} offset={i / 2} stopColor={c} />
                  ))}
                </linearGradient>
              </defs>
              <path d={HEART_D} fill={`url(#wipe-${wipe.id})`} />
            </motion.svg>
          </motion.div>
        ))}
    </AnimatePresence>,
    document.body,
  )
}
