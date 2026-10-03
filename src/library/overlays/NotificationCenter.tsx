import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCheck } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'notification-center',
  title: 'Notification center',
  category: 'Overlays',
  description: 'Bell with unread badge that opens a dropdown on laptop and a bottom sheet on phones, with mark-all-read.',
  source: ['19-ev-connect', '18-queue-care'],
  tags: ['notifications', 'dropdown', 'inbox'],
  notes: ['Bell exposes aria-expanded and the unread count.', 'Escape closes.'],
} as const

const seed = [['Charging complete', 'Bay 4 reached 100%', '2m'], ['Payment received', '$18.40 for session #2291', '1h'], ['New station nearby', 'Fast chargers opened 2 km away', '1d']]
export default function NotificationCenter({ device }: { device: Device }) {
  const [open, setOpen] = useState(true)
  const [unread, setUnread] = useState([true, true, false])
  const n = unread.filter(Boolean).length
  const mobile = device === 'mobile'
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => { if (stop.current) return; setOpen(on); if (on) setUnread([true, true, false]); t = setTimeout(() => run(!on), on ? 3000 : 1200) }
    t = setTimeout(() => run(!open), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative h-full w-full overflow-hidden p-4" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button aria-label={`Notifications, ${n} unread`} aria-expanded={open} onClick={() => setOpen(!open)} className="relative ml-auto grid size-11 place-items-center rounded-full border border-line bg-surface text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand">
        <Bell size={20} />{n > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-danger text-[10px] font-bold text-white">{n}</span>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: mobile ? 40 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: mobile ? 40 : -8 }} className={`absolute z-10 border border-line bg-surface shadow-xl ${mobile ? 'inset-x-0 bottom-0 rounded-t-3xl p-4 pb-6' : 'right-4 top-[68px] w-80 rounded-2xl p-3'}`}>
            <div className="mb-2 flex items-center justify-between px-1"><h3 className="font-display text-sm font-semibold text-ink">Notifications</h3><button onClick={() => setUnread([false, false, false])} className="inline-flex items-center gap-1 text-xs text-brand"><CheckCheck size={14} />Mark all read</button></div>
            <ul>{seed.map(([t, d, a], i) => <li key={t} className={`flex gap-3 rounded-xl px-2 hover:bg-surface-2 ${mobile ? 'py-3' : 'py-2'}`}><span className={`mt-1.5 size-2 shrink-0 rounded-full ${unread[i] ? 'bg-brand' : 'bg-transparent'}`} /><div className="flex-1"><p className="text-sm font-medium text-ink">{t}</p><p className="text-xs text-muted">{d}</p></div><span className="text-xs text-muted">{a}</span></li>)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
