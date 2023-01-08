import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'

export default function Wall() {
  const imgMap = useLoader(TextureLoader, '../../assets/newyork.jpeg')
  return (
    <>
      <mesh position={[0, 3, -8]}>
        <planeBufferGeometry args={[16, 9]} />
        <meshStandardMaterial map={imgMap} />
      </mesh>
    </>
  )
}
