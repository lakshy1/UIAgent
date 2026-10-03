import type { Device } from '../types'

export const meta = {
  id: 'background-beams',
  title: 'Background beams',
  category: 'Backgrounds',
  description: 'Curved SVG paths with traveling light pulses fanning out behind centered content.',
  source: ['Web: Aceternity background beams', '22-Kubeshift'],
  tags: ['svg', 'beams', 'hero'],
  notes: ['SVG is aria-hidden; pulses pause for reduced motion.'],
} as const

export default function BackgroundBeams({ device }: { device: Device }) {
  const m = device === 'mobile'
  const paths = Array.from({ length: m ? 8 : 14 }, (_, i) => {
    const x = -40 + i * 38
    return `M${x} -20 C ${x + 120} 120, ${x + 260} 200, ${x + 520} 380`
  })
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <style>{`@keyframes kc-beam{from{stroke-dashoffset:520}to{stroke-dashoffset:-520}}
      @media (prefers-reduced-motion:reduce){.kc-beam{animation:none!important}}`}</style>
      <svg aria-hidden viewBox="0 0 520 325" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {paths.map((d, i) => (
          <g key={i} fill="none" strokeWidth="1">
            <path d={d} stroke="var(--color-line)" />
            <path d={d} className="kc-beam" stroke="var(--color-brand)" strokeDasharray="60 460"
              style={{ animation: `kc-beam ${6 + (i % 5)}s linear ${-i * 0.9}s infinite` }} />
          </g>
        ))}
      </svg>
      <div className="relative grid h-full place-items-center px-6 text-center">
        <h2 className={`font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Every path<br />leads here</h2>
      </div>
    </div>
  )
}
