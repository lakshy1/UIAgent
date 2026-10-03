import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'mechanical-reactor', title: 'Mechanical Reactor', category: '3D', description: 'A layered power core couples rotating gimbals, precision struts and a pulse-lit nucleus for technology launch pages.', source: ['LakshyaKosh procedural 3D collection'], tags: ['mechanical', 'energy', 'industrial', 'hero'] } as const satisfies Meta

export default function MechanicalReactor({ device }: { device: Device }) {
  return <ThreePreview scene="mechanical-reactor" device={device} />
}
