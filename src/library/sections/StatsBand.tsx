import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'stats-band',
  title: 'Stats band with count-up',
  category: 'Sections',
  description: 'Brand-colored band with big numbers that count up on mount. Four across on laptop, a 2x2 grid on mobile.',
  source: ['19-ev-connect', '30-Talenzo'],
  tags: ['stats', 'count-up'],
  notes: ['Count-up is skipped when prefers-reduced-motion is set.'],
} as const

const stats = [['Chargers online', 4820, ''], ['Cities', 63, ''], ['kWh delivered', 12, 'M'], ['Uptime', 99, '%']] as const

export default function StatsBand({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [k, setK] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setK(1); return }
    let f = 0
    const id = setInterval(() => { f++; setK(Math.min(1, f / 30)); if (f >= 30) clearInterval(id) }, 30)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="grid h-full place-items-center bg-bg p-4">
      <div className={`w-full rounded-3xl bg-brand text-white ${m ? 'grid grid-cols-2 gap-6 p-6' : 'grid grid-cols-4 gap-4 px-10 py-12'}`}>
        {stats.map(([l, v, s]) => (
          <div key={l}><div className={`font-display font-semibold tabular-nums ${m ? 'text-3xl' : 'text-5xl'}`}>{Math.round(v * k).toLocaleString()}{s}</div><div className="mt-1 text-sm opacity-80">{l}</div></div>
        ))}
      </div>
    </section>
  )
}
