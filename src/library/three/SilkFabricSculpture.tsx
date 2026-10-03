import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'silk-fabric-sculpture', title: 'Silk Fabric Sculpture', category: '3D', description: 'Iridescent cloth ripples into sculpted folds around the visitor’s focus, ready for fashion and editorial heroes.', source: ['LakshyaKosh procedural 3D collection'], tags: ['fabric', 'fashion', 'editorial', 'cursor-reactive'] } as const satisfies Meta

export default function SilkFabricSculpture({ device }: { device: Device }) {
  return <ThreePreview scene="silk-fabric-sculpture" device={device} />
}
