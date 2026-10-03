import { useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'hero-product-demo',
  title: 'Hero: product demo with tabs',
  category: 'Sections',
  description: 'Headline plus a tabbed product preview that swaps screens. Laptop shows tabs as a side rail; mobile uses a horizontal tab strip under the preview.',
  source: ['20-Infrascope', '21-Transform'],
  tags: ['hero', 'tabs', 'demo'],
  notes: ['Tabs use role=tablist with aria-selected.'],
} as const

const tabs = [
  { k: 'Plan', t: 'Map every workload', rows: [80, 55, 35] },
  { k: 'Migrate', t: 'Move in waves', rows: [40, 70, 90] },
  { k: 'Verify', t: 'Prove it matches', rows: [95, 88, 100] },
]

export default function HeroProductDemo({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1800, () => setI(++k % tabs.length)]]
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
  const cur = tabs[i]
  const list = (
    <div role="tablist" aria-label="Product steps" className={m ? 'mt-4 flex gap-2 overflow-x-auto' : 'flex w-44 flex-col gap-2'}>
      {tabs.map((t, n) => (
        <button key={t.k} role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`shrink-0 rounded-xl px-4 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-brand ${m ? 'h-11' : 'h-12'} ${n === i ? 'bg-brand text-white' : 'border border-line text-muted hover:text-ink'}`}>{n + 1}. {t.k}</button>
      ))}
    </div>
  )
  return (
    <section onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} className={`h-full bg-bg text-ink ${m ? 'p-5' : 'flex flex-col justify-center px-14'}`}>
      <h1 className={`font-display font-semibold tracking-tight ${m ? 'text-3xl' : 'text-5xl'}`}>Cloud migration, <span className="text-brand">without the guesswork</span>.</h1>
      <div className={`mt-6 ${m ? '' : 'flex gap-6'}`}>
        {!m && list}
        <div role="tabpanel" className="flex-1 rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-lg">{cur.t}</h2>
          <div className="mt-4 space-y-3">{cur.rows.map((w, n) => <div key={n} className="h-3 rounded-full bg-surface-2"><div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${w}%` }} /></div>)}</div>
        </div>
        {m && list}
      </div>
    </section>
  )
}
