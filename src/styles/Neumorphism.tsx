import { useEffect, useRef, useState } from 'react'
import { Lightbulb, Thermometer, Lock, Wifi, Tv, Power } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'neumorphism',
  title: 'Neumorphism',
  family: 'Soft surfaces',
  era: 'Peaked 2020 (Dribbble "Soft UI" wave)',
  idea: 'Smart-home control panel',
  description: 'Elements look extruded from, or pressed into, a single mid-tone surface using paired light and dark shadows. It feels tactile and calm, like moulded plastic.',
  traits: ['one background colour for everything', 'dual light + dark shadows', 'raised vs inset states', 'large soft radii', 'low-contrast, no hard borders'],
  palette: [
    { name: 'Surface', hex: '#e0e5ec' },
    { name: 'Light shadow', hex: '#ffffff' },
    { name: 'Dark shadow', hex: '#a3b1c6' },
    { name: 'Ink', hex: '#44506a' },
    { name: 'Accent', hex: '#6c8cff' },
  ],
  fonts: 'Nunito + Space Grotesk',
  useFor: ['Smart-home and device controls', 'Calculators and music knobs', 'Minimal settings panels'],
  avoid: ['Accessibility-critical flows (low contrast)', 'Content-heavy pages', 'Unclear affordances on forms'],
  signature: `background: #e0e5ec;
border-radius: 24px;
/* raised */
box-shadow: 9px 9px 16px #a3b1c6,
            -9px -9px 16px #ffffff;
/* pressed */
box-shadow: inset 6px 6px 10px #a3b1c6,
            inset -6px -6px 10px #ffffff;`,
} as const satisfies StyleMeta

const raised = '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff'
const inset = 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff'
const ink = '#44506a'

export default function Neumorphism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [on, setOn] = useState([true, false, true, true])
  const [temp, setTemp] = useState(22)
  const [bright, setBright] = useState(60)
  const idle = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const t = setInterval(() => {
      if (!idle.current) return
      i++
      setTemp(20 + (i % 7))
      setBright(30 + ((i * 17) % 60))
      setOn((o) => o.map((v, k) => (k === i % 4 ? !v : v)))
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const devices = [
    { n: 'Living lights', I: Lightbulb }, { n: 'Front door', I: Lock },
    { n: 'Wi-Fi mesh', I: Wifi }, { n: 'Television', I: Tv },
  ]
  const angle = -135 + ((temp - 16) / 16) * 270

  return (
    <div onPointerDown={() => (idle.current = false)} onKeyDown={() => (idle.current = false)}
      className="h-full w-full overflow-auto" style={{ background: '#e0e5ec', color: ink, fontFamily: "'Nunito', sans-serif" }}>
      <div className={`mx-auto flex min-h-full flex-col gap-7 ${m ? 'p-5' : 'max-w-[1000px] p-9'}`}>
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold opacity-60">Good evening, Maya</p>
            <h1 className={`font-extrabold ${m ? 'text-2xl' : 'text-4xl'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Home Control</h1>
          </div>
          <button aria-label="Power all off" onClick={() => setOn([false, false, false, false])}
            className="grid h-12 w-12 place-items-center rounded-full transition-shadow"
            style={{ boxShadow: raised }} onMouseDown={(e) => (e.currentTarget.style.boxShadow = inset)}
            onMouseUp={(e) => (e.currentTarget.style.boxShadow = raised)} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = raised)}>
            <Power size={18} color="#6c8cff" />
          </button>
        </header>

        <div className={m ? 'flex flex-col gap-7' : 'grid grid-cols-[1fr_1.3fr] gap-9'}>
          <section className="flex flex-col items-center gap-4 rounded-[32px] p-6" style={{ boxShadow: raised }}>
            <h2 className="flex items-center gap-2 font-bold"><Thermometer size={16} /> Thermostat</h2>
            <div className="relative grid h-44 w-44 place-items-center rounded-full" style={{ boxShadow: raised }}>
              <div className="absolute inset-4 grid place-items-center rounded-full" style={{ boxShadow: inset }}>
                <span className="text-4xl font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{temp}°</span>
              </div>
              <span className="absolute h-full w-2 transition-transform duration-500" style={{ transform: `rotate(${angle}deg)` }}>
                <span className="mx-auto block h-3 w-3 rounded-full bg-[#6c8cff]" style={{ boxShadow: '0 0 8px #6c8cff' }} />
              </span>
            </div>
            <input aria-label="Temperature" type="range" min={16} max={32} value={temp} onChange={(e) => setTemp(+e.target.value)} className="w-full accent-[#6c8cff]" />
          </section>

          <section className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              {devices.map(({ n, I }, i) => (
                <div key={n} className="flex flex-col gap-4 rounded-3xl p-5 transition-shadow" style={{ boxShadow: on[i] ? raised : inset }}>
                  <I size={22} color={on[i] ? '#6c8cff' : ink} style={{ opacity: on[i] ? 1 : 0.5 }} />
                  <span className="text-sm font-bold">{n}</span>
                  <button role="switch" aria-checked={on[i]} aria-label={n} onClick={() => setOn(on.map((v, k) => (k === i ? !v : v)))}
                    className="relative h-8 w-16 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6c8cff]" style={{ boxShadow: inset }}>
                    <span className="absolute top-1 h-6 w-6 rounded-full transition-all duration-300"
                      style={{ left: on[i] ? 36 : 4, background: on[i] ? '#6c8cff' : '#e0e5ec', boxShadow: on[i] ? '0 0 10px #6c8cff88' : '3px 3px 6px #a3b1c6, -3px -3px 6px #fff' }} />
                  </button>
                </div>
              ))}
            </div>
            <div className="rounded-3xl p-5" style={{ boxShadow: raised }}>
              <div className="mb-3 flex justify-between text-sm font-bold"><span>Brightness</span><span>{bright}%</span></div>
              <div className="relative h-4 rounded-full" style={{ boxShadow: inset }}>
                <div className="h-full rounded-full bg-[#6c8cff] transition-all duration-500" style={{ width: `${bright}%` }} />
                <input aria-label="Brightness" type="range" min={0} max={100} value={bright} onChange={(e) => setBright(+e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
