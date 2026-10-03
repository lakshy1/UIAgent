import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { Device, Meta } from './types'
import { groups, placeOf } from './taxonomy'

type DemoProps = { device: Device }
export interface Entry extends Meta {
  Demo: LazyExoticComponent<ComponentType<DemoProps>>
  loadCode: () => Promise<string>
  file: string
  group: string
  family: string
}

const metas = import.meta.glob<Meta>('./*/*.tsx', { eager: true, import: 'meta' })
const loaders = import.meta.glob<{ default: ComponentType<DemoProps> }>('./*/*.tsx')
const raws = import.meta.glob<string>('./*/*.tsx', { query: '?raw', import: 'default' })

export const entries: Entry[] = Object.entries(metas)
  .filter(([, m]) => m)
  .map(([path, m]) => ({
    ...m,
    Demo: lazy(loaders[path]),
    loadCode: raws[path],
    file: path.replace('./', 'src/library/'),
    group: placeOf(m.id)?.group ?? 'More',
    family: placeOf(m.id)?.family ?? 'Other',
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export { groups }
