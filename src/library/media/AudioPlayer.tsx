import { useEffect, useRef, useState } from 'react'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'audio-player',
  title: 'Audio player',
  category: 'Media',
  description: 'Compact music/podcast player with cover art, animated waveform bars, scrubber and transport controls.',
  source: ['Web: Spotify-style mini player', '03-fomodoro'],
  tags: ['audio', 'player', 'waveform'],
  notes: ['Waveform animation stops when paused or reduced motion is set.', 'Playback is simulated.'],
} as const

const LEN = 215
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function AudioPlayer({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setOn(true)], [4500, () => setOn(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [on, setOn] = useState(false)
  const [t, setT] = useState(48)
  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setT((v) => (v + 1) % LEN), 1000)
    return () => clearInterval(id)
  }, [on])
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <style>{`@keyframes kc-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}@media(prefers-reduced-motion:reduce){.kc-eq{animation:none!important}}`}</style>
      <div className={`w-full max-w-md rounded-3xl border border-line bg-surface p-4 shadow-lg ${mobile ? '' : 'flex items-center gap-4'}`}>
        <div className={`relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 ${mobile ? 'mx-auto mb-4 aspect-square w-full max-w-[220px]' : 'h-28 w-28'}`}>
          <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-center gap-1 px-3 pb-3">
            {Array.from({ length: 9 }, (_, k) => (
              <span key={k} className="kc-eq h-full w-1.5 origin-bottom rounded-full bg-white/80"
                style={{ transform: 'scaleY(.3)', animation: on ? `kc-eq ${0.7 + (k % 4) * 0.15}s ease-in-out ${k * 0.07}s infinite` : 'none' }} />
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold text-ink">Late Train Home</p>
          <p className="truncate text-sm text-muted">Nova Lane · Midnight Tapes</p>
          <input type="range" min={0} max={LEN} value={t} aria-label="Seek" onChange={(e) => setT(+e.target.value)} className="mt-3 h-1.5 w-full accent-brand" />
          <div className="flex justify-between font-mono text-xs text-muted"><span>{fmt(t)}</span><span>-{fmt(LEN - t)}</span></div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button aria-label="Previous track" onClick={() => setT(0)} className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface-2"><SkipBack size={18} /></button>
            <button aria-label={on ? 'Pause' : 'Play'} onClick={() => setOn(!on)} className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 active:scale-95">
              {on ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
            </button>
            <button aria-label="Next track" onClick={() => setT(0)} className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface-2"><SkipForward size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
