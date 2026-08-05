import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { apologyConfig } from '../../config'
import { ContinueButton, CuteCharacter, StepShell } from '../ui'

type ApologyStepProps = {
  onContinue: () => void
}

function ApologyStep({ onContinue }: ApologyStepProps) {
  const lines = apologyConfig.apologyLines
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= lines.length) return
    const t = window.setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 900)
    return () => window.clearTimeout(t)
  }, [visible, lines.length])

  return (
    <StepShell>
      <CuteCharacter />

      <div className="space-y-4 px-1">
        <AnimatePresence>
          {lines.slice(0, visible).map((text, i) => (
            <motion.p
              key={text}
              className={`text-glow ${
                i === 0
                  ? 'font-display text-4xl text-pink-100 sm:text-5xl'
                  : i === 1
                    ? 'text-xl font-bold text-rose-200 sm:text-2xl'
                    : 'text-base leading-relaxed text-pink-50/90 sm:text-lg'
              }`}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              {text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {visible >= lines.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <ContinueButton onClick={onContinue}>I have a promise…</ContinueButton>
        </motion.div>
      )}
    </StepShell>
  )
}

export default ApologyStep
