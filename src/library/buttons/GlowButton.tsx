import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'glow-button',
  title: 'Glow button',
  category: 'Buttons',
  description: 'Primary call to action with a soft brand glow and a confirm state. Full-width and thumb-sized on phones.',
  source: ['33-clickwise', '28-ecommerce'],
  tags: ['cta', 'primary', 'confirm'],
  notes: ['Keeps a visible focus ring.', 'State change is announced with aria-live.'],
} as const

export default function GlowButton({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setDone(true)], [1800, () => setDone(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [done, setDone] = useState(false)
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <button
        onClick={() => { setDone(true); setTimeout(() => setDone(false), 1800) }}
        aria-live="polite"
        className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand font-medium text-white shadow-[0_8px_30px_-6px] shadow-brand/60 transition active:scale-95 hover:shadow-[0_12px_40px_-4px] ${mobile ? 'h-14 w-full text-base' : 'h-12 px-7 text-sm'}`}
      >
        {done ? <><Check size={18} /> Booked</> : <>Book a demo <ArrowRight size={18} className="transition group-hover:translate-x-1" /></>}
      </button>
    </div>
  )
}
