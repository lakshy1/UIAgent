import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'readiness-gauge',
  title: 'Readiness gauge',
  category: 'Data',
  description: 'Semicircle progress gauge driven by a checklist. Gauge beside list on laptop, stacked on phones.',
  source: ['21-Transform', '25-Nivaso'],
  tags: ['progress', 'gauge', 'checklist'],
  notes: ['Gauge has role="meter" with value attributes.', 'Checklist items are real checkboxes.'],
} as const

const items = ['Inventory imported', 'Dependencies mapped', 'Landing zone approved', 'Cutover rehearsal', 'Rollback plan signed']

export default function ReadinessGauge({ device }: { device: Device }) {
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false])
  const mobile = device === 'mobile'
  const pct = Math.round((done.filter(Boolean).length / items.length) * 100)
  const L = Math.PI * 80
  return (
    <div className={`flex h-full min-h-[380px] items-center justify-center gap-10 p-6 ${mobile ? 'flex-col' : ''}`}>
      <div role="meter" aria-label="Migration readiness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="relative">
        <svg viewBox="0 0 200 110" className={mobile ? 'w-64' : 'w-80'}>
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" />
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke={pct === 100 ? 'var(--ok)' : 'var(--brand)'} strokeWidth="14" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - pct / 100)} className="transition-all duration-500" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center"><div className="font-display text-4xl font-semibold">{pct}%</div><div className="text-xs text-muted">ready for cutover</div></div>
      </div>
      <ul className={`space-y-1 ${mobile ? 'w-full' : 'w-72'}`}>
        {items.map((t, i) => (
          <li key={t}><label className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 hover:bg-surface-2 ${mobile ? 'h-12' : 'h-10'}`}>
            <input type="checkbox" className="peer sr-only" checked={done[i]} onChange={() => setDone(done.map((d, n) => (n === i ? !d : d)))} />
            <span className="grid h-5 w-5 place-items-center rounded-md border border-line text-white peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand"><Check size={13} /></span>
            <span className={`text-sm ${done[i] ? 'text-muted line-through' : ''}`}>{t}</span></label></li>))}
      </ul>
    </div>
  )
}
