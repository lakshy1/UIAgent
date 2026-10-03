import { MapPin, Zap, Navigation } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'charger-card',
  title: 'Charger listing card',
  category: 'Cards',
  description: 'Station listing with availability, power and price. Laptop is a wide card with a side action; mobile is a compact card with a bottom full-width Navigate button.',
  source: ['19-ev-connect'],
  tags: ['listing', 'map', 'ev'],
} as const

const ports = [['CCS', 'ok'], ['CCS', 'ok'], ['CHAdeMO', 'danger'], ['Type 2', 'ok']] as const

export default function ChargerCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink">
      <article className={`w-full rounded-2xl border border-line bg-surface p-5 ${m ? '' : 'flex max-w-2xl items-center gap-6'}`}>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div><h3 className="font-display text-lg font-semibold">Riverside Supercharge Hub</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin size={14} /> 2.4 km - Open 24h</p></div>
            <span className="flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"><Zap size={12} /> 150 kW</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Ports">
            {ports.map(([n, s], i) => <li key={i} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs"><span className={`size-2 rounded-full ${s === 'ok' ? 'bg-ok' : 'bg-danger'}`} />{n} {s === 'ok' ? 'free' : 'busy'}</li>)}
          </ul>
        </div>
        <div className={m ? 'mt-4' : 'text-right'}>
          <p className="font-display text-2xl font-semibold">$0.32<span className="text-xs font-normal text-muted"> /kWh</span></p>
          <button className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${m ? 'h-14 w-full' : 'h-11 px-5'}`}><Navigation size={16} /> Navigate</button>
        </div>
      </article>
    </div>
  )
}
