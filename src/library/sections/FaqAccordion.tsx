import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'faq-accordion',
  title: 'FAQ accordion',
  category: 'Sections',
  description: 'Single-open accordion with animated height. Laptop pairs it with a sticky intro column; mobile goes full width with 56px tap rows.',
  source: ['05-Kanthast', '18-queue-care'],
  tags: ['faq', 'accordion'],
  notes: ['Buttons use aria-expanded and aria-controls.'],
} as const

const faq = [
  ['Can I cancel anytime?', 'Yes. Cancel from settings and keep access until the end of the billing period.'],
  ['Do you offer refunds?', 'Full refund within 14 days, no questions asked.'],
  ['Is my data encrypted?', 'Data is encrypted at rest and in transit, with optional customer-managed keys.'],
  ['Can I invite my team?', 'Unlimited viewers on every plan; editors depend on your tier.'],
]

export default function FaqAccordion({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1800, () => setOpen(++k % faq.length)]]
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
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} className={`h-full bg-bg text-ink ${m ? 'p-5' : 'grid grid-cols-[1fr_1.6fr] gap-12 px-14 py-10'}`}>
      <div><h2 className={`font-display font-semibold ${m ? 'text-2xl' : 'text-4xl'}`}>Questions, answered</h2><p className="mt-2 text-sm text-muted">Still stuck? Email support@example.com.</p></div>
      <div className={`divide-y divide-line ${m ? 'mt-4' : ''}`}>
        {faq.map(([q, a], n) => (
          <div key={q}>
            <button id={`fq-${n}`} aria-expanded={open === n} aria-controls={`fa-${n}`} onClick={() => setOpen(open === n ? null : n)} className={`flex w-full items-center justify-between gap-4 text-left font-medium focus-visible:outline-2 focus-visible:outline-brand ${m ? 'min-h-14' : 'min-h-12'}`}>
              {q}<Plus size={18} className={`shrink-0 text-brand transition ${open === n ? 'rotate-45' : ''}`} />
            </button>
            <AnimatePresence initial={false}>{open === n && (
              <motion.div id={`fa-${n}`} role="region" aria-labelledby={`fq-${n}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-4 text-sm text-muted">{a}</p></motion.div>
            )}</AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
