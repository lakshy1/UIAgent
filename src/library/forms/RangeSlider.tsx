import { useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'range-slider',
  title: 'Range slider',
  category: 'Forms',
  description: 'A slider with a filled track, a value bubble that rides above the thumb, and tick labels underneath. For budgets, team sizes, volumes and any number easier to drag than to type.',
  source: ['28-ecommerce', '25-Nivaso', 'Web: shadcn slider'],
  tags: ['slider', 'range', 'input', 'pricing'],
  notes: ['Built on a native range input, so arrow keys, Home, End and screen readers work without extra code.', 'The price below updates live from the value.'],
} as const

export default function RangeSlider({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [v, setV] = useState(12)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      if (stop.current) return
      setV(Math.round(26 + Math.sin((now - start) / 1400) * 20))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
  const pct = ((v - 1) / 49) * 100
  return (
    <div className="grid h-full w-full place-items-center bg-bg p-6" onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }}>
      <style>{`.kc-range{appearance:none;-webkit-appearance:none;width:100%;height:28px;background:transparent;cursor:pointer}
      .kc-range::-webkit-slider-runnable-track{height:8px;border-radius:999px;background:linear-gradient(to right,var(--color-brand) var(--p),var(--color-surface-2) var(--p))}
      .kc-range::-moz-range-track{height:8px;border-radius:999px;background:var(--color-surface-2)}
      .kc-range::-moz-range-progress{height:8px;border-radius:999px;background:var(--color-brand)}
      .kc-range::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-9px;width:26px;height:26px;border-radius:50%;background:var(--color-surface);border:3px solid var(--color-brand);box-shadow:0 4px 12px rgb(0 0 0/.18);transition:transform .15s}
      .kc-range::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--color-surface);border:3px solid var(--color-brand)}
      .kc-range:active::-webkit-slider-thumb{transform:scale(1.15)}`}</style>
      <div className={`rounded-2xl border border-line bg-surface shadow-lg ${m ? 'w-full p-5' : 'w-[460px] p-8'}`}>
        <div className="flex items-end justify-between">
          <label htmlFor="kc-seats" className="font-display text-lg font-bold text-ink">Team size</label>
          <p className="text-sm text-muted"><span className="font-display text-3xl font-extrabold text-ink">${v * 8}</span> / month</p>
        </div>
        <div className="relative mt-10">
          <output htmlFor="kc-seats" className="absolute -top-9 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-bg" style={{ left: `calc(${pct}% + ${13 - pct * 0.26}px)` }}>{v} seats</output>
          <input id="kc-seats" type="range" min={1} max={50} value={v} onChange={e => setV(Number(e.target.value))} className="kc-range" style={{ ['--p' as string]: `${pct}%` }} />
          <div className="mt-1 flex justify-between text-xs text-muted" aria-hidden>{[1, 10, 20, 30, 40, 50].map(n => <span key={n}>{n}</span>)}</div>
        </div>
        <p className="mt-5 text-sm text-muted">$8 per seat. Change it any time; you are billed for the days used.</p>
      </div>
    </div>
  )
}
