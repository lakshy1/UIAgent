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
const load3DRenderer = () => Promise.all([
  import('../three/ThreePreview.tsx?raw'),
  import('../three/ThreeModels.tsx?raw'),
  import('../three/sceneHooks.ts?raw'),
]).then(([preview, models, hooks]) => `// Shared viewport and renderer: src/three/ThreePreview.tsx\n${preview.default}\n\n// Procedural model scenes: src/three/ThreeModels.tsx\n${models.default}\n\n// Shared damped interaction: src/three/sceneHooks.ts\n${hooks.default}`)

export const entries: Entry[] = Object.entries(metas)
  .filter(([, m]) => m)
  .map(([path, m]) => ({
    ...m,
    Demo: lazy(loaders[path]),
    loadCode: m.category === '3D'
      ? () => Promise.all([raws[path](), load3DRenderer()]).then(([component, renderer]) => `${component}\n\n${renderer}`)
      : raws[path],
    file: m.category === '3D' ? `${path.replace('./', 'src/library/')} + src/three/ThreeModels.tsx` : path.replace('./', 'src/library/'),
    group: placeOf(m.id)?.group ?? 'More',
    family: placeOf(m.id)?.family ?? 'Other',
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export { groups }
