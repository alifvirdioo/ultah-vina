import { motion } from 'motion/react'

export default function CuteButton({ tone = 'pink', className = '', children, ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06, rotate: -1.5 }}
      whileTap={{ scale: 0.9, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      className={`btn-cute ${tone === 'blue' ? 'btn-blue' : tone === 'white' ? 'btn-white' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
