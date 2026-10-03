import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'morphing-text',
  title: 'Morphing text',
  category: 'Motion',
  description: 'Words cross-fade through a blur and contrast filter so they appear to melt into each other.',
  source: ['Web: Magic UI morphing text', '04-broomin'],
  tags: ['text', 'morph', 'hero'],
  notes: ['Current word is exposed via aria-live.', 'Cycling stops under reduced motion.'],
} as const

const words = ['Cleaner', 'Faster', 'Smarter', 'Calmer']

export default function MorphingText({ device }: { device: Device }) {
  const [i, setI] = useState(0)
  const m = device === 'mobile'
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="kc-morph"><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -26" /></filter>
      </svg>
      <div>
        <p className={`font-display font-semibold text-ink ${m ? 'text-2xl' : 'text-4xl'}`}>Make your product</p>
        <div className="relative mt-2" style={{ filter: 'url(#kc-morph)', height: m ? 64 : 96 }} aria-live="polite">
          {words.map((w, k) => (
            <span key={w} aria-hidden={k !== i} className={`absolute inset-x-0 top-0 font-display font-bold text-brand transition-all duration-1000 ${m ? 'text-5xl' : 'text-7xl'}`}
              style={{ opacity: k === i ? 1 : 0, filter: `blur(${k === i ? 0 : 12}px)` }}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
