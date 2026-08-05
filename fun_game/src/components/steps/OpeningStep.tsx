import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { apologyConfig } from '../../config'
import { ContinueButton, StepShell } from '../ui'

type OpeningStepProps = {
  onContinue: () => void
}

function OpeningStep({ onContinue }: OpeningStepProps) {
  const [line, setLine] = useState(0)
  const [typed, setTyped] = useState('')
  const messages = [
    apologyConfig.opening.greeting,
    apologyConfig.opening.subtitle,
  ]

  useEffect(() => {
    if (line >= messages.length) return
    const full = messages[line]
    setTyped('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(id)
        window.setTimeout(() => setLine((l) => l + 1), 650)
      }
    }, 55)
    return () => window.clearInterval(id)
  }, [line])

  const showButton = line > messages.length - 1

  return (
    <StepShell>
      <motion.p
        className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-pink-200/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        I'm Sorry ❤️
      </motion.p>

      <div className="min-h-[140px] space-y-4">
        <h1 className="font-display text-5xl text-glow text-pink-100 sm:text-6xl">
          {line === 0 ? typed : messages[0]}
          {line === 0 && <span className="animate-pulse">|</span>}
        </h1>
        {(line >= 1 || (line === 0 && typed === messages[0])) && (
          <p className="text-lg text-pink-100/90 sm:text-xl">
            {line === 1 ? typed : line > 1 ? messages[1] : ''}
            {line === 1 && <span className="animate-pulse">|</span>}
          </p>
        )}
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <ContinueButton onClick={onContinue}>Continue 💕</ContinueButton>
        </motion.div>
      )}
    </StepShell>
  )
}

export default OpeningStep
