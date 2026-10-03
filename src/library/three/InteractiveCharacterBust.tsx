import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'interactive-character-bust', title: 'Interactive Character Bust', category: '3D', description: 'An original faceless explorer turns its head faster than its shoulders follow.', source: ['LakshyaKosh procedural 3D collection'], tags: ['character', 'bust', 'portfolio'] } as const satisfies Meta

export default function InteractiveCharacterBust({ device }: { device: Device }) {
  return <ThreePreview scene="interactive-character-bust" device={device} />
}
