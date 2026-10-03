import { useRef, useEffect, useState } from 'react'
import { Home, Search, Mail, Music, Camera, Settings, Folder } from 'lucide-react'
import { animate, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'magnifying-dock',
  title: 'Magnifying dock',
  category: 'Navigation',
  description: 'macOS-style dock whose icons swell smoothly as the pointer approaches. Collapses to a static tab row on phones.',
  source: ['Web: Magic UI pattern', '26-Demos'],
  tags: ['dock', 'hover', 'macos'],
  notes: ['Magnification is pointer-only; keyboard focus shows a ring.', 'Phones get plain tap targets.'],
} as const

const items = [
  { l: 'Home', I: Home }, { l: 'Search', I: Search }, { l: 'Mail', I: Mail }, { l: 'Music', I: Music },
  { l: 'Camera', I: Camera }, { l: 'Files', I: Folder }, { l: 'Settings', I: Settings },
]

function Icon({ x, l, I }: { x: MotionValue<number>; l: string; I: typeof Home }) {
  const ref = useRef<HTMLButtonElement>(null)
  const d = useTransform(x, v => { const r = ref.current?.getBoundingClientRect(); return r ? v - (r.left + r.width / 2) : 999 })
  const w = useSpring(useTransform(d, [-130, 0, 130], [48, 88, 48]), { stiffness: 300, damping: 22 })
  return (
    <motion.button ref={ref} style={{ width: w, height: w }} aria-label={l} title={l}
      className="grid place-items-center rounded-2xl bg-surface-2 text-ink shadow-sm hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
      <I className="h-1/2 w-1/2" />
    </motion.button>
  )
}

export default function MagnifyingDock({ device }: { device: Device }) {
  const x = useMotionValue(-9999)
  const [hl, setHl] = useState(-1)
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    let ctl: { stop: () => void } | undefined
    const mobile = device === 'mobile'
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t)); ctl?.stop(); x.set(-9999) }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      if (mobile) { for (let k = 0; k < 5; k++) at(800 + k * 800, () => setHl(k)); at(5000, () => { setHl(-1); run() }); return }
      const r = el?.querySelector('nav')?.getBoundingClientRect(); if (!r) return
      at(700, () => { ctl = animate(x, [r.left + 10, r.right - 10], { duration: 3, ease: 'easeInOut' }) })
      at(4000, () => { ctl?.stop(); x.set(-9999) })
      at(4800, run)
    }
    run()
    return () => { ctl?.stop(); ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [device])
  if (device === 'mobile') {
    return (
      <div ref={root} className="relative flex h-full items-end p-4">
        <nav aria-label="Dock" className="grid w-full grid-cols-5 gap-2 rounded-3xl border border-line bg-surface p-2">
          {items.slice(0, 5).map(({ l, I }, k) => (
            <button key={l} aria-label={l} className={`grid h-14 place-items-center rounded-2xl ${hl === k ? 'bg-surface-2 text-brand' : 'text-muted'} active:bg-surface-2 active:text-brand`}><I size={22} /></button>
          ))}
        </nav>
      </div>
    )
  }
  return (
    <div ref={root} className="relative flex h-full items-end justify-center pb-8">
      <nav aria-label="Dock" onMouseMove={e => x.set(e.clientX)} onMouseLeave={() => x.set(-9999)}
        className="flex items-end gap-2 rounded-3xl border border-line bg-surface/80 px-3 pb-3 pt-3 backdrop-blur">
        {items.map(it => <Icon key={it.l} x={x} l={it.l} I={it.I} />)}
      </nav>
    </div>
  )
}
