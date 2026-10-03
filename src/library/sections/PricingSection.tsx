import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'pricing-section',
  title: 'Pricing with billing toggle',
  category: 'Sections',
  description: 'Three plans with a monthly/yearly switch. Laptop shows three columns with a raised middle plan; mobile uses a plan selector and one card at a time.',
  source: ['30-Talenzo', '05-Kanthast'],
  tags: ['pricing', 'toggle'],
  notes: ['Toggle is a real switch with aria-checked.'],
} as const

const plans = [
  { n: 'Starter', p: 12, f: ['3 projects', 'Basic analytics'] },
  { n: 'Team', p: 39, f: ['Unlimited projects', 'Advanced analytics', 'Priority support'] },
  { n: 'Scale', p: 99, f: ['SSO and audit logs', 'Dedicated manager', 'Custom SLA'] },
]

export default function PricingSection({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[1800, () => { setYearly((y) => !y); if (device === 'mobile') setSel((s) => (s + 1) % plans.length) }]]
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
  const [yearly, setYearly] = useState(true)
  const [sel, setSel] = useState(1)
  const card = (pl: (typeof plans)[0], n: number) => (
    <div key={pl.n} className={`rounded-2xl border p-6 ${n === 1 ? 'border-brand bg-surface shadow-xl ' + (m ? '' : '-my-3') : 'border-line bg-surface'}`}>
      <h3 className="font-display text-lg">{pl.n}</h3>
      <p className="mt-2 font-display text-4xl font-semibold">${yearly ? Math.round(pl.p * 0.8) : pl.p}<span className="text-sm font-normal text-muted"> /mo</span></p>
      <ul className="mt-4 space-y-2 text-sm">{pl.f.map((x) => <li key={x} className="flex gap-2"><Check size={16} className="text-ok" aria-hidden />{x}</li>)}</ul>
      <button className={`mt-5 h-12 w-full rounded-full text-sm font-medium focus-visible:outline-2 focus-visible:outline-brand ${n === 1 ? 'bg-brand text-white' : 'border border-line'}`}>Choose {pl.n}</button>
    </div>
  )
  return (
    <section onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} className={`h-full bg-bg text-ink ${m ? 'p-5' : 'px-14 py-10'}`}>
      <div className="flex items-center justify-between">
        <h2 className={`font-display font-semibold ${m ? 'text-2xl' : 'text-4xl'}`}>Simple pricing</h2>
        <button role="switch" aria-checked={yearly} onClick={() => setYearly(!yearly)} className="flex items-center gap-2 text-xs text-muted">
          Yearly -20%<span className={`relative h-6 w-11 rounded-full transition ${yearly ? 'bg-brand' : 'bg-surface-2'}`}><span className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${yearly ? 'left-5' : 'left-0.5'}`} /></span>
        </button>
      </div>
      {m ? (
        <>
          <div role="tablist" className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-surface-2 p-1">{plans.map((p, n) => <button key={p.n} role="tab" aria-selected={sel === n} onClick={() => setSel(n)} className={`h-11 rounded-full text-sm ${sel === n ? 'bg-brand text-white' : 'text-muted'}`}>{p.n}</button>)}</div>
          <div className="mt-4">{card(plans[sel], 1)}</div>
        </>
      ) : <div className="mt-10 grid grid-cols-3 gap-5">{plans.map(card)}</div>}
    </section>
  )
}
