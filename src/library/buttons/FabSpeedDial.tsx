import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, FileText, Plus, UserPlus } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'fab-speed-dial',
  title: 'FAB speed dial',
  category: 'Buttons',
  description: 'Floating action button that fans out quick actions. Mobile anchors bottom-right with a scrim; laptop uses a labelled extended button with a side menu.',
  source: ['18-queue-care', '25-Nivaso'],
  tags: ['fab', 'menu', 'quick-actions'],
  notes: ['aria-expanded on the trigger; Escape closes.', 'Actions are real buttons in a labelled menu.'],
} as const

const acts = [
  { label: 'New note', icon: FileText },
  { label: 'Add contact', icon: UserPlus },
  { label: 'Scan receipt', icon: Camera },
]

export default function FabSpeedDial({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setOpen(true)], [2800, () => setOpen(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [open, setOpen] = useState(false)
  const mobile = device === 'mobile'
  return (
    <div className="relative h-full" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <AnimatePresence>
        {open && mobile && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/40" />}
      </AnimatePresence>
      <div className={`absolute flex gap-3 ${mobile ? 'bottom-5 right-5 flex-col-reverse items-end' : 'bottom-8 left-8 items-end'}`}>
        <button aria-expanded={open} aria-label={open ? 'Close quick actions' : 'Open quick actions'} onClick={() => setOpen(!open)}
          className={`flex shrink-0 items-center justify-center gap-2 bg-brand font-medium text-white shadow-lg shadow-brand/40 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${mobile ? 'size-14 rounded-2xl' : 'h-12 rounded-full px-5 text-sm'}`}>
          <Plus size={22} className="transition-transform" style={{ transform: open ? 'rotate(135deg)' : 'none' }} />
          {!mobile && 'Create'}
        </button>
        <div className={`flex gap-3 ${mobile ? 'flex-col items-end' : 'flex-row items-center'}`} role="menu" aria-label="Quick actions">
          <AnimatePresence>
            {open && acts.map((a, n) => (
              <motion.button key={a.label} role="menuitem" initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.9 }} transition={{ delay: n * 0.05 }}
                className={`flex items-center gap-2 rounded-full border border-line bg-surface font-medium text-ink shadow-md hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-brand ${mobile ? 'h-12 pl-4 pr-3 text-sm' : 'h-10 px-4 text-sm'}`}>
                {a.label}<a.icon size={18} className="text-brand" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
