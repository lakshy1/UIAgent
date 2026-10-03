import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'floating-pill-nav',
  title: 'Floating glass pill nav',
  category: 'Navigation',
  description: 'Centered glass pill with a sliding active highlight. On phones it collapses to a brand chip and a compact pill of the top links.',
  source: ['33-clickwise', '10-aconic-technologies'],
  tags: ['navbar', 'glass', 'pill'],
  notes: ['Links are real buttons with aria-current.', 'Highlight animation is spring based and skipped by reduced motion users via framer defaults.'],
} as const

const links = ['Product', 'Pricing', 'Customers', 'Docs']

export default function FloatingPillNav({ device }: { device: Device }) {
  const [active, setActive] = useState('Product')
  const mobile = device === 'mobile'
  const shown = mobile ? links.slice(0, 3) : links
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
      shown.slice(1).forEach((l, k) => at(900 + k * 1200, () => setActive(l)))
      at(900 + shown.length * 1200, () => { setActive('Product'); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className="relative h-full overflow-hidden bg-bg">
      <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-spark/20 blur-3xl" />
      <nav aria-label="Primary" className="absolute inset-x-0 top-4 flex justify-center px-3">
        <div className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1.5 shadow-lg backdrop-blur-xl">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white"><Sparkles size={16} /></span>
          {shown.map(l => (
            <button key={l} onClick={() => setActive(l)} aria-current={active === l ? 'page' : undefined}
              className={`relative rounded-full font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand ${mobile ? 'h-11 px-3 text-xs' : 'h-9 px-4 text-sm'} ${active === l ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              {active === l && <motion.span layoutId="pill-hl" className="absolute inset-0 rounded-full bg-brand-soft" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{l}</span>
            </button>
          ))}
          {!mobile && <button className="ml-1 h-9 rounded-full bg-ink px-4 text-sm font-medium text-bg">Get started</button>}
        </div>
      </nav>
      <div className="grid h-full place-items-center px-6 pt-16 text-center">
        <p className="font-display text-2xl text-ink">{active}</p>
      </div>
    </div>
  )
}
