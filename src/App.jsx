import { Canvas } from '@react-three/fiber'
import Polyhedron from './components/Polyhedron'
import * as THREE from 'three'
import Helpers from './components/Helpers'
import Lights from './components/Lights'

export default function App() {
  return (
    <Canvas camera={{ position: [-1, 4, 2.5] }} shadows>
      <directionalLight position={[1, 1, 1]} />
      <Polyhedron
        name="meshBasicMaterial"
        position={[-3, 1, 0]}
        material={new THREE.MeshBasicMaterial()}
      />
      <Helpers />
      <Lights />
    </Canvas>
  )
}
