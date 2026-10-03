import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'flip-words',
  title: 'Flip words',
  category: 'Motion',
  description: 'One word in a headline swaps out every couple of seconds: the old one blurs upward, the new one rises in letter by letter. Lets a single line make several promises.',
  source: ['Web: Aceternity flip words', 'Web: React Bits rotating text'],
  tags: ['text', 'rotate', 'headline', 'stagger'],
  notes: ['Screen readers get the full list once, through a visually hidden sentence, instead of a word that keeps changing.', 'Holds the first word when reduced motion is on.'],
} as const

const words = ['faster', 'calmer', 'smarter', 'together']

export default function FlipWords({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI(n => (n + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])
  const word = words[i]
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <div>
        <h2 aria-hidden className={`font-display font-bold tracking-tight text-ink ${m ? 'text-4xl' : 'text-6xl'}`}>
          Teams ship{m ? <br /> : ' '}
          <span className="relative inline-block text-left">
            <AnimatePresence mode="wait">
              <motion.span key={word} className="inline-block text-brand"
                exit={{ opacity: 0, y: -28, filter: 'blur(8px)', transition: { duration: 0.28 } }}>
                {word.split('').map((ch, k) => (
                  <motion.span key={k} className="inline-block" initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: k * 0.045, duration: 0.3 }}>{ch}</motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
        <p className="sr-only">Teams ship faster, calmer, smarter and together.</p>
        <p className="mt-4 text-sm text-muted">One workspace for plans, docs and decisions.</p>
      </div>
    </div>
  )
}
