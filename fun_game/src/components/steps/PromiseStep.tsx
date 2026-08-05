import { motion } from 'framer-motion'
import { useState } from 'react'
import { apologyConfig } from '../../config'
import { ContinueButton, StepShell } from '../ui'

type PromiseStepProps = {
  onContinue: () => void
}

function PromiseStep({ onContinue }: PromiseStepProps) {
  const [opened, setOpened] = useState(false)

  return (
    <StepShell>
      <motion.h2
        className="mb-6 font-display text-4xl text-glow text-pink-100 sm:text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        My Promise
      </motion.h2>

      {!opened ? (
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          className="group relative mx-auto flex h-36 w-36 items-center justify-center focus:outline-none sm:h-44 sm:w-44"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open my promise"
        >
          <motion.div
            className="animate-soft-pulse absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/40 to-rose-600/30"
            layoutId="promise-heart"
          />
          <span className="relative text-7xl sm:text-8xl">💝</span>
          <span className="absolute -bottom-8 text-sm font-semibold text-pink-200/90">
            Tap to open
          </span>
        </motion.button>
      ) : (
        <motion.div
          className="relative mx-auto overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, rotateX: 28, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          style={{ transformPerspective: 900 }}
        >
          <div className="absolute -right-6 -top-6 text-6xl opacity-20">❤️</div>
          <ul className="space-y-4 text-left">
            {apologyConfig.promises.map((promise, i) => (
              <motion.li
                key={promise}
                className="flex gap-3 text-base leading-relaxed text-pink-50 sm:text-lg"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.22 }}
              >
                <span className="mt-0.5 shrink-0 text-rose-300">♥</span>
                <span>{promise}</span>
              </motion.li>
            ))}
          </ul>
          <ContinueButton onClick={onContinue}>One more thing…</ContinueButton>
        </motion.div>
      )}
    </StepShell>
  )
}

export default PromiseStep
