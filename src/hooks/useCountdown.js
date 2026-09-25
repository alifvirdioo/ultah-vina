import { useEffect, useState } from 'react'

const secondsLeft = (target) => Math.max(0, Math.ceil((target - Date.now()) / 1000))

export function useCountdown(target) {
  const [left, setLeft] = useState(() => secondsLeft(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(secondsLeft(target)), 250)
    return () => clearInterval(id)
  }, [target])

  return {
    days: Math.floor(left / 86400),
    hours: Math.floor((left % 86400) / 3600),
    minutes: Math.floor((left % 3600) / 60),
    seconds: left % 60,
    done: left === 0,
  }
}
