import type { Device } from '../types'

export const meta = {
  id: 'noise-gradient-mesh',
  title: 'Noise gradient mesh',
  category: 'Backgrounds',
  description: 'Overlapping blurred color blobs with an SVG grain overlay for a tactile, editorial gradient.',
  source: ['Web: grainy gradient trend', '04-broomin'],
  tags: ['gradient', 'grain', 'mesh'],
  notes: ['Grain comes from an inline SVG turbulence filter, no image asset.'],
} as const

export default function NoiseGradientMesh({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <div aria-hidden className="absolute -left-10 -top-10 h-3/4 w-3/4 rounded-full bg-brand opacity-60 blur-3xl" style={{ animation: 'kc-float 9s ease-in-out infinite' }} />
      <div aria-hidden className="absolute -bottom-12 -right-8 h-3/4 w-2/3 rounded-full bg-spark opacity-50 blur-3xl" style={{ animation: 'kc-float 11s ease-in-out infinite' }} />
      <div aria-hidden className="absolute left-1/3 top-1/3 h-1/2 w-1/2 rounded-full bg-brand-soft opacity-70 blur-3xl" />
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay">
        <filter id="kc-noise"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#kc-noise)" />
      </svg>
      <div className="relative grid h-full place-items-center px-6 text-center">
        <h2 className={`font-display font-semibold text-ink ${m ? 'text-4xl' : 'text-6xl'}`}>Texture<br />with depth</h2>
      </div>
    </div>
  )
}
