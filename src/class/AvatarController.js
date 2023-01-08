import * as THREE from 'three'
import { loadGltf, loadAnimationClip } from '../utils/loaders'
import { animationUrls } from '../utils/constants'

export class AvatarController {
  constructor() {
    this.scene = new THREE.Scene()
    this.armature = null
    this.mixer = new THREE.AnimationMixer(this.scene)
    this.actions = {}
    this.currentAction = null

    this.walkDirection = new THREE.Vector3()
    this.rotateAngle = new THREE.Vector3(0, 1, 0)
    this.rotateQuaternion = new THREE.Quaternion()

    this.fadeDuration = 0.3
    this.runVelocity = 5
    this.walkVelocity = 2
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
    if (action === 'run' || action === 'walk') {
      const shiftAngle = this.getShiftAngle(keyMap)
      const rotateQuaternion = this.rotateQuaternion.setFromAxisAngle(
        this.rotateAngle,
        shiftAngle
      )
      this.armature.quaternion.rotateTowards(
        rotateQuaternion,
        this.fadeDuration
      )
      
    }
  }

  update(delta) {
    this.mixer.update(delta)
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
    const directionOffset = {
      KeyW: Math.PI,
      KeyA: -Math.PI / 2,
      KeyS: 0,
      KeyD: Math.PI / 2
    }
    let totalOffset = 0
    let totalPressed = 0
    for (const [name, pressed] of Object.entries(keyMap)) {
      if (pressed) {
        totalOffset += directionOffset[name]
        totalPressed += 1
      }
    }
    return totalPressed === 0 ? 0 : totalOffset / totalPressed
  }
}
