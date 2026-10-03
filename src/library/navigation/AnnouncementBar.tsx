import { useState } from 'react'
import { ArrowRight, X, Megaphone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'announcement-bar',
  title: 'Announcement bar',
  category: 'Navigation',
  description: 'Dismissible top banner announcing a release, with an inline link. Wraps to two lines on phones.',
  source: ['Web: Aceternity pattern', '10-aconic-technologies'],
  tags: ['banner', 'dismiss', 'top'],
  notes: ['Dismiss button has an aria-label.', 'role=region labelled Announcement.'],
} as const

export default function AnnouncementBar({ device }: { device: Device }) {
  const [open, setOpen] = useState(true)
  const mobile = device === 'mobile'
  return (
    <div className="relative h-full w-full bg-bg">
      <AnimatePresence>
        {open && (
          <motion.div role="region" aria-label="Announcement" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex items-center gap-3 bg-brand px-4 py-2.5 text-sm text-white">
              <Megaphone size={16} className="shrink-0" />
              <p className="min-w-0 flex-1 text-center">
                <b>Version 2.0 is live.</b> {!mobile && 'Faster syncs, offline mode and a new dashboard. '}
                <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-white">See what is new <ArrowRight size={14} /></a>
              </p>
              <button onClick={() => setOpen(false)} aria-label="Dismiss announcement" className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"><X size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-6">
        <div className="h-4 w-1/3 rounded bg-surface-2" />
        <div className="mt-3 h-3 w-2/3 rounded bg-surface-2" />
        {!open && <button onClick={() => setOpen(true)} className="mt-6 rounded-lg border border-line px-3 py-2 text-sm text-ink">Show banner again</button>}
      </div>
    </div>
  )
}
