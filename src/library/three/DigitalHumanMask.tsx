import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'digital-human-mask', title: 'Digital Human Mask', category: '3D', description: 'A fictional ceramic-and-metal mask turns toward the pointer with independent luminous eyes.', source: ['LakshyaKosh procedural 3D collection'], tags: ['mask', 'ceramic', 'character'] } as const satisfies Meta

export default function DigitalHumanMask({ device }: { device: Device }) {
  return <ThreePreview scene="digital-human-mask" device={device} />
}
