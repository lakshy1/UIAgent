import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'launch-countdown',
  title: 'Launch countdown',
  category: 'Sections',
  description: 'Live countdown to a launch date with days, hours, minutes and seconds tiles and a notify CTA.',
  source: ['Web: coming soon pattern', '04-broomin'],
  tags: ['countdown', 'launch', 'timer'],
  notes: ['Timer has an sr-only summary updated per minute, not per second.'],
} as const

const target = Date.now() + 12 * 86400000 + 5 * 3600000

export default function LaunchCountdown({ device }: { device: Device }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const s = Math.max(0, Math.floor((target - now) / 1000))
  const parts = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor(s / 3600) % 24], ['Minutes', Math.floor(s / 60) % 60], ['Seconds', s % 60]] as const
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center p-6">
      <div className="w-full max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Launching soon</p>
        <h2 className="mt-2 font-display text-3xl text-ink">Orbit 2.0 lands in</h2>
        <div role="timer" className={`mt-6 grid grid-cols-4 ${mobile ? 'gap-2' : 'gap-4'}`}>
          {parts.map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-line bg-surface py-4">
              <div className={`font-display font-semibold tabular-nums text-ink ${mobile ? 'text-2xl' : 'text-5xl'}`}>{String(v).padStart(2, '0')}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{l}</div>
            </div>
          ))}
        </div>
        <span className="sr-only">{parts[0][1]} days {parts[1][1]} hours remaining</span>
        <button className={`mt-6 rounded-full bg-brand px-7 text-sm font-medium text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${mobile ? 'h-14 w-full' : 'h-12'}`}>Notify me</button>
      </div>
    </div>
  )
}
