import { motion } from 'framer-motion'
import { useState } from 'react'
import { apologyConfig } from '../../config'
import { ContinueButton, StepShell } from '../ui'

type LoveStepProps = {
  onContinue: () => void
}

function LoveStep({ onContinue }: LoveStepProps) {
  const [imgError, setImgError] = useState(false)
  const { love, photoPath, herName } = apologyConfig

  return (
    <StepShell className="max-w-xl">
      <motion.div
        className="mb-2 text-7xl sm:text-8xl"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <span className="inline-block animate-soft-pulse">💖</span>
      </motion.div>

      <h2 className="font-display text-4xl text-glow text-pink-100 sm:text-5xl">
        {love.title}
      </h2>
      <motion.p
        className="mt-2 font-display text-5xl text-rose-200 sm:text-6xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
      >
        {love.headline}
      </motion.p>

      <div className="mt-4 space-y-1">
        {love.lines.map((line, i) => (
          <motion.p
            key={line}
            className="text-base text-pink-100/90 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.35 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="photo-glow relative mx-auto mt-8 w-[min(78vw,280px)] overflow-hidden rounded-[1.75rem] border-4 border-pink-200/70 bg-gradient-to-br from-pink-200/30 to-fuchsia-300/20 p-2"
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 140, damping: 16 }}
      >
        <div className="absolute inset-0 animate-pulse rounded-[1.5rem] bg-pink-400/10" />
        {!imgError ? (
          <img
            src={photoPath}
            alt={`Us — ${herName}`}
            className="relative z-10 aspect-[4/5] w-full rounded-[1.25rem] object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="relative z-10 flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-br from-[#5a2448] to-[#3a1530] px-4 text-center">
            <span className="text-4xl">📷</span>
            <p className="text-sm font-semibold text-pink-100">Add our photo</p>
            <p className="text-xs text-pink-200/70">
              Place <code className="text-pink-200">our-photo.jpg</code> in the{' '}
              <code className="text-pink-200">public</code> folder
            </p>
          </div>
        )}
      </motion.div>

      <motion.p
        className="mt-4 text-sm italic text-pink-100/85 sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
      >
        {love.photoCaption}
      </motion.p>

      <ContinueButton onClick={onContinue}>Will you forgive me?</ContinueButton>
    </StepShell>
  )
}

export default LoveStep
