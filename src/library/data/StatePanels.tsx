import { useState } from 'react'
import { Inbox, WifiOff, RotateCw } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'state-panels',
  title: 'Empty, error and loading states',
  category: 'Data',
  description: 'Switchable empty state, error state with retry, and shimmer skeleton loader. Tabs on laptop, segmented control on phones.',
  source: ['18-queue-care', '30-Talenzo'],
  tags: ['empty', 'error', 'skeleton', 'loading'],
  notes: ['Skeleton is aria-busy; animation is a shared shimmer keyframe.', 'Error panel uses role="alert".'],
} as const

const tabs = ['Loading', 'Empty', 'Error'] as const

export default function StatePanels({ device }: { device: Device }) {
  const [t, setT] = useState<(typeof tabs)[number]>('Loading')
  const mobile = device === 'mobile'
  const sk = { background: 'linear-gradient(90deg,var(--surface-2) 25%,var(--line) 50%,var(--surface-2) 75%)', backgroundSize: '200% 100%', animation: 'kc-shimmer 1.4s linear infinite' }
  return (
    <div className="h-full min-h-[380px] p-5">
      <div role="tablist" className={`flex rounded-full bg-surface-2 p-1 ${mobile ? 'w-full' : 'w-fit'}`}>
        {tabs.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className={`rounded-full text-sm ${mobile ? 'h-11 flex-1' : 'h-9 px-5'} ${t === x ? 'bg-surface font-medium shadow' : 'text-muted'}`}>{x}</button>)}
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-surface p-6">
        {t === 'Loading' && (
          <div aria-busy="true" aria-label="Loading" className={`grid gap-4 ${mobile ? '' : 'grid-cols-2'}`}>
            {[0, 1, 2, 3].slice(0, mobile ? 3 : 4).map((n) => <div key={n} className="flex items-center gap-3"><div className="h-12 w-12 rounded-xl" style={sk} /><div className="flex-1 space-y-2"><div className="h-3 w-3/4 rounded" style={sk} /><div className="h-3 w-1/2 rounded" style={sk} /></div></div>)}
          </div>)}
        {t === 'Empty' && (
          <div className="grid place-items-center py-8 text-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-brand" style={{ animation: 'kc-float 3s ease-in-out infinite' }}><Inbox size={28} /></div>
            <h3 className="mt-4 font-display text-lg font-semibold">No appointments yet</h3><p className="mt-1 max-w-xs text-sm text-muted">Bookings will show up here the moment a patient reserves a slot.</p>
            <button className={`mt-5 rounded-full bg-brand px-6 text-sm font-medium text-white ${mobile ? 'h-12 w-full' : 'h-10'}`}>Create first slot</button></div>)}
        {t === 'Error' && (
          <div role="alert" className="grid place-items-center py-8 text-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-danger/15 text-danger"><WifiOff size={28} /></div>
            <h3 className="mt-4 font-display text-lg font-semibold">Can't reach the server</h3><p className="mt-1 max-w-xs text-sm text-muted">Check your connection and try again. Your changes are safe.</p>
            <button className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium hover:border-brand ${mobile ? 'h-12 w-full' : 'h-10'}`}><RotateCw size={15} />Try again</button></div>)}
      </div>
    </div>
  )
}
