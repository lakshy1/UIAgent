import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'snap-carousel',
  title: 'Snap carousel',
  category: 'Media',
  description: 'Swipeable scroll-snap carousel with dots and arrow buttons. Native touch scrolling, no JS physics.',
  source: ['Web: shadcn/Embla carousel pattern', '28-ecommerce'],
  tags: ['carousel', 'swipe', 'snap'],
  notes: ['Region is focusable and scrolls with arrow keys.', 'Dots are buttons with aria-labels.'],
} as const

const slides = [
  ['Alpine Dawn', 'from-orange-400 via-rose-500 to-indigo-600'],
  ['Coastal Haze', 'from-cyan-400 via-sky-500 to-blue-700'],
  ['Forest Light', 'from-lime-400 via-emerald-500 to-teal-700'],
  ['Dune Glow', 'from-amber-300 via-orange-500 to-red-600'],
  ['Night Bloom', 'from-fuchsia-400 via-purple-600 to-slate-900'],
]

export default function SnapCarousel({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[2400, () => go(++k % slides.length)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const mobile = device === 'mobile'
  const go = (n: number) => {
    const el = ref.current
    if (!el) return
    const k = Math.max(0, Math.min(slides.length - 1, n))
    ;(el.children[k] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
  return (
    <div className="relative grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="w-full max-w-3xl">
        <div
          ref={ref} tabIndex={0} role="region" aria-label="Photo carousel"
          onScroll={(e) => { const el = e.currentTarget; const c = el.children[0] as HTMLElement; setI(Math.round(el.scrollLeft / (c.offsetWidth + 12))) }}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth rounded-2xl pb-1 outline-none focus-visible:ring-2 focus-visible:ring-brand [scrollbar-width:none]"
        >
          {slides.map(([t, g]) => (
            <div key={t} className={`relative aspect-[4/3] shrink-0 snap-center overflow-hidden rounded-2xl bg-gradient-to-br ${g} ${mobile ? 'w-[85%]' : 'w-[46%]'}`}>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="text-xs opacity-80">Photo series, 2026</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            {slides.map(([t], k) => (
              <button key={t} aria-label={`Go to ${t}`} onClick={() => go(k)} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-brand' : 'w-2 bg-line'}`} />
            ))}
          </div>
          {!mobile && (
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={() => go(i - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink hover:bg-surface-2"><ChevronLeft size={16} /></button>
              <button aria-label="Next" onClick={() => go(i + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink hover:bg-surface-2"><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
