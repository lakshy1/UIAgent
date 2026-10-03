import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'lamp-glow',
  title: 'Lamp glow header',
  category: 'Backgrounds',
  description: 'A bar of light switches on and widens above the headline, casting a cone of glow down onto it. A dramatic opener for a dark landing page or a section title.',
  source: ['Web: Aceternity lamp effect', 'Web: Linear-style section headers'],
  tags: ['lamp', 'glow', 'header', 'reveal'],
  notes: ['Two mirrored conic gradients make the cone; a blurred bar makes the lamp itself.', 'Always dark, whatever the site theme, because the effect depends on a dark surround.'],
} as const

export default function LampGlow({ device }: { device: Device }) {
  const m = device === 'mobile'
  const wide = m ? 260 : 480
  const cone = { initial: { width: wide * 0.35, opacity: 0.4 }, animate: { width: wide, opacity: 1 }, transition: { duration: 1.1, ease: 'easeOut' as const, delay: 0.2 } }
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#070a1c] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[18%] flex h-56 justify-center" aria-hidden>
        <motion.div {...cone} className="absolute right-1/2 h-56" style={{ background: 'conic-gradient(from 70deg at 100% 0%, var(--color-brand), transparent 28%)', maskImage: 'linear-gradient(to bottom, #000, transparent)' }} />
        <motion.div {...cone} className="absolute left-1/2 h-56" style={{ background: 'conic-gradient(from 290deg at 0% 0%, transparent 72%, var(--color-brand))', maskImage: 'linear-gradient(to bottom, #000, transparent)' }} />
        <motion.div initial={{ width: wide * 0.2 }} animate={{ width: wide * 0.9 }} transition={cone.transition} className="absolute top-0 h-24 -translate-y-1/2 rounded-full bg-brand opacity-50 blur-3xl" />
        <motion.div initial={{ width: wide * 0.35 }} animate={{ width: wide }} transition={cone.transition} className="absolute top-0 h-0.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_4px] shadow-brand" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.45 }} className="relative mt-24 px-6 text-center">
        <h2 className={`font-display font-bold tracking-tight text-white ${m ? 'text-3xl' : 'text-5xl'}`}>Build in the light</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">Ship the thing you have been sketching. The tools are finally ready.</p>
      </motion.div>
    </div>
  )
}
