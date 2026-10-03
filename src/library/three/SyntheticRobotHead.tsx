import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'synthetic-robot-head', title: 'Synthetic Robot Head', category: '3D', description: 'An original precision-built android turns its eyes, visor and head toward the visitor for AI and robotics heroes.', source: ['LakshyaKosh procedural 3D collection'], tags: ['robot', 'character', 'AI', 'cursor-reactive'] } as const satisfies Meta

export default function SyntheticRobotHead({ device }: { device: Device }) {
  return <ThreePreview scene="synthetic-robot-head" device={device} />
}
