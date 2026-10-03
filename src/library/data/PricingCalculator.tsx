import { useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'pricing-calculator',
  title: 'Pricing calculator',
  category: 'Data',
  description: 'Seat slider that updates the monthly total live, with a yearly billing toggle and volume discount.',
  source: ['28-ecommerce', '10-aconic-technologies'],
  tags: ['pricing', 'slider', 'calculator'],
  notes: ['Native range input keeps keyboard and touch support.', 'Total is an aria-live region.'],
} as const

export default function PricingCalculator({ device }: { device: Device }) {
  const [seats, setSeats] = useState(25)
  const [yearly, setYearly] = useState(true)
  const unit = (seats >= 50 ? 9 : 12) * (yearly ? 0.8 : 1)
  const total = Math.round(unit * seats)
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className={`w-full max-w-lg rounded-2xl border border-line bg-surface ${device === 'mobile' ? 'p-4' : 'p-7'}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Team plan</h3>
          <button role="switch" aria-checked={yearly} onClick={() => setYearly(!yearly)} className="flex items-center gap-2 rounded-full text-xs text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand">
            Yearly <span className="text-ok">-20%</span>
            <span className={`h-5 w-9 rounded-full p-0.5 transition ${yearly ? 'bg-brand' : 'bg-surface-2'}`}><span className={`block size-4 rounded-full bg-white transition ${yearly ? 'translate-x-4' : ''}`} /></span>
          </button>
        </div>
        <label className="mt-5 block text-sm text-muted">Seats: <b className="text-ink">{seats}</b>
          <input type="range" min={1} max={100} value={seats} onChange={(e) => setSeats(+e.target.value)} className={`mt-2 w-full accent-brand ${device === 'mobile' ? 'h-8' : ''}`} />
        </label>
        <div className="mt-4 flex items-end justify-between rounded-xl bg-surface-2 p-4" aria-live="polite">
          <span className="text-xs text-muted">${unit.toFixed(2)} per seat / mo{seats >= 50 && ' · volume rate'}</span>
          <span className="font-display text-3xl font-bold text-ink">${total}<span className="text-sm font-normal text-muted">/mo</span></span>
        </div>
      </div>
    </div>
  )
}
