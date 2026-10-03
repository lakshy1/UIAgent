import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Paperclip, Calendar, CheckSquare } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'kanban-task-card',
  title: 'Kanban task card',
  category: 'Cards',
  description: 'Task card with label, checklist progress and assignees. Laptop shows it in a column with a status picker; mobile adds a swipe-style move-to row of big buttons.',
  source: ['21-Transform', '25-Nivaso'],
  tags: ['kanban', 'task', 'board'],
} as const

const cols = ['To do', 'Doing', 'Done']

export default function KanbanTaskCard({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1500, () => { const c = ++k % 3; setCol(c); setDone([1, 2, 4][c]) }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const m = device === 'mobile'
  const [col, setCol] = useState(1)
  const [done, setDone] = useState(2)
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className={`w-full ${m ? '' : 'max-w-sm'}`}>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{cols[col]}</p>
        <article className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
          <span className="rounded-full bg-spark/20 px-2 py-0.5 text-xs">Design</span>
          <h3 className="mt-2 font-display font-medium">Redesign onboarding checklist</h3>
          <button onClick={() => setDone((done + 1) % 5)} aria-label="Advance checklist" className="mt-3 flex w-full items-center gap-2 text-xs text-muted"><CheckSquare size={14} /> {done}/4
            <span className="h-1.5 flex-1 rounded-full bg-surface-2"><span className="block h-full rounded-full bg-brand transition-all" style={{ width: `${done * 25}%` }} /></span></button>
          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <div className="flex gap-3"><span className="flex items-center gap-1"><MessageSquare size={12} /> 4</span><span className="flex items-center gap-1"><Paperclip size={12} /> 2</span><span className="flex items-center gap-1"><Calendar size={12} /> Oct 12</span></div>
            <div className="flex -space-x-2">{['A', 'M'].map((x) => <span key={x} className="grid size-6 place-items-center rounded-full border-2 border-surface bg-brand text-[10px] text-white">{x}</span>)}</div>
          </div>
        </article>
        <div role="group" aria-label="Move task" className={`mt-3 grid grid-cols-3 gap-2 ${m ? '' : 'text-xs'}`}>
          {cols.map((c, n) => <button key={c} aria-pressed={col === n} onClick={() => setCol(n)} className={`rounded-xl border ${m ? 'h-12 text-sm' : 'h-9'} ${col === n ? 'border-brand bg-brand-soft text-brand' : 'border-line text-muted'}`}>{c}</button>)}
        </div>
      </div>
    </div>
  )
}
