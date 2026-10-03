import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'tag-input',
  title: 'Tag input',
  category: 'Forms',
  description: 'Type and press Enter or comma to add chips; Backspace removes the last. Suggestions are tappable.',
  source: ['Web: Emblor tag input pattern', '30-Talenzo'],
  tags: ['chips', 'tags', 'input'],
  notes: ['Each chip has a labelled remove button.'],
} as const

const sugg = ['React', 'TypeScript', 'Postgres', 'Figma', 'Docker']
export default function TagInput({ device }: { device: Device }) {
  const [tags, setTags] = useState(['Node.js', 'Tailwind'])
  const [v, setV] = useState('')
  const add = (t: string) => { t = t.trim(); if (t && !tags.includes(t)) setTags([...tags, t]); setV('') }
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      const w = 'Docker'
      w.split('').forEach((_, i) => at(900 + i * 140, () => setV(w.slice(0, i + 1))))
      at(900 + w.length * 140 + 300, () => { setTags(t => (t.includes(w) ? t : [...t, w])); setV('') })
      at(4000, () => setTags(t => t.filter(x => x !== w)))
      at(5000, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full w-full place-items-center p-4">
      <div className="w-full max-w-md">
        <label htmlFor="ti" className="mb-1.5 block text-sm font-medium text-ink">Skills</label>
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface p-2 focus-within:ring-2 focus-within:ring-brand">
          {tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-full bg-brand-soft py-1 pl-3 pr-1.5 text-sm text-brand">{t}<button aria-label={`Remove ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))} className="grid size-5 place-items-center rounded-full hover:bg-brand/20"><X size={12} /></button></span>)}
          <input id="ti" value={v} onChange={(e) => setV(e.target.value)} placeholder="Add a skill" className={`min-w-24 flex-1 bg-transparent px-1 text-sm text-ink outline-none placeholder:text-muted ${device === 'mobile' ? 'h-10' : 'h-8'}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(v) } else if (e.key === 'Backspace' && !v) setTags(tags.slice(0, -1)) }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted">Try:{sugg.filter((s) => !tags.includes(s)).map((s) => <button key={s} onClick={() => add(s)} className={`rounded-full border border-line px-2.5 text-ink hover:bg-surface-2 ${device === 'mobile' ? 'py-2' : 'py-1'}`}>+ {s}</button>)}</div>
      </div>
    </div>
  )
}
