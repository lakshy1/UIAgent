import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'torus-energy-engine', title: 'Axial Flow Turbine', category: '3D', description: 'A pointer-responsive turbine spins a sculpted three-blade rotor inside a precision stator frame.', source: ['LakshyaKosh procedural 3D collection'], tags: ['renewable energy', 'turbine', 'interactive', '3D'] } as const satisfies Meta

export default function TorusEnergyEngine({ device }: { device: Device }) {
  return <ThreePreview scene="torus-energy-engine" device={device} />
}
