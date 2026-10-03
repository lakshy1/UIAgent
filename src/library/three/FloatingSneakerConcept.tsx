import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'floating-sneaker-concept', title: 'Floating Sneaker Concept', category: '3D', description: 'A procedural, unbranded footwear concept floats on a product turntable with inspectable sole and upper.', source: ['LakshyaKosh procedural 3D collection'], tags: ['product', 'ecommerce', 'footwear'] } as const satisfies Meta

export default function FloatingSneakerConcept({ device }: { device: Device }) {
  return <ThreePreview scene="floating-sneaker-concept" device={device} />
}
