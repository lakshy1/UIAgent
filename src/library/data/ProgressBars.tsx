import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'progress-bars',
  title: 'Progress bars',
  category: 'Data',
  description: 'Labelled progress bars that animate in with a striped fill, plus a segmented storage meter.',
  source: ['25-Nivaso', '21-Transform'],
  tags: ['progress', 'meter'],
  notes: ['Uses role="progressbar" with aria-valuenow.'],
} as const

const rows = [['Upload assets', 82], ['Data migration', 54], ['Review pending', 23]] as const

export default function ProgressBars({ device }: { device: Device }) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 100); return () => clearTimeout(t) }, [])
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className={`w-full max-w-xl space-y-4 rounded-2xl border border-line bg-surface ${device === 'mobile' ? 'p-4' : 'p-6'}`}>
        {rows.map(([l, v]) => (
          <div key={l}>
            <div className="mb-1.5 flex justify-between text-sm"><span className="text-ink">{l}</span><span className="font-mono text-muted">{v}%</span></div>
            <div role="progressbar" aria-label={l} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} className="h-2.5 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-full origin-left rounded-full bg-brand motion-reduce:transition-none" style={{ transform: `scaleX(${on ? v / 100 : 0})`, transition: 'transform 1s cubic-bezier(.2,.8,.2,1)', backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%)', backgroundSize: '14px 14px' }} />
            </div>
          </div>
        ))}
        <div>
          <p className="mb-1.5 text-sm text-ink">Storage <span className="text-muted">· 7.4 of 10 GB</span></p>
          <div className="flex gap-1" aria-hidden>{Array.from({ length: 20 }, (_, i) => <span key={i} className={`h-3 flex-1 rounded-sm ${i < 15 ? 'bg-spark' : 'bg-surface-2'}`} />)}</div>
        </div>
      </div>
    </div>
  )
}
