import { TrendingDown, TrendingUp } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'sparkline-stat-grid',
  title: 'Sparkline stat grid',
  category: 'Data',
  description: 'KPI tiles each with a tiny trend line and delta chip. Two columns on phones, four on laptop.',
  source: ['33-clickwise', '20-Infrascope'],
  tags: ['kpi', 'sparkline', 'dashboard'],
  notes: ['Trend direction is shown with an icon and sign, not colour alone.'],
} as const

const stats = [
  { l: 'Revenue', v: '$48.2k', d: 12.4, p: [3, 5, 4, 7, 6, 9, 8, 11] },
  { l: 'Sessions', v: '92,410', d: 5.1, p: [6, 5, 7, 6, 8, 7, 9, 9] },
  { l: 'Churn', v: '2.3%', d: -0.8, p: [9, 8, 8, 7, 7, 6, 6, 5] },
  { l: 'Conversion', v: '4.9%', d: -1.2, p: [8, 9, 7, 8, 6, 7, 5, 6] },
]

function Spark({ p, up }: { p: number[]; up: boolean }) {
  const pts = p.map((y, i) => `${(i / (p.length - 1)) * 100},${34 - y * 3}`).join(' ')
  return <svg viewBox="0 0 100 36" className="h-9 w-full" preserveAspectRatio="none" aria-hidden><polyline points={pts} fill="none" stroke={up ? 'var(--color-ok)' : 'var(--color-danger)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>
}

export default function SparklineStatGrid({ device }: { device: Device }) {
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className={`grid w-full max-w-4xl gap-3 ${device === 'mobile' ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {stats.map((s) => {
          const up = s.d >= 0
          return (
            <div key={s.l} className="rounded-2xl border border-line bg-surface p-3.5">
              <p className="text-xs text-muted">{s.l}</p>
              <p className="font-display text-xl font-semibold text-ink">{s.v}</p>
              <Spark p={s.p} up={up} />
              <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${up ? 'text-ok' : 'text-danger'}`}>{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{up ? '+' : ''}{s.d}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
