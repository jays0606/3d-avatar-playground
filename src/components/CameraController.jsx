import { OrbitControls } from '@react-three/drei'

export default function CameraController() {
  return (
    <>
      <OrbitControls
        target={[0, 0.9, 0]}
        makeDefault
        minDistance={3.0}
        maxDistance={20.0}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.5}
      />
    </>
  )
}
