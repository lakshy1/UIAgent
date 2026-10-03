import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CreditCard, GitBranch, UserPlus } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'animated-list',
  title: 'Animated notification list',
  category: 'Motion',
  description: 'New events slide in at the top of a list while older ones shift down and fade out, like a live activity feed.',
  source: ['Web: Magic UI animated list', '21-Transform'],
  tags: ['list', 'feed', 'live'],
  notes: ['Container is aria-live=polite.', 'Pause button stops the feed for users who need it.'],
} as const

const pool = [
  { Icon: UserPlus, t: 'Priya joined the workspace', s: 'just now' },
  { Icon: CreditCard, t: 'Invoice #4821 was paid', s: 'just now' },
  { Icon: GitBranch, t: 'Wave 3 plan approved', s: 'just now' },
  { Icon: Bell, t: 'Cutover window starts at 22:00', s: 'just now' },
]

export default function AnimatedList({ device }: { device: Device }) {
  const [items, setItems] = useState([{ ...pool[0], id: 0 }, { ...pool[1], id: 1 }])
  const [paused, setPaused] = useState(false)
  const m = device === 'mobile'
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setItems((l) => [{ ...pool[(l[0].id + 1) % pool.length], id: l[0].id + 1 }, ...l].slice(0, m ? 4 : 5)), 1800)
    return () => clearInterval(t)
  }, [paused, m])
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-ink">Activity</h2>
          <button onClick={() => setPaused((v) => !v)} className="h-9 rounded-full px-3 text-xs text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">{paused ? 'Resume' : 'Pause'}</button>
        </div>
        <ul aria-live="polite" className="space-y-2">
          <AnimatePresence initial={false}>
            {items.map(({ id, Icon, t, s }) => (
              <motion.li key={id} layout initial={{ opacity: 0, scale: 0.9, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand"><Icon size={16} /></span>
                <span className="min-w-0 flex-1 truncate text-sm text-ink">{t}</span>
                <span className="text-xs text-muted">{s}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
