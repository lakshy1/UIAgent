import { useCallback, useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'text-scramble',
  title: 'Text scramble',
  category: 'Motion',
  description: 'Headline that decodes from random glyphs into each phrase in turn. Click to cycle early.',
  source: ['Web: Aceternity / Magic UI hacker text', '22-Kubeshift'],
  tags: ['text', 'decode', 'hero'],
  notes: ['Screen readers get the final phrase via aria-label, not the scrambled glyphs.', 'Shows text instantly under reduced motion.'],
} as const

const phrases = ['Ship faster', 'Migrate safely', 'Scale quietly', 'Sleep better']
const glyphs = '!<>-_\\/[]{}=+*^?#'

export default function TextScramble({ device }: { device: Device }) {
  const [i, setI] = useState(0)
  const [out, setOut] = useState(phrases[0])
  const raf = useRef(0)
  const m = device === 'mobile'
  const run = useCallback((to: string) => {
    cancelAnimationFrame(raf.current)
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setOut(to)
    let f = 0
    const step = () => {
      f++
      setOut(to.split('').map((c, k) => (c === ' ' || f > k * 3 + 8 ? c : glyphs[Math.floor(Math.random() * glyphs.length)])).join(''))
      if (f < to.length * 3 + 9) raf.current = requestAnimationFrame(step)
    }
    step()
  }, [])
  useEffect(() => { run(phrases[i]); return () => cancelAnimationFrame(raf.current) }, [i, run])
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % phrases.length), 3200); return () => clearInterval(t) }, [])
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <button onClick={() => setI((v) => (v + 1) % phrases.length)} aria-label={phrases[i]} className="rounded-xl p-4 focus-visible:outline-2 focus-visible:outline-brand">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Our promise</span>
        <span aria-hidden className={`mt-2 block font-mono font-semibold text-brand ${m ? 'text-3xl' : 'text-5xl'}`}>{out}</span>
      </button>
    </div>
  )
}
