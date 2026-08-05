import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type StepShellProps = {
  children: ReactNode
  className?: string
}

export function StepShell({ children, className = '' }: StepShellProps) {
  return (
    <motion.section
      className={`mx-auto w-full max-w-lg text-center ${className}`}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

type ContinueButtonProps = {
  onClick: () => void
  children: ReactNode
  className?: string
}

export function ContinueButton({
  onClick,
  children,
  className = '',
}: ContinueButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_rgba(255,77,109,0.45)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 ${className}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  )
}

export function CuteCharacter() {
  return (
    <motion.div
      className="mx-auto mb-6 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_8px_20px_rgba(255,105,180,0.45)]">
        <defs>
          <linearGradient id="blob" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9ec4" />
            <stop offset="100%" stopColor="#e83e8c" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="68" rx="38" ry="34" fill="url(#blob)" />
        <circle cx="60" cy="42" r="28" fill="url(#blob)" />
        <circle cx="50" cy="40" r="4" fill="#4a1a3a" />
        <circle cx="70" cy="40" r="4" fill="#4a1a3a" />
        <path
          d="M52 50 Q60 58 68 50"
          fill="none"
          stroke="#4a1a3a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="44" cy="46" r="5" fill="#ffb7c5" opacity="0.85" />
        <circle cx="76" cy="46" r="5" fill="#ffb7c5" opacity="0.85" />
        <path
          d="M48 22 Q54 10 60 18 Q66 10 72 22"
          fill="#ff6b9d"
          opacity="0.9"
        />
        <path
          d="M58 78 L60 86 L62 78"
          fill="#fff"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  )
}
