import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Map, Zap, CalendarCheck, Wallet, User } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'bottom-dock',
  title: 'Bottom dock',
  category: 'Navigation',
  description: 'Floating dock with a sliding active bubble. Sits at the thumb on phones; on laptop it becomes a magnifying dock centered at the bottom.',
  source: ['19-ev-connect', '18-queue-care'],
  tags: ['dock', 'tab-bar', 'mobile'],
  notes: ['Each item has an aria-label; the active one has aria-current.'],
} as const

const items = [
  { i: Map, l: 'Map' }, { i: Zap, l: 'Charge' }, { i: CalendarCheck, l: 'Bookings' }, { i: Wallet, l: 'Wallet' }, { i: User, l: 'Profile' },
]

export default function BottomDock({ device }: { device: Device }) {
  const [active, setActive] = useState('Map')
  const [hover, setHover] = useState<number | null>(null)
  const mobile = device === 'mobile'
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
      items.slice(1).forEach(({ l }, k) => at(900 + k * 1100, () => { setActive(l); setHover(mobile ? null : k + 1) }))
      at(900 + items.length * 1100, () => { setActive('Map'); setHover(null); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className="relative h-full overflow-hidden bg-bg">
      <div className="grid h-full place-items-center"><p className="font-display text-3xl text-ink">{active}</p></div>
      <nav aria-label="Dock" className={`absolute flex items-end ${mobile ? 'inset-x-3 bottom-4 justify-between rounded-3xl border border-line bg-surface/90 p-2 shadow-xl backdrop-blur' : 'bottom-5 left-1/2 -translate-x-1/2 gap-2 rounded-2xl border border-line bg-surface/80 p-2 shadow-xl backdrop-blur'}`}>
        {items.map(({ i: I, l }, idx) => {
          const on = active === l
          const scale = !mobile && hover !== null ? 1 + Math.max(0, 0.35 - Math.abs(hover - idx) * 0.15) : 1
          return (
            <motion.button key={l} aria-label={l} aria-current={on ? 'page' : undefined} onClick={() => setActive(l)}
              onMouseEnter={() => setHover(idx)} onMouseLeave={() => setHover(null)} animate={{ scale }}
              className={`relative flex flex-col items-center justify-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand ${mobile ? 'h-14 w-14' : 'h-12 w-12'} ${on ? 'text-white' : 'text-muted'}`}>
              {on && <motion.span layoutId="dock-bubble" className="absolute inset-0 rounded-2xl bg-brand shadow-lg shadow-brand/40" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />}
              <I size={22} className="relative" />
              {mobile && <span className="relative text-[10px] font-medium">{l}</span>}
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}
