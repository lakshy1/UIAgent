import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'headphone-product-model', title: 'Headphone Product Model', category: '3D', description: 'A procedural over-ear headphone model combines metal yokes, padded cups and a formed headband.', source: ['LakshyaKosh procedural 3D collection'], tags: ['audio', 'ecommerce', 'product'] } as const satisfies Meta

export default function HeadphoneProductModel({ device }: { device: Device }) {
  return <ThreePreview scene="headphone-product-model" device={device} />
}
