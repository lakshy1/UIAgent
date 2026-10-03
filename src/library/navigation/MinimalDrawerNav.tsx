import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'minimal-drawer-nav',
  title: 'Minimal nav with drawer',
  category: 'Navigation',
  description: 'Quiet text-only navbar on desktop. On phones a hamburger opens a full-height drawer with large tap rows and a scrim.',
  source: ['05-Kanthast', '04-broomin'],
  tags: ['navbar', 'hamburger', 'drawer'],
  notes: ['Drawer is a labelled dialog; scrim click and Escape close it.'],
} as const

const links = ['Work', 'Studio', 'Journal', 'Contact']

export default function MinimalDrawerNav({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const [hl, setHl] = useState(-1)
  const mobile = device === 'mobile'
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    const mobile = device === 'mobile'
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      if (mobile) { at(900, () => setOpen(true)); at(3400, () => setOpen(false)) }
      else links.forEach((_, k) => at(900 + k * 900, () => setHl(k)))
      at(mobile ? 4800 : 900 + links.length * 900, () => { setHl(-1); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className="relative h-full overflow-hidden bg-bg" onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
      <header className="flex h-16 items-center justify-between px-5 md:px-10">
        <span className="font-display text-xl tracking-tight text-ink">oak<span className="text-brand">.</span></span>
        {mobile ? (
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface-2"><Menu size={22} /></button>
        ) : (
          <nav aria-label="Primary" className="flex items-center gap-8 text-sm">
            {links.map((l, k) => (
              <a key={l} href="#" onClick={e => e.preventDefault()} className="group relative text-muted transition hover:text-ink">
                {l}<span className={`absolute -bottom-1 left-0 h-px bg-brand transition-all group-hover:w-full ${hl === k ? 'w-full' : 'w-0'}`} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <div className="px-5 pt-10 md:px-10"><h1 className="font-display text-4xl text-ink md:text-6xl">Considered<br />design studio.</h1></div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/40" />
            <motion.aside key="d" role="dialog" aria-label="Menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 right-0 flex w-[82%] flex-col bg-surface p-5 shadow-2xl">
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="ml-auto grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"><X size={22} /></button>
              <ul className="mt-4 divide-y divide-line">
                {links.map(l => <li key={l}><a href="#" onClick={e => e.preventDefault()} className="flex h-16 items-center justify-between font-display text-2xl text-ink">{l}<ArrowUpRight size={20} className="text-muted" /></a></li>)}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
