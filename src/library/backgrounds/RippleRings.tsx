import type { Device } from '../types'

export const meta = {
  id: 'ripple-rings',
  title: 'Ripple rings',
  category: 'Backgrounds',
  description: 'Concentric rings expand and fade from a central badge, like a sonar ping. Good behind a logo or CTA.',
  source: ['Web: Magic UI ripple', '19-ev-connect'],
  tags: ['ripple', 'rings', 'cta'],
  notes: ['Rings are static when reduced motion is requested.'],
} as const

export default function RippleRings({ device }: { device: Device }) {
  const m = device === 'mobile'
  const size = m ? 220 : 300
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-bg">
      <style>{`@keyframes kc-ripple{0%{transform:scale(.4);opacity:.7}100%{transform:scale(1.6);opacity:0}}
      @media (prefers-reduced-motion:reduce){.kc-rip{animation:none!important;opacity:.25}}`}</style>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} aria-hidden className="kc-rip absolute rounded-full border border-brand"
          style={{ width: size, height: size, animation: `kc-ripple 4s ease-out ${i}s infinite` }} />
      ))}
      <div className="relative text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand font-display text-2xl font-bold text-white">K</div>
        <p className="mt-3 font-display text-lg font-semibold text-ink">Listening for signals</p>
      </div>
    </div>
  )
}
