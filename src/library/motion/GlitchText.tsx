import type { Device } from '../types'

export const meta = {
  id: 'glitch-text',
  title: 'Glitch text',
  category: 'Motion',
  description: 'A headline that splits into offset cyan and magenta copies in short, irregular bursts, like a failing signal. For gaming, security, music and anything deliberately edgy.',
  source: ['Web: React Bits glitch text', 'Web: cyberpunk UI trend'],
  tags: ['text', 'glitch', 'rgb-split', 'cyberpunk'],
  notes: ['The two coloured copies are pseudo-elements that read the text from a data attribute, so the real text appears once in the page.', 'Always dark. The bursts stop for reduced motion.'],
} as const

export default function GlitchText({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-[#07070c] px-6 text-center">
      <style>{`.kc-glitch{position:relative;display:inline-block}
      .kc-glitch::before,.kc-glitch::after{content:attr(data-text);position:absolute;inset:0;overflow:hidden}
      .kc-glitch::before{color:#22e6ff;animation:kc-glitch-a 3.2s steps(1) infinite}
      .kc-glitch::after{color:#ff2bd6;animation:kc-glitch-b 3.2s steps(1) infinite}
      @keyframes kc-glitch-a{0%,100%{clip-path:inset(0 0 100% 0);transform:none}8%{clip-path:inset(12% 0 62% 0);transform:translate(-5px,-2px)}11%{clip-path:inset(58% 0 18% 0);transform:translate(4px,1px)}14%{clip-path:inset(0 0 100% 0)}52%{clip-path:inset(34% 0 44% 0);transform:translate(-6px,2px)}55%{clip-path:inset(76% 0 6% 0);transform:translate(3px,-1px)}58%{clip-path:inset(0 0 100% 0)}}
      @keyframes kc-glitch-b{0%,100%{clip-path:inset(0 0 100% 0);transform:none}9%{clip-path:inset(44% 0 30% 0);transform:translate(5px,2px)}12%{clip-path:inset(6% 0 78% 0);transform:translate(-4px,-1px)}15%{clip-path:inset(0 0 100% 0)}53%{clip-path:inset(64% 0 14% 0);transform:translate(6px,-2px)}56%{clip-path:inset(20% 0 60% 0);transform:translate(-3px,1px)}59%{clip-path:inset(0 0 100% 0)}}
      @media (prefers-reduced-motion:reduce){.kc-glitch::before,.kc-glitch::after{display:none}}`}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)' }} />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#22e6ff]">Signal lost</p>
        <h2 className={`kc-glitch mt-3 font-display font-extrabold uppercase tracking-tight text-white ${m ? 'text-5xl' : 'text-7xl'}`} data-text="Override">Override</h2>
        <p className="mt-4 font-mono text-xs text-white/50">Season two drops 11.08</p>
      </div>
    </div>
  )
}
