import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import type { Device } from '../library/types'

const SIZE = { laptop: { w: 1100, h: 640 }, mobile: { w: 375, h: 760 } }

/** Renders children at a true device width, scaled down to fit the available space. */
export function Frame({ device, children, maxHeight, thumb }: { device: Device; children: ReactNode; maxHeight?: number; thumb?: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const { w, h } = thumb ? { w: 520, h: 325 } : SIZE[device]
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => {
      let s = el.clientWidth / w
      if (maxHeight) s = Math.min(s, maxHeight / h)
      setScale(thumb ? s : Math.min(s, 1))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, h, maxHeight, thumb])

  return (
    <div ref={box} className="flex w-full justify-center">
      <div style={{ width: w * scale, height: h * scale }} className="relative shrink-0">
        <div
          style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          className={`@container absolute left-0 top-0 overflow-hidden bg-bg text-ink ${device === 'mobile' ? 'rounded-[44px] border-[10px] border-[#0b0d1a] ring-1 ring-white/25 shadow-2xl' : (thumb ? '' : 'rounded-xl border border-line shadow-xl')}`}
        >
          {device === 'mobile' && <div className="absolute left-1/2 top-2 z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />}
          <div className={`relative h-full w-full ${thumb ? "overflow-hidden" : "overflow-auto"} ${device === "mobile" ? "pt-9" : ""}`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

/**
 * Click handler that makes a whole gallery card open its page, live preview included.
 * The demo inside may contain its own links (often href="#"), so their default is cancelled;
 * the card's real link is left alone so open-in-new-tab and keyboard use still work.
 */
export function openOnClick(href: string) {
  return (e: MouseEvent) => {
    if ((e.target as Element).closest('a')?.getAttribute('href') === href) return
    e.preventDefault()
    location.hash = href
  }
}

/** Mounts children only while near the viewport, so off-screen demos stop their timers and animations. */
export function Lazy({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={className}>{seen ? children : null}</div>
}
