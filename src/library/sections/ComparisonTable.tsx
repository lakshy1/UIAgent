import { useEffect, useRef, useState } from 'react'
import { Check, Minus } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'comparison-table',
  title: 'Plan comparison table',
  category: 'Sections',
  description: 'Feature-by-plan matrix with a highlighted recommended column. On phones it becomes a plan switcher showing one plan at a time.',
  source: ['Web: pricing page pattern', '33-clickwise'],
  tags: ['pricing', 'table', 'compare'],
  notes: ['Check and dash icons carry sr-only text.', 'Plan tabs use aria-pressed.'],
} as const

const plans = ['Starter', 'Pro', 'Team']
const rows: [string, boolean[]][] = [
  ['Unlimited projects', [true, true, true]],
  ['Custom domains', [false, true, true]],
  ['Priority support', [false, true, true]],
  ['Audit log', [false, false, true]],
  ['SSO and SAML', [false, false, true]],
]

const Cell = ({ v }: { v: boolean }) => v
  ? <><Check size={18} className="mx-auto text-ok" /><span className="sr-only">Included</span></>
  : <><Minus size={18} className="mx-auto text-muted" /><span className="sr-only">Not included</span></>

export default function ComparisonTable({ device }: { device: Device }) {
  const [row, setRow] = useState(-1)
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1400, () => { setRow(k % rows.length); if (k % rows.length === 0) setP((x) => (x + 1) % 3); k++ }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [p, setP] = useState(1)
  const mobile = device === 'mobile'
  const cols = mobile ? [p] : [0, 1, 2]
  return (
    <div className="grid h-full w-full place-items-center overflow-y-auto p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="w-full max-w-2xl">
        {mobile && (
          <div className="mb-3 grid grid-cols-3 gap-2">
            {plans.map((n, i) => (
              <button key={n} aria-pressed={p === i} onClick={() => setP(i)} className={`h-11 rounded-xl text-sm font-medium ${p === i ? 'bg-brand text-white' : 'bg-surface-2 text-muted'}`}>{n}</button>
            ))}
          </div>
        )}
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line bg-surface text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left font-medium text-muted">Features</th>
              {cols.map(c => <th key={c} className={`p-3 font-display text-base ${c === 1 ? 'bg-brand text-white' : 'text-ink'}`}>{plans[c]}{c === 1 && <span className="block text-[10px] font-normal opacity-80">Most popular</span>}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([f, v], ri) => (
              <tr key={f} className={row === ri ? 'bg-surface-2' : ''}>
                <td className="border-t border-line p-3 text-ink">{f}</td>
                {cols.map(c => <td key={c} className={`border-t border-line p-3 text-center ${c === 1 ? 'bg-brand-soft' : ''}`}><Cell v={v[c]} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
