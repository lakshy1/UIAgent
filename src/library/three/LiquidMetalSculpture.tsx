import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'liquid-metal-sculpture', title: 'Liquid Metal Sculpture', category: '3D', description: 'A sculpted torus knot in polished metal turns under studio lighting.', source: ['LakshyaKosh procedural 3D collection'], tags: ['metal', 'sculpture', 'chrome'] } as const satisfies Meta

export default function LiquidMetalSculpture({ device }: { device: Device }) {
  return <ThreePreview scene="liquid-metal-sculpture" device={device} />
}
