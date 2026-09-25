import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import PageShell from '../components/PageShell'
import Polaroid from '../components/Polaroid'
import SparkleBurst from '../components/SparkleBurst'
import FlipBook from '../components/FlipBook'
import CuteButton from '../components/CuteButton'
import { Flower, Heart, Sparkle } from '../components/Decor'
import { COPY, PHOTOS } from '../config/content'
import { IMPROV } from '../config/improvisations'

function MemoryCard({ photo, index, onOpen }) {
  const [active, setActive] = useState(false)
  const timer = useRef(0)
  const rot = ((index * 47) % 13) - 6

  // Di HP tidak ada hover, jadi tap memunculkan kilau bunga sebentar.
  const pulse = () => {
    setActive(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(false), 1800)
    onOpen?.(photo, index)
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60, rotate: rot * 2.5, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: (index % 4) * 0.07 }}
      whileHover={{ scale: 1.08, rotate: 0, y: -10, zIndex: 20 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTap={pulse}
    >
      <div className="anim-sway" style={{ animationDuration: `${4 + (index % 5) * 0.6}s`, animationDelay: `${-index * 0.37}s` }}>
        <Polaroid
          src={photo.src}
          caption={photo.caption}
          label={`foto ${index + 1}`}
          tape={index % 3 === 0 ? (index % 2 ? 'blue' : 'pink') : undefined}
          className={active ? 'shadow-[0_24px_40px_-14px_rgba(247,85,154,0.6)]' : ''}
        />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SparkleBurst />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Lightbox({ item, onClose }) {
  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[85] grid place-items-center bg-stitch-900/40 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.6, rotate: -8 }}
            animate={{ scale: 1, rotate: -2 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <Polaroid src={item.photo.src} caption={item.photo.caption} label={`foto ${item.index + 1}`} tape="pink" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function P07Memories({ go }) {
  const [lightbox, setLightbox] = useState(null)
  const openPhoto = IMPROV.p7Lightbox ? (photo, index) => setLightbox({ photo, index }) : undefined

  return (
    <PageShell top>
      <header className="relative w-full max-w-4xl text-center">
        <div className="pointer-events-none absolute -top-2 left-0 flex gap-1 sm:left-6" aria-hidden="true">
          <Heart className="anim-beat w-7 sm:w-10" />
          <Flower className="anim-spin mt-5 w-6 sm:w-8" petal="#88bbff" />
        </div>
        <div className="pointer-events-none absolute -top-2 right-0 flex gap-1 sm:right-6" aria-hidden="true">
          <Flower className="anim-spin mt-5 w-6 sm:w-8" style={{ animationDirection: 'reverse' }} />
          <Heart className="anim-beat w-7 sm:w-10" color="#5b9bf5" style={{ animationDelay: '0.3s' }} />
        </div>

        <motion.h1
          className="px-8 font-cute text-[2.1rem] leading-tight sm:text-6xl"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 13, delay: 0.2 }}
        >
          <span className="text-candy">{COPY.p7.title}</span>
        </motion.h1>

        <motion.p
          className="mt-3 flex items-center justify-center gap-2 font-script text-2xl font-bold text-stitch-700 sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Sparkle className="anim-twinkle w-4" />
          {COPY.p7.subtitle}
          <span className="tracking-[0.12em]">
            <span className="dot-1"> .</span>
            <span className="dot-2"> .</span>
            <span className="dot-3"> .</span>
          </span>
        </motion.p>
      </header>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-5">
        {PHOTOS.memories.map((p, i) => (
          <MemoryCard key={p.src} photo={p} index={i} onOpen={openPhoto} />
        ))}
      </div>

      <section className="mt-20 flex w-full flex-col items-center">
        <motion.p
          className="mb-8 flex items-center gap-2 text-center font-script text-2xl font-bold text-stitch-700 sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="anim-beat w-6" /> {COPY.p7.bookHint}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 90, damping: 15 }}>
          <FlipBook photos={PHOTOS.book} />
        </motion.div>

        <motion.div className="mb-6 mt-14" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <CuteButton tone="blue" onClick={() => go(8)}>
            ▶ {COPY.p7.button}
          </CuteButton>
        </motion.div>
      </section>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </PageShell>
  )
}
