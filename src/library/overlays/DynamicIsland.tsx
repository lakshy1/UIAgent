import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Music2, Phone, PhoneOff, Timer } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'dynamic-island',
  title: 'Dynamic island',
  category: 'Overlays',
  description: 'A black pill at the top of the screen that stretches and reshapes itself to show a timer, a song, an incoming call or a confirmation. One spot for live activity, instead of several banners.',
  source: ['Web: Apple Dynamic Island', 'Web: Cult UI dynamic island'],
  tags: ['island', 'morph', 'status', 'notification'],
  notes: ['The pill uses a shared layout animation, so it morphs between sizes instead of cross-fading.', 'Content changes are announced through a polite live region.'],
} as const

const states = ['idle', 'timer', 'music', 'call', 'done'] as const
type State = (typeof states)[number]
const labels: Record<State, string> = { idle: 'Idle', timer: 'Timer', music: 'Music', call: 'Call', done: 'Saved' }
const sizes: Record<State, { w: number; h: number }> = {
  idle: { w: 120, h: 36 }, timer: { w: 190, h: 40 }, music: { w: 310, h: 76 }, call: { w: 320, h: 68 }, done: { w: 170, h: 40 },
}

export default function DynamicIsland({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [s, setS] = useState<State>('idle')
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const t = window.setInterval(() => { if (!stop.current) { i = (i + 1) % states.length; setS(states[i]) } }, 2000)
    return () => clearInterval(t)
  }, [])
  const size = sizes[s]
  return (
    <div className="relative flex h-full w-full flex-col items-center bg-bg" onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }}>
      <div className={`flex justify-center ${m ? 'pt-3' : 'pt-10'}`} aria-live="polite">
        <motion.div layout transition={{ type: 'spring', stiffness: 380, damping: 30 }} style={{ width: Math.min(size.w, m ? 330 : 400), height: size.h, borderRadius: 999 }}
          className="relative flex items-center overflow-hidden bg-black px-4 text-white shadow-2xl">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={s} initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }} transition={{ duration: 0.22 }} className="flex w-full items-center gap-3">
              {s === 'idle' && <span className="sr-only">No activity</span>}
              {s === 'timer' && <><Timer size={16} className="text-[#ffb020]" /><span className="text-xs text-white/60">Focus</span><span className="ml-auto font-mono text-sm tabular-nums text-[#ffb020]">24:59</span></>}
              {s === 'music' && <>
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff5fc4] to-[#5b7cff]"><Music2 size={20} /></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold">Slow Tide</span><span className="block truncate text-xs text-white/55">Marlow & Ivy</span></span>
                <span className="ml-auto flex h-5 items-end gap-0.5" aria-hidden>{[0, 1, 2, 3].map(i => <span key={i} className="w-0.5 rounded-full bg-[#ff5fc4]" style={{ height: '100%', transformOrigin: 'bottom', animation: `kc-eq .9s ease-in-out ${i * 0.15}s infinite alternate` }} />)}</span>
              </>}
              {s === 'call' && <>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-semibold">AM</span>
                <span className="min-w-0"><span className="block text-xs text-white/55">Incoming call</span><span className="block truncate text-sm font-semibold">Aarav Mehta</span></span>
                <span className="ml-auto flex gap-2"><span className="grid size-9 place-items-center rounded-full bg-[#ff453a]"><PhoneOff size={16} /></span><span className="grid size-9 place-items-center rounded-full bg-[#30d158]"><Phone size={16} /></span></span>
              </>}
              {s === 'done' && <><span className="grid size-5 place-items-center rounded-full bg-[#30d158]"><Check size={13} /></span><span className="text-sm font-medium">Saved to library</span></>}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`@keyframes kc-eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}`}</style>
      <div className="mt-auto flex flex-wrap justify-center gap-2 p-6" role="group" aria-label="Show activity">
        {states.map(k => (
          <button key={k} onClick={() => setS(k)} aria-pressed={s === k} className={`rounded-full border px-4 text-sm font-medium transition ${m ? 'h-11' : 'h-9'} ${s === k ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:text-ink'}`}>{labels[k]}</button>
        ))}
      </div>
    </div>
  )
}
