import { useEffect, useRef, useState } from 'react'

type MusicToggleProps = {
  src: string
}

function MusicToggle({ src }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    const onError = () => setAvailable(false)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [src])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !available) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch {
      setAvailable(false)
    }
  }

  if (!available) return null

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-3 top-3 z-40 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/25 sm:right-5 sm:top-5 sm:text-sm"
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? '♪ Music on' : '♪ Music'}
    </button>
  )
}

export default MusicToggle
