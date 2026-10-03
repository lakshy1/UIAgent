import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'blur-in-words',
  title: 'Blur-in word reveal',
  category: 'Motion',
  description: 'Words fade up out of a blur one after another, with a replay button.',
  source: ['Web: Magic UI blur fade / text reveal', '10-aconic-technologies'],
  tags: ['text', 'reveal', 'hero'],
  notes: ['Replay button has an aria-label.', 'framer-motion respects reduced motion via the hook below.'],
} as const

const text = 'Software that gets out of your way and lets your team do their best work.'

export default function BlurInWords({ device }: { device: Device }) {
  const [run, setRun] = useState(0)
  const m = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <div className="max-w-xl">
        <p key={run} aria-label={text} className={`font-display font-semibold leading-tight text-ink ${m ? 'text-2xl' : 'text-4xl'}`}>
          {text.split(' ').map((w, i) => (
            <motion.span key={i} aria-hidden className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.09 }}>{w}</motion.span>
          ))}
        </p>
        <button onClick={() => setRun((v) => v + 1)} aria-label="Replay animation"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">
          <RotateCcw size={14} /> Replay
        </button>
      </div>
    </div>
  )
}
