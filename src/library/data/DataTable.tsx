import { useMemo, useState } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'data-table',
  title: 'Data table',
  category: 'Data',
  description: 'Searchable, sortable table with status badges. Collapses into tappable record cards on phones.',
  source: ['30-Talenzo'],
  tags: ['table', 'sort', 'search', 'status'],
  notes: ['Sortable headers are buttons with aria-sort.', 'Search input is labelled.'],
} as const

const data = [
  { name: 'Aarav Mehta', role: 'Frontend Engineer', status: 'Interview', score: 86 },
  { name: 'Diya Nair', role: 'Product Designer', status: 'Offer', score: 92 },
  { name: 'Kabir Shah', role: 'Data Analyst', status: 'Screening', score: 71 },
  { name: 'Isha Verma', role: 'Backend Engineer', status: 'Rejected', score: 54 },
  { name: 'Rohan Iyer', role: 'QA Lead', status: 'Interview', score: 79 },
]
const tone: Record<string, string> = { Offer: 'bg-ok/15 text-ok', Interview: 'bg-brand-soft text-brand', Screening: 'bg-surface-2 text-muted', Rejected: 'bg-danger/15 text-danger' }
type Key = 'name' | 'score'

export default function DataTable({ device }: { device: Device }) {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<{ k: Key; dir: 1 | -1 }>({ k: 'score', dir: -1 })
  const mobile = device === 'mobile'
  const rows = useMemo(() => data.filter((r) => (r.name + r.role + r.status).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : -1) * sort.dir), [q, sort])
  const th = (k: Key, l: string) => (
    <th scope="col" aria-sort={sort.k === k ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className="px-4 py-3 text-left font-medium">
      <button onClick={() => setSort({ k, dir: sort.k === k ? (-sort.dir as 1 | -1) : 1 })} className="inline-flex items-center gap-1 hover:text-ink">{l}<ArrowUpDown size={12} /></button></th>)
  return (
    <div className="h-full min-h-[380px] p-4">
      <label className="relative block">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input aria-label="Search candidates" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates" className={`w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-brand ${mobile ? 'h-12' : 'h-10 max-w-xs'}`} />
      </label>
      {mobile ? (
        <ul className="mt-3 space-y-2">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft font-semibold text-brand">{r.name[0]}</div>
              <div className="min-w-0 flex-1"><div className="truncate font-medium">{r.name}</div><div className="truncate text-xs text-muted">{r.role}</div></div>
              <span className={`rounded-full px-2.5 py-1 text-xs ${tone[r.status]}`}>{r.status}</span>
            </li>))}
        </ul>
      ) : (
        <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted"><tr>{th('name', 'Candidate')}<th scope="col" className="px-4 py-3 text-left font-medium">Role</th><th scope="col" className="px-4 py-3 text-left font-medium">Status</th>{th('score', 'Fit score')}</tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.name} className="border-t border-line hover:bg-surface-2/60">
                <td className="px-4 py-3 font-medium">{r.name}</td><td className="px-4 py-3 text-muted">{r.role}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${tone[r.status]}`}>{r.status}</span></td>
                <td className="px-4 py-3 font-mono">{r.score}</td></tr>))}</tbody>
          </table>
        </div>
      )}
      {rows.length === 0 && <p className="mt-6 text-center text-sm text-muted">No candidates match "{q}".</p>}
    </div>
  )
}
