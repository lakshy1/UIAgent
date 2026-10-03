import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'footer-section',
  title: 'Footer',
  category: 'Sections',
  description: 'Site footer with brand blurb and link columns. Columns on laptop; collapsible link groups on mobile.',
  source: ['10-aconic-technologies'],
  tags: ['footer', 'links'],
  notes: ['Mobile groups use aria-expanded disclosure buttons.'],
} as const

const cols = { Product: ['Features', 'Pricing', 'Changelog'], Company: ['About', 'Careers', 'Contact'], Legal: ['Privacy', 'Terms', 'Security'] }

export default function FooterSection({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="flex h-full flex-col justify-end bg-bg text-ink">
      <footer className={`border-t border-line bg-surface ${m ? 'p-5' : 'grid grid-cols-[1.4fr_repeat(3,1fr)] gap-8 px-14 py-10'}`}>
        <div><div className="font-display text-xl font-semibold text-brand">Aurora</div><p className="mt-2 max-w-xs text-sm text-muted">Tools for teams who ship every week.</p></div>
        {Object.entries(cols).map(([h, ls]) => (
          <div key={h} className={m ? 'border-b border-line' : ''}>
            {m ? <button aria-expanded={open === h} onClick={() => setOpen(open === h ? null : h)} className="flex h-14 w-full items-center justify-between font-medium">{h}<ChevronDown size={16} className={open === h ? 'rotate-180' : ''} /></button> : <h3 className="text-sm font-medium">{h}</h3>}
            {(!m || open === h) && <ul className={`space-y-2 text-sm text-muted ${m ? 'pb-3' : 'mt-3'}`}>{ls.map((l) => <li key={l}><a href="#" className="hover:text-ink">{l}</a></li>)}</ul>}
          </div>
        ))}
        <p className={`text-xs text-muted ${m ? 'mt-4' : 'col-span-4'}`}>2026 Aurora Labs. All rights reserved.</p>
      </footer>
    </div>
  )
}
