import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Clock, MapPin } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'expandable-card',
  title: 'Expandable card',
  category: 'Cards',
  description: 'Summary card that expands in place to reveal details and an action. One open at a time, smooth height animation.',
  source: ['Web: shadcn collapsible card', '18-queue-care'],
  tags: ['expand', 'accordion', 'details'],
  notes: ['Header is a button with aria-expanded and aria-controls.', 'Height animates with layout, respects reduced motion via framer defaults.'],
} as const

const rows = [
  ['Dr. Meera Iyer', 'Cardiology', '10:30 AM', 'Block B, Floor 2', 'Bring previous ECG reports and a list of current medication.'],
  ['Dr. Rohan Das', 'Orthopedics', '12:15 PM', 'Block A, Floor 1', 'Wear loose clothing. X-ray will be taken on arrival.'],
  ['Dr. Anita Joshi', 'Dermatology', '3:00 PM', 'Block C, Floor 3', 'Avoid applying creams on the affected area that morning.'],
]

export default function ExpandableCard({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1800, () => setOpen(++k % rows.length)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="flex w-full max-w-md flex-col gap-2.5">
        {rows.map(([name, dept, time, loc, note], i) => {
          const o = open === i
          return (
            <motion.div layout key={name} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <button aria-expanded={o} aria-controls={`ec-${i}`} onClick={() => setOpen(o ? null : i)}
                className={`flex w-full items-center gap-3 px-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand ${device === 'mobile' ? 'min-h-16' : 'min-h-14'}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft font-display font-semibold text-brand">{name.split(' ')[1][0]}</span>
                <span className="min-w-0 flex-1"><span className="block truncate font-medium text-ink">{name}</span><span className="block text-xs text-muted">{dept} · {time}</span></span>
                <ChevronDown size={18} className={`text-muted transition-transform ${o ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {o && (
                  <motion.div id={`ec-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="space-y-2 border-t border-line px-4 py-3 text-sm text-muted">
                      <p className="flex items-center gap-2"><Clock size={14} /> {time} · 20 min</p>
                      <p className="flex items-center gap-2"><MapPin size={14} /> {loc}</p>
                      <p>{note}</p>
                      <button className="mt-1 h-10 w-full rounded-xl bg-brand text-sm font-medium text-white active:scale-[0.98]">Check in</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
