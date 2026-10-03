import { useState } from 'react'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'product-card',
  title: 'Product card',
  category: 'Cards',
  description: 'E-commerce tile with wishlist toggle, rating and add-to-bag. Vertical on laptop; horizontal list row with a bigger add button on mobile.',
  source: ['28-ecommerce'],
  tags: ['commerce', 'product', 'wishlist'],
  notes: ['Wishlist is a toggle button with aria-pressed.'],
} as const

export default function ProductCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [fav, setFav] = useState(false)
  const [added, setAdded] = useState(false)
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink">
      <article className={`group overflow-hidden rounded-2xl border border-line bg-surface ${m ? 'flex w-full gap-3 p-3' : 'w-72'}`}>
        <div className={`relative bg-gradient-to-br from-brand-soft to-surface-2 ${m ? 'size-28 shrink-0 rounded-xl' : 'h-56'}`}>
          <div aria-hidden className="absolute inset-0 grid place-items-center font-display text-5xl text-brand/40 transition group-hover:scale-110">N</div>
          <button aria-label="Save to wishlist" aria-pressed={fav} onClick={() => setFav(!fav)} className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-bg/80 backdrop-blur">
            <Heart size={16} className={fav ? 'fill-danger text-danger' : ''} /></button>
        </div>
        <div className={`flex flex-1 flex-col ${m ? '' : 'p-4'}`}>
          <p className="flex items-center gap-1 text-xs text-muted"><Star size={12} className="fill-spark text-spark" /> 4.8 (212)</p>
          <h3 className="mt-1 font-display font-medium">Nimbus Wool Overshirt</h3>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="font-display text-lg font-semibold">$89</span>
            <button onClick={() => setAdded(true)} aria-label="Add to bag" className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${m ? 'size-12' : 'h-10 px-4'}`}>
              <ShoppingBag size={16} />{!m && (added ? 'Added' : 'Add')}</button>
          </div>
        </div>
      </article>
    </div>
  )
}
