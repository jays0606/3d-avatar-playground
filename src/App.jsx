import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Avatar from './components/Avatar'
import Floor from './components/Floor'
import Helpers from './components/Helpers'
import Lights from './components/Lights'
import Wall from './components/Wall'

export default function App() {
  return (
    <Canvas
      camera={{ position: [2, 2, 15], fov: 35 }}
      style={{ background: ['#000000'] }}
      gl={{
        preserveDrawingBuffer: true,
        toneMapping: THREE.LinearToneMapping,
        powerPreference: 'high-performance',
        antialias: true
      }}
      shadows>
      <Avatar />
      <Floor />
      <Wall />
      <Helpers />
      <Lights />
    </Canvas>
  )
}
