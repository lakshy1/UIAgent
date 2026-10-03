import { Calendar, Users, Receipt } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'feature-rows',
  title: 'Alternating feature rows',
  category: 'Sections',
  description: 'Zig-zag rows pairing copy with an illustration tile. Mobile always puts the visual on top and left-aligns copy.',
  source: ['25-Nivaso', '18-queue-care'],
  tags: ['features', 'rows'],
} as const

const rows = [
  { i: Calendar, t: 'Book without the back-and-forth', d: 'Patients pick a slot; reminders go out automatically.' },
  { i: Users, t: 'One queue for the whole clinic', d: 'Reception and doctors see the same live list.' },
  { i: Receipt, t: 'Billing that closes itself', d: 'Invoices are generated at checkout and reconciled nightly.' },
]

export default function FeatureRows({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <section className={`h-full bg-bg text-ink ${m ? 'space-y-8 p-5' : 'space-y-10 px-14 py-10'}`}>
      {rows.map(({ i: Icon, t, d }, n) => (
        <div key={t} className={m ? 'space-y-4' : `flex items-center gap-12 ${n % 2 ? 'flex-row-reverse' : ''}`}>
          <div className={`grid place-items-center rounded-2xl border border-line bg-gradient-to-br from-brand-soft to-surface ${m ? 'h-32' : 'h-36 w-1/2'}`}><Icon size={40} className="text-brand" aria-hidden /></div>
          <div className={m ? '' : 'flex-1'}>
            <h3 className={`font-display font-semibold ${m ? 'text-xl' : 'text-2xl'}`}>{t}</h3>
            <p className="mt-2 text-muted">{d}</p>
            <a href="#" className="mt-3 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline">Learn more</a>
          </div>
        </div>
      ))}
    </section>
  )
}
