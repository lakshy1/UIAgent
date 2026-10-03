import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { Device, StyleFamily, StyleMeta } from './types'

export interface StyleEntry extends StyleMeta {
  Demo: LazyExoticComponent<ComponentType<{ device: Device }>>
  loadCode: () => Promise<string>
  file: string
}

const metas = import.meta.glob<StyleMeta>('./*.tsx', { eager: true, import: 'meta' })
const loaders = import.meta.glob<{ default: ComponentType<{ device: Device }> }>('./*.tsx')
const raws = import.meta.glob<string>('./*.tsx', { query: '?raw', import: 'default' })

export const styleEntries: StyleEntry[] = Object.entries(metas)
  .filter(([, m]) => m)
  .map(([path, m]) => ({ ...m, Demo: lazy(loaders[path]), loadCode: raws[path], file: path.replace('./', 'src/styles/') }))

export const styleFamilies: { name: StyleFamily; blurb: string }[] = [
  { name: 'Soft surfaces', blurb: 'Depth made from light and shadow: frosted, extruded, inflated and real-world materials.' },
  { name: 'Less and more', blurb: 'Two opposite answers to the same question: how much should a page say?' },
  { name: 'Retro', blurb: 'Nostalgia done on purpose: neon arcades, pixel screens and chrome-era optimism.' },
  { name: 'Bold and edgy', blurb: 'Loud on purpose: hard shadows, angular HUDs and unapologetic contrast.' },
  { name: 'Modern', blurb: 'The current mainstream: restrained SaaS, editorial grids, soft gradients and tonal systems.' },
]
