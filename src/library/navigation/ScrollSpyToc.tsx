import { useRef, useState, useEffect } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'scroll-spy-toc',
  title: 'Scroll-spy contents',
  category: 'Navigation',
  description: 'Table of contents that highlights the section currently in view and scrolls to it on click. Sticky sidebar on laptop, pill strip on phones.',
  source: ['Web: shadcn docs pattern', '21-Transform'],
  tags: ['toc', 'scrollspy', 'docs'],
  notes: ['aria-current marks the active heading.', 'Smooth scroll respects reduced motion via CSS.'],
} as const

const secs = ['Overview', 'Install', 'Usage', 'Options', 'FAQ']

export default function ScrollSpyToc({ device }: { device: Device }) {
  const box = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const mobile = device === 'mobile'
  const onScroll = () => {
    const b = box.current; if (!b) return
    let a = 0
    b.querySelectorAll<HTMLElement>('[data-sec]').forEach((el, i) => { if (el.offsetTop - b.scrollTop <= 60) a = i })
    setActive(a)
  }
  const jump = (i: number) => {
    const el = box.current?.querySelectorAll<HTMLElement>('[data-sec]')[i]
    if (el && box.current) box.current.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' })
  }
  const toc = secs.map((s, i) => (
    <button key={s} aria-current={active === i ? 'true' : undefined} onClick={() => jump(i)}
      className={mobile
        ? `shrink-0 rounded-full px-4 py-2 text-sm transition ${active === i ? 'bg-brand text-white' : 'bg-surface-2 text-muted'}`
        : `block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition ${active === i ? 'border-brand font-medium text-brand' : 'border-line text-muted hover:text-ink'}`}>{s}</button>
  ))
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      [1, 2, 3, 4].forEach((i, k) => at(1000 + k * 1700, () => jump(i)))
      at(1000 + 4 * 1700, () => jump(0))
      at(9500, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className={`flex h-full w-full ${mobile ? 'flex-col' : 'gap-8 p-6'}`}>
      {mobile && <nav aria-label="On this page" className="flex gap-2 overflow-x-auto border-b border-line p-3">{toc}</nav>}
      <div ref={box} onScroll={onScroll} className={`min-h-0 flex-1 overflow-y-auto scroll-smooth ${mobile ? 'p-4' : 'pr-4'}`}>
        {secs.map(s => (
          <section key={s} data-sec className="min-h-[220px] pb-8">
            <h3 className="font-display text-xl text-ink">{s}</h3>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">Everything you need to know about {s.toLowerCase()}: configure once, ship anywhere, and keep your team in sync with a single source of truth.</p>
          </section>
        ))}
      </div>
      {!mobile && <nav aria-label="On this page" className="w-44 shrink-0 pt-1"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink">On this page</p>{toc}</nav>}
    </div>
  )
}
