import type { Device } from '../types'

export const meta = {
  id: 'orbiting-dots',
  title: 'Orbiting dots',
  category: 'Motion',
  description: 'A core node with dots circling on concentric rings. Good for AI, sync or loading hero art.',
  source: ['33-clickwise'],
  tags: ['orbit', 'loader', 'hero-art'],
  notes: ['Pure CSS rotation, so it costs almost nothing.', 'Stops under prefers-reduced-motion.'],
} as const

const rings = [
  { size: 120, dur: 6, dots: 1, color: 'bg-brand' },
  { size: 200, dur: 10, dots: 2, color: 'bg-spark' },
  { size: 280, dur: 16, dots: 3, color: 'bg-ok' },
]

export default function OrbitingDots({ device }: { device: Device }) {
  const scale = device === 'mobile' ? 0.8 : 1.3
  return (
    <div className="relative grid h-full min-h-[420px] place-items-center overflow-hidden bg-bg">
      <style>{`@keyframes kc-orbit { to { transform: rotate(360deg); } }`}</style>
      <div className="relative" style={{ transform: `scale(${scale})` }} role="img" aria-label="Animated orbiting dots">
        <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/50" style={{ animation: 'kc-pulse-ring 2s infinite' }}>
          <span className="font-display text-lg font-bold">K</span>
        </div>
        {rings.map(r => (
          <div key={r.size} className="absolute left-1/2 top-1/2 rounded-full border border-line"
            style={{ width: r.size, height: r.size, marginLeft: -r.size / 2, marginTop: -r.size / 2, animation: `kc-orbit ${r.dur}s linear infinite` }}>
            {Array.from({ length: r.dots }).map((_, i) => (
              <span key={i} className={`absolute size-3 rounded-full ${r.color}`}
                style={{ left: '50%', top: -6, marginLeft: -6, transform: `rotate(${(360 / r.dots) * i}deg)`, transformOrigin: `6px ${r.size / 2 + 6}px` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
