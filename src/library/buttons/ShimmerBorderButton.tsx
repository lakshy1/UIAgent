import { Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'shimmer-border-button',
  title: 'Shimmer border button',
  category: 'Buttons',
  description: 'A button with a rotating conic-gradient border and a sweeping shimmer highlight. Draws attention to one hero action.',
  source: ['Web: Magic UI pattern', '33-clickwise'],
  tags: ['cta', 'animated', 'border'],
  notes: ['Animation is disabled under prefers-reduced-motion.'],
} as const

export default function ShimmerBorderButton({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center p-6">
      <style>{`@keyframes sb-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes sb-sweep{to{transform:translateX(450%) skewX(-12deg)}}
      @media (prefers-reduced-motion:reduce){.sb-a{animation:none!important}}`}</style>
      <button className={`relative overflow-hidden rounded-full p-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${mobile ? 'h-14 w-full' : 'h-14 w-64'}`}>
        <span className="sb-a absolute left-1/2 top-1/2 aspect-square w-[150%]" style={{ transform: 'translate(-50%,-50%)', background: 'conic-gradient(from 0deg, transparent 0 60%, var(--color-brand) 85%, var(--color-spark) 100%)', animation: 'sb-spin 3s linear infinite' }} />
        <span className="relative flex h-full w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-surface text-sm font-medium text-ink">
          <span className="sb-a absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-brand/25 to-transparent" style={{ animation: 'sb-sweep 2.4s ease-in-out infinite' }} />
          <Sparkles size={16} className="text-brand" /> Start building free
        </span>
      </button>
    </div>
  )
}
