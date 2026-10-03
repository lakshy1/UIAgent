import { useEffect, useRef, useState } from 'react'
import { BarChart3, Lock, Zap, Globe } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'bento-spotlight-card',
  title: 'Bento hover spotlight',
  category: 'Cards',
  description: 'Bento grid whose cards reveal a radial spotlight and border glow that follow the cursor.',
  source: ['Web: Magic UI / Aceternity bento', '33-clickwise'],
  tags: ['bento', 'spotlight', 'hover'],
  notes: ['Spotlight is CSS variables only, no re-render per move.', 'Hover effect is decoration; content stays readable without it.'],
} as const

const items = [
  [BarChart3, 'Live analytics', 'Every metric, refreshed each second.', 'col-span-2'],
  [Zap, 'Instant deploys', 'Ship in under ten seconds.', ''],
  [Lock, 'SOC 2 ready', 'Audit logs and SSO built in.', ''],
  [Globe, 'Global edge', '38 regions, one config.', 'col-span-2'],
] as const

export default function BentoSpotlightCard({ device }: { device: Device }) {
  const [lit, setLit] = useState<number | null>(null)
  const stop = useRef(false)
  const halt = () => { stop.current = true; setLit(null) }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1100, () => {
      const c = ref.current?.children[k % items.length] as HTMLElement | undefined
      if (c) { c.style.setProperty('--x', `${c.offsetWidth * 0.65}px`); c.style.setProperty('--y', `${c.offsetHeight * 0.4}px`) }
      setLit(k++ % items.length)
    }]]
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
  const move = (e: React.PointerEvent) => {
    const g = ref.current; if (!g) return
    for (const c of Array.from(g.children) as HTMLElement[]) {
      const r = c.getBoundingClientRect()
      c.style.setProperty('--x', `${e.clientX - r.left}px`); c.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
  }
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div ref={ref} onPointerMove={move} className={`grid w-full max-w-3xl gap-3 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {items.map(([Icon, t, d, span], n) => (
          <div key={t} className={`group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 ${mobile ? '' : span}`}>
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ opacity: lit === n ? 1 : undefined, background: 'radial-gradient(260px circle at var(--x) var(--y), color-mix(in srgb, var(--color-brand) 22%, transparent), transparent 70%)' }} />
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={18} /></span>
            <p className="relative mt-4 font-display font-semibold text-ink">{t}</p>
            <p className="relative mt-1 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
