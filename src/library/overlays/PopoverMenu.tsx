import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MoreHorizontal, Pencil, Copy, Archive } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'popover-menu',
  title: 'Popover menu',
  category: 'Overlays',
  description: 'Dropdown action menu anchored to its trigger on laptop; turns into a bottom action list on phones.',
  source: ['30-Talenzo', '21-Transform'],
  tags: ['menu', 'dropdown', 'popover'],
  notes: ['Arrow keys move focus; Escape closes.', 'aria-haspopup and aria-expanded on the trigger.'],
} as const

const items = [[Pencil, 'Rename'], [Copy, 'Duplicate'], [Archive, 'Archive']] as const

export default function PopoverMenu({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const mobile = device === 'mobile'
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => { if (stop.current) return; setOpen(on); t = setTimeout(() => run(!on), on ? 2500 : 1200) }
    t = setTimeout(() => run(true), 900)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const nav = (e: React.KeyboardEvent) => {
    const b = [...(ref.current?.querySelectorAll<HTMLElement>('[role=menuitem]') ?? [])]
    const i = b.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); b[(i + 1) % b.length]?.focus() }
    if (e.key === 'ArrowUp') { e.preventDefault(); b[(i - 1 + b.length) % b.length]?.focus() }
    if (e.key === 'Escape') setOpen(false)
  }
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden p-6" ref={ref} onKeyDown={nav} onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }}>
      <div className="flex max-w-md items-center justify-between rounded-2xl border border-line bg-surface p-4">
        <div><div className="font-medium">Spring launch plan</div><div className="text-xs text-muted">Edited 3 min ago</div></div>
        <div className={mobile ? '' : 'relative'}>
          <button aria-haspopup="menu" aria-expanded={open} aria-label="More actions" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"><MoreHorizontal size={20} /></button>
          <AnimatePresence>
            {open && (
              <motion.div role="menu" initial={mobile ? { y: '100%' } : { opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={mobile ? { y: '100%' } : { opacity: 0 }}
                className={`absolute z-10 border border-line bg-surface shadow-xl ${mobile ? 'inset-x-0 bottom-0 rounded-t-3xl p-3 pb-6' : 'right-0 top-12 w-48 rounded-xl p-1.5'}`}>
                {items.map(([Icon, l]) => (
                  <button key={l} role="menuitem" ref={(el) => { if (l === 'Rename') el?.focus() }} onClick={() => setOpen(false)} className={`flex w-full items-center gap-3 rounded-lg px-3 text-sm hover:bg-surface-2 focus:bg-surface-2 focus:outline-none ${mobile ? 'h-14' : 'h-10'}`}><Icon size={16} className="text-muted" />{l}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
