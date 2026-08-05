import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { apologyConfig } from '../../config'
import { StepShell } from '../ui'

type ForgivenessStepProps = {
  onForgive: () => void
}

type Pos = { x: number; y: number }

function ForgivenessStep({ onForgive }: ForgivenessStepProps) {
  const areaRef = useRef<HTMLDivElement>(null)
  const [madPos, setMadPos] = useState<Pos>({ x: 55, y: 58 })
  const [tease, setTease] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const teaseIndex = useRef(0)

  const escape = useCallback(() => {
    const area = areaRef.current
    if (!area) return
    const rect = area.getBoundingClientRect()
    const btnW = 180
    const btnH = 52
    const pad = 8
    const maxX = Math.max(pad, rect.width - btnW - pad)
    const maxY = Math.max(pad, rect.height - btnH - pad)

    let nx = Math.random() * maxX
    let ny = Math.random() * maxY
    // Prefer jumping away from current spot
    if (Math.abs(nx - madPos.x) < 60) nx = (nx + maxX / 2) % maxX
    if (Math.abs(ny - madPos.y) < 40) ny = (ny + maxY / 2) % maxY

    setMadPos({ x: nx, y: ny })
    setShake((s) => s + 1)
    const messages = apologyConfig.forgivenessTeases
    teaseIndex.current = (teaseIndex.current + 1) % messages.length
    setTease(messages[teaseIndex.current])
  }, [madPos.x, madPos.y])

  return (
    <StepShell className="max-w-xl">
      <motion.h2
        className="font-display text-4xl text-glow text-pink-100 sm:text-5xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Will you forgive me? 🥺❤️
      </motion.h2>
      <p className="mt-3 text-sm text-pink-100/75 sm:text-base">
        Choose wisely… one button might be a little shy 🙈
      </p>

      <div
        ref={areaRef}
        className="relative mx-auto mt-8 h-[280px] w-full max-w-md sm:h-[320px]"
      >
        <motion.button
          type="button"
          onClick={onForgive}
          className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(255,77,109,0.5)] sm:text-base"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          I forgive you ❤️
        </motion.button>

        <motion.button
          type="button"
          tabIndex={-1}
          aria-disabled
          onMouseEnter={escape}
          onFocus={escape}
          onTouchStart={(e) => {
            e.preventDefault()
            escape()
          }}
          onClick={(e) => {
            e.preventDefault()
            escape()
          }}
          className="absolute z-10 select-none rounded-2xl border-2 border-white/30 bg-white/15 px-4 py-3 text-sm font-bold text-pink-50 backdrop-blur-md sm:text-base"
          style={{ left: madPos.x, top: madPos.y }}
          animate={{
            left: madPos.x,
            top: madPos.y,
            rotate: [0, -6, 6, -4, 0],
            x: shake % 2 === 0 ? [0, -4, 4, 0] : [0, 4, -4, 0],
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        >
          I am still mad at you 😤
        </motion.button>

        <AnimatePresence>
          {tease && (
            <motion.p
              key={`${tease}-${shake}`}
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-4 py-2 text-sm font-semibold text-pink-100"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {tease}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </StepShell>
  )
}

export default ForgivenessStep
