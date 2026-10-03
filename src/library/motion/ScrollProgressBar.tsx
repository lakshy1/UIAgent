import { useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'scroll-progress-bar',
  title: 'Scroll progress bar',
  category: 'Motion',
  description: 'Thin gradient bar pinned to the top of a scrolling article that fills as you read, with a percentage readout.',
  source: ['Web: Magic UI scroll progress', '18-queue-care'],
  tags: ['scroll', 'progress', 'article'],
  notes: ['Exposed as role=progressbar with aria-valuenow.', 'Listens to its own scroller, not the window.'],
} as const

const paras = [
  'Good queues are invisible. Patients arrive, are seen in order, and leave knowing exactly what happens next.',
  'Behind that calm is a stream of small signals: check-ins, room changes, and estimated waits that stay honest.',
  'We rebuilt the waiting experience around a single question: how long, really? Everything else follows from it.',
  'Clinics told us the number mattered less than the trust. A wait that updates itself earns that trust.',
  'The result is fewer front-desk interruptions and a lobby that finally feels quiet.',
]

export default function ScrollProgressBar({ device }: { device: Device }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const m = device === 'mobile'
  return (
    <div className="relative h-full w-full bg-bg">
      <div role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p)} className="absolute inset-x-0 top-0 z-10 h-1 bg-line">
        <div className="h-full bg-gradient-to-r from-brand to-spark" style={{ width: `${p}%` }} />
      </div>
      <span className="absolute right-3 top-3 z-10 rounded-full bg-surface px-2 py-0.5 font-mono text-xs text-muted">{Math.round(p)}%</span>
      <div ref={ref} tabIndex={0} aria-label="Article" className="h-full overflow-y-auto px-6 pb-8 pt-8 focus-visible:outline-2 focus-visible:outline-brand"
        onScroll={(e) => { const t = e.currentTarget; setP((t.scrollTop / Math.max(1, t.scrollHeight - t.clientHeight)) * 100) }}>
        <div className="mx-auto max-w-lg">
          <h2 className={`font-display font-semibold text-ink ${m ? 'text-2xl' : 'text-3xl'}`}>Why waiting rooms went quiet</h2>
          {paras.map((t, i) => <p key={i} className="mt-4 text-sm leading-relaxed text-muted">{t}</p>)}
          {paras.map((t, i) => <p key={`b${i}`} className="mt-4 text-sm leading-relaxed text-muted">{t}</p>)}
        </div>
      </div>
    </div>
  )
}
