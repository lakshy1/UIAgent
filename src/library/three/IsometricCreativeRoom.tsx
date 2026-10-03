import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'isometric-creative-room', title: 'Isometric Creative Room', category: '3D', description: 'A compact studio room reveals desk, display, chair and articulated lamp through camera parallax.', source: ['LakshyaKosh procedural 3D collection'], tags: ['architecture', 'room', 'isometric'] } as const satisfies Meta

export default function IsometricCreativeRoom({ device }: { device: Device }) {
  return <ThreePreview scene="isometric-creative-room" device={device} />
}
