import { useEffect, useRef, useState } from 'react'
import { PartyPopper } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'confetti-button',
  title: 'Confetti button',
  category: 'Buttons',
  description: 'A button that throws a burst of paper confetti from itself when pressed. Reward for finishing something: an upgrade, a completed checklist, a first sale.',
  source: ['Web: Magic UI confetti', 'Web: React Bits click spark'],
  tags: ['confetti', 'celebrate', 'reward', 'burst'],
  notes: ['Each piece is a small element animated with CSS custom properties, removed when its animation ends.', 'With reduced motion on, the button only changes its label.'],
} as const

const colors = ['var(--color-brand)', 'var(--color-spark)', 'var(--color-ok)', 'var(--color-danger)', '#b56bff']
type Piece = { id: number; x: number; y: number; r: number; c: string; w: number }

export default function ConfettiButton({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [pieces, setPieces] = useState<Piece[]>([])
  const [done, setDone] = useState(false)
  const next = useRef(0)
  const stop = useRef(false)
  const fire = () => {
    setDone(true)
    window.setTimeout(() => setDone(false), 1600)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const burst = Array.from({ length: 34 }, (_, i) => {
      const angle = -Math.PI / 2 + (i / 33 - 0.5) * Math.PI * 1.25
      const reach = 90 + ((i * 53) % 110)
      return { id: next.current++, x: Math.cos(angle) * reach, y: Math.sin(angle) * reach, r: (i * 97) % 720 - 360, c: colors[i % colors.length], w: 6 + (i % 3) * 3 }
    })
    setPieces(p => [...p, ...burst])
  }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const first = window.setTimeout(() => { if (!stop.current) fire() }, 900)
    const loop = window.setInterval(() => { if (!stop.current) fire() }, 3600)
    return () => { clearTimeout(first); clearInterval(loop) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid h-full w-full place-items-center overflow-hidden bg-bg p-6" onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }}>
      <style>{`@keyframes kc-confetti{0%{transform:translate(0,0) rotate(0);opacity:1}70%{opacity:1}100%{transform:translate(var(--x),calc(var(--y) + 150px)) rotate(var(--r));opacity:0}}`}</style>
      <div className={`relative ${m ? 'w-full' : ''}`}>
        <button onClick={fire} aria-live="polite" className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand font-medium text-white transition active:scale-95 ${m ? 'h-14 w-full text-base' : 'h-12 px-7 text-sm'}`}>
          <PartyPopper size={18} /> {done ? 'Upgraded. Welcome aboard' : 'Upgrade to Pro'}
        </button>
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
          {pieces.map(p => (
            <i key={p.id} onAnimationEnd={() => setPieces(all => all.filter(x => x.id !== p.id))}
              className="absolute block rounded-[2px]"
              style={{ width: p.w, height: p.w * 0.45, background: p.c, animation: 'kc-confetti 1.25s cubic-bezier(.15,.7,.3,1) forwards', ['--x' as string]: `${p.x}px`, ['--y' as string]: `${p.y}px`, ['--r' as string]: `${p.r}deg` }} />
          ))}
        </span>
      </div>
    </div>
  )
}
