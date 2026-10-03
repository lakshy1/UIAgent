import { useEffect, useRef, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'testimonials',
  title: 'Testimonials',
  category: 'Sections',
  description: 'Customer quotes. Laptop shows a three-up wall with the middle quote offset; mobile is a one-at-a-time carousel with large prev/next buttons.',
  source: ['10-aconic-technologies', '04-broomin'],
  tags: ['social proof', 'carousel'],
} as const

const q = [
  { a: 'Priya Nair', r: 'Ops lead, Kiln', t: 'We cut onboarding from two weeks to two days.' },
  { a: 'Marcus Webb', r: 'CTO, Halden', t: 'The cleanest migration tool we have ever used.' },
  { a: 'Ana Costa', r: 'Founder, Brisa', t: 'Support answers in minutes, and actually fixes things.' },
]

export default function Testimonials({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[2200, () => setI((v) => (v + 1) % q.length)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const m = device === 'mobile'
  const [i, setI] = useState(0)
  const card = (x: (typeof q)[0], off = false) => (
    <figure key={x.a} className={`rounded-2xl border ${!m && q[i] === x ? 'border-brand shadow-lg' : 'border-line'} bg-surface p-6 transition ${off ? 'mt-8' : ''}`}>
      <Quote size={20} className="text-brand" aria-hidden />
      <blockquote className="mt-3 text-lg leading-snug">{x.t}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 text-sm"><span className="grid size-9 place-items-center rounded-full bg-brand-soft font-medium text-brand">{x.a[0]}</span><span>{x.a}<br /><span className="text-muted">{x.r}</span></span></figcaption>
    </figure>
  )
  return (
    <section onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} className={`h-full bg-bg text-ink ${m ? 'p-5' : 'px-14 py-10'}`}>
      <h2 className={`font-display font-semibold ${m ? 'text-2xl' : 'text-4xl'}`}>Loved by busy teams</h2>
      {m ? (
        <div className="mt-5" aria-live="polite">{card(q[i])}
          <div className="mt-4 flex justify-center gap-3">
            <button aria-label="Previous" onClick={() => setI((i + 2) % 3)} className="grid size-12 place-items-center rounded-full border border-line"><ChevronLeft /></button>
            <button aria-label="Next" onClick={() => setI((i + 1) % 3)} className="grid size-12 place-items-center rounded-full bg-brand text-white"><ChevronRight /></button>
          </div>
        </div>
      ) : <div className="mt-8 grid grid-cols-3 gap-5">{q.map((x, n) => card(x, n === 1))}</div>}
    </section>
  )
}
