import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import PageShell from '../components/PageShell'
import CuteButton from '../components/CuteButton'
import Mascot from '../components/Mascot'
import { Heart, Sparkle } from '../components/Decor'
import { useLater } from '../hooks/useLater'
import { COPY } from '../config/content'
import { heartBurst } from '../lib/fx'

export default function P09Wishes({ go, wish, setWish }) {
  const [draft, setDraft] = useState(wish)
  const [focused, setFocused] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [sending, setSending] = useState(false)
  const [btnScope, animateBtn] = useAnimate()
  const later = useLater()
  const t = COPY.p9

  // Simpan draft di browser supaya tidak hilang kalau halaman ter-refresh.
  useEffect(() => {
    if (!sending) setWish(draft)
  }, [draft, sending, setWish])

  const bubble = nudge ? t.bubbles.empty : focused ? t.bubbles.typing : draft.trim() ? t.bubbles.ready : t.bubbles.idle

  const submit = () => {
    if (sending) return
    const text = draft.trim()
    if (!text) {
      setNudge(true)
      animateBtn(btnScope.current, { x: [0, -12, 12, -8, 8, 0] }, { duration: 0.45 })
      later(() => setNudge(false), 2200)
      return
    }
    setSending(true)
    setWish(text)
    later(() => heartBurst({ x: 0.5, y: 0.2 }, 50), 1100)
    later(() => go(10, 'pink'), 2900)
  }

  return (
    <PageShell>
      <div className="flex w-full max-w-xl flex-col items-center">
        <motion.p
          className="text-center font-script text-[1.35rem] font-bold leading-snug text-stitch-800 sm:text-2xl"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: sending ? 0 : 1, y: 0 }}
          transition={{ delay: sending ? 0 : 0.2 }}
        >
          <Heart className="anim-beat mb-1 mr-2 inline-block w-5 align-middle" />
          {t.intro}
          <Heart className="anim-beat mb-1 ml-2 inline-block w-5 align-middle" color="#5b9bf5" />
        </motion.p>

        <motion.div
          className="relative mt-32 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={sending ? { y: -380, scale: 0.15, rotate: -28, opacity: 0 } : { opacity: 1, y: 0 }}
          transition={sending ? { duration: 1.2, ease: [0.55, 0, 0.8, 0.2] } : { type: 'spring', stiffness: 120, damping: 15, delay: 0.4 }}
        >
          {/* Maskot mengintip di balik kertas, lalu tutup mata saat Vina menulis */}
          <div className="absolute -top-[6.1rem] left-4 z-0 w-32 sm:left-10 sm:w-36">
            <motion.div key={focused ? 'cover' : 'peek'} initial={{ y: 14 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
              <Mascot color="blue" mood={focused ? 'cover' : nudge ? 'wow' : 'happy'} body={false} />
            </motion.div>
          </div>
          {!focused && (
            <div className="pointer-events-none absolute -top-3 left-4 z-20 flex w-32 justify-between px-4 sm:left-10 sm:w-36" aria-hidden="true">
              {[0, 1].map((i) => (
                <svg key={i} viewBox="0 0 40 26" className="w-9">
                  <ellipse cx="20" cy="13" rx="18" ry="11" fill="#5b8def" stroke="#3c6bd6" strokeWidth="2" />
                  <path d="M13 6 V12 M20 5 V12 M27 6 V12" stroke="#3c6bd6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ))}
            </div>
          )}

          <div className="absolute -top-[5.4rem] left-[9.5rem] right-0 z-30 sm:left-[12rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={bubble}
                className="bubble inline-block"
                initial={{ opacity: 0, scale: 0.6, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              >
                {bubble}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 overflow-hidden rounded-[1.4rem] border-4 border-white bg-cream shadow-[0_28px_56px_-22px_rgba(29,47,92,0.45)]">
            <div className="flex items-center justify-between border-b-2 border-dashed border-pinky-200 bg-pinky-50 px-5 py-2.5">
              <span className="font-cute text-lg text-pinky-500 sm:text-xl">{t.paperTitle}</span>
              <Sparkle className="anim-twinkle w-5" color="#88bbff" />
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t.placeholder}
              rows={7}
              disabled={sending}
              className="paper-lines cute-scroll block min-h-[16rem] w-full resize-none border-0 pb-4 pl-12 pr-5 font-script text-[1.3rem] font-medium text-stitch-900 outline-none placeholder:text-stitch-300 sm:pl-14 sm:text-2xl"
            />
          </div>
        </motion.div>

        <motion.div className="mt-8" animate={{ opacity: sending ? 0 : 1 }}>
          <div ref={btnScope}>
            <CuteButton onClick={submit} disabled={sending} className="px-10 text-xl">
              {t.submit} <Sparkle className="w-5" color="#fff" />
            </CuteButton>
          </div>
        </motion.div>

        <AnimatePresence>
          {sending && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[18%] flex flex-col items-center gap-4 px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: [0, 1.4, 1], rotate: 0 }} transition={{ delay: 1, duration: 0.8 }}>
                <Sparkle className="anim-twinkle w-20" />
              </motion.div>
              <p className="font-cute text-2xl text-stitch-700 sm:text-3xl">{t.sending}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
