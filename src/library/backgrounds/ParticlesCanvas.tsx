import { useEffect, useRef } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'particles-canvas',
  title: 'Particle network',
  category: 'Backgrounds',
  description: 'Canvas particles drift and connect with thin lines when close; the pointer pushes them away.',
  source: ['Web: tsParticles / Magic UI particles', '24-Omnipane'],
  tags: ['canvas', 'particles', 'interactive'],
  notes: ['Draws a single static frame when reduced motion is on.', 'Cancels its animation frame on unmount.'],
} as const

export default function ParticlesCanvas({ device }: { device: Device }) {
  const wrap = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const m = device === 'mobile'
  useEffect(() => {
    const c = cv.current!, ctx = c.getContext('2d')!
    const w = c.width = wrap.current!.clientWidth, h = c.height = wrap.current!.clientHeight
    const color = getComputedStyle(c).color
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ps = Array.from({ length: m ? 36 : 70 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }))
    const mouse = { x: -999, y: -999 }
    c.onpointermove = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = color; ctx.strokeStyle = color
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy) || 1
        if (d < 90) { p.x += (dx / d) * 1.5; p.y += (dy / d) * 1.5 }
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h
        ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 7); ctx.fill()
      }
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y)
        if (d < 90) { ctx.globalAlpha = (1 - d / 90) * 0.35; ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke() }
      }
      if (!still) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [m])
  return (
    <div ref={wrap} className="relative h-full w-full overflow-hidden bg-bg">
      <canvas ref={cv} aria-hidden className="absolute inset-0 h-full w-full text-brand" />
      <div className="pointer-events-none relative grid h-full place-items-center px-6 text-center">
        <h2 className={`font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Everything<br />is connected</h2>
      </div>
    </div>
  )
}
