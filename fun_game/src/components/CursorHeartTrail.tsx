import { useEffect, useState } from 'react'

type TrailHeart = {
  id: number
  x: number
  y: number
}

function CursorHeartTrail() {
  const [hearts, setHearts] = useState<TrailHeart[]>([])

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    let id = 0
    let last = 0

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      const nextId = ++id
      setHearts((prev) => [...prev.slice(-18), { id: nextId, x: e.clientX, y: e.clientY }])
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== nextId))
      }, 700)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="cursor-trail pointer-events-none fixed inset-0 z-50" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-sm text-pink-300 opacity-80 transition-opacity duration-700"
          style={{ left: h.x, top: h.y, animation: 'twinkle 0.7s ease-out forwards' }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

export default CursorHeartTrail
