import { useEffect, useState } from 'react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'terminal-mono',
  title: 'Terminal mono',
  family: 'Bold and edgy',
  era: 'Timeless, back in fashion since 2022 (developer tools, AI labs, indie hackers)',
  idea: 'Open-source CLI tool homepage',
  description: 'The whole page is set in one monospace font on a near-black screen, with text-only boxes, ASCII dividers and a blinking cursor. It feels honest, technical and fast, like reading the tool itself.',
  traits: ['one monospace font, one or two sizes', 'near-black background, phosphor accent', 'borders made of 1px lines or ASCII', 'no images, no shadows, no radius', 'commands shown as you would type them', 'keyboard-first navigation hints'],
  palette: [
    { name: 'Screen', hex: '#0b0d0c' },
    { name: 'Panel', hex: '#121513' },
    { name: 'Phosphor', hex: '#3dff8b' },
    { name: 'Amber', hex: '#ffb347' },
    { name: 'Text', hex: '#c9d1c8' },
    { name: 'Dim', hex: '#8a938b' },
  ],
  fonts: 'JetBrains Mono',
  useFor: ['Developer tools, CLIs and API products', 'AI and research lab sites', 'Personal sites for engineers'],
  avoid: ['Consumer products for a general audience', 'Long marketing copy, which tires in monospace', 'Anything that needs photography to sell'],
  signature: `font-family: 'JetBrains Mono', monospace;
font-size: 14px;
line-height: 1.6;
background: #0b0d0c;
color: #c9d1c8;
border: 1px solid #2a302c;
border-radius: 0;
/* the accent is the only colour */
--accent: #3dff8b;`,
} as const satisfies StyleMeta

const mono = "'JetBrains Mono', ui-monospace, monospace"
const command = 'brew install driftctl'
const log = ['resolving formula…', 'downloading driftctl 2.4.1 (4.1 MB)', 'verifying checksum… ok', 'installed in 1.8s', '✓ run `drift init` to begin']
const features = [['01', 'zero config', 'Reads your repo and guesses right.'], ['02', 'single binary', 'No runtime, no daemon, 4 MB.'], ['03', 'pipe friendly', 'JSON out, exit codes that mean something.']]
const total = command.length + log.length * 5 + 24

export default function TerminalMono({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(total); return }
    if (!auto) return
    const t = setInterval(() => setStep(s => (s + 1) % total), 80)
    return () => clearInterval(t)
  }, [auto])
  const lines = Math.max(0, Math.floor((step - command.length - 3) / 5))
  const box = 'border border-[#2a302c] bg-[#121513]'
  return (
    <div onPointerDown={() => { setAuto(false); setStep(total) }} onKeyDown={() => { setAuto(false); setStep(total) }} className="h-full w-full overflow-auto text-[#c9d1c8]" style={{ background: '#0b0d0c', fontFamily: mono, fontSize: m ? 12 : 14, lineHeight: 1.6 }}>
      <style>{`@keyframes tm-blink{50%{opacity:0}}@media (prefers-reduced-motion:reduce){.tm-a{animation:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b border-[#2a302c] ${m ? 'px-4 py-3' : 'px-10 py-3'}`}>
        <span><span className="text-[#3dff8b]">~/</span>driftctl</span>
        <div className="flex gap-5 text-[#8a938b]">{(m ? ['docs', 'github'] : ['docs', 'changelog', 'github', 'sponsor']).map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="hover:text-[#3dff8b]">[{l}]</a>)}</div>
      </nav>

      <header className={m ? 'px-4 py-8' : 'px-10 py-12'}>
        <p className="text-[#8a938b]">{'// v2.4.1, MIT licensed'}</p>
        <h1 className={`mt-3 font-bold tracking-tight text-white ${m ? 'text-3xl leading-tight' : 'text-5xl leading-[1.1]'}`}>Infrastructure drift,<br />caught before <span className="text-[#3dff8b]">prod</span> does.</h1>
        <p className={`mt-4 text-[#8a938b] ${m ? '' : 'max-w-xl'}`}>One binary that compares what you declared with what is running, and tells you in plain text.</p>
      </header>

      <section className={`grid gap-4 ${m ? 'grid-cols-1 px-4 pb-8' : 'grid-cols-[1.25fr_1fr] px-10 pb-12'}`}>
        <div className={box}>
          <p className="border-b border-[#2a302c] px-4 py-2 text-[#8a938b]">┌─ install</p>
          <div className={`px-4 py-3 ${m ? 'min-h-44' : 'min-h-52'}`} aria-hidden>
            <p><span className="text-[#ffb347]">$</span> {command.slice(0, step)}{step <= command.length + 2 && <span className="tm-a ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-[#3dff8b]" style={{ animation: 'tm-blink 1s steps(1) infinite' }} />}</p>
            {log.slice(0, lines).map((l, i) => <p key={l} className={i === log.length - 1 ? 'text-[#3dff8b]' : 'text-[#8a938b]'}>{l}</p>)}
          </div>
          <p className="sr-only">Install with {command}. It downloads version 2.4.1 and finishes in under two seconds.</p>
        </div>
        <ul className="grid gap-4">
          {features.map(([n, t, d]) => (
            <li key={n} className={`${box} flex gap-4 px-4 py-3 transition-colors hover:border-[#3dff8b]`}>
              <span className="text-[#3dff8b]">{n}</span>
              <span><span className="block font-bold text-white">{t}</span><span className="text-[#8a938b]">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={`flex flex-wrap items-center justify-between gap-3 border-t border-[#2a302c] text-[#8a938b] ${m ? 'px-4 py-3' : 'px-10 py-3'}`}>
        <span>{'────'} 12.4k stars · 310 contributors</span>
        <span>press <kbd className="border border-[#2a302c] px-1.5 text-[#c9d1c8]">/</kbd> to search docs</span>
      </footer>
    </div>
  )
}
