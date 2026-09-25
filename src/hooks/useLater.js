import { useCallback, useEffect, useRef } from 'react'

/** setTimeout yang otomatis dibersihkan saat halaman di-unmount. */
export function useLater() {
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])
}
