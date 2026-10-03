import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'kinetic-sculpture', title: 'Kinetic Sculpture', category: '3D', description: 'A balanced gyroscope and weighted pendulum swing with the pointer, then ease back into their own rhythm.', source: ['LakshyaKosh procedural 3D collection'], tags: ['kinetic', 'mechanical', 'sculpture', 'cursor-reactive'] } as const satisfies Meta

export default function KineticSculpture({ device }: { device: Device }) {
  return <ThreePreview scene="kinetic-sculpture" device={device} />
}
