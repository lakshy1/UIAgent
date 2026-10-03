import { Crown } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'leaderboard',
  title: 'Leaderboard',
  category: 'Data',
  description: 'Ranked list with a crowned leader and proportional score bars behind each row.',
  source: ['05-Kanthast', '03-fomodoro'],
  tags: ['ranking', 'gamification', 'list'],
  notes: ['Rendered as an ordered list so rank is announced.'],
} as const

const rows = [['Aarav Mehta', 9420], ['Isha Kapoor', 8810], ['Rohan Das', 8205], ['Meera Nair', 7340], ['Kabir Shah', 6890]] as const

export default function Leaderboard({ device }: { device: Device }) {
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <ol className="w-full max-w-md space-y-2 rounded-2xl border border-line bg-surface p-3" aria-label="Weekly leaderboard">
        {rows.map(([n, s], i) => (
          <li key={n} className={`relative flex items-center gap-3 overflow-hidden rounded-xl px-3 ${device === 'mobile' ? 'h-16' : 'h-12'} ${i === 0 ? 'bg-brand-soft' : 'bg-surface-2'}`}>
            <span className="absolute inset-y-0 left-0 bg-brand/10" style={{ width: `${(s / 9420) * 100}%` }} />
            <span className={`relative grid size-7 place-items-center font-mono text-sm font-bold ${i === 0 ? 'text-spark' : 'text-muted'}`}>{i === 0 ? <Crown size={18} /> : i + 1}</span>
            <span className="relative grid size-8 place-items-center rounded-full bg-brand text-xs font-semibold text-white">{n[0]}</span>
            <span className="relative flex-1 truncate text-sm font-medium text-ink">{n}</span>
            <span className="relative font-mono text-sm text-ink">{s.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
