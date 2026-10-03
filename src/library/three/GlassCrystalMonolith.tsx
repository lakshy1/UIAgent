import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'glass-crystal-monolith', title: 'Glass Crystal Monolith', category: '3D', description: 'A faceted transmissive crystal reveals its inner core as viewing angle and light change.', source: ['LakshyaKosh procedural 3D collection'], tags: ['glass', 'crystal', 'material'] } as const satisfies Meta

export default function GlassCrystalMonolith({ device }: { device: Device }) {
  return <ThreePreview scene="glass-crystal-monolith" device={device} />
}
