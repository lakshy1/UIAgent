import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'interactive-planet', title: 'Interactive Planet', category: '3D', description: 'A procedurally colored planet with a soft atmosphere and orbiting moon rotates into the cursor.', source: ['LakshyaKosh procedural 3D collection'], tags: ['planet', 'space', 'procedural'] } as const satisfies Meta

export default function InteractivePlanet({ device }: { device: Device }) {
  return <ThreePreview scene="interactive-planet" device={device} />
}
