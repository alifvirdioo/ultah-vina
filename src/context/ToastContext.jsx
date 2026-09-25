import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ToastCtx = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((text, { tone = 'pink', duration = 2400 } = {}) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((list) => [...list.slice(-2), { id, text, tone }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), duration)
  }, [])

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+14px)] z-[95] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              role="status"
              initial={{ y: -50, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -24, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className={`flex items-center gap-2 rounded-full border-[3px] border-white px-5 py-2.5 font-cute text-base shadow-[0_14px_30px_-12px_rgba(29,47,92,0.5)] sm:text-lg ${
                t.tone === 'blue' ? 'bg-stitch-400 text-white' : 'bg-pinky-400 text-white'
              }`}
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
