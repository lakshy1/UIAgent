import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, MessageCircle, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'notification-card',
  title: 'Notification cards',
  category: 'Cards',
  description: 'Dismissible notification stack with type icons and an unread dot. Laptop uses a compact list with hover dismiss; mobile gives full-width rows with always-visible 44px dismiss buttons.',
  source: ['18-queue-care', '25-Nivaso'],
  tags: ['notification', 'alert', 'list'],
  notes: ['Dismiss buttons have aria-labels.'],
} as const

const seed = [
  { id: 1, i: CheckCircle2, c: 'text-ok', t: 'Invoice #2041 paid', d: '2 min ago', u: true },
  { id: 2, i: AlertTriangle, c: 'text-danger', t: 'Payment failed for Halden', d: '1 h ago', u: true },
  { id: 3, i: MessageCircle, c: 'text-brand', t: 'Priya commented on Q4 plan', d: 'Yesterday', u: false },
]

export default function NotificationCard({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[1200, () => setItems((p) => [{ id: 99, i: CheckCircle2, c: 'text-ok', t: 'New lead from Zenith Labs', d: 'Just now', u: true }, ...p.filter((x) => x.id !== 99)])], [2800, () => setItems((p) => p.filter((x) => x.id !== 99))]]
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
  const [items, setItems] = useState(seed)
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <ul className={`w-full space-y-2 ${m ? '' : 'max-w-md'}`} aria-label="Notifications">
        <AnimatePresence>
          {items.map(({ id, i: Icon, c, t, d, u }) => (
            <motion.li key={id} layout exit={{ opacity: 0, x: 40 }} className={`group relative flex items-center gap-3 rounded-2xl border border-line bg-surface ${m ? 'p-4' : 'p-3'}`}>
              <Icon size={20} className={c} aria-hidden />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{t}</p><p className="text-xs text-muted">{d}</p></div>
              {u && <span className="size-2 rounded-full bg-brand" aria-label="Unread" />}
              <button aria-label={`Dismiss ${t}`} onClick={() => setItems(items.filter((x) => x.id !== id))} className={`grid place-items-center rounded-full text-muted hover:bg-surface-2 ${m ? 'size-11' : 'size-8 opacity-0 focus-visible:opacity-100 group-hover:opacity-100'}`}><X size={16} /></button>
            </motion.li>
          ))}
        </AnimatePresence>
        {!items.length && <li className="text-center text-sm text-muted">You are all caught up.</li>}
      </ul>
    </div>
  )
}
