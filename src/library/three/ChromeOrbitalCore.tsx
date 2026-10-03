import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'chrome-orbital-core', title: 'Chrome Orbital Core', category: '3D', description: 'A studio-lit chrome nucleus, satellite and interlocking orbital rings for premium technology heroes.', source: ['LakshyaKosh procedural 3D collection'], tags: ['chrome', 'orbital', 'product'] } as const satisfies Meta

export default function ChromeOrbitalCore({ device }: { device: Device }) {
  return <ThreePreview scene="chrome-orbital-core" device={device} />
}
