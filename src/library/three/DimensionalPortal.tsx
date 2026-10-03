import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'dimensional-portal', title: 'Dimensional Portal', category: '3D', description: 'Nested architectural door frames expose a luminous passage whose perspective follows the viewer.', source: ['LakshyaKosh procedural 3D collection'], tags: ['architecture', 'portal', 'perspective'] } as const satisfies Meta

export default function DimensionalPortal({ device }: { device: Device }) {
  return <ThreePreview scene="dimensional-portal" device={device} />
}
