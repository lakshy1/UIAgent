import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'image-gallery-lightbox',
  title: 'Gallery with lightbox',
  category: 'Media',
  description: 'Masonry-style thumbnail grid that opens a full-frame lightbox with previous/next and keyboard support.',
  source: ['Web: Aceternity gallery pattern', '28-ecommerce'],
  tags: ['gallery', 'lightbox', 'modal'],
  notes: ['Esc closes, arrow keys navigate.', 'Lightbox is a labelled dialog.'],
} as const

const imgs = [
  'from-rose-400 to-orange-500', 'from-sky-400 to-indigo-600', 'from-emerald-400 to-teal-600',
  'from-fuchsia-400 to-purple-600', 'from-amber-300 to-red-500', 'from-cyan-300 to-blue-600',
  'from-lime-300 to-green-600', 'from-pink-300 to-violet-600',
]
const tall = [0, 3, 5]

export default function ImageGalleryLightbox({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setOpen(1)], [1400, () => setOpen(2)], [1400, () => setOpen(null)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [open, setOpen] = useState<number | null>(null)
  const mobile = device === 'mobile'
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + imgs.length) % imgs.length))
  useEffect(() => {
    if (open === null) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])
  return (
    <div className="relative h-full overflow-hidden p-4" onPointerDownCapture={halt} onKeyDownCapture={halt}>
      <div className={`grid h-full auto-rows-[minmax(70px,1fr)] gap-2 ${mobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {imgs.map((g, i) => (
          <button key={g} aria-label={`Open photo ${i + 1}`} onClick={() => setOpen(i)}
            className={`rounded-xl bg-gradient-to-br ${g} transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-brand ${tall.includes(i) ? 'row-span-2' : ''}`} />
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="absolute inset-0 z-10 grid place-items-center bg-bg/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div key={open} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className={`aspect-[4/3] max-h-full w-full max-w-xl rounded-2xl bg-gradient-to-br ${imgs[open]} shadow-2xl`} onClick={(e) => e.stopPropagation()} />
            <button aria-label="Close" autoFocus onClick={() => setOpen(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-surface text-ink"><X size={18} /></button>
            <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-surface text-ink"><ChevronLeft size={18} /></button>
            <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-surface text-ink"><ChevronRight size={18} /></button>
            <span className="absolute bottom-3 rounded-full bg-surface px-3 py-1 font-mono text-xs text-muted">{open + 1} / {imgs.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
