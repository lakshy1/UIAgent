import { useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'donut-chart',
  title: 'Donut chart',
  category: 'Data',
  description: 'SVG donut with interactive legend. Legend sits beside it on laptop and becomes tap rows beneath it on phones.',
  source: ['22-Kubeshift', '25-Nivaso'],
  tags: ['chart', 'donut', 'svg', 'legend'],
  notes: ['Legend entries are buttons; color is paired with a label and value.'],
} as const

const seg = [['Compute', 46, 'var(--brand)'], ['Storage', 27, 'var(--spark)'], ['Network', 17, 'var(--ok)'], ['Other', 10, 'var(--muted)']] as const

export default function DonutChart({ device }: { device: Device }) {
  const [sel, setSel] = useState(0)
  const mobile = device === 'mobile'
  const R = 70, C = 2 * Math.PI * R
  let acc = 0
  return (
    <div className={`flex h-full min-h-[380px] items-center gap-8 p-6 ${mobile ? 'flex-col justify-center' : 'justify-center'}`}>
      <div className="relative shrink-0">
        <svg viewBox="0 0 180 180" role="img" aria-label="Cloud spend breakdown" className={mobile ? 'h-48 w-48' : 'h-64 w-64'}>
          {seg.map(([l, v, c], i) => { const off = acc; acc += v; return (
            <circle key={l} cx="90" cy="90" r={R} fill="none" stroke={c} strokeWidth={sel === i ? 22 : 16} strokeDasharray={`${(v / 100) * C - 3} ${C}`} strokeDashoffset={-(off / 100) * C} transform="rotate(-90 90 90)" className="transition-all duration-300" opacity={sel === i ? 1 : 0.6} />) })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center"><div className="font-display text-3xl font-semibold">{seg[sel][1]}%</div><div className="text-xs text-muted">{seg[sel][0]}</div></div>
      </div>
      <ul className={mobile ? 'w-full space-y-1' : 'w-48 space-y-1'}>
        {seg.map(([l, v, c], i) => (
          <li key={l}><button onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} aria-pressed={sel === i} className={`flex w-full items-center gap-3 rounded-xl px-3 text-sm hover:bg-surface-2 ${mobile ? 'h-12' : 'h-10'} ${sel === i ? 'bg-surface-2' : ''}`}>
            <span className="h-3 w-3 rounded-full" style={{ background: c }} /><span className="flex-1 text-left">{l}</span><span className="font-mono text-muted">{v}%</span></button></li>))}
      </ul>
    </div>
  )
}
