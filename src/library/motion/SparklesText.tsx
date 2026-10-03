import type { Device } from '../types'

export const meta = {
  id: 'sparkles-text',
  title: 'Sparkles text',
  category: 'Motion',
  description: 'Small four-point stars blink on and off around a highlighted phrase. A light touch of celebration for a launch, an offer or a new feature.',
  source: ['Web: Magic UI sparkles text', 'Web: Josh Comeau sparkles'],
  tags: ['text', 'sparkle', 'highlight', 'celebrate'],
  notes: ['Stars sit at fixed spots and are staggered with animation delays, so nothing is re-rendered.', 'Stars are hidden for reduced motion.'],
} as const

// Fixed positions (percent) so the pattern is the same on every render.
const stars = [
  { x: -4, y: 8, s: 18, d: 0, c: 'var(--color-spark)' }, { x: 14, y: -22, s: 12, d: 0.6, c: 'var(--color-brand)' },
  { x: 38, y: 96, s: 14, d: 1.1, c: 'var(--color-spark)' }, { x: 56, y: -18, s: 16, d: 0.3, c: 'var(--color-brand)' },
  { x: 74, y: 88, s: 11, d: 1.5, c: 'var(--color-brand)' }, { x: 92, y: -8, s: 15, d: 0.9, c: 'var(--color-spark)' },
  { x: 101, y: 62, s: 12, d: 1.9, c: 'var(--color-spark)' }, { x: 24, y: 104, s: 10, d: 2.2, c: 'var(--color-brand)' },
]

export default function SparklesText({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <style>{`@keyframes kc-twinkle{0%,100%{transform:scale(0) rotate(0deg);opacity:0}50%{transform:scale(1) rotate(90deg);opacity:1}}
      @media (prefers-reduced-motion:reduce){.kc-star{display:none}}`}</style>
      <div>
        <p className="text-sm font-medium text-muted">Now in public beta</p>
        <h2 className={`mt-2 font-display font-bold tracking-tight text-ink ${m ? 'text-4xl' : 'text-6xl'}`}>
          Meet{' '}
          <span className="relative inline-block text-brand">
            Autopilot
            {stars.map((st, i) => (
              <svg key={i} aria-hidden viewBox="0 0 24 24" width={st.s} height={st.s} className="kc-star pointer-events-none absolute"
                style={{ left: `${st.x}%`, top: `${st.y}%`, animation: `kc-twinkle 2.4s ease-in-out ${st.d}s infinite`, transformOrigin: 'center', opacity: 0 }}>
                <path fill={st.c} d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.600 11.4 11.4 6.6 12 0Z" />
              </svg>
            ))}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">It drafts, files and follows up, so the busywork stops landing on you.</p>
      </div>
    </div>
  )
}
