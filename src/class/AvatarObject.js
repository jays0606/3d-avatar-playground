import * as THREE from 'three'
import { loadGltf, loadAnimationClip } from '../utils/loaders'

export class AvatarObject {
  constructor() {
    this.scene = new THREE.Scene()
    this.mixer = new THREE.AnimationMixer(this.scene)
    this.action = null
  }

  async loadModel(url) {
    const gltf = await loadGltf(url)
    gltf.scene.traverse((object) => {
      object.frustumCulled = false
    })
    this.scene.add(gltf.scene)
  }

  async playAnimation(url) {
    const clip = await loadAnimationClip(url)
    const action = this.mixer.clipAction(clip)
    this.action = action
    this.action.play()
  }
}
