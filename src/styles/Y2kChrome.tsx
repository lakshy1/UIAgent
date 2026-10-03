import { useEffect, useRef, useState } from 'react'
import { Heart, Menu, ShoppingBag } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'y2k-chrome',
  title: 'Y2K Chrome',
  family: 'Retro',
  era: 'Late 1990s to 2004, revived 2021+ (iMac G3, Bratz, Frutiger Aero)',
  idea: 'Early-2000s tech and fashion brand site',
  description: 'Liquid metal gradients, glossy bubble buttons and four-point sparkles in baby blue, silver and hot pink. It feels optimistic, shiny and a little futuristic, like a pop-star flip phone.',
  traits: ['Chrome linear gradients with hard highlights', 'Glossy pill buttons with a top-half sheen', 'Four-point star and sparkle SVGs', 'Baby blue, silver and hot pink only', 'Heavy rounded geometric type', 'Inset bevels and soft outer glow'],
  palette: [
    { name: 'Baby blue', hex: '#bfe3ff' },
    { name: 'Silver', hex: '#d9dde6' },
    { name: 'Hot pink', hex: '#ff2e93' },
    { name: 'Ink navy', hex: '#23284a' },
    { name: 'Chrome shade', hex: '#8f9bb3' },
    { name: 'White', hex: '#ffffff' },
  ],
  fonts: 'Syne',
  useFor: ['Fashion and streetwear drops', 'Pop-culture and music merch', 'Nostalgic consumer gadgets'],
  avoid: ['Dense dashboards or data tools', 'Serious finance or healthcare', 'Long reading content, since chrome text hurts legibility'],
  signature: `background: linear-gradient(180deg,#fff 0%,#d9dde6 45%,#8f9bb3 52%,#e9edf5 100%);
border-radius: 999px;
border: 2px solid #fff;
box-shadow: inset 0 -6px 10px rgba(35,40,74,.25),
  0 6px 18px rgba(255,46,147,.35);
/* gloss: top half sheen */
::before { inset: 3px 8% 50%; border-radius: 999px;
  background: linear-gradient(#fff, rgba(255,255,255,0)); }`,
} as const satisfies StyleMeta

const F = "'Syne', sans-serif"
const chrome = 'linear-gradient(180deg,#ffffff 0%,#d9dde6 45%,#8f9bb3 52%,#eef1f8 100%)'

function Star({ s = 28, c = '#fff', style }: { s?: number; c?: string; style?: React.CSSProperties }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" fill={c} stroke="#8f9bb3" strokeWidth=".6" />
    </svg>
  )
}

function Bubble({ children, pink, onClick }: { children: React.ReactNode; pink?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="y2k-b relative overflow-hidden rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wider outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-[#23284a]"
      style={{ fontFamily: F, background: pink ? 'linear-gradient(180deg,#ff8cc4 0%,#ff2e93 50%,#d4106f 100%)' : chrome, color: pink ? '#fff' : '#23284a', border: '2px solid #fff', boxShadow: `inset 0 -6px 10px rgba(35,40,74,.25), 0 6px 18px ${pink ? 'rgba(255,46,147,.4)' : 'rgba(143,155,179,.5)'}` }}>
      <span aria-hidden className="absolute rounded-full" style={{ inset: '3px 8% 50%', background: 'linear-gradient(#fff, rgba(255,255,255,0))', opacity: 0.8 }} />
      <span className="relative">{children}</span>
    </button>
  )
}

const drops = [
  { name: 'Orbit Baby Tee', price: '$38', c: '#bfe3ff' },
  { name: 'Liquid Zip Jacket', price: '$124', c: '#d9dde6' },
  { name: 'Bubble Mini Bag', price: '$64', c: '#ff8cc4' },
]

export default function Y2kChrome({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [sel, setSel] = useState(0)
  const [liked, setLiked] = useState<number[]>([])
  const touched = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => { if (!touched.current) setSel((s) => (s + 1) % 3) }, 2200)
    return () => clearInterval(t)
  }, [])
  const pick = (i: number) => { touched.current = true; setSel(i) }
  const like = (i: number) => { touched.current = true; setLiked((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i])) }

  return (
    <div className="relative h-full w-full overflow-auto" style={{ fontFamily: F, color: '#23284a', background: 'radial-gradient(circle at 20% 10%,#ffffff 0,#bfe3ff 38%,#9fc9f5 100%)' }}>
      <style>{`@keyframes y2k-tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.3) rotate(25deg)}}@keyframes y2k-fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@media(prefers-reduced-motion:reduce){.y2k-a{animation:none!important}}`}</style>
      <Star s={m ? 40 : 70} style={{ position: 'absolute', top: 70, right: m ? 12 : 90, animation: 'y2k-tw 3s ease-in-out infinite' }} />
      <Star s={26} c="#ff8cc4" style={{ position: 'absolute', top: m ? 300 : 360, left: m ? 14 : 60, animation: 'y2k-tw 2.4s ease-in-out infinite' }} />
      <nav className={`relative z-10 flex items-center justify-between ${m ? 'px-4 py-3' : 'px-12 py-5'}`}>
        <span className="text-2xl font-extrabold italic tracking-tight" style={{ background: chrome, WebkitBackgroundClip: 'text', color: 'transparent', WebkitTextStroke: '1px #23284a' }}>moxie*</span>
        {m ? <button aria-label="Menu" className="rounded-full p-2" style={{ background: chrome, border: '2px solid #fff' }}><Menu size={18} /></button> : (
          <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            {['Drops', 'Lookbook', 'Gadgets', 'Club'].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#ff2e93] focus-visible:underline">{l}</a>)}
            <ShoppingBag size={20} aria-label="Bag" />
          </div>
        )}
      </nav>
      <header className={`relative z-10 ${m ? 'px-4 pt-4 text-center' : 'grid grid-cols-2 items-center gap-6 px-12 pt-6'}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff2e93]">Spring 2003 collection</p>
          <h1 className={`font-extrabold italic leading-[0.95] ${m ? 'mt-2 text-5xl' : 'mt-3 text-7xl'}`} style={{ background: chrome, WebkitBackgroundClip: 'text', color: 'transparent', WebkitTextStroke: '2px #23284a', filter: 'drop-shadow(0 4px 0 #ff2e93)' }}>Shiny<br />new you</h1>
          <p className={`mt-4 font-semibold ${m ? 'text-sm' : 'max-w-sm text-base'}`}>Liquid-metal basics, glitter gadgets and clip-in everything. Free shipping on your first 3 drops.</p>
          <div className={`mt-5 flex gap-3 ${m ? 'justify-center' : ''}`}><Bubble pink>Shop drops</Bubble><Bubble>Lookbook</Bubble></div>
        </div>
        <div className={`y2k-a relative mx-auto ${m ? 'mt-6 h-44 w-44' : 'h-72 w-72'}`} style={{ animation: 'y2k-fl 4s ease-in-out infinite' }}>
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%,#fff 0,#d9dde6 25%,#8f9bb3 60%,#23284a 100%)', border: '3px solid #fff', boxShadow: '0 20px 50px rgba(35,40,74,.35), inset 0 -20px 40px rgba(255,46,147,.35)' }} />
          <Star s={m ? 60 : 110} c="#ff2e93" style={{ position: 'absolute', inset: 0, margin: 'auto' }} />
        </div>
      </header>
      <section className={`relative z-10 ${m ? 'px-4 py-8' : 'px-12 py-12'}`}>
        <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wide">This week's drops</h2>
        <div role="tablist" aria-label="Drops" className={`grid gap-4 ${m ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {drops.map((d, i) => (
            <div key={d.name} role="tab" tabIndex={0} aria-selected={sel === i} onClick={() => pick(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pick(i)}
              className="flex cursor-pointer items-center gap-4 rounded-[28px] p-4 outline-none transition-transform hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#23284a]"
              style={{ background: sel === i ? 'linear-gradient(180deg,#fff,#ffd6ea)' : 'linear-gradient(180deg,#fff,#e9edf5)', border: `2px solid ${sel === i ? '#ff2e93' : '#fff'}`, boxShadow: sel === i ? '0 10px 28px rgba(255,46,147,.35)' : '0 6px 16px rgba(35,40,74,.15)' }}>
              <div className="h-16 w-16 shrink-0 rounded-2xl" style={{ background: `linear-gradient(135deg,#fff,${d.c})`, border: '2px solid #fff', boxShadow: 'inset 0 -6px 10px rgba(35,40,74,.2)' }} />
              <div className="min-w-0 flex-1"><p className="truncate font-extrabold">{d.name}</p><p className="font-semibold text-[#ff2e93]">{d.price}</p></div>
              <button aria-label={`Like ${d.name}`} aria-pressed={liked.includes(i)} onClick={(e) => { e.stopPropagation(); like(i) }} className="rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-[#23284a]"><Heart size={20} fill={liked.includes(i) ? '#ff2e93' : 'none'} color={liked.includes(i) ? '#ff2e93' : '#23284a'} /></button>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[32px] p-6 text-center" style={{ background: 'linear-gradient(180deg,#ff8cc4,#ff2e93)', border: '3px solid #fff', color: '#fff', boxShadow: '0 12px 32px rgba(255,46,147,.4)' }}>
          <p className="text-xl font-extrabold uppercase">Join the moxie club</p>
          <p className="mb-4 text-sm font-semibold">Early access, ringtones and 15% off, forever.</p>
          <Bubble>Sign me up</Bubble>
        </div>
      </section>
    </div>
  )
}
