import { motion } from 'framer-motion'
import { useMemo } from 'react'

type BackgroundEffectsProps = {
  intensify?: boolean
}

const ORBS = [
  { size: 340, x: '8%', y: '12%', color: 'rgba(255, 120, 170, 0.45)', duration: 14 },
  { size: 280, x: '72%', y: '8%', color: 'rgba(200, 140, 255, 0.38)', duration: 18 },
  { size: 320, x: '55%', y: '68%', color: 'rgba(255, 80, 120, 0.32)', duration: 16 },
  { size: 220, x: '12%', y: '72%', color: 'rgba(255, 180, 200, 0.35)', duration: 12 },
  { size: 260, x: '85%', y: '55%', color: 'rgba(255, 140, 200, 0.28)', duration: 20 },
]

function BackgroundEffects({ intensify = false }: BackgroundEffectsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: intensify ? 22 : 14 }, (_, i) => ({
        id: i,
        left: `${(i * 41 + 7) % 96}%`,
        size: 12 + (i % 6) * 5,
        delay: (i % 9) * 0.85,
        duration: 9 + (i % 6) * 2.2,
        drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12),
        emoji: ['♥', '💕', '💗', '♡'][i % 4],
      })),
    [intensify],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        top: `${(i * 19 + 3) % 100}%`,
        left: `${(i * 31 + 9) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 10) * 0.35,
        duration: 1.8 + (i % 6) * 0.5,
      })),
    [],
  )

  const petals = useMemo(
    () =>
      Array.from({ length: intensify ? 16 : 10 }, (_, i) => ({
        id: i,
        left: `${(i * 53 + 15) % 100}%`,
        delay: (i % 8) * 1.1,
        duration: 11 + (i % 5) * 2,
        size: 8 + (i % 4) * 4,
        rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 20),
      })),
    [intensify],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft animated base wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, #2b0f24 0%, #4a1840 28%, #6e2458 58%, #3a1230 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(145deg, #2b0f24 0%, #4a1840 28%, #6e2458 58%, #3a1230 100%)',
            'linear-gradient(165deg, #32142c 0%, #5a1e48 32%, #7a2a62 62%, #401636 100%)',
            'linear-gradient(185deg, #2a1026 0%, #521c44 30%, #682250 60%, #381230 100%)',
            'linear-gradient(145deg, #2b0f24 0%, #4a1840 28%, #6e2458 58%, #3a1230 100%)',
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Drifting aurora orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 25, -15, 0],
            scale: [1, 1.15, 0.92, 1.08, 1],
            opacity: [0.7, 0.95, 0.65, 0.9, 0.7],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Soft light beams */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 120%, transparent 0deg, rgba(255,150,190,0.18) 40deg, transparent 80deg, rgba(220,160,255,0.12) 140deg, transparent 200deg)',
        }}
        animate={{ rotate: [0, 25, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,160,200,0.18) 0%, rgba(255,100,160,0.08) 40%, transparent 68%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.span
          key={`sparkle-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px rgba(255, 220, 240, 0.8)`,
          }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.6, 1.35, 0.6],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Falling petals */}
      {petals.map((p) => (
        <motion.span
          key={`petal-${p.id}`}
          className="absolute -top-8 text-pink-300/70"
          style={{ left: p.left, fontSize: p.size }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 30, -20, 40],
            rotate: [0, p.rotate],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✿
        </motion.span>
      ))}

      {/* Rising hearts */}
      {hearts.map((h) => (
        <motion.span
          key={`heart-${h.id}`}
          className="absolute bottom-[-30px] text-pink-300"
          style={{ left: h.left, fontSize: h.size }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, h.drift, h.drift * -0.4],
            rotate: [0, 18, -12, 8],
            opacity: [0, 0.85, 0.7, 0],
            scale: [0.8, 1.1, 1],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(20, 5, 15, 0.55) 100%)',
        }}
      />

      {/* Soft film grain shimmer */}
      <motion.div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,180,220,0.08) 0%, transparent 45%)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default BackgroundEffects
