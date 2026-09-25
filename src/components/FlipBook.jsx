import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Polaroid from './Polaroid'
import Mascot from './Mascot'
import { Heart, Sparkle } from './Decor'
import { COPY } from '../config/content'

function Face({ face }) {
  if (face.type === 'cover') {
    return (
      <div className="book-cover flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center text-white sm:gap-2">
        <div className="pointer-events-none absolute inset-2.5 rounded-[10px] border-2 border-dashed border-white/50" />
        <Heart className="anim-beat w-9 sm:w-12" color="#ff9ec7" />
        <h3 className="font-vibes text-glow text-[clamp(1.45rem,6.4vw,2.5rem)] leading-[1.05]">{COPY.p7.bookTitle}</h3>
        <p className="font-script text-sm font-bold sm:text-lg">{COPY.p7.bookNames}</p>
        <div className="flex items-end">
          <Mascot color="pink" mood="love" className="w-10 sm:w-14" />
          <Mascot color="blue" mood="joy" className="-ml-2 w-11 sm:w-16" />
        </div>
        <p className="font-round text-[9px] font-bold uppercase tracking-[0.2em] opacity-85 sm:text-[11px]">tap to open ✨</p>
      </div>
    )
  }

  if (face.type === 'photo') {
    return (
      <div className="page-paper flex h-full w-full items-center justify-center p-[10%]">
        <Polaroid
          src={face.photo.src}
          caption={face.photo.caption}
          label={`foto ${face.n}`}
          tape={face.n % 2 ? 'pink' : 'blue'}
          className="w-full"
          style={{ rotate: `${face.n % 2 ? -3 : 3}deg` }}
        />
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-round text-[10px] font-bold text-stitch-300">{face.n}</span>
      </div>
    )
  }

  if (face.type === 'outro') {
    return (
      <div className="page-paper flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="flex items-end">
          <Mascot color="pink" mood="love" className="w-14 sm:w-20" />
          <Mascot color="blue" mood="love" className="-ml-3 w-16 sm:w-24" />
        </div>
        <p className="font-script text-base font-bold text-stitch-800 sm:text-2xl">{COPY.p7.bookOutro}</p>
      </div>
    )
  }

  // Halaman paling belakang (kanan) setelah semua lembar dibalik
  return (
    <div className="page-paper flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
      <Sparkle className="anim-twinkle w-6" />
      <Heart className="anim-beat w-10 sm:w-14" />
      <p className="font-vibes text-2xl text-pinky-600 sm:text-4xl">{COPY.p7.bookEnd}</p>
    </div>
  )
}

/**
 * Buku foto 3D: cover → 2 foto per halaman terbuka → penutup.
 * Balik halaman: klik halaman kanan/kiri, swipe, atau tombol panah.
 */
export default function FlipBook({ photos }) {
  const leaves = useMemo(() => {
    const list = [{ front: { type: 'cover' }, back: { type: 'photo', photo: photos[0], n: 1 } }]
    for (let i = 1; i < photos.length; i += 2) {
      list.push({
        front: { type: 'photo', photo: photos[i], n: i + 1 },
        back: photos[i + 1] ? { type: 'photo', photo: photos[i + 1], n: i + 2 } : { type: 'outro' },
      })
    }
    return list
  }, [photos])

  const total = leaves.length
  const [flipped, setFlipped] = useState(0)
  const drag = useRef(null)

  const next = () => setFlipped((f) => Math.min(total, f + 1))
  const prev = () => setFlipped((f) => Math.max(0, f - 1))

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, swiped: false }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      d.swiped = true
      if (dx < 0) next()
      else prev()
    }
  }
  const onLeafClick = (i) => {
    if (drag.current?.swiped) return
    if (i === flipped) next()
    else if (i === flipped - 1) prev()
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="touch-pan-y select-none"
        style={{ '--pw': 'min(43vw, 270px)', width: 'calc(var(--pw) * 2)', height: 'calc(var(--pw) * 1.42)' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <motion.div className="book" animate={{ x: flipped === 0 ? '-25%' : '0%' }} transition={{ type: 'spring', stiffness: 70, damping: 15 }}>
          {/* Satu bayangan "lantai" saja: box-shadow di tiap lembar 3D bikin artefak kotak di sebagian browser */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 h-10 transition-[left] duration-700"
            style={{ left: flipped === 0 ? '51%' : '2%', right: '2%', background: 'radial-gradient(closest-side, rgba(29,47,92,0.38), transparent)' }}
          />
          <div className="absolute left-1/2 top-0 h-full w-1/2 overflow-hidden rounded-[4px_14px_14px_4px]">
            <Face face={{ type: 'end' }} />
          </div>

          {leaves.map((leaf, i) => {
            const isFlipped = i < flipped
            return (
              <div
                key={i}
                className="leaf"
                onClick={() => onLeafClick(i)}
                style={{ transform: `rotateY(${isFlipped ? -180 : 0}deg)`, zIndex: isFlipped ? i + 1 : total - i }}
              >
                <div className="leaf-face leaf-front">
                  <Face face={leaf.front} />
                </div>
                <div className="leaf-face leaf-back">
                  <Face face={leaf.back} />
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={flipped === 0}
          aria-label="Halaman sebelumnya"
          className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-pinky-300 font-round text-2xl font-bold text-white shadow-[0_4px_0_#e0357f] transition active:translate-y-1 active:shadow-none disabled:opacity-40"
        >
          ‹
        </button>
        <span className="min-w-20 text-center font-script text-xl font-bold text-stitch-700">
          {flipped === 0 ? 'cover' : `${flipped} / ${total}`}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={flipped === total}
          aria-label="Halaman berikutnya"
          className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-stitch-400 font-round text-2xl font-bold text-white shadow-[0_4px_0_#2f64c9] transition active:translate-y-1 active:shadow-none disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  )
}
