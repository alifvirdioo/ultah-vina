import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { MEDIA } from '../config/content'

const MusicCtx = createContext(null)
const MAX_VOLUME = 0.85

/**
 * Lagu "My Love" diputar sekali mulai dari tombol Next di page 3,
 * lalu loop terus sampai website ditutup.
 */
export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const startedRef = useRef(false)
  const [started, setStarted] = useState(false)

  const fadeTo = useCallback((target, ms, done) => {
    const audio = audioRef.current
    cancelAnimationFrame(fadeRef.current)
    const from = audio.volume
    const t0 = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms)
      audio.volume = from + (target - from) * t
      if (t < 1) fadeRef.current = requestAnimationFrame(step)
      else done?.()
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio || startedRef.current) return
    startedRef.current = true
    audio.volume = 0
    audio
      .play()
      .then(() => {
        setStarted(true)
        fadeTo(MAX_VOLUME, 1600)
      })
      .catch(() => {
        startedRef.current = false
      })
  }, [fadeTo])

  // Musik dikecilkan lalu di-pause selama video page 8 diputar, kemudian lanjut lagi.
  // (iOS tidak mengizinkan ubah volume, jadi di sana langsung pause/play.)
  const duck = useCallback(
    (on) => {
      const audio = audioRef.current
      if (!audio || !startedRef.current) return
      if (on) fadeTo(0, 600, () => audio.pause())
      else audio.play().then(() => fadeTo(MAX_VOLUME, 1200)).catch(() => {})
    },
    [fadeTo],
  )

  const value = useMemo(() => ({ start, duck, started }), [start, duck, started])

  return (
    <MusicCtx.Provider value={value}>
      {children}
      <audio ref={audioRef} src={MEDIA.music} loop preload="auto" />
    </MusicCtx.Provider>
  )
}

export const useMusic = () => useContext(MusicCtx)
