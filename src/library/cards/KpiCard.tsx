import { TrendingUp, TrendingDown } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'kpi-card',
  title: 'KPI card with sparkline',
  category: 'Cards',
  description: 'Metric tile with delta badge and SVG sparkline. Laptop shows a row of three; mobile shows a single wide card with the chart below the value.',
  source: ['20-Infrascope', '33-clickwise'],
  tags: ['kpi', 'sparkline', 'dashboard'],
  notes: ['Chart is decorative; value and delta are text.'],
} as const

const kpis = [
  { l: 'Revenue', v: '$48.2k', d: 12.4, s: [3, 5, 4, 7, 6, 9, 11] },
  { l: 'Signups', v: '1,284', d: 4.1, s: [5, 6, 6, 7, 8, 8, 9] },
  { l: 'Churn', v: '2.3%', d: -0.6, s: [9, 8, 8, 6, 7, 5, 4] },
]

function Spark({ s, up }: { s: number[]; up: boolean }) {
  const max = Math.max(...s), min = Math.min(...s)
  const pts = s.map((v, i) => `${(i / (s.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 26 - 2}`).join(' ')
  return <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden className="h-10 w-full"><polyline points={pts} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={up ? 'stroke-ok' : 'stroke-danger'} /></svg>
}

export default function KpiCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  const list = m ? kpis.slice(0, 1) : kpis
  return (
    <div className={`grid h-full place-items-center bg-bg p-5 text-ink`}>
      <div className={`grid w-full gap-4 ${m ? '' : 'grid-cols-3'}`}>
        {list.map((k) => {
          const up = k.d >= 0
          return (
            <article key={k.l} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between text-sm text-muted">{k.l}
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${up ? 'bg-ok/15 text-ok' : 'bg-danger/15 text-danger'}`}>{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{Math.abs(k.d)}%</span></div>
              <div className={`mt-2 font-display font-semibold ${m ? 'text-4xl' : 'text-3xl'}`}>{k.v}</div>
              <div className="mt-3"><Spark s={k.s} up={up} /></div>
              <p className="mt-1 text-xs text-muted">vs previous 7 days</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
