import { useEffect, useMemo, useState } from 'react'

// Pecah per "huruf yang terlihat" supaya emoji tidak tampil setengah-setengah.
const toGlyphs = (text) =>
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? Array.from(new Intl.Segmenter('id', { granularity: 'grapheme' }).segment(text), (s) => s.segment)
    : Array.from(text)

export function useTypewriter(text, { speed = 45, startDelay = 0 } = {}) {
  const glyphs = useMemo(() => toGlyphs(text), [text])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= glyphs.length) return
    const prev = glyphs[count - 1]
    let delay = speed
    if (count === 0) delay = startDelay
    else if (prev === '\n') delay = speed * 10
    else if ('.!?'.includes(prev)) delay = speed * 8
    else if (',;:'.includes(prev)) delay = speed * 4
    const id = setTimeout(() => setCount((c) => c + 1), delay)
    return () => clearTimeout(id)
  }, [count, glyphs, speed, startDelay])

  return { typed: glyphs.slice(0, count).join(''), done: count >= glyphs.length }
}
