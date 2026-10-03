import { useEffect, useRef, useState } from 'react'
import { Calendar, CheckCircle2, ListTodo, Plus, Settings, Circle } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'material-you',
  title: 'Material You',
  family: 'Modern',
  era: 'Popular since 2021 (Material 3, Android 12+)',
  idea: 'Task and calendar app',
  description: 'Tonal surfaces generated from one seed color, very large rounded shapes and visible state layers on every control. It feels friendly, personal and systematically consistent.',
  traits: ['Tonal palette derived from a teal seed', 'Large corner radii (16 to 28px, pills for nav)', 'State layers: 8% hover, 12% press overlays', 'Extended FAB with tonal container', 'Navigation rail on large screens, bar on mobile', 'Elevation by tint, not heavy shadow'],
  palette: [
    { name: 'Surface', hex: '#f4fbf8' },
    { name: 'Primary', hex: '#00696b' },
    { name: 'Primary container', hex: '#9cf1f2' },
    { name: 'Secondary container', hex: '#cce8e7' },
    { name: 'Surface container', hex: '#e3eeec' },
    { name: 'On surface', hex: '#161d1d' },
  ],
  fonts: 'Instrument Sans + Inter',
  useFor: ['Productivity and planner apps', 'Android-first products', 'Settings-heavy or form-heavy tools'],
  avoid: ['Brands needing a distinct, edgy identity', 'Print-like editorial layouts', 'Tiny dense data tables'],
  signature: `--md-primary: #00696b;
--md-primary-container: #9cf1f2;
border-radius: 28px;
background: var(--md-primary-container);
/* state layer */
.btn::after { background: currentColor; opacity: 0; }
.btn:hover::after { opacity: .08; }
.btn:active::after { opacity: .12; }`,
} as const satisfies StyleMeta

const F = "'Instrument Sans', 'Inter', sans-serif"
const P = '#00696b', PC = '#9cf1f2', SC = '#cce8e7', SF = '#e3eeec', S = '#f4fbf8', ON = '#161d1d'

const init = [
  { t: 'Review sprint board', d: '9:30 AM', done: true },
  { t: 'Book dentist appointment', d: '11:00 AM', done: false },
  { t: 'Draft Q3 roadmap', d: '2:00 PM', done: false },
  { t: 'Pick up groceries', d: '6:15 PM', done: false },
]

function Layer({ children, className = '', style, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest} style={style} className={`m3 relative overflow-hidden outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00696b] ${className}`}>{children}</button>
}

export default function Material3({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [tasks, setTasks] = useState(init)
  const [tab, setTab] = useState(0)
  const [day, setDay] = useState(2)
  const touched = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 1
    const t = setInterval(() => {
      if (touched.current) return
      setTasks((ts) => ts.map((x, i) => (i === k % 4 ? { ...x, done: !x.done } : x)))
      setDay((d) => (d + 1) % 7)
      k++
    }, 1800)
    return () => clearInterval(t)
  }, [])
  const flip = (i: number) => { touched.current = true; setTasks((ts) => ts.map((x, j) => (j === i ? { ...x, done: !x.done } : x))) }
  const nav = [{ I: ListTodo, l: 'Tasks' }, { I: Calendar, l: 'Calendar' }, { I: Settings, l: 'Settings' }]
  const left = tasks.filter((x) => !x.done).length

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: S, color: ON, fontFamily: F }}>
      <style>{`.m3::after{content:'';position:absolute;inset:0;background:currentColor;opacity:0;transition:opacity .15s;pointer-events:none}.m3:hover::after{opacity:.08}.m3:focus-visible::after{opacity:.12}.m3:active::after{opacity:.16}`}</style>
      <div className={`flex h-full ${m ? 'flex-col' : ''}`}>
        {!m && (
          <nav aria-label="Primary" className="flex w-20 flex-col items-center gap-3 py-6" style={{ background: S }}>
            <Layer aria-label="New task" className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: PC, color: '#002020' }}><Plus size={24} /></Layer>
            {nav.map(({ I, l }, i) => (
              <Layer key={l} onClick={() => { touched.current = true; setTab(i) }} aria-current={tab === i} className="flex w-full flex-col items-center gap-1 bg-transparent py-1 text-xs font-medium">
                <span className="flex h-8 w-14 items-center justify-center rounded-full" style={{ background: tab === i ? SC : 'transparent' }}><I size={20} /></span>{l}
              </Layer>
            ))}
          </nav>
        )}
        <main className="min-h-0 flex-1 overflow-auto">
          <div className={`mx-auto ${m ? 'p-4' : 'max-w-5xl p-8'}`}>
            <p className="text-sm font-medium" style={{ color: P }}>Thursday, 2 October</p>
            <h1 className={`font-semibold ${m ? 'text-3xl' : 'text-5xl'}`}>Good morning, Mira</h1>
            <p className="mt-1 opacity-70">{left} tasks left today</p>
            <div className={`mt-5 grid gap-4 ${m ? '' : 'grid-cols-5'}`}>
              <section className={`rounded-[28px] p-4 ${m ? '' : 'col-span-3'}`} style={{ background: SF }} aria-label="Today's tasks">
                <h2 className="mb-2 px-2 text-lg font-semibold">Today</h2>
                {tasks.map((x, i) => (
                  <Layer key={x.t} onClick={() => flip(i)} role="checkbox" aria-checked={x.done} className="flex w-full items-center gap-3 rounded-2xl bg-transparent p-3 text-left">
                    {x.done ? <CheckCircle2 size={24} color={P} /> : <Circle size={24} />}
                    <span className="flex-1"><span className={`block font-medium ${x.done ? 'line-through opacity-50' : ''}`}>{x.t}</span><span className="text-xs opacity-60">{x.d}</span></span>
                  </Layer>
                ))}
              </section>
              <section className={`rounded-[28px] p-5 ${m ? '' : 'col-span-2'}`} style={{ background: SC }} aria-label="Week">
                <h2 className="mb-3 text-lg font-semibold">This week</h2>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <Layer key={i} onClick={() => { touched.current = true; setDay(i) }} aria-pressed={day === i} className="rounded-full bg-transparent py-1.5 font-medium" style={day === i ? { background: P, color: '#fff' } : undefined}>
                      <span className="block opacity-70">{d}</span><span className="block text-base">{29 + i > 31 ? i - 2 : 29 + i}</span>
                    </Layer>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl p-4" style={{ background: PC, color: '#002020' }}>
                  <p className="text-xs font-medium opacity-70">Up next</p>
                  <p className="font-semibold">Design sync</p><p className="text-sm">3:30 to 4:15 PM</p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Layer aria-label="Add task" className={`absolute z-10 flex items-center gap-3 rounded-[20px] px-5 py-4 font-semibold shadow-lg ${m ? 'bottom-24 right-4' : 'bottom-8 right-8'}`} style={{ background: PC, color: '#002020' }}><Plus size={22} />{m ? '' : 'New task'}</Layer>
        {m && (
          <nav aria-label="Primary" className="flex shrink-0 justify-around py-3" style={{ background: SF }}>
            {nav.map(({ I, l }, i) => (
              <Layer key={l} onClick={() => { touched.current = true; setTab(i) }} aria-current={tab === i} className="flex w-24 flex-col items-center gap-1 bg-transparent text-xs font-medium">
                <span className="flex h-8 w-16 items-center justify-center rounded-full" style={{ background: tab === i ? SC : 'transparent' }}><I size={20} /></span>{l}
              </Layer>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
