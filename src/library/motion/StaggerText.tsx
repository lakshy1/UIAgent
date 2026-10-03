import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'stagger-text',
  title: 'Stagger text reveal',
  category: 'Motion',
  description: 'Headline whose words rise into place one after another. Laptop reveals words in a single large line group; mobile reveals line by line to avoid awkward wraps.',
  source: ['05-Kanthast', '10-aconic-technologies'],
  tags: ['headline', 'reveal', 'hero'],
  notes: ['Full text stays in an aria-label so screen readers read it once.', 'Words appear instantly under reduced motion.'],
} as const

const lines = ['Learn faster,', 'remember longer,', 'enjoy every class.']

export default function StaggerText({ device }: { device: Device }) {
  const [run, setRun] = useState(0)
  const reduce = useReducedMotion()
  const mobile = device === 'mobile'
  const words = lines.join(' ').split(' ')
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="flex flex-col items-center gap-6">
        <h2 key={run} aria-label={lines.join(' ')} className={`text-center font-display font-bold leading-tight text-ink ${mobile ? 'text-3xl' : 'max-w-3xl text-6xl'}`}>
          {mobile
            ? lines.map((l, i) => (
                <motion.span aria-hidden key={l} className="block" initial={reduce ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25, duration: 0.5 }}>{l}</motion.span>
              ))
            : words.map((w, i) => (
                <span aria-hidden key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                  <motion.span className={`inline-block ${i > 5 ? 'text-brand' : ''}`} initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
                </span>
              ))}
        </h2>
        <button onClick={() => setRun(run + 1)} className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">
          <RotateCw size={14} /> Replay
        </button>
      </div>
    </div>
  )
}
