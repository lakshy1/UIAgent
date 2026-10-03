import { useMemo, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'heatmap-calendar',
  title: 'Heatmap calendar',
  category: 'Data',
  description: 'Contribution-style activity grid with hover readout and an intensity legend. Shows fewer weeks on phones.',
  source: ['Web: shadcn calendar-heatmap pattern', '03-fomodoro'],
  tags: ['activity', 'heatmap', 'calendar'],
  notes: ['Each cell has an aria-label with day and count.'],
} as const

export default function HeatmapCalendar({ device }: { device: Device }) {
  const weeks = device === 'mobile' ? 14 : 30
  const [hover, setHover] = useState<string>('Hover a day to see activity')
  const cells = useMemo(() => Array.from({ length: weeks * 7 }, (_, i) => Math.max(0, Math.round(Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1) * 6 - 1.5))), [weeks])
  const shade = ['bg-surface-2', 'bg-brand/20', 'bg-brand/40', 'bg-brand/65', 'bg-brand']
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-line bg-surface p-4">
        <div className="mb-3 flex items-baseline justify-between"><h3 className="font-display text-base font-semibold text-ink">Focus sessions</h3><span className="text-xs text-muted">{hover}</span></div>
        <div className="grid grid-flow-col grid-rows-7 gap-1" role="grid" aria-label="Activity over time" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0,1fr))` }}>
          {cells.map((c, i) => {
            const n = Math.min(4, c)
            const label = `Day ${i + 1} · ${n * 2} sessions`
            return <button key={i} aria-label={label} onMouseEnter={() => setHover(label)} onFocus={() => setHover(label)} className={`aspect-square rounded-[3px] outline-none transition hover:ring-2 hover:ring-ink/40 focus-visible:ring-2 focus-visible:ring-brand ${shade[n]}`} />
          })}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-muted">Less{shade.map((s) => <span key={s} className={`size-3 rounded-sm ${s}`} />)}More</div>
      </div>
    </div>
  )
}
