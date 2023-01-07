import { Stats, OrbitControls } from '@react-three/drei'

export default function Helpers() {
  return (
    <>
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </>
  )
}
