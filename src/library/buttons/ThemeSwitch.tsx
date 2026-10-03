import { useEffect, useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'theme-switch',
  title: 'Day and night switch',
  category: 'Buttons',
  description: 'A light and dark toggle where the sun slides across and becomes a moon, clouds drift out and stars come in. Turns a routine setting into a small moment of delight.',
  source: ['Web: animated theme toggle trend', '05-Kanthast'],
  tags: ['toggle', 'theme', 'dark-mode', 'switch'],
  notes: ['A real switch: role="switch" with aria-checked, operable with Space and Enter.', 'The preview panel behind it changes too, so the effect of the setting is visible.'],
} as const

const stars = [[18, 22, 3], [30, 58, 2], [44, 30, 2.5], [24, 74, 2], [52, 62, 2]]

export default function ThemeSwitch({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [night, setNight] = useState(false)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => { if (!stop.current) setNight(n => !n) }, 2600)
    return () => clearInterval(t)
  }, [])
  const w = m ? 150 : 180, h = m ? 66 : 78, knob = h - 14
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }}
      className="grid h-full w-full place-items-center p-6 transition-colors duration-700" style={{ background: night ? '#0b1026' : '#e8f1ff' }}>
      <div className="text-center">
        <button role="switch" aria-checked={night} aria-label="Dark mode" onClick={() => setNight(n => !n)}
          className="relative overflow-hidden rounded-full shadow-[inset_0_3px_10px_rgb(0_0_0/.25)] transition-colors duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          style={{ width: w, height: h, background: night ? 'linear-gradient(#1b2452, #0d1330)' : 'linear-gradient(#5aa9ff, #a8d4ff)' }}>
          {stars.map(([x, y, s], i) => (
            <span key={i} aria-hidden className="absolute rounded-full bg-white transition-all duration-700" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, opacity: night ? 1 : 0, transform: night ? 'none' : 'translateY(10px)', transitionDelay: `${i * 50}ms` }} />
          ))}
          {[0, 1].map(i => (
            <span key={i} aria-hidden className="absolute rounded-full bg-white/90 transition-all duration-700" style={{ right: `${8 + i * 22}%`, bottom: i ? '-18%' : '-30%', width: h * (0.7 - i * 0.2), height: h * (0.7 - i * 0.2), opacity: night ? 0 : 1, transform: night ? 'translateY(26px)' : 'none' }} />
          ))}
          <span aria-hidden className="absolute top-[7px] rounded-full transition-all duration-700 ease-[cubic-bezier(.6,-0.3,.3,1.3)]"
            style={{ left: night ? w - knob - 7 : 7, width: knob, height: knob, background: night ? '#e8ecf7' : '#ffd23f', boxShadow: night ? '0 0 22px 4px rgb(200 210 255 / .45), inset -6px -4px 0 #c5cbe0' : '0 0 26px 8px rgb(255 210 63 / .6)' }}>
            {[[26, 30, 9], [56, 54, 13], [30, 64, 7]].map(([x, y, s], i) => (
              <span key={i} className="absolute rounded-full bg-[#b3bad3] transition-opacity duration-500" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, opacity: night ? 1 : 0 }} />
            ))}
          </span>
        </button>
        <p className="mt-5 font-display text-lg font-bold transition-colors duration-700" style={{ color: night ? '#e8ecf7' : '#0e1330' }}>{night ? 'Good night' : 'Good morning'}</p>
        <p className="text-sm transition-colors duration-700" style={{ color: night ? '#8f98c0' : '#5b6285' }}>Appearance follows this switch.</p>
      </div>
    </div>
  )
}
