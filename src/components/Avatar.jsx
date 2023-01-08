import { useEffect, useRef, useMemo } from 'react'
import { AvatarObject } from '../class/AvatarObject'
import { useThree, useFrame } from '@react-three/fiber'

const modelUrl = '../../assets/readyPlayerMe-sample.glb'
const greetingUrl = '../../animations/greeting.fbx'

export default function Avatar() {
  const avatar = useMemo(() => new AvatarObject(), [])
  const avatarRef = useRef(avatar)

  useEffect(() => {
    avatarRef.current.loadModel(modelUrl).then(() => {
      avatarRef.current.playAnimation(greetingUrl)
    })
  }, [])

  useFrame((_, delta) => {
    avatarRef.current.mixer.update(delta)
  })

  return (
    <>
      <primitive object={avatarRef.current.scene} />
    </>
  )
}
