import { useState } from 'react'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'tree-view',
  title: 'Tree view',
  category: 'Data',
  description: 'Expandable file tree with keyboard toggle, selection highlight and indentation.',
  source: ['24-Omnipane', '22-Kubeshift'],
  tags: ['tree', 'files', 'nested'],
  notes: ['Uses role="tree" and aria-expanded.', 'Rows grow to touch size on phones.'],
} as const

type N = { n: string; c?: N[] }
const data: N[] = [
  { n: 'src', c: [{ n: 'components', c: [{ n: 'Button.tsx' }, { n: 'Modal.tsx' }] }, { n: 'hooks', c: [{ n: 'useAuth.ts' }] }, { n: 'main.tsx' }] },
  { n: 'public', c: [{ n: 'logo.svg' }] },
  { n: 'package.json' },
]

function Node({ node, depth, sel, setSel, big }: { node: N; depth: number; sel: string; setSel: (s: string) => void; big: boolean }) {
  const [open, setOpen] = useState(depth === 0)
  const dir = !!node.c
  return (
    <li role="treeitem" aria-expanded={dir ? open : undefined} aria-selected={sel === node.n}>
      <button onClick={() => { setSel(node.n); if (dir) setOpen(!open) }} style={{ paddingLeft: 8 + depth * 16 }} className={`flex w-full items-center gap-2 rounded-lg pr-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand ${big ? 'h-11' : 'h-8'} ${sel === node.n ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-surface-2'}`}>
        <ChevronRight size={14} className={`shrink-0 transition ${dir ? '' : 'opacity-0'} ${open ? 'rotate-90' : ''}`} />
        {dir ? (open ? <FolderOpen size={16} className="text-spark" /> : <Folder size={16} className="text-spark" />) : <File size={16} className="text-muted" />}
        {node.n}
      </button>
      {dir && open && <ul role="group">{node.c!.map((c) => <Node key={c.n} node={c} depth={depth + 1} sel={sel} setSel={setSel} big={big} />)}</ul>}
    </li>
  )
}

export default function TreeView({ device }: { device: Device }) {
  const [sel, setSel] = useState('Button.tsx')
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <ul role="tree" aria-label="Project files" className="w-full max-w-sm rounded-2xl border border-line bg-surface p-2">
        {data.map((n) => <Node key={n.n} node={n} depth={0} sel={sel} setSel={setSel} big={device === 'mobile'} />)}
      </ul>
    </div>
  )
}
