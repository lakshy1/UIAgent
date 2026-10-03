import { useState } from 'react'
import { Send } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'chat-thread',
  title: 'Chat thread',
  category: 'Data',
  description: 'Message thread with bubbles, a typing indicator and a composer that appends messages.',
  source: ['18-queue-care', '30-Talenzo'],
  tags: ['chat', 'messages', 'composer'],
  notes: ['Thread is a role="log" live region.', 'Enter sends.'],
} as const

type M = { me: boolean; t: string }
export default function ChatThread({ device }: { device: Device }) {
  const [msgs, setMsgs] = useState<M[]>([{ me: false, t: 'Hi! Your token B-42 is 3 patients away.' }, { me: true, t: 'Great, can I arrive 10 minutes later?' }, { me: false, t: 'Sure, we will hold your slot.' }])
  const [v, setV] = useState('')
  const send = () => { if (!v.trim()) return; setMsgs((m) => [...m, { me: true, t: v.trim() }]); setV('') }
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className={`flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface ${device === 'mobile' ? 'h-full max-h-[560px]' : 'h-[360px] max-w-lg'}`}>
        <div role="log" aria-live="polite" className="flex flex-1 flex-col gap-2 overflow-auto p-4">
          {msgs.map((m, i) => <div key={i} className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${m.me ? 'self-end rounded-br-sm bg-brand text-white' : 'self-start rounded-bl-sm bg-surface-2 text-ink'}`}>{m.t}</div>)}
          <div className="flex gap-1 self-start rounded-2xl bg-surface-2 px-3 py-2.5" aria-label="Typing">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-muted" style={{ animation: `kc-float 1s ease-in-out ${i * 0.15}s infinite` }} />)}</div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex gap-2 border-t border-line p-2.5">
          <input value={v} onChange={(e) => setV(e.target.value)} aria-label="Message" placeholder="Write a message" className="h-11 flex-1 rounded-full bg-surface-2 px-4 text-sm text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand" />
          <button aria-label="Send" className="grid size-11 place-items-center rounded-full bg-brand text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><Send size={18} /></button>
        </form>
      </div>
    </div>
  )
}
