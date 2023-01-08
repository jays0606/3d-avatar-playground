import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Playground from './components/Playground'

export default function App() {
  return (
    <Canvas
      camera={{ position: [2, 2, 8], fov: 35 }}
      style={{ background: ['#000000'] }}
      gl={{
        preserveDrawingBuffer: true,
        toneMapping: THREE.LinearToneMapping,
        powerPreference: 'high-performance',
        antialias: true
      }}
      shadows>
      <Playground />
    </Canvas>
  )
}
