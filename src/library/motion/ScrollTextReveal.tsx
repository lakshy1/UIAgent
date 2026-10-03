import { useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'scroll-text-reveal',
  title: 'Scroll text reveal',
  category: 'Motion',
  description: 'A paragraph that starts faint and lights up word by word as you scroll through it. Slows readers down for a mission statement or a key claim.',
  source: ['Web: Magic UI text reveal', 'Web: Apple product-page scroll copy'],
  tags: ['scroll', 'text', 'reveal', 'reading'],
  notes: ['Every word is always in the page at low opacity, so the text is readable without scrolling and by screen readers.', 'Scrolls itself once as a preview; touching or scrolling takes over.'],
} as const

const copy = 'We build tools for people who would rather be making things. No dashboards to babysit, no settings to tune. Just the shortest path from an idea to something you can share.'.split(' ')

export default function ScrollTextReveal({ device }: { device: Device }) {
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
        const t = ((now - start) / 7000) % 1
        el.scrollTop = (0.5 - 0.5 * Math.cos(t * Math.PI * 2)) * (el.scrollHeight - el.clientHeight)
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    return () => { cancelAnimationFrame(frame); el.removeEventListener('scroll', read) }
  }, [])
  const halt = () => { stop.current = true }
  return (
    <div ref={box} onPointerDown={halt} onWheel={halt} onKeyDown={halt} tabIndex={0} className="h-full w-full overflow-y-auto bg-bg outline-none">
      <div className="h-[220%]">
        <div className={`sticky top-0 grid h-[45.45%] place-items-center ${m ? 'px-6' : 'px-16'}`}>
          <p className={`max-w-3xl font-display font-bold leading-tight tracking-tight text-ink ${m ? 'text-2xl' : 'text-4xl'}`}>
            {copy.map((w, i) => {
              const lit = Math.min(1, Math.max(0, p * (copy.length + 4) - i))
              return <span key={i} style={{ opacity: 0.16 + lit * 0.84, transition: 'opacity .2s linear' }}>{w} </span>
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
