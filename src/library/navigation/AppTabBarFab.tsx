import { useState, useEffect, useRef } from 'react'
import { Home, Compass, Bell, User, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'app-tab-bar-fab',
  title: 'Tab bar with FAB notch',
  category: 'Navigation',
  description: 'Mobile app tab bar with a raised centre action button that sits in a curved notch. Becomes a top tab row with a button on laptop.',
  source: ['Web: mobile app pattern', '18-queue-care', '19-ev-connect'],
  tags: ['tabbar', 'fab', 'mobile'],
  notes: ['Tabs expose aria-current.', 'FAB is 56px for thumb reach.'],
} as const

const tabs = [{ l: 'Home', I: Home }, { l: 'Explore', I: Compass }, { l: 'Alerts', I: Bell }, { l: 'Profile', I: User }]

export default function AppTabBarFab({ device }: { device: Device }) {
  const [a, setA] = useState(0)
  const [n, setN] = useState(0)
  const btn = (i: number) => {
    const { l, I } = tabs[i]
    return (
      <button key={l} onClick={() => setA(i)} aria-current={a === i ? 'page' : undefined} aria-label={l}
        className={`flex flex-1 flex-col items-center gap-0.5 py-1 text-[11px] transition focus-visible:outline-2 focus-visible:outline-brand ${a === i ? 'text-brand' : 'text-muted'}`}>
        <I size={22} />{l}
      </button>
    )
  }
  const body = (
    <div className="p-6 text-center text-sm text-muted">{tabs[a].l} screen. New items created: <b className="text-ink">{n}</b></div>
  )
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      at(900, () => setA(1))
      at(1700, () => setA(2))
      at(2300, () => setN(c => c + 1))
      at(3100, () => setA(3))
      at(3900, () => setA(0))
      at(5000, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  if (device === 'laptop') {
    return (
      <div ref={root} className="h-full w-full p-6">
        <nav aria-label="Primary" className="mx-auto flex max-w-xl items-center gap-1 rounded-full border border-line bg-surface p-1">
          {tabs.map((_, i) => btn(i))}
          <button onClick={() => setN(n + 1)} className="ml-1 inline-flex h-10 items-center gap-1 rounded-full bg-brand px-4 text-sm font-medium text-white"><Plus size={16} />New</button>
        </nav>
        {body}
      </div>
    )
  }
  return (
    <div ref={root} className="relative flex h-full flex-col justify-between">
      {body}
      <nav aria-label="Primary" className="relative border-t border-line bg-surface px-2 pb-3 pt-2">
        <div className="flex items-end">
          {btn(0)}{btn(1)}<div className="w-16" aria-hidden />{btn(2)}{btn(3)}
        </div>
        <div className="absolute left-1/2 top-0 h-7 w-[72px] -translate-x-1/2 -translate-y-px rounded-b-full border border-t-0 border-line bg-bg" aria-hidden />
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => setN(n + 1)} aria-label="Create new"
          className="absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><Plus size={26} /></motion.button>
      </nav>
    </div>
  )
}
