import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Share2, Link2, Download, Trash2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'bottom-sheet',
  title: 'Bottom sheet',
  category: 'Overlays',
  description: 'Action sheet with a drag handle you can swipe down to dismiss. Floats as an anchored card on laptop.',
  source: ['18-queue-care', '19-ev-connect'],
  tags: ['sheet', 'actions', 'drag'],
  notes: ['Drag handle is decorative; Close button offers a keyboard path.'],
} as const

const acts = [[Share2, 'Share report'], [Link2, 'Copy link'], [Download, 'Download PDF'], [Trash2, 'Delete']] as const

export default function BottomSheet({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const mobile = device === 'mobile'
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => { if (stop.current) return; setOpen(on); t = setTimeout(() => run(!on), on ? 2500 : 1200) }
    t = setTimeout(() => run(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative grid h-full min-h-[380px] place-items-center overflow-hidden p-6">
      <button onClick={() => setOpen(true)} className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium hover:border-brand">Open actions</button>
      <AnimatePresence>
        {open && (
          <div className={`absolute inset-0 z-10 flex ${mobile ? 'items-end' : 'items-end justify-center pb-6'}`}>
            <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div role="dialog" aria-label="Actions" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => i.offset.y > 80 && setOpen(false)}
              className={`relative border border-line bg-surface px-4 pb-6 pt-3 shadow-2xl ${mobile ? 'w-full rounded-t-3xl' : 'w-[380px] rounded-3xl'}`}>
              <div className="mx-auto mb-3 h-1.5 w-10 cursor-grab rounded-full bg-line" />
              {acts.map(([Icon, label]) => (
                <button key={label} onClick={() => setOpen(false)} className={`flex w-full items-center gap-3 rounded-xl px-3 text-left text-sm hover:bg-surface-2 ${mobile ? 'h-14' : 'h-11'} ${label === 'Delete' ? 'text-danger' : ''}`}><Icon size={18} />{label}</button>
              ))}
              <button onClick={() => setOpen(false)} className="mt-2 h-12 w-full rounded-xl bg-surface-2 text-sm font-medium">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
