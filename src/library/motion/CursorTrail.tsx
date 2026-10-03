import { useEffect, useRef } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'cursor-trail',
  title: 'Cursor trail',
  category: 'Motion',
  description: 'A ribbon of fading dots chases the pointer, each one lagging a little behind the last. Adds a sense of touch to a hero or a portfolio landing page.',
  source: ['Web: React Bits splash and blob cursors', 'Web: Awwwards cursor-follower trend'],
  tags: ['cursor', 'trail', 'pointer', 'canvas'],
  notes: ['Drawn on a canvas with one animation frame loop; the loop stops when the demo leaves the screen.', 'Follows a finger on touch screens and draws a slow figure-eight when nobody is pointing.'],
} as const

const DOTS = 22

export default function CursorTrail({ device }: { device: Device }) {
  const m = device === 'mobile'
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const brand = getComputedStyle(el).getPropertyValue('--brand').trim() || '#3b3bf5'
    const spark = getComputedStyle(el).getPropertyValue('--spark').trim() || '#ffb020'
    const dots = Array.from({ length: DOTS }, () => ({ x: el.clientWidth / 2, y: el.clientHeight / 2 }))
    const target = { x: el.clientWidth / 2, y: el.clientHeight / 2 }
    let pointing = false
    let frame = 0
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      // The preview frame is scaled with CSS, so convert from screen pixels back to canvas pixels.
      target.x = ((e.clientX - r.left) / r.width) * el.clientWidth
      target.y = ((e.clientY - r.top) / r.height) * el.clientHeight
      pointing = true
    }
    const leave = () => { pointing = false }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    const draw = (now: number) => {
      const w = el.clientWidth, h = el.clientHeight
      if (el.width !== w || el.height !== h) { el.width = w; el.height = h }
      if (!pointing) {
        const t = now / 1000
        target.x = w / 2 + Math.sin(t * 1.1) * w * 0.3
        target.y = h / 2 + Math.sin(t * 2.2) * h * 0.22
      }
      ctx.clearRect(0, 0, w, h)
      let lead = target
      dots.forEach((d, i) => {
        d.x += (lead.x - d.x) * 0.34
        d.y += (lead.y - d.y) * 0.34
        lead = d
        const k = 1 - i / DOTS
        ctx.beginPath()
        ctx.arc(d.x, d.y, 3 + k * 13, 0, Math.PI * 2)
        ctx.fillStyle = i % 5 === 0 ? spark : brand
        ctx.globalAlpha = k * 0.55
        ctx.fill()
      })
      ctx.globalAlpha = 1
      if (!still) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" style={{ touchAction: 'pan-y' }} />
      <div className="pointer-events-none relative grid h-full place-items-center px-6 text-center">
        <div>
          <h2 className={`font-display font-bold tracking-tight text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Move around.</h2>
          <p className="mt-2 text-sm text-muted">{m ? 'Drag a finger across the screen.' : 'The trail follows your pointer.'}</p>
        </div>
      </div>
    </div>
  )
}
