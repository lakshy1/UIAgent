import { useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'tracing-beam-timeline',
  title: 'Tracing beam timeline',
  category: 'Sections',
  description: 'A changelog whose side rail fills with a glowing line as you scroll, with each entry lighting up when the line reaches it. Makes long release notes or a company story feel like progress.',
  source: ['Web: Aceternity tracing beam', '10-aconic-technologies'],
  tags: ['timeline', 'scroll', 'changelog', 'beam'],
  notes: ['The beam height is the scroll position, nothing more, so it never drifts out of sync.', 'Scrolls itself as a preview until you interact.'],
} as const

const items = [
  { v: 'v3.2', d: 'October', t: 'Shared workspaces', b: 'Invite a whole team, set roles once, and see who changed what.' },
  { v: 'v3.1', d: 'August', t: 'Offline drafts', b: 'Keep writing on a flight. Changes merge when you are back online.' },
  { v: 'v3.0', d: 'June', t: 'A faster editor', b: 'Rebuilt from the cursor up. Large documents open in under a second.' },
  { v: 'v2.8', d: 'March', t: 'Comment threads', b: 'Reply in place, resolve when done, and get one tidy digest a day.' },
  { v: 'v2.5', d: 'January', t: 'Public links', b: 'Share a read-only page with anyone, with or without a password.' },
]

export default function TracingBeamTimeline({ device }: { device: Device }) {
  const m = device === 'mobile'
  const box = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const stop = useRef(false)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const read = () => setP(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
    el.addEventListener('scroll', read, { passive: true })
    let frame = 0
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const start = performance.now()
      const tick = (now: number) => {
        if (stop.current) return
        const t = ((now - start) / 9000) % 1
        el.scrollTop = (0.5 - 0.5 * Math.cos(t * Math.PI * 2)) * (el.scrollHeight - el.clientHeight)
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    return () => { cancelAnimationFrame(frame); el.removeEventListener('scroll', read) }
  }, [])
  const halt = () => { stop.current = true }
  const fill = 8 + p * 92
  return (
    <div ref={box} onPointerDown={halt} onWheel={halt} onKeyDown={halt} tabIndex={0} className="h-full w-full overflow-y-auto bg-bg outline-none">
      <div className={`mx-auto max-w-2xl ${m ? 'px-5 py-8' : 'px-10 py-12'}`}>
        <h2 className={`font-display font-bold tracking-tight text-ink ${m ? 'text-2xl' : 'text-4xl'}`}>What changed</h2>
        <p className="mt-1 text-sm text-muted">Every release this year, newest first.</p>
        <ol className="relative mt-8">
          <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-0.5 rounded-full bg-line" />
          <span aria-hidden className="absolute left-[7px] top-0 w-0.5 rounded-full bg-gradient-to-b from-brand to-spark shadow-[0_0_12px] shadow-brand" style={{ height: `${fill}%` }} />
          {items.map((it, i) => {
            const reached = fill >= (i / items.length) * 100 + 4
            return (
              <li key={it.v} className={`relative pl-9 ${m ? 'pb-10' : 'pb-14'}`}>
                <span aria-hidden className={`absolute left-0 top-1 size-4 rounded-full border-2 transition duration-300 ${reached ? 'border-brand bg-brand shadow-[0_0_0_5px] shadow-brand/20' : 'border-line bg-bg'}`} />
                <p className="font-mono text-xs text-muted"><span className={`rounded-full px-2 py-0.5 ${reached ? 'bg-brand-soft text-brand' : 'bg-surface-2'}`}>{it.v}</span> · {it.d}</p>
                <h3 className={`mt-2 font-display text-xl font-bold transition-colors duration-300 ${reached ? 'text-ink' : 'text-muted'}`}>{it.t}</h3>
                <p className="mt-1 text-sm text-muted">{it.b}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
