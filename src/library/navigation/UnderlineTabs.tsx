import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'underline-tabs',
  title: 'Underline tabs',
  category: 'Navigation',
  description: 'Accessible tabs with an animated underline and arrow-key navigation. Scrolls horizontally with snap on phones.',
  source: ['33-clickwise', '21-Transform'],
  tags: ['tabs', 'underline', 'a11y'],
  notes: ['Implements the tabs pattern: roving tabindex, Left/Right/Home/End.'],
} as const

const tabs = [
  { id: 'overview', t: 'Overview', c: 'Revenue is up 12% month over month, led by the annual plan.' },
  { id: 'activity', t: 'Activity', c: '38 events in the last 24 hours across 5 workspaces.' },
  { id: 'members', t: 'Members', c: '14 active members and 3 pending invitations.' },
  { id: 'billing', t: 'Billing', c: 'Next invoice of $1,240 is due on the 1st.' },
  { id: 'settings', t: 'Settings', c: 'Manage workspace name, domain and defaults.' },
]

export default function UnderlineTabs({ device }: { device: Device }) {
  const [i, setI] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const mobile = device === 'mobile'
  const onKey = (e: React.KeyboardEvent) => {
    const n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1
    if (n < 0) return
    e.preventDefault(); setI(n); refs.current[n]?.focus()
  }
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
      tabs.slice(1).forEach((_, k) => at(1000 + k * 1500, () => setI(k + 1)))
      at(1000 + tabs.length * 1500, () => { setI(0); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="h-full bg-bg p-4 md:p-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface">
        <div role="tablist" aria-label="Workspace" onKeyDown={onKey} className="flex snap-x overflow-x-auto border-b border-line px-2 [scrollbar-width:none]">
          {tabs.map((t, k) => (
            <button key={t.id} ref={el => { refs.current[k] = el }} role="tab" id={`t-${t.id}`} aria-selected={i === k} aria-controls={`p-${t.id}`} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}
              className={`relative shrink-0 snap-start whitespace-nowrap px-4 text-sm font-medium outline-none focus-visible:bg-surface-2 ${mobile ? 'h-12' : 'h-11'} ${i === k ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              {t.t}
              {i === k && <motion.span layoutId="ut-line" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} role="tabpanel" id={`p-${tabs[i].id}`} aria-labelledby={`t-${tabs[i].id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5 text-sm text-muted">
            <h3 className="mb-1 font-display text-lg text-ink">{tabs[i].t}</h3>{tabs[i].c}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
