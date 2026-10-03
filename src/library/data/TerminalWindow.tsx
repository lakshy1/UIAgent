import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'terminal-window',
  title: 'Terminal window',
  category: 'Data',
  description: 'A command line that types a command, prints its output line by line, and ends on a success message. Shows developers how short the setup is without a video.',
  source: ['Web: Magic UI terminal', '22-Kubeshift', '24-Omnipane'],
  tags: ['terminal', 'cli', 'typing', 'developer'],
  notes: ['The finished transcript is in the page from the start for screen readers; only the visual copy animates.', 'Shows the full transcript at once for reduced motion.'],
} as const

const command = 'npx create-kosh-app my-site'
const output = [
  { t: '✔ Template: marketing site', c: 'text-[#7ee787]' },
  { t: '✔ Installed 42 packages in 3.1s', c: 'text-[#7ee787]' },
  { t: '✔ Linked theme tokens', c: 'text-[#7ee787]' },
  { t: '→ Local: http://localhost:5173', c: 'text-[#79c0ff]' },
  { t: 'Ready. Happy building.', c: 'text-white' },
]
const total = command.length + output.length * 6 + 26

export default function TerminalWindow({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(total); return }
    const t = window.setInterval(() => setStep(s => (s + 1) % total), 70)
    return () => clearInterval(t)
  }, [])
  const typed = command.slice(0, step)
  const lines = Math.max(0, Math.floor((step - command.length - 4) / 6))
  return (
    <div className="grid h-full w-full place-items-center bg-bg p-6">
      <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl ${m ? 'w-full' : 'w-[560px]'}`}>
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-white/40">zsh</span>
        </div>
        <div aria-hidden className={`font-mono leading-relaxed text-white/90 ${m ? 'min-h-52 p-4 text-xs' : 'min-h-56 p-5 text-sm'}`}>
          <p><span className="text-[#f778ba]">~</span> <span className="text-white/40">$</span> {typed}{step <= command.length + 3 && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />}</p>
          {output.slice(0, lines).map(l => <p key={l.t} className={l.c} style={{ animation: 'kc-rise .25s ease-out both' }}>{l.t}</p>)}
        </div>
        <p className="sr-only">Run {command}. It picks the marketing template, installs 42 packages, links theme tokens and starts a local server at localhost:5173.</p>
      </div>
    </div>
  )
}
