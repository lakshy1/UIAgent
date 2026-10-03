import { useEffect, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'before-after-slider',
  title: 'Before / after slider',
  category: 'Media',
  description: 'Drag or keyboard-nudge a divider to reveal two versions of the same image. Uses clip-path, no layout thrash.',
  source: ['Web: Magic UI compare pattern', '19-ev-connect'],
  tags: ['compare', 'slider', 'drag'],
  notes: ['Handle is role="slider" with arrow-key support.', 'Pointer capture keeps dragging smooth on touch.'],
} as const

export default function BeforeAfterSlider({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[40, () => setP(50 + 40 * Math.sin(k++ / 22))]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const box = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(50)
  const move = (x: number) => { const r = box.current!.getBoundingClientRect(); setP(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))) }
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div ref={box} className={`relative w-full touch-none select-none overflow-hidden rounded-2xl ${device === 'mobile' ? 'aspect-square' : 'aspect-[16/9] max-w-2xl'}`}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX) }}
        onPointerMove={(e) => e.buttons && move(e.clientX)}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-rose-500 to-indigo-600" style={{ clipPath: `inset(0 0 0 ${p}%)` }} />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">After</span>
        <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${p}%` }}>
          <div role="slider" tabIndex={0} aria-label="Comparison position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p)}
            onKeyDown={(e) => { if (e.key === 'ArrowLeft') setP((v) => Math.max(0, v - 5)); if (e.key === 'ArrowRight') setP((v) => Math.min(100, v + 5)) }}
            className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-slate-800 shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-brand">
            <MoveHorizontal size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
