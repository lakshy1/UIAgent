import { useEffect, useRef, useState } from 'react'
import { Copy, Pencil, Share2, Trash2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'context-menu',
  title: 'Context menu',
  category: 'Overlays',
  description: 'Right-click menu positioned at the cursor on laptop; long-press opens it on phones with larger rows.',
  source: ['Web: shadcn context-menu pattern', '24-Omnipane'],
  tags: ['menu', 'right-click', 'actions'],
  notes: ['First item is focused on open; Escape closes.', 'Menu is clamped inside the frame.'],
} as const

const items = [[Pencil, 'Rename'], [Copy, 'Duplicate'], [Share2, 'Share'], [Trash2, 'Delete']] as const
export default function ContextMenu({ device }: { device: Device }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [last, setLast] = useState('')
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()
  const mobile = device === 'mobile'
  const openAt = (x: number, y: number, el: HTMLElement) => { const r = el.getBoundingClientRect(); setPos({ x: Math.max(8, Math.min(x - r.left, r.width - 184)), y: Math.max(8, Math.min(y - r.top, r.height - 200)) }) }
  const stop = useRef(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => {
      if (stop.current) return
      const r = root.current?.getBoundingClientRect()
      if (r) setPos(on ? { x: Math.max(8, Math.min(r.width / 2 + 10, r.width - 184)), y: Math.max(8, Math.min(r.height / 2 - 10, r.height - 200)) } : null)
      t = setTimeout(() => run(!on), on ? 2500 : 1200)
    }
    t = setTimeout(() => run(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div ref={root} onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative grid h-full w-full place-items-center overflow-hidden p-4" onClick={() => setPos(null)} onKeyDown={(e) => e.key === 'Escape' && setPos(null)}
      onContextMenu={(e) => { e.preventDefault(); openAt(e.clientX, e.clientY, e.currentTarget) }}
      onTouchStart={(e) => { const t = e.touches[0], el = e.currentTarget; setTimer(setTimeout(() => openAt(t.clientX, t.clientY, el), 450)) }} onTouchEnd={() => clearTimeout(timer)}>
      <div tabIndex={0} className="rounded-2xl border-2 border-dashed border-line bg-surface px-8 py-10 text-center text-sm text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand">
        {mobile ? 'Long-press anywhere' : 'Right-click anywhere'}<br /><span className="text-ink">{last ? `Chose: ${last}` : 'to open the menu'}</span>
      </div>
      {pos && (
        <div role="menu" style={{ left: pos.x, top: pos.y }} onClick={(e) => e.stopPropagation()} className="absolute z-10 w-44 rounded-xl border border-line bg-surface p-1 shadow-xl">
          {items.map(([I, l]) => <button key={l} role="menuitem" autoFocus={l === 'Rename'} onClick={() => { setLast(l); setPos(null) }} className={`flex w-full items-center gap-2.5 rounded-lg px-3 text-sm outline-none hover:bg-surface-2 focus-visible:bg-surface-2 ${mobile ? 'h-12' : 'h-9'} ${l === 'Delete' ? 'text-danger' : 'text-ink'}`}><I size={15} />{l}</button>)}
        </div>
      )}
    </div>
  )
}
