export default function Lights() {
  return (
    <>
      <directionalLight
        position={[1, 1, 1]}
        intensity={0.5}
        color={'#ffffff'}
      />
      <ambientLight intensity={0.3} color={'#ffffff'} />
    </>
  )
}
