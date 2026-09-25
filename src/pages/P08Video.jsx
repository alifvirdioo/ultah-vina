import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import PageShell from '../components/PageShell'
import CuteButton from '../components/CuteButton'
import Mascot from '../components/Mascot'
import { Heart, HEART_D, Sparkle } from '../components/Decor'
import { useMusic } from '../context/MusicContext'
import { COPY, MEDIA } from '../config/content'

export default function P08Video({ go }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | started | missing
  const { duck } = useMusic()

  // Pastikan musik jalan lagi kalau pindah halaman saat video masih diputar.
  useEffect(() => () => duck(false), [duck])

  const play = () => {
    videoRef.current
      ?.play()
      .then(() => setStatus('started'))
      .catch(() => {})
  }

  return (
    <PageShell>
      <motion.h1
        className="text-outline flex items-center justify-center gap-3 text-center font-vibes text-[3.4rem] leading-tight text-pinky-500 sm:text-8xl"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 13, delay: 0.2 }}
      >
        <Sparkle className="anim-twinkle w-6 sm:w-9" />
        {COPY.p8.title}
        <Sparkle className="anim-twinkle w-6 sm:w-9" color="#88bbff" style={{ animationDelay: '0.5s' }} />
      </motion.h1>

      <motion.div
        className="relative mt-8 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 14, delay: 0.4 }}
      >
        <span className="tape z-10" style={{ width: 110, left: '50%' }} />
        <div className="rounded-[1.8rem] bg-white p-3 shadow-[0_30px_60px_-24px_rgba(29,47,92,0.5)] sm:p-4">
          <div
            className="relative mx-auto max-h-[68svh] overflow-hidden rounded-[1.2rem] bg-stitch-900"
            style={{ aspectRatio: MEDIA.video.aspect, maxWidth: `calc(68svh * (${MEDIA.video.aspect}))` }}
          >
            <video
              ref={videoRef}
              src={MEDIA.video.src}
              poster={MEDIA.video.poster}
              playsInline
              preload="metadata"
              controls={status === 'started'}
              onPlay={() => {
                setStatus('started')
                duck(true)
              }}
              onPause={() => duck(false)}
              onEnded={() => duck(false)}
              onError={() => setStatus('missing')}
              className="h-full w-full object-contain"
            />

            {status === 'idle' && (
              <button
                type="button"
                onClick={play}
                aria-label="Putar video"
                className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-pinky-300/70 via-pinky-200/40 to-stitch-300/70"
              >
                <span className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                  <svg viewBox="0 0 32 30" className="relative h-full w-full drop-shadow-[0_10px_20px_rgba(185,37,102,0.45)] transition group-hover:scale-110">
                    <path d={HEART_D} fill="#f7559a" stroke="#fff" strokeWidth="1.6" />
                    <path d="M13 10.5 L20.5 15 L13 19.5 Z" fill="#fff" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="rounded-full bg-white/85 px-4 py-1 font-script text-lg font-bold text-pinky-600">{COPY.p8.playHint}</span>
              </button>
            )}

            {status === 'missing' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-pinky-100 to-stitch-100 p-4 text-center">
                <Mascot color="blue" mood="wink" className="anim-bob w-20 sm:w-28" />
                <p className="font-script text-xl font-bold text-stitch-700">{COPY.p8.missing}</p>
              </div>
            )}
          </div>
        </div>

        <Heart className="anim-beat absolute -left-3 -top-4 w-10" />
        <Heart className="anim-beat absolute -bottom-3 -right-2 w-8" color="#5b9bf5" style={{ animationDelay: '0.4s' }} />
      </motion.div>

      <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CuteButton onClick={() => go(9)}>
          {COPY.p8.button} <Sparkle className="w-5" color="#fff" />
        </CuteButton>
      </motion.div>
    </PageShell>
  )
}
