import { useEffect, useRef, useState } from 'react'
import { Maximize2, Pause, Play, Volume2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'video-player-card',
  title: 'Video player card',
  category: 'Media',
  description: 'Poster-style video card with a play overlay, scrub bar and time readout. Simulated playback, swap in a real video element.',
  source: ['Web: Vimeo/Mux player UI', '05-Kanthast'],
  tags: ['video', 'player', 'controls'],
  notes: ['Play button toggles aria-pressed.', 'Scrubber is a native range input.'],
} as const

const LEN = 184
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function VideoPlayerCard({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setPlaying(true)], [4500, () => setPlaying(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(32)
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setT((v) => (v >= LEN ? 0 : v + 1)), 1000)
    return () => clearInterval(id)
  }, [playing])
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
        <div className="relative aspect-video bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-orange-400">
          <button aria-label={playing ? 'Pause video' : 'Play video'} aria-pressed={playing} onClick={() => setPlaying(!playing)}
            className="group absolute inset-0 grid place-items-center">
            <span className={`grid place-items-center rounded-full bg-white/90 text-slate-900 shadow-xl transition group-hover:scale-110 ${mobile ? 'h-16 w-16' : 'h-14 w-14'} ${playing ? 'opacity-0 group-hover:opacity-100' : ''}`}>
              {playing ? <Pause size={24} /> : <Play size={24} className="translate-x-0.5" />}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3 p-3">
          <span className="w-10 font-mono text-xs text-muted">{fmt(t)}</span>
          <input type="range" min={0} max={LEN} value={t} aria-label="Seek" onChange={(e) => setT(+e.target.value)} className="h-1.5 flex-1 accent-brand" />
          <span className="w-10 text-right font-mono text-xs text-muted">{fmt(LEN)}</span>
          {!mobile && <Volume2 size={16} className="text-muted" />}
          <Maximize2 size={16} className="text-muted" />
        </div>
        <p className="border-t border-line px-3 py-2.5 text-sm font-medium text-ink">Product walkthrough: from signup to first report</p>
      </div>
    </div>
  )
}
