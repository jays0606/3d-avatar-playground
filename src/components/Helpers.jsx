import { Stats, OrbitControls } from '@react-three/drei'

export default function Helpers() {
  return (
    <>
      <OrbitControls target={[0, 0.9, 0]} />
      <Stats />
    </>
  )
}
