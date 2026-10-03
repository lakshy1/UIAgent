import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, Command, Lock, Sparkles, Users, Zap } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'bento-grid',
  title: 'Bento grid',
  family: 'Modern',
  era: 'Mainstream since 2023 (Apple keynote slides, Linear, Vercel)',
  idea: 'Productivity app feature page',
  description: 'Features sit in rounded tiles of different sizes that lock together like a Japanese lunchbox. Each tile holds one idea with a small live illustration, so the page can be scanned in seconds.',
  traits: ['uneven tiles on one shared grid', 'identical radius and gap everywhere', 'one idea per tile', 'tiny product illustrations, not stock art', 'one or two accent tiles for rhythm', 'six to nine tiles, no more'],
  palette: [
    { name: 'Canvas', hex: '#f4f3ef' },
    { name: 'Tile', hex: '#ffffff' },
    { name: 'Ink', hex: '#15161a' },
    { name: 'Moss', hex: '#1f6f5c' },
    { name: 'Lime', hex: '#d7f26a' },
    { name: 'Stone', hex: '#8a8d93' },
  ],
  fonts: 'Instrument Sans + Bricolage Grotesque',
  useFor: ['Feature overviews on landing pages', 'Dashboards with mixed widgets', 'Portfolios and about pages'],
  avoid: ['More than nine tiles, which reads as a wall', 'Long paragraphs inside a tile', 'Mixing several corner radii or gaps'],
  signature: `display: grid;
grid-template-columns: repeat(6, 1fr);
grid-auto-rows: 132px;
gap: 14px;
/* each tile */
border-radius: 24px;
background: #fff;
border: 1px solid rgb(21 22 26 / .06);
/* sizes come from spans */
.wide { grid-column: span 4; }
.tall { grid-row: span 2; }`,
} as const satisfies StyleMeta

const tile = 'bg-a relative overflow-hidden rounded-3xl border border-black/[.06] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgb(21_22_26/.25)]'
const label = 'text-xs font-medium uppercase tracking-[0.14em] text-[#8a8d93]'
const bars = [34, 52, 44, 68, 60, 82, 74]

export default function BentoGrid({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [day, setDay] = useState(6)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setDay(d => (d + 1) % bars.length), 1500)
    return () => clearInterval(t)
  }, [auto])
  const span = (desktop: string) => (m ? '' : desktop)
  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="h-full w-full overflow-auto text-[#15161a]" style={{ background: '#f4f3ef', fontFamily: "'Instrument Sans', sans-serif" }}>
      <style>{`@keyframes bg-pop{from{opacity:0;transform:translateY(10px) scale(.98)}}@keyframes bg-blink{50%{opacity:.25}}@media (prefers-reduced-motion:reduce){.bg-a{animation:none!important;transition:none!important}}`}</style>
      <header className={`mx-auto flex max-w-5xl items-end justify-between gap-6 ${m ? 'px-4 pb-5 pt-8' : 'px-10 pb-7 pt-12'}`}>
        <div>
          <p className={label}>Everything in Slate</p>
          <h1 className={`mt-2 font-bold tracking-tight ${m ? 'text-3xl' : 'text-5xl'}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>One calm place<br />for the whole week.</h1>
        </div>
        {!m && <button className="inline-flex items-center gap-1.5 rounded-full bg-[#15161a] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c2e35]">Try it free <ArrowUpRight size={15} /></button>}
      </header>

      <main className={`mx-auto grid max-w-5xl gap-3.5 pb-12 ${m ? 'grid-cols-1 px-4' : 'grid-cols-6 px-10'}`} style={m ? undefined : { gridAutoRows: 132 }}>
        <section className={`${tile} ${span('col-span-4 row-span-2')}`} style={{ animation: 'bg-pop .5s ease-out both' }}>
          <p className={label}>Focus time</p>
          <p className="mt-1 text-3xl font-bold tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{(bars[day] / 10 + 1.4).toFixed(1)} h <span className="text-base font-medium text-[#1f6f5c]">this {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day]}</span></p>
          <div className={`mt-4 flex items-end gap-2 ${m ? 'h-28' : 'h-36'}`}>
            {bars.map((v, i) => (
              <button key={i} aria-label={`Day ${i + 1}`} onClick={() => setDay(i)} className="bg-a flex-1 rounded-xl transition-all duration-500" style={{ height: `${v}%`, background: i === day ? '#1f6f5c' : '#e7e6e1' }} />
            ))}
          </div>
        </section>

        <section className={`${tile} ${span('col-span-2')} !bg-[#d7f26a]`} style={{ animation: 'bg-pop .5s ease-out .06s both' }}>
          <Zap size={20} />
          <p className="mt-3 text-lg font-semibold leading-snug">Capture anything in under a second.</p>
        </section>

        <section className={`${tile} ${span('col-span-2')} flex items-center gap-3`} style={{ animation: 'bg-pop .5s ease-out .12s both' }}>
          <kbd className="inline-flex h-12 items-center gap-1 rounded-xl border border-black/10 bg-[#f4f3ef] px-3 text-sm font-semibold shadow-[0_2px_0_rgb(21_22_26/.12)]"><Command size={15} /> K</kbd>
          <p className="text-sm text-[#8a8d93]">Search and run every action from the keyboard.</p>
        </section>

        <section className={`${tile} ${span('col-span-2 row-span-2')} !bg-[#15161a] text-white`} style={{ animation: 'bg-pop .5s ease-out .18s both' }}>
          <Sparkles size={20} className="text-[#d7f26a]" />
          <p className="mt-3 text-lg font-semibold leading-snug">Your notes, summarised each morning.</p>
          <div className="mt-4 space-y-2">
            {[88, 64, 76].map((w, i) => <span key={i} className="bg-a block h-2.5 rounded-full bg-white/15" style={{ width: `${w}%`, animation: `bg-blink 2.4s ease-in-out ${i * 0.3}s infinite` }} />)}
          </div>
          {!m && <p className="absolute bottom-5 left-5 text-xs text-white/50">Runs on your device.</p>}
        </section>

        <section className={`${tile} ${span('col-span-2')}`} style={{ animation: 'bg-pop .5s ease-out .24s both' }}>
          <p className={label}>Shared with</p>
          <div className="mt-3 flex items-center">
            {['#1f6f5c', '#f08a5d', '#6a67ce', '#15161a'].map((c, i) => <span key={c} className="-ml-2 grid size-10 place-items-center rounded-full border-2 border-white text-xs font-semibold text-white first:ml-0" style={{ background: c }}>{['AM', 'IK', 'RD', '+9'][i]}</span>)}
            <Users size={16} className="ml-3 text-[#8a8d93]" />
          </div>
        </section>

        <section className={`${tile} ${span('col-span-2')} flex items-center gap-3`} style={{ animation: 'bg-pop .5s ease-out .3s both' }}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e9f3ef] text-[#1f6f5c]"><CalendarDays size={20} /></span>
          <div><p className="text-sm font-semibold">Design review</p><p className="text-xs text-[#8a8d93]">Today, 3:30 pm, 4 guests</p></div>
        </section>

        <section className={`${tile} ${span('col-span-4')} flex items-center gap-3`} style={{ animation: 'bg-pop .5s ease-out .36s both' }}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#f4f3ef]"><Lock size={18} /></span>
          <p className="text-sm text-[#8a8d93]"><span className="font-semibold text-[#15161a]">End-to-end encrypted.</span> Only you hold the key.</p>
        </section>
      </main>
    </div>
  )
}
