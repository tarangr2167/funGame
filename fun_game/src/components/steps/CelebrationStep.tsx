import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { apologyConfig } from '../../config'
import { StepShell } from '../ui'

function CelebrationStep() {
  const confetti = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 3) % 100}%`,
        delay: (i % 12) * 0.08,
        duration: 2.2 + (i % 5) * 0.35,
        emoji: ['❤️', '💕', '✨', '💖', '🌸', '🎉'][i % 6],
        x: ((i * 47) % 120) - 60,
      })),
    [],
  )

  return (
    <StepShell className="relative max-w-xl overflow-visible">
      <div className="pointer-events-none absolute inset-0 -top-20 overflow-hidden" aria-hidden>
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="absolute text-xl"
            style={{ left: c.left, top: -20 }}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: [0, 380],
              x: [0, c.x],
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1.1, 0.9],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            {c.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 12 }}
      >
        <p className="text-6xl sm:text-7xl">💖</p>
        <h2 className="mt-4 font-display text-4xl text-glow text-pink-100 sm:text-5xl">
          {apologyConfig.celebration.title}
        </h2>
        <p className="mt-4 text-lg text-pink-50/95 sm:text-xl">
          {apologyConfig.celebration.subtitle}
        </p>
      </motion.div>
    </StepShell>
  )
}

export default CelebrationStep
