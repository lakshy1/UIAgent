import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'futuristic-vehicle-concept', title: 'Futuristic Vehicle Concept', category: '3D', description: 'A sculpted electric concept car reveals its enamel body, glass canopy, alloy wheels and lighting on a product turntable.', source: ['LakshyaKosh procedural 3D collection'], tags: ['vehicle', 'automotive', 'product', 'ecommerce'] } as const satisfies Meta

export default function FuturisticVehicleConcept({ device }: { device: Device }) {
  return <ThreePreview scene="futuristic-vehicle-concept" device={device} />
}
