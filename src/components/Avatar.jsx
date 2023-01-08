import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { AvatarController } from '../class/AvatarController'
import { modelUrl } from '../utils/constants'

import useKeyboard from '../hooks/useKeyboard'

export default function Avatar() {
  const avatar = useMemo(() => new AvatarController(), [])
  const avatarRef = useRef(avatar)
  const [loaded, setLoaded] = useState(false)
  const keyMap = useKeyboard()

  const initializeModel = async () => {
    await avatarRef.current.loadModel(modelUrl)
    await avatarRef.current.loadAnimations()
    setLoaded(true)
  }

  useEffect(() => {
    initializeModel()
    window.avatar = avatar
  }, [])

  useFrame((_, delta) => {
    avatarRef.current.handleKeyboardActions(keyMap)
    avatarRef.current.update(delta)
  })

  return (
    <>
      <primitive object={avatarRef.current.scene} />
    </>
  )
}
