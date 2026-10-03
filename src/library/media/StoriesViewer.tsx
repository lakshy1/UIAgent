import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'stories-viewer',
  title: 'Stories viewer',
  category: 'Media',
  description: 'Story frame with segmented progress bars, auto-advance and tap zones to go back or forward. Pauses on hold.',
  source: ['Web: stories UI trend', '05-Kanthast'],
  tags: ['stories', 'progress', 'autoplay'],
  notes: ['Buttons exist for previous/next, not just tap zones.', 'Progress pauses while pointer or finger is down.'],
} as const

const stories = [
  ['Lesson 1', 'Photosynthesis in 60 seconds', 'from-lime-400 to-emerald-700'],
  ['Lesson 2', 'Why leaves change colour', 'from-amber-300 to-red-600'],
  ['Lesson 3', 'Quiz: test yourself', 'from-sky-400 to-fuchsia-600'],
]
const DUR = 4000

export default function StoriesViewer({ device }: { device: Device }) {
  const [i, setI] = useState(0)
  const [held, setHeld] = useState(false)
  const next = () => setI((v) => (v + 1) % stories.length)
  useEffect(() => {
    if (held) return
    const id = setTimeout(next, DUR)
    return () => clearTimeout(id)
  }, [i, held])
  const [tag, title, g] = stories[i]
  return (
    <div className="grid h-full place-items-center p-3">
      <div className={`relative h-full max-h-[620px] select-none overflow-hidden rounded-3xl bg-gradient-to-b ${g} ${device === 'mobile' ? 'w-full' : 'aspect-[9/16]'}`}
        onPointerDown={() => setHeld(true)} onPointerUp={() => setHeld(false)} onPointerLeave={() => setHeld(false)}>
        <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
          {stories.map((_, k) => (
            <div key={k} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              {k < i ? <div className="h-full bg-white" /> : k === i && (
                <motion.div key={`${i}-${held}`} className="h-full bg-white" initial={{ width: 0 }} animate={{ width: held ? undefined : '100%' }} transition={{ duration: DUR / 1000, ease: 'linear' }} />
              )}
            </div>
          ))}
        </div>
        <button aria-label="Previous story" onClick={() => setI((v) => Math.max(0, v - 1))} className="absolute inset-y-0 left-0 z-10 w-1/3 outline-none focus-visible:bg-white/10" />
        <button aria-label="Next story" onClick={next} className="absolute inset-y-0 right-0 z-10 w-1/3 outline-none focus-visible:bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
          <p className="font-mono text-xs uppercase tracking-wider opacity-80">{tag}</p>
          <p className="font-display text-xl font-semibold leading-tight">{title}</p>
        </div>
      </div>
    </div>
  )
}
