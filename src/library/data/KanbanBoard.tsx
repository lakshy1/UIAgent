import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'kanban-board',
  title: 'Kanban board',
  category: 'Data',
  description: 'Three-column board with drag-and-drop on laptop. On phones, one column at a time with swipe-free tabs and a move button.',
  source: ['25-Nivaso', '30-Talenzo'],
  tags: ['kanban', 'board', 'drag'],
  notes: ['Drag is mouse-only enhancement; every card has a keyboard-reachable Move button.'],
} as const

const cols = ['To do', 'In progress', 'Done'] as const
const init = [
  { id: 1, t: 'Draft tenant onboarding flow', c: 0 }, { id: 2, t: 'Fix rent receipt PDF', c: 0 },
  { id: 3, t: 'Maintenance request photos', c: 1 }, { id: 4, t: 'Society dues reminders', c: 1 }, { id: 5, t: 'Login rate limiting', c: 2 },
]

export default function KanbanBoard({ device }: { device: Device }) {
  const [cards, setCards] = useState(init)
  const [drag, setDrag] = useState<number | null>(null)
  const [tab, setTab] = useState(0)
  const mobile = device === 'mobile'
  const move = (id: number, c: number) => setCards((x) => x.map((k) => (k.id === id ? { ...k, c: (c + cols.length) % cols.length } : k)))
  const list = (c: number) => cards.filter((k) => k.c === c)
  const card = (k: (typeof init)[number]) => (
    <div key={k.id} draggable={!mobile} onDragStart={() => setDrag(k.id)} className="flex items-center gap-2 rounded-xl border border-line bg-surface p-3 text-sm shadow-sm active:cursor-grabbing">
      <span className="flex-1">{k.t}</span>
      <button aria-label={`Move ${k.t} to ${cols[(k.c + 1) % 3]}`} onClick={() => move(k.id, k.c + 1)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface-2"><ArrowRight size={15} /></button>
    </div>)
  if (mobile) return (
    <div className="h-full min-h-[380px] p-4">
      <div role="tablist" className="grid grid-cols-3 rounded-full bg-surface-2 p-1">{cols.map((c, i) => <button key={c} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={`h-11 rounded-full text-xs ${tab === i ? 'bg-surface font-medium shadow' : 'text-muted'}`}>{c} {list(i).length}</button>)}</div>
      <div className="mt-4 space-y-2">{list(tab).map(card)}{list(tab).length === 0 && <p className="py-10 text-center text-sm text-muted">Nothing here.</p>}</div>
    </div>)
  return (
    <div className="grid h-full min-h-[380px] grid-cols-3 gap-4 p-5">
      {cols.map((c, i) => (
        <section key={c} aria-label={c} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag !== null) move(drag, i); setDrag(null) }} className="rounded-2xl bg-surface-2 p-3">
          <h3 className="mb-3 flex justify-between px-1 text-xs font-medium uppercase tracking-wide text-muted">{c}<span className="font-mono">{list(i).length}</span></h3>
          <div className="space-y-2">{list(i).map(card)}</div>
        </section>))}
    </div>)
}
