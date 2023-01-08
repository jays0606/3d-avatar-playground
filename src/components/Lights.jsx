export default function Lights() {
  return (
    <>
      <directionalLight
        position={[2, 2, 2]}
        intensity={1.0}
        color={'#ffffff'}
      />
      <ambientLight intensity={0.5} color={'#ffffff'} />
    </>
  )
}
