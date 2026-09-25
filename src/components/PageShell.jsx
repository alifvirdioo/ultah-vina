import { motion } from 'motion/react'

/** Pembungkus tiap halaman: animasi masuk & keluar antar-page. */
export default function PageShell({ children, className = '', top = false }) {
  return (
    <motion.section
      className={`relative flex min-h-svh w-full flex-col items-center px-4 sm:px-6 ${top ? 'justify-start pb-12 pt-14' : 'justify-center py-12'} ${className}`}
      initial={{ opacity: 0, y: 26, scale: 0.97, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      exit={{ opacity: 0, y: -18, scale: 1.02, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
