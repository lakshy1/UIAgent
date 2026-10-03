import type { Device } from '../types'

export const meta = {
  id: 'floating-blobs',
  title: 'Floating blobs hero',
  category: 'Motion',
  description: 'Soft morphing gradient blobs drifting behind hero copy. Laptop uses three large blobs beside left-aligned text; mobile uses two smaller ones with centered copy.',
  source: ['04-broomin', '05-Kanthast'],
  tags: ['background', 'hero', 'ambient'],
  notes: ['Decorative layer is aria-hidden and pointer-events-none.', 'Blobs freeze under reduced motion.'],
} as const

export default function FloatingBlobs({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  const blobs = mobile
    ? [['-left-10 top-4 size-48 bg-brand/50', 7], ['-right-8 bottom-10 size-56 bg-spark/40', 9]]
    : [['left-1/2 top-4 size-80 bg-brand/40', 8], ['right-10 bottom-0 size-96 bg-spark/30', 11], ['left-1/3 bottom-8 size-64 bg-ok/25', 9]]
  return (
    <div className="relative h-full overflow-hidden">
      <style>{`@media(prefers-reduced-motion:reduce){.kb-blob{animation:none!important}}`}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {blobs.map(([c, d], i) => (
          <div key={i} className={`kb-blob absolute blur-3xl ${c}`} style={{ animation: `kc-blob ${d}s ease-in-out infinite, kc-float ${Number(d) / 1.5}s ease-in-out infinite` }} />
        ))}
      </div>
      <div className={`relative flex h-full flex-col justify-center gap-4 p-8 ${mobile ? 'items-center text-center' : 'max-w-xl pl-16'}`}>
        <span className="w-fit rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">New: route optimiser</span>
        <h2 className={`font-display font-bold text-ink ${mobile ? 'text-3xl' : 'text-5xl'}`}>Plan every delivery before the van leaves.</h2>
        <p className="text-muted">Live traffic, driver shifts and fuel cost in one calm view.</p>
      </div>
    </div>
  )
}
