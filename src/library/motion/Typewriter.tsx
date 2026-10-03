import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'typewriter',
  title: 'Typewriter prompts',
  category: 'Motion',
  description: 'Cycles example prompts by typing and deleting them. Laptop shows a wide search bar; mobile shows a chat-style composer pinned to the bottom.',
  source: ['24-Omnipane', '33-clickwise'],
  tags: ['text', 'typing', 'placeholder', 'search'],
  notes: ['Decorative text is aria-hidden; the input has a static aria-label.', 'Shows the first prompt statically under reduced motion.'],
} as const

const prompts = ['Show failed deployments this week', 'Which clusters are over budget?', 'Draft a rollback plan for payments']

export default function Typewriter({ device }: { device: Device }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    if (reduce) return
    const full = prompts[i]
    const t = setTimeout(() => {
      if (!del && n < full.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % prompts.length) }
    }, !del && n === full.length ? 1400 : del ? 25 : 55)
    return () => clearTimeout(t)
  }, [n, del, i, reduce])
  const text = reduce ? prompts[0] : prompts[i].slice(0, n)
  const shown = (
    <span aria-hidden className="truncate text-muted">{text}<span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-brand" style={reduce ? undefined : { animation: 'kc-pulse-ring 1s steps(2) infinite' }} /></span>
  )
  if (device === 'mobile') {
    return (
      <div className="relative h-full">
        <div className="flex flex-col gap-3 p-5">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-brand px-4 py-2 text-sm text-white">What changed since yesterday?</div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2 text-sm text-ink">Three deploys shipped and one rolled back.</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-surface p-3">
          <label className="flex h-12 items-center gap-2 rounded-full border border-line bg-bg px-4 text-sm">
            <Sparkles size={16} className="shrink-0 text-brand" />
            <input aria-label="Ask a question" className="absolute size-0 opacity-0" />{shown}
          </label>
        </div>
      </div>
    )
  }
  return (
    <div className="grid h-full place-items-center p-6">
      <label className="flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl border border-line bg-surface px-5 shadow-sm focus-within:border-brand">
        <Search size={18} className="shrink-0 text-muted" />
        <input aria-label="Ask a question" className="absolute size-0 opacity-0" />{shown}
        <kbd className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-xs text-muted">Ctrl K</kbd>
      </label>
    </div>
  )
}
