import { useState, useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'star-rating',
  title: 'Star rating',
  category: 'Forms',
  description: 'Interactive five-star rating with hover preview and a text label per level.',
  source: ['28-ecommerce', '05-Kanthast'],
  tags: ['rating', 'review', 'input'],
  notes: ['Radio group semantics; arrow keys work natively.'],
} as const

const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']
export default function StarRating({ device }: { device: Device }) {
  const [v, setV] = useState(4)
  const [h, setH] = useState(0)
  const shown = h || v
  const size = device === 'mobile' ? 40 : 34
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      at(900, () => setV(2))
      at(1700, () => setV(3))
      at(2500, () => setV(5))
      at(3500, () => setV(4))
      at(4600, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full w-full place-items-center p-4">
      <fieldset className="rounded-2xl border border-line bg-surface p-6 text-center" onMouseLeave={() => setH(0)}>
        <legend className="sr-only">Rate this course</legend>
        <p className="mb-3 text-sm text-muted">How was the lesson?</p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer" onMouseEnter={() => setH(n)}>
              <input type="radio" name="rate" value={n} checked={v === n} onChange={() => setV(n)} className="peer sr-only" aria-label={`${n} stars`} />
              <Star size={size} className={`rounded transition peer-focus-visible:ring-2 peer-focus-visible:ring-brand ${n <= shown ? 'scale-110 fill-spark text-spark' : 'text-line'}`} />
            </label>
          ))}
        </div>
        <p className="mt-3 font-display text-base font-semibold text-ink" aria-live="polite">{labels[shown - 1]}</p>
      </fieldset>
    </div>
  )
}
