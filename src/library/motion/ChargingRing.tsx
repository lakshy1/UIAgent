import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'charging-ring',
  title: 'Charging progress ring',
  category: 'Motion',
  description: 'SVG progress ring that draws as the value rises, with a pulsing bolt while active. Laptop pairs the ring with a detail panel; mobile centers a larger ring over a bottom stop button.',
  source: ['19-ev-connect', '03-fomodoro'],
  tags: ['svg', 'progress', 'pulse', 'ring'],
  notes: ['Uses role="progressbar" with value now.', 'Pulse stops under reduced motion.'],
} as const

export default function ChargingRing({ device }: { device: Device }) {
  const [pct, setPct] = useState(42)
  const [on, setOn] = useState(true)
  const mobile = device === 'mobile'
  useEffect(() => {
    if (!on || pct >= 100) return
    const t = setInterval(() => setPct((p) => Math.min(100, p + 1)), 220)
    return () => clearInterval(t)
  }, [on, pct])
  const size = mobile ? 220 : 180
  const r = size / 2 - 12
  const c = 2 * Math.PI * r
  const ring = (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Battery charge" className="relative grid place-items-center" style={{ width: size, height: size }}>
      <style>{`@media(prefers-reduced-motion:reduce){.kr-bolt{animation:none!important}}`}</style>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--brand)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset .4s' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <Zap size={mobile ? 30 : 24} className="kr-bolt text-spark" fill="currentColor" style={on && pct < 100 ? { animation: 'kc-float 1.2s ease-in-out infinite' } : undefined} />
        <span className="font-display text-4xl font-bold tabular-nums text-ink">{pct}%</span>
      </div>
    </div>
  )
  const btn = (
    <button onClick={() => (pct >= 100 ? (setPct(10), setOn(true)) : setOn(!on))} className={`rounded-full bg-brand font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${mobile ? 'h-14 w-full text-base' : 'h-10 px-6 text-sm'}`}>
      {pct >= 100 ? 'Start new session' : on ? 'Pause charging' : 'Resume'}
    </button>
  )
  if (mobile) {
    return <div className="flex h-full flex-col items-center justify-between p-5"><div className="grid flex-1 place-items-center">{ring}</div><div className="w-full">{btn}</div></div>
  }
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="flex items-center gap-10 rounded-2xl border border-line bg-surface p-8">
        {ring}
        <div className="flex flex-col gap-3">
          <p className="font-display text-xl font-semibold text-ink">Koramangala Hub, bay 4</p>
          <p className="text-sm text-muted">50 kW DC · {on && pct < 100 ? `${Math.max(1, Math.round((100 - pct) * 0.4))} min remaining` : pct >= 100 ? 'Fully charged' : 'Paused'}</p>
          {btn}
        </div>
      </div>
    </div>
  )
}
