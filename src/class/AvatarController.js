import * as THREE from 'three'
import { loadGltf, loadAnimationClip } from '../utils/loaders'
import { animationUrls, keyDirectionOffsetMap } from '../utils/constants'

export class AvatarController {
  constructor() {
    this.scene = new THREE.Scene()
    this.armature = null
    this.mixer = new THREE.AnimationMixer(this.scene)
    this.actions = {}
    this.currentAction = null

    this.rotateAxis = new THREE.Vector3(0, 1, 0)
    this.rotateQuaternion = new THREE.Quaternion()
    this.translateX = 0
    this.translateZ = 0

    this.fadeDuration = 0.3
    this.runVelocity = 3
    this.walkVelocity = 1.5
  }

  async loadModel(url) {
    const gltf = await loadGltf(url)
    gltf.scene.traverse((object) => {
      object.frustumCulled = false
    })
    this.scene.add(gltf.scene)
    this.armature = this.scene.getObjectByName('Armature')
  }

  async loadAnimations() {
    for (const [name, url] of Object.entries(animationUrls)) {
      const clip = await loadAnimationClip(url)
      const action = this.mixer.clipAction(clip)
      this.actions[name] = action
    }
    this.currentAction = 'idle'
    this.actions['idle'].play()
  }

  handleKeyboardActions(keyMap) {
    const action = this.getAction(keyMap)
    if (this.currentAction && action !== this.currentAction) {
      const fadeOutAction = this.actions[this.currentAction]
      const fadeInAction = this.actions[action]
      fadeInAction
        ?.reset()
        .crossFadeFrom(fadeOutAction, this.fadeDuration)
        .play()
      this.currentAction = action
    }
    if (
      (action === 'run' || action === 'walk') &&
      this.shouldAvatarMove(keyMap)
    ) {
      const shiftAngle = this.getShiftAngle(keyMap)
      const [translateX, translateZ] = this.getTranslateAmount(
        action,
        shiftAngle
      )
      this.rotateQuaternion.setFromAxisAngle(this.rotateAxis, shiftAngle)
      this.translateX = translateX
      this.translateZ = translateZ
    } else {
      this.translateX = 0
      this.translateZ = 0
    }
  }

  update(delta) {
    this.scene.quaternion.rotateTowards(this.rotateQuaternion, delta * 5)
    this.scene.position.x += this.translateX * delta
    this.scene.position.z += this.translateZ * delta
    this.mixer.update(delta)
  }

  shouldAvatarMove(keyMap) {
    let moveX = 0
    let moveZ = 0
    keyMap['KeyA'] && (moveX -= 1)
    keyMap['KeyD'] && (moveX += 1)
    keyMap['KeyW'] && (moveZ -= 1)
    keyMap['KeyS'] && (moveZ += 1)
    if (moveX === 0 && moveZ === 0) {
      return false
    }
    return true
  }

  getAction(keyMap) {
    if (keyMap['KeyW'] || keyMap['KeyA'] || keyMap['KeyS'] || keyMap['KeyD']) {
      if (keyMap['ShiftLeft'] || keyMap['ShiftRight']) {
        return 'run'
      }
      return 'walk'
    }
    return 'idle'
  }

  getShiftAngle(keyMap) {
    let pressedKeys = []
    for (const [name, pressed] of Object.entries(keyMap)) {
      if (!pressed) continue
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(name)) {
        pressedKeys.push(name.slice(-1))
      }
    }
    pressedKeys = pressedKeys.sort().join('')
    return keyDirectionOffsetMap[pressedKeys]
  }

  getTranslateAmount(action, shiftAngle) {
    const walkDirection = new THREE.Vector3(0, 0, 1) // initial Direction Vector
    walkDirection.applyAxisAngle(this.rotateAxis, shiftAngle)
    const velocity = action === 'run' ? this.runVelocity : this.walkVelocity
    const translateX = walkDirection.x * velocity
    const translateZ = walkDirection.z * velocity
    return [translateX, translateZ]
  }
}
